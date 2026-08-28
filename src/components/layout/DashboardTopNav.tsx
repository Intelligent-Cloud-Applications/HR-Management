import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Search, Bell, Menu, Check, User, Settings, LogOut, Building, Shield } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import { useToast } from "@/lib/toast"

interface TopNavProps {
  onOpenMobileMenu: () => void
}

interface Notification {
  id: string
  title: string
  time: string
  read: boolean
}

export const DashboardTopNav: React.FC<TopNavProps> = ({ onOpenMobileMenu }) => {
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: "1", title: "Devendra Patel applied for 3 days Sick Leave", time: "10m ago", read: false },
    { id: "2", title: "August 2026 Payroll calculated (₹1.87 Cr)", time: "1h ago", read: false },
    { id: "3", title: "Candidate Meera Krishnan accepted Offer", time: "3h ago", read: false },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    toast({
      title: "Notifications cleared",
      type: "info",
    })
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setSearchModalOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const searchablePages = [
    { title: "Dashboard Overview", path: "/dashboard", category: "Core" },
    { title: "Employee Directory", path: "/dashboard/employees", category: "Staff" },
    { title: "Attendance & Clock-In", path: "/dashboard/attendance", category: "Time" },
    { title: "Leave Approvals", path: "/dashboard/leave", category: "Requests" },
    { title: "Payroll & Payslips", path: "/dashboard/payroll", category: "Finance" },
    { title: "Recruitment Kanban", path: "/dashboard/recruitment", category: "Talent" },
    { title: "Performance Reviews & OKRs", path: "/dashboard/performance", category: "HR" },
    { title: "Departments", path: "/dashboard/departments", category: "Structure" },
    { title: "Analytics & Reports", path: "/dashboard/reports", category: "Reports" },
    { title: "Development Log", path: "/dashboard/dev-log", category: "Dev" },
    { title: "Settings", path: "/dashboard/settings", category: "Config" },
  ]

  const filteredPages = searchablePages.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectSearchItem = (path: string) => {
    setSearchModalOpen(false)
    setSearchQuery("")
    navigate(path)
  }

  return (
    <>
      <header className="sticky top-0 z-20 flex h-12 w-full items-center justify-between border-b border-border bg-card/95 px-4 backdrop-blur-xs">
        {/* Left: Mobile trigger & Search trigger */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenMobileMenu}
            className="md:hidden h-8 w-8"
            aria-label="Open sidebar"
          >
            <Menu className="w-4 h-4" />
          </Button>

          {/* Quick Search trigger */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="flex items-center gap-2 px-2.5 py-1 rounded border border-border bg-background text-muted-foreground hover:text-foreground text-xs w-44 sm:w-60 justify-between transition-colors"
          >
            <span className="flex items-center gap-1.5 truncate">
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Search TekkzyWork...</span>
            </span>
            <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono bg-muted px-1 rounded border border-border">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen)
                setProfileOpen(false)
              }}
              className="relative h-8 w-8"
              aria-label="Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
              {unreadCount > 0 && (
                <span className="absolute 1 top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-1.5 w-72 rounded-md border border-border bg-card shadow-lg z-50 p-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="font-semibold text-foreground">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="text-[11px] text-primary hover:underline flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" /> Mark all read
                    </button>
                  )}
                </div>

                <div className="mt-2 space-y-1.5 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2 rounded border text-xs ${
                        n.read
                          ? "bg-transparent border-border/50 text-muted-foreground"
                          : "bg-muted/40 border-border text-foreground font-medium"
                      }`}
                    >
                      <p className="leading-snug">{n.title}</p>
                      <span className="text-[10px] text-muted-foreground mt-0.5 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen)
                setNotificationsOpen(false)
              }}
              className="flex items-center gap-1.5 p-1 rounded hover:bg-muted transition-colors focus:outline-none"
            >
              <div className="w-6 h-6 rounded bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                AS
              </div>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-1.5 w-48 rounded-md border border-border bg-card shadow-lg z-50 p-1 text-xs">
                <div className="p-2 border-b border-border mb-1">
                  <p className="font-semibold text-foreground">Aarav Sharma</p>
                  <p className="text-muted-foreground text-[10px]">aarav.sharma@tekkzy.com</p>
                </div>

                <div className="space-y-0.5">
                  <Link
                    to="/dashboard/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted text-foreground"
                  >
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted text-foreground"
                  >
                    <Building className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Company Details</span>
                  </Link>
                </div>

                <div className="pt-1 mt-1 border-t border-border">
                  <Link
                    to="/login"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded text-destructive hover:bg-destructive/10 font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log out</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Quick Jump Search Modal */}
      <Modal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        title="Quick Navigator"
        description="Search pages or shortcuts (Cmd+K)"
        size="md"
      >
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              autoFocus
              placeholder="Type to filter pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-8 pr-3 rounded-md border border-input bg-card text-xs focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="space-y-0.5 max-h-56 overflow-y-auto">
            {filteredPages.length > 0 ? (
              filteredPages.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleSelectSearchItem(item.path)}
                  className="w-full flex items-center justify-between p-2 rounded hover:bg-muted text-left transition-colors"
                >
                  <span className="font-medium text-xs text-foreground">
                    {item.title}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border">
                    {item.category}
                  </span>
                </button>
              ))
            ) : (
              <p className="text-center py-4 text-xs text-muted-foreground">No matching pages.</p>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}
