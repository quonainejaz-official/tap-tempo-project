# SEO Audit Report — TheTapTempo

**Date:** 2026-09-08
**Scope:** 4-item technical/SEO audit + deploy-gate verification (`npm run typecheck`, `node scripts/seo-deploy-check.js`)

## Status Summary

| Item | Status |
| --- | --- |
| FIX 1 — Blog post title-suffix cleanup (`blog/[slug]/page.tsx`) | Done (verified intact) |
| FIX 2 — Organization `sameAs` schema (`layout.tsx`) | Done (verified intact) |
| FIX 3 — Sitemap additions (redirect + text endpoint) | Intentional skip (no code change) |
| FIX 4 — Structured data on 3 metronome variant pages | Done |
| New finding — 3 broken internal links to `/beats-per-bar` | Reported only (blocks `npm run build`) |
| TypeScript | Passed |
| seo-deploy-check | 23 passed / 37 warnings / **1 failure** (the broken links above) |

---

## FIX 1 — Blog post title-suffix cleanup — Done (verified intact)

`src/app/blog/[slug]/page.tsx` (`generateMetadata`) now strips a trailing ` | TheTapTempo` from blog titles so the suffix is not duplicated when the root layout appends it:

```ts
title: (meta.metaTitle || meta.title).replace(/\s*\|\s*TheTapTempo\s*$/i, ""),
```

Status: present in the working tree (uncommitted), untouched by the FIX 3 / FIX 4 changes in this session.

## FIX 2 — Organization `sameAs` schema — Done (verified intact)

`src/app/layout.tsx` — the `Organization` JSON-LD node includes a `sameAs` array of 10 official profiles (YouTube, LinkedIn, ProductHunt, X, Instagram, Crunchbase, Medium, Facebook, Trustpilot, SoundCloud). Status: present in the working tree (uncommitted), untouched by the FIX 3 / FIX 4 changes in this session.

### Correction notice

An earlier draft of this report described FIX 1 as "removing ~110 duplicated `title` lines including a 'Metronome with Submissions' typo." That description was inaccurate — **no such change was ever made.** Git confirms:

- The only working-tree change to `src/app/metronome-with-subdivisions/layout.tsx` is the FIX 4 block (`applicationCategory` → `Multimedia`, added `description`, added `FAQPage`) — 40 added / 1 removed line.
- The file's full commit history (`51e673d`, `8cac132`) shows it *never* contained ~110 duplicate `title` lines or the "Submissions" misspelling.
- Historical commit `8cac132` (Sep 1, authored by rankrizeseo) removed duplicated `| TheTapTempo` suffixes from only the OpenGraph/Twitter titles of that page — a separate, pre-existing change unrelated to this session.

Nothing was reverted because no unrequested change of that kind exists.

## FIX 3 — Sitemap additions — Intentional skip (no code change)

Per decision, neither of these two routes was added to `src/app/sitemap.ts`:

- **`/delay-time-calculator`** — a legacy 307-redirect to `/delay-reverb-time-calculator`, which is already in the sitemap. Listing a redirect URL triggers "URL is not accessible" / soft-404 warnings.
- **`/llms.txt`** — a `force-dynamic` plaintext endpoint, not an HTML page. Search engines flag non-HTML content in XML sitemaps.

Correct mechanisms if later needed: (a) no action — the canonical target is already listed; (b) link `llms.txt` from site documentation instead of the XML sitemap.

## FIX 4 — Structured data on 3 metronome variant pages — Done

Applied to all three `layout.tsx` files under `src/app/`:
- `metronome-with-subdivisions`
- `metronome-for-guitar-practice`
- `metronome-for-drummers`

Changes (identical structure, page-specific strings):

1. **`applicationCategory`: `"MusicApplication"` → `"Multimedia"`** — aligned with the 8 other tool pages (e.g. `/metronome`, `/tap-tempo`).
2. **Added `description`** to the existing `WebApplication` node — uses each page's exact meta description (previously absent).
3. **Added `FAQPage` schema** wrapping the 4 on-page questions/answers already rendered on each page — content wrapped verbatim (schema matches visible content, eligible for FAQ rich results).

Verified: `npm run typecheck` passes; FAQ text strings match the `page.tsx` `FaqItem` props exactly.

---

## New finding (reported only, pre-existing)

**3 broken internal links**, flagged as the single seo-check failure:

- `metronome-for-drummers/page.tsx:124` → `/beats-per-bar`
- `metronome-for-guitar-practice/page.tsx:114` → `/beats-per-bar`
- `metronome-with-subdivisions/page.tsx:68` → `/beats-per-bar`

The route does not exist — the correct route is `/beats-per-bar-calculator`.

**Impact:** `npm run build` runs `seo:check` first and exits with a failure until these are fixed.
**Decision:** reported only (do not fix in this pass). Recommended fix: change the three `href` values to `/beats-per-bar-calculator`.

---

## Remaining seo-check warnings (not addressed this round)

- Root `layout.tsx` metadata missing `canonical` (warning only).
- `WebPage` / `Organization` schema missing on most tool pages (warning only; outside this audit's 4 items).
- `<img>` tags in `admin/blogs/create` and `admin/blogs/[id]/edit` (consider `next/image`).
- `<Image>` missing `alt` in `ai-content-generator.tsx` and `rich-editor.tsx`.
- `delay-time-calculator/page.tsx` missing H1 (page is a redirect; flagged by checker).