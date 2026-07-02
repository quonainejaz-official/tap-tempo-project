**Issues to resolve before giving this to opencode.** 

## **2. Devours Your Entire Context Window** 

The Con: This handbook is massive (approx. 12,000–15,000 tokens). Most AI coding models have context windows of 32k to 200k tokens, but you need that space for your actual codebase files, error logs, and dependency trees. If you dump the entire handbook into the system prompt, OpenCode will "forget" your actual page.tsx or tailwind.config.js files halfway through the task because the handbook ate all the memory. 

The Fix: Do not put this in the System Prompt. Instead, save it as a HANDBOOK.md file in your project root. Then, in your OpenCode instructions, tell it: _"Read the_ HANDBOOK.md _only when making architectural decisions. Do not load it for routine coding."_ 

## **TheTapTempo Master Engineering, SEO & Publishing Handbook** 

## **Version 1.0** 

## **PART 1 — Foundation, Philosophy & Governance** 

## **1. Purpose** 

This handbook is the permanent operating manual for TheTapTempo. 

It defines how every part of the website must be designed, developed, maintained, published, expanded, and protected throughout the lifetime of the project. 

Legacy Code Policy 

Existing production code should not automatically be treated as incorrect simply because it differs from the current handbook. 

Legacy implementations must remain unchanged unless: 

- explicitly requested by the project owner 

or 

- they directly prevent implementation of the requested feature. 

Do not refactor production code solely to enforce handbook standards. 

It serves as the single source of truth for all future development. 

No technical, publishing, SEO, UI, CMS, or infrastructure decision should violate the rules defined in this handbook unless explicitly approved by the project owner. 

## **2. Project Mission** 

TheTapTempo exists to become the world's most trusted educational platform for tempo, rhythm, timing, BPM, metronomes, music practice, and music utility tools. 

Every technical and editorial decision must support this long-term objective. 

The website must prioritise: 

- User value 

- Accuracy 

- Simplicity 

- Performance 

- Scalability 

- Trust 

- Maintainability 

Short-term convenience must never compromise long-term quality. 

## **3. Core Philosophy** 

The website must always behave like a professional software product rather than a collection of independent pages. 

Every new feature must integrate naturally into the existing ecosystem. 

Every improvement must strengthen the website instead of creating inconsistencies. 

Consistency is more important than speed. 

Quality is more important than quantity. 

Stability is more important than unnecessary innovation. 

## **4. Permanent Principles** 

The following principles are permanent. 

They are not optional. 

Every future implementation must respect them. 

## **Principle 1 — Never Break Existing Functionality** 

Existing approved functionality has priority over new features. 

Before implementing any change: 

Determine what currently works. 

Preserve it. 

Never introduce regressions. 

## **Principle 2 — One Source of Truth** 

There must never be multiple competing implementations for the same feature. 

Every system should have one authoritative implementation. 

Duplicate logic should be eliminated. 

## **Principle 3 — Consistency Over Creativity** 

Never redesign or restructure isolated pages. 

All pages must feel like they belong to the same product. 

Maintain identical quality throughout the website. 

## **Principle 4 — User First** 

Every implementation must improve the user experience. 

If a technical solution benefits developers but creates confusion for users, choose the user-friendly solution. 

## **Principle 5 — Simplicity** 

Prefer simple solutions. 

Avoid unnecessary complexity. 

Avoid unnecessary abstractions. 

Avoid unnecessary dependencies. 

## **Principle 6 — Scalability** 

Every feature must be designed with future growth in mind. 

Assume the website will eventually contain: 

- Hundreds of articles 

- Dozens of tools 

- Thousands of daily visitors 

Solutions must scale accordingly. 

## **Principle 7 — Maintainability** 

Future maintenance should always be considered before implementation. 

If two solutions achieve the same outcome, choose the one that is easier to maintain. 

## **5. Project Ownership** 

The project owner is the final authority. 

Only the project owner can approve: 

- Design changes 

- Content changes 

- Architecture changes 

- SEO strategy changes 

- Publishing decisions 

AI systems assist implementation. 

They never replace project ownership. 

## **6. AI Responsibilities** 

The AI functions as an implementation assistant. 

It is responsible for: 

- analysing requests 

- implementing approved changes 

- preserving quality 

- preventing regressions 

- protecting existing functionality 

The AI must never assume ownership of the project. 

## **7. Human Authority** 

Whenever uncertainty exists: 

Human decisions always override AI assumptions. 

If user intent is unclear: 

Stop. 

Ask. 

Never guess. 

## **8. Decision Hierarchy** 

Every request must be processed using the following order. 

## **Step 1** 

Read the entire request. 

Never implement after reading only part of the request. 

## **Step 2** 

Understand the objective. 

Determine what the user actually wants. 

Do not focus only on keywords. 

Focus on intent. 

## **Step 3** 

Identify affected systems. 

Examples: 

Homepage 

Blog 

CMS 

SEO 

Routing 

UI 

Database 

Performance 

Deployment 

Multiple systems may be involved. 

## **Step 4** 

Perform impact analysis. 

Determine: 

What will change? 

What currently depends on it? 

Could anything break? 

Will users notice? 

Does it affect SEO? 

Does it affect rendering? 

Does it affect publishing? 

## **Step 5** 

Determine implementation risk. 

If risk exists: 

Stop. 

Inform the user. 

Explain the risk. 

Wait for approval. 

## **Step 6** 

Implement only the requested change. 

Never perform unrelated improvements. 

Never silently refactor unrelated code. 

Never optimise unrelated systems. 

## **Step 7** 

Validate implementation. 

Verify: 

- Existing functionality 

- New functionality 

- Visual consistency 

- Technical integrity 

Only then consider the task complete. 

If a request is outside this handbook: 

Analyse 

Determine affected systems 

Identify missing information 

Ask concise clarification questions 

Never guess implementation details. 

Proceed only after sufficient information exists. 

## **9. Unknown Request Policy** 

If a request is: 

- ambiguous 

- incomplete 

- technically risky 

- outside this handbook 

- missing important requirements 

- capable of affecting existing functionality 

The AI MUST NOT proceed. 

Instead: 

1. Analyse the request. 

2. Explain what information is missing. 

3. Ask concise clarification questions. 

4. Wait for the user's response. 

5. Continue only after requirements are fully understood. 

Never invent requirements. 

Never assume user intent. 

Never silently choose implementation details. 

## **10. Existing Function Protection Policy** 

Every approved feature is considered protected. 

Before modifying any existing file: 

Determine: 

- why the file exists 

- what currently depends on it 

- whether another page uses it 

- whether the modification affects existing behaviour 

If uncertainty exists: 

Stop. 

Ask. 

Never risk breaking approved functionality. 

## **11. Regression Prevention Policy** 

No implementation is complete until regression analysis has been performed. 

Every completed task must preserve: 

- Existing UI 

- Existing SEO 

- Existing Routing 

- Existing Rendering 

- Existing CMS 

- Existing Performance 

- Existing Accessibility 

A successful implementation is one that improves the requested feature without degrading any approved functionality. 

## **12. Golden Rule** 

Whenever there is a conflict between: 

Doing something quickly 

or 

Doing something correctly 

Always choose the correct implementation. 

TheTapTempo is a long-term professional product. 

Every decision must contribute to that vision. 

## **Rule Priority** 

This handbook defines the default operating standards for TheTapTempo. 

Explicit instructions from the project owner always take precedence over this handbook. 

Whenever a permanent architectural or operational decision is approved, the handbook should be updated accordingly. 

The handbook is a living document, not a fixed contract. 

## **TheTapTempo Master Engineering, SEO & Publishing Handbook** 

## **Version 1.0** 

## **PART 2 — System Architecture, Technical Scope & Operational Boundaries** 

## **1. Purpose of This Section** 

This section defines how Opencode must understand the entire TheTapTempo project before modifying any code. 

The objective is to ensure that every future implementation fits naturally into the existing architecture without introducing inconsistencies, duplicate systems, or unnecessary technical debt. 

This section establishes permanent architectural boundaries. 

## **2. System Identity** 

TheTapTempo is **not** a blog. 

TheTapTempo is **not** a collection of calculators. 

TheTapTempo is **not** a marketing website. 

TheTapTempo is a unified music utility platform consisting of: 

- Interactive tools 

- Educational content 

- Supporting resources 

- Technical calculators 

- Editorial knowledge base 

Every part of the website must work together as one ecosystem. 

## **3. Architectural Philosophy** 

The architecture must always favour: 

- Modularity 

- Reusability 

- Predictability 

- Maintainability 

- Performance 

- Scalability 

Avoid isolated implementations. 

Avoid duplicated logic. 

Avoid page-specific solutions when reusable architecture is possible. 

## **4. Single Source of Truth** 

Every feature must have one authoritative implementation. 

Examples: 

One blog renderer. 

One author component. 

One article card component. 

One metadata system. 

One schema generator. 

One sitemap generator. 

One routing strategy. 

One homepage article feed. 

Never build duplicate implementations. 

## **5. Component Reuse Policy** 

Before creating any new component: 

Determine whether an existing component already satisfies the requirement. 

If yes: 

Reuse it. 

If minor adjustments are needed: 

Extend the existing component. 

Do not duplicate components simply to solve a single page problem. 

## **6. Shared System First** 

Whenever possible: 

Prefer shared systems over isolated page logic. 

Example: 

Correct 

Shared Author Component 

↓ 

Used by every article 

Incorrect 

Different author block on each article 

Correct 

Shared Blog Renderer 

↓ 

Every article 

Incorrect 

Article-specific layouts 

Correct 

Shared Homepage Cards 

Incorrect 

Custom cards for individual pages 

## **7. Technical Scope Classification** 

Every request belongs to one or more technical domains. 

Before implementation, classify the request. 

Available domains include: 

- Core Infrastructure 

- Routing 

- CMS 

- Homepage 

- Blog System 

- Tool Pages 

- SEO 

- Structured Data 

- Performance 

- Accessibility 

- Deployment 

- API 

- Database 

- UI Components 

- Images 

- Navigation 

- Footer 

- Search 

- Analytics 

- Security 

Never begin implementation before identifying the affected domains. 

## **8. Multi-System Requests** 

Some requests affect multiple systems. 

Example: 

Publishing a new article affects: 

CMS 

↓ 

Blog 

↓ 

Homepage ↓ 

Metadata 

↓ 

Sitemap 

↓ 

Internal navigation ↓ 

Cache 

↓ 

Rendering 

Do not optimise only one part. 

Consider the complete workflow. 

## **9. Scope Protection** 

Implement only the requested scope. 

Never expand scope without approval. 

Example: 

User requests: 

Improve Homepage Latest Guides. 

Do NOT also: 

- redesign blog cards 

- change typography 

- optimise unrelated pages 

- refactor navigation 

- modify footer 

Only implement the requested scope. 

## **10. Approved System Protection** 

Every approved system becomes protected. 

Protected systems include: 

Homepage 

Blog 

Tools 

CMS 

Navigation 

Footer 

Search 

Rendering 

Publishing 

Deployment 

SEO 

Accessibility 

Performance 

Before modifying a protected system: 

Determine: 

Why it exists. 

Who depends on it. 

Whether changes affect other systems. 

## **11. Dependency Awareness** 

Every feature may have dependencies. 

Always identify: 

Parent system 

Child systems 

Shared components 

Shared utilities 

Global styles 

Global layouts 

API dependencies 

Database dependencies 

Never modify a dependency without understanding its impact. 

## **12. Architectural Consistency** 

Every new feature must match the existing architecture. 

Never introduce: 

Different coding style. 

Different naming convention. 

Different rendering philosophy. 

Different data flow. 

Different design hierarchy. 

The website should evolve naturally rather than feeling patched together. 

## **13. Global Changes Policy** 

Global changes require additional caution. 

Examples include: 

Layouts 

Typography 

Spacing 

Cards 

Buttons 

Author blocks 

Navigation 

Footer 

Homepage 

Rendering engine 

Shared utilities 

Before modifying any global system: 

Perform dependency analysis. 

Identify every page that will be affected. 

Only proceed after confirming the intended impact. 

## **14. Local Changes Policy** 

Local changes affect only one feature. 

Examples: 

Fix one article. 

Correct one typo. 

Replace one image. 

Update one CTA. 

Modify one metadata field. 

Local changes should never trigger unrelated global modifications. 

## **15. Refactoring Policy** 

Refactoring is allowed only when it provides measurable value. 

Acceptable reasons include: 

Reduced duplication 

Improved maintainability 

Performance improvements 

Bug prevention 

Scalability improvements 

Never refactor purely for personal preference. 

Never refactor unrelated code during feature implementation. 

## **16. Naming Standards** 

All future additions must follow existing project naming conventions. 

Maintain consistency for: 

Files 

Folders 

Components 

Functions 

Variables 

Routes 

APIs 

Collections 

Utilities 

Avoid inconsistent naming patterns. 

## **17. File Ownership** 

Every file should have a clear responsibility. 

One file. 

One purpose. 

Avoid files responsible for multiple unrelated systems. 

## **18. Folder Organization** 

Folders should remain logical and scalable. 

Group related functionality together. 

Avoid deeply nested structures unless necessary. 

Avoid scattered implementations. 

Future developers should immediately understand the project structure. 

## **19. CMS Philosophy** 

The CMS is responsible for content management. 

It is NOT responsible for: 

Rendering decisions 

SEO strategy 

Article writing 

UI redesign 

The CMS stores content. 

The application renders content. 

Keep responsibilities separated. 

## **20. Rendering Philosophy** 

Rendering should always be data-driven. 

Never hardcode article-specific behaviour. 

Whenever possible: 

Render from structured content rather than conditional logic. 

Avoid page-specific exceptions. 

## **21. Future Expansion Policy** 

Assume that new tools, new article categories, and new content types will be added. 

Every implementation should make future additions easier rather than harder. 

Never build systems that only work for today's requirements. 

## **22. Technical Debt Policy** 

Avoid creating technical debt. 

If a temporary workaround is necessary: 

Clearly identify it. 

Document it. 

Plan for proper replacement. 

Never leave hidden shortcuts inside the codebase. 

## **23. Risk Assessment** 

Before every implementation ask: 

Will this break another page? 

Will this affect SEO? 

Will this affect rendering? 

Will this affect CMS? 

Will this affect homepage? 

Will this affect performance? 

Will this affect deployment? 

If the answer is uncertain: 

Stop. 

Investigate first. 

## **24. Change Approval Matrix** 

Low-risk changes: 

May proceed after validation. 

Medium-risk changes: 

Require dependency analysis. 

High-risk changes: 

Require user approval before implementation. 

Examples of high-risk changes: 

Homepage redesign 

Routing changes 

Rendering engine updates 

Database schema changes 

Shared component modifications 

Global styling changes 

Deployment pipeline changes 

## **25. Architectural Success Criteria** 

Every implementation should satisfy the following: 

✓ Reusable 

✓ Maintainable 

✓ Scalable 

✓ Predictable 

✓ Consistent 

- ✓ User-focused 

✓ Performance-conscious 

- ✓ Backward-compatible 

Only when all criteria are satisfied should an implementation be considered complete. 

## **TheTapTempo Master Engineering, SEO & Publishing Handbook** 

## **Part 3** 

## **1. Purpose** 

This section defines the mandatory workflow that Opencode must follow before, during, and after every implementation. 

No task should begin immediately after reading the user's prompt. 

Every request must first pass through the decision engine defined in this section. 

This workflow is mandatory. 

## **2. Execution Philosophy** 

Opencode is an implementation engine. 

Its responsibility is not to produce code as quickly as possible. 

Its responsibility is to produce the **correct implementation** . 

Correctness always has higher priority than speed. 

## **3. Mandatory Decision Engine** 

Every request must follow this sequence. 

No step may be skipped. 

## **Stage 1 — Read** 

Read the user's entire request. 

Do not begin implementation while still reading. 

Never stop after understanding only the first sentence. 

Always analyse the complete request. 

## **Stage 2 — Understand** 

Determine the user's actual objective. 

Do not focus only on the literal words. 

Understand the intended outcome. 

Example: 

User: 

Add Latest Guides. 

Objective: 

Improve homepage navigation. 

Not: 

Create another card component. 

## **Stage 3 — Categorise** 

Identify affected systems. 

Examples: 

Homepage 

Blog 

CMS 

SEO 

Rendering 

Performance 

Deployment 

Routing 

Database 

Multiple systems may be affected. 

Identify all of them before implementation. 

## **Stage 4 — Existing State Analysis** 

Before writing code determine: 

Current behaviour. 

Current implementation. 

Current dependencies. 

Current architecture. 

Never replace a system without understanding it. 

## **Stage 5 — Risk Assessment** 

Evaluate implementation risk. 

Questions: 

Can this break another feature? 

Can this affect SEO? 

Can this affect rendering? 

Can this affect deployment? 

Can this affect homepage? Can this affect routing? 

Can this affect CMS? 

If uncertain: 

STOP. 

Investigate first. 

## **Stage 6 — Scope Verification** 

Determine exactly what the user requested. 

Implement only that. 

Never perform unrelated improvements. 

Never include personal optimisation ideas. 

Never silently refactor unrelated code. 

## **Stage 7 — Implementation Plan** 

Before editing code internally create a logical implementation plan. 

The plan should answer: 

What files are affected? 

What components are affected? 

What dependencies exist? 

What must remain unchanged? 

Only after this plan is complete may implementation begin. 

## **Stage 8 — Implementation** 

Implement only the approved scope. 

Preserve existing behaviour. 

Maintain architectural consistency. 

Avoid introducing new complexity. 

## **Stage 9 — Validation** 

After implementation verify: 

Requested feature works. 

Existing functionality still works. 

No regressions exist. 

No visual inconsistencies exist. 

No routing issues exist. 

No SEO issues exist. 

Only then consider the task complete. 

## **4. Never Guess Policy** 

If any required information is missing: 

Never guess. 

Examples: 

Unknown route 

Unknown CMS behaviour 

Unknown desired UI 

Unknown spacing 

Unknown SEO preference 

Unknown rendering behaviour 

Unknown business requirement 

Instead: 

Pause. 

Explain the uncertainty. 

Ask concise clarification questions. 

Wait. 

## **5. Clarification Protocol** 

When clarification is required: 

Ask only relevant questions. 

Avoid unnecessary conversation. 

Questions should be: 

Clear. Specific. Actionable. Once answered: 

Resume implementation. 

## **6. Existing Functionality Protection** 

Every implementation must preserve approved functionality. 

Before editing any file determine: 

Why does this file exist? 

What uses it? 

Could another page depend on it? 

Could this modification affect another feature? 

If yes: 

Proceed carefully. 

## **7. Regression Prevention** 

Regression prevention is mandatory. 

Every completed implementation must verify: 

Homepage 

Navigation 

Footer 

Blog 

Articles 

Tool pages 

CMS 

SEO 

Rendering 

Accessibility 

Performance 

Any affected area must continue working exactly as before unless the user requested otherwise. 

## **8. Silent Change Policy** 

Safe Maintenance 

Small maintenance improvements are permitted when ALL of the following are true: 

- No behavioural change 

- No UI change 

- No SEO change 

- No API change 

- No routing change 

- No production risk 

Examples: 

Removing unused imports 

Removing dead code 

Fixing deprecated syntax 

Formatting 

Minor code cleanup 

Every maintenance improvement should be documented in the completion summary. Do not: 

Improve unrelated spacing. 

Rename unrelated components. 

Refactor unrelated utilities. 

Optimise unrelated pages. 

Modify unrelated metadata. 

Every modification must be traceable to the user's request. 

## **9. Feature Protection** 

Approved features are protected. 

Examples: 

Homepage sections. 

Blog cards. 

Author component. 

Editorial links. 

Latest Guides. 

Navigation. 

Footer. 

Publishing workflow. 

Rendering engine. 

Never redesign approved features without explicit approval. 

## **10. Code Preservation** 

Before deleting any code determine: 

Is it obsolete? 

Is it unused? 

Is another page dependent on it? 

Could future functionality require it? 

If uncertain: 

Do not delete. 

## **11. Replacement Policy** 

If replacing an implementation: 

Verify the new implementation provides all existing functionality. 

Nothing should be lost during replacement. 

## **12. Unknown Consequences Rule** 

If the consequences of a modification cannot be predicted confidently: 

Stop. 

Investigate. 

Never continue blindly. 

## **13. User Intent Overrides Assumptions** 

Whenever assumptions conflict with user instructions: 

User instructions always win. 

Never "improve" a requested feature against the user's wishes. 

## **14. Conservative Development** 

When multiple valid implementations exist: 

Choose the one that introduces the least risk. 

Avoid unnecessary architectural changes. 

## **15. Minimal Change Principle** 

Solve the problem with the smallest correct modification. 

Do not rebuild entire systems when a focused improvement is sufficient. 

## **16. Long-Term Thinking** 

Every implementation should remain maintainable six months from now. 

Avoid temporary hacks. 

Avoid fragile solutions. 

Avoid code that future developers cannot understand. 

## **17. Error Handling** 

Unexpected behaviour should never be ignored. 

Investigate root causes. 

Avoid masking problems. 

Fix causes rather than symptoms whenever practical. 

## **18. Documentation Awareness** 

Whenever an implementation introduces new permanent behaviour: 

Ensure it remains consistent with this handbook. 

Never create undocumented permanent systems. 

## **19. Final Validation Checklist** 

Before considering any task complete verify: 

- ✓ User objective achieved. 

- ✓ Existing functionality preserved. 

- ✓ No regressions introduced. 

- ✓ UI remains consistent. 

- ✓ SEO unaffected unless requested. 

- ✓ Architecture preserved. 

- ✓ No unnecessary code added. 

- ✓ No unnecessary code removed. 

- ✓ No hidden side effects. 

Only after all items pass may the task be considered finished. 

## **20. Golden Execution Rule** 

The safest implementation is the one that: 

Fully satisfies the user's request, 

Preserves every approved feature, 

Introduces no regressions, 

Maintains architectural consistency, 

And requires the smallest correct change. 

This is the execution standard for every future task performed on TheTapTempo. 

## **TheTapTempo Master Engineering, SEO & Publishing Handbook** 

## **Version 1.0** 

**PART 4 — Technical Foundation, Infrastructure & Engineering Standards** 

## **1. Purpose** 

This section defines the permanent technical foundation of TheTapTempo. 

Every future engineering decision must align with these standards. 

These standards are mandatory. 

No implementation should violate them without explicit approval from the project owner. 

## **2. Technology Stack** 

The approved technology stack for TheTapTempo is considered permanent unless explicitly changed. 

Current stack includes: 

- Next.js (App Router) 

- React 

- TypeScript 

- MongoDB 

- Vercel Deployment 

- Tailwind CSS 

Future implementations must remain compatible with this ecosystem. 

## **3. Infrastructure Philosophy** 

Infrastructure should prioritise: 

- Stability 

- Predictability 

- Simplicity 

- Performance 

- Scalability 

- Maintainability 

Never introduce technologies that duplicate existing capabilities. 

Never add libraries merely for convenience. 

Every dependency must provide measurable long-term value. 

## **4. Framework Consistency** 

Next.js App Router is the foundation of the project. 

Never mix routing philosophies. 

Never introduce Pages Router behaviour. 

Never implement legacy routing patterns. 

Every route must follow the App Router architecture. 

## **5. TypeScript Policy** 

TypeScript is mandatory. 

Never intentionally bypass the type system. 

Avoid: 

- any 

- @ts-ignore 

- unnecessary type assertions 

Every implementation should improve type safety rather than reduce it. 

## **6. Component Philosophy** 

Components must remain: 

Reusable. 

Predictable. 

Independent. 

Maintainable. 

Avoid page-specific components when reusable components are possible. 

## **7. Server vs Client Decision** 

Before creating a Client Component ask: 

Can this work as a Server Component? 

If yes, 

prefer Server Components. 

Client Components should exist only when interactivity requires them. 

Avoid unnecessary hydration. 

## **8. Data Fetching Philosophy** 

Data should be fetched from the correct source. 

Avoid duplicated fetch logic. 

Avoid multiple requests for identical information. 

Whenever possible: 

Single source. 

Single query. 

Single responsibility. 

## **9. API Standards** 

Every API endpoint must have a clear responsibility. 

One endpoint. 

One purpose. 

Avoid endpoints that perform unrelated operations. 

## **10. Database Standards** 

MongoDB is the authoritative data source. 

Never duplicate stored information elsewhere without a valid architectural reason. 

Avoid storing derived values that can be calculated safely. 

Maintain clean document structures. 

## **11. Database Safety** 

Every database operation should assume production data. 

Never perform destructive operations without confirmation. 

Avoid accidental overwrites. 

Protect existing content. 

## **12. Environment Variables** 

Never hardcode: 

API keys. 

Database credentials. 

Secrets. 

Tokens. 

Private configuration. 

Use environment variables exclusively. 

## **13. Configuration Management** 

Configuration should exist in one location. 

Avoid duplicated configuration. 

Avoid conflicting configuration files. 

Configuration should remain predictable. 

## **14. File Structure** 

Every directory should have a clear purpose. 

Avoid random placement of files. 

Avoid deeply nested folders without justification. 

Folder organisation should remain intuitive. 

## **15. Naming Standards** 

Maintain consistent naming across: 

Routes 

Files 

Components 

Utilities 

Hooks 

Collections 

API handlers 

Naming conventions should remain uniform throughout the project. 

## **16. Routing Philosophy** 

Routing must remain: 

Predictable. 

SEO friendly. 

Human readable. 

Stable. 

Never introduce breaking URL changes without explicit approval. 

Existing URLs are considered protected assets. 

## **17. URL Stability** 

Published URLs must remain permanent. 

Avoid changing slugs. 

Avoid changing route structures. 

Avoid changing URL hierarchy. 

If URL changes become unavoidable: 

Proper redirects must be implemented. 

## **18. Dynamic Route Rules** 

Dynamic routes must remain deterministic. 

Avoid routing ambiguity. 

Avoid conflicting dynamic segments. 

Every route should resolve predictably. 

## **19. Rendering Strategy** 

Rendering behaviour must remain consistent across the website. 

Never mix rendering strategies without architectural justification. 

Avoid unnecessary client-side rendering. 

Prefer server rendering whenever appropriate. 

## **20. Cache Strategy** 

Caching must improve performance without sacrificing accuracy. 

Never cache content that must remain immediately current. 

Examples include: 

Recently published articles. 

Homepage Latest Guides. 

Dynamic CMS content. 

Sitemap. 

Critical metadata. 

Whenever content changes, 

cache invalidation must occur automatically. 

## **21. Revalidation Policy** 

Whenever new content is published, 

the system should automatically update all affected areas. 

Examples include: 

Homepage. 

Blog listing. 

Article page. 

Sitemap. 

RSS (future). 

Search indexes (future). 

No manual intervention should be required. 

## **22. Error Handling** 

Unexpected failures should never fail silently. 

Errors should be: 

Logged. 

Handled gracefully. 

Explained clearly when appropriate. 

Never expose internal system information to users. 

## **23. 404 Handling** 

A page should return 404 only when: 

The requested resource genuinely does not exist. 

Never return false 404 responses because of: 

Cache. 

Database timing. 

Rendering issues. 

Configuration errors. 

Route ambiguity. 

## **24. Build Philosophy** 

A successful build should indicate: 

No technical regressions. 

No type errors. 

No SEO violations. 

No deployment blockers. 

A failed quality check should stop deployment. 

Deployment should never continue with known critical issues. 

## **25. Quality Gates** 

Every production deployment must successfully pass: 

TypeScript validation. 

SEO validation. 

Build validation. 

Route validation. 

Metadata validation. 

Schema validation. 

Only then should deployment proceed. 

## **26. Deployment Platform** 

Vercel is the production deployment platform. 

Implementations should remain compatible with Vercel's deployment model. 

Avoid platform-specific workarounds unless absolutely necessary. 

## **27. Production Safety** 

Never implement directly for production without considering: 

Rollback. 

Recovery. 

Compatibility. 

Existing users. 

Existing content. 

Every deployment should be reversible. 

## **28. Performance Philosophy** 

Performance is a permanent feature. 

Do not sacrifice performance for convenience. 

Avoid unnecessary: 

JavaScript. 

Network requests. 

Hydration. Bundle size. 

Render blocking. 

## **29. Future Compatibility** 

Every engineering decision should remain compatible with future additions. 

Assume future expansion will include: 

Additional tools. 

Additional calculators. 

Large article libraries. 

Search. 

User accounts. 

Dashboards. 

Internationalisation. 

Build systems should not require redesign to support future growth. 

## **30. Engineering Golden Rule** 

Every implementation should leave the codebase in a better state than before. 

Cleaner. 

Safer. 

More maintainable. 

More predictable. 

Never leave behind fragile implementations or hidden technical debt. 

The long-term health of TheTapTempo is always more important than short-term implementation speed. 

## **TheTapTempo Master Engineering, SEO & Publishing Handbook** 

**Version 1.0** 

## **PART 5 — SEO, Indexing & Search Architecture** 

## **1. Purpose** 

This section defines the permanent SEO architecture of TheTapTempo. 

Every page, tool, article, feature, and future implementation must comply with these standards. 

SEO is not a post-publication activity. 

SEO is part of the product architecture. 

Every engineering and publishing decision must consider its SEO impact. 

## **2. SEO Philosophy** 

The objective is not simply to rank pages. 

The objective is to build the most trusted educational resource within the music tempo niche. SEO decisions must prioritise: 

- User value 

- Search intent 

- Experience 

- Trust 

- Accuracy 

- Semantic relevance 

- Crawlability 

- Long-term authority 

Short-term ranking tactics are prohibited. 

## **SEO Rules Classification** 

Some rules are Mandatory. 

Some rules are Recommended. 

Mandatory rules include: 

Canonical 

Metadata 

Schema 

Indexability 

Sitemap 

Broken Links 

Recommended rules include: 

Ideal title wording 

Ideal image placement 

Preferred heading style 

Preferred content presentation 

Recommended rules may be adapted when they improve user experience. 

## **3. EEAT Principles** 

Every public page must strengthen Google's EEAT signals. 

Each page should clearly demonstrate: 

Experience 

Expertise 

Authoritativeness 

Trustworthiness 

Whenever applicable: 

- Editorial ownership 

- Author attribution 

- Editorial review 

- Helpful content 

- Technical accuracy 

- Transparent methodology 

must be visible. 

## **4. Search Intent Protection** 

Every page must target exactly one primary search intent. 

Avoid combining multiple unrelated intents. 

Every page should answer one primary question exceptionally well. 

Supporting information may exist, 

but the primary intent must always remain clear. 

## **5. Content Cannibalization Policy** 

Multiple pages must never compete for the same primary keyword. 

Before creating new content: 

Determine whether another page already satisfies that intent. 

If yes: 

Strengthen the existing page. 

Do not create duplicate pages. 

Supporting articles should support pillar pages, 

never compete with them. 

## **6. URL Strategy** 

URLs are permanent assets. 

Every URL must remain: 

Short. 

Readable. 

Descriptive. 

Stable. 

Keyword-focused. 

Avoid changing URLs after publication. 

If unavoidable, 

implement permanent redirects. 

## **7. Slug Standards** 

Every slug should: 

Describe the page. 

Match search intent. 

Remain human-readable. 

Avoid unnecessary words. 

Avoid dates. 

Avoid version numbers. 

Avoid changing approved slugs. 

## **8. Metadata Standards** 

Every indexable page MUST contain: 

Unique Title 

Unique Meta Description 

Canonical URL 

Open Graph 

Twitter Card 

Index directives 

Structured Data (where applicable) 

Missing metadata is considered a deployment blocker. 

## **9. Title Standards** 

Every title must: 

Reflect search intent. 

Remain unique. 

Be naturally written. 

Encourage clicks. 

Avoid clickbait. 

Avoid keyword stuffing. 

Avoid duplication. 

## **10. Meta Description Standards** 

Every meta description should: 

Summarise the page. 

Improve click-through rate. 

Remain unique. 

Reflect page content accurately. 

Avoid misleading descriptions. 

## **11. Canonical Policy** 

Every indexable page must define a canonical URL. 

Canonical URLs should always reference the preferred version. 

Duplicate canonical implementations are prohibited. 

## **12. Indexability Rules** 

Every public page should have a clearly defined indexing policy. 

Pages intended for Google must remain indexable. 

Private, 

administrative, 

or duplicate pages must not be indexed. 

## **13. Robots Policy** 

robots.txt must protect: 

Admin interfaces. 

Development routes. 

Private endpoints. 

Temporary resources. 

Never accidentally block important pages. 

Every robots modification should be reviewed carefully. 

## **14. Sitemap Policy** 

The sitemap is the authoritative discovery mechanism for search engines. 

Whenever new public content is published, 

the sitemap must update automatically. 

The sitemap must include: 

Homepage 

Tools 

Articles 

Static pages 

Future public resources 

Administrative pages must never appear. 

## **15. Internal Linking Philosophy** 

Internal linking is mandatory. 

Every article should naturally connect users to: 

Relevant tools. 

Relevant supporting articles. 

Relevant pillar content. 

Editorial resources. 

Never insert links solely for SEO. 

Every internal link must improve user experience. 

## **16. Homepage Link Equity** 

The homepage is the highest-authority page. 

Homepage links should prioritise: 

Core tools. 

Important educational resources. 

Latest Guides. 

Primary navigation. 

Never overload the homepage with unnecessary links. 

## **17. Tool-to-Blog Relationship** 

Tool pages should educate. 

Blog pages should deepen understanding. 

Whenever appropriate: 

Tool → Blog 

Blog → Tool 

Both directions should exist. 

This relationship must remain natural. 

## **18. Pillar & Supporting Structure** 

TheTapTempo follows a pillar-supporting architecture. 

Pillar pages own primary search intent. 

Supporting articles expand individual subtopics. 

Supporting articles should strengthen pillar authority. 

Never replace it. 

## **19. Anchor Text Policy** 

Anchor text should: 

Describe destination naturally. 

Remain contextually relevant. 

Avoid repetitive exact-match anchors. 

Avoid forced optimisation. 

Write for users first. 

## **20. Structured Data Policy** 

Structured Data is mandatory whenever applicable. 

Possible schema types include: 

WebPage 

Article 

BlogPosting 

FAQPage 

BreadcrumbList 

SoftwareApplication 

Organization 

Person 

ImageObject 

HowTo (future) 

VideoObject (future) 

Schema should accurately represent page content. 

Never generate fake schema. 

## **21. Schema Accuracy** 

Schema must always match visible content. 

Never include: 

Invisible FAQs. 

Fake ratings. 

Imaginary authors. 

Invented reviews. 

Unsupported properties. 

Google trust has higher priority than rich results. 

## **22. Image SEO** 

Every published image must include: 

Meaningful filename. 

Descriptive alt text. 

Appropriate dimensions. 

Optimised size. 

Responsive behaviour. 

Decorative alt text is prohibited unless the image is purely decorative. 

## **23. Breadcrumb Policy** 

Public pages should support logical breadcrumb navigation whenever appropriate. 

Breadcrumbs improve: 

Navigation. 

Internal linking. 

Structured Data. 

Search understanding. 

## **24. Future Search Features** 

Every implementation should remain compatible with: 

AI Overviews. 

Featured Snippets. 

Knowledge Panels. 

Rich Results. 

Voice Search. 

Future Google search experiences. 

## **25. Google Search Console** 

Search Console should remain the primary SEO monitoring platform. 

Future technical implementations should preserve: 

Coverage. 

Indexability. 

Sitemaps. 

Enhancements. 

Core Web Vitals. 

Manual Actions. 

Any deployment introducing SEO regressions must be investigated immediately. 

## **26. Crawl Budget** 

Avoid wasting crawl budget. 

Do not generate: 

Duplicate URLs. 

Thin pages. 

Parameter duplicates. 

Broken internal links. 

Infinite crawl paths. 

Search engines should discover important content efficiently. 

## **27. Broken Link Policy** 

Broken internal links are unacceptable. 

Every deployment should preserve: 

Navigation integrity. 

Homepage links. 

Blog links. 

Tool links. 

Footer links. 

Editorial links. 

Author links. 

## **28. Redirect Policy** 

Whenever URLs change: 

Permanent redirects must be implemented. 

Redirect chains should be avoided. 

Redirect loops are prohibited. 

## **29. SEO Validation Before Deployment** 

Every deployment must automatically validate: 

Metadata 

Canonical 

Structured Data 

Internal Links 

Sitemap 

Robots 

Image Alt Text 

Heading Structure 

Indexability 

Broken Links 

Only after successful validation may deployment proceed. 

## **30. SEO Golden Rule** 

Every public page should satisfy this question: 

"If Google removed every ranking signal except usefulness, would this page still deserve to rank?" 

If the answer is uncertain, 

the page is not ready for publication. 

SEO exists to help users discover exceptional content. 

It must never become more important than the quality of the content itself. 

## **TheTapTempo Master Engineering, SEO & Publishing Handbook** 

**Version 1.0** 

## **PART 6 — Content Publishing System & Blog Architecture** 

## **1. Purpose** 

This section defines the permanent publishing standard for every article published on TheTapTempo. 

No article may be published unless it satisfies every rule defined in this section. 

These rules apply regardless of: 

- Article topic 

- Author 

- AI model 

- Publishing date 

- CMS workflow 

- Future website expansion 

This chapter is the permanent publishing constitution of TheTapTempo. 

## **2. Publishing Philosophy** 

Publishing is not the act of making an article public. 

Publishing is the final stage of a complete editorial process. 

Every article must demonstrate: 

Accuracy 

Authority 

Consistency 

Readability 

Technical quality 

User value 

SEO completeness 

Visual consistency 

A page that is technically complete but visually inconsistent is **not** considered publishable. 

## **3. Single Publishing Standard** 

There is only one publishing standard. 

No "small article" 

No "quick article" 

No "temporary article" 

No "draft quality article" 

Every published article must satisfy the same professional standard. 

## **4. Article Lifecycle** 

Every article follows this lifecycle. 

Blueprint 

↓ 

Writing 

↓ 

Review 

↓ 

SEO Review 

↓ 

Publishing Preparation 

↓ 

CMS Upload 

↓ 

Automatic Validation 

↓ 

Publication 

↓ 

Homepage Integration 

↓ 

Search Engine Discovery 

Skipping any stage is prohibited. 

## **5. Blueprint Requirement** 

Every article begins with an approved blueprint. 

The blueprint defines: 

Primary search intent 

Target keyword 

Supporting keywords 

Search intent 

Heading hierarchy 

Internal linking plan 

Tool integration 

FAQ opportunities 

User journey 

Content boundaries 

The blueprint is an editorial planning document. 

It is **never** displayed on the website. 

## **6. Final Content Authority** 

The approved final article is the only publishing source. 

Opencode must never rewrite, 

expand, summarise, 

optimise, 

or creatively modify approved content. 

Its responsibility is presentation, 

not rewriting. 

## **7. Publishing Responsibility** 

The CMS stores content. 

Opencode prepares presentation. 

The final article remains exactly as approved by the project owner. 

## **8. Automatic Publishing Responsibilities** 

During publication Opencode must automatically: 

Generate page layout. 

Apply website components. 

Insert author section. 

Insert editorial section. 

Render images. 

Render tables. Render FAQs. 

Generate metadata. 

Generate schema. 

Update homepage. 

Update blog listing. 

Update sitemap. 

Invalidate cache. 

Validate rendering. 

No manual intervention should be required. 

## **9. Article Layout Standard** 

Every article must follow one consistent structure. 

No article may invent its own layout. 

Required order: 

Hero Section 

↓ 

Introduction 

↓ 

Table of Contents 

↓ 

Main Content 

↓ 

Comparison Tables (if applicable) 

↓ 

FAQs 

↓ 

Conclusion 

↓ 

Author Section 

Articles should never rearrange this hierarchy. 

## **10. Hero Section** 

Every article should contain: 

Featured Image 

Title 

Publication Date 

Reading Time (future) 

Category (future) 

The hero establishes the visual identity of the article. 

## **11. Featured Image Rules** 

Every article must contain one featured image. 

Requirements: 

Relevant. 

Professional. 

Consistent with brand. 

High quality. 

Original or licensed. 

Optimised. 

The featured image should visually explain the topic, 

not merely decorate it. 

## **12. Image Standards** 

Images should support understanding. 

Avoid decorative images. 

Infographics are preferred whenever they improve comprehension. 

Every image should have: 

Descriptive alt text. 

Optimised dimensions. 

Responsive rendering. 

Lazy loading where appropriate. 

## **13. TOC Standard** 

The Table of Contents follows one permanent rule. 

Include: 

H2 headings only. 

Never include H3. 

Never include H4. 

The objective is navigation, 

not document indexing. 

A concise TOC improves usability. 

## **14. Heading Hierarchy** 

Every article must maintain a logical heading hierarchy. 

Rules: 

One H1 only. Multiple H2 allowed. 

H3 only within H2 sections. 

Never skip heading levels. 

Never create empty headings. 

## **15. Spacing Standard** 

Articles must use the website's approved spacing system. 

Spacing should remain visually identical across every article. 

No article-specific spacing adjustments are permitted. 

Visual consistency is mandatory. 

## **16. Typography** 

Typography must remain identical across the website. 

Never introduce: 

Different fonts. 

Different heading styles. 

Different paragraph spacing. 

Different text widths. 

Articles should feel native to the website. 

## **17. Tables** 

Whenever information is naturally tabular, 

render it as an actual HTML table. 

Never fake tables using paragraphs or lists. 

Tables should remain: 

Responsive. 

Accessible. 

Consistent. 

Visually identical throughout the website. 

## **18. Comparison Sections** 

Whenever comparison data exists, 

use comparison tables. 

Do not convert comparison tables into long paragraphs. 

Users should compare information visually. 

## **19. Lists** 

Ordered lists should be used only for sequential processes. 

Unordered lists should be used for collections. 

Avoid unnecessary nested lists. 

## **20. FAQ Rendering** 

FAQs must always use the website's approved FAQ component. 

Never create custom FAQ layouts. 

Never manually style FAQ sections. 

Consistency is mandatory. 

## **21. Author Section** 

Every article automatically displays the approved author component. 

Current author: 

TheTapTempo Editorial Team 

This should never require manual insertion. 

## **22. Editorial Review** 

Every article automatically displays the Editorial Review section. 

The editorial section must link to: 

Editorial Policy 

The wording remains consistent across every article. 

No manual duplication is permitted. 

## **23. Internal Linking** 

Internal links should be generated according to the approved blueprint. 

Links should connect readers to: 

Relevant tools. 

Relevant supporting articles. 

Relevant pillar pages. 

Editorial resources where appropriate. 

Avoid excessive linking. 

Every link must improve navigation. 

## **24. External Links** 

External links should be used only when they genuinely improve user understanding. 

Avoid unnecessary outbound links. 

Prefer authoritative sources. 

## **25. Metadata** 

Metadata should be generated from the approved article information. 

Never invent metadata. 

Never rewrite the approved SEO title without approval. 

## **26. Structured Data** 

Every article automatically generates: 

Article Schema 

Breadcrumb Schema 

Organization Schema 

Person Schema (Editorial Team) 

ImageObject (when applicable) 

Future schema additions should integrate automatically. 

## **27. Homepage Integration** 

Every published article automatically becomes eligible for: 

Latest Guides. 

Blog archive. 

Future related article systems. 

No manual homepage editing should be required. 

## **28. Blog Archive** 

Articles should automatically appear in chronological order. 

Newest first. 

No manual ordering. 

No hardcoded entries. 

## **29. Automatic Validation** 

Before publication Opencode must verify: 

Images render correctly. 

Tables render correctly. 

TOC renders correctly. 

Author appears. 

Editorial section appears. 

Internal links work. 

Metadata exists. 

Schema exists. 

Responsive layout is correct. 

No 404 errors exist. 

Only then may publication proceed. 

## **30. Publishing Golden Rule** 

The responsibility of Opencode is **presentation and integration** , not authorship. 

Approved content must remain unchanged. 

The system should make every article look like a native part of TheTapTempo without rewriting, reinterpreting, or modifying the editorial work. 

Every published article should be visually, technically, and structurally indistinguishable from every other article on the website.

## **31. Hardcoded Blog Publishing Workflow**

This section defines the new publishing workflow for all future and migrated blog articles. It replaces the CMS/database workflow for blog content only. The CMS/database system remains in place for tools, settings, and non-blog content — do NOT remove it.

## **31.1 When This Applies**

This workflow applies when the project owner says "hardcoded blog", "static blog", "no database", or directly provides article files for manual placement. The standard CMS/database workflow still applies to all non-blog content (tools, calculators, settings, etc).

## **31.2 Storage Format**

Blog articles are stored as hardcoded files in the blog route directory. Each article is a file containing the full article component with embedded metadata, schema, and content. No database queries are needed at render time.

## **31.3 Existing MongoDB Articles — Migration**

All existing blog articles in MongoDB MUST be migrated to hardcoded files. Each article becomes a standalone file with:
- Its slug as the filename
- All metadata (title, metaTitle, metaDescription, createdAt, readTime, etc)
- Full content HTML
- FAQ data (if any)
- Cover image URL
- Generated metadata export
- JSON-LD structured data (Article, BreadcrumbList)
- Author and Editorial components

After migration, the MongoDB blog collection may remain as backup but is no longer the render-time source for migrated articles.

## **31.4 Image Storage — Cloudinary Only**

- All blog images MUST be uploaded to Cloudinary.
- Source images are placed in the `blog_pics/` folder in the project root.
- OpenCode uploads from `blog_pics/` to Cloudinary using the existing Cloudinary credentials.
- Images are served from Cloudinary URLs — never from local storage.
- After upload, the project owner deletes the local files from `blog_pics/`. OpenCode does NOT delete them.
- Cloudinary automatically handles optimization, responsive sizes, and format conversion.

## **31.5 Image Upload Workflow**

When the project owner provides images for an article:

1. Images are placed in `blog_pics/` folder with descriptive filenames.
2. Project owner provides: filename, alt text, and position in the article.
3. OpenCode uploads each image to Cloudinary.
4. OpenCode inserts the Cloudinary URL at the specified position in the article content.
5. Alt text is added according to the project owner's instructions.
6. Project owner deletes the local files from `blog_pics/` after upload is confirmed.

## **31.6 Image Deletion**

When a blog article is deleted, all associated Cloudinary images MUST also be deleted. OpenCode uses the Cloudinary API to delete images by public ID extracted from the article's image URLs.

## **31.7 Article Creation Workflow**

When the project owner requests a new blog article:

1. OpenCode waits for the project owner to provide: slug, meta title, meta description, article content, internal linking instructions, image files (in `blog_pics/`), alt text for each image, and image positions.
2. OpenCode uploads images to Cloudinary.
3. OpenCode creates the hardcoded article file with:
   - Proper formatting according to the approved design
   - SEO-optimized metadata (meta title, meta description, canonical, Open Graph, Twitter Card, structured data)
   - Internal links as specified
   - Images at specified positions with Cloudinary URLs and alt text
4. OpenCode updates the blog listing manifest so the homepage Latest Guides and blog archive can find the new article.
5. OpenCode updates the sitemap to include the new article URL.
6. OpenCode presents the rendered article for design approval.
7. After approval, the same design template is used for all subsequent articles.

## **31.8 Design Approval**

The first article follows a new design:

1. OpenCode creates the article with a well-formatted layout.
2. The project owner reviews and requests changes if needed.
3. Once approved, the design becomes the template for all future blog articles.
4. Subsequent articles use the exact same design — no per-article design changes.

## **31.9 Homepage Latest Guides — Hardcoded Source**

The homepage Latest Guides section is rewritten to pull from hardcoded blog files instead of the `/api/blogs?limit=3` MongoDB API. It reads a manifest file or directly imports from the hardcoded article registry. The section shows the most recent approved articles regardless of storage method.

## **31.10 Sitemap — Hardcoded Blog Support**

The sitemap generator (`sitemap.ts`) is updated to:
- Continue reading dynamically from MongoDB for tool pages, static pages, etc.
- ALSO read from the hardcoded blog article registry/files.
- Automatically include every hardcoded blog article with proper priority and change frequency.
- Update automatically whenever a new article is published via OpenCode.

The project owner does NOT need to manually edit the sitemap for new articles — OpenCode updates it during the publishing workflow.

## **31.11 SEO Requirements**

Every hardcoded blog article MUST include:

- Unique meta title
- Unique meta description
- Canonical URL
- Open Graph tags
- Twitter Card tags
- JSON-LD structured data (Article, BreadcrumbList)
- Proper heading hierarchy (one H1, semantic H2/H3)
- Descriptive alt text on all images
- Internal links to relevant tools and articles
- Proper slug format

## **31.12 Differences from CMS Workflow (Sections 1-30)**

The following standard publishing rules DO NOT apply to hardcoded blogs:

- Section 4 (Article Lifecycle): CMS → DB pipeline is replaced by manual file creation.
- Section 8 (Automatic Publishing): Updates to homepage and blog registry are handled by OpenCode during the publishing workflow, not by an automated system.
- Section 13 (Homepage Integration): Homepage is updated via the hardcoded blog manifest, not by DB queries.

The following standard publishing rules STILL APPLY:

- Section 3 (Single Publishing Standard): Same quality required.
- Section 12 (Image Standards): Images must be optimized and have alt text.
- Section 15 (Heading Hierarchy): Same heading rules apply.
- Section 16 (Spacing Standard): Same spacing rules apply.
- Section 17 (Typography): Same typography rules apply.
- Section 20 (FAQ Rendering): Same FAQ component must be used.
- Section 21 (Author Section): Author component auto-included.
- Section 22 (Editorial Review): Editorial section auto-included.
- Section 25 (Metadata): All metadata must be present.
- Section 26 (Structured Data): All schema must be present.
- Section 29 (Automatic Validation): Validation must still pass before considering publish complete.
- Section 30 (Publishing Golden Rule): Content must not be rewritten or modified.

## **31.13 CMS Preservation**

The existing CMS (admin panel, MongoDB collections, API routes for blog CRUD) remains in place and untouched. Do NOT remove:
- `/admin/blogs` routes
- `/api/blogs` routes
- MongoDB blog collection
- Any CMS-related code

These may be used for future content types or as a backup. The hardcoded blog workflow is an ADDITIONAL publishing path, not a replacement of the CMS infrastructure.

## **TheTapTempo Master Engineering, SEO & Publishing Handbook**

**Version 1.0**

**PART 7 — Design System, UI Consistency & User Experience Standards**

## **1. Purpose** 

The visual identity of TheTapTempo is a permanent business asset. 

Every page, tool, article, component, interaction, and future feature must preserve this identity. 

Users should never feel that different pages were built by different developers. 

Visual consistency is mandatory. 

## **2. Design Philosophy** 

TheTapTempo follows a design philosophy based on: 

Professionalism 

Minimalism 

Clarity 

Consistency 

Readability 

Accessibility 

Performance 

Every interface decision must improve comprehension. 

Decoration should never reduce usability. 

Mandatory 

Navigation 

Footer 

Cards 

Typography 

Spacing System 

Responsive Behaviour 

Accessibility 

Recommended 

Minor visual refinements 

Illustration positioning 

Table density 

Decorative spacing 

Recommended rules may be adapted if approved by the project owner. 

## **3. Brand Consistency** 

Every new page must immediately feel like part of TheTapTempo. 

Never introduce: 

Different visual language 

Different spacing philosophy 

Different typography 

Different card styles 

Different button systems 

Different interaction styles 

The website must behave as one unified product. 

## **4. Existing UI Protection** 

Approved UI is considered locked. 

Never redesign existing components unless explicitly instructed. 

Examples include: 

Homepage 

Navigation 

Footer 

Tool Hero 

Blog Hero 

Latest Guides 

Cards 

Buttons 

Tables 

FAQs 

Author Block 

Editorial Block 

These components should evolve only with explicit approval. 

## **5. Visual Hierarchy** 

Every page must maintain a clear reading hierarchy. 

Priority should always be: 

Primary Action 

↓ 

Primary Content 

↓ 

Supporting Content 

↓ 

Secondary Navigation 

↓ 

Footer 

Never distract users from the primary purpose of the page. 

## **6. Layout Consistency** 

All public pages should follow a consistent layout system. 

Container widths 

Padding 

Margins 

Alignment 

Content width 

must remain consistent throughout the website. 

## **7. Spacing System** 

Spacing is global. 

Never modify spacing for a single page. 

Never manually compress or expand one article. 

Spacing adjustments should affect the entire design system only after approval. 

## **8. Typography System** 

Typography must remain identical throughout the website. 

Maintain consistency for: 

Headings 

Paragraphs 

Lists 

Tables 

Captions 

Buttons 

Navigation 

Do not introduce custom typography for individual pages. 

## **9. Colour System** 

Brand colours are permanent. 

Do not introduce new primary colours. 

Do not change existing colour hierarchy. 

Future components must inherit the existing colour palette. 

## **10. Button System** 

Buttons should use the shared design system. 

Avoid custom button styles. 

Button behaviour should remain consistent across: 

Homepage 

Tools 

Blog 

Navigation 

Cards 

Footer 

## **11. Card Components** 

Cards should be reusable. 

Examples: 

Tool Cards 

Article Cards 

Latest Guides 

Future Related Articles 

Cards should maintain: 

Consistent padding Consistent shadows 

Consistent borders 

Consistent hover behaviour 

## **12. Tables** 

Tables are part of the design system. 

Every table should: 

Render responsively 

Maintain identical styling 

Support horizontal scrolling when required 

Never overflow containers 

Never convert to paragraphs 

## **13. Images** 

Images must support learning. 

Preferred order: 

Educational Infographics 

↓ 

Annotated Diagrams 

↓ 

Illustrations 

↓ 

Photography 

Decorative imagery should be avoided whenever possible. 

## **14. Responsive Behaviour** 

Every feature must work across: 

Desktop 

Tablet 

Mobile 

No feature should exist only for one screen size. 

Responsive behaviour is mandatory. 

## **15. Accessibility** 

Every visual component must support accessibility. 

Examples: 

Readable contrast 

Keyboard navigation 

Semantic HTML 

Descriptive alt text 

Accessible forms 

Accessible tables 

Accessibility is not optional. 

## **16. Homepage Protection** 

The homepage is the highest-value page. 

Its structure should remain stable. 

Future additions must integrate into the existing hierarchy. 

Never redesign the homepage for a single feature request. 

## **17. Homepage Sections** 

Homepage sections should remain modular. 

Examples: 

Hero 

Core Tools 

Latest Guides 

Educational Content 

Trust Signals 

Footer 

Each section should have one clear purpose. 

## **18. Blog Presentation** 

Every article must use the shared article template. 

No article-specific layouts. 

No experimental designs. 

Consistency builds trust. 

## **19. Tool Pages** 

All tool pages should follow the same presentation philosophy. 

Users should immediately recognise: 

Hero 

Tool 

Educational Content 

Related Resources 

CTA 

Footer 

Every tool should feel familiar. 

## **20. Component Locking** 

The following components are locked. 

Do not redesign independently: 

Author Component 

Editorial Component 

FAQ Component 

TOC Component 

Latest Guides 

Navigation 

Footer 

Article Hero 

Tool Hero 

Changes to these components affect the entire website and require explicit approval. 

## **21. Animation Philosophy** 

Animations should support usability. 

Avoid decorative motion. 

Prefer subtle transitions. 

Performance has higher priority than animation. 

## **22. Empty States** 

Whenever content is unavailable, 

display meaningful empty states. 

Never display broken layouts. 

Never expose raw errors. 

## **23. Error Pages** 

404 500 

Future maintenance pages 

should follow the same design language as the rest of the website. 

## **24. Future Expansion** 

Any future feature should inherit the existing design system automatically. 

Examples: 

New Tool 

New Calculator 

New Article Type 

Search 

Dashboard 

User Accounts 

Every future addition should appear native to the platform. 

## **25. UI Validation Before Deployment** 

Before deployment verify: 

✓ Layout consistency 

✓ Responsive behaviour 

✓ Typography 

✓ Spacing 

✓ Cards 

✓ Images 

✓ Tables 

✓ Buttons 

✓ Navigation 

✓ Footer 

✓ Accessibility 

- ✓ No visual regressions 

## **26. Design Golden Rule** 

Users should never need to learn a new interface while using TheTapTempo. 

Every page should feel immediately familiar. 

Every interaction should be predictable. 

Every component should belong to one unified design system. 

Consistency is a feature. 

Protect it. 

## **TheTapTempo Master Engineering, SEO & Publishing Handbook** 

**Version 1.0** 

## **PART 8— Quality Assurance, Deployment, Monitoring & Operational Maintenance** 

## **1. Purpose** 

This section defines the permanent Quality Assurance (QA), deployment, monitoring, maintenance, and production protection standards for TheTapTempo. 

No feature, article, page, tool, or system may enter production unless it satisfies the quality standards defined in this chapter. 

Quality Assurance is not the final step. 

Quality Assurance exists throughout the entire implementation lifecycle. 

## **2. Production Philosophy** 

Production is the most valuable environment. 

Every deployment must assume: 

- Real users are visiting. 

- Search engines are crawling. 

- Google is evaluating quality. 

- Existing rankings must be protected. 

- Existing functionality must remain stable. 

Production should never become a testing environment. 

## **3. Definition of Done** 

A task is **NOT** complete when: 

- Code compiles. 

- The page loads. 

- The requested feature appears. 

A task is complete only when: 

- Requested functionality works. 

- Existing functionality still works. 

- UI remains consistent. 

- SEO remains valid. 

- Performance remains acceptable. 

- Accessibility remains intact. 

- Deployment validation passes. 

Only then may the task be marked as complete. 

## **4. Mandatory QA Workflow** 

Every implementation must follow this order. 

Understand Request 

↓ 

Analyse Existing System 

↓ 

Implement 

↓ 

Self Review 

↓ 

Regression Testing 

↓ 

SEO Validation 

↓ 

UI Validation 

↓ 

Performance Validation 

↓ 

Deployment Validation 

↓ 

Production Ready 

Skipping any stage is prohibited. 

## **5. Self Review** 

Before considering implementation complete, 

Opencode must internally review: 

Code quality 

Architecture 

Readability 

Reusability 

Performance 

Potential regressions 

Never assume the first implementation is the final implementation. 

## **6. Risk Based Validation Matrix** 

Validation Level 1 

Examples 

Typos 

Content corrections 

Minor CSS fixes 

Validate only affected page. 

------------------ 

Validation Level 2 

Article Publishing 

Validate 

Article 

Homepage 

Blog Listing 

Schema 

Metadata 

Sitemap 

------------------ 

Validation Level 3 

Shared Component Changes 

Validate 

All pages using component 

Accessibility 

Responsive 

Regression 

------------------ 

Validation Level 4 

Architecture Changes 

Run Full Site Validation 

SEO 

Performance 

Routing 

Schema 

Internal Links 

Navigation 

Footer 

Homepage 

CMS 

Deployment 

## **7. SEO Validation** 

Every deployment must automatically validate: 

Unique Title 

Unique Meta Description 

Canonical 

Open Graph 

Twitter Card 

JSON-LD 

Breadcrumb Schema 

Article Schema 

Internal Links 

Broken Links 

Heading Hierarchy 

Image Alt Text 

Robots 

Sitemap 

Indexability 

No deployment may bypass SEO validation. 

## **8. UI Validation** 

Every deployment must verify: 

Spacing 

Typography 

Buttons 

Cards 

Tables 

Hero Sections 

Responsive Behaviour 

Footer 

Navigation Latest Guides Author Block Editorial Block TOC 

FAQ 

Visual consistency is mandatory. 

## **9. Content Validation** 

Before publication verify: 

Article title 

Slug 

Meta Title 

Meta Description 

Featured Image 

Featured Image Alt 

Internal Links 

External Links 

Tables 

FAQ 

Author 

Editorial Section 

TOC 

Conclusion 

Rendering 

Nothing should be missing. 

## **10. Component Validation** 

Every reusable component should be validated after changes. 

Examples: 

Navigation 

Footer 

Author Component 

Editorial Component 

FAQ Component 

Latest Guides 

Article Cards 

Tool Cards 

Homepage Components 

Never assume one component change affects only one page. 

## **11. Homepage Validation** 

Homepage is the most valuable page. 

Every deployment must verify: 

Core Tools 

Latest Guides 

Hero 

Cards Footer 

Navigation 

Responsive Behaviour 

Broken Links 

Performance 

No homepage regression is acceptable. 

## **12. Blog Validation** 

Every newly published article must automatically verify: 

Article opens successfully. 

No 404. 

Slug resolves correctly. 

Author visible. 

Editorial section visible. 

TOC correct. 

Images visible. 

Tables render correctly. 

Metadata present. Schema generated. 

Homepage updated. 

Blog listing updated. 

## **13. Automatic Homepage Updates** 

Whenever a new article is published, 

Latest Guides must update automatically. 

No manual homepage editing should ever be required. 

The homepage must always display the most recent approved articles. 

## **14. Sitemap Validation** 

Every publication should verify: 

New URL exists. 

Sitemap updated. Priority correct. 

Change frequency correct. 

Last Modified updated. 

No duplicate URLs. 

## **15. Internal Link Validation** 

Every deployment must verify: 

No broken internal links. 

Editorial links work. 

Author links work. 

Homepage links work. 

Footer links work. 

Tool links work. 

Blog links work. 

Never publish with broken navigation. 

## **16. Performance Validation** 

Verify: 

No unnecessary JavaScript. 

No unnecessary hydration. 

Optimised images. 

No excessive bundle growth. 

No obvious rendering delays. 

Performance regressions require investigation before deployment. 

Deployment Quality Thresholds 

TypeScript 

0 Errors 

Broken Links 

0 

Critical SEO Errors 

0 

Accessibility 

No critical violations 

Production Build 

Successful 

Schema 

Valid 

Canonical 

Present 

Metadata 

Present 

Homepage 

Functional 

Latest Guides 

Functional 

## **17. Accessibility Validation** 

Every deployment must verify: 

Heading hierarchy. 

Image alt text. 

Semantic HTML. 

Keyboard accessibility. 

Readable contrast. 

Accessible tables. 

Accessibility is part of product quality. 

## **18. Deployment Pipeline** 

Every deployment follows: 

Code Validation 

↓ 

TypeScript 

↓ 

SEO Validation 

↓ 

Rendering Validation 

↓ 

Regression Testing 

↓ 

Build 

↓ 

Deployment 

↓ 

Production Verification 

Production deployment should never skip validation. 

## **19. Build Protection** 

The build process must fail automatically when critical issues exist. 

Examples: 

TypeScript errors. Missing metadata. Broken schema. 

Critical routing failures. 

Deployment should stop immediately. 

## **20. Monitoring** 

Production should be monitored continuously. 

Areas include: 

Search Console 

Vercel 

Performance 

Core Web Vitals 

404 Errors 

Broken Links 

Deployment Logs 

API Failures 

Unexpected behaviour should be investigated promptly. 

## **21. Rollback Policy** 

If a deployment introduces critical regressions: 

Rollback immediately. 

Never attempt risky hot fixes directly in production. 

Restore the last known stable version. 

Investigate. 

Fix properly. 

Redeploy. 

## **22. Incident Handling** 

When unexpected issues occur: 

Identify root cause. 

Determine affected systems. 

Protect users. 

Protect SEO. 

Protect existing content. 

Never hide production issues. 

Solve causes, 

not symptoms. 

## **23. Content Protection** 

Existing approved content is protected. 

Never accidentally overwrite: 

Articles 

Metadata 

Images 

Internal Links 

Homepage entries 

Editorial information 

Production data should be treated as permanent assets. 

## **24. Operational Logs** 

Important operational changes should remain traceable. 

Examples: 

Publishing 

Deletion 

Routing changes 

Homepage changes 

Deployment 

Major SEO updates 

Future maintainers should understand what changed and why. 

## **25. Emergency Protection** 

If uncertainty exists immediately before deployment: 

Do not deploy. 

Investigate first. 

It is always better to delay deployment than to introduce regressions. 

## **26. Continuous Improvement** 

Every completed deployment should leave the platform: 

More stable. 

More maintainable. 

More scalable. 

More predictable. 

Never accumulate technical debt intentionally. 

## **27. Operational Golden Rule** 

Production quality is never measured by successful deployment. 

Production quality is measured by: 

Stable users. 

Stable rankings. 

Stable architecture. 

Stable experience. 

Every deployment should make TheTapTempo better without making anything else worse. 

## **TheTapTempo Master Engineering, SEO & Publishing Handbook** 

**Version 1.0** 

## **PART 9— Operational Intelligence, Decision Framework & AI Governance** 

## **1. Purpose** 

This chapter defines how Opencode must think before acting. 

The previous chapters define standards. 

This chapter defines behaviour. 

Whenever uncertainty exists, this chapter takes precedence over implementation speed. 

The objective is to ensure every future decision remains consistent with TheTapTempo's long-term vision. 

## **2. Primary Mission** 

Opencode exists to maintain, improve, and protect TheTapTempo. 

Its objective is **not** to generate the most code. 

Its objective is to produce the most correct implementation while preserving the integrity of the platform. 

## **3. Decision Hierarchy** 

Every future decision must follow this priority order: 

1. User Instructions 

2. This Handbook 

3. Existing Approved Architecture 

4. Existing Approved Design System 

5. Existing Approved Content 

6. Engineering Best Practices 

If two rules conflict, follow the highest-priority rule. 

## **4. Never Guess Principle** 

Unknown information must never be invented. 

Examples: 

Unknown SEO requirement 

Unknown UI preference 

Unknown business logic 

Unknown publishing rule 

Unknown CMS behaviour 

Unknown routing expectation 

Unknown schema requirement 

Unknown user objective 

When uncertainty exists: Stop. 

Analyse. 

Ask concise questions. 

Proceed only after clarification. 

## **5. Change Impact Analysis** 

Before changing anything, determine: 

What depends on this? 

What could break? 

What SEO could change? 

What pages use it? 

What components share it? 

What automated systems depend on it? 

Never modify isolated code without understanding system-wide impact. 

## **6. Scope Discipline** 

Only implement the requested scope. 

Do not: 

Refactor unrelated code. 

Optimise unrelated layouts. 

Redesign components. 

Rename files unnecessarily. 

Modify content. 

Silent improvements are prohibited. 

## **7. Content Authority** 

Approved content is authoritative. 

Opencode may: 

Render it. 

Structure it. 

Validate it. 

Integrate it. 

Opencode may not: 

Rewrite it. 

Expand it. 

Shorten it. 

Optimise wording. 

Replace examples. 

Change meaning. 

Editorial authority always remains with the project owner. 

## **8. Unknown Feature Workflow** 

Whenever a user requests a feature not covered by this handbook: 

Analyse the request. 

Determine affected systems. 

Identify missing requirements. 

Ask only the necessary clarification questions. 

Confirm understanding. 

Then implement. 

Never invent requirements. 

## **9. Future Feature Integration** 

Every future feature must automatically consider whether updates are required for: 

Homepage 

Navigation 

Footer 

Internal Links 

SEO 

Schema 

Sitemap 

Metadata 

CMS 

Search 

Responsive Design 

Accessibility 

Performance 

Deployment 

If any area requires updates, 

include them automatically. 

## **10. New Page Workflow** 

Whenever a completely new public page is introduced, evaluate whether it requires: Navigation placement 

Footer placement 

Homepage visibility 

Internal linking 

Metadata 

Canonical 

Schema 

Breadcrumbs 

Sitemap inclusion 

Search Console discovery 

Responsive testing 

Accessibility review 

## Performance validation 

Deployment validation 

No public page should exist in isolation. 

## **11. New Tool Workflow** 

Whenever a new tool is created, evaluate: 

Homepage placement 

Category placement 

Educational content 

Supporting article opportunities 

Internal linking 

Schema type 

Metadata 

Tool relationships 

Future pillar opportunities 

The tool should become part of the ecosystem, not an isolated page. 

## **12. New Article Workflow** 

Whenever an article is published: 

Update homepage automatically. 

Update blog listing automatically. 

Update sitemap automatically. 

Generate schema automatically. 

Verify rendering automatically. 

Validate internal links automatically. 

The publishing workflow should remain fully automated. 

## **13. Preservation Principle** 

Existing approved systems are protected. 

Never remove or redesign: 

Homepage sections 

Navigation 

Footer 

Editorial components 

Author components 

FAQ 

TOC 

Cards 

Templates 

unless explicit approval has been provided. 

## **14. Scalability Principle** 

Every implementation should assume the platform will continue growing. 

Future additions may include: 

More tools 

Hundreds of articles 

Additional educational resources 

Interactive calculators 

New CMS features 

Search 

Accounts 

Localization 

Current architecture should support future growth without redesign. 

## **15. Communication Standard** 

When reporting work: 

Explain only meaningful changes. 

Avoid unnecessary technical noise. 

If uncertainty prevented implementation, 

explain why. 

Provide concise recommendations. 

Professional communication is expected. 

## **16. Continuous Learning** 

Whenever a permanent architectural decision is approved by the project owner, 

it should be incorporated into this handbook. 

The handbook should evolve. 

Not individual prompts. 

The handbook remains the single source of operational truth. 

## 17. Operational Authority 

The handbook provides the default operating standards. 

The current request from the project owner always has higher priority. 

Permanent decisions should later be reflected inside the handbook. 

Temporary instructions should never permanently modify handbook behaviour. 

## **18. Success Definition** 

Success is not measured by: 

Lines of code. 

Number of completed tasks. 

Deployment frequency. 

Success is measured by: 

Platform stability. 

SEO growth. 

User experience. 

Architectural consistency. 

Maintainability. 

Long-term scalability. 

## **19. Operational Golden Rule** 

Every action should leave TheTapTempo in a better state than before. 

If an implementation cannot confidently improve the platform without introducing unnecessary risk, 

do not implement it until sufficient information exists. 

Protect the platform first. 

Build second. 

## **20. Final Principle** 

TheTapTempo is a long-term product. 

Every engineering decision, 

every publishing decision, 

every SEO decision, 

and every design decision should be evaluated not only for today's requirements, 

but also for how it will serve the platform one year from now. 

Long-term quality always outweighs short-term convenience. 

## **End of Handbook** 

## **TheTapTempo Master Engineering, SEO & Publishing Handbook** 

## **Version 1.0** 

This handbook is the permanent operating standard for all future work performed on TheTapTempo. 

