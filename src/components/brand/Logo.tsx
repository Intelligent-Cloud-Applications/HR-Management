import React from "react"
import logoImg from "@/assets/logo.png"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showBadge?: boolean
  showText?: boolean
  className?: string
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showBadge = false,
  className = "",
}) => {
  const heights = {
    sm: "h-6 max-w-[110px]",
    md: "h-7 sm:h-7.5 max-w-[155px]",
    lg: "h-9 max-w-[200px]",
  }

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Official Horizontal TekkzyWork Brand Banner */}
      <img
        src={logoImg}
        alt="TekkzyWork - HR Management Tool"
        className={`${heights[size]} w-auto object-contain shrink-0`}
      />

      {showBadge && (
        <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground border border-border">
          Enterprise
        </span>
      )}
    </div>
  )
}
