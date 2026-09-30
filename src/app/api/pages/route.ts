import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { requireAdmin } from "@/lib/auth"
import { readJson, HttpError } from "@/lib/request"
import { pageCreateSchema, normalizeSlug } from "@/lib/validation"
import { sanitizeHtml } from "@/lib/sanitize"
import { revalidatePath } from "next/cache"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const all = searchParams.get("all") === "true"

    if (all) {
      const authError = await requireAdmin(req)
      if (authError) return authError
    }

    const pages = await getCollection("pages")
    const filter = all ? {} : { published: true }
    const data = await pages.find(filter).sort({ createdAt: -1 }).toArray()

    const serialized = data.map((p) => ({
      ...p,
      _id: p._id.toString(),
      createdAt: p.createdAt?.toISOString(),
      updatedAt: p.updatedAt?.toISOString(),
    }))

    return NextResponse.json({ pages: serialized })
  } catch {
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const authError = await requireAdmin(req)
  if (authError) return authError

  try {
    const body = await readJson(req)
    const parsed = pageCreateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid page data" }, { status: 400 })
    }

    const data = parsed.data
    const slug = normalizeSlug(data.slug)

    const pages = await getCollection("pages")
    const now = new Date()

    const existing = await pages.findOne({ slug })
    if (existing) {
      return NextResponse.json({ error: "A page with this slug already exists" }, { status: 409 })
    }

    const page = {
      title: data.title,
      slug,
      content: data.content ? sanitizeHtml(data.content) : "",
      metaTitle: data.metaTitle || "",
      metaDescription: data.metaDescription || "",
      published: data.published ?? true,
      allowHtml: data.allowHtml ?? false,
      display: data.display || {},
      createdAt: now,
      updatedAt: now,
    }

    const result = await pages.insertOne(page)

    if (data.display?.inNav) {
      const nav = await getCollection("navigation")
      await nav.insertOne({
        label: data.display.navLabel || data.title,
        href: `/${slug}`,
        parentId: data.display.navParent || null,
        order: data.display.navOrder ?? 0,
        section: data.display.navSection || "",
        createdAt: now,
        updatedAt: now,
      })
    }

    if (data.display?.inFooter) {
      const fl = await getCollection("footer_links")
      await fl.insertOne({
        label: data.display.footerLabel || data.title,
        href: `/${slug}`,
        section: data.display.footerSection || "More",
        order: data.display.footerOrder ?? 0,
        createdAt: now,
        updatedAt: now,
      })
    }

    revalidatePath(`/${slug}`)
    revalidatePath("/")

    return NextResponse.json(
      { ...page, _id: result.insertedId.toString() },
      { status: 201 },
    )
  } catch (e) {
    if (e instanceof HttpError) {
      return NextResponse.json({ error: e.message }, { status: e.status })
    }
    console.error("Create page error:", e)
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 })
  }
}