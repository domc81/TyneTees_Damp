# Batch 4 — Condensation / Timber / Woodworm Parity — **ALL FOUR WORKBOOKS GREEN**

**Date:** 11 July 2026
**Scope:** extend the golden-master harness to the remaining three workbooks; fix the application-layer defects it exposed.

## New machinery

- `parity/oracle/build_cellmap.py` — cell maps are now **generated from the live workbooks** (line rows by formula signature, section totals, totals block by label search, travel inputs, rates row, template joins via the audit's matcher). Regenerating after a workbook update is one command.
- Extractor learned timber's second line signature (whole-pack `ROUNDUP(F/pack)×I×(1+J59)` rows) — which also surfaced three previously "platform-only" templates as real workbook rows (R105-107).
- Condensation's four identical "Diamond core 107mm hole" labels and three identical electrical-pack labels are pinned to their per-section templates in MANUAL_MAP (the fuzzy matcher had crossed them).

## Defects found & fixed (code only)

| Defect | Fix | Workbook evidence |
|---|---|---|
| **CVent auto-added a core hole 1:1** (a review-point-11 bundling) | New explicit `cvent_core_hole_count` field + wizard input ("0 when replacing a vent in an existing suitable opening"); auto-add removed (legacy path untouched) | Condensation R58 is a free input row |
| **Timber ceiling strip-out misrouted to the WALLS row** ("simplified assumption") | Routes to `plaster_stud_removal_ceilings` (R32) | R30 vs R32 are separate priced rows |
| **Timber debris bags ignored ceiling area** | Bags = 2 × (flooring + affected-ceiling area) | R37 = SUM(F29:F34)×2 — the platform can drive R32+R33 of that range |

## Parity suite — 9 scenarios, all four workbooks

| Scenario | Result | Subtotal ex VAT (identical both sides) |
|---|---|---|
| cond-mixed-fans-core-holes *(point-11 acceptance: replacement fan 0 holes + new fan 1 hole + new CVent 1 hole)* | **PASS — first run** | £954.20 |
| cond-piv-loft-mould-travel | **PASS** | £1,832.1846 |
| timber-joists-flooring-treatments | **PASS** | £4,429.0807 |
| woodworm-treatment-loft | **PASS — first run** | £1,342.1484 |
| all five damp scenarios | **PASS** (no regressions) | — |

**Review point 11's acceptance tests (12-14) are demonstrated:** a replacement fan prices with zero core holes, a new fan adds exactly one, and mixed installation types coexist in one survey — because every core-hole count is an explicit surveyor entry, exactly like the workbook's free input rows.

## Two workbook discoveries requiring Steve

1. The condensation **master carries a saved −5% adjustment on the PIV-loft section** (the only non-zero dial anywhere) — intended pricing or residue? Scenario neutralises + flags it.
2. Timber's resin + sterilant/protective/gel rows use a **whole-pack pricing model** unlike damp's per-m² spread; the platform's timber templates for them were seeded damp-style. Inert today (no timber capture fields) and deliberately kept visible as WRONG_RATE×6 in the audit.

Full inventory of unpriceable workbook rows (survey fields that don't exist yet): `parity/audit/CAPTURE_GAPS.md`.

## Audit state after batch 4

All data classes remain **zero** (0 wrong rates on comparable models, 0 wastage, 0 truncation, 0 outstanding corrections); 6 deliberate WRONG_RATE flags on the timber whole-pack templates awaiting model conversion; 6 QUIRK + 18 SPECIAL unchanged (SPECIAL now includes the timber pack rows' bespoke labour).
