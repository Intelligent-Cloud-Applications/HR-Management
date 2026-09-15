import React, { useState } from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
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
import { INITIAL_REIMBURSEMENTS, ReimbursementClaim } from "@/data/mockEmployeeSelfService"
import { PlusCircle } from "lucide-react"

export const ReimbursementsPage: React.FC = () => {
  const [claims, setClaims] = useState<ReimbursementClaim[]>(INITIAL_REIMBURSEMENTS)
  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState<ReimbursementClaim["category"]>("Travel")
  const [amount, setAmount] = useState("1200")
  const [note, setNote] = useState("")
  const { toast } = useToast()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const claim: ReimbursementClaim = {
      id: `rb-${Date.now()}`,
      category,
      amount: Number(amount) || 0,
      submittedOn: new Date().toISOString().slice(0, 10),
      status: "Submitted",
      note: note || "Expense claim",
    }
    setClaims([claim, ...claims])
    setOpen(false)
    setNote("")
    toast({ title: "Claim submitted", description: "Finance will review this reimbursement.", type: "success" })
  }

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title="Reimbursements"
        description="Submit and track expense claims."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reimbursements" },
        ]}
        actions={
          <Button size="sm" className="gap-1.5" onClick={() => setOpen(true)}>
            <PlusCircle className="w-3.5 h-3.5" /> New claim
          </Button>
        }
      />

      <Card className="p-3.5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Note</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell className="font-medium text-foreground">{claim.category}</TableCell>
                <TableCell className="text-muted-foreground text-xs">{claim.note}</TableCell>
                <TableCell className="font-mono">{formatCurrency(claim.amount)}</TableCell>
                <TableCell className="font-mono text-[11px] text-muted-foreground">{claim.submittedOn}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      claim.status === "Paid" || claim.status === "Approved"
                        ? "success"
                        : claim.status === "Rejected"
                        ? "destructive"
                        : "warning"
                    }
                  >
                    {claim.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="New reimbursement" description="Attach a note. Proof can be uploaded later.">
        <form onSubmit={submit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Category</label>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value as ReimbursementClaim["category"])}
              options={[
                { value: "Travel", label: "Travel" },
                { value: "Internet", label: "Internet" },
                { value: "Meals", label: "Meals" },
                { value: "Medical", label: "Medical" },
                { value: "Other", label: "Other" },
              ]}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Amount (₹)</label>
            <Input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Note</label>
            <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="What was this expense for?" />
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button type="button" variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              Submit claim
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
