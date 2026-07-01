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
  const regex = /<h([23])(\s[^>]*)?>(.*?)<\/h\1>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1])
    const innerHtml = match[3]
    const text = innerHtml.replace(/<[^>]*>/g, "").trim()
    if (!text) continue
    const id = slugify(text)
    if (!headings.some((h) => h.id === id)) {
      headings.push({ id, text, level })
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

export function processBlogContent(html: string): {
  processedHtml: string
  headings: TocHeading[]
} {
  const headings = extractHeadings(html)
  let processed = addHeadingIds(html)
  processed = processExternalLinks(processed)
  processed = processImages(processed)
  return { processedHtml: processed, headings }
}
