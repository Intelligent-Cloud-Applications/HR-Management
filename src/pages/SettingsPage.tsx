import React, { useState } from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { useToast } from "@/lib/toast"
import {
  User,
  Building2,
  Bell,
  Palette,
  Shield,
  Save
} from "lucide-react"

export const SettingsPage: React.FC = () => {
  const { toast } = useToast()

  const [profileName, setProfileName] = useState("Aarav Sharma")
  const [profileEmail, setProfileEmail] = useState("aarav.sharma@tekkzy.com")
  const [profilePhone, setProfilePhone] = useState("+91 98765 43210")
  const [profileTimezone, setProfileTimezone] = useState("Asia/Kolkata (IST - UTC+5:30)")

  const [companyName, setCompanyName] = useState("Tekkzy Intelligent Cloud Applications Pvt. Ltd.")
  const [companyWebsite, setCompanyWebsite] = useState("https://tekkzywork.com")
  const [companyGstin, setCompanyGstin] = useState("29ABCDE1234F1Z5")
  const [companyCin, setCompanyCin] = useState("U72900KA2024PTC189201")
  const [companyAddress, setCompanyAddress] = useState("Outer Ring Road, Bellandur, Bengaluru, Karnataka 560103")

  const [emailAlerts, setEmailAlerts] = useState(true)
  const [leavePush, setLeavePush] = useState(true)
  const [payrollAlerts, setPayrollAlerts] = useState(true)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profile Saved",
      description: "Administrator details updated.",
      type: "success",
    })
  }

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Company Details Saved",
      description: `${companyName} settings updated.`,
      type: "success",
    })
  }

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Preferences Saved",
      description: "Notification rules updated.",
      type: "success",
    })
  }

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Security Updated",
      description: "Authentication preferences saved.",
      type: "success",
    })
  }

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title="Settings"
        description="System configuration, company entity, notifications, and security."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings" },
        ]}
      />

      <Tabs defaultValue="profile">
        <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full">
          <TabsTrigger value="profile" className="gap-1.5">
            <User className="w-3.5 h-3.5" /> Profile
          </TabsTrigger>
          <TabsTrigger value="company" className="gap-1.5">
            <Building2 className="w-3.5 h-3.5" /> Company
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5">
            <Bell className="w-3.5 h-3.5" /> Alerts
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-1.5">
            <Palette className="w-3.5 h-3.5" /> Theme
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5">
            <Shield className="w-3.5 h-3.5" /> Security
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Profile */}
        <TabsContent value="profile">
          <Card className="p-4">
            <CardHeader className="p-0 pb-4">
              <CardTitle>Admin Profile</CardTitle>
              <CardDescription>Primary account info</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <div className="w-10 h-10 rounded bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                  AS
                </div>
                <div>
                  <h3 className="font-semibold text-xs text-foreground">{profileName}</h3>
                  <p className="text-[11px] text-muted-foreground">{profileEmail} • Super Admin</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Display Name</label>
                  <Input
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Email</label>
                  <Input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Phone</label>
                  <Input
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Timezone</label>
                  <Input
                    value={profileTimezone}
                    onChange={(e) => setProfileTimezone(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3 border-t border-border">
                <Button type="submit" variant="default" size="sm" className="gap-1">
                  <Save className="w-3.5 h-3.5" /> Save Profile
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>

        {/* Tab 2: Company Info */}
        <TabsContent value="company">
          <Card className="p-4">
            <CardHeader className="p-0 pb-4">
              <CardTitle>Company Entity</CardTitle>
              <CardDescription>Legal information for payslips and tax reporting</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveCompany} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Entity Name</label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">GSTIN</label>
                  <Input
                    value={companyGstin}
                    onChange={(e) => setCompanyGstin(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">CIN</label>
                  <Input
                    value={companyCin}
                    onChange={(e) => setCompanyCin(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Headquarters Address</label>
                <Input
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
              </div>

              <div className="flex justify-end pt-3 border-t border-border">
                <Button type="submit" variant="default" size="sm" className="gap-1">
                  <Save className="w-3.5 h-3.5" /> Save Company
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>

        {/* Tab 3: Notifications */}
        <TabsContent value="notifications">
          <Card className="p-4">
            <CardHeader className="p-0 pb-4">
              <CardTitle>Alert Preferences</CardTitle>
              <CardDescription>Notification triggers</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveNotifications} className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded border border-border bg-card cursor-pointer">
                <div>
                  <span className="font-medium text-xs text-foreground block">Leave Request Approvals</span>
                  <span className="text-[11px] text-muted-foreground">Alert when staff submit time-off</span>
                </div>
                <input
                  type="checkbox"
                  checked={leavePush}
                  onChange={(e) => setLeavePush(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded border border-border bg-card cursor-pointer">
                <div>
                  <span className="font-medium text-xs text-foreground block">Payroll Batch Processing</span>
                  <span className="text-[11px] text-muted-foreground">Monthly calculation and tax alerts</span>
                </div>
                <input
                  type="checkbox"
                  checked={payrollAlerts}
                  onChange={(e) => setPayrollAlerts(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded border border-border bg-card cursor-pointer">
                <div>
                  <span className="font-medium text-xs text-foreground block">ATS Candidate Submissions</span>
                  <span className="text-[11px] text-muted-foreground">Notify on new job applications</span>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
              </label>

              <div className="flex justify-end pt-3 border-t border-border">
                <Button type="submit" variant="default" size="sm" className="gap-1">
                  <Save className="w-3.5 h-3.5" /> Save Alerts
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>

        {/* Tab 4: Appearance */}
        <TabsContent value="appearance">
          <Card className="p-4 space-y-4">
            <CardHeader className="p-0 pb-2">
              <CardTitle>Theme Mode</CardTitle>
              <CardDescription>Light, Dark, and System mode switcher</CardDescription>
            </CardHeader>

            <div className="flex items-center gap-3">
              <ThemeToggle variant="dropdown" />
            </div>

            <div className="p-3 rounded border border-border bg-muted/20 text-xs">
              <span className="font-medium text-foreground block">CSS Variables Strategy</span>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Choice persisted in <code className="font-mono text-primary">localStorage</code> adhering to official shadcn dark mode pattern.
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Tab 5: Security */}
        <TabsContent value="security">
          <Card className="p-4">
            <CardHeader className="p-0 pb-4">
              <CardTitle>Access & Credentials</CardTitle>
              <CardDescription>Password and 2FA settings</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveSecurity} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Current Password</label>
                  <Input type="password" placeholder="••••••••••••" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">New Password</label>
                  <Input type="password" placeholder="••••••••••••" />
                </div>
              </div>

              <div className="p-3 rounded border border-border bg-card flex items-center justify-between">
                <div>
                  <span className="font-medium text-xs text-foreground block">Two-Factor Authentication</span>
                  <span className="text-[11px] text-muted-foreground">TOTP Authenticator enabled</span>
                </div>
                <Badge variant="success">Active</Badge>
              </div>

              <div className="flex justify-end pt-3 border-t border-border">
                <Button type="submit" variant="default" size="sm" className="gap-1">
                  <Save className="w-3.5 h-3.5" /> Save Security
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
