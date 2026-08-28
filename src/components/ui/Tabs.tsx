import React, { createContext, useContext, useState } from "react"
import { cn } from "@/lib/utils"

interface TabsContextType {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  ...props
}) => {
  const [activeTabState, setActiveTabState] = useState(defaultValue)
  const activeTab = value !== undefined ? value : activeTabState

  const setActiveTab = (val: string) => {
    if (onValueChange) {
      onValueChange(val)
    } else {
      setActiveTabState(val)
    }
  }

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full space-y-3", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center justify-start rounded-md bg-muted/60 p-0.5 text-muted-foreground border border-border",
        className
      )}
      {...props}
    />
  )
)
TabsList.displayName = "TabsList"

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = useContext(TabsContext)
    if (!context) throw new Error("TabsTrigger must be used within Tabs")

    const isActive = context.activeTab === value

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => context.setActiveTab(value)}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          isActive
            ? "bg-card text-foreground font-semibold shadow-xs border border-border"
            : "hover:text-foreground hover:bg-background/40",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
TabsTrigger.displayName = "TabsTrigger"

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = useContext(TabsContext)
    if (!context) throw new Error("TabsContent must be used within Tabs")

    if (context.activeTab !== value) return null

    return (
      <div
        ref={ref}
        className={cn("focus-visible:outline-none", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabsContent.displayName = "TabsContent"
