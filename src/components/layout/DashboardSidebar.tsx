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
    <div className="flex flex-col h-full bg-[#08080E] text-[#E2E8F0] border-r border-[#1E1E2E] select-none font-sans">
      {/* Brand Header */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-[#1E1E2E]">
        <Link to="/" className="flex items-center gap-2 overflow-hidden">
          <Logo size={isCollapsed ? "sm" : "md"} />
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex items-center justify-center p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation list */}
      <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-1">
        {!isCollapsed && (
          <div className="px-3 pb-1.5 pt-1 text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
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
                "flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-all relative group",
                isActive
                  ? "bg-[#38BDF8]/10 text-white font-semibold border-l-2 border-[#38BDF8] pl-2.5 shadow-[0_0_12px_rgba(56,189,248,0.15)]"
                  : "text-[#94A3B8] hover:text-white hover:bg-white/[0.05]"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  "w-[18px] h-[18px] shrink-0 transition-colors",
                  isActive ? "text-[#38BDF8]" : "text-[#94A3B8] group-hover:text-white"
                )}
              />

              {!isCollapsed && (
                <div className="flex items-center justify-between w-full truncate">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 shrink-0">
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
      <div className="p-3 border-t border-[#1E1E2E] space-y-2">
        <Link
          to="/"
          className={cn(
            "flex items-center gap-2.5 px-3 py-1.5 rounded-full text-xs text-[#94A3B8] hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-[#1E1E2E] transition-all",
            isCollapsed && "justify-center"
          )}
          title="Back to Landing Page"
        >
          <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#38BDF8]" />
          {!isCollapsed && <span>Public Origin Home</span>}
        </Link>

        <div
          className={cn(
            "flex items-center gap-2.5 p-2 rounded-xl bg-[#0E0E18] border border-[#1E1E2E]",
            isCollapsed && "justify-center p-1.5"
          )}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-[0_0_10px_rgba(56,189,248,0.4)]">
            AS
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate leading-tight">Aarav Sharma</p>
              <p className="text-[10px] text-[#94A3B8] truncate">Admin • Tekkzy</p>
            </div>
          )}
          {!isCollapsed && (
            <Link to="/login" title="Logout" className="text-[#94A3B8] hover:text-rose-400 p-1 transition-colors">
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
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full z-10 shadow-2xl border-r border-[#1E1E2E]">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}
