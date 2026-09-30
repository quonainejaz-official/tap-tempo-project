import OpenAI from "openai"
import { verifyAdminToken } from "@/lib/auth"
import { chatRequestSchema } from "@/lib/validation"
import { readJson, HttpError } from "@/lib/request"
import { checkRateLimit } from "@/lib/rate-limit"
import { getClientIp } from "@/lib/ip"

export async function POST(req: Request) {
  let messages

  try {
    const body = await readJson(req, 150_000)
    const parsed = chatRequestSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: "Invalid message format" }, { status: 400 })
    }
    messages = parsed.data.messages
  } catch (e) {
    if (e instanceof HttpError) {
      return Response.json({ error: e.message }, { status: e.status })
    }
    return Response.json({ error: "Invalid request body" }, { status: 400 })
  }

  const ip = getClientIp(req)
  const limiter = await checkRateLimit(`chat:${ip}`, 20, 60 * 1000)
  if (!limiter.ok) {
    return Response.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": String(limiter.retryAfterSeconds) } },
    )
  }

  const apiKey = process.env.OPencode_API_KEY
  const baseUrl = process.env.OPencode_API_BASE_URL || "https://opencode.ai/zen/v1"
  const model = process.env.OPencode_MODEL || "big-pickle"

  if (!apiKey) {
    return Response.json({ error: "API key not configured" }, { status: 500 })
  }

  const isAdmin = verifyAdminToken(req)
  const systemPrompt = buildPrompt(isAdmin)

  const client = new OpenAI({ apiKey, baseURL: baseUrl })

  const stream = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      ...messages.slice(-10),
    ],
    max_tokens: 512,
    temperature: 0.5,
    stream: true,
  })

  const encoder = new TextEncoder()

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices?.[0]?.delta?.content
        if (text) {
          controller.enqueue(encoder.encode(text))
        }
      }
      controller.close()
    },
  })

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}

function buildPrompt(isAdmin: boolean): string {
  const common = `
PROJECT: TheTapTempo (www.thetaptempo.com) — BPM toolkit for musicians, producers & DJs. Built with Next.js 15, MongoDB Atlas, Cloudinary.

TOOLS:
1. Tap Tempo (/tap-tempo) — Tap rhythm, weighted avg BPM, outlier rejection, live graph, audio feedback, session history
2. Metronome (/metronome) — Web Audio metronome, BPM 20-280, time sigs 2/4-7/8, visual beat, tap-to-set, presets
3. BPM Calculator (/bpm-calculator) — BPM from duration or duration from BPM
4. BPM to ms (/bpm-to-ms) — Convert BPM to note ms values
5. Delay & Reverb Time (/delay-reverb-time-calculator) — Delay ms synced to tempo + note-to-ms
6. Tempo Markings (/tempo-markings) — Italian tempo terms with BPM ranges
7. Beats Per Bar (/beats-per-bar-calculator) — Time signature visualizer

BLOG: Educational articles about BPM/tempo/music theory in MongoDB. Dynamic SEO via generateMetadata().

RULES:
- Answer quickly and concisely, max 2-3 sentences unless explaining a tool
- Use simple language — not everyone knows music terms
- If someone asks about a music term (BPM, tempo, time sig, etc.), explain it simply then connect to how a relevant tool helps
- For unrelated questions: give a brief helpful answer anyway`

  if (!isAdmin) {
    return "You are TapTempo Assistant — a helpful, fast guide for TheTapTempo website." + common + "\n- If asked about admin/panel/backend: politely say admin features are restricted to authorized users only."
  }

  return "You are TapTempo Assistant — an admin guide for TheTapTempo website." + common + `

ADMIN PANEL (/admin):
• Login at /admin/login — email/password from MongoDB (single admin)
• Dashboard — blog & page counts + quick links
• Manage Blogs (/admin/blogs) — create, edit, delete. TipTap rich editor, Cloudinary image upload, SEO meta fields
• Manage Pages (/admin/pages) — create custom pages that appear at /[slug]. Reserved slugs protected.
• Images upload to Cloudinary, auto-deleted when content is deleted

ADMIN FLOWS:
1. Make a blog → /admin/blogs/create → type title (slug auto-fills) → write in TipTap → upload cover image → fill excerpt + meta title/desc → save
2. Add image in blog → in TipTap editor, click image icon → select file → auto-uploads to Cloudinary → appears in editor
3. SEO setup → in create/edit form, set Meta Title & Meta Description fields → Next.js generateMetadata() auto-creates OG/Twitter tags
4. Create a page → /admin/pages/create → fill title, slug, content → appears at /[slug] automatically
5. Edit/delete → /admin/blogs or /admin/pages → click pencil (edit) or trash (delete) button

RULES:
- If user asks about admin features, answer with clear step-by-step flow
- If someone who is NOT admin asks admin questions, say: "Admin features are restricted to authorized users only."
- Keep answers fast and practical — give direct steps, not explanations`
}