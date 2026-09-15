export type EmployeeTask = {
  id: string
  title: string
  detail: string
  due: string
  status: "Open" | "In Progress" | "Done"
  category: "Profile" | "Attendance" | "Leave" | "HR"
  href: string
}

export const INITIAL_EMPLOYEE_TASKS: EmployeeTask[] = [
  {
    id: "task-1",
    title: "Confirm emergency contact",
    detail: "Keep your profile current so HR can reach someone in an emergency.",
    due: "Today",
    status: "Open",
    category: "Profile",
    href: "/dashboard/verify-profile",
  },
  {
    id: "task-2",
    title: "Clock in for today’s shift",
    detail: "Punch from the Bengaluru HQ geofence before 09:15 AM.",
    due: "Today",
    status: "In Progress",
    category: "Attendance",
    href: "/dashboard/attendance",
  },
  {
    id: "task-3",
    title: "Review pending casual leave",
    detail: "Your 4 Sep request is waiting on manager approval.",
    due: "4 Sep 2026",
    status: "Open",
    category: "Leave",
    href: "/dashboard/leave",
  },
  {
    id: "task-4",
    title: "Submit August timesheet notes",
    detail: "Add WFH remarks for 25 Aug so attendance can be closed.",
    due: "31 Aug 2026",
    status: "Open",
    category: "Attendance",
    href: "/dashboard/attendance",
  },
  {
    id: "task-5",
    title: "Complete Q3 self check-in",
    detail: "Share progress notes with your manager before the review window.",
    due: "1 Sep 2026",
    status: "Done",
    category: "HR",
    href: "/dashboard/verify-profile",
  },
]
