#!/usr/bin/env bun
// hf-check.ts — verify Kimi K3 / Ember-1 repos against the live Hub API.
// Usage: bun scripts/hf-check.ts [repo-id ...]
// The API is the verdict; cards and posts are leads.
const ids = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["moonshotai/Kimi-K3", "moonshotai/Kimi-K2.5"];

for (const id of ids) {
  const res = await fetch(`https://huggingface.co/api/models/${id}`, {
    headers: { "User-Agent": "ember-kimi-audit/1.0" },
  });
  console.log(`\n## ${id} -> HTTP ${res.status}`);
  if (res.status === 200) {
    const d = await res.json();
    const sibs = (d.siblings ?? []).map((s: any) => s.rfilename);
    const tok = sibs.filter((s: string) => s.toLowerCase().includes("token"));
    console.log(`gated: ${d.gated} | private: ${d.private} | files: ${sibs.length}`);
    console.log(`license: ${d.cardData?.license ?? "n/a"} | likes: ${d.likes} | downloads: ${d.downloads}`);
    console.log(`tokenizer files: ${tok.length ? tok.join(", ") : "NONE"}`);
    console.log(`sha: ${(d.sha ?? "").slice(0, 12)}`);
  } else {
    console.log((await res.text()).slice(0, 200));
  }
}
