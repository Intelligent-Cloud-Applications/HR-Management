import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import {
  Users,
  CalendarCheck,
  CreditCard,
  CalendarDays,
  Award,
  Briefcase,
  ArrowRight,
  Check,
  Shield,
  Layers,
  FileSpreadsheet
} from "lucide-react"

export const LandingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual")

  const features = [
    {
      icon: Users,
      title: "Employee Directory & Profiles",
      description: "Centralized workforce repository with customized roles, digital document storage, compensation records, and department hierarchies.",
      link: "/dashboard/employees"
    },
    {
      icon: CalendarCheck,
      title: "Attendance & Time Tracking",
      description: "Shift monitoring, geofence-verified clock-in/out, WFH request tracking, automated late-arrival policies, and exportable logs.",
      link: "/dashboard/attendance"
    },
    {
      icon: CreditCard,
      title: "Payroll & Statutory Compliance",
      description: "Automated monthly salary calculation with Indian statutory deductions (TDS, PF, ESI, PT), allowances, and printable payslips.",
      link: "/dashboard/payroll"
    },
    {
      icon: CalendarDays,
      title: "Leave Management & Workflows",
      description: "Leave quota balances (Casual, Sick, Earned), instant manager review workflows, holiday tracking, and absence audits.",
      link: "/dashboard/leave"
    },
    {
      icon: Briefcase,
      title: "Recruitment & ATS Pipeline",
      description: "Visual 5-stage recruitment Kanban board, requisition management, candidate sourcing, evaluation scores, and offer tracking.",
      link: "/dashboard/recruitment"
    },
    {
      icon: Award,
      title: "Performance & OKR Objectives",
      description: "Appraisal cycles, 5-star scoring matrices, manager feedback notes, and company-wide strategic key results tracking.",
      link: "/dashboard/performance"
    }
  ]

  const stats = [
    { value: "50,000+", label: "Employees Managed" },
    { value: "99.98%", label: "Payroll Accuracy Rate" },
    { value: "70%", label: "Reduction in HR Ops Time" },
    { value: "ISO 27001", label: "Security & SOC-2 Ready" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="py-14 md:py-20 border-b border-border">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-border bg-muted/50 text-[11px] font-medium text-muted-foreground mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>TekkzyWork 2026 Enterprise Edition</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight max-w-3xl mx-auto leading-tight mb-4 text-foreground">
            Run your workforce with <span className="text-primary font-bold">TekkzyWork</span>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-8 font-normal leading-relaxed">
            The minimal, high-density HR management system for growing organizations. Unified directory, attendance tracking, Indian tax payroll, and recruitment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            <Link to="/dashboard">
              <Button size="md" variant="default" className="gap-2 font-medium">
                Launch Live App Demo
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="md" variant="outline">
                Sign In to Portal
              </Button>
            </Link>
          </div>

          {/* Real UI Component-Based Screenshot Mockup */}
          <div className="border border-border rounded-md bg-card p-3 text-left max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-border text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-border" />
                <span className="w-2.5 h-2.5 rounded-full bg-border" />
                <span className="w-2.5 h-2.5 rounded-full bg-border" />
                <span className="font-mono text-[11px] ml-2 text-foreground">app.tekkzywork.com/dashboard</span>
              </div>
              <Badge variant="outline" className="text-[10px]">Live Instance</Badge>
            </div>

            {/* Mock Header and KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <div className="p-3 rounded border border-border bg-background">
                <span className="text-[11px] text-muted-foreground block">Active Staff</span>
                <span className="text-lg font-mono font-semibold text-foreground">128 Employees</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-0.5">+8.2% vs last month</span>
              </div>
              <div className="p-3 rounded border border-border bg-background">
                <span className="text-[11px] text-muted-foreground block">Monthly Disbursed</span>
                <span className="text-lg font-mono font-semibold text-foreground">₹1,87,50,000</span>
                <span className="text-[10px] text-muted-foreground block mt-0.5">100% TDS/PF Compliant</span>
              </div>
              <div className="p-3 rounded border border-border bg-background">
                <span className="text-[11px] text-muted-foreground block">Present Today</span>
                <span className="text-lg font-mono font-semibold text-foreground">94.2%</span>
                <span className="text-[10px] text-muted-foreground block mt-0.5">88 on-time • 14 WFH</span>
              </div>
            </div>

            {/* Mock Table Rows */}
            <div className="border border-border rounded overflow-hidden text-xs">
              <div className="bg-muted/40 px-3 py-1.5 font-medium text-muted-foreground grid grid-cols-4 text-[11px]">
                <span>Employee</span>
                <span>Role</span>
                <span>Department</span>
                <span className="text-right">Status</span>
              </div>
              <div className="px-3 py-2 border-t border-border grid grid-cols-4 items-center">
                <span className="font-medium text-foreground">Aarav Sharma</span>
                <span className="text-muted-foreground">Principal Architect</span>
                <span className="text-muted-foreground">Engineering</span>
                <span className="text-right"><Badge variant="success">Active</Badge></span>
              </div>
              <div className="px-3 py-2 border-t border-border grid grid-cols-4 items-center bg-muted/10">
                <span className="font-medium text-foreground">Priya Sundaram</span>
                <span className="text-muted-foreground">Senior Designer</span>
                <span className="text-muted-foreground">Design</span>
                <span className="text-right"><Badge variant="success">Active</Badge></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="py-6 border-b border-border bg-muted/20">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="text-xl font-mono font-semibold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-14 border-b border-border">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="max-w-xl mb-10 space-y-1">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Built for high-density administrative workflows
            </h2>
            <p className="text-xs text-muted-foreground">
              Everything required to operate human resources, statutory payroll, and talent acquisition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <Card key={i} className="p-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded border border-border bg-muted/40 flex items-center justify-center text-primary">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {f.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-border">
                    <Link
                      to={f.link}
                      className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Open {f.title.split(" ")[0]} →
                    </Link>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-14 border-b border-border">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Transparent Enterprise Pricing</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Predictable flat rate tiers for companies of all sizes.</p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className={billingCycle === "monthly" ? "text-foreground font-medium" : "text-muted-foreground"}>Monthly</span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                className="w-9 h-5 rounded-full bg-muted border border-border p-0.5 relative transition-colors"
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-primary transition-transform ${
                    billingCycle === "annual" ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
              <span className={billingCycle === "annual" ? "text-foreground font-medium" : "text-muted-foreground"}>
                Annual (Save 20%)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-5 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Growth</h3>
                <div className="text-2xl font-mono font-semibold">
                  {billingCycle === "annual" ? "₹4,999" : "₹5,999"}
                  <span className="text-xs font-normal text-muted-foreground"> /mo</span>
                </div>
                <ul className="space-y-1.5 text-xs text-muted-foreground pt-3 border-t border-border">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-foreground" /> Up to 25 Employees</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-foreground" /> Time & Attendance Tracking</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-foreground" /> Monthly Payroll Generation</li>
                </ul>
              </div>
              <Link to="/dashboard" className="mt-6">
                <Button variant="outline" size="sm" className="w-full">Get Started</Button>
              </Link>
            </Card>

            <Card className="p-5 flex flex-col justify-between border-primary">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-primary">Scale</h3>
                  <Badge variant="brand">Recommended</Badge>
                </div>
                <div className="text-2xl font-mono font-semibold">
                  {billingCycle === "annual" ? "₹14,999" : "₹17,999"}
                  <span className="text-xs font-normal text-muted-foreground"> /mo</span>
                </div>
                <ul className="space-y-1.5 text-xs text-foreground pt-3 border-t border-border">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-primary" /> Up to 200 Employees</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-primary" /> Indian Statutory Tax Engine (TDS/PF)</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-primary" /> Recruitment ATS Kanban Board</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-primary" /> Performance Reviews & OKRs</li>
                </ul>
              </div>
              <Link to="/dashboard" className="mt-6">
                <Button variant="default" size="sm" className="w-full">Start 14-Day Trial</Button>
              </Link>
            </Card>

            <Card className="p-5 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Custom Enterprise</h3>
                <div className="text-2xl font-mono font-semibold">Custom</div>
                <ul className="space-y-1.5 text-xs text-muted-foreground pt-3 border-t border-border">
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-foreground" /> Unlimited Employees</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-foreground" /> Dedicated SSO / SAML 2.0 Integration</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-foreground" /> 99.99% Uptime SLA Guarantee</li>
                </ul>
              </div>
              <Link to="/login" className="mt-6">
                <Button variant="outline" size="sm" className="w-full">Contact Sales</Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
