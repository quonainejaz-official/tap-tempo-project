/**
 * SEO Deployment Check — permanent pre-deploy QA for TheTapTempo
 *
 * Runs as part of `vercel-build` / `build`. Exits with code 1 on failures.
 * Prints a summary report at the end.
 *
 * Usage:  node scripts/seo-deploy-check.js
 */

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

// ── Config ──────────────────────────────────────────────────────────
const APP_DIR = path.resolve(__dirname, "..", "src", "app")
const COMP_DIR = path.resolve(__dirname, "..", "src", "components")
const ROOT = path.resolve(__dirname, "..")

const SEP = path.sep // handle both \\ and /
const REQUIRED_FOOTER_LINKS = [
  "/blog", "/editorial-team", "/editorial-policy",
  "/privacy-policy", "/terms", "/contact",
]

const STATIC_PAGE_SLUGS = [
  "about", "contact", "privacy-policy", "terms",
  "editorial-team", "editorial-policy",
]

const RESULTS = { pass: [], warn: [], fail: [] }

function pass(msg) { RESULTS.pass.push(msg); console.log(`  ✓ ${msg}`) }
function warn(msg) { RESULTS.warn.push(msg); console.log(`  ⚠ ${msg}`) }
function fail(msg) { RESULTS.fail.push(msg); console.log(`  ✗ ${msg}`) }

function heading(label) {
  console.log(`\n── ${label} ${"─".repeat(Math.max(0, 60 - label.length))}`)
}

// ── Helpers ─────────────────────────────────────────────────────────
/** Normalize path separators to / for consistent filtering */
function norm(p) { return p.split(SEP).join("/") }

function readFile(p) {
  try { return fs.readFileSync(p, "utf8") } catch { return null }
}

function glob(dir, pattern) {
  const entries = []
  function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, e.name)
      if (e.isDirectory() && e.name !== "node_modules" && !e.name.startsWith(".")) walk(full)
      else if (e.isFile() && e.name.endsWith(pattern)) entries.push(full)
    }
  }
  walk(dir)
  return entries
}

// ── 1. Sitemap ─────────────────────────────────────────────────────
function checkSitemap() {
  heading("Sitemap")

  const sitemapPath = path.join(APP_DIR, "sitemap.ts")
  if (!fs.existsSync(sitemapPath)) { fail("sitemap.ts not found"); return }
  pass("sitemap.ts exists")

  const sitemapContent = readFile(sitemapPath)
  const missing = STATIC_PAGE_SLUGS.filter(
    (s) => !sitemapContent.includes(`${s}`)
  )
  if (missing.length) {
    fail(`sitemap.ts missing static pages: ${missing.join(", ")}`)
  } else {
    pass("All static pages declared in sitemap.ts")
  }

  // Check priority/changeFrequency presence
  if (!sitemapContent.includes("priority")) {
    warn("sitemap.ts missing priority on some entries")
  }
  if (!sitemapContent.includes("changeFrequency")) {
    warn("sitemap.ts missing changeFrequency on some entries")
  }
}

// ── 2. robots.txt ──────────────────────────────────────────────────
function checkRobots() {
  heading("robots.txt")

  const robotsPath = path.join(APP_DIR, "robots.ts")
  if (!fs.existsSync(robotsPath)) {
    fail("robots.ts not found — create via Next.js Metadata Route Handler")
    return
  }
  pass("robots.ts exists")

  const content = readFile(robotsPath)
  if (content.includes("sitemap:")) {
    pass("Sitemap location declared in robots.ts")
  } else {
    fail("robots.ts missing sitemap declaration")
  }

  // Ensure important paths are not blocked
  const disallowMatch = content.match(/disallow:\s*\[([^\]]*)\]/)
  if (disallowMatch) {
    const blocked = disallowMatch[1]
    const blockedImportant = ["/blog", "/tap-tempo", "/editorial"].filter(
      (p) => blocked.includes(p)
    )
    if (blockedImportant.length) {
      fail(`robots.ts blocks important paths: ${blockedImportant.join(", ")}`)
    } else {
      pass("No important paths blocked in robots.ts")
    }
  }
}

// ── 3. Metadata Validation ─────────────────────────────────────────
function checkMetadata() {
  heading("Metadata")

  const layouts = glob(APP_DIR, "layout.tsx")
  const pages = glob(APP_DIR, "page.tsx")

  // Check every static page layout has metadata export
  const staticLayouts = layouts.filter(
    (l) => !norm(l).includes("/[slug]") && !norm(l).includes("/api/") && !norm(l).includes("/admin/")
  )

  let checked = 0
  for (const layout of staticLayouts) {
    const content = readFile(layout)
    const relPath = path.relative(APP_DIR, layout)

    if (!content.includes("export const metadata")) {
      fail(`${relPath}: missing metadata export`)
      continue
    }
    if (!content.includes("title:")) warn(`${relPath}: metadata missing title`)
    if (!content.includes("description:")) warn(`${relPath}: metadata missing description`)
    if (!content.includes("canonical")) warn(`${relPath}: metadata missing canonical`)
    if (!content.includes("openGraph")) warn(`${relPath}: metadata missing openGraph`)
    if (!content.includes("twitter")) warn(`${relPath}: metadata missing twitter card`)
    checked++
  }

  if (checked > 0) {
    pass(`Metadata validated on ${checked} static layouts`)
  } else {
    warn("No static layouts found for metadata validation")
  }

  // Check blog page has metadata
  const blogDir = path.join(APP_DIR, "blog", "[slug]")
  const blogLayout = path.join(blogDir, "page.tsx")
  if (fs.existsSync(blogLayout)) {
    const content = readFile(blogLayout)
    if (content.includes("generateMetadata")) {
      pass("Blog [slug] has generateMetadata function")
    } else {
      warn("Blog [slug] missing generateMetadata")
    }
  }
}

// ── 4. Structured Data ─────────────────────────────────────────────
function checkStructuredData() {
  heading("Structured Data")

  const layouts = glob(APP_DIR, "layout.tsx")
  let schemaCount = 0

  for (const layout of layouts) {
    const n = norm(layout)
    if (n.includes("/[slug]") || n.includes("/api/") || n.includes("/admin/")) continue
    const content = readFile(layout)
    const relPath = path.relative(APP_DIR, layout)

    if (content.includes("application/ld+json")) {
      // Check for required schema types
      const schemas = ["WebPage", "BreadcrumbList", "Organization"]
      for (const s of schemas) {
        if (!content.includes(`"@type": "${s}"`) && !content.includes(`"@type":"${s}"`)) {
          warn(`${relPath}: JSON-LD missing ${s} schema`)
        }
      }
      schemaCount++
    } else {
      warn(`${relPath}: no JSON-LD script found`)
    }
  }

  if (schemaCount > 0) {
    pass(`Structured data checked on ${schemaCount} layouts`)
  }
}

// ── 5. Internal Link Audit ─────────────────────────────────────────
function checkInternalLinks() {
  heading("Internal Links")

  const pageFiles = glob(APP_DIR, "page.tsx")
  let totalLinks = 0
  let brokenRefs = []

  for (const file of pageFiles) {
    if (norm(file).includes("/api/") || norm(file).includes("/admin/")) continue
    const content = readFile(file)
    const relPath = path.relative(APP_DIR, file)

    // Match href="/..." or href={`/...
    const links = content.matchAll(/href="\/([^"]+)"/g)
    for (const match of links) {
      totalLinks++
      const linkPath = match[1].split(/[?#]/)[0] // strip query/hash
      // Skip external protocols and known dynamic patterns
      if (linkPath.startsWith("http") || linkPath.includes("${") || linkPath.includes("{") || linkPath === "") continue
      // Check if target file exists
      const targetPage = path.join(APP_DIR, linkPath, "page.tsx")
      const targetDir = path.join(APP_DIR, linkPath)
      if (!fs.existsSync(targetPage) && !fs.existsSync(targetDir)) {
        // Might be a blog slug — skip dynamic routes
        if (!linkPath.startsWith("blog/")) {
          brokenRefs.push(`${relPath} → /${linkPath}`)
        }
      }
    }
  }

  if (brokenRefs.length) {
    fail(`Broken internal links found (${brokenRefs.length}):`)
    brokenRefs.slice(0, 5).forEach((r) => console.log(`       ${r}`))
  } else {
    pass(`Internal links scanned (${totalLinks} checked)`)
  }
}

// ── 6. Image Optimization ──────────────────────────────────────────
function checkImages() {
  heading("Images")

  const pageFiles = glob(APP_DIR, ".tsx")
  const componentFiles = glob(COMP_DIR, ".tsx")
  const allFiles = [...pageFiles, ...componentFiles]
  let imgCount = 0
  let issues = []

  for (const file of allFiles) {
    const content = readFile(file)
    const relPath = path.relative(ROOT, file)

    // Check for <img> without 'next/image'
    const imgTags = content.match(/<img\b/g)
    if (imgTags) {
      issues.push(`${relPath}: ${imgTags.length} <img> tag(s) — consider next/image`)
      imgCount += imgTags.length
    }

    // Check next/image for alt text
    const nextImages = content.matchAll(/<Image\b([^>]*)>/g)
    for (const match of nextImages) {
      const attrs = match[1]
      if (!attrs.includes("alt=")) {
        issues.push(`${relPath}: <Image> missing alt text`)
      }
      if (!attrs.includes("loading=") && !attrs.includes("priority")) {
        // Not a hard fail — images default to lazy
      }
    }
  }

  if (issues.length) {
    issues.slice(0, 5).forEach((i) => warn(i))
    if (issues.length > 5) warn(`... and ${issues.length - 5} more image issues`)
  } else {
    pass("No image issues detected")
  }
}

// ── 7. Accessibility Basics ────────────────────────────────────────
function checkAccessibility() {
  heading("Accessibility")

  const pageFiles = glob(APP_DIR, "page.tsx")
  let h1Count = 0
  let multipleH1 = []

  for (const file of pageFiles) {
    if (norm(file).includes("/api/") || norm(file).includes("/admin/")) continue
    const content = readFile(file)
    const relPath = path.relative(APP_DIR, file)
    const h1s = (content.match(/<h1\b/g) || []).length

    // Homepage H1 lives in home-page-content.tsx, not page.tsx — skip false positive
    if (relPath === "page.tsx" || norm(relPath).startsWith("page.tsx")) continue

    if (h1s === 0) {
      warn(`${relPath}: missing H1`)
    } else if (h1s > 1) {
      multipleH1.push(relPath)
    }
    h1Count += h1s
  }

  if (multipleH1.length) {
    fail(`Multiple H1s found in: ${multipleH1.join(", ")}`)
  } else if (h1Count > 0) {
    pass("Heading hierarchy check passed")
  }
}

// ── 8. Technical SEO ───────────────────────────────────────────────
function checkTechnicalSEO() {
  heading("Technical SEO")

  const layouts = glob(APP_DIR, "layout.tsx")

  for (const layout of layouts) {
    const n = norm(layout)
    if (n.includes("/[slug]") || n.includes("/api/") || n.includes("/admin/")) continue
    const content = readFile(layout)
    const relPath = path.relative(APP_DIR, layout)

    // Root layout doesn't need per-page canonical — it's inherited by child pages
    if (relPath === "layout.tsx") continue

    // Check canonical
    if (!content.includes("canonical")) warn(`${relPath}: missing canonical URL`)
    // Check robots
    if (content.includes("noindex")) warn(`${relPath}: has noindex directive`)
  }

  pass("Technical SEO checks complete")
}

// ── 9. TypeScript Check ────────────────────────────────────────────
function checkTypeScript() {
  heading("TypeScript")

  try {
    execSync("npx tsc --noEmit 2>&1", { cwd: ROOT, encoding: "utf8", timeout: 120000 })
    pass("TypeScript check passed")
  } catch (e) {
    fail("TypeScript errors detected")
    const out = e.stdout || e.message || ""
    console.log(out.slice(0, 500))
  }
}

// ── 10. Homepage ───────────────────────────────────────────────────
function checkHomepage() {
  heading("Homepage")

  const hp = readFile(path.join(APP_DIR, "home-page-content.tsx"))
  if (!hp) { fail("home-page-content.tsx not found"); return }

  if (hp.includes(`id="tools"`)) pass("Tools section has id='tools' anchor")
  else warn("Tools section missing id='tools' anchor")

  if (hp.includes("/api/blogs?limit=3")) pass("Latest Guides fetches latest 3 posts dynamically")
  else warn("Latest Guides section not found or not dynamic")

  if (hp.includes("Why Trust TheTapTempo")) pass("Why Trust section present")
  else warn("Why Trust section missing")
}

// ── 11. Footer ─────────────────────────────────────────────────────
function checkFooter() {
  heading("Footer")

  const footer = readFile(path.join(COMP_DIR, "footer.tsx"))
  if (!footer) { fail("footer.tsx not found"); return }
  pass("footer.tsx exists")

  const missing = REQUIRED_FOOTER_LINKS.filter(
    (link) => !footer.includes(`href: "${link}"`)
  )
  if (missing.length) {
    fail(`Footer missing links: ${missing.join(", ")}`)
  } else {
    pass("All required footer links present")
  }

  if (footer.includes("/api/blogs?limit=4")) pass("Popular Guides dynamically fetches latest posts")
  else warn("Popular Guides dynamic fetch missing")
}

// ── 12. Author System ──────────────────────────────────────────────
function checkAuthorSystem() {
  heading("Author System")

  const blogPage = readFile(path.join(APP_DIR, "blog", "[slug]", "page.tsx"))
  if (!blogPage) { fail("Blog [slug]/page.tsx not found"); return }
  pass("Blog template exists")

  if (blogPage.includes("AuthorBio")) pass("AuthorBio component imported")
  else fail("AuthorBio not imported in blog template")

  if (blogPage.includes("<AuthorBio")) pass("AuthorBio rendered in blog template")
  else fail("AuthorBio not rendered in blog template")

  const authorBio = readFile(path.join(COMP_DIR, "author-bio.tsx"))
  if (!authorBio) { fail("author-bio.tsx not found"); return }

  if (authorBio.includes('/editorial-team')) pass("Author links to /editorial-team")
  else fail("Author missing /editorial-team link")

  if (authorBio.includes('/editorial-policy')) pass("Author links to /editorial-policy")
  else fail("Author missing /editorial-policy link")

  if (authorBio.includes("TheTapTempo Editorial Team")) pass("Author name is 'TheTapTempo Editorial Team'")
  else warn("Author name may not match expected brand")
}

// ── 13. Report ─────────────────────────────────────────────────────
function printReport() {
  const total = RESULTS.pass.length + RESULTS.warn.length + RESULTS.fail.length
  heading("SEO Deployment Report")

  const status = RESULTS.fail.length === 0 ? "✓" : "✗"
  console.log(`\n  ${status} SEO Deployment Check Complete\n`)

  const checks = [
    ["Sitemap Updated", RESULTS.pass.some((r) => r.includes("sitemap"))],
    ["Robots.txt Verified", RESULTS.pass.some((r) => r.includes("robots"))],
    ["Metadata Valid", RESULTS.pass.some((r) => r.includes("Metadata validated"))],
    ["Canonical URLs Valid", RESULTS.pass.some((r) => r.includes("Technical SEO"))],
    ["Structured Data Valid", RESULTS.pass.some((r) => r.includes("Structured data"))],
    ["Internal Links Passed", RESULTS.pass.some((r) => r.includes("Internal links scanned"))],
    ["Images Optimized", RESULTS.pass.some((r) => r.includes("No image issues"))],
    ["Homepage Updated", RESULTS.pass.some((r) => r.includes("Homepage"))],
    ["Footer Valid", RESULTS.pass.some((r) => r.includes("All required footer"))],
    ["Author Information Valid", RESULTS.pass.some((r) => r.includes("AuthorBio"))],
    ["Accessibility Passed", RESULTS.pass.some((r) => r.includes("Heading hierarchy"))],
    ["TypeScript Passed", RESULTS.pass.some((r) => r.includes("TypeScript check passed"))],
  ]

  for (const [name, ok] of checks) {
    console.log(`  ${ok ? "✓" : "—"} ${name}`)
  }

  console.log(`\n  Summary: ${RESULTS.pass.length} passed, ${RESULTS.warn.length} warnings, ${RESULTS.fail.length} failures`)
  console.log(`  Status: ${RESULTS.fail.length === 0 ? "Ready for Google Search Console Indexing" : "Issues detected — review before deploying"}\n`)
}

// ── Main ───────────────────────────────────────────────────────────
async function main() {
  console.log("\n══════════════════════════════════════════════════════")
  console.log("  SEO Deployment Check — TheTapTempo")
  console.log("══════════════════════════════════════════════════════")

  checkSitemap()
  checkRobots()
  checkMetadata()
  checkStructuredData()
  checkInternalLinks()
  checkImages()
  checkAccessibility()
  checkTechnicalSEO()
  checkHomepage()
  checkFooter()
  checkAuthorSystem()

  // Build and TS - comment these out for quick checks, uncomment for full deploy
  checkTypeScript()

  printReport()

  // Exit with error if any failures
  if (RESULTS.fail.length > 0) {
    console.error(`\n  ✗ ${RESULTS.fail.length} failure(s) detected — fix before deploying\n`)
    process.exit(1)
  }

  process.exit(0)
}

main().catch((err) => {
  console.error("SEO check error:", err)
  process.exit(1)
})
