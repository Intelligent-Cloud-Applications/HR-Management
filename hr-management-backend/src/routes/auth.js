import { BOOTSTRAP_SECRET, ROLES, TABLES } from "../config.js"
import { putItem, scan, updateItem } from "../lib/db.js"
import { created, getHeader, ok, parseBody } from "../lib/http.js"
import { HttpError } from "../lib/http.js"
import { newId, nowIso } from "../lib/ids.js"
import { requireEmail, requireFields } from "../lib/validate.js"
import {
  authResult,
  changePassword,
  confirmForgotPassword,
  forgotPassword,
  inviteEmployee,
  login,
  refresh,
  respondNewPassword,
  setPermanentPassword,
} from "../lib/cognito.js"
import { findByEmail, publicEmployee } from "./employees.js"

function requireAuthBody(body) {
  requireFields(body, ["email", "password"])
  return requireEmail(body.email)
}

async function loadEmployeeForLogin(email) {
  return findByEmail(email)
}

async function markPasswordChanged(email) {
  const employee = await loadEmployeeForLogin(email)
  if (!employee) return null
  if (["invited", "not_invited"].includes(employee.profile_verification_status)) {
    return updateItem(TABLES.employees, { _id: employee._id }, {
      profile_verification_status: "pending_verification",
      status: employee.status === "invited" ? "active" : employee.status,
      updated_at: nowIso(),
    })
  }
  return employee
}

export async function loginHandler(event) {
  const body = parseBody(event)
  const email = requireAuthBody(body)
  try {
    const result = await login(email, body.password)
    const payload = authResult(result)
    if (!payload.challengeName) {
      await markPasswordChanged(email)
    }
    const employee = await loadEmployeeForLogin(email)
    return ok({
      ...payload,
      employee: employee ? publicEmployee(employee) : null,
    })
  } catch (err) {
    if (err.name === "NotAuthorizedException" || err.name === "UserNotFoundException") {
      throw new HttpError(401, "Invalid email or password")
    }
    if (err.name === "PasswordResetRequiredException") {
      throw new HttpError(403, "Password reset required")
    }
    throw err
  }
}

export async function newPasswordHandler(event) {
  const body = parseBody(event)
  requireFields(body, ["email", "new_password", "session"])
  const email = requireEmail(body.email)
  try {
    const result = await respondNewPassword({
      email,
      newPassword: body.new_password,
      session: body.session,
    })
    const employee = await markPasswordChanged(email)
    return ok({
      ...authResult(result),
      employee: employee ? publicEmployee(employee) : null,
    })
  } catch (err) {
    throw new HttpError(400, err.message || "Unable to set new password")
  }
}

export async function refreshHandler(event) {
  const body = parseBody(event)
  requireFields(body, ["refresh_token"])
  try {
    return ok(authResult(await refresh(body.refresh_token)))
  } catch (err) {
    throw new HttpError(401, "Refresh token is invalid or expired")
  }
}

export async function forgotPasswordHandler(event) {
  const body = parseBody(event)
  requireFields(body, ["email"])
  const email = requireEmail(body.email)
  try {
    await forgotPassword(email)
  } catch {
    // Do not reveal whether the account exists.
  }
  return ok({ sent: true })
}

export async function confirmForgotPasswordHandler(event) {
  const body = parseBody(event)
  requireFields(body, ["email", "code", "password"])
  const email = requireEmail(body.email)
  await confirmForgotPassword({ email, code: body.code, password: body.password })
  return ok({ updated: true })
}

export async function changePasswordHandler(event, caller) {
  const body = parseBody(event)
  requireFields(body, ["previous_password", "proposed_password"])
  const accessToken = (getHeader(event, "authorization") || "").replace(/^Bearer\s+/i, "")
  await changePassword({
    accessToken,
    previousPassword: body.previous_password,
    proposedPassword: body.proposed_password,
  })
  return ok({ updated: true, employee_id: caller.employee_id })
}

export async function bootstrapAdmin(event) {
  const body = parseBody(event)
  requireFields(body, ["secret", "first_name", "last_name", "work_email", "password"])
  if (!BOOTSTRAP_SECRET || body.secret !== BOOTSTRAP_SECRET) {
    throw new HttpError(403, "Invalid bootstrap secret")
  }

  const existingAdmins = await scan({
    TableName: TABLES.access,
    FilterExpression: "role_id = :role",
    ExpressionAttributeValues: { ":role": ROLES.SUPER_ADMIN },
    Limit: 1,
  })
  if (existingAdmins.items.length) {
    throw new HttpError(409, "An administrator already exists")
  }

  const email = requireEmail(body.work_email, "work_email")
  if (await findByEmail(email)) {
    throw new HttpError(409, "An employee with this work_email already exists")
  }

  const timestamp = nowIso()
  const id = newId()
  const employee = {
    _id: id,
    employee_code: "TW-ADMIN-0001",
    first_name: body.first_name.trim(),
    last_name: body.last_name.trim(),
    work_email: email,
    personal_email: null,
    phone: body.phone || null,
    date_of_joining: timestamp.slice(0, 10),
    employment_type: "full_time",
    department_id: body.department_id || "hr",
    designation_id: "super_admin",
    manager_id: null,
    work_location_id: null,
    status: "active",
    cognito_username: email,
    profile_verification_status: "verified",
    profile_verified_at: timestamp,
    invitation_sent_at: timestamp,
    created_at: timestamp,
    updated_at: timestamp,
  }
  const access = {
    employee_id: id,
    role_id: ROLES.SUPER_ADMIN,
    permissions: ["*"],
    login_enabled: true,
    created_at: timestamp,
  }

  await putItem(TABLES.employees, employee)
  await putItem(TABLES.access, access)
  await putItem(TABLES.personal, {
    employee_id: id,
    date_of_birth: null,
    gender: null,
    addresses: [],
    other_personal_details: {},
    updated_at: timestamp,
  })

  try {
    await inviteEmployee({
      email,
      firstName: employee.first_name,
      lastName: employee.last_name,
      phone: employee.phone,
      employeeId: id,
      roleId: ROLES.SUPER_ADMIN,
      suppressEmail: true,
    })
    await setPermanentPassword(email, body.password)
  } catch (err) {
    throw new HttpError(500, `Admin user saved but Cognito setup failed: ${err.message}`)
  }

  return created({
    employee: publicEmployee(employee),
    access,
    login: { email, role_id: ROLES.SUPER_ADMIN },
  })
}

export { loadEmployeeForLogin }
