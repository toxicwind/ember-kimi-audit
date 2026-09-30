# Changelog

All notable changes to this audit. Dates are America/Denver.

## [Unreleased]

## [1.1.0] — 2026-09-30
### Added
- `docs/confidence.md` — 21 confidence ratios, speculation with numbers
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
