import React from "react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  indicatorClassName?: string
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  indicatorClassName,
  className,
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div
      className={cn(
        "relative h-2.5 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full w-full flex-1 bg-indigo-600 transition-all duration-500 ease-out dark:bg-indigo-500",
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  )
}
