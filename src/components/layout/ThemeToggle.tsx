import React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "@/lib/theme"
import { Button } from "@/components/ui/Button"

interface ThemeToggleProps {
  variant?: "icon" | "dropdown"
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = "icon" }) => {
  const { theme, setTheme, isDark } = useTheme()

  if (variant === "dropdown") {
    return (
      <div className="flex items-center p-1 bg-muted/60 rounded-xl border border-border">
        <button
          onClick={() => setTheme("light")}
          className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            theme === "light" ? "bg-card text-foreground shadow-xs font-bold" : "text-muted-foreground hover:text-foreground"
          }`}
          title="Light Mode"
        >
          <Sun className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Light</span>
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            theme === "dark" ? "bg-card text-foreground shadow-xs font-bold" : "text-muted-foreground hover:text-foreground"
          }`}
          title="Dark Mode"
        >
          <Moon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Dark</span>
        </button>
        <button
          onClick={() => setTheme("system")}
          className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
            theme === "system" ? "bg-card text-foreground shadow-xs font-bold" : "text-muted-foreground hover:text-foreground"
          }`}
          title="System Preference"
        >
          <Laptop className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">System</span>
        </button>
      </div>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-xl border-border hover:bg-muted/80 relative"
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-400" />
    </Button>
  )
}
