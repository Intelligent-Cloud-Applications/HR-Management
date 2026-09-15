import React from "react"
import { Navigate } from "react-router-dom"
import { canAccess } from "@/lib/roles"
import { getRole, getSession } from "@/lib/session"

export const RoleRoute: React.FC<{ section: string; children: React.ReactNode }> = ({
  section,
  children,
}) => {
  if (!getSession()) {
    return <Navigate to="/login" replace />
  }
  if (!canAccess(getRole(), section)) {
    return <Navigate to="/dashboard" replace />
  }
  return <>{children}</>
}
