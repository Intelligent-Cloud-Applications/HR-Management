import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import { DashboardSidebar } from "./DashboardSidebar"
import { DashboardTopNav } from "./DashboardTopNav"
import { cn } from "@/lib/utils"

export const DashboardLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Persistent Sidebar */}
      <DashboardSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-150 ease-in-out",
          isCollapsed ? "md:pl-14" : "md:pl-64"
        )}
      >
        {/* Top Navbar */}
        <DashboardTopNav onOpenMobileMenu={() => setIsMobileOpen(true)} />

        {/* Page Container */}
        <main className="flex-1 p-4 sm:p-6 w-full">
          <Outlet />
        </main>

        {/* Footnote */}
        <footer className="border-t border-border py-2.5 px-4 text-center text-[11px] text-muted-foreground">
          <span>TekkzyWork • Tekkzy Intelligent Cloud Applications Pvt. Ltd.</span>
        </footer>
      </div>
    </div>
  )
}
