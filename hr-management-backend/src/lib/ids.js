import { randomBytes, randomInt, randomUUID } from "node:crypto"

export function nowIso() {
  return new Date().toISOString()
}

export function newId() {
  return randomUUID()
}

export function generateEmployeeCode() {
  const year = new Date().getUTCFullYear()
  const suffix = String(randomInt(1000, 10000))
  return `TW-${year}-${suffix}`
}

export function generateTempPassword() {
  const core = randomBytes(9).toString("base64url")
  return `Tw#${core}9aA!`
}

export function encodeToken(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url")
}

export function decodeToken(token) {
  if (!token) return undefined
  try {
    return JSON.parse(Buffer.from(token, "base64url").toString("utf8"))
  } catch {
    return undefined
  }
}
