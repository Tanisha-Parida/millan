#!/usr/bin/env node
/**
 * scripts/check-links.mjs
 *
 * Greps every href="#..." in src/**\/*.{tsx,ts,html} and verifies that
 * a matching id="..." attribute exists somewhere in the same codebase.
 *
 * Exit 0 = all links resolve.
 * Exit 1 = broken links found.
 *
 * Usage:  node scripts/check-links.mjs
 *         (or add to package.json scripts: "check-links": "node scripts/check-links.mjs")
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

const ROOT = resolve(new URL('.', import.meta.url).pathname, '..');
const SRC = join(ROOT, 'src');
const HTML = join(ROOT, 'index.html');

// ── helpers ──────────────────────────────────────────────────────────────────

/** Recursively collect all files matching the extension list. */
function walk(dir, exts, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, exts, files);
    } else if (exts.some((e) => full.endsWith(e))) {
      files.push(full);
    }
  }
  return files;
}

// ── collect all source files ─────────────────────────────────────────────────

const sourceFiles = walk(SRC, ['.tsx', '.ts', '.html']);
try { sourceFiles.push(HTML); } catch { /* index.html optional */ }

const allContent = sourceFiles.map((f) => ({
  file: f.replace(ROOT + '/', ''),
  text: readFileSync(f, 'utf8'),
}));

// ── extract all id="..." values ───────────────────────────────────────────────

const idPattern = /\bid=["']([^"']+)["']/g;
const knownIds = new Set();

for (const { text } of allContent) {
  for (const [, id] of text.matchAll(idPattern)) {
    knownIds.add(id);
  }
}

// ── extract all href="#..." values ───────────────────────────────────────────

const hrefPattern = /href=["']#([^"']+)["']/g;

/** @type {{ href: string; file: string; line: number }[]} */
const brokenLinks = [];

for (const { file, text } of allContent) {
  const lines = text.split('\n');
  lines.forEach((line, idx) => {
    for (const [, target] of line.matchAll(hrefPattern)) {
      if (!knownIds.has(target)) {
        brokenLinks.push({ href: `#${target}`, file, line: idx + 1 });
      }
    }
  });
}

// ── report ────────────────────────────────────────────────────────────────────

console.log(`\n🔍  check-links — scanned ${sourceFiles.length} files`);
console.log(`    Known ids: ${[...knownIds].sort().join(', ')}\n`);

if (brokenLinks.length === 0) {
  console.log('✅  All href="#..." links resolve to known ids.\n');
  process.exit(0);
} else {
  console.error(`❌  ${brokenLinks.length} broken link(s) found:\n`);
  for (const { href, file, line } of brokenLinks) {
    console.error(`    ${href}   →   ${file}:${line}`);
  }
  console.error('');
  process.exit(1);
}
