export interface Candidate {
  id: string
  name: string
  role: string
  department: string
  stage: "Applied" | "Screening" | "Interview" | "Offer" | "Hired" | "Rejected"
  appliedDate: string
  email: string
  phone: string
  experienceYears: number
  expectedSalary: string
  rating: number
  avatar: string
  resumeUrl?: string
}

export interface JobOpening {
  id: string
  title: string
  department: string
  location: string
  type: "Full-Time" | "Remote" | "Hybrid"
  experience: string
  applicantsCount: number
  status: "Active" | "Closed" | "Draft"
  postedDate: string
  salaryRange: string
}

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: "job-1",
    title: "Senior Backend Go Engineer",
    department: "Engineering",
    location: "Bengaluru, India (Hybrid)",
    type: "Hybrid",
    experience: "5+ Years",
    applicantsCount: 38,
    status: "Active",
    postedDate: "2026-08-10",
    salaryRange: "₹24L - ₹32L"
  },
  {
    id: "job-2",
    title: "Lead Product Designer",
    department: "Design",
    location: "Remote (India)",
    type: "Remote",
    experience: "6+ Years",
    applicantsCount: 24,
    status: "Active",
    postedDate: "2026-08-14",
    salaryRange: "₹22L - ₹30L"
  },
  {
    id: "job-3",
    title: "Enterprise Account Executive",
    department: "Sales",
    location: "Mumbai, India",
    type: "Full-Time",
    experience: "4+ Years",
    applicantsCount: 19,
    status: "Active",
    postedDate: "2026-08-18",
    salaryRange: "₹18L - ₹26L + OTE"
  },
  {
    id: "job-4",
    title: "Cloud Infrastructure Architect",
    department: "Engineering",
    location: "Bengaluru, India",
    type: "Hybrid",
    experience: "8+ Years",
    applicantsCount: 12,
    status: "Active",
    postedDate: "2026-08-20",
    salaryRange: "₹35L - ₹48L"
  }
]

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: "cand-1",
    name: "Vikrant Deshmukh",
    role: "Senior Backend Go Engineer",
    department: "Engineering",
    stage: "Interview",
    appliedDate: "2026-08-12",
    email: "vikrant.d@example.com",
    phone: "+91 91234 56789",
    experienceYears: 6,
    expectedSalary: "₹28,00,000",
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "cand-2",
    name: "Meera Krishnan",
    role: "Lead Product Designer",
    department: "Design",
    stage: "Offer",
    appliedDate: "2026-08-15",
    email: "meera.k@example.com",
    phone: "+91 91234 56788",
    experienceYears: 7,
    expectedSalary: "₹29,00,000",
    rating: 4.9,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "cand-3",
    name: "Aditya Roy",
    role: "Senior Backend Go Engineer",
    department: "Engineering",
    stage: "Screening",
    appliedDate: "2026-08-22",
    email: "aditya.roy@example.com",
    phone: "+91 91234 56787",
    experienceYears: 4,
    expectedSalary: "₹22,00,000",
    rating: 4.2,
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "cand-4",
    name: "Shreya Sen",
    role: "Enterprise Account Executive",
    department: "Sales",
    stage: "Applied",
    appliedDate: "2026-08-25",
    email: "shreya.sen@example.com",
    phone: "+91 91234 56786",
    experienceYears: 5,
    expectedSalary: "₹20,00,000",
    rating: 4.5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "cand-5",
    name: "Kunal Singhal",
    role: "Cloud Infrastructure Architect",
    department: "Engineering",
    stage: "Hired",
    appliedDate: "2026-08-01",
    email: "kunal.singhal@example.com",
    phone: "+91 91234 56785",
    experienceYears: 9,
    expectedSalary: "₹42,00,000",
    rating: 5.0,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80"
  }
]
