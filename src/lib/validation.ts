import { z } from "zod"

const email = z.string().trim().max(200)
const password = z.string().max(200)

export const loginSchema = z.object({
  email,
  password,
})

export function normalizeSlug(slug: string): string {
  return slug.trim().replace(/^\/+|\/+$/g, "").toLowerCase()
}

export const slugSchema = z.string().min(1).max(100)

export const hrefSchema = z
  .string()
  .max(500)
  .refine((value) => {
    const v = value.trim()
    if (v.startsWith("/")) return true
    if (v.startsWith("#")) return true
    if (v.startsWith("mailto:") || v.startsWith("tel:")) return true
    if (v.startsWith("//")) return false
    try {
      const url = new URL(v)
      return url.protocol === "http:" || url.protocol === "https:"
    } catch {
      return false
    }
  }, "href must be an http(s) URL, absolute path, mailto, tel, or anchor link")

export const displaySchema = z
  .object({
    inNav: z.boolean().optional(),
    navLabel: z.string().max(80).optional(),
    navParent: z.string().max(50).optional(),
    navOrder: z.number().int().min(0).max(1000).optional(),
    navSection: z.string().max(60).optional(),
    inFooter: z.boolean().optional(),
    footerLabel: z.string().max(80).optional(),
    footerSection: z.string().max(60).optional(),
    footerOrder: z.number().int().min(0).max(1000).optional(),
  })
  .optional()

const contentSchema = z.string().max(500_000)
const metaTitleSchema = z.string().max(200)
const metaDescriptionSchema = z.string().max(500)

export const pageCreateSchema = z.object({
  title: z.string().min(1).max(200),
  slug: slugSchema,
  content: contentSchema.optional(),
  metaTitle: metaTitleSchema.optional(),
  metaDescription: metaDescriptionSchema.optional(),
  published: z.boolean().optional(),
  allowHtml: z.boolean().optional(),
  display: displaySchema,
})

export const pageUpdateSchema = pageCreateSchema.partial()

export const coverImageSchema = z
  .string()
  .max(1000)
  .refine((value) => {
    const v = value.trim()
    if (!v) return true
    if (v.startsWith("/")) return true
    try {
      const url = new URL(v)
      return url.protocol === "http:" || url.protocol === "https:"
    } catch {
      return false
    }
  }, "coverImage must be an http(s) URL or an absolute path")

export const tagsSchema = z.array(z.string().max(40)).max(20)

export const blogBaseSchema = z.object({
  title: z.string().min(1).max(200),
  slug: slugSchema,
  content: contentSchema.optional(),
  excerpt: z.string().max(500).optional(),
  coverImage: coverImageSchema.optional(),
  coverImagePublicId: z.string().max(300).optional(),
  metaTitle: metaTitleSchema.optional(),
  metaDescription: metaDescriptionSchema.optional(),
  author: z.string().max(120).optional(),
  tags: tagsSchema.optional(),
  published: z.boolean().optional(),
  readTime: z.string().max(50).optional(),
})

export const blogCreateSchema = blogBaseSchema
export const blogUpdateSchema = blogBaseSchema.partial()

export const navItemSchema = z.object({
  label: z.string().min(1).max(60),
  href: hrefSchema,
  parentId: z.string().max(50).nullable().optional(),
  order: z.number().int().min(0).max(1000).optional(),
  section: z.string().max(60).optional(),
})

export const footerLinkSchema = z.object({
  label: z.string().min(1).max(60),
  href: hrefSchema,
  section: z.string().max(60).optional(),
  order: z.number().int().min(0).max(1000).optional(),
})

const trackScalar = z.union([z.string().max(300), z.number().max(1e15), z.boolean(), z.null()])
const trackList = z.array(trackScalar).max(50)

export const trackSchema = z.object({
  type: z.enum(["page_view", "click", "login", "event"]),
  path: z.string().min(1).max(500),
  referrer: z.string().max(1000).nullable().optional(),
  element: z.string().max(200).nullable().optional(),
  metadata: z
    .record(z.string().max(40), z.union([trackScalar, trackList]))
    .refine((v) => Object.keys(v).length <= 20, "metadata max 20 keys")
    .optional(),
})

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().max(4000),
})

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(30),
})

export const generateContentSchema = z.object({
  prompt: z.string().trim().min(1).max(5000),
  type: z.enum(["blog", "page"]),
  includeImages: z.boolean().optional(),
})