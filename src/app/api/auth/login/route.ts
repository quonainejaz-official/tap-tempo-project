import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getCollection } from "@/lib/mongodb"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const admins = await getCollection("admins")
    const admin = await admins.findOne({ email })

    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, username: admin.username },
      JWT_SECRET,
      { expiresIn: "7d" },
    )

    const response = NextResponse.json({ success: true })
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return response
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
