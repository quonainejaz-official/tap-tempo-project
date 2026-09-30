import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

const FALLBACK_SECRET = "fallback-secret"
const MIN_SECRET_LENGTH = 16

export class AuthConfigError extends Error {
  constructor() {
    super(
      "JWT_SECRET is not configured securely. Set a strong JWT_SECRET in the environment before enabling the admin login.",
    )
  }
}

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret || secret === FALLBACK_SECRET || secret.length < MIN_SECRET_LENGTH) {
    throw new AuthConfigError()
  }
  return secret
}

export function parseAdminToken(req: Request): string | null {
  const cookies = req.headers.get("cookie") || ""
  const match = cookies
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("admin_token="))
  if (!match) return null
  const value = match.slice("admin_token=".length)
  return value || null
}

export function verifyAdminToken(req: Request): boolean {
  try {
    const token = parseAdminToken(req)
    if (!token) return false
    jwt.verify(token, getJwtSecret())
    return true
  } catch {
    return false
  }
}

export async function requireAdmin(req: Request): Promise<NextResponse | null> {
  if (!verifyAdminToken(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return null
}

export function signAdminToken(payload: { id: string; email: string; username: string }): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" })
}