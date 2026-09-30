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

## 12. Availability decision point, not cliff

Two-week Research Preview decision point ~Oct 7, 2026 — permanence is "based on
community demand," not a guaranteed kill date. API-only, no weights published,
single provider (Fireworks) — plus Vercel AI Gateway now serving
`fireworks/ember-1` (1M context, ZDR). Evaluate now or lose the endpoint.

## 13. The 401 calibration trap

From this network, deliberately bogus HuggingFace repo IDs
(`fireworks-ai/Nope-Nope-999`, `moonshotai/Nope-Nope-999`,
`bartowski/Nope-Nope-999`, `meta-llama/Bogus-Nope-999`) ALL return HTTP 401.
A bare 401 proves nothing about a repo's existence — always run a bogus-ID
control. (The "401 = gated, therefore exists" rule in the huggingface skill
does not hold here.)

## 14. The Kimi K3 license gate — Ember-1's commercial serving may require a Moonshot deal nobody has disclosed

Kimi K3 ships under a custom "Kimi K3 License" (modified MIT, not OSI-certified).
Section 2, verified against the license text in the
[`moonshotai/Kimi-K3`](https://huggingface.co/moonshotai/Kimi-K3) repo itself:

> "If the Licensee or any of its affiliates operates a Model as a Service
> business, and the aggregate revenue of the Licensee and its affiliates
> exceeds 20 million US dollars ... over any consecutive 12 months, the
> Licensee must enter into a separate agreement with Moonshot AI before using
> the Software **or its derivative works** for any commercial purpose."

Fireworks is a MaaS business with a self-reported >$1B annualized run rate
($1.505B Series D at $17.5B, July 2026). Ember-1 is a derivative work of Kimi
K3 served commercially. The license gate squarely applies — and no Moonshot
agreement has been disclosed by either side. Moonshot has said zero words
about Ember-1 at all, while negotiating up-to-30% revenue shares with
AWS/Microsoft/Google. Layer the Sep 9, 2026 NSA/FBI/CISA accusation that
Moonshot distilled US models: the lineage question cuts both ways — an
American company's closed derivative of a Chinese model that US agencies say
was distilled from American models.

## 15. At least three different things are called "Ember"

Social is actively mis-describing Ember-1: an IG reel calls it "open-weights,
8B params, #2 on BFCL after GPT-4o"; a Facebook reel calls it an "open-weight
small LLM, ~30 tok/s on a single A10G." Neither describes Fireworks' Ember-1
(API-only, no weights, no size published). Add Slow Lit Labs' "Ember" research
project (long-horizon coherence evals) and at least three unrelated things
share the name. Anyone citing "Ember" benchmarks from social is probably
citing the wrong model. Separately: on Sep 24, the day after launch, an
independent operator hit `fireworks/ember-1` via OpenRouter twice and got HTTP
503 "no healthy upstream" — a real day-one serving failure on that path,
published honestly. Whether it recurred is unknown.

## What's solid underneath

- Ember-1 is real, Fireworks-confirmed, built on Kimi K3 (open weights,
  ungated, `moonshotai/Kimi-K3`).
- AI Benchy's 66 independent runs: Ember-1 (high) scores 7.1, rank #166,
  71.2% pass, $1.80 total — vs GPT-6 Luna at 8.3 and $0.054. Benchy recommends
  Luna at 33.4× cheaper.
- genztech.blog independently verified the K3 baseline (93.4% via vals.ai vs
  Fireworks' 93.2%) — the shared baseline is credible; only Ember-1's side
  lacks outside confirmation.

## 16. Per-token pricing rewards long thinking — only margin-absorbers want it short

From the chatter lane: Threads poster @joonlee0228 noted the incentive flip —
under per-token pricing, providers *benefit* from longer thinking traces, so
short-thinking models only appeal to players absorbing their own serving
margin. Ember-1 is Fireworks monetizing its own margin advantage, and the
launch blog closes by pitching the Fireworks Training platform — the model
doubles as a training-product marketing vehicle. Nobody in the mainstream
coverage has pointed this out.
