import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Users,
  CalendarCheck,
  CalendarDays,
  Briefcase,
  AlertCircle,
  TrendingUp,
  UserPlus,
  FilePlus,
  CreditCard,
  ArrowUpRight,
  Clock,
  Cake,
  Calendar
} from "lucide-react"
import { StatCard } from "@/components/ui/StatCard"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { useToast } from "@/lib/toast"
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts"

const headcountData = [
  { month: "Jan", employees: 72 },
  { month: "Feb", employees: 78 },
  { month: "Mar", employees: 85 },
  { month: "Apr", employees: 92 },
  { month: "May", employees: 104 },
  { month: "Jun", employees: 112 },
  { month: "Jul", employees: 118 },
  { month: "Aug", employees: 128 },
]

const departmentPieData = [
  { name: "Engineering", value: 42, color: "#38BDF8" },
  { name: "Product & Design", value: 14, color: "#60A5FA" },
  { name: "Sales & Marketing", value: 16, color: "#818CF8" },
  { name: "HR & People", value: 8, color: "#475569" },
  { name: "Finance & Legal", value: 6, color: "#1E293B" },
]

const attendanceBarData = [
  { day: "Mon", Present: 96, Late: 6, WFH: 12 },
  { day: "Tue", Present: 98, Late: 4, WFH: 10 },
  { day: "Wed", Present: 94, Late: 8, WFH: 15 },
  { day: "Thu", Present: 97, Late: 5, WFH: 11 },
  { day: "Fri", Present: 91, Late: 11, WFH: 18 },
]

export const DashboardOverview: React.FC = () => {
  const { toast } = useToast()
  const [quickAddEmployeeOpen, setQuickAddEmployeeOpen] = useState(false)
  const [quickApplyLeaveOpen, setQuickApplyLeaveOpen] = useState(false)

  // Form states
  const [newEmpName, setNewEmpName] = useState("")
  const [newEmpRole, setNewEmpRole] = useState("")
  const [newEmpDept, setNewEmpDept] = useState("Engineering")

  const [leaveType, setLeaveType] = useState("Sick Leave")
  const [leaveDays, setLeaveDays] = useState("2")

  const handleQuickAddEmp = (e: React.FormEvent) => {
    e.preventDefault()
    setQuickAddEmployeeOpen(false)
    toast({
      title: "Employee Added",
      description: `${newEmpName || "New Employee"} added to ${newEmpDept}.`,
      type: "success",
    })
    setNewEmpName("")
    setNewEmpRole("")
  }

  const handleQuickApplyLeave = (e: React.FormEvent) => {
    e.preventDefault()
    setQuickApplyLeaveOpen(false)
    toast({
      title: "Leave Request Submitted",
      description: `${leaveType} application for ${leaveDays} days pending approval.`,
      type: "success",
    })
  }

  const recentActivities = [
    {
      id: "act-1",
      user: "Aarav Sharma",
      action: "approved leave request for",
      target: "Devendra Patel (3 days Sick Leave)",
      time: "15m ago",
    },
    {
      id: "act-2",
      user: "Tanvi Rao",
      action: "moved candidate to Offer stage:",
      target: "Meera Krishnan (Lead Designer)",
      time: "1h ago",
    },
    {
      id: "act-3",
      user: "Kabir Mehta",
      action: "computed payroll batch for",
      target: "August 2026 (₹1.87 Cr)",
      time: "3h ago",
    },
    {
      id: "act-4",
      user: "Priya Sundaram",
      action: "submitted H1 2026 self-appraisal review",
      target: "Design Operations",
      time: "Yesterday",
    },
  ]

  const upcomingEvents = [
    {
      type: "birthday",
      title: "Priya Sundaram's Birthday",
      date: "Tomorrow, Aug 29",
      icon: Cake,
    },
    {
      type: "holiday",
      title: "Ganesh Chaturthi (All Offices)",
      date: "Sep 7, 2026",
      icon: Calendar,
    },
    {
      type: "review",
      title: "Q3 Engineering OKR Alignment",
      date: "Sep 1, 2026 • 14:00",
      icon: Clock,
    },
  ]

  return (
    <div className="space-y-4 font-sans">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-border">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Overview
          </h1>
          <p className="text-xs text-muted-foreground">
            TekkzyWork system snapshot • Friday, August 28, 2026
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="default"
            onClick={() => setQuickAddEmployeeOpen(true)}
            className="gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" /> Add Employee
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setQuickApplyLeaveOpen(true)}
            className="gap-1.5"
          >
            <FilePlus className="w-3.5 h-3.5" /> Apply Leave
          </Button>
          <Link to="/dashboard/payroll">
            <Button size="sm" variant="secondary" className="gap-1.5">
              <CreditCard className="w-3.5 h-3.5" /> Run Payroll
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard
          title="Total Employees"
          value="128"
          icon={<Users className="w-4 h-4" />}
          trend={{ value: "+8.2%", isPositive: true, label: "vs last mo" }}
        />

        <StatCard
          title="Present Today"
          value="96"
          icon={<CalendarCheck className="w-4 h-4" />}
          trend={{ value: "94.2%", isPositive: true, label: "rate" }}
        />

        <StatCard
          title="On Leave"
          value="4"
          icon={<CalendarDays className="w-4 h-4" />}
          description="2 Sick, 2 Casual"
        />

        <StatCard
          title="Open Roles"
          value="4"
          icon={<Briefcase className="w-4 h-4" />}
          description="93 Applicants"
        />

        <StatCard
          title="Pending Approvals"
          value="2"
          icon={<AlertCircle className="w-4 h-4" />}
          trend={{ value: "Action req", isPositive: false, label: "" }}
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Headcount Growth Chart */}
        <Card className="lg:col-span-2 p-4">
          <CardHeader className="p-0 pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle>Headcount Trend</CardTitle>
              <CardDescription>Active employee count (Jan - Aug 2026)</CardDescription>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">+77% YoY</span>
          </CardHeader>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={headcountData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="headcountGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.4}/>
                    <stop offset="60%" stopColor="#2563EB" stopOpacity={0.15}/>
                    <stop offset="100%" stopColor="#05050A" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" stroke="rgba(56, 189, 248, 0.08)" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} domain={['dataMin - 10', 'dataMax + 10']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0D0D14",
                    borderColor: "#1E1E2E",
                    borderRadius: "0.5rem",
                    fontSize: "11px",
                    color: "#F8FAFC",
                    boxShadow: "0 0 15px rgba(56,189,248,0.15)"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="employees"
                  stroke="#38BDF8"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#headcountGrad)"
                  dot={{ r: 4, fill: "#38BDF8", strokeWidth: 2, stroke: "#05050A" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Department Distribution Donut */}
        <Card className="p-4 flex flex-col justify-between border-[#1E1E2E] bg-[#0E0E16]">
          <CardHeader className="p-0 pb-2">
            <CardTitle>Department Breakdown</CardTitle>
            <CardDescription>Headcount by unit</CardDescription>
          </CardHeader>
          <div className="h-44 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {departmentPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0D0D14",
                    borderColor: "#1E1E2E",
                    borderRadius: "0.5rem",
                    fontSize: "11px",
                    color: "#F8FAFC",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-mono font-bold text-white">128</span>
              <span className="text-[10px] text-[#38BDF8] uppercase tracking-wider font-semibold">Staff</span>
            </div>
          </div>
          <div className="space-y-1 text-[11px] pt-2 border-t border-[#1E1E2E]">
            {departmentPieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  {d.name}
                </span>
                <span className="font-mono text-white font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Attendance Bar & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Attendance Breakdown */}
        <Card className="lg:col-span-2 p-4 border-[#1E1E2E] bg-[#0E0E16]">
          <CardHeader className="p-0 pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle>Attendance Distribution (Weekly)</CardTitle>
              <CardDescription>Present, Late, and WFH daily split</CardDescription>
            </div>
            <Link to="/dashboard/attendance" className="text-xs text-[#38BDF8] hover:underline flex items-center gap-1">
              View Log <ArrowUpRight className="w-3 h-3" />
            </Link>
          </CardHeader>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceBarData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="wfhGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#1E3A8A" />
                  </linearGradient>
                  <linearGradient id="presentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#065F46" />
                  </linearGradient>
                  <linearGradient id="lateGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#92400E" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" stroke="rgba(56, 189, 248, 0.08)" />
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0D0D14",
                    borderColor: "#1E1E2E",
                    borderRadius: "0.5rem",
                    fontSize: "11px",
                    color: "#F8FAFC",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }} />
                <Bar dataKey="Present" fill="url(#presentGrad)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Late" fill="url(#lateGrad)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="WFH" fill="url(#wfhGrad)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="p-4 flex flex-col justify-between">
          <div>
            <CardHeader className="p-0 pb-3">
              <CardTitle>Schedule & Milestones</CardTitle>
              <CardDescription>Upcoming dates</CardDescription>
            </CardHeader>
            <div className="space-y-2">
              {upcomingEvents.map((evt, index) => {
                const Icon = evt.icon
                return (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 p-2 rounded border border-border bg-background"
                  >
                    <Icon className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-foreground truncate">{evt.title}</p>
                      <p className="text-[10px] text-muted-foreground">{evt.date}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-border text-center">
            <Link
              to="/dashboard/leave"
              className="text-[11px] text-primary hover:underline"
            >
              Full Calendar →
            </Link>
          </div>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card className="p-4">
        <CardHeader className="p-0 pb-3 flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Workforce Activity</CardTitle>
            <CardDescription>Audit log timeline</CardDescription>
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">Live</span>
        </CardHeader>
        <div className="divide-y divide-border">
          {recentActivities.map((act) => (
            <div key={act.id} className="py-2.5 flex items-center justify-between gap-3 text-xs first:pt-0 last:pb-0">
              <div>
                <span className="font-semibold text-foreground">{act.user}</span>{" "}
                <span className="text-muted-foreground">{act.action}</span>{" "}
                <span className="text-foreground font-medium">{act.target}</span>
              </div>
              <span className="text-[11px] text-muted-foreground whitespace-nowrap font-mono">{act.time}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Modal: Quick Add Employee */}
      <Modal
        isOpen={quickAddEmployeeOpen}
        onClose={() => setQuickAddEmployeeOpen(false)}
        title="Add Employee"
        description="Quick profile creation"
      >
        <form onSubmit={handleQuickAddEmp} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Full Name</label>
            <Input
              required
              placeholder="e.g. Siddharth Joshi"
              value={newEmpName}
              onChange={(e) => setNewEmpName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Role</label>
              <Input
                required
                placeholder="Senior DevOps Lead"
                value={newEmpRole}
                onChange={(e) => setNewEmpRole(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Department</label>
              <Select
                value={newEmpDept}
                onChange={(e) => setNewEmpDept(e.target.value)}
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
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button type="button" variant="outline" size="sm" onClick={() => setQuickAddEmployeeOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default" size="sm">
              Add Employee
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Quick Apply Leave */}
      <Modal
        isOpen={quickApplyLeaveOpen}
        onClose={() => setQuickApplyLeaveOpen(false)}
        title="Apply Leave"
        description="Submit for approval"
      >
        <form onSubmit={handleQuickApplyLeave} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Type</label>
              <Select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                options={[
                  { value: "Sick Leave", label: "Sick Leave (8 left)" },
                  { value: "Casual Leave", label: "Casual Leave (8 left)" },
                  { value: "Earned Leave", label: "Earned Leave (11 left)" },
                ]}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Days</label>
              <Input
                type="number"
                min="1"
                max="30"
                value={leaveDays}
                onChange={(e) => setLeaveDays(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Reason</label>
            <Input required placeholder="Brief reason..." />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button type="button" variant="outline" size="sm" onClick={() => setQuickApplyLeaveOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default" size="sm">
              Submit Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
