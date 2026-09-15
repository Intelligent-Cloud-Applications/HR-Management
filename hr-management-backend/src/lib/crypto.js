import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto"
import { ENCRYPTION_KEY } from "../config.js"

function keyBuffer() {
  const source = ENCRYPTION_KEY || "beta-hr-management-dev-key-change-me"
  return createHash("sha256").update(source).digest()
}

export function encrypt(value) {
  if (value === undefined || value === null || value === "") return undefined
  const iv = randomBytes(12)
  const cipher = createCipheriv("aes-256-gcm", keyBuffer(), iv)
  const encrypted = Buffer.concat([cipher.update(String(value), "utf8"), cipher.final()])
  const tag = cipher.getAuthTag()
  return `v1:${iv.toString("base64")}:${tag.toString("base64")}:${encrypted.toString("base64")}`
}

export function decrypt(payload) {
  if (!payload) return null
  if (!String(payload).startsWith("v1:")) return payload
  const [, ivB64, tagB64, dataB64] = String(payload).split(":")
  const decipher = createDecipheriv("aes-256-gcm", keyBuffer(), Buffer.from(ivB64, "base64"))
  decipher.setAuthTag(Buffer.from(tagB64, "base64"))
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(dataB64, "base64")),
    decipher.final(),
  ])
  return decrypted.toString("utf8")
}

export function maskAccount(value) {
  if (!value) return null
  const digits = String(value).replace(/\s/g, "")
  if (digits.length < 4) return "••••"
  return `•••• ${digits.slice(-4)}`
}

export function maskPan(value) {
  if (!value) return null
  const text = String(value)
  if (text.length < 4) return "••••"
  return `${text.slice(0, 2)}••••${text.slice(-2)}`
}
