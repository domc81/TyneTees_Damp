# Code Batch 2 — Before / After Parity Report

**Date:** 11 July 2026
**Change:** CODE ONLY — no rates touched. Four fixes, each citing its golden-master row:

| Defect | Fix | File |
|---|---|---|
| D5 | Sealing tape quantity = membrane area **÷ 2.5** LM (workbook R51 `F51=SUM(F44:F48)/2.5`); was fed raw area → labour ×2.5 | `survey-mapping.ts` |
| D6 | **Technoseal now emitted**, quantity = overtape length (workbook R52 `F52=F55`); was never mapped at all | `survey-mapping.ts` |
| D9 | Debris bags = strip-out area × 2 **without rounding** (damp R34 / timber R37 / woodworm R34 all `SUM(...)*2`); `Math.ceil` removed from both damp and timber calculators | `survey-mapping.ts` |
| D4 | Days-on-site computed from labour hours **regardless of distance** (workbook R146); travel costs still zero at distance 0 | `travel-overhead.ts` |

## Parity suite

| Scenario | Variances (batch 1 → batch 2) | Subtotal ex VAT (workbook target) |
|---|---|---|
| dpc-18lm-330mm | 11 → **10** | £1,059.65 (£490.52) — days now green |
| floor-resin-topcoat-40m2 | 9 → **8** | £570.83 (£280.20) — days now green |
| dpc-resin-travel-20mi-2men | 12 → **12** | £1,732.15 (£872.40) |
| brad-brown-tt-2026-0029 | 21 → **12** | £5,333.17 → **£5,296.19** (£4,588.87) |
| **Total** | **53 → 42** | |

Cumulative from the original baseline: **86 → 42**.

### Brad Brown — newly green this batch

Sealing tape (labour/hours/total), debris bags (all four fields), licensed disposal, technoseal (now present and penny-exact at £38.06), days on site. Subtotal moved −£36.98 (tape −£72.34, bags/disposal −£2.71, technoseal +£38.06).

### Remaining variance — two defects only

| Defect | Brad Brown effect | Rows |
|---|---:|---|
| **D1** — DPC algebra + courses-vs-metres input | +£416.6848 | 4 line rows |
| **D2** — resin primer/grip force-bundle | +£290.6308 | 2 UNEXPECTED rows |
| Totals rows (consequences of the above) | | 6 |
| **Sum** | **+£707.3156 = exact remaining subtotal delta** | 12 |

Hours: −3.95 = DPC −5.95 + bundle +2.00 exactly.

## Live impact

Deployed on push (Coolify). On live quotes from now: membrane jobs price sealing-tape labour correctly (was ×2.5), gain the previously missing technoseal line, debris priced on exact fractional bags, and time-on-site (days) reports correctly for zero-distance jobs. All four now reproduce the approved workbooks.

## What unblocks full parity

- **D1 (DPC)** — one coherent change: corrected `dpc_injection` algebra (cream `6/LENGTH`, labour `LENGTH×0.35`), wizard input switched from brick-courses to wall construction + thickness in metres, legacy `dpc_wall_depth` translation for stored surveys. Needs Steve's preset list for solid/cavity/stone thicknesses (non-blocking — defaults proposed).
- **D2 (resin components)** — wizard component selection (primer / top coat / grip grit / fillet independently), mapping emits only what's selected; legacy default decision for in-flight surveys.
