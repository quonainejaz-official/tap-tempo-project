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

  return Response.json({ content: text })
}

function buildSystemPrompt(type: string, includeImages: boolean): string {
  const imageInstruction = includeImages
    ? `INCLUDE IMAGES: Add relevant <img> tags with src="https://placehold.co/800x400/1a1a2e/ffffff?text=Descriptive+Alt+Text" and descriptive alt attributes. Use placehold.co URLs with relevant text.`
    : `NO IMAGES: Do NOT include any <img> tags. Focus purely on text content with headings, lists, and paragraphs.`

  return `You are a content writer for TheTapTempo website — a BPM toolkit for musicians, producers & DJs.

## WEBSITE THEME & STYLING
- Font: Instrument Serif for headings (font-serif), DM Sans for body (font-sans), JetBrains Mono for code/data (font-mono)
- Design: Clean, minimal, Apple-caliber UI. Dark mode available.
- Color: Uses CSS variables — bg-background, text-foreground, text-muted-foreground, border-border, bg-card, text-primary
- Content area uses prose prose-lg dark:prose-invert classes

${imageInstruction}

## CONTENT TYPE: ${type === "page" ? "PAGE" : "BLOG POST"}

${type === "page"
  ? `Generate a complete page with:
  - A main heading (h1) describing the topic
  - Well-structured sections with h2/h3 subheadings
  - Paragraphs, lists (ul/ol) where appropriate
  - A clean conclusion section
  - Keep tone informative and professional
  - Output pure HTML that would work inside a TipTap rich editor (use <h1>, <h2>, <h3>, <p>, <ul>, <ol>, <li>, <blockquote>, <pre><code>, <strong>, <em>, <hr> tags)
  - Do NOT use html, head, body, or doctype tags
  - Do NOT wrap in markdown code blocks — output raw HTML only`
  : `Generate a complete blog post with:
  - A compelling introductory paragraph setting up the topic
  - Multiple sections with h2/h3 subheadings exploring the topic in depth
  - Bullet or numbered lists where listing concepts or steps
  - A concluding section wrapping up key takeaways
  - SEO-optimized: use natural keyword placement related to BPM/tempo/music production
  - Keep tone educational but accessible to musicians of all levels
  - Output pure HTML that would work inside a TipTap rich editor (use <h1>, <h2>, <h3>, <p>, <ul>, <ol>, <li>, <blockquote>, <pre><code>, <strong>, <em>, <hr> tags)
  - Do NOT use html, head, body, or doctype tags
  - Do NOT wrap in markdown code blocks — output raw HTML only
  - Aim for 800-1500 words of substantive content`
}

## SITE CONTEXT
The website provides these tools: Tap Tempo (tap-based BPM calculation), Metronome (Web Audio), BPM Calculator, BPM to ms converter, Delay Time Calculator, Tempo Markings reference, Beats Per Bar visualizer.

Any generated content should naturally fit alongside these tools — educate visitors on tempo, rhythm, and music production concepts while maintaining the site's authoritative but approachable voice.

## FORMAT RULES
- Output ONLY the HTML content — no explanations, no markdown wrappers, no code fences
- First line should be an <h1> or <h2> heading
- Use consistent heading hierarchy (don't skip levels)
- Keep paragraphs reasonably sized (3-5 sentences max)
- Use <strong> for emphasis, <em> for italic, never use inline styles
- Lists should have meaningful content in each item`
}
