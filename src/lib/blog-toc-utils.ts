export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/&[^;]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function extractH2Headings(html: string): { text: string; id: string }[] {
  const regex = /<h2[^>]*>(.*?)<\/h2>/g
  const headings: { text: string; id: string }[] = []
  let match
  while ((match = regex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, "").trim()
    const id = slugify(text)
    headings.push({ text, id })
  }
  return headings
}

export function injectHeadingIds(html: string): string {
  return html.replace(/<h2[^>]*>(.*?)<\/h2>/g, (match, content) => {
    if (/id\s*=/.test(match)) return match
    const text = content.replace(/<[^>]*>/g, "").trim()
    const id = slugify(text)
    return `<h2 id="${id}">${content}</h2>`
  })
}
