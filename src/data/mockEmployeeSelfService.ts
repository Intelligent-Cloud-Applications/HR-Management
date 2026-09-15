export type ReimbursementClaim = {
  id: string
  category: "Travel" | "Internet" | "Meals" | "Medical" | "Other"
  amount: number
  submittedOn: string
  status: "Submitted" | "Approved" | "Paid" | "Rejected"
  note: string
}

export type TaxInvestment = {
  section: string
  declared: number
  limit: number
  proof: "Pending" | "Submitted" | "Verified"
}

export type EmployeeDocument = {
  id: string
  name: string
  category: "Payroll" | "Tax" | "HR" | "Identity"
  updatedOn: string
}

export const INITIAL_REIMBURSEMENTS: ReimbursementClaim[] = [
  {
    id: "rb-1",
    category: "Internet",
    amount: 1499,
    submittedOn: "2026-08-12",
    status: "Paid",
    note: "Home broadband for August WFH days",
  },
  {
    id: "rb-2",
    category: "Travel",
    amount: 2840,
    submittedOn: "2026-08-22",
    status: "Approved",
    note: "Client visit cab fare, Koramangala to Whitefield",
  },
  {
    id: "rb-3",
    category: "Meals",
    amount: 680,
    submittedOn: "2026-08-28",
    status: "Submitted",
    note: "Late working dinner during release",
  },
]

export const TAX_INVESTMENTS: TaxInvestment[] = [
  { section: "80C (PF, ELSS, LIC)", declared: 126000, limit: 150000, proof: "Verified" },
  { section: "80D (Health insurance)", declared: 18000, limit: 25000, proof: "Submitted" },
  { section: "HRA", declared: 168000, limit: 252000, proof: "Pending" },
  { section: "80E (Education loan)", declared: 0, limit: 0, proof: "Pending" },
]

export const EMPLOYEE_DOCUMENTS: EmployeeDocument[] = [
  { id: "doc-1", name: "Payslip — August 2026", category: "Payroll", updatedOn: "2026-08-27" },
  { id: "doc-2", name: "Payslip — July 2026", category: "Payroll", updatedOn: "2026-07-30" },
  { id: "doc-3", name: "Form 16 — FY 2025-26 (provisional)", category: "Tax", updatedOn: "2026-08-15" },
  { id: "doc-4", name: "Appointment letter", category: "HR", updatedOn: "2024-03-04" },
  { id: "doc-5", name: "PAN & Aadhaar copies", category: "Identity", updatedOn: "2024-03-04" },
]
