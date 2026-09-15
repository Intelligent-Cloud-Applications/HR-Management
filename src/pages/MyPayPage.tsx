import React, { useMemo, useState } from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card } from "@/components/ui/Card"
import { StatCard } from "@/components/ui/StatCard"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table"
import { useToast } from "@/lib/toast"
import { formatCurrency } from "@/lib/utils"
import { getMyPayslips, PayrollRecord } from "@/data/mockPayroll"
import { getSelfIdentity } from "@/lib/session"
import { CreditCard, Download, Wallet } from "lucide-react"

export const MyPayPage: React.FC = () => {
  const self = getSelfIdentity()
  const slips = useMemo(() => getMyPayslips(self.name), [self.name])
  const [selected, setSelected] = useState<PayrollRecord | null>(null)
  const { toast } = useToast()
  const latest = slips[0]

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title="My Pay"
        description="Your salary, deductions, and payslips."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "My Pay" },
        ]}
      />

      {latest && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            title={`${latest.month} net pay`}
            value={formatCurrency(latest.netSalary)}
            icon={<Wallet className="w-4 h-4" />}
            description={latest.status}
          />
          <StatCard
            title="Gross earnings"
            value={formatCurrency(latest.baseSalary + latest.hra + latest.specialAllowance + latest.bonus)}
            icon={<CreditCard className="w-4 h-4" />}
          />
          <StatCard
            title="PF"
            value={formatCurrency(latest.providentFund)}
            icon={<CreditCard className="w-4 h-4" />}
          />
          <StatCard
            title="TDS"
            value={formatCurrency(latest.taxDeduction)}
            icon={<CreditCard className="w-4 h-4" />}
          />
        </div>
      )}

      <Card className="p-3.5 space-y-3">
        <span className="text-xs font-semibold text-foreground">Payslips</span>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Net pay</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Disbursed</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slips.map((slip) => (
              <TableRow key={slip.id}>
                <TableCell className="font-medium text-foreground">{slip.month}</TableCell>
                <TableCell className="font-mono">{formatCurrency(slip.netSalary)}</TableCell>
                <TableCell>
                  <Badge variant={slip.status === "Processed" ? "success" : "warning"}>{slip.status}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground font-mono text-[11px]">
                  {slip.disbursedDate || "—"}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="h-7 px-2 text-xs" onClick={() => setSelected(slip)}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Payslip"
        description="Tekkzy Intelligent Cloud Applications Pvt. Ltd."
      >
        {selected && (
          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">{selected.employeeName}</span>
              <Badge variant="outline">{selected.month}</Badge>
            </div>
            <Row label="Basic" value={formatCurrency(selected.baseSalary)} />
            <Row label="HRA" value={formatCurrency(selected.hra)} />
            <Row label="Special allowance" value={formatCurrency(selected.specialAllowance)} />
            <Row label="Bonus" value={formatCurrency(selected.bonus)} />
            <Row label="PF" value={`- ${formatCurrency(selected.providentFund)}`} />
            <Row label="TDS" value={`- ${formatCurrency(selected.taxDeduction)}`} />
            <Row label="Net pay" value={formatCurrency(selected.netSalary)} />
            <div className="flex justify-end pt-2 border-t border-border">
              <Button
                size="sm"
                className="gap-1.5"
                onClick={() =>
                  toast({ title: "Payslip downloaded", description: `${selected.month} PDF ready.`, type: "success" })
                }
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between py-1 border-b border-border last:border-0">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-mono text-foreground">{value}</span>
  </div>
)
