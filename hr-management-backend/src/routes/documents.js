import { TABLES } from "../config.js"
import { deleteItem, getItem, putItem, query } from "../lib/db.js"
import { created, ok, parseBody } from "../lib/http.js"
import { HttpError } from "../lib/http.js"
import { newId, nowIso } from "../lib/ids.js"
import { deleteObject, presignUpload } from "../lib/s3.js"
import {
  ACCESS_POLICIES,
  DOCUMENT_TYPES,
  assertHr,
  assertSelfOrHr,
  optionalEnum,
  requireFields,
} from "../lib/validate.js"
import { getEmployeeRecord } from "./employees.js"
import { HR_ROLES } from "../config.js"

function canReadDocument(caller, employeeId, doc) {
  if (HR_ROLES.includes(caller.role)) return true
  if (caller.employee_id !== employeeId) return false
  return doc.access_policy === "employee_and_hr" || doc.access_policy === "private"
}

export async function listDocuments(event, caller) {
  const id = event.pathParams.id
  assertSelfOrHr(caller, id)
  await getEmployeeRecord(id)
  const page = await query({
    TableName: TABLES.documents,
    IndexName: "employee_id-index",
    KeyConditionExpression: "employee_id = :id",
    ExpressionAttributeValues: { ":id": id },
  })
  return ok({
    documents: page.items.filter((doc) => canReadDocument(caller, id, doc)),
  })
}

export async function presignDocument(event, caller) {
  const id = event.pathParams.id
  assertSelfOrHr(caller, id)
  await getEmployeeRecord(id)
  const body = parseBody(event)
  requireFields(body, ["document_type", "filename"])
  optionalEnum(body.document_type, DOCUMENT_TYPES, "document_type")
  const result = await presignUpload({
    employeeId: id,
    documentType: body.document_type,
    filename: body.filename,
    contentType: body.content_type,
  })
  return ok(result)
}

export async function createDocument(event, caller) {
  const id = event.pathParams.id
  assertSelfOrHr(caller, id)
  await getEmployeeRecord(id)
  const body = parseBody(event)
  requireFields(body, ["document_type", "s3_key"])
  optionalEnum(body.document_type, DOCUMENT_TYPES, "document_type")
  const accessPolicy = optionalEnum(body.access_policy, ACCESS_POLICIES, "access_policy") || "hr_only"
  const item = {
    _id: newId(),
    employee_id: id,
    document_type: body.document_type,
    s3_key: body.s3_key,
    uploaded_by: caller.employee_id || caller.email,
    access_policy: accessPolicy,
    created_at: nowIso(),
  }
  await putItem(TABLES.documents, item)
  return created({ document: item })
}

export async function removeDocument(event, caller) {
  assertHr(caller)
  const { id, docId } = event.pathParams
  const doc = await getItem(TABLES.documents, { _id: docId })
  if (!doc || doc.employee_id !== id) throw new HttpError(404, "Document not found")
  await deleteObject(doc.s3_key)
  await deleteItem(TABLES.documents, { _id: docId })
  return ok({ deleted: true, _id: docId })
}
