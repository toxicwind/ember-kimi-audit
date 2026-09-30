# Article summary — "Ember-1 vs. Kimi K3: Nearly identical results at 3.4 times the speed"

- **Source:** The New Stack, Jessica Wachtel, Sep 29 2026 8:00am
- **Note:** TNS owner Insight Partners is an investor in Fireworks (disclosed at article end).

## Load-bearing claims

1. **Launch:** Fireworks Research launched Ember-1 on **September 23** (2026) as a
   research preview, built on **Moonshot's open-weight model Kimi K3**.
2. **Token claim:** Ember-1 "learned to cut unnecessary reasoning while keeping the
   thinking that matters" — marketing claim of **~40% fewer tokens**.
3. **Method:** Both models via OpenRouter routed to Fireworks, billed $3/M input /
   $15/M output; Kimi also costed at cheapest-listed $1/$9. Each test ran 5× per
   model; reasoning tokens logged separately.
4. **Tests:** logic puzzles (4/5/7 engineers), deploy scheduling (12 services,
   optimal makespan 17h), probability (5 exact-fraction questions, key confirmed by
   2M-request simulation).

## Reported numbers

| Test (5 runs each) | Ember-1 | Kimi K3 |
|---|---|---|
| Logic puzzles | 5/5, 3:46, 13,630 reasoning / 17,766 out, $0.27 | 5/5, 12:26, 16,679 / 22,553, $0.34 |
| Deploy scheduling | 5/5, 1:29, 6,543 / 6,822, $0.10 | 5/5, 4:46, 7,792 / 8,365, $0.13 |
| Probability | 4/5, 1:47, 6,242 / 8,365, $0.13 | 5/5, 6:48, 9,682 / 12,381, $0.19 |
| **Perfect runs** | **14/15** | **15/15** |
| Total on Fireworks ($3/$15) | **$2.48** | **$3.26** |
| Kimi at cheapest ($1/$9) | — | **$1.96** |

- Ember-1's one miss: arithmetic slip on probability Q1 (0.94619 vs 0.94629),
  carried into two other answers.
- Observed (not in marketing): **3.4× faster**, **23% fewer reasoning tokens**
  overall, 24% cheaper on Fireworks — but Kimi at the cheapest provider undercuts it.

## Methodology evolution across the series

Wachtel published three benchmark-format articles in four days, and her method
improved in real time: one run per problem (Sep 26) → five runs with min/max
averaging (Sep 28) → five runs plus a "recently added consistency check"
re-running with no prior chat context (Sep 29). The pieces document their own
corrections — oddly honest for a bought-placement theory, and a real traffic
product either way.

## Author's own baseline: she benchmarked Kimi K3 two months earlier

On 2026-07-20 Wachtel published "Claude Fable 5 vs. Kimi K3: Same results,
one-third the cost, 4x slower" — real coding jobs on the `fd` repo (bug fix,
multi-file refactor, feature build), identical prompts, stopwatch timing,
tokens/cost from Cursor's dashboard, explicit cross-article comparability
framing. The Ember-1 piece (Sep 29) is the sequel to her own baseline — same
hands, same methodology. Nobody covering the launch noticed. This strengthens
the baseline's credibility rather than weakening it.

## Sep 29 double-header

Ember-1 published 12:00:00Z; `claude-opus-5-5-vs-fable-5-1` followed at
15:00:00Z the same day. The benchmark series is a high-throughput traffic
product — which coexists with, rather than contradicts, the honest
methodology.

## Author's verdict

"About as accurate as Kimi K3, far fewer reasoning tokens. If you have time and
want to pay less, Kimi K3 wins (cheaper provider). If you want almost identical
results much faster, use Ember-1."

## Open questions for the audit

- Is Ember-1 actually derived from Kimi K3 weights (fine-tune/distill), or is the
  "built on" framing marketing? Any published weights / HF repo / technical report?
- Does the 40% token-saving claim hold anywhere outside this one benchmark?
- Is the 3.4× speedup a model property or a Fireworks serving artifact?
- Which providers host Kimi K3 free *today*, and at what $1/$9 price — still true?
- Is Ember-1 available anywhere besides Fireworks/OpenRouter-Fireworks?
