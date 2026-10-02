import { NextResponse } from "next/server"

const CMS_DISABLED =
  "Blog content is managed as version-controlled source in src/data/blogs/. " +
  "The MongoDB-backed blog CMS is intentionally disabled because published posts " +
  "are rendered from the hardcoded registry, so writes here would never become public."

export async function GET() {
  return NextResponse.json({ error: CMS_DISABLED }, { status: 410 })
}

export async function PUT() {
  return NextResponse.json({ error: CMS_DISABLED }, { status: 410 })
}

export async function DELETE() {
  return NextResponse.json({ error: CMS_DISABLED }, { status: 410 })
}