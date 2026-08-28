import React, { useState } from "react"
import { INITIAL_DEPARTMENTS, Department } from "@/data/mockDepartments"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import { formatCurrency } from "@/lib/utils"

export const DepartmentsPage: React.FC = () => {
  const [departments] = useState<Department[]>(INITIAL_DEPARTMENTS)
  const [selectedDept, setSelectedDept] = useState<Department | null>(null)

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title="Departments"
        description="Organizational units, head leadership, headcount, and budget allocations."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Departments" },
        ]}
        badge={
          <span className="font-mono text-xs text-muted-foreground">
            ({departments.length} units)
          </span>
        }
      />

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {departments.map((dept) => (
          <Card
            key={dept.id}
            className="p-4 flex flex-col justify-between hover:border-foreground/30 transition-colors cursor-pointer"
            onClick={() => setSelectedDept(dept)}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-foreground">{dept.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{dept.description}</p>
                </div>
                <Badge variant="outline" className="font-mono text-[10px]">{dept.code}</Badge>
              </div>

              <div className="p-2.5 rounded border border-border bg-muted/20 text-xs">
                <span className="text-[10px] uppercase text-muted-foreground block font-medium">Head</span>
                <span className="font-medium text-foreground block">{dept.head}</span>
                <span className="text-[11px] text-muted-foreground">{dept.headRole}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2 rounded border border-border bg-card">
                  <span className="text-muted-foreground text-[10px] uppercase block">Staff</span>
                  <span className="font-mono font-medium text-foreground">{dept.employeeCount} Members</span>
                </div>
                <div className="p-2 rounded border border-border bg-card">
                  <span className="text-muted-foreground text-[10px] uppercase block">Annual Budget</span>
                  <span className="font-mono font-medium text-foreground">{formatCurrency(dept.annualBudget)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2 border-t border-border flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">{dept.activeProjects} Active Projects</span>
              <span className="text-primary font-medium">View details →</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Department Detail Modal */}
      <Modal
        isOpen={!!selectedDept}
        onClose={() => setSelectedDept(null)}
        title={selectedDept ? `${selectedDept.name} (${selectedDept.code})` : "Department Details"}
        description="Organizational breakdown"
        size="md"
      >
        {selectedDept && (
          <div className="space-y-3 text-xs font-sans">
            <div className="p-2.5 rounded border border-border bg-muted/20">
              <span className="text-muted-foreground block text-[11px]">Led by:</span>
              <span className="font-semibold text-foreground text-sm">{selectedDept.head}</span>
              <p className="text-muted-foreground">{selectedDept.headRole}</p>
            </div>

            <div className="p-2.5 rounded border border-border bg-card">
              <span className="text-muted-foreground block text-[11px] mb-1">Mandate:</span>
              <p className="text-foreground leading-relaxed">{selectedDept.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded border border-border bg-card">
                <span className="text-muted-foreground block text-[10px]">Headcount</span>
                <span className="font-mono font-semibold text-foreground">{selectedDept.employeeCount}</span>
              </div>
              <div className="p-2 rounded border border-border bg-card">
                <span className="text-muted-foreground block text-[10px]">Open Roles</span>
                <span className="font-mono font-semibold text-foreground">{selectedDept.openRoles}</span>
              </div>
              <div className="p-2 rounded border border-border bg-card">
                <span className="text-muted-foreground block text-[10px]">Projects</span>
                <span className="font-mono font-semibold text-foreground">{selectedDept.activeProjects}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-border">
              <Button variant="outline" size="sm" onClick={() => setSelectedDept(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
