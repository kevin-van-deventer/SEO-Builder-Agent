#!/usr/bin/env node

/**
 * SEO & Animation Compliance Checker
 * Automatically scans the project files for scroll-reveal triggers that hide content on load,
 * and layout-reflow animations that cause Cumulative Layout Shift (CLS) issues.
 */

const fs = require('fs');
const path = require('path');

// ANSI Color Helpers
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

const IGNORE_DIRS = [
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  'out',
  '.agent'
];

const SCAN_EXTENSIONS = ['.tsx', '.jsx', '.ts', '.js', '.html', '.css'];

// Violations definitions
const VIOLATIONS = {
  SCROLL_REVEAL: {
    pattern: /whileInView|useInView|IntersectionObserver/i,
    name: 'Scroll-Reveal/Triggered Visibility (Crawler Blocker)',
    description: 'Hides content initially and reveals it only upon user scroll. Crawlers do not trigger scroll events and will index a blank screen or miss content.',
    severity: 'CRITICAL_SEO_ERROR'
  },
  REFLOW_TRANSITIONS: {
    pattern: /(transition|transition-property|transition|animate|animation|@keyframes)[\s\S]*?(height|width|margin|padding|top|left|right|bottom)(?!-)/i,
    name: 'Layout-Reflow Animation (CLS Hazard)',
    description: 'Animates size, spacing, or physical bounds, triggering browser layout reflows and raising Cumulative Layout Shift (CLS). Use opacity, transform, or translate instead.',
    severity: 'WARNING_CLS_REFLOW'
  }
};

let totalFilesScanned = 0;
let totalViolations = 0;
let criticalErrorsCount = 0;
let warningsCount = 0;

function scanDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        scanDirectory(fullPath);
      }
    } else if (stat.isFile()) {
      const ext = path.extname(file);
      if (SCAN_EXTENSIONS.includes(ext)) {
        checkFile(fullPath);
      }
    }
  }
}

function checkFile(filePath) {
  totalFilesScanned++;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);

  lines.forEach((line, idx) => {
    // Skip checking comments to avoid false positives
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }

    // 1. Check Scroll Reveal
    if (VIOLATIONS.SCROLL_REVEAL.pattern.test(line)) {
      logViolation(filePath, idx + 1, line, VIOLATIONS.SCROLL_REVEAL);
    }

    // 2. Check Reflow Transitions
    // For CSS or Tailwind animation classes, search for width/height/margin/padding animations
    // e.g., transition-all duration-300 hover:w-64 or transition-height
    if (trimmed.includes('transition-') || trimmed.includes('animate-') || trimmed.includes('transition:')) {
      if (/\b(width|height|margin|padding|top|left|right|bottom)\b/.test(trimmed)) {
        logViolation(filePath, idx + 1, line, VIOLATIONS.REFLOW_TRANSITIONS);
      }
    }
  });

  // Specifically check CSS files for transition-property targeting bounds
  if (path.extname(filePath) === '.css') {
    lines.forEach((line, idx) => {
      if (/transition(?:-property)?\s*:\s*(?:width|height|margin|padding|top|left|right|bottom)\b/.test(line)) {
        logViolation(filePath, idx + 1, line, VIOLATIONS.REFLOW_TRANSITIONS);
      }
    });
  }
}

function logViolation(filePath, lineNumber, lineContent, violationType) {
  totalViolations++;
  if (violationType.severity === 'CRITICAL_SEO_ERROR') {
    criticalErrorsCount++;
    console.log(`${RED}${BOLD}[CRITICAL SEO ERROR]${RESET} ${cyan(filePath)}:${lineNumber}`);
  } else {
    warningsCount++;
    console.log(`${YELLOW}${BOLD}[CLS WARNING]${RESET} ${cyan(filePath)}:${lineNumber}`);
  }
  console.log(`  ${BOLD}Type:${RESET} ${violationType.name}`);
  console.log(`  ${BOLD}Reason:${RESET} ${violationType.description}`);
  console.log(`  ${BOLD}Code snippet:${RESET} "${lineContent.trim()}"`);
  console.log('--------------------------------------------------------------------------------');
}

function cyan(text) {
  // Use relative path for cleaner output if running from workspace
  const relPath = path.relative(process.cwd(), text);
  return `${CYAN}${relPath}${RESET}`;
}

// Main Execution
const targetDir = process.argv[2] || '.';
console.log(`\n${BOLD}Starting SEO Animation & Visibility Audit...${RESET}`);
console.log(`Target Directory: ${path.resolve(targetDir)}\n`);

if (!fs.existsSync(targetDir)) {
  console.error(`${RED}Error: Target directory does not exist: ${targetDir}${RESET}`);
  process.exit(1);
}

scanDirectory(targetDir);

console.log(`\n${BOLD}Audit Summary:${RESET}`);
console.log(`  Total Files Scanned: ${totalFilesScanned}`);
console.log(`  Total Issues Found:  ${totalViolations}`);
console.log(`  - Critical SEO Errors (Scroll Reveal):  ${RED}${criticalErrorsCount}${RESET}`);
console.log(`  - CLS Performance Warnings (Reflow):   ${YELLOW}${warningsCount}${RESET}`);

if (criticalErrorsCount > 0) {
  console.log(`\n${RED}${BOLD}STATUS: FAIL. Please refactor all scroll-reveal components before deploying.${RESET}\n`);
  process.exit(1);
} else if (warningsCount > 0) {
  console.log(`\n${YELLOW}${BOLD}STATUS: PASS WITH WARNINGS. Review layout transitions for optimum CWV.${RESET}\n`);
  process.exit(0);
} else {
  console.log(`\n${GREEN}${BOLD}STATUS: PASS. All animations are crawler-visible and layout-safe!${RESET}\n`);
  process.exit(0);
}
