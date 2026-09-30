import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getCollection } from "@/lib/mongodb"
import { signAdminToken } from "@/lib/auth"
import { loginSchema } from "@/lib/validation"
import { readJson, HttpError } from "@/lib/request"
import { checkRateLimit } from "@/lib/rate-limit"
import { getClientIp } from "@/lib/ip"

export async function POST(req: Request) {
  const ip = getClientIp(req)
  const ipLimiter = await checkRateLimit(`login:ip:${ip}`, 10, 15 * 60 * 1000)
  if (!ipLimiter.ok) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(ipLimiter.retryAfterSeconds) } },
    )
  }

  try {
    const body = await readJson(req, 10_000)
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const { email, password } = parsed.data
    const emailLimiter = await checkRateLimit(`login:email:${email}`, 10, 15 * 60 * 1000)
    if (!emailLimiter.ok) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(emailLimiter.retryAfterSeconds) } },
      )
    }

    const admins = await getCollection("admins")
    const admin = await admins.findOne({ email })

    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = signAdminToken({
      id: admin._id.toString(),
      email: admin.email,
      username: admin.username || "",
    })

    const response = NextResponse.json({ success: true })
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return response
  } catch (e) {
    if (e instanceof HttpError) {
      return NextResponse.json({ error: e.message }, { status: e.status })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}