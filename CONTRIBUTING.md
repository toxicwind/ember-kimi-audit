# Contributing to ember-kimi-audit

Evidence first. This repo's currency is verified claims, so contributions are
judged on sourcing, not prose.

## What gets merged fast

- **Corrections with live sources.** Wrong number? Link the URL, quote the
  value, stamp the date you observed it. That PR merges same-day.
- **New benchmarks / repros.** Ran Ember-1 or Kimi K3 yourself? Post the
  harness, the raw numbers, and the spend. Especially valuable: anything that
  moves a [confidence ratio](docs/confidence.md).
- **New oddities.** Found something weird with receipts? Add it to
  `docs/oddities.md` following the existing format (claim → evidence → why it matters).

## Ground rules

1. **Live sources only.** A claim needs a URL and an observation date. "I recall"
   is not a source.
2. **Label speculation.** If it's your judgment, say so — see
   `docs/confidence.md` for the house format (ratio + what would move it).
3. **Don't break the quickstart.** If you touch `scripts/`, run
   `bun scripts/live-check.ts` before pushing.
4. **Prices rot.** Anything with a dollar sign gets re-checked via the live
   scripts, not copied from the article.

## Quick start for contributors

```bash
git clone https://github.com/toxicwind/ember-kimi-audit && cd ember-kimi-audit
cp .env.example .env   # optional; defaults work
bun scripts/live-check.ts
```
