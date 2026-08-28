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
  showText = true,
  className = "",
}) => {
  const heights = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  }

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  }

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Official TekkzyWork High-Res Logo Mark */}
      <img
        src={logoImg}
        alt="TekkzyWork Logo"
        className={`${heights[size]} w-auto object-contain rounded shrink-0`}
      />

      {showBadge && (
        <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-muted text-muted-foreground border border-border">
          Enterprise
        </span>
      )}
    </div>
  )
}
