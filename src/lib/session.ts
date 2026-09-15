import { ApiEmployee, SessionTokens } from "./api"
import { AppRole, isAppRole } from "./roles"

const SESSION_KEY = "tekkzywork_session"

export type AuthSession = {
  tokens: SessionTokens
  employee: ApiEmployee | null
  email: string
  role: AppRole
}

export function decodeIdToken(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1]
    if (!payload) return null
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/")
    return JSON.parse(atob(normalized)) as Record<string, unknown>
  } catch {
    return null
  }
}

export function roleFromToken(token?: string | null): AppRole | null {
  if (!token) return null
  const payload = decodeIdToken(token)
  if (!payload) return null
  const customRole = payload["custom:role"]
  const groups = payload["cognito:groups"]
  if (isAppRole(customRole)) return customRole
  if (Array.isArray(groups) && isAppRole(groups[0])) return groups[0]
  return null
}

export function getSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as AuthSession) : null
  } catch {
    return null
  }
}

export function saveSession(session: AuthSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function getIdToken() {
  return getSession()?.tokens.idToken || null
}

export function getRole(): AppRole | null {
  const session = getSession()
  if (session?.role && isAppRole(session.role)) return session.role
  return roleFromToken(session?.tokens.idToken)
}

export function getSelfIdentity() {
  const session = getSession()
  const employee = session?.employee
  const name = employee
    ? `${employee.first_name} ${employee.last_name}`.trim()
    : ""
  return {
    name: name || session?.email || "You",
    email: employee?.work_email || session?.email || "",
    department: employee?.department_id || "Engineering",
    designation: employee?.designation_id || "",
    employeeCode: employee?.employee_code || "",
    employee,
  }
}

export function isOwnRecord(employeeName: string) {
  const self = getSelfIdentity()
  return employeeName.trim().toLowerCase() === self.name.trim().toLowerCase()
}
