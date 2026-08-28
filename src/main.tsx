import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@/lib/theme"
import { ToastProvider } from "@/lib/toast"
import { App } from "./App"
import "./index.css"

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("Failed to find the root element")
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="tekkzywork-theme">
        <ToastProvider>
          <App />
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
