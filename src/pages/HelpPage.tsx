import React from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card } from "@/components/ui/Card"

const FAQS = [
  {
    q: "When is salary credited?",
    a: "TekkzyWork runs payroll on the last working day of the month. Net pay is credited to your salary account, usually within 1 working day.",
  },
  {
    q: "How do I change tax regime or update 80C proofs?",
    a: "Open Tax deductions while the IT declaration window is open. Upload supporting files from Documents.",
  },
  {
    q: "Who approves reimbursements?",
    a: "Your manager reviews the claim. Finance marks it Paid after approval and the next disbursement cycle.",
  },
  {
    q: "How do I correct attendance?",
    a: "Use Attendance to clock in/out. For a missed punch, raise a note with HR from this Help page.",
  },
]

export const HelpPage: React.FC = () => {
  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title="Help"
        description="Payroll, attendance, and reimbursement questions."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Help" },
        ]}
      />

      <Card className="p-4 space-y-2 text-xs">
        <p className="font-semibold text-foreground">Need a person?</p>
        <p className="text-muted-foreground">
          People ops: hr@tekkzy.com · Payroll: finance@tekkzy.com · Slack: #tekkzy-people
        </p>
      </Card>

      <div className="space-y-2">
        {FAQS.map((item) => (
          <Card key={item.q} className="p-4">
            <h3 className="text-sm font-semibold text-foreground">{item.q}</h3>
            <p className="text-xs text-muted-foreground mt-1.5">{item.a}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
