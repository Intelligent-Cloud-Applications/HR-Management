# TekkzyWork — Enterprise HR Management System

> **TekkzyWork** is a minimal, data-forward HR Management System developed for **Tekkzy Intelligent Cloud Applications Pvt. Ltd.** Engineered for fast-growing companies and modern enterprises, TekkzyWork consolidates workforce operations, shift tracking, Indian statutory payroll, talent acquisition, and performance OKRs into a single cohesive platform.

---

## 🛠️ Technology Stack

- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS (CSS variables, flat enterprise design, hairline borders)
- **UI Components**: Custom shadcn/ui components (Buttons, Tables, Modals, Drawers, Tabs, Badges, Dropdowns, StatCards)
- **Visualizations**: Recharts (Single-accent / monochrome headcount growth, department breakdown, and attendance charts)
- **Icons**: Lucide React
- **Typography**: Inter (Google Fonts)
- **Theming**: Official shadcn dark mode strategy (`light`, `dark`, and `system` mode persisted in `localStorage`) with a constant dark mode sidebar

---

## 📁 Key Features & Modules

1. **Public Marketing Landing Page (`/`)**: High-converting hero, interactive live product mockup, 6 core feature cards, metrics strip, transparent pricing calculator, and official company footer.
2. **Authentication Portal (`/login`)**: SaaS sign-in card with quick-fill demo roles (*HR Admin*, *HR Lead*, *Staff Employee*).
3. **Executive Dashboard (`/dashboard`)**: Full-width data view with real-time KPI tiles, headcount growth curve, department breakdown, and weekly attendance breakdown.
4. **Employee Directory (`/dashboard/employees`)**: High-density table with search, department filters, status filters, slide-out profile drawer, and new hire onboarding modal.
5. **Attendance & Time Tracking (`/dashboard/attendance`)**: Active shift ticker with live stopwatch, clock-in/out button, geofence verification badge, and CSV export.
6. **Leave Management (`/dashboard/leave`)**: Quota balance progress cards (Casual, Sick, Earned, Parental), approval/rejection workflows, and leave application dialog.
7. **Payroll & Statutory Tax (`/dashboard/payroll`)**: Monthly salary calculations (Basic, HRA, Allowances, PF, TDS Tax, PT), batch disbursement processing, and printable/downloadable official payslips.
8. **Recruitment & ATS Pipeline (`/dashboard/recruitment`)**: 5-stage candidate Kanban pipeline (*Applied*, *Screening*, *Interview*, *Offer*, *Hired*) and open requisitions manager.
9. **Performance & OKRs (`/dashboard/performance`)**: Strategic company objectives progress tracking and H1 2026 360-degree review scorecards.
10. **Departments (`/dashboard/departments`)**: Functional divisions, department heads, headcount, and budget allocations.
11. **Reports & Analytics (`/dashboard/reports`)**: Attrition rate benchmarking, average CTC distribution, and EPFO / Form 16 export triggers.
12. **Development Log & Roadmap (`/dashboard/dev-log`)**: Internal changelog checklist tracking shipped and upcoming roadmap milestones.
13. **Settings (`/dashboard/settings`)**: Tabbed configuration for Admin Profile, Company Legal Info, Notifications, Appearance, and Security/2FA.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm / pnpm / yarn

### Installation & Local Setup

```bash
# Clone repository
git clone https://github.com/Intelligent-Cloud-Applications/HR-Management.git
cd HR-Management

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🏢 Corporate Credits

**© 2026 Tekkzy Intelligent Cloud Applications Pvt. Ltd. All rights reserved.**
