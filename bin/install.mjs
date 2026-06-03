#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { homedir } from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SKILL_SRC = join(__dirname, "..", "skill");
const SKILL_NAME = "seo-optimizer";
const home = homedir();
const cwd = process.cwd();

const TARGETS = {
  "claude-code": join(home, ".claude", "skills", SKILL_NAME),
  codex: join(home, ".codex", "skills", SKILL_NAME),
  antigravity: join(cwd, ".agents", "skills", SKILL_NAME),
  "antigravity-global": join(home, ".gemini", "antigravity", "skills", SKILL_NAME),
};

const arg = process.argv[2];

function printUsage() {
  console.log(`
  seo-optimizer-skill - Install the SEO Content and GEO Optimization skill

  Usage:
    npx seo-optimizer-skill <target>

  Targets:
    claude-code          → ~/.claude/skills/seo-optimizer
    codex                → ~/.codex/skills/seo-optimizer
    antigravity          → .agents/skills/seo-optimizer (workspace-local)
    antigravity-global   → ~/.gemini/antigravity/skills/seo-optimizer
    all                  → Install to all (antigravity uses workspace-local)

  Examples:
    npx seo-optimizer-skill claude-code
    npx seo-optimizer-skill antigravity
    npx seo-optimizer-skill all
`);
}

function copySkill(dest, label) {
  try {
    mkdirSync(dest, { recursive: true });
    cpSync(SKILL_SRC, dest, { recursive: true });

    // Count files
    const refs = join(dest, "references");
    const refCount = existsSync(refs) ? readdirSync(refs).length : 0;
    console.log(`  ✓ ${label} → ${dest} (SKILL.md + ${refCount} reference files)`);
    return true;
  } catch (err) {
    console.error(`  ✗ ${label} failed: ${err.message}`);
    return false;
  }
}

if (!arg || arg === "--help" || arg === "-h") {
  printUsage();
  process.exit(0);
}

if (arg === "all") {
  console.log("\nInstalling seo-optimizer skill to all targets:\n");
  let ok = true;
  for (const [name, dest] of Object.entries(TARGETS)) {
    if (!copySkill(dest, name)) ok = false;
  }
  console.log(ok ? "\nDone! Skill installed everywhere." : "\nSome installs failed.");
  process.exit(ok ? 0 : 1);
}

if (TARGETS[arg]) {
  console.log(`\nInstalling seo-optimizer skill:\n`);
  const ok = copySkill(TARGETS[arg], arg);
  console.log(ok ? "\nDone!" : "\nInstall failed.");
  process.exit(ok ? 0 : 1);
}

console.error(`Unknown target: "${arg}"`);
printUsage();
process.exit(1);
