import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Badge } from "@/components/ui/Badge"
import { useToast } from "@/lib/toast"
import { api } from "@/lib/api"
import { getIdToken, getRole } from "@/lib/session"
import { isEmployeeRole } from "@/lib/roles"

export const VerifyProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState("pending_verification")
  const [job, setJob] = useState({
    employee_code: "",
    department_id: "",
    designation_id: "",
    date_of_joining: "",
    work_location_id: "",
    status: "",
  })
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    work_email: "",
    personal_email: "",
    phone: "",
    date_of_birth: "",
    gender: "",
    emergency_name: "",
    emergency_relationship: "",
    emergency_phone: "",
    emergency_email: "",
  })

  useEffect(() => {
    const token = getIdToken()
    if (!token) {
      setLoading(false)
      return
    }
    api
      .me(token)
      .then((profile) => {
        const contact = profile.emergency_contacts?.[0]
        setStatus(profile.employee.profile_verification_status || "pending_verification")
        setJob({
          employee_code: profile.employee.employee_code || "",
          department_id: profile.employee.department_id || "",
          designation_id: profile.employee.designation_id || "",
          date_of_joining: profile.employee.date_of_joining || "",
          work_location_id: profile.employee.work_location_id || "",
          status: profile.employee.status || "",
        })
        setForm({
          first_name: profile.employee.first_name,
          last_name: profile.employee.last_name,
          work_email: profile.employee.work_email,
          personal_email: profile.employee.personal_email || "",
          phone: profile.employee.phone || "",
          date_of_birth: profile.personal?.date_of_birth || "",
          gender: profile.personal?.gender || "",
          emergency_name: contact?.name || "",
          emergency_relationship: contact?.relationship || "",
          emergency_phone: contact?.phone || "",
          emergency_email: contact?.email || "",
        })
      })
      .catch((err: Error) => {
        toast({ title: "Unable to load profile", description: err.message, type: "error" })
      })
      .finally(() => setLoading(false))
  }, [navigate, toast])

  const payload = () => ({
    personal_email: form.personal_email || undefined,
    phone: form.phone || undefined,
    personal: {
      date_of_birth: form.date_of_birth || null,
      gender: form.gender || null,
    },
    emergency_contacts: form.emergency_name
      ? [
          {
            name: form.emergency_name,
            relationship: form.emergency_relationship,
            phone: form.emergency_phone,
            email: form.emergency_email || null,
          },
        ]
      : [],
  })

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = getIdToken()
    if (!token) return
    setSaving(true)
    try {
      await api.updateMe(token, payload())
      setStatus("changes_submitted")
      toast({ title: "Changes saved", description: "Review and click Verify when the details are correct.", type: "success" })
    } catch (err) {
      toast({ title: "Save failed", description: (err as Error).message, type: "error" })
    } finally {
      setSaving(false)
    }
  }

  const handleVerify = async () => {
    const token = getIdToken()
    if (!token) return
    setSaving(true)
    try {
      const result = await api.verifyMe(token, payload())
      setStatus(result.employee.profile_verification_status || "verified")
      toast({ title: "Profile verified", description: "Your employee record is now confirmed.", type: "success" })
      navigate("/dashboard")
    } catch (err) {
      toast({ title: "Verify failed", description: (err as Error).message, type: "error" })
    } finally {
      setSaving(false)
    }
  }

  const isSelf = isEmployeeRole(getRole())

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading your employee profile…</p>
  }

  if (!getIdToken()) {
    return (
      <Card className="p-6 max-w-xl space-y-3">
        <h2 className="text-base font-semibold">Verify your employee profile</h2>
        <p className="text-sm text-muted-foreground">
          After HR adds you, Cognito emails a temporary password. Sign in with that account, set a new password, then verify or update your details here.
        </p>
        <Button size="sm" onClick={() => navigate("/login")}>Sign in</Button>
      </Card>
    )
  }

  return (
    <div className="space-y-4 font-sans max-w-3xl">
      <PageHeader
        title={isSelf ? "My profile" : "Verify your profile"}
        description={
          isSelf
            ? "Your job record, personal details, and emergency contact."
            : "Review the details HR entered, make corrections if needed, then verify."
        }
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: isSelf ? "My profile" : "Verify profile" },
        ]}
        badge={
          <Badge variant={status === "verified" ? "success" : "warning"} className="capitalize">
            {status.replaceAll("_", " ")}
          </Badge>
        }
      />

      <Card className="p-5">
        <form onSubmit={handleSave} className="space-y-4">
          {(job.employee_code || job.department_id) && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Job record
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Employee code">
                  <Input value={job.employee_code} disabled />
                </Field>
                <Field label="Department">
                  <Input value={job.department_id} disabled />
                </Field>
                <Field label="Designation">
                  <Input value={job.designation_id} disabled />
                </Field>
                <Field label="Work location">
                  <Input value={job.work_location_id} disabled />
                </Field>
                <Field label="Date of joining">
                  <Input value={job.date_of_joining} disabled />
                </Field>
                <Field label="Employment status">
                  <Input value={job.status} disabled />
                </Field>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="First name">
              <Input value={form.first_name} disabled />
            </Field>
            <Field label="Last name">
              <Input value={form.last_name} disabled />
            </Field>
            <Field label="Work email">
              <Input value={form.work_email} disabled />
            </Field>
            <Field label="Personal email">
              <Input
                type="email"
                value={form.personal_email}
                onChange={(e) => setForm({ ...form, personal_email: e.target.value })}
              />
            </Field>
            <Field label="Phone">
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Field>
            <Field label="Date of birth">
              <Input
                type="date"
                value={form.date_of_birth}
                onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
              />
            </Field>
            <Field label="Gender">
              <Select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                options={[
                  { value: "", label: "Select" },
                  { value: "female", label: "Female" },
                  { value: "male", label: "Male" },
                  { value: "other", label: "Other" },
                  { value: "prefer_not_to_say", label: "Prefer not to say" },
                ]}
              />
            </Field>
          </div>

          <div className="pt-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Emergency contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Name">
                <Input
                  value={form.emergency_name}
                  onChange={(e) => setForm({ ...form, emergency_name: e.target.value })}
                />
              </Field>
              <Field label="Relationship">
                <Input
                  value={form.emergency_relationship}
                  onChange={(e) => setForm({ ...form, emergency_relationship: e.target.value })}
                />
              </Field>
              <Field label="Phone">
                <Input
                  value={form.emergency_phone}
                  onChange={(e) => setForm({ ...form, emergency_phone: e.target.value })}
                />
              </Field>
              <Field label="Email">
                <Input
                  type="email"
                  value={form.emergency_email}
                  onChange={(e) => setForm({ ...form, emergency_email: e.target.value })}
                />
              </Field>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-border">
            <Button type="submit" variant="outline" size="sm" isLoading={saving}>
              Save changes
            </Button>
            {status !== "verified" && (
              <Button type="button" variant="default" size="sm" isLoading={saving} onClick={handleVerify}>
                Verify details
              </Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-muted-foreground">{label}</label>
    {children}
  </div>
)
