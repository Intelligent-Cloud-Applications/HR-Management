import React from "react"
import logoImg from "@/assets/logo.png"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showBadge?: boolean
  className?: string
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showBadge = false,
  className = "",
}) => {
  const heights = {
    sm: "h-8 max-w-[140px]",
    md: "h-10 max-w-[205px]",
    lg: "h-12 max-w-[260px]",
  }

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Official Transparent High-Res TekkzyWork Brand Banner */}
      <img
        src={logoImg}
        alt="TekkzyWork - HR Management Tool"
        className={`${heights[size]} w-auto object-contain shrink-0`}
      />

      {showBadge && (
        <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground border border-border">
          Enterprise
        </span>
      )}
    </div>
  )
}
