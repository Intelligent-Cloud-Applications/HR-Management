import React, { useState } from "react"
import { DEV_LOG_COMPLETED, DEV_LOG_PLANNED, DevLogItem } from "@/data/mockDevLog"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Modal } from "@/components/ui/Modal"
import { useToast } from "@/lib/toast"
import {
  CheckCircle2,
  Clock,
  PlusCircle,
  Search
} from "lucide-react"

export const DevLogPage: React.FC = () => {
  const [completedItems, setCompletedItems] = useState<DevLogItem[]>(DEV_LOG_COMPLETED)
  const [plannedItems, setPlannedItems] = useState<DevLogItem[]>(DEV_LOG_PLANNED)
  const [activeTab, setActiveTab] = useState("completed")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { toast } = useToast()

  const [newItemTitle, setNewItemTitle] = useState("")
  const [newItemDesc, setNewItemDesc] = useState("")
  const [newItemCategory, setNewItemCategory] = useState<DevLogItem["category"]>("Core Architecture")
  const [newItemPriority, setNewItemPriority] = useState<DevLogItem["priority"]>("High")
  const [newItemStatus, setNewItemStatus] = useState<"completed" | "planned">("planned")
  const [newItemQuarter, setNewItemQuarter] = useState("Q4 2026")
  const [newItemTags, setNewItemTags] = useState("API, Feature")

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    const item: DevLogItem = {
      id: `dev-${Date.now()}`,
      title: newItemTitle,
      description: newItemDesc,
      category: newItemCategory,
      priority: newItemPriority,
      status: newItemStatus,
      targetQuarter: newItemQuarter,
      dateCompleted: newItemStatus === "completed" ? new Date().toISOString().split("T")[0] : undefined,
      author: "Tekkzy Dev Lead",
      tags: newItemTags.split(",").map((t) => t.trim()),
    }

    if (newItemStatus === "completed") {
      setCompletedItems([item, ...completedItems])
    } else {
      setPlannedItems([item, ...plannedItems])
    }

    setIsAddModalOpen(false)
    setNewItemTitle("")
    setNewItemDesc("")

    toast({
      title: "Changelog Entry Logged",
      description: `Task added to ${newItemStatus}.`,
      type: "success",
    })
  }

  const filterList = (items: DevLogItem[]) => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesCategory = categoryFilter === "All" || item.category === categoryFilter
      return matchesSearch && matchesCategory
    })
  }

  const filteredCompleted = filterList(completedItems)
  const filteredPlanned = filterList(plannedItems)

  return (
    <div className="space-y-4 font-sans">
      <PageHeader
        title="Development Log"
        description="Internal engineering changelog and roadmap checklist."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Dev Log" },
        ]}
        badge={
          <Badge variant="outline" className="font-mono text-[10px]">
            Internal Tracker
          </Badge>
        }
        actions={
          <Button variant="default" size="sm" onClick={() => setIsAddModalOpen(true)} className="gap-1.5">
            <PlusCircle className="w-3.5 h-3.5" />
            Log Entry
          </Button>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="flex-1 w-full">
          <Input
            placeholder="Search tasks, tags, or modules..."
            icon={<Search className="w-3.5 h-3.5" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="w-full sm:w-56">
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { value: "All", label: "All Categories" },
              { value: "Core Architecture", label: "Core Architecture" },
              { value: "UI & Theming", label: "UI & Theming" },
              { value: "Employee Management", label: "Employee Management" },
              { value: "Payroll & Tax", label: "Payroll & Tax" },
              { value: "ATS & Recruitment", label: "ATS & Recruitment" },
              { value: "Security & Auth", label: "Security & Auth" },
            ]}
          />
        </div>
      </div>

      {/* Tabs: Completed vs Next Up */}
      <Tabs defaultValue="completed" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="completed" className="gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Completed ({completedItems.length})</span>
            </TabsTrigger>
            <TabsTrigger value="planned" className="gap-1.5">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span>To Do / Next Up ({plannedItems.length})</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab 1: Completed Features */}
        <TabsContent value="completed" className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            {filteredCompleted.map((item) => (
              <Card
                key={item.id}
                className="p-3.5 flex flex-col sm:flex-row items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-semibold text-foreground">{item.title}</span>
                    {item.version && (
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {item.version}
                      </Badge>
                    )}
                    <Badge variant="secondary" className="text-[10px]">
                      {item.priority}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1 pt-1">
                    <span className="text-[10px] text-muted-foreground font-mono bg-muted/50 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                    {item.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-muted-foreground font-mono bg-muted/30 px-1 rounded"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right text-[11px] text-muted-foreground shrink-0 font-mono">
                  <span className="text-emerald-600 dark:text-emerald-400 block font-sans font-medium">Shipped</span>
                  <span>{item.dateCompleted}</span>
                </div>
              </Card>
            ))}

            {filteredCompleted.length === 0 && (
              <div className="p-8 text-center text-muted-foreground text-xs">
                No completed changelog items matched.
              </div>
            )}
          </div>
        </TabsContent>

        {/* Tab 2: Planned Features */}
        <TabsContent value="planned" className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            {filteredPlanned.map((item) => (
              <Card
                key={item.id}
                className="p-3.5 flex flex-col sm:flex-row items-start justify-between gap-3 text-xs border-dashed"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-semibold text-foreground">{item.title}</span>
                    <Badge variant="secondary" className="text-[10px]">
                      {item.priority}
                    </Badge>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      Target: {item.targetQuarter}
                    </span>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1 pt-1">
                    <span className="text-[10px] text-muted-foreground font-mono bg-muted/50 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                    {item.tags.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-muted-foreground font-mono bg-muted/30 px-1 rounded"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right text-[11px] text-muted-foreground shrink-0 font-mono">
                  <span className="text-primary block font-sans font-medium">Roadmap</span>
                  <span>{item.author}</span>
                </div>
              </Card>
            ))}

            {filteredPlanned.length === 0 && (
              <div className="p-8 text-center text-muted-foreground text-xs">
                No roadmap items matched.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Dev Log Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Log Task"
        description="Add to internal tracker"
        size="md"
      >
        <form onSubmit={handleAddItem} className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Title *</label>
            <Input
              required
              placeholder="e.g. Geofence polygon validation"
              value={newItemTitle}
              onChange={(e) => setNewItemTitle(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Description *</label>
            <Input
              required
              placeholder="Brief description..."
              value={newItemDesc}
              onChange={(e) => setNewItemDesc(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Category</label>
              <Select
                value={newItemCategory}
                onChange={(e) => setNewItemCategory(e.target.value as DevLogItem["category"])}
                options={[
                  { value: "Core Architecture", label: "Core Architecture" },
                  { value: "UI & Theming", label: "UI & Theming" },
                  { value: "Employee Management", label: "Employee Management" },
                  { value: "Payroll & Tax", label: "Payroll & Tax" },
                  { value: "ATS & Recruitment", label: "ATS & Recruitment" },
                  { value: "Security & Auth", label: "Security & Auth" },
                ]}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Status</label>
              <Select
                value={newItemStatus}
                onChange={(e) => setNewItemStatus(e.target.value as "completed" | "planned")}
                options={[
                  { value: "completed", label: "Completed" },
                  { value: "planned", label: "Roadmap" },
                ]}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default" size="sm">
              Save Entry
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
