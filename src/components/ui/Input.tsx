import React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    if (icon) {
      return (
        <div className="relative flex items-center w-full">
          <div className="absolute left-2.5 text-muted-foreground pointer-events-none flex items-center justify-center">
            {icon}
          </div>
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-card pl-8 pr-3 py-1.5 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-card px-3 py-1.5 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
