import React, { createContext, useContext, useState, useCallback } from "react"
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react"

export type ToastType = "success" | "error" | "warning" | "info"

export interface ToastItem {
  id: string
  title: string
  description?: string
  type: ToastType
}

interface ToastContextType {
  toast: (toast: Omit<ToastItem, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    ({ title, description, type = "info" }: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newToast: ToastItem = { id, title, description, type }
      setToasts((prev) => [...prev, newToast])

      setTimeout(() => {
        removeToast(id)
      }, 4000)
    },
    [removeToast]
  )

  return (
    <ToastContext.Provider value={{ toast, removeToast }}>
      {children}
      {/* Toast viewport */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 animate-fade-in ${
              t.type === "success"
                ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-100 dark:bg-emerald-950/90 dark:border-emerald-500/30"
                : t.type === "error"
                ? "bg-red-950/80 border-red-500/40 text-red-100 dark:bg-red-950/90 dark:border-red-500/30"
                : t.type === "warning"
                ? "bg-amber-950/80 border-amber-500/40 text-amber-100 dark:bg-amber-950/90 dark:border-amber-500/30"
                : "bg-indigo-950/80 border-indigo-500/40 text-indigo-100 dark:bg-slate-900/90 dark:border-indigo-500/30"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {t.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {t.type === "error" && <XCircle className="w-5 h-5 text-red-400" />}
              {t.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {t.type === "info" && <Info className="w-5 h-5 text-indigo-400" />}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm leading-tight text-white">{t.title}</h4>
              {t.description && <p className="text-xs mt-1 text-slate-300">{t.description}</p>}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}
