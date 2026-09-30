#!/usr/bin/env bun
// live-check.ts — the one-command live audit. Reads .env, hits every live
// source, and reports what moved since the last run.
//
// Usage: bun scripts/live-check.ts [--json]
//   --json    emit machine-readable JSON for diffing between runs
//
// What it checks (all live, all free):
//   1. Hugging Face Hub API — Kimi K3 repo state (gated? siblings? sha?)
//   2. OpenRouter catalog — ember-1 / kimi-k3 entries + live pricing
//   3. The TNS article — still up? (HTTP status via fetch)
//   4. Fireworks blog — still up?
//
// Anything with a key (pd-mcp on yote, Exa) stays out of this script —
// those run via the .env-documented commands, not from here.

import { existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// --- .env (no dependency, 20 lines) -----------------------------------------
const envPath = join(root, ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i > 0) process.env[t.slice(0, i).trim()] ??= t.slice(i + 1).trim();
  }
}

const UA = { "User-Agent": "ember-kimi-audit/1.0" };
const HF = process.env.AUDIT_HF_K3 ?? "moonshotai/Kimi-K3";
const ARTICLE = process.env.AUDIT_ARTICLE_URL ?? "";
const BLOG = process.env.AUDIT_FIREWORKS_BLOG ?? "";
const HF_TOKEN = process.env.HF_TOKEN;
const asJson = process.argv.includes("--json");

const out: Record<string, any> = { observed_at: new Date().toISOString() };

// 1. Hugging Face -------------------------------------------------------------
try {
  const headers: Record<string, string> = { ...UA };
  if (HF_TOKEN) headers["Authorization"] = `Bearer ${HF_TOKEN}`;
  // Bogus-ID control: a bare 401 proves nothing on this network. Always run it.
  const bogus = await fetch(`https://huggingface.co/api/models/fireworks-ai/Nope-Nope-999`, { headers: UA });
  const real = await fetch(`https://huggingface.co/api/models/${HF}`, { headers });
  out.hf = { bogus_control_status: bogus.status, status: real.status };
  if (real.status === 200) {
    const d: any = await real.json();
    out.hf.gated = d.gated;
    out.hf.private = d.private;
    out.hf.files = (d.siblings ?? []).length;
    out.hf.sha = (d.sha ?? "").slice(0, 12);
    out.hf.downloads = d.downloads;
    out.hf.license = d.cardData?.license ?? null;
  } else {
    out.hf.note = "non-200 — compare against bogus_control_status before concluding anything";
  }
} catch (e: any) {
  out.hf = { error: String(e?.message ?? e) };
}

// 2. OpenRouter catalog --------------------------------------------------------
try {
  const res = await fetch("https://openrouter.ai/api/v1/models", { headers: UA });
  const { data } = await res.json();
  const hits = data.filter((m: any) => /kimi|ember/i.test(m.id) && /k3|ember-1/i.test(m.id));
  out.openrouter = {
    status: res.status,
    matches: hits.map((m: any) => ({
      id: m.id,
      in: m.pricing?.prompt, out: m.pricing?.completion,
      ctx: m.context_length,
    })),
  };
} catch (e: any) {
  out.openrouter = { error: String(e?.message ?? e) };
}

// 3+4. Article + Fireworks blog still up? --------------------------------------
for (const [key, url] of [["article", ARTICLE], ["fireworks_blog", BLOG]] as const) {
  if (!url) { out[key] = { skipped: true }; continue; }
  try {
    const r = await fetch(url, { headers: UA, redirect: "manual" });
    out[key] = { status: r.status, url };
  } catch (e: any) {
    out[key] = { error: String(e?.message ?? e), url };
  }
}

// --- report -------------------------------------------------------------------
if (asJson) {
  console.log(JSON.stringify(out, null, 2));
} else {
  console.log(`live-check ${out.observed_at}\n`);
  const h = out.hf;
  console.log(`HF ${HF}: HTTP ${h.status} (bogus control: ${h.bogus_control_status})` +
    (h.status === 200 ? ` | gated=${h.gated} files=${h.files} sha=${h.sha} dl=${h.downloads}` : ` — ${h.note ?? h.error ?? ""}`));
  const or = out.openrouter;
  if (or.matches) {
    console.log(`OpenRouter: ${or.matches.length} kimi/ember matches`);
    for (const m of or.matches) console.log(`  ${m.id}  $${m.in}/$${m.out} per M  ctx=${m.ctx}`);
  } else console.log(`OpenRouter: ${or.error ?? "no matches"}`);
  for (const k of ["article", "fireworks_blog"]) {
    const v = out[k];
    console.log(`${k}: ${v.status ?? v.error ?? "skipped"}`);
  }
  console.log("\npd-mcp + Exa lanes are manual — see .env for the commands.");
}
