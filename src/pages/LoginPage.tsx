import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Logo } from "@/components/brand/Logo"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { useToast } from "@/lib/toast"
import { API_URL, api } from "@/lib/api"
import { saveSession, roleFromToken } from "@/lib/session"
import { Mail, Lock, ArrowRight } from "lucide-react"

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("hr@tekkzy.com")
  const [password, setPassword] = useState("Password@123")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [challengeSession, setChallengeSession] = useState<string | null>(null)
  const [role, setRole] = useState("HR Lead")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const finishLogin = (employee: { profile_verification_status?: string } | null | undefined) => {
    const needsVerify = employee?.profile_verification_status &&
      employee.profile_verification_status !== "verified"
    toast({
      title: "Signed in to TekkzyWork",
      description: `Active session: ${email}`,
      type: "success",
    })
    navigate(needsVerify ? "/dashboard/verify-profile" : "/dashboard")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (API_URL && !challengeSession) {
        const result = await api.login(email, password)
        if (result.challengeName === "NEW_PASSWORD_REQUIRED" && result.session) {
          setChallengeSession(result.session)
          toast({
            title: "Set a new password",
            description: "Your invitation password must be changed before you can continue.",
            type: "info",
          })
          return
        }
        if (result.tokens) {
          saveSession({
            tokens: result.tokens,
            employee: result.employee || null,
            email,
            role: roleFromToken(result.tokens.idToken) || "EMPLOYEE",
          })
          finishLogin(result.employee)
          return
        }
      }

      if (API_URL && challengeSession) {
        if (newPassword !== confirmPassword) {
          throw new Error("New password and confirmation do not match")
        }
        const result = await api.respondNewPassword(email, newPassword, challengeSession)
        if (result.tokens) {
          saveSession({
            tokens: result.tokens,
            employee: result.employee || null,
            email,
            role: roleFromToken(result.tokens.idToken) || "EMPLOYEE",
          })
          finishLogin(result.employee)
          return
        }
      }

      toast({
        title: "Signed in to TekkzyWork",
        description: `Demo session: ${email}`,
        type: "success",
      })
      navigate("/dashboard")
    } catch (err) {
      toast({
        title: challengeSession ? "Could not set password" : "Sign-in failed",
        description: (err as Error).message,
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const setDemoUser = (userRole: string, userEmail: string) => {
    setRole(userRole)
    setEmail(userEmail)
    setPassword("Password@123")
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between font-sans">
      {/* Top Header */}
      <header className="p-4 flex items-center justify-between max-w-5xl w-full mx-auto">
        <Link to="/">
          <Logo size="md" />
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/">
            <Button variant="ghost" size="sm">
              Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-4">
          <Card className="p-6 border border-border">
            <div className="space-y-1 mb-5">
              <h2 className="text-base font-semibold text-foreground">Sign In to TekkzyWork</h2>
              <p className="text-xs text-muted-foreground">
                Enter your enterprise credentials
              </p>
            </div>

            {/* Quick Demo Selector */}
            <div className="mb-4 space-y-1.5">
              <span className="text-[11px] font-medium text-muted-foreground">Quick fill (Password@123):</span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setDemoUser("Admin", "admin@tekkzy.com")}
                  className={`p-1.5 rounded border text-xs font-medium transition-colors text-center ${
                    role === "Admin"
                      ? "bg-muted border-primary text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted/40"
                  }`}
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => setDemoUser("HR Lead", "hr@tekkzy.com")}
                  className={`p-1.5 rounded border text-xs font-medium transition-colors text-center ${
                    role === "HR Lead"
                      ? "bg-muted border-primary text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted/40"
                  }`}
                >
                  HR
                </button>
                <button
                  type="button"
                  onClick={() => setDemoUser("Finance", "finance@tekkzy.com")}
                  className={`p-1.5 rounded border text-xs font-medium transition-colors text-center ${
                    role === "Finance"
                      ? "bg-muted border-primary text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted/40"
                  }`}
                >
                  Finance
                </button>
                <button
                  type="button"
                  onClick={() => setDemoUser("Manager", "manager@tekkzy.com")}
                  className={`p-1.5 rounded border text-xs font-medium transition-colors text-center ${
                    role === "Manager"
                      ? "bg-muted border-primary text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted/40"
                  }`}
                >
                  Manager
                </button>
                <button
                  type="button"
                  onClick={() => setDemoUser("Staff", "employee@tekkzy.com")}
                  className={`p-1.5 rounded border text-xs font-medium transition-colors text-center ${
                    role === "Staff"
                      ? "bg-muted border-primary text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted/40"
                  }`}
                >
                  Employee
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Email</label>
                <Input
                  type="email"
                  required
                  icon={<Mail className="w-3.5 h-3.5" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {!challengeSession && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-muted-foreground">Password</label>
                    <a href="#forgot" className="text-[11px] text-muted-foreground hover:text-foreground">
                      Reset
                    </a>
                  </div>
                  <Input
                    type="password"
                    required
                    icon={<Lock className="w-3.5 h-3.5" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}

              {challengeSession && (
                <>
                  <p className="text-xs text-muted-foreground">
                    Create a new password to finish your invitation. Use 8+ characters with upper, lower, number, and symbol.
                  </p>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">New password</label>
                    <Input
                      type="password"
                      required
                      icon={<Lock className="w-3.5 h-3.5" />}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Confirm password</label>
                    <Input
                      type="password"
                      required
                      icon={<Lock className="w-3.5 h-3.5" />}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </>
              )}

              <Button type="submit" variant="default" className="w-full font-medium mt-2" isLoading={isLoading}>
                {challengeSession ? "Set password and continue" : "Sign In"}
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </form>
          </Card>

          <p className="text-center text-xs text-muted-foreground">
            Tekkzy Intelligent Cloud Applications Pvt. Ltd.
          </p>
        </div>
      </main>

      <footer className="p-4 text-center text-[11px] text-muted-foreground border-t border-border">
        © 2026 Tekkzy Intelligent Cloud Applications Pvt. Ltd.
      </footer>
    </div>
  )
}
