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
- **Link Accessibility**: Ensure every clickable element has a descriptive label or `aria-label` to maintain indexability and accessibility.

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

---

## References & Design Playbooks
See the following comprehensive guides in the `references/` directory to construct state-of-the-art search optimizations:
1. [technical-seo.md](references/technical-seo.md) - Rendering parity, Web Vitals, canonical targets.
2. [on-page-seo.md](references/on-page-seo.md) - Content hierarchies, keyword placements, image formats.
3. [structured-data.md](references/structured-data.md) - Schema boilerplates, LocalBusiness templates, FAQ rules.
4. [eeat-and-crawlers.md](references/eeat-and-crawlers.md) - RSL 1.0, Robots permissions, Dec 2025 E-E-A-T authority.
