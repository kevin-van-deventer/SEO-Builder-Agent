---
name: seo-optimizer
description: "Comprehensive Search Engine Optimization (SEO), GEO, and E-E-A-T playbook installer for Claude Code, Codex, and Antigravity."
---

# SEO Page & Content Optimizer Skill

A comprehensive playbook, standard, and instruction set for executing high-fidelity technical SEO audits, Google Core Update compliance, E-E-A-T trust evaluation, Really Simple Licensing (RSL 1.0) protocols, and Generative Engine Optimization (GEO) adaptations.

## Core Directives

### 1. Technical SEO & Indexability
- **Initial Server Render Parity**: Ensure that critical head tags (canonical URLs, meta robots rules, JSON-LD schemas) exist in the **raw server payload**. Flag any client-side JavaScript injection of canonicals or robots directives as critical risk.
- **Core Web Vitals Thresholds**: Focus on INP (< 200ms) as the primary responsiveness metric. First Input Delay (FID) was retired in September 2024. Keep CLS < 0.1 and LCP < 2.5s using modern lazy loading and image structures.
- **Canonical Consistency**: Every page must have a self-referencing canonical URL inside the raw server payload matching the target production URL.
- **Image Optimization & Assets**: Ensure descriptive `alt` text is present on every image. Force lazy loading (`loading="lazy"`) for all off-screen assets. Convert images to modern WebP/AVIF format.
- **Link Accessibility & Semantics**: Ensure every clickable element has a descriptive label or `aria-label` to maintain indexability and accessibility. Crucially, **all links to pages, phone calls, external URLs, or section targets must be native hyperlink tags (`<a>` or React/Next.js `<Link>`) and NOT `<button>` tags with `onClick` navigation handlers**. If a link needs to look like a button for design consistency, style the anchor/Link tag using CSS or component decorators (such as shadcn's `<Button asChild>`). This guarantees search crawlers can discover and follow all internal and external pathways.
- **Immediate Visibility & Animation Audit**: Audit components to ensure all text and critical elements are immediately visible on initial page load (no scroll-triggered reveal animations or hidden layout shifts). Crawlers often fail to trigger scroll events, causing hidden elements to be missed during snapshots. If a scroll-reveal or layout-trigger JS animation hides content on load, flag it as a critical SEO error. Advise the developer to rely on pure CSS transitions and restrict animations to safe layout-accelerated properties (`opacity`, `transform`, `translate`). Animating size properties (`height`, `width`, `margin`, `padding`) that trigger browser reflows must be flagged as a layout shift risk. (Decorative SVGs and non-essential backgrounds are exempt). **Always execute the script `node .agent/skills/seo-optimizer/scripts/check-animations.cjs` to audit the project's source code for these violations automatically.**

### 2. On-Page & Content Optimization Audit
- **Title and Slug Standards**: Unique, descriptive titles (< 60 chars) near the start, in format `"Primary Keyword | Brand Name"`. Slug must be lowercase, short, descriptive, containing no stop words. Avoid generic structures (e.g., "Home - Xo Fit"). Instead, use highly localized, keyword-rich headings (e.g., "Xo Fit | Personal Training & Group Sessions in Pretoria").
- **Heading Hierarchy**: Exactly ONE `<h1>` per page matching the main topic and containing the primary keyword. All subheadings (`<h2>`, `<h3>`) must be nested sequentially without skipped levels.
- **Semantic Outline**: Build with semantic structure first. Utilize `<header>`, `<footer>`, `<main>`, `<section>`, and `<article>` tags to structure the document outline.
- **NAP & Local SEO**: Ensure Name, Address, and Phone (NAP) are consistent in the footer, map embed, and location-targeted service layouts.
- **Content Cannibalization**: Guarantee each separate route has unique and high-value content to avoid internal keyword conflicts.

### 3. Structured Data (JSON-LD)
- Integrate valid, fully-formed JSON-LD schemas wrapping them strictly inside `<script type="application/ld+json">`.
- Standardized templates must cover: `WebSite`, `LocalBusiness`, `BlogPosting`, `Service`, `BreadcrumbList`, `Gym` (for fitness/gym homepages), and `Product` (for commercial/shop offers). FAQPage schemas must be restricted to non-commercial education, information, or government resources only.

### 4. E-E-A-T & AI Crawler Compliance (robots.txt & RSL 1.0)
- **Credibility Proof**: Include first-person experience markers ("our team evaluated", "in my hands-on test") and visible bylines linking to active credential profiles.
- **AI Crawler Controls**: Configure `robots.txt` and `/llms.txt` to permit accredited search bots (`OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`) and deny scraping bots (`GPTBot`, `Claude-Web`, `Google-Extended`).

### 5. Social Media Sharing & Open Graph (OG) Preview Optimization
- **Preview Thumbnail Dimensions**: Always generate or provide a custom high-quality sharing thumbnail image, strictly sized at `1200x630` pixels (1.91:1 aspect ratio) for standard large image previews (`summary_large_image`).
- **Absolute Image URLs**: When declaring Open Graph images (`og:image` and `twitter:image`), always reference absolute URLs (e.g. `https://xofit.co.za/social-thumbnail.png` rather than relative paths `/social-thumbnail.png`). Social platform crawlers (WhatsApp, Facebook, Discord, etc.) often fail to resolve relative assets.
- **HTML Fallback Parity**: Social scrapers usually request the raw HTML payload without executing JavaScript. Thus, standard Open Graph (`og:*`) and Twitter Card (`twitter:*`) tags must be present in the raw server payload (e.g. `index.html`) as a fallback, mirroring the titles, descriptions, and thumbnails generated dynamically in client-side React routes.

---

## References & Design Playbooks
See the following comprehensive guides in the `references/` directory to construct state-of-the-art search optimizations:
1. [technical-seo.md](references/technical-seo.md) - Rendering parity, Web Vitals, canonical targets.
2. [on-page-seo.md](references/on-page-seo.md) - Content hierarchies, keyword placements, image formats.
3. [structured-data.md](references/structured-data.md) - Schema boilerplates, LocalBusiness templates, FAQ rules.
4. [eeat-and-crawlers.md](references/eeat-and-crawlers.md) - RSL 1.0, Robots permissions, Dec 2025 E-E-A-T authority.
