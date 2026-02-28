# Costings Engine Audit Report

**Date:** 2026-02-27
**Auditor:** Claude Code (Opus 4.6)
**Scope:** Full comparison of 4 original XLSM workbooks against database seed data and pricing engine code
**Status:** Investigation complete — no changes made

---

## Source Files Audited

| Source | Location |
|--------|----------|
| Damp workbook | `workbook_extraction/workbooks/Copy of Damp Costing v48 CF - 220126.xlsm` |
| Condensation workbook | `workbook_extraction/workbooks/Copy of Condensation PIV Costing v37 CF - 131125.xlsm` |
| Timber workbook | `workbook_extraction/workbooks/Copy of Timber Costing v33 - CF - 131125.xlsm` |
| Woodworm workbook | `workbook_extraction/workbooks/Copy of Woodworm Costing v26 - CF Version - 220126.xlsm` |
| Extraction outputs | `workbook_extraction/output/*.md` (4 files) |
| Extraction script | `workbook_extraction/extract_workbook.py` |
| Database seed | `survey-system/supabase/migrations/00000000000001_seed_data.sql` |
| Pricing engine | `survey-system/src/lib/pricing-engine.ts` |
| Pricing data layer | `survey-system/src/lib/pricing-data.ts` |

---

## 0. Extraction Completeness

VBA analysis across all 4 workbooks confirmed that **ALL calculations live in Excel cell formulas, not in VBA macros**. VBA only handles:

- Section zero-clear buttons (reset input cells to 0)
- CSV export with DELETE-row stripping for zero-cost sections
- PDF report/email generation
- Room section show/hide toggles (Timber only, rooms 2–10)
- Sheet protection on close (password: "window")

**No hidden calculation logic exists in VBA.** The formula-only extraction captured everything relevant to pricing.

### Extraction script limitations (non-impacting)

- No merged cell detection (layout info lost, but doesn't affect formulas)
- No cell comments/notes
- Column caps silently truncate at 50 cols (acceptable — data is within bounds)
- Cell values truncated at 200–300 chars
- No computed values (`data_only=False`) — only formulas captured
- VBA extraction via oletools is complete

---

## 1. Critical Issues

These will produce incorrect quotes and must be fixed before production use.

### CRITICAL-1: `ceiling_coverage` double-division bug

- **File:** `src/lib/pricing-engine.ts`, `calcCeilingCoverage()` function
- **Affects:** 29 line templates across all 4 survey types
- **Severity:** SHOWSTOPPER — material costs are catastrophically too low

**The bug:** The seed data stores `cost_per_coverage_unit` as the per-m² or per-LM cost (e.g. `20.83 / 5 = 4.166` for CM3 membrane). The engine then divides by `coverageRate` again:

```typescript
// CURRENT (BUGGY):
materialAdjustedCost = unitsNeeded * (baseUnitCost / coverageRate * wastageFactor)
```

This double-divides by coverage rate. The workbook formula is:

```
totalMaterial = CEILING(quantity, coverageRate) × costPerUnitMeasure × wastage
             = roundedQty × (roll_price / coverage_rate) × wastage
```

**End-to-end proof (Damp wall membrane section, 20m² wall):**

| Line Item | Qty | Workbook Material | Engine Material | Error |
|-----------|:---:|------------------:|----------------:|-------|
| CM3 Membrane 1m | 20 m² | £119.15 | £4.77 | 96% low |
| Membrane Plugs | 20 m² | £26.68 | £6.67 | 75% low |
| Sealing Tape | 25 LM | £54.80 | £0.11 | 99.8% low |
| Fillet Joint | 10 LM | £35.05 | £0.24 | 99.3% low |
| Overtape | 8 LM | £30.97 | £1.24 | 96% low |
| Fixing Rope | 8 LM | £29.54 | £1.18 | 96% low |
| **TOTAL** | | **£335.19** | **£57.11** | **83% low** |

Labour totals match (within 0.05%), confirming the bug is isolated to material cost calculation.

**Fix options:**

- **Option A — fix formula, keep seed data as-is:** Change the formula so that `cost_per_coverage_unit` (the per-m²/per-LM cost) is multiplied by the rounded quantity, not divided by coverage again:
  ```typescript
  const roundedQty = unitsNeeded * coverageRate;
  materialAdjustedCost = roundedQty * baseUnitCost * wastageFactor;
  ```

- **Option B — fix seed data, simplify formula:** Store `cost_per_coverage_unit` as the full product price (e.g. 20.83 for a 5m roll), then:
  ```typescript
  materialAdjustedCost = unitsNeeded * baseUnitCost * wastageFactor;
  ```

- **Option C — hybrid:** Store the roll/pack price as `base_unit_cost` on the template, keep `coverage_rate` for the CEILING rounding, and use:
  ```typescript
  materialAdjustedCost = unitsNeeded * baseUnitCost * wastageFactor;
  ```

### CRITICAL-2: Timber/Woodworm zero-value line templates

- **File:** `supabase/migrations/00000000000001_seed_data.sql`
- **Affects:** ~8 material costs and ~6 labour rates for Timber and Woodworm survey types
- **Severity:** Items will produce zero material and/or zero labour costs

**Material costs that are 0.00 in DB but non-zero in workbook:**

| Item | Workbook Cost | DB Cost | Survey Types |
|------|:---:|:---:|-------------|
| Dubbing out coat (SBR/sand/cement) | 7.70 | 0.00 | Timber |
| Renovating plaster | 5.96 | 0.00 | Timber |
| EP40 Resin Primer | 62.37 | 0.00 | Timber |
| EP40 Resin Top Coat | 70.07 | 0.00 | Timber |
| Plasterboarding (inc dab/screws) | 9.76 | 0.00 | Timber + Woodworm |
| Plastering Stop Bead 3m | 1.10 | 0.00 | Timber + Woodworm |
| Thin Coat Angle Bead 2.4m | 1.83 | 0.00 | Timber + Woodworm |
| Thin Coat Angle Bead 3m | 2.75 | 0.00 | Timber + Woodworm |

**Labour rates that are 0.00 in DB but non-zero in workbook:**

| Item | Workbook Hours | DB Hours | Survey Types |
|------|:---:|:---:|-------------|
| Remove radiators & cap valves | 0.333 | 0.000 | Timber + Woodworm |
| Remove socket fronts & isolate | 0.200 | 0.000 | Timber + Woodworm |
| Antinox Floor Protection | 0.033 | 0.000 | Timber + Woodworm |
| Remove carpet/tiles/overlays | 0.167 | 0.000 | Timber only |
| Technoseal LM | 0.017 | 0.000 | Timber only |
| Fogging boarded area | 0.023 | 0.000 | Woodworm only |

**Note:** The equivalent Damp line items for the same sections have correct non-zero values. The Timber/Woodworm copies appear to have been seeded with zeros.

### CRITICAL-3: Condensation joinery ducting — zero cost

- **File:** `supabase/migrations/00000000000001_seed_data.sql`
- **Affects:** Condensation survey, joinery ducting section
- **Severity:** Short ducting runs quoted at zero material cost

The DB stores `base_unit_cost=0.00` with `formula_type=fixed_price`. The workbook has a conditional min-charge formula:

```
IF(qty=0, 0, IF(qty<2.4, (15×2.4)/qty, 15))
```

- If qty >= 2.4m: material cost = £15/m
- If qty < 2.4m: minimum charge of £36.00 spread over the short length
- Labour also has a minimum: 1.2 hours (0.5 × 2.4m) for runs under 2.4m

**Current engine result:** £0.00 material cost regardless of quantity.

### CRITICAL-4: Timber treatment formula types wrong

- **File:** `supabase/migrations/00000000000001_seed_data.sql`
- **Affects:** 3 Timber treatment line items
- **Severity:** Materials won't round up to whole purchase units

| Item | Workbook Formula | DB formula_type | Should Be |
|------|-----------------|----------------|-----------|
| Masonry sterilant (Wykabor 20) | ROUNDUP(qty/10, 0) × cost | standard | ceiling_coverage |
| Protective treatment (DP/bug) | ROUNDUP(qty/25, 0) × cost | standard | ceiling_coverage |
| 40.1 Gel injection | ROUNDUP(qty/4, 0) × cost | standard | ceiling_coverage |

With `standard`, the engine calculates `qty × unit_cost × wastage`. With `ceiling_coverage` (once the double-division bug is fixed), it would correctly round up to whole tubs/packs.

---

## 2. Moderate Issues

These produce incorrect results but with lower financial impact than the critical issues.

### MODERATE-1: Warmline IWI missing adhesive cost

- **File:** Damp seed data, Plastering section
- **Affects:** Damp survey, Warmline Internal Wall Insulation line item

The workbook charges for BOTH TIWI roll (£27.60 per 3.5625m² coverage) AND adhesive (£38.50 per 7.125m² coverage). The DB only includes the roll cost.

- Missing: ~£5.40/m² in material cost
- Impact: ~20% undercharge on Warmline IWI material

### MODERATE-2: Skimming walls labour rounding

- **File:** Damp seed data, Plastering section
- **Affects:** All survey types with skimming walls

The workbook uses block-based rounding: `ROUNDUP(area/15, 0) × 4 hours`. The DB uses a linear rate: `0.27 × area`.

Example for 16m²:
- Workbook: ROUNDUP(16/15, 0) × 4 = 2 × 4 = 8 hours
- Engine: 16 × 0.27 = 4.32 hours

### MODERATE-3: Aquaban minimum labour hours

- **File:** Damp seed data, Aquaban section
- **Affects:** Damp survey, external wall treatment

The workbook enforces a minimum of 2.7 hours (54m² × 0.05) regardless of actual area. The DB has no minimum — areas under 54m² will be undercharged for labour.

---

## 3. Minor Issues

Low financial impact or cosmetic.

### MINOR-1: Mursec Eco materials_catalog inconsistency

`materials_catalog` stores 750.00, but `costing_line_templates` uses 650.00, and `pricing_config.digital_dpc_base_cost` = 650.00. The workbook uses 650.00. The catalog entry is wrong; the costing values are correct.

### MINOR-2: Condensation mould_treatment `is_optional` flag

Workbook marks mould treatment as "Optional Item For Customer". DB has `is_optional=false`. Should be `true`.

### MINOR-3: PIV Loft default section adjustment

Workbook defaults PIV Loft section adjustment to -5%. All other sections default to 0%. DB doesn't seed default adjustments.

### MINOR-4: Technoseal wastage override

DB has `wastage_factor=1.10` but the workbook formula (H=80/80=1.0) does not apply wastage. Engine overcharges Technoseal material by 10%.

Fix: Set `wastage_factor=1.000` for the Technoseal line template.

### MINOR-5: Technoseal labour rate rounding

DB stores `labour_rate_per_unit=0.017`. Workbook uses `1/60=0.01667`. Causes ~£0.61 difference over 30 LM.

### MINOR-6: Duplicate materials_catalog entries

Seed data contains two sets: 31 with string IDs (legacy) and 30 with UUID IDs (new engine). These are near-duplicates. Should be consolidated.

### MINOR-7: Minor rounding discrepancies in materials_catalog

All under 1p per unit:

| Material | Workbook | DB | Delta |
|----------|:---:|:---:|:---:|
| Drill Plugs 12mm | 0.0429 | 0.04 | 0.3p |
| CM3 Membrane 1m | 4.166 | 4.17 | 0.4p |
| CM3 Membrane 1.2m | 4.445 | 4.45 | 0.5p |
| CM3 Membrane 2m | 4.417 | 4.42 | 0.3p |
| Fixing Plugs 50mm | 0.0933 | 0.09 | 0.3p |
| Angle Bead 2.4m | 1.658 | 1.66 | 0.2p |
| Angle Bead 3m | 2.492 | 2.49 | 0.2p |
| Multi Finish Plaster | 12.075 | 12.08 | 0.5p |

---

## 4. Engine Hardcoded Values

Values baked into `pricing-engine.ts` that match the workbooks but can't be updated via database:

| Constant | Value | Used In | Risk |
|----------|:---:|--------|------|
| DPC cream base cost | 13.93 | `dpc_injection` | Price change needs code change |
| DPC cream coverage divisor | 1.15 | `dpc_injection` | Business logic in code |
| Drill plug holes per depth | 6 | `dpc_injection` | Business logic in code |
| Drill plug cost fallback | 4.29 | `dpc_injection` | Fallback only (if material lookup fails) |
| DPC labour hours per depth | 0.35 | `dpc_injection` | Business logic in code |
| Tiered disposal threshold | 20 bags | `tiered_disposal` | Business logic in code |
| Tiered disposal hours divisor | 40 | `tiered_disposal` | Business logic in code |
| Tiered fixed hours (>20 bags) | 2 | `tiered_disposal` | Business logic in code |
| Bag/cart hours per bag | 1 | `bag_and_cart` | Business logic in code |
| Disposal material cost/bag | 0.01 | Both disposal types | Nominal tracking cost |

**Note:** The DPC cream base cost (13.93) ideally should come from the materials lookup to allow price updates without code changes.

---

## 5. Engine Edge Cases

| Scenario | Current Behavior | Risk |
|----------|-----------------|------|
| `tiered_disposal` with quantity=0 | `40/0 = Infinity` for labour hours | Division by zero — no guard |
| Missing material in lookup | Returns 0 cost (no error) | Silent undercharge |
| Coverage rate of 0 | Throws Error | Correct |
| Unknown formula type | Throws Error | Correct |
| VAT | Not applied anywhere in engine | Must be handled downstream |

---

## 6. Missing From Platform

Items present in workbooks but not represented in the database or engine:

1. **Travel/overhead calculations** (all 4 WBs, summary rows R139–R155): Number of days, distance, vehicle cost/mile, number of workers. The DB `project_overheads` section exists but has zero line templates.

2. **2m membrane sub-entries** (Damp R46–R48): Three individual 2m wall runs collapsed into one subtotal line in DB. Surveyors can't enter them separately.

3. **Condensation-specific materials** not in `materials_catalog` (PIV units, ducting, fans, vents). Costs baked directly into line templates — price updates require editing individual templates.

4. **Timber/Woodworm treatment chemicals** not in `materials_catalog` (Brunosol, Wykabor 20, 40.1 Gel). Same issue as condensation.

---

## 7. Rates & Markups Verification

All 14 `pricing_config` values match the workbooks exactly:

| Key | DB | Workbook | Status |
|-----|:---:|:---:|:---:|
| hourly_labour_rate | 30.63 | 30.63 | ✓ |
| contractor_hourly_rate | 28.00 | 28.00 | ✓ |
| default_material_markup | 0.30 | 0.30 | ✓ |
| default_labour_markup | 1.00 | 1.00 | ✓ |
| default_wastage_factor | 1.10 | 1.10 | ✓ |
| vat_rate | 0.20 | 0.20 | ✓ |
| skip_hire_8yd_cost | 270.00 | 270.00 | ✓ |
| asbestos_testing_cost | 30.00 | 30.00 | ✓ |
| digital_dpc_base_cost | 650.00 | 650.00 | ✓ |
| vehicle_cost_per_mile | 0.50 | 0.50 | ✓ |
| damp_deposit_pct | 0.30 | 0.30 | ✓ |
| condensation_deposit_pct | 0.50 | 0.50 | ✓ |
| timber_deposit_pct | 0.30 | 0.30 | ✓ |
| woodworm_deposit_pct | 0.30 | 0.30 | ✓ |

Legacy tables (`base_rates`, `markup_config`) also verified correct.

---

## 8. Section Counts

| Survey Type | Workbook Sections | DB Sections | Notes |
|:-----------:|:-:|:-:|-------|
| Damp | 13 | 16 | WB "Walls" split into 3 DB sections + empty `project_overheads` |
| Condensation | 12 | 12 | Match |
| Timber | 10 | 10 | Match |
| Woodworm | 7 | 7 | Match |

**Damp structural note:** The workbook groups DPC Traditional, DPC Digital, and all Membrane items under one "Walls" section with one shared Section Price Adjustment %. The DB splits into 3 sections (`dpc_traditional`, `dpc_digital`, `wall_membrane`), each with its own adjustment. This means a workbook-style single adjustment across all wall items requires setting 3 adjustments in the platform.

---

## Fix Priority Order

| # | Issue | ID | Impact |
|:-:|-------|:--:|--------|
| 1 | `ceiling_coverage` double-division bug | CRITICAL-1 | 29 line items, all survey types, 83% material undercharge |
| 2 | Timber/Woodworm zero-value templates | CRITICAL-2 | ~14 items with missing costs |
| 3 | Condensation joinery ducting zero cost | CRITICAL-3 | 1 item, zero material cost |
| 4 | Timber treatment formula types wrong | CRITICAL-4 | 3 items, no rounding to purchase units |
| 5 | Warmline IWI missing adhesive | MODERATE-1 | 1 item, 20% material undercharge |
| 6 | Skimming walls labour rounding | MODERATE-2 | All survey types, labour undercharge |
| 7 | Aquaban minimum labour hours | MODERATE-3 | 1 item, labour undercharge for small areas |
| 8 | Minor seed data corrections | MINOR-1–7 | Various small fixes |
