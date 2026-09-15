import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { LandingPage } from "@/pages/LandingPage"
import { LoginPage } from "@/pages/LoginPage"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { DashboardOverview } from "@/pages/DashboardOverview"
import { EmployeesPage } from "@/pages/EmployeesPage"
import { AddEmployeePage } from "@/pages/AddEmployeePage"
import { RoleRoute } from "@/components/auth/RoleRoute"
import { AttendancePage } from "@/pages/AttendancePage"
import { LeavePage } from "@/pages/LeavePage"
import { PayrollPage } from "@/pages/PayrollPage"
import { RecruitmentPage } from "@/pages/RecruitmentPage"
import { PerformancePage } from "@/pages/PerformancePage"
import { DepartmentsPage } from "@/pages/DepartmentsPage"
import { ReportsPage } from "@/pages/ReportsPage"
import { DevLogPage } from "@/pages/DevLogPage"
import { SettingsPage } from "@/pages/SettingsPage"
import { VerifyProfilePage } from "@/pages/VerifyProfilePage"
import { TasksPage } from "@/pages/TasksPage"
import { MyPayPage } from "@/pages/MyPayPage"
import { ReimbursementsPage } from "@/pages/ReimbursementsPage"
import { TaxDeductionsPage } from "@/pages/TaxDeductionsPage"
import { EmployeeDocumentsPage } from "@/pages/EmployeeDocumentsPage"
import { HelpPage } from "@/pages/HelpPage"

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<RoleRoute section="dashboard"><DashboardOverview /></RoleRoute>} />
        <Route path="employees" element={<RoleRoute section="employees"><EmployeesPage /></RoleRoute>} />
        <Route path="employees/new" element={<RoleRoute section="employees/new"><AddEmployeePage /></RoleRoute>} />
        <Route path="verify-profile" element={<RoleRoute section="verify-profile"><VerifyProfilePage /></RoleRoute>} />
        <Route path="tasks" element={<RoleRoute section="tasks"><TasksPage /></RoleRoute>} />
        <Route path="pay" element={<RoleRoute section="pay"><MyPayPage /></RoleRoute>} />
        <Route path="reimbursements" element={<RoleRoute section="reimbursements"><ReimbursementsPage /></RoleRoute>} />
        <Route path="tax" element={<RoleRoute section="tax"><TaxDeductionsPage /></RoleRoute>} />
        <Route path="documents" element={<RoleRoute section="documents"><EmployeeDocumentsPage /></RoleRoute>} />
        <Route path="help" element={<RoleRoute section="help"><HelpPage /></RoleRoute>} />
        <Route path="attendance" element={<RoleRoute section="attendance"><AttendancePage /></RoleRoute>} />
        <Route path="leave" element={<RoleRoute section="leave"><LeavePage /></RoleRoute>} />
        <Route path="payroll" element={<RoleRoute section="payroll"><PayrollPage /></RoleRoute>} />
        <Route path="recruitment" element={<RoleRoute section="recruitment"><RecruitmentPage /></RoleRoute>} />
        <Route path="performance" element={<RoleRoute section="performance"><PerformancePage /></RoleRoute>} />
        <Route path="departments" element={<RoleRoute section="departments"><DepartmentsPage /></RoleRoute>} />
        <Route path="reports" element={<RoleRoute section="reports"><ReportsPage /></RoleRoute>} />
        <Route path="dev-log" element={<RoleRoute section="dev-log"><DevLogPage /></RoleRoute>} />
        <Route path="settings" element={<RoleRoute section="settings"><SettingsPage /></RoleRoute>} />
      </Route>

      {/* Direct alias for Dev Log */}
      <Route path="/dev-log" element={<Navigate to="/dashboard/dev-log" replace />} />

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
