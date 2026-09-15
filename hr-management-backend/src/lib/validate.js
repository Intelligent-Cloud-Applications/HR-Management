import { HttpError } from "./http.js"
import {
  ALL_ROLES,
  DIRECTORY_ROLES,
  DOCUMENT_TYPES,
  EMPLOYEE_STATUSES,
  EMPLOYMENT_TYPES,
  ACCESS_POLICIES,
  HR_ROLES,
  PAYROLL_ROLES,
} from "../config.js"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function requireFields(body, fields) {
  const missing = fields.filter((field) => {
    const value = body?.[field]
    return value === undefined || value === null || String(value).trim() === ""
  })
  if (missing.length) {
    throw new HttpError(400, `Missing required fields: ${missing.join(", ")}`)
  }
}

export function optionalEnum(value, allowed, field) {
  if (value === undefined || value === null || value === "") return undefined
  if (!allowed.includes(value)) {
    throw new HttpError(400, `Invalid ${field}. Allowed: ${allowed.join(", ")}`)
  }
  return value
}

export function requireEmail(value, field = "email") {
  if (!EMAIL_RE.test(String(value || "").toLowerCase())) {
    throw new HttpError(400, `Invalid ${field}`)
  }
  return String(value).trim().toLowerCase()
}

export function pick(body, fields) {
  const out = {}
  for (const field of fields) {
    if (body[field] !== undefined) out[field] = body[field]
  }
  return out
}

export function assertHr(caller) {
  if (!HR_ROLES.includes(caller.role)) {
    throw new HttpError(403, "HR admin role required")
  }
}

export function assertPayroll(caller) {
  if (!PAYROLL_ROLES.includes(caller.role)) {
    throw new HttpError(403, "Payroll access required")
  }
}

export function assertDirectory(caller) {
  if (!DIRECTORY_ROLES.includes(caller.role) && caller.role !== "EMPLOYEE") {
    throw new HttpError(403, "Insufficient permission")
  }
}

export function assertSelfOrHr(caller, employeeId) {
  if (caller.employee_id === employeeId || HR_ROLES.includes(caller.role)) return
  throw new HttpError(403, "You can only access your own employee record")
}

export function assertSelfOrDirectory(caller, employeeId) {
  if (caller.employee_id === employeeId || DIRECTORY_ROLES.includes(caller.role)) return
  throw new HttpError(403, "You can only access your own employee record")
}

export {
  ALL_ROLES,
  DOCUMENT_TYPES,
  EMPLOYEE_STATUSES,
  EMPLOYMENT_TYPES,
  ACCESS_POLICIES,
}
