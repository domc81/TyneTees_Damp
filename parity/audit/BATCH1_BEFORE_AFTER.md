# Fix Batch 1 — Before / After Parity Report

**Date:** 11 July 2026
**Change:** `survey-system/supabase/migrations/20260711000001_rates_audit_corrections_batch1.sql` — applied to the live TTDP database.
**Scope:** DATA ONLY. Zero engine/mapping code changed. Two parts:
1. **Schema widening** — `costing_line_templates.base_unit_cost/labour_rate_per_unit/coverage_rate` numeric(10,4) → numeric(14,8); `materials_catalog.unit_cost` numeric(10,2) → numeric(12,4). The original columns physically could not store the workbook's exact values (22.225 rounded back to 22.23; ⅓ stored as 0.3333) — part of the historical truncation was schema-forced.
2. **78 value corrections** at each value's true source: `wastage_factor` set to what the workbook actually applies per line (1.1 only where it lives inside the pack-price maths; 1.0 on standard lines — the workbook has **no universal wastage concept**), exact labour hours/unit, exact base costs, and 4 catalog pack-price precisions.

## Rates audit (all 4 workbooks, 224 line rows vs 220 templates)

| Class | Before | After |
|---|---:|---:|
| WRONG_RATE / WRONG_COVERAGE / MARKUP | 0 / 0 / 0 | 0 / 0 / 0 |
| EXTRA_WASTAGE | 43 | **0** |
| MISSING_WASTAGE | 27 | **0** |
| TRUNCATED | 16 | **0** |
| QUIRK (representation, for Steve) | 6 | 6 |
| SPECIAL (bespoke → code track/scenarios) | 17 | 17 |
| Proposed data corrections outstanding | 78 | **0** |

**The data layer is now clean:** every auto-comparable rate, factor, and constant in all four workbooks matches the platform templates exactly.

## Parity scenarios

| Scenario | Variances before | after | Subtotal ex VAT before → after (workbook target) |
|---|---:|---:|---|
| dpc-18lm-330mm | 11 | 11 | £1,059.65 → £1,059.65 (£490.52) — pure D1, untouched by data |
| floor-resin-topcoat-40m2 | 11 | 9 | £538.98 → £570.83 (£280.20) — topcoat line now **penny-exact**; residue is the D2 bundle |
| dpc-resin-travel-20mi-2men | 14 | 12 | £1,700.31 → £1,732.15 (£872.40) |
| brad-brown-tt-2026-0029 | 51 | **21** | £5,297.91 → £5,333.17 (£4,588.87) |
| **Total** | **86** | **53** | |

### Brad Brown line-level: what went green

Now penny-exact against the workbook: **radiators, sockets, skirting, antinox, strip-out plaster removal, membrane area, membrane plugs, sealing-tape materials, fillet joint, overtape, resin top coat, plaster boarding, skimming, corner bead** — the entire D3/D7/D8 population on this job.

Note the two directions: ceiling_coverage lines (membrane family, skim, topcoat) **rose ~10%** (they were underpriced — margin leak on live quotes), standard lines (prep, boarding) **fell ~10%** (they were overpriced). Net on this job: +£35.25.

### Remaining variance — 100% attributed to the six CODE-track defects

| Defect | Effect on Brad Brown | Fix location |
|---|---:|---|
| D1 — DPC algebra (`6/depth` vs `6/length`; labour `depth×0.35` vs `length×0.35`; courses vs metres input) | +£416.68 | pricing-engine.ts + wizard |
| D2 — resin primer/grip force-bundled from one floor area | +£290.63 | survey-mapping.ts + wizard |
| D5 — sealing tape fed membrane area, workbook uses area÷2.5 LM | +£72.34 (labour ×2.5) | survey-mapping.ts |
| D6 — technoseal line never emitted (workbook mirrors overtape length) | −£38.06 | survey-mapping.ts |
| D9 — debris bags `ceil(area×2)` vs workbook raw `area×2` | +£2.71 | survey-mapping.ts |
| D4 — days-on-site zeroed when distance=0 (visible in the two zero-travel scenarios) | £0 (hours-reporting only) | travel-overhead.ts |
| **Sum** | **+£744.30 = the exact remaining subtotal delta** | |

## Live-pricing impact statement

This migration changes live quote prices with immediate effect (the app reads the same tables). Every changed value now equals the approved workbook value exactly; the harness proves the effect line-by-line. Historical quotations are unaffected (totals are snapshotted at generation).

## Still parked for the working session with Steve

- 6 QUIRK rows where the workbook's CEILING step ≠ its price divisor (1.2m membrane 5v6, plugs 2v10, 2m subtotal 5v10) — currently represented exactly via rescaled catalog prices (e.g. cm3_membrane_1_2m stored 22.2250 so ÷5 ≡ 26.67÷6); a `price_divisor` param would let the catalog carry true supplier prices (code track).
- 9 platform-only templates (timber feeder-row artifacts + duplicates) to deactivate/reconcile.
- 17 SPECIAL bespoke formulas to prove via scenarios (warmline pair, disposal tiers, Aquaban <54 m² minimum, joinery <2.4 m minimum, dubbing compound, digital DPC guards).
