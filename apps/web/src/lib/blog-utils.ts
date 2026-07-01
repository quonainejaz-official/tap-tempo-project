import { BASE_URL } from "./constants"

export interface TocHeading {
  id: string
  text: string
  level: number
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function extractHeadings(html: string): TocHeading[] {
  const headings: TocHeading[] = []
  const regex = /<h2(\s[^>]*)?>(.*?)<\/h2>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    const innerHtml = match[2]
    const text = innerHtml.replace(/<[^>]*>/g, "").trim()
    if (!text) continue
    const id = slugify(text)
    if (!headings.some((h) => h.id === id)) {
      headings.push({ id, text, level: 2 })
    }
  }
  return headings
}

export function addHeadingIds(html: string): string {
  const idCount: Record<string, number> = {}
  return html.replace(/<h([23])(\s[^>]*)?>(.*?)<\/h\1>/gi, (match, level, attrs, innerHtml) => {
    if (/id\s*=/i.test(attrs || "")) return match
    const text = innerHtml.replace(/<[^>]*>/g, "").trim()
    let id = slugify(text)
    if (!id) return match
    if (idCount[id] !== undefined) {
      idCount[id]++
      id = `${id}-${idCount[id]}`
    } else {
      idCount[id] = 0
    }
    return `<h${level} id="${id}"${attrs || ""}>${innerHtml}</h${level}>`
  })
}

export function processExternalLinks(html: string): string {
  return html.replace(/<a(\s[^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/gi, (match, before, href, after) => {
    try {
      const url = new URL(href)
      if (url.hostname === new URL(BASE_URL).hostname || url.hostname === "thetaptempo.com") {
        return match
      }
    } catch {
      return match
    }
    if (/target\s*=|rel\s*=/i.test(before + after)) return match
    return `<a${before}href="${href}" target="_blank" rel="noopener noreferrer"${after}>`
  })
}

function processImages(html: string): string {
  return html.replace(/<img\b([^>]*?)>/gi, (match, attrs) => {
    if (/loading\s*=/i.test(attrs)) return match
    return `<img${attrs} loading="lazy" decoding="async">`
  })
}

export function extractQuickAnswer(html: string): { quickAnswer: string | null; remainingHtml: string } {
  const regex = /<h2[^>]*>\s*Quick Answer\s*<\/h2>/i
  const match = regex.exec(html)
  if (!match) return { quickAnswer: null, remainingHtml: html }

  const headingEnd = match.index + match[0].length
  const afterHeading = html.slice(headingEnd)
  const nextH2 = afterHeading.match(/<h2\b/i)
  const sectionEnd = nextH2 ? nextH2.index! : afterHeading.length
  const quickAnswer = afterHeading.slice(0, sectionEnd).trim()
  const remainingHtml = html.slice(0, match.index) + afterHeading.slice(sectionEnd)

  return { quickAnswer: quickAnswer || null, remainingHtml }
}

function tryConvertToTable(sectionHtml: string): string | null {
  const liMatch = sectionHtml.match(/^<ul>[\s\S]*?<\/ul>$/i)
  const content = liMatch ? liMatch[0] : sectionHtml

  const rows: string[] = []
  const liPattern = /<li[^>]*>([\s\S]*?)<\/li>/gi
  const pPattern = /<p[^>]*>([\s\S]*?)<\/p>/gi
  let match

  if (liMatch) {
    while ((match = liPattern.exec(content)) !== null) {
      const row = parseLabelValue(match[1])
      if (row) rows.push(row)
    }
  } else {
    while ((match = pPattern.exec(content)) !== null) {
      if (/<strong\b/i.test(match[1])) {
        const row = parseLabelValue(match[1])
        if (row) rows.push(row)
      }
    }
  }

  if (rows.length === 0) return null

  return `<table class="comparison-table">
<thead><tr><th>Category</th><th>Details</th></tr></thead>
<tbody>
${rows.join("\n")}
</tbody>
</table>`
}

function parseLabelValue(html: string): string | null {
  const match = html.match(/<strong[^>]*>([\s\S]*?)<\/strong>\s*:?([\s\S]*)/i)
  if (!match) return null
  const label = match[1].replace(/<[^>]*>/g, "").trim()
  const value = match[2].replace(/<[^>]*>/g, "").trim()
  if (!label || !value) return null
  return `<tr><td>${label}</td><td>${value}</td></tr>`
}

function processComparisonTables(html: string): string {
  const sections = html.split(/(?=<h2\b)/i)
  const comparisonRegex = /<h2[^>]*>.*?(?:Comparison|Comparisons|vs\.?|Vs\.?)[^<]*<\/h2>/i

  return sections
    .map((section) => {
      if (!comparisonRegex.test(section)) return section
      const headingEnd = section.indexOf("</h2>")
      if (headingEnd === -1) return section
      const heading = section.slice(0, headingEnd + 5)
      const body = section.slice(headingEnd + 5)
      const table = tryConvertToTable(body)
      if (table) return heading + "\n" + table
      return section
    })
    .join("")
}

export function processBlogContent(html: string): {
  processedHtml: string
  headings: TocHeading[]
  quickAnswer: string | null
} {
  const { quickAnswer, remainingHtml } = extractQuickAnswer(html)
  const headings = extractHeadings(remainingHtml)
  let processed = addHeadingIds(remainingHtml)
  processed = processExternalLinks(processed)
  processed = processImages(processed)
  processed = processComparisonTables(processed)
  return { processedHtml: processed, headings, quickAnswer }
}
