import { TABLES, INDEXES, ROLES, DIRECTORY_ROLES, PAYROLL_ROLES } from "../config.js"
import { getItem, putItem, query, scan, transactWrite, updateItem } from "../lib/db.js"
import { created, ok, parseBody, query as qs } from "../lib/http.js"
import { HttpError } from "../lib/http.js"
import { generateEmployeeCode, newId, nowIso, decodeToken, encodeToken } from "../lib/ids.js"
import {
  ALL_ROLES,
  EMPLOYEE_STATUSES,
  EMPLOYMENT_TYPES,
  assertHr,
  assertSelfOrDirectory,
  optionalEnum,
  pick,
  requireEmail,
  requireFields,
} from "../lib/validate.js"
import { decrypt, encrypt, maskAccount, maskPan } from "../lib/crypto.js"
import {
  disableLogin,
  enableLogin,
  inviteEmployee,
  resendInvite,
  replaceCognitoGroup,
  setPermanentPassword,
  updateCognitoProfile,
} from "../lib/cognito.js"

function publicEmployee(item) {
  if (!item) return null
  return {
    _id: item._id,
    employee_code: item.employee_code,
    first_name: item.first_name,
    last_name: item.last_name,
    work_email: item.work_email,
    personal_email: item.personal_email || null,
    phone: item.phone || null,
    date_of_joining: item.date_of_joining || null,
    employment_type: item.employment_type || null,
    department_id: item.department_id || null,
    designation_id: item.designation_id || null,
    manager_id: item.manager_id || null,
    work_location_id: item.work_location_id || null,
    status: item.status,
    cognito_username: item.cognito_username || null,
    profile_verification_status: item.profile_verification_status || "not_invited",
    profile_verified_at: item.profile_verified_at || null,
    invitation_sent_at: item.invitation_sent_at || null,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }
}

function sanitizePersonal(item) {
  if (!item) return null
  return {
    employee_id: item.employee_id,
    date_of_birth: item.date_of_birth || null,
    gender: item.gender || null,
    addresses: item.addresses || [],
    other_personal_details: item.other_personal_details || {},
  }
}

function sanitizeAccess(item) {
  if (!item) return null
  return {
    employee_id: item.employee_id,
    role_id: item.role_id,
    permissions: item.permissions || [],
    login_enabled: item.login_enabled !== false,
    created_at: item.created_at,
  }
}

function sanitizePayroll(item, canSeeSensitive) {
  if (!item) return null
  const bank = decrypt(item.bank_account_encrypted)
  const ifsc = decrypt(item.ifsc_encrypted)
  const pan = decrypt(item.pan_encrypted)
  const uan = decrypt(item.uan_encrypted)
  return {
    employee_id: item.employee_id,
    salary_structure_id: item.salary_structure_id || null,
    ctc: item.ctc ?? null,
    gross_salary: item.gross_salary ?? null,
    effective_from: item.effective_from,
    bank_account: canSeeSensitive ? bank : maskAccount(bank),
    ifsc: canSeeSensitive ? ifsc : ifsc ? `${String(ifsc).slice(0, 4)}••••` : null,
    pan: canSeeSensitive ? pan : maskPan(pan),
    uan: canSeeSensitive ? uan : uan ? "••••••••••••" : null,
  }
}

export async function findByEmail(email) {
  const result = await query({
    TableName: TABLES.employees,
    IndexName: INDEXES.workEmail,
    KeyConditionExpression: "work_email = :email",
    ExpressionAttributeValues: { ":email": email },
    Limit: 1,
  })
  return result.items[0] || null
}

export async function findByCode(code) {
  const result = await query({
    TableName: TABLES.employees,
    IndexName: INDEXES.employeeCode,
    KeyConditionExpression: "employee_code = :code",
    ExpressionAttributeValues: { ":code": code },
    Limit: 1,
  })
  return result.items[0] || null
}

export async function getEmployeeRecord(id) {
  const item = await getItem(TABLES.employees, { _id: id })
  if (!item) throw new HttpError(404, "Employee not found")
  return item
}

async function uniqueEmployeeCode(preferred) {
  const code = preferred || generateEmployeeCode()
  const existing = await findByCode(code)
  if (existing) {
    if (preferred) throw new HttpError(409, "employee_code already exists")
    return uniqueEmployeeCode()
  }
  return code
}

function personalItem(employeeId, personal = {}, timestamp) {
  return {
    employee_id: employeeId,
    date_of_birth: personal.date_of_birth || null,
    gender: personal.gender || null,
    addresses: personal.addresses || [],
    other_personal_details: personal.other_personal_details || {},
    updated_at: timestamp,
  }
}

function payrollItem(employeeId, payroll = {}, timestamp) {
  const effectiveFrom = payroll.effective_from || timestamp.slice(0, 10)
  return {
    employee_id: employeeId,
    salary_structure_id: payroll.salary_structure_id || null,
    ctc: payroll.ctc ?? null,
    gross_salary: payroll.gross_salary ?? null,
    bank_account_encrypted: encrypt(payroll.bank_account || payroll.bank_account_encrypted),
    ifsc_encrypted: encrypt(payroll.ifsc || payroll.ifsc_encrypted),
    pan_encrypted: encrypt(payroll.pan || payroll.pan_encrypted),
    uan_encrypted: encrypt(payroll.uan || payroll.uan_encrypted),
    effective_from: effectiveFrom,
    updated_at: timestamp,
  }
}

function emergencyItems(employeeId, contacts = [], timestamp) {
  return (contacts || []).map((contact) => ({
    employee_id: employeeId,
    contact_id: contact.contact_id || newId(),
    name: contact.name,
    relationship: contact.relationship,
    phone: contact.phone,
    email: contact.email || null,
    created_at: timestamp,
  }))
}

export async function assembleEmployee(id, caller) {
  const employee = await getEmployeeRecord(id)
  const canSeeSensitive = PAYROLL_ROLES.includes(caller.role)
  const [personal, payrollPage, documentsPage, emergency, access] = await Promise.all([
    getItem(TABLES.personal, { employee_id: id }),
    query({
      TableName: TABLES.payroll,
      KeyConditionExpression: "employee_id = :id",
      ExpressionAttributeValues: { ":id": id },
      ScanIndexForward: false,
      Limit: 1,
    }),
    query({
      TableName: TABLES.documents,
      IndexName: INDEXES.documentsByEmployee,
      KeyConditionExpression: "employee_id = :id",
      ExpressionAttributeValues: { ":id": id },
    }),
    query({
      TableName: TABLES.emergency,
      KeyConditionExpression: "employee_id = :id",
      ExpressionAttributeValues: { ":id": id },
    }),
    getItem(TABLES.access, { employee_id: id }),
  ])

  return {
    employee: publicEmployee(employee),
    personal: sanitizePersonal(personal),
    payroll: sanitizePayroll(payrollPage.items[0], canSeeSensitive),
    documents: documentsPage.items,
    emergency_contacts: emergency.items,
    access: sanitizeAccess(access),
  }
}

export async function createEmployee(event, caller) {
  if (caller) assertHr(caller)
  const body = parseBody(event)
  requireFields(body, ["first_name", "last_name", "work_email"])
  const workEmail = requireEmail(body.work_email, "work_email")
  const roleId = optionalEnum(body.role_id || body.access?.role_id || ROLES.EMPLOYEE, ALL_ROLES, "role_id")
  const employmentType = optionalEnum(body.employment_type, EMPLOYMENT_TYPES, "employment_type")
  const status = optionalEnum(body.status, EMPLOYEE_STATUSES, "status") || "invited"
  const loginEnabled = body.login_enabled !== false && body.access?.login_enabled !== false

  if (await findByEmail(workEmail)) {
    throw new HttpError(409, "An employee with this work_email already exists")
  }

  const timestamp = nowIso()
  const id = newId()
  const employeeCode = await uniqueEmployeeCode(body.employee_code)
  const employee = {
    _id: id,
    employee_code: employeeCode,
    first_name: body.first_name.trim(),
    last_name: body.last_name.trim(),
    work_email: workEmail,
    personal_email: body.personal_email ? requireEmail(body.personal_email, "personal_email") : null,
    phone: body.phone || null,
    date_of_joining: body.date_of_joining || timestamp.slice(0, 10),
    employment_type: employmentType || "full_time",
    department_id: body.department_id || null,
    designation_id: body.designation_id || null,
    manager_id: body.manager_id || null,
    work_location_id: body.work_location_id || null,
    status,
    cognito_username: loginEnabled ? workEmail : null,
    profile_verification_status: loginEnabled ? "invited" : "not_invited",
    invitation_sent_at: null,
    created_at: timestamp,
    updated_at: timestamp,
  }

  const access = {
    employee_id: id,
    role_id: roleId,
    permissions: body.permissions || body.access?.permissions || [],
    login_enabled: loginEnabled,
    created_at: timestamp,
  }

  const transactItems = [
    { Put: { TableName: TABLES.employees, Item: employee } },
    { Put: { TableName: TABLES.personal, Item: personalItem(id, body.personal, timestamp) } },
    { Put: { TableName: TABLES.access, Item: access } },
  ]

  if (body.payroll) {
    transactItems.push({ Put: { TableName: TABLES.payroll, Item: payrollItem(id, body.payroll, timestamp) } })
  }

  for (const contact of emergencyItems(id, body.emergency_contacts, timestamp)) {
    transactItems.push({ Put: { TableName: TABLES.emergency, Item: contact } })
  }

  await transactWrite(transactItems)

  let invitation = { sent: false }
  if (loginEnabled) {
    try {
      await inviteEmployee({
        email: workEmail,
        firstName: employee.first_name,
        lastName: employee.last_name,
        phone: employee.phone,
        employeeId: id,
        roleId,
      })
      await updateItem(TABLES.employees, { _id: id }, {
        invitation_sent_at: nowIso(),
        updated_at: nowIso(),
      })
      invitation = { sent: true }
    } catch (err) {
      invitation = {
        sent: false,
        error: err.message || "Failed to create Cognito user / send invite",
      }
      await updateItem(TABLES.employees, { _id: id }, {
        profile_verification_status: "not_invited",
        updated_at: nowIso(),
      })
    }
  }

  return created({
    employee: publicEmployee({ ...employee, invitation_sent_at: invitation.sent ? nowIso() : null }),
    access: sanitizeAccess(access),
    invitation,
  })
}

export async function listEmployees(event, caller) {
  if (!DIRECTORY_ROLES.includes(caller.role)) {
    throw new HttpError(403, "Directory access required")
  }

  const params = qs(event)
  const limit = Math.min(Number(params.limit) || 25, 100)
  const startKey = decodeToken(params.next_token)
  const status = optionalEnum(params.status, EMPLOYEE_STATUSES, "status")
  const search = (params.q || "").trim().toLowerCase()

  let page
  if (status) {
    page = await query({
      TableName: TABLES.employees,
      IndexName: INDEXES.status,
      KeyConditionExpression: "#status = :status",
      ExpressionAttributeNames: { "#status": "status" },
      ExpressionAttributeValues: { ":status": status },
      Limit: limit,
      ScanIndexForward: false,
      ExclusiveStartKey: startKey,
    })
  } else {
    page = await scan({
      TableName: TABLES.employees,
      Limit: limit,
      ExclusiveStartKey: startKey,
    })
  }

  let items = page.items.map(publicEmployee)
  if (params.department_id) {
    items = items.filter((item) => item.department_id === params.department_id)
  }
  if (search) {
    items = items.filter((item) =>
      [item.first_name, item.last_name, item.work_email, item.employee_code, item.phone]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search)
    )
  }

  return ok({
    employees: items,
    next_token: page.lastKey ? encodeToken(page.lastKey) : null,
  })
}

export async function getEmployee(event, caller) {
  const id = event.pathParams.id
  assertSelfOrDirectory(caller, id)
  return ok(await assembleEmployee(id, caller))
}

export async function updateEmployee(event, caller) {
  const id = event.pathParams.id
  assertHr(caller)
  const body = parseBody(event)
  await getEmployeeRecord(id)

  const patch = pick(body, [
    "first_name",
    "last_name",
    "personal_email",
    "phone",
    "date_of_joining",
    "employment_type",
    "department_id",
    "designation_id",
    "manager_id",
    "work_location_id",
    "status",
  ])
  if (patch.employment_type) optionalEnum(patch.employment_type, EMPLOYMENT_TYPES, "employment_type")
  if (patch.status) optionalEnum(patch.status, EMPLOYEE_STATUSES, "status")
  if (patch.personal_email) patch.personal_email = requireEmail(patch.personal_email, "personal_email")
  patch.updated_at = nowIso()

  const updated = await updateItem(TABLES.employees, { _id: id }, patch)
  if (updated.cognito_username) {
    await updateCognitoProfile(updated.cognito_username, {
      firstName: updated.first_name,
      lastName: updated.last_name,
      phone: updated.phone,
      employeeId: id,
    })
  }
  return ok({ employee: publicEmployee(updated) })
}

export async function deactivateEmployee(event, caller) {
  assertHr(caller)
  const id = event.pathParams.id
  const employee = await getEmployeeRecord(id)
  const timestamp = nowIso()
  const updated = await updateItem(TABLES.employees, { _id: id }, {
    status: "inactive",
    updated_at: timestamp,
  })
  await updateItem(TABLES.access, { employee_id: id }, {
    login_enabled: false,
  })
  if (employee.cognito_username) {
    await disableLogin(employee.cognito_username)
  }
  return ok({ employee: publicEmployee(updated) })
}

export async function resendEmployeeInvite(event, caller) {
  assertHr(caller)
  const employee = await getEmployeeRecord(event.pathParams.id)
  if (!employee.work_email) throw new HttpError(400, "Employee has no work_email")
  try {
    await resendInvite(employee.work_email)
  } catch {
    await inviteEmployee({
      email: employee.work_email,
      firstName: employee.first_name,
      lastName: employee.last_name,
      phone: employee.phone,
      employeeId: employee._id,
      roleId: (await getItem(TABLES.access, { employee_id: employee._id }))?.role_id || ROLES.EMPLOYEE,
    })
  }
  const updated = await updateItem(TABLES.employees, { _id: employee._id }, {
    cognito_username: employee.work_email,
    profile_verification_status: "invited",
    invitation_sent_at: nowIso(),
    updated_at: nowIso(),
  })
  return ok({ employee: publicEmployee(updated), invitation: { sent: true } })
}

export async function verifyEmployeeByHr(event, caller) {
  assertHr(caller)
  const updated = await updateItem(TABLES.employees, { _id: event.pathParams.id }, {
    profile_verification_status: "verified",
    profile_verified_at: nowIso(),
    status: "active",
    updated_at: nowIso(),
  })
  return ok({ employee: publicEmployee(updated) })
}

export { publicEmployee, sanitizePersonal, sanitizeAccess, sanitizePayroll, personalItem, payrollItem }
