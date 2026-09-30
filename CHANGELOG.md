# Changelog

All notable changes to this audit. Dates are America/Denver.

## [Unreleased]
### Added
- Marquee star-grade pass: CI (push/PR + weekly drift check), `package.json`
  scripts (`live`, `live:json`, `snapshot`, `hf`, `providers`), `examples/`
  (runnable `verdict-summary.ts`), terminal demo SVG above the fold, social
  preview card (`assets/social-preview.png`), issue/PR templates, CODE_OF_CONDUCT,
  SECURITY.md. GitHub description + 10 topics set via API.
- Dated live snapshot: `data/snapshot-2026-09-30.json` (HF 200, 3 OpenRouter
  matches, article/blog 200).
- Infra recon oddities #17 (381 public Fireworks subdomains) and #18 (Moonshot
  TLS 1.0, Fireworks on Microsoft Entra).
- Author deep-dive lane (Quill) complete: Wachtel benchmarked Kimi K3 herself
  on 2026-07-20 — the Ember-1 piece is the sequel to her own baseline (same
  hands, same methodology); disclosure module verified working with pre-series
  controls; Sep 29 double-header documented.
### Fixed
- Attribution correction: the "40% faster and cheaper" X post (Sep 27) was
  **Dzhulgakov**, not Lin Qiao (three working notes vs one public doc — the
  public doc was wrong). Fixed in `docs/oddities.md` #4.
- Free K3 routes re-probed 2026-09-30: ZenMux + aihubmix reachable;
  TokenRouter/NaraRoute homepages not resolving. README row 6 + confidence
  #18 now carry the re-probe date instead of a present-tense claim.
- `.gitignore` now excludes `.env` (was committable by accident).
- RETRACTED the "Sep 2026 pivot" claim in `docs/oddities.md` #7 and
  `docs/verdict.md`: her "X vs Y" format dates to 2025-09-02, ~16 LLM
  comparison pieces May–Jul 2026. It was our error, not hers.
- Confidence #14 (TNS article is sponsored SEO): 15% → 10% on verified
  disclosure mechanics.
- "On-policy planning and learning" demystified: Fireworks' own cookbook documents
  their async RL recipe as GRPO-family with a literal "`0` is fully on-policy"
  knob — confidence #8 raised 35% → 60% (exact Ember-1 reward recipe still
  undisclosed).
- License-gate odds raised: Fireworks was Moonshot's day-0 K3 launch partner
  (Jul 27, 2026); serving base K3 trips the same $20M gate — confidence #22
  raised 45% → 70%. Gate was in the original Jul 27 license, not a later
  update; License §4(b) "certified inference partner" exemption noted.
- Corrections: NSA/FBI/CISA advisory is AA26-251A dated **Sep 8** (not Sep 9);
  Moonshot denied the earlier July accusation but has no public response to
  the September advisory. LLM Reference tracks "Ember" as a Fireworks model
  family (1 model, 2.78T params listed).
- `docs/oddities.md` #16: per-token pricing rewards long thinking — Ember-1 as
  Fireworks monetizing its own margin, doubling as Training-platform marketing.
### Fixed
- `docs/oddities.md` #12 retitled "Availability decision point, not cliff":
  Oct 7 permanence is "based on community demand," not a guaranteed kill date.
- `docs/article-summary.md`: methodology evolution across Wachtel's three-article
  series (1 run → 5 runs → consistency check) now documented in public.
- README counts corrected (16 oddities, 23 confidence ratios).

## [1.1.0] — 2026-09-30
### Added
- `docs/confidence.md` — 23 confidence ratios, speculation with numbers
- `scripts/live-check.ts` — one-command live re-audit (reads `.env`, `--json` for diffing)
- `.env` / `.env.example` — live-config for pd-mcp, Exa, and audit targets
- Marquee-grade README: 10-second verdict, claims matrix, weirdness, roadmap
- `LICENSE` (MIT), `CONTRIBUTING.md`, issue templates
### Fixed
- `docs/oddities.md` #2: the "undeclared Bedside Bench relationship" critique
  was mostly wrong — Doximity released it open (CC BY-NC-SA 4.0) Sep 22, before
  Ember-1 launched. Replaced with the narrower genuine critique.

## [1.0.0] — 2026-09-30
### Added
- Initial audit: article-claims, Hugging Face verification, provider mapping
- `docs/verdict.md`, `docs/article-summary.md`, `docs/oddities.md`
- `scripts/hf-check.ts`, `scripts/providers.ts` (Bun)
- Site dig: thenewstack.io recon via pd-mcp (httpx/katana)
- Community benchmarks: AI Benchy, HN thread, SEO-mill survey
