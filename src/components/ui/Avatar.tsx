import React, { useState } from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "md" | "lg" | "xl"
  statusIndicator?: "online" | "away" | "offline" | "busy"
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  fallback = "TW",
  size = "md",
  statusIndicator,
  className,
  ...props
}) => {
  const [imgError, setImgError] = useState(false)

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl font-bold",
  }

  const indicatorClasses = {
    online: "bg-emerald-500",
    away: "bg-amber-500",
    busy: "bg-rose-500",
    offline: "bg-slate-400",
  }

  return (
    <div className={cn("relative inline-block shrink-0", className)} {...props}>
      <div
        className={cn(
          "overflow-hidden rounded-full border border-border bg-muted flex items-center justify-center font-semibold text-muted-foreground shadow-xs select-none",
          sizeClasses[size]
        )}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{fallback}</span>
        )}
      </div>

      {statusIndicator && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-background",
            indicatorClasses[statusIndicator],
            size === "sm" ? "w-2 h-2" : size === "md" ? "w-2.5 h-2.5" : "w-3.5 h-3.5"
          )}
        />
      )}
    </div>
  )
}
