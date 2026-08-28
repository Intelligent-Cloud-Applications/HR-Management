export interface LeaveRequest {
  id: string
  employeeId: string
  employeeName: string
  avatar: string
  department: string
  leaveType: "Sick Leave" | "Casual Leave" | "Earned Leave" | "Maternity/Paternity"
  startDate: string
  endDate: string
  days: number
  reason: string
  status: "Pending" | "Approved" | "Rejected"
  appliedOn: string
}

export interface LeaveBalance {
  type: string
  allocated: number
  used: number
  remaining: number
  color: string
}

export const INITIAL_LEAVE_BALANCES: LeaveBalance[] = [
  { type: "Casual Leave", allocated: 12, used: 4, remaining: 8, color: "from-blue-500 to-indigo-600" },
  { type: "Sick Leave", allocated: 10, used: 2, remaining: 8, color: "from-emerald-500 to-teal-600" },
  { type: "Earned / Paid", allocated: 18, used: 7, remaining: 11, color: "from-purple-500 to-violet-600" },
  { type: "Parental Leave", allocated: 30, used: 0, remaining: 30, color: "from-amber-500 to-orange-600" },
]

export const INITIAL_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: "lv-1",
    employeeId: "emp-5",
    employeeName: "Devendra Patel",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    department: "Engineering",
    leaveType: "Sick Leave",
    startDate: "2026-08-28",
    endDate: "2026-08-30",
    days: 3,
    reason: "Severe viral fever and physician recommended bed rest.",
    status: "Pending",
    appliedOn: "2026-08-27"
  },
  {
    id: "lv-2",
    employeeId: "emp-2",
    employeeName: "Priya Sundaram",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    department: "Design",
    leaveType: "Casual Leave",
    startDate: "2026-09-04",
    endDate: "2026-09-05",
    days: 2,
    reason: "Family function in hometown.",
    status: "Pending",
    appliedOn: "2026-08-26"
  },
  {
    id: "lv-3",
    employeeId: "emp-3",
    employeeName: "Rohan Varma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    department: "Engineering",
    leaveType: "Earned Leave",
    startDate: "2026-08-15",
    endDate: "2026-08-20",
    days: 6,
    reason: "Annual vacation trip with family.",
    status: "Approved",
    appliedOn: "2026-08-01"
  },
  {
    id: "lv-4",
    employeeId: "emp-8",
    employeeName: "Tanvi Rao",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    department: "Human Resources",
    leaveType: "Casual Leave",
    startDate: "2026-08-10",
    endDate: "2026-08-11",
    days: 2,
    reason: "Personal appointment.",
    status: "Rejected",
    appliedOn: "2026-08-08"
  }
]
