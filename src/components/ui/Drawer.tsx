import React, { useEffect } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  position?: "right" | "left"
  size?: "sm" | "md" | "lg" | "xl"
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  position = "right",
  size = "lg",
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity duration-150"
        onClick={onClose}
      />

      <div
        className={cn(
          "fixed inset-y-0 flex max-w-full",
          position === "right" ? "right-0 pl-10" : "left-0 pr-10"
        )}
      >
        <div
          className={cn(
            "w-screen bg-card border-l border-border shadow-xl flex flex-col",
            sizeClasses[size]
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div>
              {title && <h3 className="text-sm font-semibold text-foreground">{title}</h3>}
              {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
            </div>
            <button
              onClick={onClose}
              className="rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </div>
      </div>
    </div>
  )
}
