export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  HR_LEAD: "HR_LEAD",
  FINANCE: "FINANCE",
  MANAGER: "MANAGER",
  EMPLOYEE: "EMPLOYEE",
} as const

export type AppRole = (typeof ROLES)[keyof typeof ROLES]

export const ROLE_LABELS: Record<AppRole, string> = {
  SUPER_ADMIN: "Super Admin",
  HR_LEAD: "HR Lead",
  FINANCE: "Finance",
  MANAGER: "Manager",
  EMPLOYEE: "Employee",
}

export const SECTION_ROLES: Record<string, AppRole[]> = {
  dashboard: ["SUPER_ADMIN", "HR_LEAD", "FINANCE", "MANAGER", "EMPLOYEE"],
  employees: ["SUPER_ADMIN", "HR_LEAD", "FINANCE", "MANAGER"],
  "employees/new": ["SUPER_ADMIN", "HR_LEAD"],
  "verify-profile": ["SUPER_ADMIN", "HR_LEAD", "FINANCE", "MANAGER", "EMPLOYEE"],
  profile: ["SUPER_ADMIN", "HR_LEAD", "FINANCE", "MANAGER", "EMPLOYEE"],
  attendance: ["SUPER_ADMIN", "HR_LEAD", "FINANCE", "MANAGER", "EMPLOYEE"],
  leave: ["SUPER_ADMIN", "HR_LEAD", "MANAGER", "EMPLOYEE"],
  tasks: ["EMPLOYEE"],
  pay: ["EMPLOYEE"],
  reimbursements: ["EMPLOYEE"],
  tax: ["EMPLOYEE"],
  documents: ["EMPLOYEE"],
  help: ["EMPLOYEE"],
  payroll: ["SUPER_ADMIN", "HR_LEAD", "FINANCE"],
  recruitment: ["SUPER_ADMIN", "HR_LEAD"],
  performance: ["SUPER_ADMIN", "HR_LEAD", "MANAGER"],
  departments: ["SUPER_ADMIN", "HR_LEAD", "MANAGER"],
  reports: ["SUPER_ADMIN", "HR_LEAD", "FINANCE"],
  "dev-log": ["SUPER_ADMIN"],
  settings: ["SUPER_ADMIN"],
}

export function isAppRole(value: unknown): value is AppRole {
  return typeof value === "string" && value in ROLE_LABELS
}

export function canAccess(role: AppRole | null | undefined, section: string) {
  if (!role) return false
  return SECTION_ROLES[section]?.includes(role) ?? false
}

export function canManageEmployees(role: AppRole | null | undefined) {
  return role === "SUPER_ADMIN" || role === "HR_LEAD"
}

export function isEmployeeRole(role: AppRole | null | undefined) {
  return role === "EMPLOYEE"
}

export function canApproveLeave(role: AppRole | null | undefined) {
  return role === "SUPER_ADMIN" || role === "HR_LEAD" || role === "MANAGER"
}

export function pathToSection(path: string) {
  if (path === "/dashboard" || path === "/dashboard/") return "dashboard"
  const match = path.match(/^\/dashboard\/(.+)$/)
  return match?.[1] || path
}
