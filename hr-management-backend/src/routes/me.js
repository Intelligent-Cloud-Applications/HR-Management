import { TABLES } from "../config.js"
import { getItem, putItem, query, transactWrite, updateItem } from "../lib/db.js"
import { ok, parseBody } from "../lib/http.js"
import { HttpError } from "../lib/http.js"
import { newId, nowIso } from "../lib/ids.js"
import { pick } from "../lib/validate.js"
import {
  assembleEmployee,
  getEmployeeRecord,
  personalItem,
  publicEmployee,
} from "./employees.js"

export async function getMe(_event, caller) {
  if (!caller.employee_id) {
    throw new HttpError(404, "No employee profile is linked to this login")
  }
  const profile = await assembleEmployee(caller.employee_id, caller)
  return ok({
    ...profile,
    caller: {
      employee_id: caller.employee_id,
      role: caller.role,
      email: caller.email,
      permissions: caller.permissions,
    },
  })
}

export async function updateMe(event, caller) {
  if (!caller.employee_id) {
    throw new HttpError(404, "No employee profile is linked to this login")
  }
  const id = caller.employee_id
  await getEmployeeRecord(id)
  const body = parseBody(event)
  const timestamp = nowIso()

  const employeePatch = pick(body, ["personal_email", "phone"])
  if (Object.keys(employeePatch).length) {
    employeePatch.updated_at = timestamp
    if (caller.employee?.profile_verification_status === "verified") {
      employeePatch.profile_verification_status = "changes_submitted"
    }
    await updateItem(TABLES.employees, { _id: id }, employeePatch)
  }

  if (body.personal) {
    const current = (await getItem(TABLES.personal, { employee_id: id })) || {}
    await putItem(TABLES.personal, personalItem(id, { ...current, ...body.personal }, timestamp))
  }

  if (Array.isArray(body.emergency_contacts)) {
    const existing = await query({
      TableName: TABLES.emergency,
      KeyConditionExpression: "employee_id = :id",
      ExpressionAttributeValues: { ":id": id },
    })
    const writes = existing.items.map((item) => ({
      Delete: {
        TableName: TABLES.emergency,
        Key: { employee_id: id, contact_id: item.contact_id },
      },
    }))
    for (const contact of body.emergency_contacts) {
      writes.push({
        Put: {
          TableName: TABLES.emergency,
          Item: {
            employee_id: id,
            contact_id: contact.contact_id || newId(),
            name: contact.name,
            relationship: contact.relationship,
            phone: contact.phone,
            email: contact.email || null,
            created_at: timestamp,
          },
        },
      })
    }
    if (writes.length) await transactWrite(writes)
  }

  if (["invited", "verified"].includes(caller.employee?.profile_verification_status)) {
    await updateItem(TABLES.employees, { _id: id }, {
      profile_verification_status: "changes_submitted",
      updated_at: timestamp,
    })
  }

  return ok(await assembleEmployee(id, caller))
}

export async function verifyMe(event, caller) {
  if (!caller.employee_id) {
    throw new HttpError(404, "No employee profile is linked to this login")
  }
  const body = parseBody(event)
  if (body.personal || body.emergency_contacts || body.phone || body.personal_email) {
    await updateMe({ ...event, body: JSON.stringify(body) }, caller)
  }

  const updated = await updateItem(TABLES.employees, { _id: caller.employee_id }, {
    profile_verification_status: "verified",
    profile_verified_at: nowIso(),
    status: caller.employee?.status === "invited" ? "active" : caller.employee?.status,
    updated_at: nowIso(),
  })

  return ok({
    verified: true,
    employee: publicEmployee(updated),
  })
}
