import React, { useState } from "react"
import { PAYROLL_SUMMARY, INITIAL_PAYROLL_RECORDS, PayrollRecord } from "@/data/mockPayroll"
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
import {
  CreditCard,
  Building2,
  Printer,
  FileText,
  Play
} from "lucide-react"

export const PayrollPage: React.FC = () => {
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>(INITIAL_PAYROLL_RECORDS)
  const [selectedSlip, setSelectedSlip] = useState<PayrollRecord | null>(null)
  const [isRunningBatch, setIsRunningBatch] = useState(false)
  const { toast } = useToast()

  const handleRunPayrollBatch = () => {
    setIsRunningBatch(true)

    setTimeout(() => {
      setPayrollRecords((prev) =>
        prev.map((rec) => ({
          ...rec,
          status: "Processed",
          disbursedDate: new Date().toISOString().split("T")[0],
        }))
      )
      setIsRunningBatch(false)

      toast({
        title: "Payroll Disbursed",
        description: "August 2026 payroll batch processed successfully.",
        type: "success",
      })
    }, 600)
  }

  const handlePrintSlip = () => {
    window.print()
    toast({
      title: "Print Spooler Ready",
      description: `Payslip for ${selectedSlip?.employeeName} queued.`,
      type: "info",
    })
  }

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title="Payroll & Compensation"
        description="Salary processing, statutory tax withholdings (TDS, PF), and payslips."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Payroll" },
        ]}
        actions={
          <Button
            variant="default"
            size="sm"
            onClick={handleRunPayrollBatch}
            isLoading={isRunningBatch}
            className="gap-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            Run August Batch
          </Button>
        }
      />

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          title="Total Monthly Payroll"
          value={formatCurrency(PAYROLL_SUMMARY.totalMonthlyPayroll)}
          icon={<CreditCard className="w-4 h-4" />}
          description="Cycle: August 2026"
        />

        <StatCard
          title="Tax Withheld (TDS)"
          value={formatCurrency(PAYROLL_SUMMARY.taxWithheld)}
          description="IT Dept compliant"
        />

        <StatCard
          title="PF & ESI Contributions"
          value={formatCurrency(PAYROLL_SUMMARY.pfContributions)}
          description="EPFO challan ready"
        />

        <StatCard
          title="Pending Disbursals"
          value={
            payrollRecords.filter((r) => r.status === "Pending").length === 0
              ? "0"
              : `${payrollRecords.filter((r) => r.status === "Pending").length}`
          }
          description="Awaiting release"
        />
      </div>

      {/* Payroll Table */}
      <Card className="p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Compensation Ledger (August 2026)</span>
          <span className="text-[11px] font-mono text-muted-foreground">{payrollRecords.length} Records</span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Base</TableHead>
              <TableHead>Allowances</TableHead>
              <TableHead>Deductions (TDS+PF)</TableHead>
              <TableHead>Net Pay</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Payslip</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payrollRecords.map((rec) => {
              const totalAllowances = rec.hra + rec.specialAllowance + rec.bonus
              const totalDeductions = rec.providentFund + rec.taxDeduction

              return (
                <TableRow key={rec.id}>
                  <TableCell>
                    <span className="font-medium text-foreground block">{rec.employeeName}</span>
                    <span className="text-[11px] text-muted-foreground">{rec.role} • {rec.department}</span>
                  </TableCell>

                  <TableCell className="font-mono text-xs">{formatCurrency(rec.baseSalary)}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">+{formatCurrency(totalAllowances)}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">-{formatCurrency(totalDeductions)}</TableCell>
                  <TableCell className="font-mono text-xs font-semibold text-foreground">
                    {formatCurrency(rec.netSalary)}
                  </TableCell>

                  <TableCell>
                    <Badge variant={rec.status === "Processed" ? "success" : "warning"}>
                      {rec.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedSlip(rec)}
                      className="h-7 px-2 text-xs gap-1"
                    >
                      <FileText className="w-3 h-3" />
                      Slip
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Payslip Modal View */}
      <Modal
        isOpen={!!selectedSlip}
        onClose={() => setSelectedSlip(null)}
        title="Payslip Details"
        description="Tekkzy Intelligent Cloud Applications Pvt. Ltd."
        size="md"
      >
        {selectedSlip && (
          <div className="space-y-4 text-xs font-sans">
            {/* Slip Header */}
            <div className="flex items-start justify-between pb-3 border-b border-border">
              <div>
                <h3 className="font-semibold text-foreground">TekkzyWork PaySlip</h3>
                <p className="text-muted-foreground text-[11px]">Tekkzy Intelligent Cloud Applications Pvt. Ltd.</p>
                <p className="text-[10px] text-muted-foreground">Bengaluru, Karnataka 560103</p>
              </div>
              <div className="text-right">
                <Badge variant="outline">{selectedSlip.month}</Badge>
                <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">PAY-{selectedSlip.id.toUpperCase()}</p>
              </div>
            </div>

            {/* Employee Summary */}
            <div className="grid grid-cols-2 gap-2 p-2.5 rounded border border-border bg-muted/20">
              <div>
                <span className="text-muted-foreground text-[11px] block">Employee:</span>
                <span className="font-medium text-foreground">{selectedSlip.employeeName}</span>
              </div>
              <div>
                <span className="text-muted-foreground text-[11px] block">Role / Dept:</span>
                <span className="text-foreground">{selectedSlip.role} ({selectedSlip.department})</span>
              </div>
            </div>

            {/* Earnings & Deductions Breakdown */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded border border-border bg-card space-y-1.5">
                <span className="font-medium uppercase text-[10px] text-muted-foreground block">Gross Earnings</span>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Basic Pay:</span>
                  <span className="font-mono">{formatCurrency(selectedSlip.baseSalary)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">HRA:</span>
                  <span className="font-mono">{formatCurrency(selectedSlip.hra)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Special Allowance:</span>
                  <span className="font-mono">{formatCurrency(selectedSlip.specialAllowance)}</span>
                </div>
              </div>

              <div className="p-2.5 rounded border border-border bg-card space-y-1.5">
                <span className="font-medium uppercase text-[10px] text-muted-foreground block">Deductions</span>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provident Fund:</span>
                  <span className="font-mono">{formatCurrency(selectedSlip.providentFund)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TDS Tax:</span>
                  <span className="font-mono">{formatCurrency(selectedSlip.taxDeduction)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prof Tax (PT):</span>
                  <span className="font-mono">{formatCurrency(200)}</span>
                </div>
              </div>
            </div>

            {/* Net Total */}
            <div className="p-3 rounded border border-border bg-muted/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-medium">Net Take-Home Pay</span>
                <div className="text-lg font-mono font-semibold text-foreground">{formatCurrency(selectedSlip.netSalary)}</div>
              </div>
              <span className="text-muted-foreground text-[11px]">Mode: {selectedSlip.paymentMethod}</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button variant="outline" size="sm" onClick={() => setSelectedSlip(null)}>
                Close
              </Button>
              <Button variant="default" size="sm" onClick={handlePrintSlip} className="gap-1">
                <Printer className="w-3.5 h-3.5" /> Print / Save
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
