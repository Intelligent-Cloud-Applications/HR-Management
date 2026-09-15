import React, { useState } from "react"
import { Link } from "react-router-dom"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { useToast } from "@/lib/toast"
import { INITIAL_EMPLOYEE_TASKS, EmployeeTask } from "@/data/mockTasks"
import { Check, Circle } from "lucide-react"

export const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<EmployeeTask[]>(INITIAL_EMPLOYEE_TASKS)
  const { toast } = useToast()
  const openCount = tasks.filter((task) => task.status !== "Done").length

  const markDone = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status: "Done" } : task)))
    toast({ title: "Task completed", type: "success" })
  }

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title="My tasks"
        description="Profile, attendance, and leave items assigned to you."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tasks" },
        ]}
        badge={
          <span className="font-mono text-xs text-muted-foreground">
            {openCount} open
          </span>
        }
      />

      <div className="space-y-2">
        {tasks.map((task) => (
          <Card key={task.id} className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground">{task.title}</h3>
                  <Badge
                    variant={
                      task.status === "Done"
                        ? "success"
                        : task.status === "In Progress"
                        ? "warning"
                        : "outline"
                    }
                  >
                    {task.status}
                  </Badge>
                  <Badge variant="secondary">{task.category}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{task.detail}</p>
                <p className="text-[11px] font-mono text-muted-foreground">Due {task.due}</p>
              </div>
              <div className="flex items-center gap-2">
                <Link to={task.href}>
                  <Button variant="outline" size="sm">Open</Button>
                </Link>
                {task.status !== "Done" && (
                  <Button size="sm" className="gap-1.5" onClick={() => markDone(task.id)}>
                    <Check className="w-3.5 h-3.5" /> Mark done
                  </Button>
                )}
                {task.status === "Done" && (
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Circle className="w-3 h-3 fill-current" /> Completed
                  </span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
