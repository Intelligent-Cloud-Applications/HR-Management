import React, { useState, useEffect } from "react"
import { ATTENDANCE_STATS, RECENT_ATTENDANCE_LOGS, getMyAttendanceLogs } from "@/data/mockAttendance"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card } from "@/components/ui/Card"
import { StatCard } from "@/components/ui/StatCard"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Badge } from "@/components/ui/Badge"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table"
import { useToast } from "@/lib/toast"
import { getRole, getSelfIdentity } from "@/lib/session"
import { isEmployeeRole } from "@/lib/roles"
import {
  Clock,
  CalendarCheck,
  UserCheck,
  AlertTriangle,
  Home,
  Download,
  Search,
  Play,
  Square
} from "lucide-react"

export const AttendancePage: React.FC = () => {
  const role = getRole()
  const self = getSelfIdentity()
  const isSelf = isEmployeeRole(role)
  const logs = isSelf ? getMyAttendanceLogs(self.name, self.department) : RECENT_ATTENDANCE_LOGS
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isClockedIn, setIsClockedIn] = useState(true)
  const [clockInTime, setClockInTime] = useState("09:02 AM")
  const [workSeconds, setWorkSeconds] = useState(29450)

  const { toast } = useToast()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      if (isClockedIn) {
        setWorkSeconds((prev) => prev + 1)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [isClockedIn])

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, "0")}h ${mins.toString().padStart(2, "0")}m ${secs.toString().padStart(2, "0")}s`
  }

  const handleToggleClock = () => {
    if (isClockedIn) {
      setIsClockedIn(false)
      toast({
        title: "Clocked Out",
        description: `Punch recorded at ${currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Total: ${formatTimer(workSeconds)}.`,
        type: "info",
      })
    } else {
      setIsClockedIn(true)
      const nowStr = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      setClockInTime(nowStr)
      setWorkSeconds(0)
      toast({
        title: "Clocked In",
        description: `Punch registered at ${nowStr}. Geofence: Bengaluru HQ.`,
        type: "success",
      })
    }
  }

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "All" || log.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleExportCSV = () => {
    toast({
      title: "Attendance Log Exported",
      description: "attendance_aug_2026.csv ready.",
      type: "success",
    })
  }

  const presentDays = logs.filter((log) => log.status === "Present" || log.status === "WFH").length
  const lateDays = logs.filter((log) => log.status === "Late").length
  const wfhDays = logs.filter((log) => log.status === "WFH").length

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title={isSelf ? "My attendance" : "Attendance"}
        description={
          isSelf
            ? "Your punches, hours, and shift history."
            : "Shift tracking, geofence punch logs, and time records."
        }
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: isSelf ? "My attendance" : "Attendance" },
        ]}
        actions={
          <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-1.5">
            <Download className="w-3.5 h-3.5" />
            {isSelf ? "Export my log" : "Export Log"}
          </Button>
        }
      />

      {/* Clock-In Widget Strip */}
      <Card className="p-3.5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border border-border bg-muted/40 flex items-center justify-center text-primary">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-mono font-semibold text-foreground">
                {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </div>
              <span className="text-[11px] text-muted-foreground">
                {currentTime.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })} • Geofence: Bengaluru HQ
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-muted-foreground uppercase font-medium block">Current Shift</span>
              <span className="text-xs font-mono font-semibold text-primary">{formatTimer(workSeconds)}</span>
            </div>

            <Button
              variant={isClockedIn ? "destructive" : "default"}
              size="sm"
              onClick={handleToggleClock}
              className="gap-1.5"
            >
              {isClockedIn ? (
                <>
                  <Square className="w-3.5 h-3.5" /> Clock Out
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" /> Clock In
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {isSelf ? (
          <>
            <StatCard
              title="Days present"
              value={String(presentDays)}
              icon={<CalendarCheck className="w-4 h-4" />}
              description="In your recent log"
            />
            <StatCard
              title="Late arrivals"
              value={String(lateDays)}
              icon={<AlertTriangle className="w-4 h-4" />}
              description="Grace may still apply"
            />
            <StatCard
              title="WFH days"
              value={String(wfhDays)}
              icon={<Home className="w-4 h-4" />}
              description="On your record"
            />
            <StatCard
              title="Latest hours"
              value={logs[0]?.workHours || "—"}
              icon={<UserCheck className="w-4 h-4" />}
              description={logs[0]?.date || "No punches yet"}
            />
          </>
        ) : (
          <>
            <StatCard
              title="Attendance Rate"
              value={ATTENDANCE_STATS.presentRate}
              icon={<CalendarCheck className="w-4 h-4" />}
              trend={{ value: "+2.1%", isPositive: true, label: "this week" }}
            />

            <StatCard
              title="Present Today"
              value={ATTENDANCE_STATS.presentCount}
              icon={<UserCheck className="w-4 h-4" />}
              description={`${ATTENDANCE_STATS.onTimeCount} on time`}
            />

            <StatCard
              title="Late Arrivals"
              value={ATTENDANCE_STATS.lateArrivals}
              icon={<AlertTriangle className="w-4 h-4" />}
              description="Grace applied"
            />

            <StatCard
              title="Remote (WFH)"
              value={ATTENDANCE_STATS.wfhCount}
              icon={<Home className="w-4 h-4" />}
              description="Approved"
            />
          </>
        )}
      </div>

      {/* Daily Attendance Logs */}
      <Card className="p-3.5 space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          {!isSelf && (
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search staff or department..."
              icon={<Search className="w-3.5 h-3.5" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          )}
          {isSelf && (
            <span className="text-xs font-semibold text-foreground w-full">My punch history</span>
          )}

          <div className="w-full sm:w-36">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "All", label: "All Statuses" },
                { value: "Present", label: "Present" },
                { value: "Late", label: "Late" },
                { value: "WFH", label: "WFH" },
                { value: "Absent", label: "Absent" },
              ]}
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              {!isSelf && <TableHead>Employee</TableHead>}
              {!isSelf && <TableHead>Department</TableHead>}
              <TableHead>Date</TableHead>
              <TableHead>Check-In</TableHead>
              <TableHead>Check-Out</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                {!isSelf && (
                  <TableCell className="font-medium text-foreground">
                    {log.employeeName}
                  </TableCell>
                )}
                {!isSelf && (
                  <TableCell className="text-muted-foreground">{log.department}</TableCell>
                )}
                <TableCell className="text-muted-foreground font-mono text-[11px]">{log.date}</TableCell>
                <TableCell className="font-mono text-foreground">{log.checkIn}</TableCell>
                <TableCell className="font-mono text-muted-foreground">{log.checkOut}</TableCell>
                <TableCell className="font-mono text-foreground">{log.workHours}</TableCell>

                <TableCell>
                  <Badge
                    variant={
                      log.status === "Present"
                        ? "success"
                        : log.status === "Late"
                        ? "warning"
                        : log.status === "WFH"
                        ? "brand"
                        : "destructive"
                    }
                  >
                    {log.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
