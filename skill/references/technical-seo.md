# Technical SEO & Indexability Playbook

Standards for indexability, Core Web Vitals, and initial rendering.

## 1. Initial Server Render Parity
Search engine crawlers process page responses before executing dynamic client-side JS bundles. Critical indexability tags **MUST** be present in the raw server HTML payload:
- **Canonical Tags**: `<link rel="canonical" href="https://yourdomain.com/slug" />`
- **Robots Directives**: `<meta name="robots" content="index, follow" />`
- **Structured Schema Markup**: `<script type="application/ld+json">...</script>`

> [!CAUTION]
> Any application injecting canonical URLs or meta robots tags via client-side `useEffect` or client script hooks is a critical failure. They must be rendered on the server.

---

## 2. Core Web Vitals Optimization
Enforce these targets in all builds:
*   **LCP (Largest Contentful Paint)**: < 2.5s
    *   Preload above-the-fold images: `<link rel="preload" as="image" href="..." />`
    *   Always convert images to modern **WebP** or **AVIF** formats.
*   **CLS (Cumulative Layout Shift)**: < 0.1
    *   Define explicit `width` and `height` properties or `aspect-ratio` bounds on all image elements.
*   **INP (Interaction to Next Paint)**: < 200ms
    *   Defer third-party scripts.
    *   Avoid blocking CPU threads with unnecessary client-side hydration scripts.
    *   *Note*: First Input Delay (FID) was retired in 2024. Always target INP.
