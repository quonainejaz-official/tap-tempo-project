import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"
import { requireAdmin } from "@/lib/auth"
import { readJson, HttpError } from "@/lib/request"
import { pageUpdateSchema, normalizeSlug } from "@/lib/validation"
import { sanitizeHtml } from "@/lib/sanitize"
import { revalidatePath } from "next/cache"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(req)
  if (authError) return authError

  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid page id" }, { status: 400 })
    }

    const pages = await getCollection("pages")
    const page = await pages.findOne({ _id: new ObjectId(id) })

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json({ ...page, _id: page._id.toString() })
  } catch {
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(req)
  if (authError) return authError

  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid page id" }, { status: 400 })
    }
    const objectId = new ObjectId(id)

    const body = await readJson(req)
    const parsed = pageUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid page data" }, { status: 400 })
    }
    const data = parsed.data

    const pages = await getCollection("pages")
    const now = new Date()

    const existing = await pages.findOne({ _id: objectId })
    if (!existing) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    const slug = data.slug !== undefined ? normalizeSlug(data.slug) : existing.slug

    if (slug !== existing.slug) {
      const duplicate = await pages.findOne({ slug, _id: { $ne: objectId } })
      if (duplicate) {
        return NextResponse.json({ error: "A page with this slug already exists" }, { status: 409 })
      }
    }

    const update: Record<string, unknown> = {
      title: data.title ?? existing.title,
      slug,
      content: data.content !== undefined ? sanitizeHtml(data.content) : existing.content,
      metaTitle: data.metaTitle ?? existing.metaTitle ?? "",
      metaDescription: data.metaDescription ?? existing.metaDescription ?? "",
      published: data.published ?? existing.published ?? true,
      updatedAt: now,
    }

    if (data.allowHtml !== undefined) update.allowHtml = data.allowHtml
    if (data.display !== undefined) update.display = data.display

    await pages.updateOne({ _id: objectId }, { $set: update })

    const nav = await getCollection("navigation")
    const footer = await getCollection("footer_links")

    await nav.deleteMany({ href: `/${slug}` })
    await footer.deleteMany({ href: `/${slug}` })

    if (data.display?.inNav) {
      await nav.insertOne({
        label: data.display.navLabel || data.title || existing.title,
        href: `/${slug}`,
        parentId: data.display.navParent || null,
        order: data.display.navOrder ?? 0,
        section: data.display.navSection || "",
        createdAt: now,
        updatedAt: now,
      })
    }

    if (data.display?.inFooter) {
      await footer.insertOne({
        label: data.display.footerLabel || data.title || existing.title,
        href: `/${slug}`,
        section: data.display.footerSection || "More",
        order: data.display.footerOrder ?? 0,
        createdAt: now,
        updatedAt: now,
      })
    }

    revalidatePath(`/${slug}`)
    revalidatePath("/")

    return NextResponse.json({ success: true })
  } catch (e) {
    if (e instanceof HttpError) {
      return NextResponse.json({ error: e.message }, { status: e.status })
    }
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireAdmin(req)
  if (authError) return authError

  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid page id" }, { status: 400 })
    }
    const objectId = new ObjectId(id)

    const pages = await getCollection("pages")

    const page = await pages.findOne({ _id: objectId })
    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    await pages.deleteOne({ _id: objectId })

    const nav = await getCollection("navigation")
    const footer = await getCollection("footer_links")
    await nav.deleteMany({ href: `/${page.slug}` })
    await footer.deleteMany({ href: `/${page.slug}` })

    revalidatePath(`/${page.slug}`)
    revalidatePath("/")

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 })
  }
}