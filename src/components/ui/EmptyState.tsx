import React from "react"
import { FolderSearch } from "lucide-react"
import { Button } from "./Button"
import { cn } from "@/lib/utils"

export interface EmptyStateProps {
  title: string
  description: string
  icon?: React.ReactNode
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = <FolderSearch className="w-10 h-10 text-muted-foreground" />,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-border bg-card/50",
        className
      )}
    >
      <div className="p-4 rounded-2xl bg-muted/60 mb-4 text-primary">{icon}</div>
      <h3 className="text-base font-bold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-5" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
