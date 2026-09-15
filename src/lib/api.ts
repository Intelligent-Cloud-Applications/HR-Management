export const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "")

export type ApiEmployee = {
  _id: string
  employee_code: string
  first_name: string
  last_name: string
  work_email: string
  personal_email?: string | null
  phone?: string | null
  date_of_joining?: string | null
  employment_type?: string | null
  department_id?: string | null
  designation_id?: string | null
  manager_id?: string | null
  work_location_id?: string | null
  status: string
  profile_verification_status?: string
  profile_verified_at?: string | null
  invitation_sent_at?: string | null
  created_at: string
  updated_at: string
}

export type ApiPersonal = {
  employee_id?: string
  date_of_birth?: string | null
  gender?: string | null
  addresses?: Array<{
    type?: string
    line1?: string
    line2?: string
    city?: string
    state?: string
    postal_code?: string
    country?: string
  }>
  other_personal_details?: Record<string, unknown>
}

export type ApiPayroll = {
  employee_id?: string
  salary_structure_id?: string | null
  ctc?: number | null
  gross_salary?: number | null
  effective_from?: string
  bank_account?: string | null
  ifsc?: string | null
  pan?: string | null
  uan?: string | null
}

export type ApiEmergencyContact = {
  employee_id?: string
  contact_id?: string
  name: string
  relationship: string
  phone: string
  email?: string | null
}

export type ApiAccess = {
  employee_id?: string
  role_id: string
  permissions?: string[]
  login_enabled: boolean
}

export type EmployeeProfile = {
  employee: ApiEmployee
  personal: ApiPersonal | null
  payroll: ApiPayroll | null
  documents?: Array<Record<string, unknown>>
  emergency_contacts: ApiEmergencyContact[]
  access: ApiAccess | null
}

export type SessionTokens = {
  idToken: string
  accessToken: string
  refreshToken?: string
  expiresIn?: number
  tokenType?: string
}

type ApiError = { error?: string; details?: unknown }

async function request<T>(path: string, options: RequestInit = {}, token?: string | null): Promise<T> {
  if (!API_URL) throw new Error("VITE_API_URL is not configured")
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(`${API_URL}${path}`, { ...options, headers })
  const text = await response.text()
  const body = text ? (JSON.parse(text) as T & ApiError) : ({} as T & ApiError)
  if (!response.ok) {
    throw new Error(body.error || `Request failed (${response.status})`)
  }
  return body
}

export const api = {
  health: () => request<{ ok: boolean; service: string }>("/health"),
  login: (email: string, password: string) =>
    request<{
      challengeName: string | null
      session?: string
      tokens?: SessionTokens
      employee?: ApiEmployee | null
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  respondNewPassword: (email: string, newPassword: string, session: string) =>
    request<{
      challengeName: string | null
      tokens?: SessionTokens
      employee?: ApiEmployee | null
    }>("/auth/respond-new-password", {
      method: "POST",
      body: JSON.stringify({ email, new_password: newPassword, session }),
    }),
  listEmployees: (token: string) =>
    request<{ employees: ApiEmployee[] }>("/employees", {}, token),
  getEmployee: (token: string, id: string) =>
    request<EmployeeProfile>(`/employees/${id}`, {}, token),
  createEmployee: (token: string, payload: Record<string, unknown>) =>
    request<{
      employee: ApiEmployee
      invitation: { sent: boolean; error?: string }
    }>("/employees", { method: "POST", body: JSON.stringify(payload) }, token),
  deactivateEmployee: (token: string, id: string) =>
    request<{ employee: ApiEmployee }>(`/employees/${id}`, { method: "DELETE" }, token),
  resendInvite: (token: string, id: string) =>
    request<{ employee: ApiEmployee; invitation: { sent: boolean } }>(
      `/employees/${id}/resend-invite`,
      { method: "POST" },
      token
    ),
  me: (token: string) =>
    request<{
      employee: ApiEmployee
      personal: {
        date_of_birth?: string | null
        gender?: string | null
        addresses?: unknown[]
        other_personal_details?: Record<string, unknown>
      } | null
      emergency_contacts: Array<{
        contact_id: string
        name: string
        relationship: string
        phone: string
        email?: string | null
      }>
      caller: { employee_id: string; role: string; email: string }
    }>("/me", {}, token),
  updateMe: (token: string, payload: Record<string, unknown>) =>
    request("/me", { method: "PUT", body: JSON.stringify(payload) }, token),
  verifyMe: (token: string, payload: Record<string, unknown> = {}) =>
    request<{ verified: boolean; employee: ApiEmployee }>(
      "/me/verify",
      { method: "POST", body: JSON.stringify(payload) },
      token
    ),
}
