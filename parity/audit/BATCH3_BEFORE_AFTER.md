# Code Batch 3 — Before / After Parity Report — **FULL DAMP PARITY**

**Date:** 11 July 2026
**Change:** D1 (DPC) + D2 (floor-resin components) — the last two defects.

## What changed

**D1 — DPC (review point 6, critical):**
- `pricing-engine.ts` `calcDpcInjection` rewritten to the exact workbook R40 algebra: unit cost `= 13.93/1.15 + (6/LENGTH)×4.29` (the drill/plug element amortises over run length — it never scaled with thickness), labour `= LENGTH × 0.35` flat, quantity basis `= length × thickness`.
- Wizard: the brick-courses dropdown is **gone**, replaced by a free numeric **Wall Thickness (m)** field (3dp) — exactly the workbook's E40 cell semantics (confirmed: E40 has no data validation; dropdowns exist only on the digital-DPC row). New field `dpc_wall_thickness_m`.
- Legacy: stored `dpc_wall_depth` (courses) falls back to `courses × 0.215 m` in the mapping, and the wizard shows an amber prompt asking the surveyor to enter the measured thickness. New field always wins.
- Smoke test updated from the previous broken expectation (~£801 material for 10 LM) to the workbook benchmark (18 LM × 0.33 m → £104.58 / 6.3 h / £490.52).

**D2 — floor-resin components (review point 14A, critical):**
- New wizard fields per component — Top Coat / Primer / Grip Grit (m² each), mirroring workbook rows F69-F72: independent quantities, priced **only when > 0**. Fillet keeps its own LM field.
- Mapping emits exactly the entered components; the single-area fan-out is gone.
- Legacy surveys with only `floor_area` map to **top-coat-only** (the benchmark's base interpretation); any component field present takes full control.
- Latent bug fixed in passing: `floor_treatment: 'none'` (a truthy string) previously accumulated floor areas into resin pricing; now prices nothing.

## Parity suite

| Scenario | Batch 2 → Batch 3 | Subtotal ex VAT vs workbook |
|---|---|---|
| dpc-18lm-330mm | 10 → **PASS** | **£490.517382 — exact** (the review's £490.52) |
| floor-resin-topcoat-40m2 | 8 → **PASS** | **£280.198 — exact** |
| dpc-resin-travel-20mi-2men | 12 → **PASS** | **£872.395382 — exact** (hours 7.9, travel £101.68) |
| brad-brown-tt-2026-0029 | 12 → **PASS** | **£4,588.872251 — exact** (hours 49.3052, travel £459.5936) |
| resin-all-components-20m2 *(new)* | — | **£504.2437 — exact on first run** (primer/grip/fillet pack rounding) |
| **Total variances** | **42 → 0** | |

**Cumulative: 86 → 42 → 0.** Baseline → batch 1 (data) → batches 2-3 (code).

The Brad Brown scenario also proves both legacy paths: `dpc_wall_thickness_m` takes precedence over the stored `dpc_wall_depth: 1`, and its bare `floor_area: 40` maps to top-coat-only.

## What this means

- The platform now reproduces the **Damp Costing workbook to the penny** across every tested line: customer prices, materials, labour hours, days on site, and travel — the review's release-gate condition for damp.
- Steven's two "live blocker" prices are fixed at the root: the £907.20 DPC becomes £490.52 for his exact inputs, and the £538.98 floor resin becomes £280.20.
- Live surveyors get: a thickness field that matches how they've used the sheet for years (metres, free entry — per Dom's instinct and the workbook's actual mechanism), and per-component resin entry.

## Follow-ups (not blocking damp parity)

- Surveys stored with legacy courses values re-cost via the ×0.215 stopgap until re-opened and corrected (wizard prompts). TT-2026-0029 itself: thickness 0.33 + top coat 40 should be re-entered on next edit (its stored 20 m² is the halving workaround).
- Resin difficulty-hours row (workbook F73) has a template but no mapping emission — schedule with the SPECIAL-formula scenario pass.
- Warmline as a wall-treatment option (review point 4), multi-thickness DPC walls, and the 17 SPECIAL formulas ride with the next phase, then condensation → timber → woodworm cellmaps.
