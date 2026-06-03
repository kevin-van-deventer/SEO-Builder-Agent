# SEO Page & Content Optimizer Agent Skill Installer

This package provides a comprehensive Search Engine Optimization (SEO), GEO, and E-E-A-T playbook installer for Claude Code, Codex, and Antigravity. It is designed to be installed locally within an agent workspace or globally for agentic workflows.

## Target Architectures & Features

- **Technical SEO & Indexability**: Initial server render parity checks, canonical verification, and Core Web Vitals thresholds (INP < 200ms).
- **On-Page & Content Optimization**: URL slugs, keyword density, semantic heading hierarchies (`<h1>` rules), and Local SEO (NAP).
- **Structured Data (JSON-LD)**: Schema templates for WebSite, LocalBusiness, Service, BlogPosting, and BreadcrumbList.
- **E-E-A-T & AI Crawler Compliance**: Credibility proofing, robots.txt crawler permissions, and llms.txt compliance.

---

## Installation & Execution

### 1. Run via Local Node Script
To install the skill in your current active agentic workspace:
```bash
node ./seo-optimizer-skill/bin/install.mjs antigravity
```

### 2. Run via npx (Once Published or Cloned)
```bash
npx seo-optimizer-skill antigravity
```

### Available Targets
- `claude-code`          → `~/.claude/skills/seo-optimizer`
- `codex`                → `~/.codex/skills/seo-optimizer`
- `antigravity`          → `.agents/skills/seo-optimizer` (workspace-local)
- `antigravity-global`   → `~/.gemini/antigravity/skills/seo-optimizer`
- `all`                  → Install to all directories
