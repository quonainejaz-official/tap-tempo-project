import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { parseAdminToken, getJwtSecret } from "@/lib/auth"

export async function GET(req: Request) {
  const token = parseAdminToken(req)
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret())
    return NextResponse.json({ authenticated: true, user: decoded })
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}