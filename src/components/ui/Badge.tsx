import React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "destructive" | "info" | "brand"
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground border border-border",
    outline: "text-foreground border border-border bg-transparent",
    brand: "bg-primary/10 text-primary border border-primary/20",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    destructive: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20",
    info: "bg-muted text-muted-foreground border border-border",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-[11px] font-medium transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
