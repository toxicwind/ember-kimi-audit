<div align="right">

[![audit: live](https://img.shields.io/badge/audit-live%20sources-1f6feb?style=for-the-badge)](docs/verdict.md)
[![weirdness: documented](https://img.shields.io/badge/weirdness-13%20oddities-critical?style=for-the-badge)](docs/oddities.md)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

</div>

<h3 align="center">ember-kimi-audit</h3>
<p align="center">
  An independent, evidence-first audit of the <b>"Ember-1 vs. Kimi K3"</b> coverage —
  what Fireworks launched, what The New Stack measured, and what the live sources actually say.
</p>

<p align="center">
  <a href="docs/verdict.md"><b>The verdict »</b></a> ·
  <a href="docs/oddities.md">Weirdness file</a> ·
  <a href="docs/confidence.md">Confidence ratios</a> ·
  <a href="docs/article-summary.md">Article summary</a>
</p>

```
$ bun scripts/live-check.ts
live-check 2026-09-30T10:23:04Z

HF moonshotai/Kimi-K3: HTTP 200 (bogus control: 401) | gated=false files=119 sha=f831ab668142 dl=1302723
OpenRouter: 3 kimi/ember matches
  fireworks/ember-1  $0.000003/$0.000015 per M  ctx=1048576
  moonshotai/kimi-k3  $0.000003/$0.000015 per M  ctx=1048576
article: 200
fireworks_blog: 200
```

<details><summary><b>Table of Contents</b></summary>
<ol>
  <li><a href="#the-10-second-verdict">The 10-second verdict</a></li>
  <li><a href="#claims-under-audit">Claims under audit</a></li>
  <li><a href="#the-weirdness">The weirdness</a></li>
  <li><a href="#confidence-ratios">Confidence ratios</a></li>
  <li><a href="#reproduce-it-live">Reproduce it live</a></li>
  <li><a href="#project-structure">Project structure</a></li>
  <li><a href="#methodology">Methodology</a></li>
  <li><a href="#roadmap">Roadmap</a></li>
  <li><a href="#contributing">Contributing</a></li>
  <li><a href="#license">License</a></li>
  <li><a href="#acknowledgments">Acknowledgments</a></li>
</ol>
</details>

## The 10-second verdict

Fireworks' **Ember-1** is real — a Kimi K3 derivative that thinks shorter. It
does cut reasoning tokens (16–51% depending on workload), just not the clean
"40%" of the headline, and the "3.4× faster" was measured on Fireworks' own
endpoint — off Fireworks, Kimi K3's best provider is *faster*. The New Stack
article is disclosed, replicable launch coverage, not bought SEO. The genuinely
weird stuff is in the [oddities file](docs/oddities.md).

## Claims under audit

| # | Claim | Status | Detail |
|---|---|---|---|
| 1 | Ember-1 launched Sep 23 2026, research preview, built on Moonshot's open-weight Kimi K3 | ✅ Verified | [verdict](docs/verdict.md#reality-check-claim-by-claim) |
| 2 | ~40% fewer reasoning tokens | ⚠️ Partial | Fireworks' own table: 5.9%–51.9%; article measured 16–23% |
| 3 | 3.4× faster than Kimi K3 | ⚠️ Endpoint-only | Both models routed through Fireworks; OR data inverts it (73 vs 52 tok/s) |
| 4 | $3/$15 on OpenRouter; Kimi as low as $1/$9 elsewhere | ✅ Verified | Floor now lower: Sail Research $0.3654/$9.13 live |
| 5 | 14/15 vs 15/15 perfect runs | ✅ Internally consistent | Not independently reproducible without spend (~$6) |
| 6 | Free providers host Kimi K3 / Ember-1 | ⚠️ Split | Ember-1: nobody. Kimi K3: free tiers off-OR (ZenMux, TokenRouter, NaraRoute, aihubmix) |
| 7 | "On-policy planning and learning" is a disclosed method | ❌ Phrase, not method | No loss, data mix, or pipeline published — [confidence #8](docs/confidence.md) |
| 8 | Bedside Bench relationship undisclosed | ❌ Mostly wrong | Doximity released it open (CC BY-NC-SA 4.0) Sep 22, *before* Ember-1 — [oddities #2](docs/oddities.md#2-bedside-bench--the-undeclared-relationship-critique-is-mostly-wrong) |

Full claim-by-claim: [`docs/verdict.md`](docs/verdict.md).

## The weirdness

Thirteen documented oddities — the short version:

- **The training algorithm is a phrase, not a method.** "On-policy planning and
  learning" has no loss function, no data mix, no pipeline. You can't audit
  what isn't described.
- **The 3.4× headline is endpoint-locked.** Off Fireworks, the speed ordering
  can invert.
- **Shorter reasoning *outperforms* longer traces** on Terminal Bench 2.1 and
  DeepSWE 1.1 — the cut loops were harmful, not just wasteful. The one finding
  that cuts *for* Ember-1 being genuinely different.
- **Zero Reddit footprint** for a 586-point HN launch. No independent
  Ember-1-vs-K3 benchmark exists anywhere — the TNS piece is the only
  head-to-head in existence.
- **Availability cliff:** the Research Preview ends ~Oct 7, 2026.

All thirteen: [`docs/oddities.md`](docs/oddities.md).

## Confidence ratios

Chris asked for speculation with numbers. Every load-bearing claim gets my
quantified judgment — P(claim is true) given all evidence — plus what would
move it:

- Ember-1 is real and built on K3: **97%**
- "Built on" = real weight updates (not prompting): **55%**
- 3.4× is a model property: **25%**
- TNS article is bought SEO: **15%**
- Ember-1 is a marketing vehicle for Fireworks' Training platform: **70%**

All 21: [`docs/confidence.md`](docs/confidence.md). Anything under 60% is
"don't bet on it."

## Reproduce it live

Prices and availability rot fast. One command re-checks every live source:

```bash
# 1. Clone
git clone https://github.com/toxicwind/ember-kimi-audit && cd ember-kimi-audit

# 2. Configure (optional — defaults work; see .env.example)
cp .env.example .env

# 3. Run the live audit (Bun)
bun scripts/live-check.ts
```

Individual lanes:

```bash
bun scripts/hf-check.ts moonshotai/Kimi-K3   # Hub API repo verification
bun scripts/providers.ts                     # OpenRouter catalog snapshot
bun scripts/live-check.ts --json             # machine-readable, for diffing runs
```

The pd-mcp recon lane (ProjectDiscovery: subfinder, httpx, katana, nuclei)
runs from the bridge box — commands in [`.env.example`](.env.example).
Exa neural-search deep-dives are documented in the working notes.

**Prerequisites:** [Bun](https://bun.sh) ≥ 1.0. No API keys needed for the
default lanes — the Hub API and OpenRouter catalog are public.

## Project structure

```
ember-kimi-audit/
├── README.md                  # this file
├── docs/
│   ├── verdict.md             # the full verdict, claim by claim
│   ├── oddities.md            # 13 documented oddities (the weirdness file)
│   ├── confidence.md          # 21 confidence ratios — speculation with numbers
│   └── article-summary.md     # the TNS article's claims, distilled
├── scripts/
│   ├── live-check.ts          # one-command live audit (reads .env)
│   ├── hf-check.ts            # Hub API repo verification
│   └── providers.ts           # OpenRouter catalog snapshot
├── data/                      # dated raw evidence (API responses, snapshots)
├── .env.example               # live-config template (copy to .env)
├── hidden/                    # internal working notes — gitignored, not published
└── .gitignore
```

## Methodology

- **Live sources only.** Hub API `GET /api/models/<id>` (200 + siblings list)
  is evidence; a model card or forum post is a lead. Pricing comes from
  OpenRouter's live catalog, not screenshots.
- **Bogus-ID control.** From this network, deliberately fake Hub repo IDs also
  return 401 — so a bare 401 proves nothing. Every check runs a bogus control.
- **Four-witness absence protocol.** "Doesn't exist" is a verdict, not a shrug:
  skill catalog → bridge sweep → GitHub-wide → web. One empty search is not proof.
- **Dated evidence.** Every finding carries the source URL and observation date.
- **Speculation is labeled.** Confidence ratios in [`docs/confidence.md`](docs/confidence.md)
  are judgments, not measurements — and they say what would change them.

## Roadmap

- [x] Article-claims audit, HF verification, provider mapping
- [x] Community benchmarks + oddities (AI Benchy, HN, mills)
- [x] Site dig: thenewstack.io via pd-mcp (httpx/katana recon)
- [x] Confidence ratios for all 21 load-bearing claims
- [x] One-command live re-audit (`scripts/live-check.ts` + `.env`)
- [ ] Infra recon: fireworks.ai / moonshot.ai via pd-mcp *(lane running)*
- [ ] Community chatter deep-dive: X/Twitter-native, new repros *(lane running)*
- [ ] Author + publication deep-dive: Wachtel archive, TNS ownership *(lane running)*
- [ ] $6 replication of the TNS runs (moves 4 confidence ratios 20+ points)
- [ ] CI: scheduled `live-check --json` with drift alerts

## Contributing

Found a wrong number, a new benchmark, or a weirder oddity? Open an issue or
PR — evidence-first: link the live source and the date you observed it.
Corrections with sources get merged fast.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.
Upstream model weights belong to their publishers (Moonshot AI, Fireworks)
under their own licenses — this repo audits claims about them and ships no weights.

## Acknowledgments

- [AI Benchy](https://aibenchy.com) — the only independent scored benchmark of Ember-1 found
- [genztech.blog](https://genztech.blog) — independently verified the K3 baseline
- [temperaturezero](https://temperaturezero.com) — the sharpest HN critique synthesis
- [Samir Sengupta](https://www.samcodeman.com) — "no weights, no price" framing
- Jessica Wachtel / The New Stack — published full prompts, making this audit possible

---

<p align="center">If this saved you from believing a headline, give it a star. ⭐</p>
