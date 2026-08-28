export interface PerformanceReview {
  id: string
  employeeId: string
  employeeName: string
  avatar: string
  role: string
  department: string
  rating: number // out of 5
  reviewCycle: string
  reviewer: string
  feedback: string
  goalsCompletion: number // percentage
  status: "Completed" | "Pending Employee Signoff" | "Scheduled"
}

export interface OKRGoal {
  id: string
  title: string
  category: "Engineering" | "Company" | "Sales" | "Operations"
  owner: string
  ownerAvatar: string
  progress: number
  targetDate: string
  status: "On Track" | "At Risk" | "Ahead"
}

export const PERFORMANCE_REVIEWS: PerformanceReview[] = [
  {
    id: "perf-1",
    employeeId: "emp-1",
    employeeName: "Aarav Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    role: "Principal Cloud Architect",
    department: "Engineering",
    rating: 4.9,
    reviewCycle: "H1 2026",
    reviewer: "Vikram Malhotra",
    feedback: "Aarav spearheaded the microservices Kubernetes migration with zero downtime. Exceptional architectural mastery and leadership in mentoring junior team members.",
    goalsCompletion: 98,
    status: "Completed"
  },
  {
    id: "perf-2",
    employeeId: "emp-2",
    employeeName: "Priya Sundaram",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    role: "Senior Product Designer",
    department: "Design",
    rating: 4.8,
    reviewCycle: "H1 2026",
    reviewer: "Ananya Iyer",
    feedback: "Redesigned our core enterprise product design system. Received glowing feedback from both engineering and prospective client stakeholders.",
    goalsCompletion: 94,
    status: "Completed"
  },
  {
    id: "perf-3",
    employeeId: "emp-3",
    employeeName: "Rohan Varma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    role: "Full Stack Tech Lead",
    department: "Engineering",
    rating: 4.7,
    reviewCycle: "H1 2026",
    reviewer: "Aarav Sharma",
    feedback: "Consistently delivers critical platform features ahead of schedule. Great team collaboration and high code quality standard enforcement.",
    goalsCompletion: 90,
    status: "Pending Employee Signoff"
  }
]

export const OKR_GOALS: OKRGoal[] = [
  {
    id: "okr-1",
    title: "Achieve 99.99% Cloud Service Uptime across production clusters",
    category: "Engineering",
    owner: "Aarav Sharma",
    ownerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    progress: 88,
    targetDate: "Q3 2026",
    status: "On Track"
  },
  {
    id: "okr-2",
    title: "Launch TekkzyWork Design System 2.0 with full accessibility audits",
    category: "Operations",
    owner: "Priya Sundaram",
    ownerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    progress: 95,
    targetDate: "Q3 2026",
    status: "Ahead"
  },
  {
    id: "okr-3",
    title: "Reduce employee hiring cycle time from 42 days to 21 days",
    category: "Company",
    owner: "Tanvi Rao",
    ownerAvatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    progress: 72,
    targetDate: "Q4 2026",
    status: "On Track"
  }
]
