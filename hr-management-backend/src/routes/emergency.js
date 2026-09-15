import { TABLES } from "../config.js"
import { deleteItem, getItem, putItem, query } from "../lib/db.js"
import { created, ok, parseBody } from "../lib/http.js"
import { HttpError } from "../lib/http.js"
import { newId, nowIso } from "../lib/ids.js"
import { assertSelfOrHr, requireFields } from "../lib/validate.js"
import { getEmployeeRecord } from "./employees.js"

export async function listEmergencyContacts(event, caller) {
  const id = event.pathParams.id
  assertSelfOrHr(caller, id)
  await getEmployeeRecord(id)
  const page = await query({
    TableName: TABLES.emergency,
    KeyConditionExpression: "employee_id = :id",
    ExpressionAttributeValues: { ":id": id },
  })
  return ok({ emergency_contacts: page.items })
}

export async function createEmergencyContact(event, caller) {
  const id = event.pathParams.id
  assertSelfOrHr(caller, id)
  await getEmployeeRecord(id)
  const body = parseBody(event)
  requireFields(body, ["name", "relationship", "phone"])
  const item = {
    employee_id: id,
    contact_id: newId(),
    name: body.name,
    relationship: body.relationship,
    phone: body.phone,
    email: body.email || null,
    created_at: nowIso(),
  }
  await putItem(TABLES.emergency, item)
  return created({ emergency_contact: item })
}

export async function updateEmergencyContact(event, caller) {
  const { id, contactId } = event.pathParams
  assertSelfOrHr(caller, id)
  const current = await getItem(TABLES.emergency, { employee_id: id, contact_id: contactId })
  if (!current) throw new HttpError(404, "Emergency contact not found")
  const body = parseBody(event)
  const item = {
    ...current,
    name: body.name ?? current.name,
    relationship: body.relationship ?? current.relationship,
    phone: body.phone ?? current.phone,
    email: body.email ?? current.email,
    updated_at: nowIso(),
  }
  await putItem(TABLES.emergency, item)
  return ok({ emergency_contact: item })
}

export async function removeEmergencyContact(event, caller) {
  const { id, contactId } = event.pathParams
  assertSelfOrHr(caller, id)
  const current = await getItem(TABLES.emergency, { employee_id: id, contact_id: contactId })
  if (!current) throw new HttpError(404, "Emergency contact not found")
  await deleteItem(TABLES.emergency, { employee_id: id, contact_id: contactId })
  return ok({ deleted: true, contact_id: contactId })
}
