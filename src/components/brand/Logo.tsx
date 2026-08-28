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
    sm: "h-7 max-w-[130px]",
    md: "h-9 max-w-[190px]",
    lg: "h-11 max-w-[240px]",
  }

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Official Transparent High-Res TekkzyWork Brand Banner */}
      <img
        src={logoImg}
        alt="TekkzyWork - HR Management Tool"
        className={`${heights[size]} w-auto object-contain shrink-0 drop-shadow-sm`}
      />

      {showBadge && (
        <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground border border-border">
          Enterprise
        </span>
      )}
    </div>
  )
}
