import React, { useState } from "react"
import { PERFORMANCE_REVIEWS, OKR_GOALS, PerformanceReview, OKRGoal } from "@/data/mockPerformance"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { useToast } from "@/lib/toast"
import {
  PlusCircle,
  Star
} from "lucide-react"

export const PerformancePage: React.FC = () => {
  const [reviews, setReviews] = useState<PerformanceReview[]>(PERFORMANCE_REVIEWS)
  const [goals, setGoals] = useState<OKRGoal[]>(OKR_GOALS)
  const [isAddGoalModalOpen, setIsAddGoalModalOpen] = useState(false)
  const { toast } = useToast()

  const [goalTitle, setGoalTitle] = useState("")
  const [goalCategory, setGoalCategory] = useState<OKRGoal["category"]>("Engineering")
  const [goalTarget, setGoalTarget] = useState("Q4 2026")

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault()
    const newGoal: OKRGoal = {
      id: `okr-${Date.now()}`,
      title: goalTitle,
      category: goalCategory,
      owner: "Aarav Sharma",
      ownerAvatar: "",
      progress: 10,
      targetDate: goalTarget,
      status: "On Track",
    }

    setGoals([newGoal, ...goals])
    setIsAddGoalModalOpen(false)
    setGoalTitle("")

    toast({
      title: "Goal Created",
      description: `Objective recorded under ${goalCategory}.`,
      type: "success",
    })
  }

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title="Performance & OKRs"
        description="Strategic goals and H1 2026 employee appraisal reviews."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Performance" },
        ]}
        actions={
          <Button variant="default" size="sm" onClick={() => setIsAddGoalModalOpen(true)} className="gap-1.5">
            <PlusCircle className="w-3.5 h-3.5" />
            Set OKR Goal
          </Button>
        }
      />

      {/* OKR Objectives Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Organizational OKRs</span>
          <span className="text-[11px] font-mono text-muted-foreground">{goals.length} Active Targets</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {goals.map((goal) => (
            <Card key={goal.id} className="p-3.5 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">{goal.category}</span>
                  <Badge
                    variant={
                      goal.status === "Ahead"
                        ? "success"
                        : goal.status === "On Track"
                        ? "brand"
                        : "warning"
                    }
                  >
                    {goal.status}
                  </Badge>
                </div>

                <h4 className="font-medium text-xs text-foreground leading-snug">{goal.title}</h4>

                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-mono text-foreground font-medium">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-secondary h-1.5 rounded overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Owner: {goal.owner}</span>
                <span>Due {goal.targetDate}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Performance Appraisals & Reviews */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Employee Reviews (H1 2026 Cycle)</span>
          <span className="text-[11px] font-mono text-muted-foreground">{reviews.length} Completed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {reviews.map((rev) => (
            <Card key={rev.id} className="p-3.5 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-xs text-foreground">{rev.employeeName}</h4>
                    <p className="text-[11px] text-muted-foreground">{rev.role} • {rev.department}</p>
                  </div>
                  <Badge variant={rev.status === "Completed" ? "success" : "warning"}>
                    {rev.status}
                  </Badge>
                </div>

                <div className="p-2 rounded border border-border bg-muted/20 flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(rev.rating)
                            ? "fill-foreground text-foreground"
                            : "text-muted-foreground/40"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-xs font-semibold text-foreground">{rev.rating} / 5.0</span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed p-2 rounded bg-card border border-border">
                  "{rev.feedback}"
                </p>
              </div>

              <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Reviewer: {rev.reviewer}</span>
                <span>{rev.reviewCycle}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Goal Modal */}
      <Modal
        isOpen={isAddGoalModalOpen}
        onClose={() => setIsAddGoalModalOpen(false)}
        title="Set Objective"
        description="Define measurable organizational target"
        size="md"
      >
        <form onSubmit={handleAddGoal} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Objective Title *</label>
            <Input
              required
              placeholder="e.g. Reduce service latency below 50ms"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Category</label>
              <Select
                value={goalCategory}
                onChange={(e) => setGoalCategory(e.target.value as OKRGoal["category"])}
                options={[
                  { value: "Engineering", label: "Engineering" },
                  { value: "Company", label: "Company Wide" },
                  { value: "Sales", label: "Sales & Revenue" },
                  { value: "Operations", label: "Operations" },
                ]}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Target Quarter</label>
              <Input
                value={goalTarget}
                onChange={(e) => setGoalTarget(e.target.value)}
                placeholder="Q4 2026"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddGoalModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default" size="sm">
              Create Goal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
