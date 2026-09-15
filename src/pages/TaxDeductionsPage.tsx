import React from "react"
import { Link } from "react-router-dom"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { StatCard } from "@/components/ui/StatCard"
import { useToast } from "@/lib/toast"
import { formatCurrency } from "@/lib/utils"
import { TAX_INVESTMENTS } from "@/data/mockEmployeeSelfService"
import { Percent } from "lucide-react"

export const TaxDeductionsPage: React.FC = () => {
  const { toast } = useToast()
  const declared = TAX_INVESTMENTS.reduce((sum, row) => sum + row.declared, 0)

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title="Tax deductions"
        description="IT declaration window, investment proofs, and TDS."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Tax deductions" },
        ]}
        actions={
          <Button
            size="sm"
            onClick={() =>
              toast({
                title: "Declaration submitted",
                description: "Your IT declaration is recorded for FY 2026-27.",
                type: "success",
              })
            }
          >
            Declare now
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard
          title="Declared this year"
          value={formatCurrency(declared)}
          icon={<Percent className="w-4 h-4" />}
          description="FY 2026-27"
        />
        <StatCard title="Regime" value="Old" description="Changeable until 15 Oct" />
        <StatCard title="Window" value="Open" description="IT declaration is open" />
      </div>

      <Card className="p-4 space-y-3">
        <p className="text-xs text-muted-foreground">
          IT declaration window is open now.{" "}
          <button
            className="text-primary hover:underline"
            onClick={() => toast({ title: "Declaration form opened", type: "info" })}
          >
            Declare now
          </button>
          . Proofs for HRA are still pending.
        </p>
        <div className="space-y-2">
          {TAX_INVESTMENTS.map((row) => (
            <div key={row.section} className="flex items-center justify-between gap-3 p-2.5 rounded border border-border">
              <div>
                <p className="text-xs font-medium text-foreground">{row.section}</p>
                <p className="text-[11px] text-muted-foreground">
                  {formatCurrency(row.declared)}
                  {row.limit > 0 ? ` / ${formatCurrency(row.limit)}` : ""}
                </p>
              </div>
              <Badge
                variant={
                  row.proof === "Verified" ? "success" : row.proof === "Submitted" ? "warning" : "outline"
                }
              >
                {row.proof}
              </Badge>
            </div>
          ))}
        </div>
        <Link to="/dashboard/documents" className="text-xs text-primary hover:underline">
          Upload proofs in Documents →
        </Link>
      </Card>
    </div>
  )
}
