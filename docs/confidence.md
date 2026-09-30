# Confidence ratios — Ember-1 / Kimi K3 audit

Chris asked for speculation with numbers. These are my quantified judgments,
not measurements. Each ratio is P(claim is true) given everything observed
2026-09-30. Evidence for/against inline; "what moves it" says what would
change the number. High confidence ≠ verified — only live sources verify.

## Model existence & provenance

| # | Claim | Confidence | Why |
|---|---|---|---|
| 1 | Ember-1 is a real Fireworks Research Preview built on Kimi K3 | **97%** | Fireworks blog verbatim, API + playground live, 5+ outlets, Vercel AI Gateway listing. The 3% is "research preview" theater risk. |
| 2 | "Built on Kimi K3" means fine-tuned/distilled from K3 weights (not just prompted) | **55%** | "Built on" is doing a lot of work. 50+ training experiments on their own training platform suggests real weight updates, but no weights, no technical report, no method — could be anything from full fine-tune to RL on traces. Moves to 90%+ with a technical report or weight diff. |
| 3 | Kimi K3 weights are public and ungated (`moonshotai/Kimi-K3`) | **99%** | Live Hub API: 200, siblings list, no gating. |
| 4 | No Ember-1 weights are published anywhere | **90%** | Four-witness absence (HF search, fireworks-ai org, web index, press). Absence is hard to prove — the 10% is a private/dark release. Moves with a repo appearing. |

## The efficiency claims

| # | Claim | Confidence | Why |
|---|---|---|---|
| 5 | Ember-1 uses ~40% fewer reasoning tokens than K3 *on some workloads* | **70%** | Fireworks' own table spans 5.9%–51.9% across benchmarks; TNS measured 16–23%; customer A/Bs ~35%. Direction is solid, the headline number is a cherry-picked aggregate. "40% everywhere" would be 20%. |
| 6 | The 3.4× speedup is a property of the model (not the endpoint) | **25%** | Measured only on Fireworks' standard endpoint with both models routed there. Live OpenRouter throughput shows K3's best provider at 73 tok/s vs Ember-1's 52 tok/s — ordering inverts off Fireworks. Speedup is serving + shorter traces, not a model constant. |
| 7 | Shorter reasoning *outperforms* longer traces on some agentic benchmarks | **75%** | Terminal Bench 2.1 (82.0 vs 80.9) and DeepSWE 1.1 (75.2 vs 66.4) from Fireworks' table, corroborated by independent writeups. The margins are thin and it's their table — but the direction is the least self-serving number they published. |
| 8 | "On-policy planning and learning" is a real, novel training method | **35%** | It's a phrase, not a method. No loss, no data mix, no pipeline. "Developed new training algorithms" is asserted with zero detail. Could be genuine RL innovation or standard RFT with a fancy name. A technical report moves this ±50 points either way. |

## The benchmarks & validation

| # | Claim | Confidence | Why |
|---|---|---|---|
| 9 | Bedside Bench Pareto-frontier claim (beats GPT-5.6 Sol, GPT-6 Astra, Claude Opus 5 on cost/task) | **45%** | The benchmark itself is legitimate — Doximity released it Sep 22 as an open, physician-validated 500-case set (CC BY-NC-SA 4.0), BEFORE Ember-1 launched. But the evaluation framework (SII) is Fireworks' own, introduced the same week, and the numbers are self-reported. Independent SII run moves it up; a failed repro craters it. |
| 10 | Fireworks–Doximity have an *undisclosed* commercial relationship | **20%** | The HN critique got this mostly wrong. Bedside Bench is a public Doximity release, not a commissioned benchmark, and investor press covers a Doximity–Fireworks partnership openly. What's genuinely undisclosed is narrower: whether Fireworks had input into the benchmark's design, and the SII methodology itself. |
| 11 | The two-customer production A/Bs show ~35% token savings at comparable quality | **50%** | n=2, undisclosed methodology beyond "developers didn't notice," no published eval protocol. The number is plausible given the benchmark table, but it's anecdote-grade evidence. Customer names + methodology move it up. |
| 12 | Fireworks trained on its own data, no customer data | **40%** | Their assertion only, structurally unverifiable from outside. Consistent with a research-preview posture, but there's no audit trail. |
| 13 | AI Benchy's independent score (Ember-1 high: 7.1, rank #166, 71.2% pass) | **85%** | Genuinely independent, 66 runs, methodology published. Single source, and their harness may not flatter reasoning models — but no reason to doubt the numbers themselves. |

## The article (TNS, Sep 29)

| # | Claim | Confidence | Why |
|---|---|---|---|
| 14 | The TNS article is sponsored/deceptive SEO | **15%** | Disclosed investor tie (automated per-story module), full prompts published, methodology that undercuts Fireworks' 40% headline, anti-Fireworks pricing paragraph. A bought piece doesn't do any of that. |
| 15 | The article's 3.4× was measured honestly on Fireworks' endpoint | **80%** | Internally consistent (3.30×/3.21×/3.81× across test sets), full token/time/cost tables, replicable prompts. The 20% is the usual single-author-benchmark risk, not dishonesty. |
| 16 | The author's 5-run methodology is applied as described | **75%** | Her own copy documents the method evolving in real time (1 run → 5 runs), which is oddly honest. No independent replication exists. |

## Availability & free routes

| # | Claim | Confidence | Why |
|---|---|---|---|
| 17 | Ember-1 free anywhere: nobody | **92%** | API-only, single provider (Fireworks), no `:free` OpenRouter routes, no weights. The 8% is promo credits / gateway trials. |
| 18 | Kimi K3 free routes (ZenMux, TokenRouter, NaraRoute, aihubmix) work today | **60%** | Reported by the provider lane and consistent with known free-tier patterns, but not all re-probed live in the last 24h. Free tiers rot fastest — re-probe before relying. |
| 19 | Ember-1 preview ends ~Oct 7, 2026 (two-week window) | **75%** | Fireworks' stated research-preview cadence — but their own framing is permanence "based on community demand," so Oct 7 is a demand gate, not a hard kill date. The model page already lists it "ready for serverless use." |

## The meta-bets

| # | Claim | Confidence | Why |
|---|---|---|---|
| 20 | Ember-1 is primarily a marketing vehicle for Fireworks' Training platform | **70%** | The blog closes on it explicitly: "Ember is just the start of what you could build with the Fireworks Training platform." The 50+ experiments / 200+ evals / "no GPUs to provision" copy is platform marketing wearing a model launch. Doesn't make the model fake — makes the launch dual-purpose. |
| 21 | No independent Ember-1-vs-K3 head-to-head will appear before the preview ends | **65%** | Four witnesses found zero; the window is ~7 days; repro costs ~$6. Someone motivated could still do it — the TNS prompts are public. |

## Licensing & lineage (new lane, 2026-09-30)

| # | Claim | Confidence | Why |
|---|---|---|---|
| 22 | Fireworks holds a commercial agreement with Moonshot covering Ember-1's serving under the K3 license's $20M MaaS gate | **45%** | The license text (verified in the HF repo) squarely requires it — MaaS, >$20M revenue, derivative works, commercial use. No agreement disclosed by either side. 45% because a company of Fireworks' size *usually* papers this, but Moonshot's total silence is the dog that didn't bark. A filing or statement moves it to 95% or 10%. |
| 23 | Social-media "Ember" benchmark claims describe Fireworks' Ember-1 | **10%** | At least three unrelated things share the name; the viral ones (8B open-weights, BFCL #2) match none of Ember-1's known properties. Treat any social "Ember" benchmark as the wrong model until proven otherwise. |

## How to read this

Anything under 60% is "don't bet on it." 60–85% is "working assumption."
Above 85% is "bet money." The cheapest confidence to buy: re-run
`scripts/hf-check.ts` and `scripts/providers.ts` (free, seconds), and spend
the ~$6 to replicate the TNS runs — that single experiment would move claims
5, 6, 15, and 16 by 20+ points each.
