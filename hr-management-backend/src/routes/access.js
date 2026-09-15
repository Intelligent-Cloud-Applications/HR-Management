import { TABLES } from "../config.js"
import { getItem, updateItem } from "../lib/db.js"
import { ok, parseBody } from "../lib/http.js"
import { HttpError } from "../lib/http.js"
import { nowIso } from "../lib/ids.js"
import { ALL_ROLES, assertHr, optionalEnum } from "../lib/validate.js"
import { getEmployeeRecord, sanitizeAccess } from "./employees.js"
import { disableLogin, enableLogin, replaceCognitoGroup, updateCognitoProfile } from "../lib/cognito.js"

export async function getAccess(event, caller) {
  assertHr(caller)
  const id = event.pathParams.id
  await getEmployeeRecord(id)
  const item = await getItem(TABLES.access, { employee_id: id })
  return ok({ access: sanitizeAccess(item) })
}

export async function putAccess(event, caller) {
  assertHr(caller)
  const id = event.pathParams.id
  const employee = await getEmployeeRecord(id)
  const current = await getItem(TABLES.access, { employee_id: id })
  if (!current) throw new HttpError(404, "Access record not found")
  const body = parseBody(event)
  const roleId = optionalEnum(body.role_id, ALL_ROLES, "role_id") || current.role_id
  const loginEnabled = body.login_enabled === undefined ? current.login_enabled : Boolean(body.login_enabled)
  const updated = await updateItem(TABLES.access, { employee_id: id }, {
    role_id: roleId,
    permissions: body.permissions ?? current.permissions ?? [],
    login_enabled: loginEnabled,
    updated_at: nowIso(),
  })

  if (employee.cognito_username) {
    if (roleId !== current.role_id) {
      await replaceCognitoGroup(employee.cognito_username, current.role_id, roleId)
      await updateCognitoProfile(employee.cognito_username, { roleId, employeeId: id })
    }
    if (loginEnabled) await enableLogin(employee.cognito_username)
    else await disableLogin(employee.cognito_username)
  }

  return ok({ access: sanitizeAccess(updated) })
}
