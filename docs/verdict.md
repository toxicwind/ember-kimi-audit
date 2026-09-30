# Verdict — Ember-1 vs. Kimi K3: what the article got right, and the reality underneath

Audit completed 2026-09-30 ~03:50 MDT. Three lanes: article-claims audit
(`../hidden/article-audit.md`), HuggingFace verification (`../hidden/hf-check.md`),
free-provider mapping (`../hidden/providers.md`). All prices and availability
observed live on 2026-09-30; they rot fast — re-run `scripts/` before acting.

## Is it SEO bullshit?

**Mostly no.** It's disclosed launch coverage, and sharper than vendor SEO:

- The conflict of interest is **disclosed, not hidden**: "TNS owner Insight
  Partners is an investor in: Fireworks." Real financial tie; zero concealment.
- The article's own numbers **undercut Fireworks' marketing** (16–23% measured
  reasoning-token savings vs the "40%" headline) — a pure SEO piece would parrot
  the 40%.
- Its sharpest paragraph is **anti-Fireworks**: routing Kimi K3 to a cheaper
  provider erases Ember-1's entire price edge.
- Weakest point: the **3.4× speed headline** reads as a general property but was
  measured only on Fireworks' standard endpoint. Live OpenRouter throughput data
  shows Kimi K3's best provider at 73 tok/s vs Ember-1's 52 tok/s — the ordering
  can invert off Fireworks. The caveat is in the article but buried.

## Site dig — the pub behind the article (2026-09-30, pd-mcp recon)

thenewstack.io via httpx: WordPress 7.1.2 on Cloudflare, Yoast SEO Premium 28.4,
full ad stack (Google Publisher Tag, LinkedIn Ads, DoubleClick, HubSpot) —
a standard ad-supported tech pub, nothing exotic.

- **The Ember-1 piece is #3 of a 4-day benchmark series** by Jessica Wachtel
  (Sep 26: Claude Opus 5.5 vs Opus 5; Sep 28: GPT-6 Sol vs Opus 5.5; Sep 29:
  Ember-1 vs Kimi K3). Same first-person template — vendor claim → "I wanted to
  see…" → identical API prompts → hard custom tests → price/token math →
  cost/speed/quality verdict — with full prompt texts published per post.
- **The 5-runs-each format is genuinely new**: Sep 26 ran each test once;
  Sep 28 introduced "ran each test five times"; the Ember-1 piece calls it
  "the same consistency check I've been adding to my recent testing" — the
  methodology is visibly evolving in real time, self-documented.
- **The Insight disclosure is automated entity-matching, not a sponsorship
  marker**: a `tns-insight-portcos-disclosure` div names specific portfolio
  companies per story (Fireworks here; OpenAI+Anthropic in the Sol piece;
  Anthropic in the Opus piece). The Ember-1 article carries no "sponsored this
  post" marker, and TNS's disclosure guidelines require one on paid posts.
- **No Fireworks beat**: WP search shows the Ember-1 piece is the only recent
  Fireworks story — no cadence suggesting a relationship.
- Author background: InfluxData developer-marketing writer; her "X vs Y" hands-on
  format dates to 2025-09-02 and she benchmarked **Kimi K3 herself on
  2026-07-20** ("Same results, one-third the cost, 4x slower") — the Ember-1
  piece is the sequel to her own baseline, same methodology. (The earlier
  "Sep 2026 pivot" framing was wrong; retracted.) Full recon in
  `../hidden/author-dig.md`.

## Reality check, claim by claim

| Claim | Verdict |
|---|---|
| Launched Sep 23 2026, research preview, built on Moonshot's open-weight Kimi K3 | ✅ Verified (Fireworks blog verbatim; 5 outlets confirm date) |
| "Cut unnecessary reasoning" — 40% fewer tokens | ⚠️ Partial — Fireworks' own table spans **5.9%–51.9%** by benchmark; 40% is a rounded aggregate. The article's 16–23% is the more honest number for reasoning tasks |
| $3/$15 on OpenRouter; Kimi as low as $1/$9 elsewhere | ✅ Verified — and the floor is now **lower**: Sail Research **$0.3654**/$9.13, InferenceNet $0.40/$9.00 (live) |
| 3.4× faster | ⚠️ Author-measured, Fireworks-only; internally consistent (3.30×/3.21×/3.81×) but not a general property |
| 14/15 vs 15/15, one arithmetic slip | ✅ Internally consistent; not independently reproducible without spend |

## The free question (what Chris actually asked)

- **Ember-1 free: nobody.** API-only research preview, no weights published
  (four-witness absence: HF search, fireworks-ai org listing, web index, press —
  all negative), zero `:free` endpoints on OpenRouter, single provider
  (Fireworks). Two-week access windows; permanence tied to demand.
- **Kimi K3 free: none on OpenRouter**, but genuine free routes exist
  off-OpenRouter — ZenMux, TokenRouter, NaraRoute (`kimi-k3-free` slugs),
  aihubmix (50k tokens/day after a $1 top-up), Moonshot invite promos, and chat
  front-ends (ChatHub/Poe/zlo.io promo windows). Weights are public and ungated
  (`moonshotai/Kimi-K3`, 1.3M downloads/month) under a custom license — self-host
  if you want truly free.

## Bottom line

Ember-1 is real, derived from Kimi K3 per Fireworks' own blog, and does think
shorter — just not 40% shorter on every workload, and not faster than Kimi K3
everywhere. The article is competent launch coverage with standard
single-vendor-benchmark caveats, not deceptive SEO. If you want Kimi-class
quality for free, the answer isn't Ember-1 — it's Kimi K3 itself, via the free
tiers or the open weights.
