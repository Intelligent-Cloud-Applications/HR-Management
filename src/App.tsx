import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { LandingPage } from "@/pages/LandingPage"
import { LoginPage } from "@/pages/LoginPage"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { DashboardOverview } from "@/pages/DashboardOverview"
import { EmployeesPage } from "@/pages/EmployeesPage"
import { AttendancePage } from "@/pages/AttendancePage"
import { LeavePage } from "@/pages/LeavePage"
import { PayrollPage } from "@/pages/PayrollPage"
import { RecruitmentPage } from "@/pages/RecruitmentPage"
import { PerformancePage } from "@/pages/PerformancePage"
import { DepartmentsPage } from "@/pages/DepartmentsPage"
import { ReportsPage } from "@/pages/ReportsPage"
import { DevLogPage } from "@/pages/DevLogPage"
import { SettingsPage } from "@/pages/SettingsPage"

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="leave" element={<LeavePage />} />
        <Route path="payroll" element={<PayrollPage />} />
        <Route path="recruitment" element={<RecruitmentPage />} />
        <Route path="performance" element={<PerformancePage />} />
        <Route path="departments" element={<DepartmentsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="dev-log" element={<DevLogPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Direct alias for Dev Log */}
      <Route path="/dev-log" element={<Navigate to="/dashboard/dev-log" replace />} />

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
