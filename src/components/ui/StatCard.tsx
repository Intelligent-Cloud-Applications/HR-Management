import React from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Card } from "./Card"
import { cn } from "@/lib/utils"

export interface StatCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  trend?: {
    value: string
    isPositive?: boolean
    isNeutral?: boolean
    label?: string
  }
  description?: string
  className?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  description,
  className,
}) => {
  return (
    <Card className={cn("p-3.5 flex flex-col justify-between", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground tracking-normal">{title}</span>
        {icon && <span className="text-muted-foreground w-4 h-4">{icon}</span>}
      </div>

      <div className="my-2">
        <div className="text-2xl font-semibold tracking-tight text-foreground font-mono">{value}</div>
      </div>

      {(trend || description) && (
        <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1.5 border-t border-border">
          {trend && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 font-medium",
                  trend.isNeutral
                    ? "text-muted-foreground"
                    : trend.isPositive
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
                )}
              >
                {trend.isNeutral ? (
                  <Minus className="w-3 h-3" />
                ) : trend.isPositive ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {trend.value}
              </span>
              <span className="text-muted-foreground">{trend.label}</span>
            </div>
          )}
          {description && <span className="text-muted-foreground ml-auto">{description}</span>}
        </div>
      )}
    </Card>
  )
}
