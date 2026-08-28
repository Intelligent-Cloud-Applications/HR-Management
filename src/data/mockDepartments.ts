export interface Department {
  id: string
  name: string
  code: string
  head: string
  headAvatar: string
  headRole: string
  employeeCount: number
  annualBudget: number
  openRoles: number
  description: string
  accentColor: string
  activeProjects: number
}

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: "dep-1",
    name: "Engineering",
    code: "ENG",
    head: "Vikram Malhotra",
    headAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    headRole: "Head of Engineering",
    employeeCount: 42,
    annualBudget: 48000000,
    openRoles: 5,
    description: "Building scalable cloud native infrastructure, web applications, and AI integrations.",
    accentColor: "from-blue-600 to-indigo-600",
    activeProjects: 8
  },
  {
    id: "dep-2",
    name: "Product & Design",
    code: "PRD",
    head: "Priya Sundaram",
    headAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    headRole: "Senior Product Designer",
    employeeCount: 14,
    annualBudget: 18500000,
    openRoles: 2,
    description: "Driving user experience, interface design, user research, and product roadmaps.",
    accentColor: "from-purple-600 to-pink-600",
    activeProjects: 6
  },
  {
    id: "dep-3",
    name: "Human Resources",
    code: "HR",
    head: "Ananya Iyer",
    headAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    headRole: "VP of People & Culture",
    employeeCount: 8,
    annualBudget: 12000000,
    openRoles: 1,
    description: "Managing talent acquisition, organizational culture, benefits, payroll, and retention.",
    accentColor: "from-emerald-600 to-teal-600",
    activeProjects: 4
  },
  {
    id: "dep-4",
    name: "Finance & Legal",
    code: "FIN",
    head: "Kabir Mehta",
    headAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    headRole: "Financial Controller",
    employeeCount: 6,
    annualBudget: 9500000,
    openRoles: 1,
    description: "Financial governance, tax compliance, budget allocation, audits, and investor reporting.",
    accentColor: "from-amber-600 to-orange-600",
    activeProjects: 3
  },
  {
    id: "dep-5",
    name: "Sales & Marketing",
    code: "MKT",
    head: "Shreya Sen",
    headAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    headRole: "Director of Enterprise Sales",
    employeeCount: 16,
    annualBudget: 22000000,
    openRoles: 3,
    description: "B2B SaaS customer acquisition, product marketing, brand visibility, and client success.",
    accentColor: "from-rose-600 to-red-600",
    activeProjects: 5
  }
]
