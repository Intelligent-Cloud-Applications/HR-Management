export interface DevLogItem {
  id: string
  title: string
  description: string
  category: "Core Architecture" | "UI & Theming" | "Employee Management" | "Payroll & Tax" | "ATS & Recruitment" | "Security & Auth"
  version?: string
  dateCompleted?: string
  targetQuarter?: string
  priority: "High" | "Medium" | "Low" | "Critical"
  status: "completed" | "in-progress" | "planned"
  author: string
  tags: string[]
}

export const DEV_LOG_COMPLETED: DevLogItem[] = [
  {
    id: "dev-c1",
    title: "TekkzyWork Core Application Architecture & Design Tokens",
    description: "Configured React 18, Vite, TypeScript, and Tailwind CSS with custom CSS variables supporting dark and light themes with persistent state.",
    category: "Core Architecture",
    version: "v1.0.0-alpha",
    dateCompleted: "2026-08-28",
    priority: "Critical",
    status: "completed",
    author: "Tekkzy Core Team",
    tags: ["React", "Vite", "TailwindCSS", "CSS Variables"]
  },
  {
    id: "dev-c2",
    title: "Executive HR Dashboard with Recharts Visualizations",
    description: "Built analytics overview featuring live Headcount growth area graph, Department distribution donut chart, and weekly attendance breakdown.",
    category: "UI & Theming",
    version: "v1.0.0-alpha",
    dateCompleted: "2026-08-28",
    priority: "High",
    status: "completed",
    author: "Tekkzy Frontend Team",
    tags: ["Recharts", "Analytics", "KPIs"]
  },
  {
    id: "dev-c3",
    title: "Employee Directory with Slide-out Profile Drawer & Live Filter",
    description: "Implemented paginated data table with real-time department and status filtering, instant employee search, and detail drawer with full emergency & job info.",
    category: "Employee Management",
    version: "v1.0.0-alpha",
    dateCompleted: "2026-08-28",
    priority: "High",
    status: "completed",
    author: "Tekkzy Frontend Team",
    tags: ["DataTable", "Drawers", "Search & Filter"]
  },
  {
    id: "dev-c4",
    title: "Interactive Time & Attendance Tracker with Clock-In Widget",
    description: "Designed clock-in/out interactive timer widget, working hours calculation, and monthly attendance records with status badges.",
    category: "UI & Theming",
    version: "v1.0.0-alpha",
    dateCompleted: "2026-08-28",
    priority: "Medium",
    status: "completed",
    author: "Tekkzy Team",
    tags: ["Attendance", "Time Tracking", "Clock-In"]
  },
  {
    id: "dev-c5",
    title: "Leave Management System with Request Actions & Balance Cards",
    description: "Created leave request application workflow with instant approval/rejection reactive triggers, balance deductions, and status indicators.",
    category: "Employee Management",
    version: "v1.0.0-alpha",
    dateCompleted: "2026-08-28",
    priority: "High",
    status: "completed",
    author: "Tekkzy Team",
    tags: ["Leave Tracker", "Workflows", "Balance Cards"]
  },
  {
    id: "dev-c6",
    title: "Payroll Computation, Batch Run & Printable Payslip Generator",
    description: "Implemented salary records with PF, Tax, HRA allowances, simulated batch disbursement engine with confetti triggers, and printable modal payslip view.",
    category: "Payroll & Tax",
    version: "v1.0.0-alpha",
    dateCompleted: "2026-08-28",
    priority: "Critical",
    status: "completed",
    author: "Tekkzy Payroll Team",
    tags: ["Payroll", "Payslips", "Taxation", "Print"]
  },
  {
    id: "dev-c7",
    title: "Recruitment Kanban Board with Candidate Stage Transitions",
    description: "Interactive 5-stage recruitment pipeline with stage movement, candidate profiles, and job opening management.",
    category: "ATS & Recruitment",
    version: "v1.0.0-alpha",
    dateCompleted: "2026-08-28",
    priority: "High",
    status: "completed",
    author: "Tekkzy ATS Team",
    tags: ["Kanban", "Recruitment", "Pipeline"]
  },
  {
    id: "dev-c8",
    title: "Development Log & Roadmap Internal Tracking System",
    description: "Built dedicated internal changelog and roadmap dashboard with status badges, priority filtering, and markdown task details.",
    category: "Core Architecture",
    version: "v1.0.0-alpha",
    dateCompleted: "2026-08-28",
    priority: "Medium",
    status: "completed",
    author: "Tekkzy Core Team",
    tags: ["Dev Log", "Roadmap", "Changelog"]
  }
]

export const DEV_LOG_PLANNED: DevLogItem[] = [
  {
    id: "dev-p1",
    title: "Biometric Device Webhook & Hardware Sync Integration",
    description: "Connect real-world ZKTeco and Anviz fingerprint/facial recognition IoT devices via secure webhooks.",
    category: "Core Architecture",
    targetQuarter: "Q4 2026",
    priority: "High",
    status: "planned",
    author: "IoT Engineering Team",
    tags: ["Webhooks", "Hardware", "Biometrics"]
  },
  {
    id: "dev-p2",
    title: "AI-Powered Resume Parsing & Candidate Match Scoring",
    description: "Integrate automated PDF resume extraction with semantic skill scoring against job descriptions.",
    category: "ATS & Recruitment",
    targetQuarter: "Q4 2026",
    priority: "High",
    status: "planned",
    author: "Tekkzy AI Labs",
    tags: ["AI", "Resume Parser", "Embeddings"]
  },
  {
    id: "dev-p3",
    title: "Direct Bank API Automated Salary Disbursal (RazorpayX / ICICI)",
    description: "One-click bulk payout straight to Indian and international bank accounts with automated UTR reconciliation.",
    category: "Payroll & Tax",
    targetQuarter: "Q1 2027",
    priority: "Critical",
    status: "planned",
    author: "Tekkzy Fintech Team",
    tags: ["Banking API", "RazorpayX", "Auto Payout"]
  },
  {
    id: "dev-p4",
    title: "SAML 2.0 / Okta & Azure Active Directory Single Sign-On",
    description: "Enterprise SSO enforcement for multi-tenant enterprise organizations with RBAC provisioning.",
    category: "Security & Auth",
    targetQuarter: "Q1 2027",
    priority: "High",
    status: "planned",
    author: "Security Team",
    tags: ["SSO", "SAML", "Okta", "Azure AD"]
  },
  {
    id: "dev-p5",
    title: "Native iOS & Android Mobile Companion App (React Native)",
    description: "Self-service mobile application for geofenced clock-in, leave applications, and instant payslip downloads.",
    category: "Core Architecture",
    targetQuarter: "Q2 2027",
    priority: "Medium",
    status: "planned",
    author: "Mobile Team",
    tags: ["React Native", "Mobile", "iOS", "Android"]
  }
]
