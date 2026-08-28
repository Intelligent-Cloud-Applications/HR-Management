import React, { useState } from "react"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Select } from "@/components/ui/Select"
import { useToast } from "@/lib/toast"
import {
  Download,
  FileSpreadsheet,
  FileText
} from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

const attritionData = [
  { quarter: "Q1 2025", attritionRate: 4.2, industryAvg: 6.8 },
  { quarter: "Q2 2025", attritionRate: 3.8, industryAvg: 6.5 },
  { quarter: "Q3 2025", attritionRate: 3.1, industryAvg: 6.2 },
  { quarter: "Q4 2025", attritionRate: 2.9, industryAvg: 6.0 },
  { quarter: "Q1 2026", attritionRate: 2.5, industryAvg: 5.8 },
  { quarter: "Q2 2026", attritionRate: 2.1, industryAvg: 5.5 },
]

const salaryByDeptData = [
  { department: "Engineering", avgSalaryLakhs: 26.5 },
  { department: "Product", avgSalaryLakhs: 22.0 },
  { department: "Finance", avgSalaryLakhs: 24.5 },
  { department: "Design", avgSalaryLakhs: 20.0 },
  { department: "Sales", avgSalaryLakhs: 19.5 },
  { department: "HR", avgSalaryLakhs: 18.0 },
]

export const ReportsPage: React.FC = () => {
  const [reportPeriod, setReportPeriod] = useState("2026-YTD")
  const { toast } = useToast()

  const handleExport = (format: "CSV" | "PDF", reportName: string) => {
    toast({
      title: `${reportName} Exported`,
      description: `Generated in .${format.toLowerCase()} format.`,
      type: "success",
    })
  }

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title="Reports & Analytics"
        description="Workforce analytics, attrition rates, and statutory reports."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reports" },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Select
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              options={[
                { value: "2026-YTD", label: "2026 YTD" },
                { value: "Q2-2026", label: "Q2 2026" },
                { value: "Q1-2026", label: "Q1 2026" },
              ]}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport("PDF", "Executive HR Overview")}
              className="gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" /> PDF
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => handleExport("CSV", "Workforce Master Dataset")}
              className="gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> CSV
            </Button>
          </div>
        }
      />

      {/* Reports Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Attrition Rate Trend */}
        <Card className="p-4">
          <CardHeader className="p-0 pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle>Workforce Attrition Rate (%)</CardTitle>
              <CardDescription>TekkzyWork vs Tech Industry Average benchmark</CardDescription>
            </div>
            <Badge variant="success">2.1%</Badge>
          </CardHeader>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attritionData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" stroke="rgba(150, 150, 150, 0.15)" />
                <XAxis dataKey="quarter" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "0.25rem",
                    fontSize: "11px",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }} />
                <Line
                  type="monotone"
                  name="TekkzyWork"
                  dataKey="attritionRate"
                  stroke="#15803D"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  name="Industry Benchmark"
                  dataKey="industryAvg"
                  stroke="#888888"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Compensation Benchmark */}
        <Card className="p-4">
          <CardHeader className="p-0 pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle>Average Annual CTC by Department</CardTitle>
              <CardDescription>₹ In Lakhs (INR)</CardDescription>
            </div>
          </CardHeader>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryByDeptData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 2" stroke="rgba(150, 150, 150, 0.15)" />
                <XAxis dataKey="department" stroke="#888888" fontSize={11} tickLine={false} />
                <YAxis stroke="#888888" fontSize={11} tickLine={false} unit="L" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "0.25rem",
                    fontSize: "11px",
                  }}
                />
                <Bar dataKey="avgSalaryLakhs" name="Avg CTC (₹ Lakhs)" fill="#3730A3" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Pre-built export items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="p-3.5 flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-medium text-xs text-foreground">EPFO Remittance Challan</h4>
            <p className="text-[11px] text-muted-foreground">August 2026 ECR filing</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleExport("CSV", "EPFO Remittance")}
            className="h-7 text-xs"
          >
            Download
          </Button>
        </Card>

        <Card className="p-3.5 flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-medium text-xs text-foreground">TDS Form 16 Tax Summary</h4>
            <p className="text-[11px] text-muted-foreground">IT Deductions Ledger</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleExport("PDF", "TDS Form 16")}
            className="h-7 text-xs"
          >
            Download
          </Button>
        </Card>

        <Card className="p-3.5 flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="font-medium text-xs text-foreground">Monthly Attendance Matrix</h4>
            <p className="text-[11px] text-muted-foreground">Punch logs for 128 staff</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleExport("CSV", "Monthly Attendance Matrix")}
            className="h-7 text-xs"
          >
            Download
          </Button>
        </Card>
      </div>
    </div>
  )
}
