# Oddities file — Ember-1 / Kimi K3

Everything that smells, consolidated in one place. Observed 2026-09-30.
Sources: `../hidden/community-benchmarks.md`, `../hidden/site-dig.md`,
`../hidden/article-audit.md`, `docs/verdict.md`.

## 1. The training algorithm is a phrase, not a method

Fireworks describes Ember-1's training as "on-policy planning and learning."
That is not a reproducible method — no loss function, no data mix, no
pipeline details. HN's sharpest critique: this reads as competitive moat,
not research contribution. You cannot audit what isn't described.

## 2. Bedside Bench — the "undeclared relationship" critique is mostly wrong

CORRECTION 2026-09-30 (Exa deep-dive): HN/temperaturezero claimed "no
commercial relationship declared" between Fireworks and Doximity. The record
says otherwise — Doximity released Bedside Bench itself on **Sep 22, 2026**
(the day BEFORE Ember-1 launched) as an open benchmark: 500
physician-validated cases, complete grading rubrics, CC BY-NC-SA 4.0, on
Hugging Face and GitHub. It is not a commissioned benchmark; investor press
covers a Doximity–Fireworks partnership openly.

What survives as a genuine critique: the benchmark is *clinical*, being used
to claim a general cost-per-task Pareto frontier; the evaluation framework
(SII — Specialized Intelligence Index) is Fireworks' own, introduced the same
week; and the numbers are self-reported. Confidence the frontier claim holds
independently: 45% — see `docs/confidence.md` #9.

## 3. Production A/B evidence has a ceiling of two

Fireworks' "developers didn't notice" production claim rests on two customers
with undisclosed quality methodology. n=2, no published eval protocol.

## 4. Co-founder overclaim on X

Lin Qiao (Sep 27): "40% faster and cheaper," "hot on HN." Launch materials
substantiate a token *reduction* — not a general 40% latency improvement.
(runtimewire flagged the gap.)

## 5. The 3.4× speedup is endpoint-locked

The New Stack's headline number was measured with both models routed through
Fireworks' own standard endpoint. Live OpenRouter throughput data shows Kimi
K3's best provider at 73 tok/s vs Ember-1's 52 tok/s — the ordering can
*invert* off Fireworks. The article's own numbers also show 16–23% token
savings, not the 40% in Fireworks' headline — her data undercuts their
marketing, which is to her credit.

## 6. Template-velocity benchmark series

The Ember-1 piece is #3 in a 4-day series by one author (Sep 26: Claude Opus
5.5 vs Opus 5; Sep 28: GPT-6 Sol vs Opus 5.5; Sep 29: Ember-1 vs Kimi K3).
Same first-person template, full prompts published per post — but the
methodology is visibly mutating between installments: Sep 26 ran each test
once; Sep 28 introduced "ran each test five times"; the Ember-1 piece calls
it "the same consistency check I've been adding to my recent testing." The
format is being invented in public, and the author is upfront about it.

## 7. Author beat pivot

Jessica Wachtel's archive is InfluxDB tutorials from 2022 (InfluxData bio:
"Developer Marketing Writer"). The AI-model benchmark beat is a September
2026 pivot. Not disqualifying — but the domain authority is weeks old.

## 8. SEO-mill coverage, zero disclosure

techplanet.today ("Revolutionizing Model Efficiency"), marktechpost,
aidailypost, 25finz, ainewsden — mill-toned rewrite coverage, no sponsorship
or relationship disclosure visible anywhere. Only TNS disclosed its investor
tie (Insight Partners → Fireworks), and that disclosure is automated
entity-matching per story, not editorial confession.

## 9. Zero Reddit footprint

A 554–586 point HN launch with 239–249 comments — and no r/LocalLLaMA (or any
subreddit) thread exists. Unusual. Four witnesses (6+ web query variants,
`site:reddit.com` = zero, HN thread with no posted repro, Exa neural search)
also confirm no independent Ember-1-vs-K3 benchmark exists anywhere. The TNS
piece remains the only head-to-head in existence.

## 10. Name collision

A separate open research project "Ember" (v0.1.5, Slow Lit Labs) publishes
long-horizon-coherence evals. Unrelated. Anything about "Ember failing to
beat Qwen3-8B" is that project, not Fireworks'.

## 11. The honest strange result

Shorter reasoning *outperforms* longer traces on Terminal Bench 2.1 (82.0 vs
80.9) and DeepSWE 1.1 (75.2 vs 66.4) — the loops Fireworks cut weren't just
wasteful, they were occasionally harmful. (dev.to/jamilxt, temperaturezero.)
This is the one finding that cuts *for* Ember-1 being genuinely different,
not just cheaper.

## 12. Availability cliff

Two-week Research Preview ends ~Oct 7, 2026; continued serving "depends on
usage." API-only, no weights published, single provider (Fireworks) — plus
Vercel AI Gateway now serving `fireworks/ember-1` (1M context, ZDR). Evaluate
now or lose the endpoint.

## 13. The 401 calibration trap

From this network, deliberately bogus HuggingFace repo IDs
(`fireworks-ai/Nope-Nope-999`, `moonshotai/Nope-Nope-999`,
`bartowski/Nope-Nope-999`, `meta-llama/Bogus-Nope-999`) ALL return HTTP 401.
A bare 401 proves nothing about a repo's existence — always run a bogus-ID
control. (The "401 = gated, therefore exists" rule in the huggingface skill
does not hold here.)

## What's solid underneath

- Ember-1 is real, Fireworks-confirmed, built on Kimi K3 (open weights,
  ungated, `moonshotai/Kimi-K3`).
- AI Benchy's 66 independent runs: Ember-1 (high) scores 7.1, rank #166,
  71.2% pass, $1.80 total — vs GPT-6 Luna at 8.3 and $0.054. Benchy recommends
  Luna at 33.4× cheaper.
- genztech.blog independently verified the K3 baseline (93.4% via vals.ai vs
  Fireworks' 93.2%) — the shared baseline is credible; only Ember-1's side
  lacks outside confirmation.
