import DOMPurify from "isomorphic-dompurify"

const ALLOWED_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "br", "hr",
  "ul", "ol", "li",
  "blockquote", "pre", "code",
  "strong", "em", "b", "i", "u", "s", "del", "ins", "mark", "small", "sup", "sub",
  "a", "img",
  "table", "thead", "tbody", "tr", "th", "td",
  "figure", "figcaption",
  "div", "span",
  "dl", "dt", "dd",
]

const ALLOWED_ATTR = [
  "href", "target", "rel",
  "src", "alt", "title", "width", "height",
  "align",
  "type",
  "style",
]

const ALLOWED_URI_REGEXP = /^(?:(?:https?|mailto|tel):|#|\/)/i

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOWED_URI_REGEXP,
    ALLOW_DATA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false,
  })
}