export const REGION = process.env.AWS_REGION || process.env.REGION || "us-east-2"

export const TABLES = {
  employees: process.env.TABLE_EMPLOYEES || "beta_hr_management_employees",
  personal: process.env.TABLE_PERSONAL || "beta_hr_management_employee_personal",
  payroll: process.env.TABLE_PAYROLL || "beta_hr_management_employee_payroll",
  documents: process.env.TABLE_DOCUMENTS || "beta_hr_management_employee_documents",
  emergency: process.env.TABLE_EMERGENCY || "beta_hr_management_employee_emergency_contacts",
  access: process.env.TABLE_ACCESS || "beta_hr_management_employee_access",
}

export const INDEXES = {
  employeeCode: "employee_code-index",
  workEmail: "work_email-index",
  status: "status-index",
  documentsByEmployee: "employee_id-index",
}

export const USER_POOL_ID = process.env.USER_POOL_ID
export const USER_POOL_CLIENT_ID = process.env.USER_POOL_CLIENT_ID
export const DOCUMENTS_BUCKET = process.env.DOCUMENTS_BUCKET
export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
export const BOOTSTRAP_SECRET = process.env.BOOTSTRAP_SECRET

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  HR_LEAD: "HR_LEAD",
  FINANCE: "FINANCE",
  MANAGER: "MANAGER",
  EMPLOYEE: "EMPLOYEE",
}

export const HR_ROLES = [ROLES.SUPER_ADMIN, ROLES.HR_LEAD]
export const PAYROLL_ROLES = [ROLES.SUPER_ADMIN, ROLES.HR_LEAD, ROLES.FINANCE]
export const DIRECTORY_ROLES = [ROLES.SUPER_ADMIN, ROLES.HR_LEAD, ROLES.FINANCE, ROLES.MANAGER]
export const ALL_ROLES = Object.values(ROLES)

export const EMPLOYMENT_TYPES = ["full_time", "part_time", "contract", "intern", "consultant"]
export const EMPLOYEE_STATUSES = ["invited", "active", "on_leave", "inactive", "terminated"]
export const VERIFICATION_STATUSES = [
  "not_invited",
  "invited",
  "pending_verification",
  "changes_submitted",
  "verified",
]
export const DOCUMENT_TYPES = [
  "aadhaar",
  "pan",
  "passport",
  "offer_letter",
  "contract",
  "education",
  "other",
]
export const ACCESS_POLICIES = ["private", "employee_and_hr", "hr_only", "finance_only"]
