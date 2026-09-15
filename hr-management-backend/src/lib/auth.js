import { CognitoJwtVerifier } from "aws-jwt-verify"
import { TABLES, USER_POOL_CLIENT_ID, USER_POOL_ID, ROLES } from "../config.js"
import { getItem, query } from "./db.js"
import { INDEXES } from "../config.js"
import { getHeader, HttpError } from "./http.js"

const idVerifier = CognitoJwtVerifier.create({
  userPoolId: USER_POOL_ID,
  tokenUse: "id",
  clientId: USER_POOL_CLIENT_ID,
})

const accessVerifier = CognitoJwtVerifier.create({
  userPoolId: USER_POOL_ID,
  tokenUse: "access",
  clientId: USER_POOL_CLIENT_ID,
})

async function verifyJwt(token) {
  try {
    return await idVerifier.verify(token)
  } catch {
    return accessVerifier.verify(token)
  }
}

export async function authenticate(event) {
  const header = getHeader(event, "authorization") || ""
  const token = header.toLowerCase().startsWith("bearer ")
    ? header.slice(7).trim()
    : header.trim()

  if (!token) {
    throw new HttpError(401, "Missing Authorization bearer token")
  }

  let payload
  try {
    payload = await verifyJwt(token)
  } catch {
    throw new HttpError(401, "Invalid or expired token")
  }

  const email = String(payload.email || payload.username || "").toLowerCase()
  const groups = payload["cognito:groups"] || []
  const employeeIdFromToken = payload["custom:employee_id"]
  const roleFromToken = payload["custom:role"] || groups[0]

  let employee = null
  if (employeeIdFromToken) {
    employee = await getItem(TABLES.employees, { _id: employeeIdFromToken })
  }
  if (!employee && email) {
    const found = await query({
      TableName: TABLES.employees,
      IndexName: INDEXES.workEmail,
      KeyConditionExpression: "work_email = :email",
      ExpressionAttributeValues: { ":email": email },
      Limit: 1,
    })
    employee = found.items[0] || null
  }

  const access = employee
    ? await getItem(TABLES.access, { employee_id: employee._id })
    : null

  return {
    email,
    sub: payload.sub,
    groups,
    employee_id: employee?._id || employeeIdFromToken || null,
    role: access?.role_id || roleFromToken || ROLES.EMPLOYEE,
    permissions: access?.permissions || [],
    login_enabled: access?.login_enabled !== false,
    employee,
    access,
    accessToken: token,
  }
}
