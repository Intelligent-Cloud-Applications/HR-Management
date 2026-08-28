import React from "react"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: React.ReactNode
  badge?: React.ReactNode
  className?: string
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
  badge,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-border", className)}>
      <div className="space-y-1">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1 font-normal">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1
              return (
                <React.Fragment key={index}>
                  {item.href && !isLast ? (
                    <Link
                      to={item.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className={cn(isLast ? "text-foreground font-medium" : "")}>
                      {item.label}
                    </span>
                  )}
                  {!isLast && <ChevronRight className="w-3 h-3 text-muted-foreground/50" />}
                </React.Fragment>
              )
            })}
          </nav>
        )}

        <div className="flex items-center gap-2.5">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {badge}
        </div>

        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>

      {actions && <div className="flex flex-wrap items-center gap-2 sm:self-end">{actions}</div>}
    </div>
  )
}
