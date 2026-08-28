export interface Employee {
  id: string
  employeeCode: string
  name: string
  role: string
  department: string
  email: string
  phone: string
  location: string
  status: "Active" | "On Leave" | "Inactive"
  joiningDate: string
  salary: number
  avatar: string
  rating: number
  manager: string
  emergencyContact: {
    name: string
    relation: string
    phone: string
  }
  skills: string[]
  bankAccount: string
  panNumber: string
}

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "emp-1",
    employeeCode: "TW-1001",
    name: "Aarav Sharma",
    role: "Principal Cloud Architect",
    department: "Engineering",
    email: "aarav.sharma@tekkzy.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
    status: "Active",
    joiningDate: "2023-03-15",
    salary: 2850000,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 4.9,
    manager: "Vikram Malhotra",
    emergencyContact: { name: "Pooja Sharma", relation: "Spouse", phone: "+91 98765 43219" },
    skills: ["Kubernetes", "AWS", "Go", "Distributed Systems", "Terraform"],
    bankAccount: "HDFC0001827 •••• 4829",
    panNumber: "ABCPS1289K"
  },
  {
    id: "emp-2",
    employeeCode: "TW-1002",
    name: "Priya Sundaram",
    role: "Senior Product Designer",
    department: "Design",
    email: "priya.sundaram@tekkzy.com",
    phone: "+91 98765 43211",
    location: "Hyderabad, India",
    status: "Active",
    joiningDate: "2023-06-01",
    salary: 1950000,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    rating: 4.8,
    manager: "Ananya Iyer",
    emergencyContact: { name: "R. Sundaram", relation: "Father", phone: "+91 98765 43220" },
    skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
    bankAccount: "ICIC0004928 •••• 9102",
    panNumber: "BTYPS9912L"
  },
  {
    id: "emp-3",
    employeeCode: "TW-1003",
    name: "Rohan Varma",
    role: "Full Stack Tech Lead",
    department: "Engineering",
    email: "rohan.varma@tekkzy.com",
    phone: "+91 98765 43212",
    location: "Pune, India",
    status: "Active",
    joiningDate: "2022-11-10",
    salary: 2400000,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 4.7,
    manager: "Aarav Sharma",
    emergencyContact: { name: "Neha Varma", relation: "Spouse", phone: "+91 98765 43221" },
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Next.js"],
    bankAccount: "SBIN0002819 •••• 3041",
    panNumber: "CKLPR4820M"
  },
  {
    id: "emp-4",
    employeeCode: "TW-1004",
    name: "Ananya Iyer",
    role: "VP of People & Culture",
    department: "Human Resources",
    email: "ananya.iyer@tekkzy.com",
    phone: "+91 98765 43213",
    location: "Bengaluru, India",
    status: "Active",
    joiningDate: "2022-01-10",
    salary: 3200000,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 5.0,
    manager: "CEO Office",
    emergencyContact: { name: "Karthik Iyer", relation: "Spouse", phone: "+91 98765 43222" },
    skills: ["Talent Strategy", "Compensation & Benefits", "DEI", "Leadership"],
    bankAccount: "KKBK0001092 •••• 7721",
    panNumber: "DHYPI9823N"
  },
  {
    id: "emp-5",
    employeeCode: "TW-1005",
    name: "Devendra Patel",
    role: "DevOps Engineer",
    department: "Engineering",
    email: "devendra.patel@tekkzy.com",
    phone: "+91 98765 43214",
    location: "Ahmedabad, India",
    status: "On Leave",
    joiningDate: "2024-01-15",
    salary: 1600000,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 4.5,
    manager: "Aarav Sharma",
    emergencyContact: { name: "Hasmukh Patel", relation: "Father", phone: "+91 98765 43223" },
    skills: ["Docker", "Kubernetes", "CI/CD Pipelines", "Prometheus", "Linux"],
    bankAccount: "BARB0001928 •••• 5590",
    panNumber: "EJNPP5521P"
  },
  {
    id: "emp-6",
    employeeCode: "TW-1006",
    name: "Sneha Mukherjee",
    role: "Product Growth Manager",
    department: "Product",
    email: "sneha.mukherjee@tekkzy.com",
    phone: "+91 98765 43215",
    location: "Kolkata, India",
    status: "Active",
    joiningDate: "2023-08-20",
    salary: 2100000,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    rating: 4.6,
    manager: "Ananya Iyer",
    emergencyContact: { name: "Soumitra Mukherjee", relation: "Brother", phone: "+91 98765 43224" },
    skills: ["Product Strategy", "Growth Loops", "A/B Testing", "Mixpanel", "SQL"],
    bankAccount: "UTIB0000843 •••• 6612",
    panNumber: "FMGPS3321Q"
  },
  {
    id: "emp-7",
    employeeCode: "TW-1007",
    name: "Kabir Mehta",
    role: "Financial Controller",
    department: "Finance",
    email: "kabir.mehta@tekkzy.com",
    phone: "+91 98765 43216",
    location: "Mumbai, India",
    status: "Active",
    joiningDate: "2023-02-01",
    salary: 2600000,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    rating: 4.9,
    manager: "CEO Office",
    emergencyContact: { name: "Alisha Mehta", relation: "Spouse", phone: "+91 98765 43225" },
    skills: ["Financial Planning", "Payroll Compliance", "Taxation", "Auditing"],
    bankAccount: "HDFC0001099 •••• 1120",
    panNumber: "GTLPM8890R"
  },
  {
    id: "emp-8",
    employeeCode: "TW-1008",
    name: "Tanvi Rao",
    role: "Talent Acquisition Specialist",
    department: "Human Resources",
    email: "tanvi.rao@tekkzy.com",
    phone: "+91 98765 43217",
    location: "Bengaluru, India",
    status: "Active",
    joiningDate: "2024-04-10",
    salary: 1250000,
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    rating: 4.4,
    manager: "Ananya Iyer",
    emergencyContact: { name: "Suresh Rao", relation: "Father", phone: "+91 98765 43226" },
    skills: ["Technical Sourcing", "Interview Coordination", "Employer Branding"],
    bankAccount: "ICIC0001201 •••• 9845",
    panNumber: "HTYPR4430S"
  },
  {
    id: "emp-9",
    employeeCode: "TW-1009",
    name: "Vikram Malhotra",
    role: "Head of Engineering",
    department: "Engineering",
    email: "vikram.malhotra@tekkzy.com",
    phone: "+91 98765 43218",
    location: "Bengaluru, India",
    status: "Active",
    joiningDate: "2021-09-01",
    salary: 4200000,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    rating: 4.95,
    manager: "CEO Office",
    emergencyContact: { name: "Sunita Malhotra", relation: "Spouse", phone: "+91 98765 43227" },
    skills: ["Engineering Leadership", "Cloud Architecture", "Team Scaling", "System Design"],
    bankAccount: "HDFC0000021 •••• 8841",
    panNumber: "IVKPM7712T"
  },
  {
    id: "emp-10",
    employeeCode: "TW-1010",
    name: "Ishaan Ghosh",
    role: "Senior Frontend Engineer",
    department: "Engineering",
    email: "ishaan.ghosh@tekkzy.com",
    phone: "+91 98765 43228",
    location: "Noida, India",
    status: "Inactive",
    joiningDate: "2023-05-15",
    salary: 1800000,
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    rating: 4.2,
    manager: "Rohan Varma",
    emergencyContact: { name: "Rita Ghosh", relation: "Mother", phone: "+91 98765 43229" },
    skills: ["React", "Tailwind CSS", "TypeScript", "Performance Tuning"],
    bankAccount: "SBIN0008890 •••• 4421",
    panNumber: "JHGPI1190U"
  }
]
