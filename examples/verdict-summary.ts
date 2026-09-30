#!/usr/bin/env bun
// verdict-summary.ts — the 10-second audit digest, generated from live data.
// Reads the newest data/snapshot-*.json and prints the headline facts.
// Run: bun examples/verdict-summary.ts
import { Glob } from "bun";

const snaps: string[] = [];
for await (const f of new Glob("data/snapshot-*.json").scan(".")) snaps.push(f);
if (!snaps.length) {
  console.error("No data/snapshot-*.json found. Run: bun run snapshot");
  process.exit(1);
}
snaps.sort();
const snap = await Bun.file(snaps.at(-1)!).json();
const age = Math.round((Date.now() - Date.parse(snap.observed_at)) / 3600);

console.log(`\nember-kimi-audit digest — snapshot ${snaps.at(-1)} (${age}h old)\n`);
console.log(`HF moonshotai/Kimi-K3 : HTTP ${snap.hf.status} (bogus control: ${snap.hf.bogus_control_status})`);
console.log(`  gated=${snap.hf.gated} files=${snap.hf.files} sha=${snap.hf.sha} downloads=${snap.hf.downloads.toLocaleString()}`);
console.log(`OpenRouter kimi/ember matches: ${snap.openrouter.matches.length}`);
for (const m of snap.openrouter.matches)
  console.log(`  ${m.id}  $${m.in}/$${m.out} per M tokens  ctx=${m.ctx.toLocaleString()}`);
if (snap.article) console.log(`TNS article: ${snap.article.status ?? snap.article}`);
if (snap.fireworks_blog) console.log(`Fireworks launch blog: ${snap.fireworks_blog.status ?? snap.fireworks_blog}`);
console.log(`\nAudit verdict: Ember-1 is real (97%), token cut is workload-dependent (70%),`);
console.log(`3.4x speed is endpoint-only (25%). Full reasoning: docs/verdict.md\n`);
