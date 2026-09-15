import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Badge } from "@/components/ui/Badge"
import { Drawer } from "@/components/ui/Drawer"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table"
import { useToast } from "@/lib/toast"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ApiEmployee, EmployeeProfile, api } from "@/lib/api"
import { getIdToken, getRole } from "@/lib/session"
import { canAccess, canManageEmployees } from "@/lib/roles"
import { Search, UserPlus, Trash2, Mail } from "lucide-react"

const STATUS_LABEL: Record<string, string> = {
  invited: "Invited",
  active: "Active",
  on_leave: "On Leave",
  inactive: "Inactive",
  terminated: "Terminated",
}

function statusVariant(status: string): "success" | "warning" | "secondary" | "outline" {
  if (status === "active") return "success"
  if (status === "on_leave" || status === "invited") return "warning"
  return "secondary"
}

export const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<ApiEmployee[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selected, setSelected] = useState<EmployeeProfile | null>(null)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const { toast } = useToast()
  const token = getIdToken()
  const role = getRole()
  const canWriteEmployees = canManageEmployees(role)
  const canSeePayroll = canAccess(role, "payroll")

  const loadEmployees = () => {
    if (!token) {
      setEmployees([])
      setLoading(false)
      return
    }
    setLoading(true)
    api
      .listEmployees(token)
      .then((result) => setEmployees(result.employees))
      .catch((err: Error) => {
        toast({ title: "Could not load employees", description: err.message, type: "error" })
        setEmployees([])
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadEmployees()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const departments = ["All", ...Array.from(new Set(employees.map((e) => e.department_id).filter(Boolean)))] as string[]

  const filteredEmployees = employees.filter((emp) => {
    const name = `${emp.first_name} ${emp.last_name}`
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (emp.designation_id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.work_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employee_code.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDept = departmentFilter === "All" || emp.department_id === departmentFilter
    const matchesStatus = statusFilter === "All" || emp.status === statusFilter
    return matchesSearch && matchesDept && matchesStatus
  })

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage) || 1
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const openEmployee = async (id: string) => {
    if (!token) return
    setLoadingDetail(true)
    try {
      setSelected(await api.getEmployee(token, id))
    } catch (err) {
      toast({ title: "Could not load employee", description: (err as Error).message, type: "error" })
    } finally {
      setLoadingDetail(false)
    }
  }

  const handleDeactivate = async (id: string, name: string) => {
    if (!token) return
    try {
      await api.deactivateEmployee(token, id)
      setEmployees((prev) => prev.map((emp) => (emp._id === id ? { ...emp, status: "inactive" } : emp)))
      if (selected?.employee._id === id) setSelected(null)
      toast({ title: "Employee deactivated", description: `${name} login was disabled.`, type: "warning" })
    } catch (err) {
      toast({ title: "Could not deactivate employee", description: (err as Error).message, type: "error" })
    }
  }

  const handleResendInvite = async () => {
    if (!token || !selected) return
    try {
      const result = await api.resendInvite(token, selected.employee._id)
      setSelected({ ...selected, employee: result.employee })
      toast({ title: "Invitation resent", description: `Email sent to ${result.employee.work_email}.`, type: "success" })
    } catch (err) {
      toast({ title: "Could not resend invite", description: (err as Error).message, type: "error" })
    }
  }

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title="Employees"
        description="Workforce roster backed by Cognito and DynamoDB."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Employees" },
        ]}
        badge={
          <span className="font-mono text-xs text-muted-foreground">
            ({employees.length})
          </span>
        }
        actions={
          canWriteEmployees ? (
          <Link to="/dashboard/employees/new">
            <Button variant="default" size="sm" className="gap-1.5">
              <UserPlus className="w-3.5 h-3.5" />
              Add Employee
            </Button>
          </Link>
          ) : undefined
        }
      />

      {!token && (
        <Card className="p-4 text-sm text-muted-foreground">
          Sign in as HR to load live employee records and send Cognito invitations.
        </Card>
      )}

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="flex-1 w-full">
          <Input
            placeholder="Filter by name, designation, email, code..."
            icon={<Search className="w-3.5 h-3.5" />}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>
        <div className="w-full sm:w-44">
          <Select
            value={departmentFilter}
            onChange={(e) => {
              setDepartmentFilter(e.target.value)
              setCurrentPage(1)
            }}
            options={departments.map((dept) => ({ value: dept, label: dept === "All" ? "All Departments" : dept }))}
          />
        </div>
        <div className="w-full sm:w-36">
          <Select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setCurrentPage(1)
            }}
            options={[
              { value: "All", label: "All Statuses" },
              { value: "invited", label: "Invited" },
              { value: "active", label: "Active" },
              { value: "on_leave", label: "On Leave" },
              { value: "inactive", label: "Inactive" },
            ]}
          />
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Verification</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Loading employees…
                </TableCell>
              </TableRow>
            ) : paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((emp) => (
                <TableRow key={emp._id}>
                  <TableCell className="font-mono text-muted-foreground text-[11px]">
                    {emp.employee_code}
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium text-foreground block">
                        {emp.first_name} {emp.last_name}
                      </span>
                      <span className="text-muted-foreground text-[11px] block">
                        {emp.designation_id || "—"} • {emp.work_email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{emp.department_id || "—"}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{emp.work_location_id || "—"}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(emp.status)}>
                      {STATUS_LABEL[emp.status] || emp.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[11px] text-muted-foreground capitalize">
                    {(emp.profile_verification_status || "—").replaceAll("_", " ")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEmployee(emp._id)}
                        className="h-7 px-2 text-xs"
                        isLoading={loadingDetail && selected?.employee._id === emp._id}
                      >
                        View
                      </Button>
                      {canWriteEmployees && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeactivate(emp._id, `${emp.first_name} ${emp.last_name}`)}
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        title="Deactivate"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  {token ? "No employee records yet. Add the first hire to send a Cognito invite." : "No records to show."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between p-3 border-t border-border text-xs text-muted-foreground">
          <div>
            Showing{" "}
            <span className="font-mono font-medium text-foreground">
              {filteredEmployees.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
            </span>{" "}
            to{" "}
            <span className="font-mono font-medium text-foreground">
              {Math.min(currentPage * itemsPerPage, filteredEmployees.length)}
            </span>{" "}
            of <span className="font-mono font-medium text-foreground">{filteredEmployees.length}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="h-7 px-2 text-xs"
            >
              Prev
            </Button>
            <span className="px-2 font-mono text-xs">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="h-7 px-2 text-xs"
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      <Drawer
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Employee Details"
        description="Live record from hr-management-backend"
        size="md"
      >
        {selected && (
          <div className="space-y-4 text-xs font-sans">
            <div className="p-3 rounded border border-border bg-muted/30 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {selected.employee.first_name} {selected.employee.last_name}
                </h3>
                <p className="text-muted-foreground">
                  {selected.employee.designation_id || "—"} • {selected.employee.department_id || "—"}
                </p>
              </div>
              <Badge variant="outline" className="font-mono">{selected.employee.employee_code}</Badge>
            </div>

            <DetailGroup title="Job">
              <Row label="Work email" value={selected.employee.work_email} />
              <Row label="Phone" value={selected.employee.phone} />
              <Row label="Location" value={selected.employee.work_location_id} />
              <Row label="Joined" value={selected.employee.date_of_joining ? formatDate(selected.employee.date_of_joining) : null} />
              <Row label="Employment" value={selected.employee.employment_type?.replaceAll("_", " ")} />
              <Row label="Status" value={STATUS_LABEL[selected.employee.status] || selected.employee.status} />
              <Row label="Verification" value={selected.employee.profile_verification_status?.replaceAll("_", " ")} />
            </DetailGroup>

            <DetailGroup title="Access">
              <Row label="Role" value={selected.access?.role_id} />
              <Row label="Login enabled" value={selected.access?.login_enabled ? "Yes" : "No"} />
            </DetailGroup>

            {canSeePayroll && (
            <DetailGroup title="Payroll">
              <Row label="CTC" value={selected.payroll?.ctc != null ? formatCurrency(selected.payroll.ctc) : null} />
              <Row label="Gross" value={selected.payroll?.gross_salary != null ? formatCurrency(selected.payroll.gross_salary) : null} />
              <Row label="Bank" value={selected.payroll?.bank_account} />
              <Row label="PAN" value={selected.payroll?.pan} />
              <Row label="UAN" value={selected.payroll?.uan} />
            </DetailGroup>
            )}

            {selected.emergency_contacts[0] && (
              <DetailGroup title="Emergency contact">
                <Row label="Name" value={selected.emergency_contacts[0].name} />
                <Row label="Relationship" value={selected.emergency_contacts[0].relationship} />
                <Row label="Phone" value={selected.emergency_contacts[0].phone} />
              </DetailGroup>
            )}

            <div className="flex justify-end gap-2 pt-3 border-t border-border">
              {canWriteEmployees && selected.employee.profile_verification_status !== "verified" && (
                <Button variant="outline" size="sm" className="gap-1.5" onClick={handleResendInvite}>
                  <Mail className="w-3.5 h-3.5" />
                  Resend invite
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => setSelected(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}

const DetailGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-2">
    <span className="font-medium text-muted-foreground uppercase text-[10px] tracking-wider block">{title}</span>
    <div className="space-y-1.5 p-3 rounded border border-border bg-card">{children}</div>
  </div>
)

const Row: React.FC<{ label: string; value?: string | number | null }> = ({ label, value }) => (
  <div className="flex justify-between py-0.5 gap-3">
    <span className="text-muted-foreground">{label}:</span>
    <span className="text-foreground text-right">{value || "—"}</span>
  </div>
)
