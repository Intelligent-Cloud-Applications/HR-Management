import React from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { useToast } from "@/lib/toast"
import { EMPLOYEE_DOCUMENTS } from "@/data/mockEmployeeSelfService"
import { Download, FileText } from "lucide-react"

export const EmployeeDocumentsPage: React.FC = () => {
  const { toast } = useToast()

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title="Documents"
        description="Payslips, Form 16, appointment letter, and identity copies."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Documents" },
        ]}
      />

      <div className="space-y-2">
        {EMPLOYEE_DOCUMENTS.map((doc) => (
          <Card key={doc.id} className="p-3.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded border border-border bg-muted/40 flex items-center justify-center text-muted-foreground shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                <p className="text-[11px] text-muted-foreground">Updated {doc.updatedOn}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant="secondary">{doc.category}</Badge>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => toast({ title: "Download started", description: doc.name, type: "success" })}
              >
                <Download className="w-3.5 h-3.5" /> Download
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
