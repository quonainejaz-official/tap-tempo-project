import OpenAI from "openai"
import { requireAdmin } from "@/lib/auth"
import { generateContentSchema } from "@/lib/validation"
import { readJson, HttpError } from "@/lib/request"
import { checkRateLimit } from "@/lib/rate-limit"
import { getClientIp } from "@/lib/ip"
import { sanitizeHtml } from "@/lib/sanitize"

export async function POST(req: Request) {
  const authError = await requireAdmin(req)
  if (authError) return authError

  const ip = getClientIp(req)
  const limiter = await checkRateLimit(`generate-content:${ip}`, 20, 60 * 60 * 1000)
  if (!limiter.ok) {
    return Response.json(
      { error: "Rate limit exceeded. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limiter.retryAfterSeconds) } },
    )
  }

  try {
    const body = await readJson(req, 15_000)
    const parsed = generateContentSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ error: "Invalid request format" }, { status: 400 })
    }

    const { prompt, type, includeImages } = parsed.data
    const apiKey = process.env.OPencode_API_KEY
    const baseUrl = process.env.OPencode_API_BASE_URL || "https://opencode.ai/zen/v1"
    const model = process.env.OPencode_MODEL || "big-pickle"

    if (!apiKey) {
      return Response.json({ error: "API key not configured" }, { status: 500 })
    }

    const client = new OpenAI({ apiKey, baseURL: baseUrl })

    const stream = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: buildSystemPrompt(type, includeImages ?? false) },
        { role: "user", content: prompt },
      ],
      max_tokens: 16384,
      stream: true,
    })

    let fullContent = ""
    for await (const chunk of stream) {
      const text = chunk.choices?.[0]?.delta?.content
      if (text) fullContent += text
    }

    if (!fullContent) {
      return Response.json({
        error: "AI returned empty response after streaming",
      }, { status: 500 })
    }

    const jsonMatch = fullContent.match(/\{[\s\S]*\}/m)
    if (jsonMatch) {
      try {
        const parsedJson = JSON.parse(jsonMatch[0])
        if (parsedJson.content) {
          return Response.json({
            title: parsedJson.title || "",
            slug: parsedJson.slug || "",
            excerpt: parsedJson.excerpt || "",
            metaTitle: parsedJson.metaTitle || "",
            metaDescription: parsedJson.metaDescription || "",
            content: sanitizeHtml(parsedJson.content),
          })
        }
      } catch {
        // JSON parse failed — return raw text as content
      }
    }

    return Response.json({
      title: "",
      slug: "",
      excerpt: "",
      metaTitle: "",
      metaDescription: "",
      content: sanitizeHtml(fullContent),
    })
  } catch (err) {
    if (err instanceof HttpError) {
      return Response.json({ error: err.message }, { status: err.status })
    }
    const message = err instanceof Error ? err.message : "Unknown error"
    console.error("Generate content error:", err)
    return Response.json({ error: message }, { status: 500 })
  }
}

function buildSystemPrompt(type: string, includeImages: boolean): string {
  const imageInstruction = includeImages
    ? `INCLUDE IMAGES: Add relevant <img> tags with src="https://placehold.co/800x400/1a1a2e/ffffff?text=Descriptive+Alt+Text" and descriptive alt attributes.`
    : `NO IMAGES: Do NOT include any <img> tags.`

  const example = type === "page"
    ? `{"title":"Page Title","slug":"page-title","metaTitle":"SEO Title","metaDescription":"SEO desc","content":"<h1>...</h1><p>...</p>"}`
    : `{"title":"Blog Title","slug":"blog-title","excerpt":"Summary...","metaTitle":"SEO Title","metaDescription":"SEO desc","content":"<h1>...</h1><p>...</p>"}`

  return `You are a content writer for TheTapTempo website — a BPM toolkit for musicians.

${imageInstruction}

## OUTPUT FORMAT
Respond with ONLY a JSON object (no markdown, no code fences, no extra text):
${example}

## SITE CONTEXT
Tools: Tap Tempo, Metronome, BPM Calculator, BPM to ms, Delay Time Calculator, Tempo Markings, Beats Per Bar.

## CONTENT
${type === "page"
  ? "Generate a complete page with h1, h2/h3 sections, paragraphs, lists, and a conclusion."
  : "Generate a blog post (800-1500 words) with intro, h2/h3 sections, lists, and conclusion."}

## HTML
Use only: <h1>,<h2>,<h3>,<p>,<ul>,<ol>,<li>,<blockquote>,<pre><code>,<strong>,<em>,<hr>${includeImages ? ",<img>" : ""}
No html/head/body tags. Keep paragraphs 3-5 sentences. No inline styles.

## FIELDS
- slug: lowercase, hyphens, no leading/trailing hyphens
- excerpt: 1-2 sentences, under 160 chars
- metaTitle: under 60 chars
- metaDescription: under 160 chars`
}