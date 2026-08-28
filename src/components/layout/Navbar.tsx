import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Logo } from "@/components/brand/Logo"
import { ThemeToggle } from "./ThemeToggle"
import { Button } from "@/components/ui/Button"
import { Menu, X, ArrowRight } from "lucide-react"

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur-xs">
      <div className="container max-w-6xl mx-auto flex h-14 items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 py-1">
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#solutions" className="hover:text-foreground transition-colors">
            Solutions
          </a>
          <a href="#pricing" className="hover:text-foreground transition-colors">
            Pricing
          </a>
          <Link to="/dashboard/dev-log" className="hover:text-foreground transition-colors">
            Dev Log
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="default" size="sm" className="gap-1.5">
              Launch App
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-1.5">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="h-8 w-8"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card px-4 py-3 space-y-2 text-xs">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-muted-foreground hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-muted-foreground hover:text-foreground"
          >
            Pricing
          </a>
          <Link
            to="/dashboard/dev-log"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-muted-foreground hover:text-foreground"
          >
            Development Log
          </Link>
          <div className="pt-2 border-t border-border flex items-center gap-2">
            <Link to="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link to="/dashboard" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="default" size="sm" className="w-full">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
