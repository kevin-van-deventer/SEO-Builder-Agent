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

---

## 3. Asset & Link Optimization Standards
*   **Image Alt Text**: Every image element MUST include a descriptive, meaningful `alt` attribute describing the visual content for indexing and screen readers. Never use empty alt tags for illustrative images unless they are strictly decorative (e.g. `alt=""`).
*   **Lazy Loading**: Force native lazy loading for all off-screen assets and images: `<img loading="lazy" ... />`. Do NOT lazy load above-the-fold/hero images to avoid negatively impacting LCP.
*   **Link Accessibility & Semantics**: All links (`<a>` or `<Link>`) and buttons (`<button>`) must contain descriptive inner text. For icon-only elements or interactive widgets, supply explicit `aria-label` or `title` properties. Empty or unlabeled clickable elements are critical crawl accessibility issues. Crucially, **all navigation to other routes, phone dialers, external sites, or page section IDs must use hyperlink tags (`<a>` or `<Link>`) rather than `<button>` tags with `onClick` redirection scripts**. If styling requires a button appearance, use class modifiers or component wrappers (such as Radix/Shadcn's `asChild` composition). This allows crawlers to build complete site graphs.

---

## 4. Scroll & Layout Shift Animation Audit
*   **Initial Visibility Verification**: Inspect the initial markup and styles. Any library or script (e.g. dynamic intersection observers, scroll animations like GSAP scroll triggers, dynamic scroll reveals) that hides content (`opacity: 0`, `display: none`, or extreme `translate` offsets) until a scroll event is fired **MUST** be flagged. Search engine crawlers do not execute page scrolls when indexing, so any content revealed only via scroll-triggers remains invisible.
*   **Hardware-Accelerated Animation Rule**: Animations must be executed using properties that do not trigger browser reflows (re-layouts).
    *   **Permitted**: `opacity`, `transform` (scale, rotate, skew), and `translate`.
    *   **Prohibited (Flag for Revision)**: Animating properties that affect physical sizes or positions like `height`, `width`, `margin`, `padding`, `top`, `left`, `right`, or `bottom`. These properties cause recalculation of grids/flexbox trees, leading to layout shifts and performance degradation.
    *   *Exception*: Non-essential visual decorations (animated SVGs, rotating background gradients, cursor highlight animations) are fully exempt.
