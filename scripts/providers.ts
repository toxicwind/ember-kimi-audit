#!/usr/bin/env bun
// providers.ts — snapshot OpenRouter's live catalog for kimi / ember entries.
// Usage: bun scripts/providers.ts > data/providers-YYYYMMDD.json
// Pricing here is the live truth; article screenshots are stale the moment they ship.
const res = await fetch("https://openrouter.ai/api/v1/models", {
  headers: { "User-Agent": "ember-kimi-audit/1.0" },
});
const { data } = await res.json();
const hits = data.filter((m: any) =>
  /kimi|ember/i.test(m.id) && /k3|ember-1/i.test(m.id)
);
console.log(JSON.stringify({
  observed_at: new Date().toISOString(),
  count: hits.length,
  models: hits.map((m: any) => ({
    id: m.id,
    name: m.name,
    pricing: m.pricing,
    context_length: m.context_length,
    permaslug: m.permaslug,
  })),
}, null, 2));
