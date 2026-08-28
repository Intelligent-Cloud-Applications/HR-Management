import React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "glow" | "pill" | "link"
  size?: "sm" | "md" | "lg" | "icon"
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/50 disabled:pointer-events-none disabled:opacity-50 select-none text-xs"

    const variants = {
      // Primary: Electric Blue / Tekkzy Origin Gradient
      default: "rounded-full bg-gradient-to-r from-[#2563EB] via-[#0284C7] to-[#38BDF8] text-white font-semibold shadow-[0_0_16px_rgba(56,189,248,0.3)] hover:shadow-[0_0_22px_rgba(56,189,248,0.5)] hover:opacity-95 active:scale-[0.98]",
      
      // Secondary: Sleek Dark Pill
      secondary: "rounded-full bg-[#111118] text-zinc-300 hover:text-white hover:bg-[#181824] border border-[#27273A]",
      
      // Outline: Tekkzy Origin Glowing Border Pill (like "Digitize Now")
      outline: "rounded-full border border-[#38BDF8]/50 bg-black/40 text-white hover:bg-[#38BDF8]/10 hover:border-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.15)]",
      
      // Ghost: Minimal hover
      ghost: "rounded-md hover:bg-white/[0.06] text-zinc-300 hover:text-white",
      
      // Destructive
      destructive: "rounded-full bg-rose-600/90 text-white hover:bg-rose-600 border border-rose-500/40 shadow-xs",
      
      // Glow pill
      glow: "rounded-full border border-[#38BDF8] bg-[#38BDF8]/10 text-white hover:bg-[#38BDF8]/20 shadow-[0_0_20px_rgba(56,189,248,0.4)]",

      // Origin Website Pill
      pill: "rounded-full border border-zinc-800 bg-zinc-950/80 text-zinc-300 hover:text-white hover:border-[#38BDF8]/60",

      link: "text-[#38BDF8] underline-offset-4 hover:underline p-0 h-auto font-normal",
    }

    const sizes = {
      sm: "h-7.5 px-3.5 text-xs gap-1.5",
      md: "h-8.5 px-4 text-xs gap-2",
      lg: "h-10 px-5 text-sm font-medium gap-2",
      icon: "h-8 w-8 rounded-full p-0",
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin -ml-0.5 mr-1.5 h-3.5 w-3.5 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = "Button"
