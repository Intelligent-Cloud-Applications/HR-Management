import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { useToast } from "@/lib/toast"
import { api } from "@/lib/api"
import { getIdToken } from "@/lib/session"

const today = () => new Date().toISOString().slice(0, 10)

const emptyForm = {
  first_name: "",
  last_name: "",
  work_email: "",
  personal_email: "",
  phone: "",
  date_of_joining: today(),
  employment_type: "full_time",
  department_id: "Engineering",
  designation_id: "",
  manager_id: "",
  work_location_id: "Bengaluru, India",
  role_id: "EMPLOYEE",
  login_enabled: true,
  date_of_birth: "",
  gender: "",
  address_line1: "",
  address_city: "",
  address_state: "",
  address_postal_code: "",
  ctc: "",
  gross_salary: "",
  bank_account: "",
  ifsc: "",
  pan: "",
  uan: "",
  emergency_name: "",
  emergency_relationship: "",
  emergency_phone: "",
  emergency_email: "",
}

export const AddEmployeePage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const token = getIdToken()

  const set = (key: keyof typeof emptyForm, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (!token) {
        throw new Error("Sign in as HR to create the employee in Cognito and send the invite.")
      }
      const result = await api.createEmployee(token, {
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        work_email: form.work_email.trim(),
        personal_email: form.personal_email || undefined,
        phone: form.phone || undefined,
        date_of_joining: form.date_of_joining,
        employment_type: form.employment_type,
        department_id: form.department_id,
        designation_id: form.designation_id,
        manager_id: form.manager_id || undefined,
        work_location_id: form.work_location_id || undefined,
        role_id: form.role_id,
        login_enabled: form.login_enabled,
        personal: {
          date_of_birth: form.date_of_birth || null,
          gender: form.gender || null,
          addresses: form.address_line1
            ? [
                {
                  type: "current",
                  line1: form.address_line1,
                  city: form.address_city,
                  state: form.address_state,
                  postal_code: form.address_postal_code,
                  country: "India",
                },
              ]
            : [],
        },
        payroll: form.ctc
          ? {
              ctc: Number(form.ctc),
              gross_salary: Number(form.gross_salary || form.ctc),
              bank_account: form.bank_account || undefined,
              ifsc: form.ifsc || undefined,
              pan: form.pan || undefined,
              uan: form.uan || undefined,
              effective_from: form.date_of_joining,
            }
          : undefined,
        emergency_contacts: form.emergency_name
          ? [
              {
                name: form.emergency_name,
                relationship: form.emergency_relationship,
                phone: form.emergency_phone,
                email: form.emergency_email || undefined,
              },
            ]
          : [],
      })

      toast({
        title: result.invitation.sent ? "Employee invited" : "Employee created",
        description: result.invitation.sent
          ? `${result.employee.first_name} ${result.employee.last_name} was added to Cognito and an invitation email was sent.`
          : `${result.employee.first_name} ${result.employee.last_name} was saved. Invitation: ${result.invitation.error || "not sent"}.`,
        type: result.invitation.sent ? "success" : "warning",
      })
      navigate("/dashboard/employees")
    } catch (err) {
      toast({ title: "Could not create employee", description: (err as Error).message, type: "error" })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 font-sans">
      <PageHeader
        title="Add Employee"
        description="Creates the HR record, Cognito user, role, and invitation email."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Employees", href: "/dashboard/employees" },
          { label: "Add Employee" },
        ]}
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Section title="Identity & job">
          <Field label="First name *">
            <Input required value={form.first_name} onChange={(e) => set("first_name", e.target.value)} />
          </Field>
          <Field label="Last name *">
            <Input required value={form.last_name} onChange={(e) => set("last_name", e.target.value)} />
          </Field>
          <Field label="Designation *">
            <Input
              required
              placeholder="Senior Cloud Engineer"
              value={form.designation_id}
              onChange={(e) => set("designation_id", e.target.value)}
            />
          </Field>
          <Field label="Department *">
            <Select
              value={form.department_id}
              onChange={(e) => set("department_id", e.target.value)}
              options={[
                { value: "Engineering", label: "Engineering" },
                { value: "Design", label: "Design" },
                { value: "Human Resources", label: "Human Resources" },
                { value: "Product", label: "Product" },
                { value: "Finance", label: "Finance" },
                { value: "Sales", label: "Sales" },
              ]}
            />
          </Field>
          <Field label="Employment type">
            <Select
              value={form.employment_type}
              onChange={(e) => set("employment_type", e.target.value)}
              options={[
                { value: "full_time", label: "Full-time" },
                { value: "part_time", label: "Part-time" },
                { value: "contract", label: "Contract" },
                { value: "intern", label: "Intern" },
                { value: "consultant", label: "Consultant" },
              ]}
            />
          </Field>
          <Field label="Date of joining">
            <Input type="date" value={form.date_of_joining} onChange={(e) => set("date_of_joining", e.target.value)} />
          </Field>
          <Field label="Manager ID">
            <Input placeholder="Optional employee _id" value={form.manager_id} onChange={(e) => set("manager_id", e.target.value)} />
          </Field>
          <Field label="Work location">
            <Input value={form.work_location_id} onChange={(e) => set("work_location_id", e.target.value)} />
          </Field>
        </Section>

        <Section title="Contact">
          <Field label="Work email *">
            <Input
              type="email"
              required
              placeholder="name@tekkzy.com"
              value={form.work_email}
              onChange={(e) => set("work_email", e.target.value)}
            />
          </Field>
          <Field label="Personal email">
            <Input type="email" value={form.personal_email} onChange={(e) => set("personal_email", e.target.value)} />
          </Field>
          <Field label="Phone">
            <Input placeholder="+919876543210" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
          </Field>
        </Section>

        <Section title="Login & access">
          <Field label="Cognito role *">
            <Select
              value={form.role_id}
              onChange={(e) => set("role_id", e.target.value)}
              options={[
                { value: "EMPLOYEE", label: "Employee" },
                { value: "MANAGER", label: "Manager" },
                { value: "HR_LEAD", label: "HR Lead" },
                { value: "FINANCE", label: "Finance" },
                { value: "SUPER_ADMIN", label: "Super Admin" },
              ]}
            />
          </Field>
          <Field label="Send invitation email">
            <Select
              value={form.login_enabled ? "yes" : "no"}
              onChange={(e) => set("login_enabled", e.target.value === "yes")}
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
            />
          </Field>
        </Section>

        <Section title="Personal">
          <Field label="Date of birth">
            <Input type="date" value={form.date_of_birth} onChange={(e) => set("date_of_birth", e.target.value)} />
          </Field>
          <Field label="Gender">
            <Select
              value={form.gender}
              onChange={(e) => set("gender", e.target.value)}
              options={[
                { value: "", label: "Select" },
                { value: "female", label: "Female" },
                { value: "male", label: "Male" },
                { value: "other", label: "Other" },
                { value: "prefer_not_to_say", label: "Prefer not to say" },
              ]}
            />
          </Field>
          <Field label="Address">
            <Input value={form.address_line1} onChange={(e) => set("address_line1", e.target.value)} />
          </Field>
          <Field label="City">
            <Input value={form.address_city} onChange={(e) => set("address_city", e.target.value)} />
          </Field>
          <Field label="State">
            <Input value={form.address_state} onChange={(e) => set("address_state", e.target.value)} />
          </Field>
          <Field label="Postal code">
            <Input value={form.address_postal_code} onChange={(e) => set("address_postal_code", e.target.value)} />
          </Field>
        </Section>

        <Section title="Payroll">
          <Field label="Annual CTC (₹)">
            <Input type="number" placeholder="2400000" value={form.ctc} onChange={(e) => set("ctc", e.target.value)} />
          </Field>
          <Field label="Gross salary (₹)">
            <Input type="number" value={form.gross_salary} onChange={(e) => set("gross_salary", e.target.value)} />
          </Field>
          <Field label="Bank account">
            <Input value={form.bank_account} onChange={(e) => set("bank_account", e.target.value)} />
          </Field>
          <Field label="IFSC">
            <Input value={form.ifsc} onChange={(e) => set("ifsc", e.target.value)} />
          </Field>
          <Field label="PAN">
            <Input value={form.pan} onChange={(e) => set("pan", e.target.value)} />
          </Field>
          <Field label="UAN">
            <Input value={form.uan} onChange={(e) => set("uan", e.target.value)} />
          </Field>
        </Section>

        <Section title="Emergency contact">
          <Field label="Name">
            <Input value={form.emergency_name} onChange={(e) => set("emergency_name", e.target.value)} />
          </Field>
          <Field label="Relationship">
            <Input value={form.emergency_relationship} onChange={(e) => set("emergency_relationship", e.target.value)} />
          </Field>
          <Field label="Phone">
            <Input value={form.emergency_phone} onChange={(e) => set("emergency_phone", e.target.value)} />
          </Field>
          <Field label="Email">
            <Input type="email" value={form.emergency_email} onChange={(e) => set("emergency_email", e.target.value)} />
          </Field>
        </Section>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={() => navigate("/dashboard/employees")}>
            Cancel
          </Button>
          <Button type="submit" variant="default" size="sm" isLoading={saving}>
            Create employee & send invite
          </Button>
        </div>
      </form>
    </div>
  )
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Card className="p-4 space-y-3">
    <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
  </Card>
)

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-muted-foreground">{label}</label>
    {children}
  </div>
)
