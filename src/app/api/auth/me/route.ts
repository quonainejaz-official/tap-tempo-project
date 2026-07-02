import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret"

export async function GET(req: Request) {
  const cookies = req.headers.get("cookie") || ""
  const token = cookies
    .split("; ")
    .find((c) => c.startsWith("admin_token="))
    ?.split("=")[1]

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return NextResponse.json({ authenticated: true, user: decoded })
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
