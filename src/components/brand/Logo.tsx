import React from "react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showBadge?: boolean
  className?: string
}

export const Logo: React.FC<LogoProps> = ({ size = "md", showBadge = false, className = "" }) => {
  const iconDimensions = {
    sm: "w-6 h-6",
    md: "w-7 h-7",
    lg: "w-8 h-8",
  }

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Tekkzy Official Cloud Circuit Pulse Mark */}
      <div className={`${iconDimensions[size]} flex items-center justify-center shrink-0`}>
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="tekkzyLogoGrad" x1="2" y1="6" x2="34" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>
          </defs>
          {/* Cloud Outline */}
          <path
            d="M9.5 24C6.46243 24 4 21.5376 4 18.5C4 15.65 6.16 13.3 8.95 13.04C9.8 8.97 13.41 6 17.7 6C22.65 6 26.75 9.77 27.2 14.65C29.93 15.15 32 17.53 32 20.4C32 23.5 29.5 26 26.4 26"
            stroke="url(#tekkzyLogoGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* T Mark and Circuit Nodes */}
          <path
            d="M13 14H23M18 14V28M18 28L14 31M18 28L22 31"
            stroke="url(#tekkzyLogoGrad)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="14" cy="31" r="1.5" fill="#38BDF8" />
          <circle cx="22" cy="31" r="1.5" fill="#818CF8" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`${textSizes[size]} font-semibold tracking-tight text-white`}>
            Tekkzy<span className="text-[#38BDF8] font-semibold">Work</span>
          </span>
          {showBadge && (
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30">
              Enterprise
            </span>
          )}
        </div>
        {size === "lg" && (
          <span className="text-[11px] text-zinc-400 font-normal tracking-normal mt-0.5">
            Tekkzy Intelligent Cloud Applications
          </span>
        )}
      </div>
    </div>
  )
}
