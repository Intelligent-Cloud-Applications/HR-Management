import React, { useMemo } from "react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardTitle } from "@/components/ui/Card"
import { getMyAttendanceLogs } from "@/data/mockAttendance"
import { getSelfIdentity } from "@/lib/session"

export const EmployeeOverview: React.FC = () => {
  const self = getSelfIdentity()
  const attendance = useMemo(
    () => getMyAttendanceLogs(self.name, self.department),
    [self.name, self.department]
  )
  const latest = attendance[0]
  const isIn = latest?.status === "Present" || latest?.status === "Late" || latest?.status === "WFH"
  const punchLabel = isIn ? `IN · ${latest?.checkIn || "AM"}` : "OUT"

  return (
    <div className="space-y-4 font-sans">
      <p className="text-xs text-muted-foreground">Dashboard</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card className="p-4 lg:col-span-1 min-h-[180px]">
          <CardHeader className="p-0 pb-3">
            <CardTitle>Reminders</CardTitle>
          </CardHeader>
          <div className="space-y-3 text-xs leading-relaxed">
            <p className="text-foreground">
              IT declaration window is open now.{" "}
              <Link to="/dashboard/tax" className="text-primary hover:underline font-medium">
                Declare now
              </Link>
              .
            </p>
            <p className="text-muted-foreground">
              Please consider{" "}
              <Link to="/dashboard/verify-profile" className="text-primary hover:underline">
                uploading a photo of yourself
              </Link>
              .
            </p>
          </div>
        </Card>

        <Card className="p-4 lg:col-span-1 min-h-[180px]">
          <CardHeader className="p-0 pb-3">
            <CardTitle>Quick links</CardTitle>
          </CardHeader>
          <div className="space-y-2 text-xs">
            <Link to="/dashboard/pay" className="block text-primary hover:underline">
              View personal transactions
            </Link>
            <Link to="/dashboard/reimbursements" className="block text-primary hover:underline">
              Reimbursements
            </Link>
            <Link to="/dashboard/documents" className="block text-primary hover:underline">
              Documents
            </Link>
            <Link to="/dashboard/attendance" className="block text-primary hover:underline">
              Attendance
            </Link>
          </div>
        </Card>

        <Card className="p-4 lg:col-span-1 min-h-[180px] flex flex-col justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Welcome</p>
            <h2 className="text-base font-semibold text-foreground mt-1">
              {self.name}
              {self.employeeCode ? (
                <span className="text-muted-foreground font-normal"> ({self.employeeCode})</span>
              ) : null}
            </h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {self.designation || "Employee"}
              {self.department ? ` · ${self.department}` : ""}
            </p>
          </div>
          <div>
            <p className={`text-sm font-semibold ${isIn ? "text-emerald-500" : "text-muted-foreground"}`}>
              {punchLabel}
            </p>
            <Link to="/dashboard/attendance" className="text-[11px] text-primary hover:underline">
              Open attendance
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
