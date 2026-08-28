import React, { useState } from "react"
import { INITIAL_LEAVE_BALANCES, INITIAL_LEAVE_REQUESTS, LeaveRequest, LeaveBalance } from "@/data/mockLeaves"
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
import {
  PlusCircle,
  Check,
  X
} from "lucide-react"

export const LeavePage: React.FC = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>(INITIAL_LEAVE_REQUESTS)
  const [balances, setBalances] = useState<LeaveBalance[]>(INITIAL_LEAVE_BALANCES)
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false)
  const { toast } = useToast()

  const [leaveType, setLeaveType] = useState<LeaveRequest["leaveType"]>("Sick Leave")
  const [startDate, setStartDate] = useState("2026-09-01")
  const [endDate, setEndDate] = useState("2026-09-02")
  const [reason, setReason] = useState("")

  const handleApprove = (id: string, name: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Approved" } : req))
    )
    toast({
      title: "Leave Approved",
      description: `${name}'s request approved.`,
      type: "success",
    })
  }

  const handleReject = (id: string, name: string) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Rejected" } : req))
    )
    toast({
      title: "Leave Rejected",
      description: `${name}'s request rejected.`,
      type: "error",
    })
  }

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault()
    const newReq: LeaveRequest = {
      id: `lv-${Date.now()}`,
      employeeId: "emp-1",
      employeeName: "Aarav Sharma",
      avatar: "",
      department: "Engineering",
      leaveType,
      startDate,
      endDate,
      days: 2,
      reason: reason || "Personal obligations.",
      status: "Pending",
      appliedOn: new Date().toISOString().split("T")[0],
    }

    setRequests([newReq, ...requests])
    setIsApplyModalOpen(false)
    setReason("")

    setBalances((prev) =>
      prev.map((b) =>
        b.type.includes(leaveType.split(" ")[0])
          ? { ...b, used: b.used + 2, remaining: Math.max(0, b.remaining - 2) }
          : b
      )
    )

    toast({
      title: "Leave Applied",
      description: `${leaveType} application submitted.`,
      type: "success",
    })
  }

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title="Leave Management"
        description="Leave quotas, approval workflow, and absence tracking."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Leave" },
        ]}
        actions={
          <Button variant="default" size="sm" onClick={() => setIsApplyModalOpen(true)} className="gap-1.5">
            <PlusCircle className="w-3.5 h-3.5" />
            Apply Leave
          </Button>
        }
      />

      {/* Leave Balances Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {balances.map((b, i) => (
          <Card key={i} className="p-3.5">
            <div className="flex items-center justify-between text-xs text-muted-foreground pb-1">
              <span className="font-medium text-foreground">{b.type}</span>
              <span className="font-mono text-[11px]">{b.used} used / {b.allocated}</span>
            </div>
            <div className="text-xl font-mono font-semibold text-foreground my-1.5">
              {b.remaining} <span className="text-xs font-normal text-muted-foreground">days left</span>
            </div>
            <div className="w-full bg-secondary h-1.5 rounded overflow-hidden">
              <div
                className="bg-primary h-full transition-all"
                style={{ width: `${(b.used / b.allocated) * 100}%` }}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Requests Table */}
      <Card className="p-3.5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">Leave Requests</span>
          <span className="text-[11px] font-mono text-muted-foreground">
            {requests.filter((r) => r.status === "Pending").length} Pending
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>
                  <span className="font-medium text-foreground block">{req.employeeName}</span>
                  <span className="text-[11px] text-muted-foreground">{req.department} • Applied {req.appliedOn}</span>
                </TableCell>

                <TableCell className="text-muted-foreground text-xs">{req.leaveType}</TableCell>

                <TableCell className="text-xs">
                  <span className="font-medium text-foreground">{req.days}d</span>
                  <span className="text-muted-foreground text-[11px] block">{req.startDate} to {req.endDate}</span>
                </TableCell>

                <TableCell className="text-xs text-muted-foreground max-w-xs truncate" title={req.reason}>
                  {req.reason}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      req.status === "Approved"
                        ? "success"
                        : req.status === "Rejected"
                        ? "destructive"
                        : "warning"
                    }
                  >
                    {req.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  {req.status === "Pending" ? (
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleApprove(req.id, req.employeeName)}
                        className="h-7 px-2 text-xs"
                      >
                        <Check className="w-3 h-3 mr-1" /> Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(req.id, req.employeeName)}
                        className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10"
                      >
                        <X className="w-3 h-3 mr-1" /> Reject
                      </Button>
                    </div>
                  ) : (
                    <span className="text-[11px] text-muted-foreground font-mono">Completed</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Apply Leave Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title="Apply Leave"
        description="Submit leave request"
        size="md"
      >
        <form onSubmit={handleApplyLeave} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Leave Type *</label>
            <Select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value as LeaveRequest["leaveType"])}
              options={[
                { value: "Sick Leave", label: "Sick Leave (8 left)" },
                { value: "Casual Leave", label: "Casual Leave (8 left)" },
                { value: "Earned Leave", label: "Earned Leave (11 left)" },
                { value: "Maternity/Paternity", label: "Parental Leave" },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Start Date *</label>
              <Input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">End Date *</label>
              <Input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Reason *</label>
            <Input
              required
              placeholder="Brief reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsApplyModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default" size="sm">
              Submit Application
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
