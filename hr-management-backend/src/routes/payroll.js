import { TABLES } from "../config.js"
import { putItem, query } from "../lib/db.js"
import { ok, parseBody } from "../lib/http.js"
import { nowIso } from "../lib/ids.js"
import { assertPayroll } from "../lib/validate.js"
import { getEmployeeRecord, payrollItem, sanitizePayroll } from "./employees.js"
import { PAYROLL_ROLES } from "../config.js"

export async function getPayroll(event, caller) {
  assertPayroll(caller)
  const id = event.pathParams.id
  await getEmployeeRecord(id)
  const page = await query({
    TableName: TABLES.payroll,
    KeyConditionExpression: "employee_id = :id",
    ExpressionAttributeValues: { ":id": id },
    ScanIndexForward: false,
    Limit: 1,
  })
  return ok({ payroll: sanitizePayroll(page.items[0], true) })
}

export async function getPayrollHistory(event, caller) {
  assertPayroll(caller)
  const id = event.pathParams.id
  await getEmployeeRecord(id)
  const page = await query({
    TableName: TABLES.payroll,
    KeyConditionExpression: "employee_id = :id",
    ExpressionAttributeValues: { ":id": id },
    ScanIndexForward: false,
  })
  return ok({
    payroll: page.items.map((item) => sanitizePayroll(item, PAYROLL_ROLES.includes(caller.role))),
  })
}

export async function putPayroll(event, caller) {
  assertPayroll(caller)
  const id = event.pathParams.id
  await getEmployeeRecord(id)
  const body = parseBody(event)
  const item = payrollItem(id, body, nowIso())
  await putItem(TABLES.payroll, item)
  return ok({ payroll: sanitizePayroll(item, true) })
}
