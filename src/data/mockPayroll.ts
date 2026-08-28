export interface PayrollRecord {
  id: string
  employeeId: string
  employeeName: string
  role: string
  department: string
  avatar: string
  month: string
  baseSalary: number
  hra: number
  specialAllowance: number
  providentFund: number
  taxDeduction: number
  bonus: number
  netSalary: number
  status: "Processed" | "Pending" | "On Hold"
  paymentMethod: string
  disbursedDate?: string
}

export const PAYROLL_SUMMARY = {
  totalMonthlyPayroll: 18750000,
  taxWithheld: 3450000,
  pfContributions: 1687500,
  pendingDisbursements: 3,
  processedEmployees: 84,
  payrollCycle: "August 2026",
  nextDisbursalDate: "Aug 31, 2026"
}

export const INITIAL_PAYROLL_RECORDS: PayrollRecord[] = [
  {
    id: "pay-1",
    employeeId: "emp-1",
    employeeName: "Aarav Sharma",
    role: "Principal Cloud Architect",
    department: "Engineering",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    month: "August 2026",
    baseSalary: 120000,
    hra: 48000,
    specialAllowance: 69500,
    providentFund: 14400,
    taxDeduction: 31000,
    bonus: 10000,
    netSalary: 202100,
    status: "Processed",
    paymentMethod: "Direct Bank Transfer",
    disbursedDate: "2026-08-27"
  },
  {
    id: "pay-2",
    employeeId: "emp-2",
    employeeName: "Priya Sundaram",
    role: "Senior Product Designer",
    department: "Design",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    month: "August 2026",
    baseSalary: 85000,
    hra: 34000,
    specialAllowance: 43500,
    providentFund: 10200,
    taxDeduction: 18500,
    bonus: 0,
    netSalary: 143800,
    status: "Processed",
    paymentMethod: "Direct Bank Transfer",
    disbursedDate: "2026-08-27"
  },
  {
    id: "pay-3",
    employeeId: "emp-3",
    employeeName: "Rohan Varma",
    role: "Full Stack Tech Lead",
    department: "Engineering",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    month: "August 2026",
    baseSalary: 105000,
    hra: 42000,
    specialAllowance: 53000,
    providentFund: 12600,
    taxDeduction: 24000,
    bonus: 15000,
    netSalary: 178400,
    status: "Processed",
    paymentMethod: "Direct Bank Transfer",
    disbursedDate: "2026-08-27"
  },
  {
    id: "pay-4",
    employeeId: "emp-4",
    employeeName: "Ananya Iyer",
    role: "VP of People & Culture",
    department: "Human Resources",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    month: "August 2026",
    baseSalary: 140000,
    hra: 56000,
    specialAllowance: 70666,
    providentFund: 16800,
    taxDeduction: 38000,
    bonus: 25000,
    netSalary: 236866,
    status: "Processed",
    paymentMethod: "Direct Bank Transfer",
    disbursedDate: "2026-08-27"
  },
  {
    id: "pay-5",
    employeeId: "emp-5",
    employeeName: "Devendra Patel",
    role: "DevOps Engineer",
    department: "Engineering",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    month: "August 2026",
    baseSalary: 70000,
    hra: 28000,
    specialAllowance: 35333,
    providentFund: 8400,
    taxDeduction: 12000,
    bonus: 0,
    netSalary: 112933,
    status: "Pending",
    paymentMethod: "Direct Bank Transfer"
  },
  {
    id: "pay-6",
    employeeId: "emp-6",
    employeeName: "Sneha Mukherjee",
    role: "Product Growth Manager",
    department: "Product",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    month: "August 2026",
    baseSalary: 95000,
    hra: 38000,
    specialAllowance: 42000,
    providentFund: 11400,
    taxDeduction: 21000,
    bonus: 5000,
    netSalary: 147600,
    status: "Pending",
    paymentMethod: "Direct Bank Transfer"
  }
]
