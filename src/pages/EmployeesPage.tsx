import React, { useState } from "react"
import { INITIAL_EMPLOYEES, Employee } from "@/data/mockEmployees"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Badge } from "@/components/ui/Badge"
import { Drawer } from "@/components/ui/Drawer"
import { Modal } from "@/components/ui/Modal"
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
import {
  Search,
  UserPlus,
  Eye,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard
} from "lucide-react"

export const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES)
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "Engineering",
    email: "",
    phone: "",
    location: "Bengaluru, India",
    salary: "2000000",
    manager: "Vikram Malhotra",
    skills: "React, TypeScript, Node.js",
  })

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeCode.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDept = departmentFilter === "All" || emp.department === departmentFilter
    const matchesStatus = statusFilter === "All" || emp.status === statusFilter

    return matchesSearch && matchesDept && matchesStatus
  })

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage) || 1
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault()
    const newEmp: Employee = {
      id: `emp-${Date.now()}`,
      employeeCode: `TW-${1000 + employees.length + 1}`,
      name: formData.name,
      role: formData.role,
      department: formData.department,
      email: formData.email,
      phone: formData.phone || "+91 98765 43299",
      location: formData.location,
      status: "Active",
      joiningDate: new Date().toISOString().split("T")[0],
      salary: Number(formData.salary) || 1800000,
      avatar: "",
      rating: 4.8,
      manager: formData.manager,
      emergencyContact: {
        name: "Family Contact",
        relation: "Spouse",
        phone: "+91 98765 00000",
      },
      skills: formData.skills.split(",").map((s) => s.trim()),
      bankAccount: "HDFC0001999 •••• 1234",
      panNumber: "ABCDE1234F",
    }

    setEmployees([newEmp, ...employees])
    setIsAddModalOpen(false)
    toast({
      title: "Employee Added",
      description: `${formData.name} (${newEmp.employeeCode}) onboarded.`,
      type: "success",
    })

    setFormData({
      name: "",
      role: "",
      department: "Engineering",
      email: "",
      phone: "",
      location: "Bengaluru, India",
      salary: "2000000",
      manager: "Vikram Malhotra",
      skills: "React, TypeScript, Node.js",
    })
  }

  const handleDeleteEmployee = (id: string, name: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id))
    if (selectedEmployee?.id === id) setSelectedEmployee(null)
    toast({
      title: "Employee Deactivated",
      description: `${name} removed from active roster.`,
      type: "warning",
    })
  }

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title="Employees"
        description="Active workforce roster, compensation, and profile records."
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
          <Button variant="default" size="sm" onClick={() => setIsAddModalOpen(true)} className="gap-1.5">
            <UserPlus className="w-3.5 h-3.5" />
            Add Employee
          </Button>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="flex-1 w-full">
          <Input
            placeholder="Filter by name, role, email, code..."
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
            options={[
              { value: "All", label: "All Departments" },
              { value: "Engineering", label: "Engineering" },
              { value: "Design", label: "Design" },
              { value: "Human Resources", label: "Human Resources" },
              { value: "Product", label: "Product" },
              { value: "Finance", label: "Finance" },
            ]}
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
              { value: "Active", label: "Active" },
              { value: "On Leave", label: "On Leave" },
              { value: "Inactive", label: "Inactive" },
            ]}
          />
        </div>
      </div>

      {/* Employee Data Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Salary (Annual)</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedEmployees.length > 0 ? (
              paginatedEmployees.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="font-mono text-muted-foreground text-[11px]">
                    {emp.employeeCode}
                  </TableCell>

                  <TableCell>
                    <div>
                      <span className="font-medium text-foreground block">{emp.name}</span>
                      <span className="text-muted-foreground text-[11px] block">{emp.role} • {emp.email}</span>
                    </div>
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {emp.department}
                  </TableCell>

                  <TableCell className="text-muted-foreground text-xs">
                    {emp.location}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        emp.status === "Active"
                          ? "success"
                          : emp.status === "On Leave"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {emp.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="font-mono text-xs">
                    {formatCurrency(emp.salary)}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedEmployee(emp)}
                        className="h-7 px-2 text-xs"
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteEmployee(emp.id, emp.name)}
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        title="Deactivate"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No records match the current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination Bar */}
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

      {/* Employee Detail Drawer */}
      <Drawer
        isOpen={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        title="Employee Details"
        description="Workforce master record"
        size="md"
      >
        {selectedEmployee && (
          <div className="space-y-4 text-xs font-sans">
            <div className="p-3 rounded border border-border bg-muted/30 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{selectedEmployee.name}</h3>
                <p className="text-muted-foreground">{selectedEmployee.role} • {selectedEmployee.department}</p>
              </div>
              <Badge variant="outline" className="font-mono">{selectedEmployee.employeeCode}</Badge>
            </div>

            <div className="space-y-2">
              <span className="font-medium text-muted-foreground uppercase text-[10px] tracking-wider block">
                Contact & Coordinates
              </span>
              <div className="space-y-1.5 p-3 rounded border border-border bg-card">
                <div className="flex justify-between py-0.5">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="text-foreground">{selectedEmployee.email}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="text-foreground">{selectedEmployee.phone}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="text-foreground">{selectedEmployee.location}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-muted-foreground">Joining Date:</span>
                  <span className="text-foreground">{formatDate(selectedEmployee.joiningDate)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-medium text-muted-foreground uppercase text-[10px] tracking-wider block">
                Compensation & Statutory
              </span>
              <div className="space-y-1.5 p-3 rounded border border-border bg-card">
                <div className="flex justify-between py-0.5">
                  <span className="text-muted-foreground">Fixed Annual CTC:</span>
                  <span className="font-mono font-medium text-foreground">{formatCurrency(selectedEmployee.salary)}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-muted-foreground">Bank Account:</span>
                  <span className="font-mono text-foreground">{selectedEmployee.bankAccount}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-muted-foreground">PAN:</span>
                  <span className="font-mono text-foreground">{selectedEmployee.panNumber}</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="font-medium text-muted-foreground uppercase text-[10px] tracking-wider block">
                Skills
              </span>
              <div className="flex flex-wrap gap-1">
                {selectedEmployee.skills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="text-[11px]">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-border">
              <Button variant="outline" size="sm" onClick={() => setSelectedEmployee(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Add Employee Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Employee"
        description="Register a new staff member in TekkzyWork"
        size="md"
      >
        <form onSubmit={handleAddEmployee} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Full Name *</label>
              <Input
                required
                placeholder="e.g. Siddharth Joshi"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Email *</label>
              <Input
                type="email"
                required
                placeholder="siddharth.j@tekkzy.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Role *</label>
              <Input
                required
                placeholder="Senior Cloud Engineer"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Department *</label>
              <Select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                options={[
                  { value: "Engineering", label: "Engineering" },
                  { value: "Design", label: "Design" },
                  { value: "Human Resources", label: "Human Resources" },
                  { value: "Product", label: "Product" },
                  { value: "Finance", label: "Finance" },
                  { value: "Sales", label: "Sales" },
                ]}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Annual CTC (₹) *</label>
              <Input
                type="number"
                required
                placeholder="2400000"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Location</label>
              <Input
                placeholder="Bengaluru, India"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default" size="sm">
              Save Employee
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
