export class HttpError extends Error {
  constructor(statusCode, message, details) {
    super(message)
    this.statusCode = statusCode
    this.details = details
  }
}

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Requested-With",
  "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
}

export function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
    body: JSON.stringify(body),
  }
}

export function ok(body) {
  return json(200, body)
}

export function created(body) {
  return json(201, body)
}

export function noContent() {
  return { statusCode: 204, headers: corsHeaders, body: "" }
}

export function parseBody(event) {
  if (!event?.body) return {}
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body, "base64").toString("utf8")
    : event.body
  if (typeof raw !== "string" || !raw.trim()) return {}
  try {
    return JSON.parse(raw)
  } catch {
    throw new HttpError(400, "Request body must be valid JSON")
  }
}

export function getPath(event) {
  const raw = event.rawPath || event.path || "/"
  const stage = event.requestContext?.stage
  let path = raw.split("?")[0]
  if (stage && path.startsWith(`/${stage}/`)) path = path.slice(stage.length + 1)
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1)
  return path || "/"
}

export function getMethod(event) {
  return (
    event.requestContext?.http?.method ||
    event.httpMethod ||
    "GET"
  ).toUpperCase()
}

export function getHeader(event, name) {
  const headers = event.headers || {}
  const match = Object.keys(headers).find((key) => key.toLowerCase() === name.toLowerCase())
  return match ? headers[match] : undefined
}

export function query(event) {
  return event.queryStringParameters || {}
}
