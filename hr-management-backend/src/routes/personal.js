import { TABLES } from "../config.js"
import { getItem, putItem } from "../lib/db.js"
import { ok, parseBody } from "../lib/http.js"
import { nowIso } from "../lib/ids.js"
import { assertSelfOrHr, pick } from "../lib/validate.js"
import { getEmployeeRecord, personalItem, sanitizePersonal } from "./employees.js"

export async function getPersonal(event, caller) {
  const id = event.pathParams.id
  assertSelfOrHr(caller, id)
  await getEmployeeRecord(id)
  const item = await getItem(TABLES.personal, { employee_id: id })
  return ok({ personal: sanitizePersonal(item) })
}

export async function putPersonal(event, caller) {
  const id = event.pathParams.id
  assertSelfOrHr(caller, id)
  await getEmployeeRecord(id)
  const body = parseBody(event)
  const current = (await getItem(TABLES.personal, { employee_id: id })) || {}
  const merged = {
    ...current,
    ...pick(body, ["date_of_birth", "gender", "addresses", "other_personal_details"]),
  }
  const item = personalItem(id, merged, nowIso())
  await putItem(TABLES.personal, item)
  return ok({ personal: sanitizePersonal(item) })
}
