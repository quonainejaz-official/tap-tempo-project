# TheTapTempo — OpenCode Instructions

## Entry Point
Read the full handbook at the start of every session:
`TheTapTempo Master Engineering, SEO & Publishing Handbook.md`

It is the single source of truth for all development decisions.

## Core Rules (summary — consult handbook for details)

### 1. Never Break Existing Functionality
Existing approved functionality has priority over new features. Before any change, determine what currently works, preserve it, and never introduce regressions.

### 2. Decision Engine (Part 3)
Every request must pass through this sequence:
1. **Read** the entire request
2. **Understand** the objective
3. **Categorise** affected systems
4. **Analyse** existing state
5. **Assess** risk
6. **Verify** scope
7. **Plan** implementation
8. **Implement**
9. **Validate**

### 3. Scope Discipline
Implement only the requested change. Never perform unrelated improvements, silently refactor, or optimise unrelated systems.

### 4. Existing Function Protection
Before modifying any file: determine why it exists, what depends on it, and whether changes affect other pages. If uncertain: stop and ask.

### 5. Regression Prevention
Every completed task must preserve: UI, SEO, Routing, Rendering, CMS, Performance, Accessibility.

### 6. Single Source of Truth
One blog renderer, one author component, one card component, one metadata system. Never duplicate implementations.

### 7. Content Authority
Never rewrite, expand, shorten, or modify approved content. Render it as-is. Editorial authority belongs to the project owner.

### 8. Permanent Principles (Part 1)
- Never break existing functionality
- One source of truth
- Consistency over creativity
- User first
- Simplicity
- Scalability
- Maintainability

### 9. When to Read the Handbook
- **Full handbook**: architectural decisions, SEO changes, publishing, design changes, new features
- **Part 6 §31 (Hardcoded Blog Workflow)**: every hardcoded blog article — image upload to Cloudinary, file creation, homepage manifest update, sitemap update
- **Part 6 (Publishing)**: every article workflow
- **Part 5 (SEO)**: any metadata, schema, or indexing change
- **Part 7 (Design)**: UI/component work
- **Part 8 (QA)**: before deployment
- **Part 9 (Operations)**: when uncertain about approach

### 10. Hardcoded Blog Workflow (Quick Reference)
When user says "upload blog" or "publish article":
1. User provides: slug, meta title, meta description, content, internal links, images in `blog_pics/`, alt text, image positions
2. Upload images from `blog_pics/` to Cloudinary, insert Cloudinary URLs at specified positions with alt text
3. Create hardcoded article file with all metadata, schema, SEO tags
4. Update blog manifest (for homepage Latest Guides + blog listing)
5. Update sitemap to include new article URL
6. Present for design approval
7. User deletes local images from `blog_pics/` after confirmation

When user says "delete blog":
1. Delete the article file
2. Delete associated images from Cloudinary via API
3. Update blog manifest and sitemap

### 11. If Unsure
If a request is ambiguous, incomplete, technically risky, or outside the handbook:
- **Stop**
- Analyse what's missing
- Ask concise clarification questions
- Wait for the user's response

Never guess, never invent requirements, never assume intent.
