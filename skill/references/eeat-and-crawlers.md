# E-E-A-T & Crawler Compliance Playbook

Established compliance policies for Google Core updates and LLM scraper controls.

## 1. December 2025 E-E-A-T Requirements
- **First-Person Experience**: AI search engines rank content higher when it contains signs of human experience. Integrate first-person markers ("I evaluated...", "our team's hands-on trial...") where appropriate to show first-hand authority.
- **Explicit Authorship**: Renders clean author byline objects that link to active profile pages, displaying credentials, certifications, and active professional profiles.

---

## 2. Dynamic Robots & RSL 1.0 Configurations
Configure the sitemap and crawler limits in the project's root `robots.txt`:

```
# Enforce sitemap canonical pointer
Sitemap: https://yourdomain.com/sitemap.xml

# Authorize indexable search citation crawlers (AEO/GEO bots)
User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

# Restrict AI harvesting scrapers (RSL 1.0 Compliance)
User-agent: GPTBot
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: Google-Extended
Disallow: /

# Prevent crawl paths for system panels
User-agent: *
Disallow: /admin
Disallow: /api/
```
