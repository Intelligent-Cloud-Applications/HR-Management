import { corsHeaders, getMethod, getPath, HttpError, json } from "./lib/http.js"
import { authenticate } from "./lib/auth.js"
import {
  bootstrapAdmin,
  changePasswordHandler,
  confirmForgotPasswordHandler,
  forgotPasswordHandler,
  loginHandler,
  newPasswordHandler,
  refreshHandler,
} from "./routes/auth.js"
import {
  createEmployee,
  deactivateEmployee,
  getEmployee,
  listEmployees,
  resendEmployeeInvite,
  updateEmployee,
  verifyEmployeeByHr,
} from "./routes/employees.js"
import { getPersonal, putPersonal } from "./routes/personal.js"
import { getPayroll, getPayrollHistory, putPayroll } from "./routes/payroll.js"
import {
  createDocument,
  listDocuments,
  presignDocument,
  removeDocument,
} from "./routes/documents.js"
import {
  createEmergencyContact,
  listEmergencyContacts,
  removeEmergencyContact,
  updateEmergencyContact,
} from "./routes/emergency.js"
import { getAccess, putAccess } from "./routes/access.js"
import { getMe, updateMe, verifyMe } from "./routes/me.js"

const routes = [
  { method: "GET", path: "/health", public: true, handler: async () => json(200, { ok: true, service: "hr-management-backend" }) },
  { method: "POST", path: "/auth/login", public: true, handler: loginHandler },
  { method: "POST", path: "/auth/refresh", public: true, handler: refreshHandler },
  { method: "POST", path: "/auth/respond-new-password", public: true, handler: newPasswordHandler },
  { method: "POST", path: "/auth/forgot-password", public: true, handler: forgotPasswordHandler },
  { method: "POST", path: "/auth/confirm-forgot-password", public: true, handler: confirmForgotPasswordHandler },
  { method: "POST", path: "/auth/bootstrap-admin", public: true, handler: bootstrapAdmin },
  { method: "POST", path: "/auth/change-password", handler: changePasswordHandler },

  { method: "GET", path: "/me", handler: getMe },
  { method: "PUT", path: "/me", handler: updateMe },
  { method: "POST", path: "/me/verify", handler: verifyMe },

  { method: "POST", path: "/employees", handler: createEmployee },
  { method: "GET", path: "/employees", handler: listEmployees },
  { method: "GET", path: "/employees/:id/personal", handler: getPersonal },
  { method: "PUT", path: "/employees/:id/personal", handler: putPersonal },
  { method: "GET", path: "/employees/:id/payroll/history", handler: getPayrollHistory },
  { method: "GET", path: "/employees/:id/payroll", handler: getPayroll },
  { method: "PUT", path: "/employees/:id/payroll", handler: putPayroll },
  { method: "POST", path: "/employees/:id/documents/presign", handler: presignDocument },
  { method: "GET", path: "/employees/:id/documents", handler: listDocuments },
  { method: "POST", path: "/employees/:id/documents", handler: createDocument },
  { method: "DELETE", path: "/employees/:id/documents/:docId", handler: removeDocument },
  { method: "GET", path: "/employees/:id/emergency-contacts", handler: listEmergencyContacts },
  { method: "POST", path: "/employees/:id/emergency-contacts", handler: createEmergencyContact },
  { method: "PUT", path: "/employees/:id/emergency-contacts/:contactId", handler: updateEmergencyContact },
  { method: "DELETE", path: "/employees/:id/emergency-contacts/:contactId", handler: removeEmergencyContact },
  { method: "GET", path: "/employees/:id/access", handler: getAccess },
  { method: "PUT", path: "/employees/:id/access", handler: putAccess },
  { method: "POST", path: "/employees/:id/resend-invite", handler: resendEmployeeInvite },
  { method: "POST", path: "/employees/:id/verify", handler: verifyEmployeeByHr },
  { method: "GET", path: "/employees/:id", handler: getEmployee },
  { method: "PUT", path: "/employees/:id", handler: updateEmployee },
  { method: "PATCH", path: "/employees/:id", handler: updateEmployee },
  { method: "DELETE", path: "/employees/:id", handler: deactivateEmployee },
]

function compile(path) {
  const keys = []
  const regex = new RegExp(
    `^${path.replace(/:([A-Za-z0-9_]+)/g, (_, key) => {
      keys.push(key)
      return "([^/]+)"
    })}$`
  )
  return { regex, keys }
}

const compiled = routes.map((route) => ({ ...route, ...compile(route.path) }))

function matchRoute(method, path) {
  for (const route of compiled) {
    if (route.method !== method) continue
    const found = path.match(route.regex)
    if (!found) continue
    const pathParams = {}
    route.keys.forEach((key, index) => {
      pathParams[key] = decodeURIComponent(found[index + 1])
    })
    return { route, pathParams }
  }
  return null
}

export async function handler(event) {
  const method = getMethod(event)
  if (method === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" }
  }

  const path = getPath(event)
  const matched = matchRoute(method, path)
  if (!matched) {
    return json(404, { error: "Not found", method, path })
  }

  try {
    const caller = matched.route.public ? null : await authenticate(event)
    return await matched.route.handler({ ...event, pathParams: matched.pathParams }, caller)
  } catch (err) {
    if (err instanceof HttpError) {
      return json(err.statusCode, { error: err.message, details: err.details || undefined })
    }
    console.error("Unhandled error", err)
    return json(err.statusCode || 500, {
      error: err.message || "Internal server error",
      name: err.name,
    })
  }
}
