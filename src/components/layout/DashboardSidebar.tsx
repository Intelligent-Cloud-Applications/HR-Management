import React from "react"
import { NavLink, Link, useLocation } from "react-router-dom"
import { Logo } from "@/components/brand/Logo"
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarDays,
  CreditCard,
  Briefcase,
  Award,
  Building2,
  BarChart3,
  FileCode2,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
  isMobileOpen: boolean
  setIsMobileOpen: (value: boolean) => void
}

export const DashboardSidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const location = useLocation()

  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, exact: true },
    { label: "Employees", href: "/dashboard/employees", icon: Users },
    { label: "Attendance", href: "/dashboard/attendance", icon: CalendarCheck },
    { label: "Leave Management", href: "/dashboard/leave", icon: CalendarDays, badge: "2" },
    { label: "Payroll", href: "/dashboard/payroll", icon: CreditCard },
    { label: "Recruitment", href: "/dashboard/recruitment", icon: Briefcase },
    { label: "Performance", href: "/dashboard/performance", icon: Award },
    { label: "Departments", href: "/dashboard/departments", icon: Building2 },
    { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
    { label: "Dev Log", href: "/dashboard/dev-log", icon: FileCode2 },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#111114] text-[#E4E4E7] border-r border-[#26262B] select-none font-sans">
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-3.5 border-b border-[#26262B]">
        <Link to="/" className="flex items-center gap-2 overflow-hidden py-1">
          <Logo size={isCollapsed ? "sm" : "md"} />
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex items-center justify-center p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-1">
        {!isCollapsed && (
          <div className="px-2.5 pb-1.5 pt-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
            Workspace
          </div>
        )}
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.exact
            ? location.pathname === item.href
            : location.pathname.startsWith(item.href)

          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-[13.5px] font-medium transition-colors relative group",
                isActive
                  ? "bg-white/[0.08] text-white font-semibold border-l-2 border-[#4338CA] pl-2.5"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  "w-[18px] h-[18px] shrink-0 transition-colors",
                  isActive ? "text-[#A5B4FC]" : "text-zinc-400 group-hover:text-white"
                )}
              />

              {!isCollapsed && (
                <div className="flex items-center justify-between w-full truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 shrink-0">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          )
        })}
      </div>

      {/* Bottom Profile Box */}
      <div className="p-2.5 border-t border-[#26262B] space-y-1.5">
        <Link
          to="/"
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-md text-xs text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors",
            isCollapsed && "justify-center"
          )}
          title="Back to Landing Page"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Public Home</span>}
        </Link>

        <div
          className={cn(
            "flex items-center gap-2.5 p-2 rounded-md bg-zinc-900/90 border border-zinc-800",
            isCollapsed && "justify-center p-1.5"
          )}
        >
          <div className="w-7 h-7 rounded bg-[#3730A3]/40 text-[#A5B4FC] flex items-center justify-center font-bold text-xs shrink-0 border border-[#4338CA]/40">
            AS
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate leading-tight">Aarav Sharma</p>
              <p className="text-[10px] text-zinc-400 truncate">Admin</p>
            </div>
          )}
          {!isCollapsed && (
            <Link to="/login" title="Logout" className="text-zinc-400 hover:text-rose-400 p-1 transition-colors">
              <LogOut className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed inset-y-0 left-0 z-30 transition-all duration-150 ease-in-out",
          isCollapsed ? "w-14" : "w-60"
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full z-10 shadow-xl border-r border-[#26262B]">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}
