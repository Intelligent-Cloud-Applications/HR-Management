export interface AttendanceRecord {
  id: string
  employeeId: string
  employeeName: string
  avatar: string
  department: string
  date: string
  checkIn: string
  checkOut: string
  workHours: string
  status: "Present" | "Late" | "WFH" | "Absent" | "Half Day"
}

export const ATTENDANCE_STATS = {
  presentRate: "94.2%",
  presentCount: 96,
  onTimeCount: 88,
  lateArrivals: 8,
  wfhCount: 14,
  absentees: 4,
  avgWorkHours: "8h 42m"
}

export const WEEKLY_ATTENDANCE_DATA = [
  { day: "Mon", present: 96, late: 6, wfh: 12, absent: 4 },
  { day: "Tue", present: 98, late: 4, wfh: 10, absent: 2 },
  { day: "Wed", present: 94, late: 8, wfh: 15, absent: 6 },
  { day: "Thu", present: 97, late: 5, wfh: 11, absent: 3 },
  { day: "Fri", present: 91, late: 11, wfh: 18, absent: 9 },
]

export const RECENT_ATTENDANCE_LOGS: AttendanceRecord[] = [
  {
    id: "att-1",
    employeeId: "emp-1",
    employeeName: "Aarav Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    department: "Engineering",
    date: "2026-08-28",
    checkIn: "09:12 AM",
    checkOut: "06:30 PM",
    workHours: "9h 18m",
    status: "Present"
  },
  {
    id: "att-2",
    employeeId: "emp-2",
    employeeName: "Priya Sundaram",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    department: "Design",
    date: "2026-08-28",
    checkIn: "09:45 AM",
    checkOut: "06:45 PM",
    workHours: "9h 00m",
    status: "Late"
  },
  {
    id: "att-3",
    employeeId: "emp-3",
    employeeName: "Rohan Varma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    department: "Engineering",
    date: "2026-08-28",
    checkIn: "08:55 AM",
    checkOut: "05:55 PM",
    workHours: "9h 00m",
    status: "WFH"
  },
  {
    id: "att-4",
    employeeId: "emp-4",
    employeeName: "Ananya Iyer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    department: "Human Resources",
    date: "2026-08-28",
    checkIn: "09:05 AM",
    checkOut: "06:15 PM",
    workHours: "9h 10m",
    status: "Present"
  },
  {
    id: "att-5",
    employeeId: "emp-5",
    employeeName: "Devendra Patel",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    department: "Engineering",
    date: "2026-08-28",
    checkIn: "-",
    checkOut: "-",
    workHours: "0h 00m",
    status: "Absent"
  },
  {
    id: "att-6",
    employeeId: "emp-6",
    employeeName: "Sneha Mukherjee",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    department: "Product",
    date: "2026-08-28",
    checkIn: "09:20 AM",
    checkOut: "06:20 PM",
    workHours: "9h 00m",
    status: "Present"
  },
  {
    id: "att-7",
    employeeId: "emp-7",
    employeeName: "Kabir Mehta",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    department: "Finance",
    date: "2026-08-28",
    checkIn: "08:50 AM",
    checkOut: "05:50 PM",
    workHours: "9h 00m",
    status: "Present"
  }
]
