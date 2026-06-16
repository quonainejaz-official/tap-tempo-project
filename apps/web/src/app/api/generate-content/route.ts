import OpenAI from "openai"

export async function POST(req: Request) {
  const { prompt, type, includeImages } = await req.json()

  const apiKey = process.env.OPencode_API_KEY
  const baseUrl = process.env.OPencode_API_BASE_URL || "https://opencode.ai/zen/v1"
  const model = process.env.OPencode_MODEL || "big-pickle"

  if (!apiKey) {
    return Response.json({ error: "API key not configured" }, { status: 500 })
  }

  const client = new OpenAI({ apiKey, baseURL: baseUrl })

  const systemPrompt = buildSystemPrompt(type, includeImages)

  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 4096,
  })

  const text = response.choices?.[0]?.message?.content || ""

  // Try to extract JSON from the response
  try {
    // Find JSON object in the response (in case there's extra text)
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      return Response.json({
        title: parsed.title || "",
        slug: parsed.slug || "",
        excerpt: parsed.excerpt || "",
        metaTitle: parsed.metaTitle || "",
        metaDescription: parsed.metaDescription || "",
        content: parsed.content || "",
      })
    }
  } catch {
    // If JSON parsing fails, return the raw text as content
  }

  return Response.json({
    title: "",
    slug: "",
    excerpt: "",
    metaTitle: "",
    metaDescription: "",
    content: text,
  })
}

function buildSystemPrompt(type: string, includeImages: boolean): string {
  const imageInstruction = includeImages
    ? `INCLUDE IMAGES: Add relevant <img> tags with src="https://placehold.co/800x400/1a1a2e/ffffff?text=Descriptive+Alt+Text" and descriptive alt attributes. Use placehold.co URLs with relevant text.`
    : `NO IMAGES: Do NOT include any <img> tags. Focus purely on text content with headings, lists, and paragraphs.`

  const common = `You are a content writer for TheTapTempo website — a BPM toolkit for musicians, producers & DJs.

## WEBSITE THEME & STYLING
- Font: Instrument Serif for headings (font-serif), DM Sans for body (font-sans), JetBrains Mono for code/data (font-mono)
- Design: Clean, minimal, Apple-caliber UI. Dark mode available.
- Color: Uses CSS variables — bg-background, text-foreground, text-muted-foreground, border-border, bg-card, text-primary
- Content area uses prose prose-lg dark:prose-invert classes

${imageInstruction}

## SITE CONTEXT
The website provides these tools: Tap Tempo (tap-based BPM calculation), Metronome (Web Audio), BPM Calculator, BPM to ms converter, Delay Time Calculator, Tempo Markings reference, Beats Per Bar visualizer.

Any generated content should naturally fit alongside these tools — educate visitors on tempo, rhythm, and music production concepts while maintaining the site's authoritative but approachable voice.

## OUTPUT FORMAT
You MUST respond with a valid JSON object only (no markdown, no code fences, no extra text). Use this exact structure:

${type === "page" ? JSON.stringify({
  title: "Generated Page Title",
  slug: "generated-page-slug",
  metaTitle: "SEO Meta Title for the page",
  metaDescription: "A brief SEO meta description for the page",
  content: "<h1>Page Heading</h1><p>HTML content here...</p>"
}, null, 2) : JSON.stringify({
  title: "Generated Blog Post Title",
  slug: "generated-blog-post-slug",
  excerpt: "A brief excerpt/summary of the blog post (under 160 chars for SEO)",
  metaTitle: "SEO Meta Title for the blog post",
  metaDescription: "SEO Meta description for the blog post",
  content: "<h1>Blog Post Heading</h1><p>HTML content here...</p>"
}, null, 2)}

## CONTENT RULES

${type === "page"
  ? `Generate page content with:
  - A main heading (h1) describing the topic
  - Well-structured sections with h2/h3 subheadings
  - Paragraphs, lists (ul/ol) where appropriate
  - A clean conclusion section
  - Keep tone informative and professional`
  : `Generate blog post content with:
  - A compelling introductory paragraph setting up the topic
  - Multiple sections with h2/h3 subheadings exploring the topic in depth
  - Bullet or numbered lists where listing concepts or steps
  - A concluding section wrapping up key takeaways
  - SEO-optimized: use natural keyword placement related to BPM/tempo/music production
  - Keep tone educational but accessible to musicians of all levels
  - Aim for 800-1500 words of substantive content`
}

## HTML FORMAT RULES
- Use only: <h1>, <h2>, <h3>, <p>, <ul>, <ol>, <li>, <blockquote>, <pre><code>, <strong>, <em>, <hr>, <img> tags
- Do NOT use html, head, body, or doctype tags
- Use consistent heading hierarchy (don't skip levels)
- Keep paragraphs 3-5 sentences max
- Use <strong> for emphasis, <em> for italic, never use inline styles
- Lists should have meaningful content in each item
- For slug: derive from title — lowercase, replace spaces/special chars with hyphens, remove leading/trailing hyphens
- For excerpt: write a compelling 1-2 sentence summary under 160 characters
- For metaTitle: keep under 60 characters, include relevant keywords
- For metaDescription: keep under 160 characters, summarize what the content covers`

  return common
}
