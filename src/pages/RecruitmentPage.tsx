import React, { useState } from "react"
import { JOB_OPENINGS, INITIAL_CANDIDATES, Candidate, JobOpening } from "@/data/mockRecruitment"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Modal } from "@/components/ui/Modal"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"
import { useToast } from "@/lib/toast"
import {
  Briefcase,
  PlusCircle,
  Users,
  MapPin,
  Clock,
  Star
} from "lucide-react"

export const RecruitmentPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES)
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>(JOB_OPENINGS)
  const [activeTab, setActiveTab] = useState("kanban")
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false)
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const { toast } = useToast()

  const [jobTitle, setJobTitle] = useState("")
  const [jobDept, setJobDept] = useState("Engineering")
  const [jobLocation, setJobLocation] = useState("Bengaluru, India (Hybrid)")
  const [salaryRange, setSalaryRange] = useState("₹25L - ₹35L")

  const stages: Candidate["stage"][] = ["Applied", "Screening", "Interview", "Offer", "Hired"]

  const handleMoveCandidate = (candidateId: string, newStage: Candidate["stage"]) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: newStage } : c))
    )
    toast({
      title: "Candidate Moved",
      description: `Stage updated to ${newStage}.`,
      type: "info",
    })
  }

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault()
    const newJob: JobOpening = {
      id: `job-${Date.now()}`,
      title: jobTitle,
      department: jobDept,
      location: jobLocation,
      type: "Hybrid",
      experience: "3+ Years",
      applicantsCount: 0,
      status: "Active",
      postedDate: new Date().toISOString().split("T")[0],
      salaryRange,
    }

    setJobOpenings([newJob, ...jobOpenings])
    setIsPostJobModalOpen(false)
    setJobTitle("")

    toast({
      title: "Requisition Published",
      description: `${jobTitle} is now live.`,
      type: "success",
    })
  }

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title="Recruitment & ATS"
        description="Candidate pipelines, stage progression, and job openings."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Recruitment" },
        ]}
        actions={
          <Button variant="default" size="sm" onClick={() => setIsPostJobModalOpen(true)} className="gap-1.5">
            <PlusCircle className="w-3.5 h-3.5" />
            Post Requisition
          </Button>
        }
      />

      <Tabs defaultValue="kanban" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="kanban" className="gap-1.5">
              <Users className="w-3.5 h-3.5" /> Pipeline ({candidates.length})
            </TabsTrigger>
            <TabsTrigger value="jobs" className="gap-1.5">
              <Briefcase className="w-3.5 h-3.5" /> Open Requisitions ({jobOpenings.length})
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1: Kanban Board */}
        <TabsContent value="kanban">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-start overflow-x-auto pb-2">
            {stages.map((stage) => {
              const stageCandidates = candidates.filter((c) => c.stage === stage)

              return (
                <div
                  key={stage}
                  className="rounded border border-border bg-muted/20 p-2.5 flex flex-col gap-2 min-w-[210px]"
                >
                  <div className="flex items-center justify-between pb-1 border-b border-border text-xs">
                    <span className="font-medium text-foreground uppercase tracking-wider text-[11px]">{stage}</span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {stageCandidates.length}
                    </span>
                  </div>

                  <div className="space-y-2 min-h-[220px]">
                    {stageCandidates.map((cand) => (
                      <Card
                        key={cand.id}
                        className="p-2.5 cursor-pointer hover:border-primary transition-colors space-y-2 bg-card"
                        onClick={() => setSelectedCandidate(cand)}
                      >
                        <div>
                          <h4 className="font-medium text-xs text-foreground">{cand.name}</h4>
                          <p className="text-[11px] text-muted-foreground truncate">{cand.role}</p>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border">
                          <span className="flex items-center gap-0.5">
                            <Star className="w-3 h-3 text-muted-foreground" /> {cand.rating}
                          </span>
                          <span>{cand.experienceYears}y exp</span>
                        </div>

                        <div className="pt-1 border-t border-border text-[10px]">
                          <select
                            value={cand.stage}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>
                              handleMoveCandidate(cand.id, e.target.value as Candidate["stage"])
                            }
                            className="w-full bg-muted/50 px-1.5 py-0.5 rounded border border-border text-foreground text-[10px] focus:outline-none cursor-pointer"
                          >
                            {stages.map((s) => (
                              <option key={s} value={s}>
                                Move to {s}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Card>
                    ))}

                    {stageCandidates.length === 0 && (
                      <div className="py-6 text-center text-[11px] text-muted-foreground">
                        Empty
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        {/* Tab 2: Job Openings */}
        <TabsContent value="jobs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-sm text-foreground">{job.title}</h3>
                      <p className="text-xs text-muted-foreground">{job.department} • {job.experience}</p>
                    </div>
                    <Badge variant={job.status === "Active" ? "success" : "secondary"}>
                      {job.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span>{job.location}</span>
                    <span className="font-mono">{job.salaryRange}</span>
                    <span>Posted {job.postedDate}</span>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-mono">
                    {job.applicantsCount} Applicants
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab("kanban")}
                    className="h-7 text-xs"
                  >
                    View Pipeline →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Post Job Modal */}
      <Modal
        isOpen={isPostJobModalOpen}
        onClose={() => setIsPostJobModalOpen(false)}
        title="Post Requisition"
        description="Publish job opening"
        size="md"
      >
        <form onSubmit={handlePostJob} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Job Title *</label>
            <Input
              required
              placeholder="e.g. Senior Backend Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Department *</label>
              <Select
                value={jobDept}
                onChange={(e) => setJobDept(e.target.value)}
                options={[
                  { value: "Engineering", label: "Engineering" },
                  { value: "Design", label: "Design" },
                  { value: "Sales", label: "Sales" },
                  { value: "Product", label: "Product" },
                  { value: "Finance", label: "Finance" },
                  { value: "Human Resources", label: "Human Resources" },
                ]}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Salary Range</label>
              <Input
                placeholder="₹25L - ₹35L"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Location</label>
            <Input
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              placeholder="Bengaluru, India (Hybrid)"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsPostJobModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default" size="sm">
              Publish
            </Button>
          </div>
        </form>
      </Modal>

      {/* Candidate Details Modal */}
      <Modal
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        title="Candidate Record"
        description="ATS evaluation"
        size="sm"
      >
        {selectedCandidate && (
          <div className="space-y-3 text-xs font-sans">
            <div className="p-2.5 rounded border border-border bg-muted/20">
              <h3 className="font-semibold text-foreground">{selectedCandidate.name}</h3>
              <p className="text-muted-foreground">{selectedCandidate.role}</p>
            </div>

            <div className="space-y-1 p-2.5 rounded border border-border bg-card">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground">{selectedCandidate.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="text-foreground">{selectedCandidate.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Experience:</span>
                <span className="text-foreground">{selectedCandidate.experienceYears} Years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expected Salary:</span>
                <span className="font-mono text-foreground">{selectedCandidate.expectedSalary}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-border">
              <Button variant="outline" size="sm" onClick={() => setSelectedCandidate(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
