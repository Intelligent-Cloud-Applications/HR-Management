import React from "react"
import { Link } from "react-router-dom"
import { Logo } from "@/components/brand/Logo"

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-card text-muted-foreground py-8">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-border text-xs">
          <div className="space-y-1">
            <Logo size="md" />
            <p className="text-[11px] text-muted-foreground">
              Intelligent workforce and payroll infrastructure for modern enterprises.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs">
            <Link to="/dashboard/employees" className="hover:text-foreground">Employees</Link>
            <Link to="/dashboard/attendance" className="hover:text-foreground">Attendance</Link>
            <Link to="/dashboard/payroll" className="hover:text-foreground">Payroll</Link>
            <Link to="/dashboard/leave" className="hover:text-foreground">Leaves</Link>
            <Link to="/dashboard/recruitment" className="hover:text-foreground">Recruitment</Link>
            <Link to="/dashboard/dev-log" className="hover:text-foreground">Dev Log</Link>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-muted-foreground">
          <p>© 2026 Tekkzy Intelligent Cloud Applications Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:underline">Terms of Service</a>
            <span>•</span>
            <span>ISO 27001 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
