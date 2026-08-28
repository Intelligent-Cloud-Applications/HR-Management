import React from "react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showBadge?: boolean
  className?: string
}

export const Logo: React.FC<LogoProps> = ({ size = "md", showBadge = false, className = "" }) => {
  const iconSizes = {
    sm: "w-6 h-6 rounded text-xs",
    md: "w-7 h-7 rounded-md text-xs",
    lg: "w-8 h-8 rounded-md text-sm",
  }

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Crisp Minimal Mark */}
      <div
        className={`${iconSizes[size]} flex items-center justify-center bg-primary text-primary-foreground font-semibold shrink-0 border border-primary/40`}
      >
        <span className="font-mono font-bold tracking-tight">T</span>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`${textSizes[size]} font-semibold tracking-tight text-foreground`}>
            Tekkzy<span className="text-muted-foreground font-normal">Work</span>
          </span>
          {showBadge && (
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground border border-border">
              Enterprise
            </span>
          )}
        </div>
        {size === "lg" && (
          <span className="text-[11px] text-muted-foreground font-normal tracking-normal mt-0.5">
            Tekkzy Intelligent Cloud Applications
          </span>
        )}
      </div>
    </div>
  )
}
