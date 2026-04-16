# Workbook Line-by-Line Audit Report
**Date:** 2026-02-28
**Workbooks audited:** Damp v48, Condensation v37, Timber v34, Woodworm v26
**Scope:** Complete costing sheet comparison against DB templates and pricing engine

---

## Executive Summary

Four issues are **critical** (produce wrong output today), two are **major** (material rate or formula type wrong on common items), and several are **minor** (small discrepancies or known anomalies).

Previously-reported issues (CRITICAL-1 through CRITICAL-4 from the Feb 27 audit report) are **not re-reported here**.

---

## Column Key (workbook structure, same across all 4 workbooks)

| Col | Contents |
|-----|----------|
| B | Line item description |
| D | First dimension input (DPC: wall depth; others: unused) |
| E | Second dimension input (DPC: wall length LM; others: unused) |
| F | Quantity input (= D×E for DPC, direct entry for others) |
| H | Unit material rate (often a CEILING.MATH formula; includes wastage) |
| I | Adjusted rate = `(H/100)*(100+section_adj%)` — incorporates section adjustment |
| J | Material markup fraction (0.30 for most items) |
| K | Material total = `F × I × (1+J)` |
| N | Labour hours per unit |
| O | Total labour hours = `F × N` (or `D × N` for DPC — see CRITICAL-A below) |
| P | Labour hourly rate (= `$D$155` = 30.63) |
| Q | Adjusted labour rate = `(P/100)*(100+section_adj%)` |
| R | Labour markup fraction (1.0 = 100% markup) |
| S | Labour total = `O × Q × (1+R)` |
| T | Line total = `K + S` |

---

## CRITICAL ISSUES (wrong output produced today)

---

### CRITICAL-A — `tiered_disposal` formula is completely wrong (Damp, Timber, Woodworm)

**Severity:** Critical — produces costs ~4–10× too high for disposal

**Workbook formula (same in all 3 workbooks that have strip-out):**
```
H = IF(F=0, 0, IF(F<=20, 40/F, 2))    ← unit disposal cost (£40 min / £2 over 20 bags)
N = 0                                   ← ZERO labour hours
K = F × I × (1+J) = tiered_cost × 1.30 ← material charge with 30% markup
S = 0                                   ← no labour cost
```

**What the workbook charges:**
- ≤20 bags: K = £40 × 1.30 = **£52.00** (flat minimum)
- >20 bags: K = qty × £2 × 1.30 = **£2.60/bag**

**What our engine charges (`calcTieredDisposal`):**
```ts
labourHours = 40/qty (if ≤20) or 2 (if >20)    ← WRONG: treats as labour hours
labourTotal = labourHours × 30.63 × 2           ← charges full labour rate
materialTotal ≈ qty × 0.01 × 1.30 ≈ £0         ← effectively zero
```

**Numerical comparison (10 bags):**
| | Workbook | Our engine |
|-|----------|------------|
| Material (K) | £52.00 | £0.13 |
| Labour (S) | £0.00 | £245.04 |
| **Total** | **£52.00** | **£245.17** |

At 30 bags — WB: £78.00, ours: £122.65 (+57%).

**Root cause:** Disposal is a **subcontractor/licensed transfer agent charge** coded as a material cost. It is NOT labour. Our engine inverted this.

**Required fix:**
```ts
// calcTieredDisposal should be:
const tierCost = qty <= THRESHOLD ? MIN_CHARGE : qty * PER_BAG_OVER
materialTotal = applyMarkup(tierCost, materialMarkup)
labourHours = 0
labourTotal = 0
```
Where `MIN_CHARGE = 40`, `THRESHOLD = 20`, `PER_BAG_OVER = 2` (read from `formula_params`).

---

### CRITICAL-B — DPC injection material doesn't scale with wall depth (Damp)

**Severity:** Critical — 2×+ undercharge for standard cavity walls

**Workbook structure for DPC Traditional (row 40):**
```
D40 = wall depth (half-bricks, e.g. 2.5 for cavity wall)
E40 = wall length (LM)
F40 = D40 × E40     ← PRODUCT used as quantity input
H40 = (13.93/1.15) + (6/D40 × 4.29)   ← cream rate per depth-unit per LM
K40 = F40 × I40 × 1.30                ← K scales with BOTH depth AND LM
O40 = D40 × N40 = D40 × 0.35          ← labour = depth × 0.35 (per LM — see NOTE below)
```

Expanding K:
`K = D×E × H × 1.30 = LM × (depth × 12.11 + 6 × 4.29) × 1.30`

This means cream cost scales linearly with both depth and length — physically correct for multi-leaf injection (each half-brick leaf requires its own injection row).

**What our engine produces (`calcDpcInjection`):**
```ts
creamCostPerLM = (13.93/1.15) + (6/wallDepth × 4.29)
materialTotal = creamCostPerLM × wastage × linearMeters × markup
             = LM × (12.11 + 6/depth × 4.29) × 1.1 × 1.30
```

This does NOT multiply by depth. For depth=2.5, LM=10:

| | Workbook | Our engine |
|-|----------|------------|
| Material (K) | £728 | £320 |
| Ratio | | 2.27× underprice |

For depth=1.0, LM=10 — WB: £493, ours: £541 (+10% overcharge). Crossover occurs near depth=1.

**Labour (O formula in workbook):**
```
O40 = D40 × N40 = depth × 0.35
```
This is `depth × 0.35 hours`. It does NOT multiply by linear meters (F40). This appears to give hours per LM of wall — the total labour cost (`S = O × 61.26`) would then be for a single linear meter only, not the whole job. This is likely a workbook design quirk where the labour formula is per-LM and the section total aggregates correctly per row.

Our engine: `labourHours = linearMeters × wallDepth × 0.35` — this scales by both LM and depth, which is also a valid interpretation. Given the ambiguity, the labour formula needs client clarification.

---

### CRITICAL-C — `digital_dpc` formula type not implemented in engine (Damp)

**Severity:** Critical — throws "Unknown formula type: digital_dpc" runtime error if any survey uses digital DPC

**DB template:**
```
damp|dpc_digital|dpc_installation_digital|DPC Installation - Digital (Mursec Eco)|digital_dpc|650.0000|1.0000||1.100|
```

**Workbook formula (row 42):**
```
F42 = IF(DPC_configured, 1, 0)     ← quantity is 0 or 1 (present/absent)
H42 = IF(DPC_configured, 650, 0)   ← £650 per unit
J42 = 0.154                        ← material markup is 15.4% (NOT 30%!)
K42 = F42 × I42 × (1+J42) = 650 × 1.154 = £750.10    ← minimum selling price
N42 = 1.0                          ← 1 labour hour
```

Note: The workbook has a surveyor comment: *"Do not go below the minimum selling price of £750 per unit."* The 15.4% markup is set precisely to achieve £750 from a £650 unit cost.

**Issues:**
1. `digital_dpc` formula type does not exist in `calculateLine()` — switch falls to `default` → throws error
2. DB `material_markup` is null (defaults to 30%), but workbook uses 15.4%
3. DB `wastage_factor = 1.1` — workbook applies no wastage to a unit-priced item (should be 1.0)

**Required fix:**
- Either implement `digital_dpc` as a variant of `standard`, or change formula type to `standard` in DB
- Set `material_markup = 0.154` on this template
- Set `wastage_factor = 1.000` on this template

---

### CRITICAL-D — Skip hire doesn't scale by quantity (Damp, Condensation, Timber, Woodworm)

**Severity:** Critical — quotes for 2+ skips are wrong (always charges for 1 skip)

**Workbook formula (all 4 workbooks):**
```
H = 270
K = F × I × (1+J) = qty × 270 × 1.30
```
For 2 skips: K = £702.

**Our engine (`calcSkipHire`):**
```ts
const materialTotal = applyMarkup(skipCost, materialMarkup)  // = 270 × 1.30 = £351
// inputQuantity is never used
```
Always produces £351 regardless of quantity input.

**Required fix:** Multiply `skipCost` by `input.inputQuantity` before applying markup.

---

## MAJOR ISSUES (formula type or rate wrong, material impact on output)

---

### MAJOR-1 — Warmline IWI labour rate is 20% too high (Damp, Timber)

**Workbook formula (col N, row 79 Damp / row 73 Timber):**
```
N = IF(qty=0, 0, IF(qty < 7, 2.5/qty, 20/60))
→ 0.333 hrs/m² for qty ≥ 7m²
→ 2.5 hour minimum for qty < 7m²
```

**DB value:**
```
warmline_iwi: labour_rate_per_unit = 0.4000 (both damp and timber)
```

**Impact:** At 20m²:
- WB labour: 20 × 0.333 × 61.26 = £407
- Our labour: 20 × 0.400 × 61.26 = £490 (+20%)

**Required fix:**
- Change `labour_rate_per_unit` to `0.3333` (= 20/60) for `warmline_iwi` in both damp and timber
- Add `minimum_labour_hours: 2.7` to `formula_params` (2.5 hrs minimum ÷ 0.333 effective qty ≥ 7.5m², but workbook uses `2.5/qty` for qty < 7, so minimum is 2.5 not 2.7)
  - Actually: minimum is 2.5 total hours (when qty < 7, total hours = N × qty = (2.5/qty) × qty = 2.5)
  - Change existing `minimum_labour_hours` from 2.7 to 2.5 if currently set, or add 2.5 if not

---

### MAJOR-2 — Timber 2-coat tanking slurry: wrong formula type AND wrong rate

**Workbook (Timber row 59):**
```
H = 3.78     ← static per-m² rate (standard formula, no CEILING.MATH)
N = 0.35
K = qty × 3.78 × 1.30
```

**DB (Timber):**
```
timber|cementitious_tanking|2_coat_tanking_slurry|ceiling_coverage|0.0000|0.3500|7.0000|1.100|
{"coverage_rate": 7, "cost_per_coverage_unit": 3.100}
```

**Numerical impact (qty=8m²):**
| | Workbook (standard 3.78) | Our engine (ceiling_cov 3.10) |
|-|--------------------------|-------------------------------|
| Material | £39.31 | £61.78 |
| **Overcharge** | | **+57%** |

The Damp workbook uses CEILING.MATH at £21.70/7m² roll (= 3.10/m²). The Timber workbook uses a flat £3.78/m² standard rate — a higher price, different formula. These are genuinely different values between the two workbooks.

**Required fix for Timber:**
- Change `cost_formula` from `ceiling_coverage` to `standard`
- Set `base_unit_cost = 3.780` (includes wastage already — set `wastage_factor = 1.000`)
- Remove `coverage_rate` and `cost_per_coverage_unit` from formula_params

---

### MAJOR-3 — Timber wall/floor fillet joint: wrong formula type AND wrong rate

**Workbook (Timber row 61):**
```
H = 2.0     ← static per-LM rate (standard formula, no CEILING.MATH)
K = qty × 2.0 × 1.30
```

**DB (Timber):**
```
timber|cementitious_tanking|wallfloor_fillet_joint|ceiling_coverage|0.0000|0.3000|12.0000|1.100|
{"coverage_rate": 12, "cost_per_coverage_unit": 2.043}
```

**Numerical impact (qty=6 LM):**
| | Workbook (standard 2.0) | Our engine (ceiling_cov 2.043) |
|-|------------------------|-------------------------------|
| Material | £15.60 | £34.95 |
| **Overcharge** | | **+124%** |

**Required fix for Timber:**
- Change `cost_formula` from `ceiling_coverage` to `standard`
- Set `base_unit_cost = 2.000`, `wastage_factor = 1.000`

---

## SECTION SUBTOTALS & GRAND TOTAL STRUCTURE

### Section Price Adjustment mechanism

The "Section Price Adjustment %" row in col F holds the adjustment percentage (e.g., `F=-5` for −5%).

Individual line items apply this adjustment via:
- `I = (H/100) × (100 + section_adj%)` — adjusts material rate
- `Q = (P/100) × (100 + section_adj%)` — adjusts labour rate

The section "Totals" row then **simply sums** the pre-adjusted line item K and S values — no further adjustment is applied at the section level.

**Verdict:** Our engine applies section adjustments to section totals after calculating line items. This is **mathematically equivalent** to the workbook approach for all formula types (adjustment × base × markup is commutative). ✓ No fix needed.

### Grand total structure (Damp rows 139–144 as example)

```
Row 139: K = SUM(all section K totals)  — materials subtotal
Row 140: K = SUM(all section S totals)  — labour subtotal
Row 141: K = travel overhead (formula: (travel_hrs × labour_rate) + (days × distance × 2 × vehicle_rate))
Row 142: K = SUM(K139:K141)            — total ex-VAT
Row 143: K = K142 × 0.20               — VAT (20%)
Row 144: K = SUM(K142:K143)            — total inc VAT
```

Travel overhead formula (matches `travel-overhead.ts` exactly):
```
travel_hours = ROUNDUP(labour_hours / 6.5 / num_men, 0) × (distance×2/30) × num_men
vehicle_cost = labour_days × (distance×2) × 0.50/mile
```
✓ `calculateTravelOverhead()` matches the workbook.

**VAT and deposit** are on a linked Details/Report sheet, not the Costing sheet. Deposit percentages from `pricing_config` are correct: damp=30%, condensation=50%, timber=30%, woodworm=30%. ✓

---

## DISPOSAL / BAG & CART — VERIFICATION SUMMARY

| Item | WB H (mat rate) | WB N (labour hrs) | DB formula | DB mat rate | DB lab rate | Status |
|------|-----------------|-------------------|------------|-------------|-------------|--------|
| Bag up debris & cart outside (all WBs) | £1.00/bag | 0.0100 hrs/bag | `bag_and_cart` | £1.00 | 0.0100 | ✓ MATCH |
| Disposal via licensed transfer agent (Damp) | `IF(qty≤20,40/qty,2)` | 0 | `tiered_disposal` | £0.00 | 0.0000 | ✗ FORMULA WRONG (CRITICAL-A) |
| Disposal via licensed transfer agent (Timber) | `IF(qty≤20,40/qty,2)` | 0 | `tiered_disposal` | £0.00 | 0.0000 | ✗ FORMULA WRONG (CRITICAL-A) |
| Disposal via licensed transfer agent (Woodworm) | `IF(qty≤20,40/qty,2)` | 0 | `tiered_disposal` | £0.00 | 0.0000 | ✗ FORMULA WRONG (CRITICAL-A) |
| Rubbish removal skips (all WBs) | £270/skip | 0 | `skip_hire` | £270 | 0 | ✗ DOESN'T SCALE BY QTY (CRITICAL-D) |

Condensation has no strip-out section and therefore no bag & cart or disposal items. ✓

---

## CONFIGURATION VALUES

All 14 `pricing_config` values verified against workbooks:

| Config key | DB value | WB cell | Status |
|------------|----------|---------|--------|
| hourly_labour_rate | 30.63 | $D$155 = 30.63 | ✓ |
| contractor_hourly_rate | 28.00 | E155 = 28.00 | ✓ |
| default_material_markup | 0.30 | J column = 0.3 | ✓ |
| default_labour_markup | 1.00 | R column = 1 | ✓ |
| default_wastage_factor | 1.10 | baked into H formulas | ✓ |
| vat_rate | 0.20 | K143 = K142×0.2 | ✓ |
| skip_hire_8yd_cost | 270.00 | H136 = 270 | ✓ |
| damp_deposit_pct | 0.30 | (Details sheet) | ✓ |
| condensation_deposit_pct | 0.50 | (Details sheet) | ✓ |
| timber_deposit_pct | 0.30 | (Details sheet) | ✓ |
| woodworm_deposit_pct | 0.30 | (Details sheet) | ✓ |
| vehicle_cost_per_mile | 0.50 | J155 = 0.5 | ✓ |
| digital_dpc_base_cost | 650.00 | H42 = 650 | ✓ (but markup wrong, see CRITICAL-C) |
| asbestos_testing_cost | 30.00 | H132 = 30 | ✓ |

---

## COMPLETE ITEM-BY-ITEM COMPARISON TABLE

### DAMP — full comparison

| WB Row | Description | WB H (mat rate) | DB mat rate | WB N (lab/unit) | DB lab/unit | WB Formula | DB Formula | Status |
|--------|-------------|-----------------|-------------|-----------------|-------------|------------|------------|--------|
| 21 | Remove radiators & cap valves | 7.00 | 7.00 | 1/60×20=0.333 | 0.333 | standard | standard | ✓ |
| 22 | Remove socket fronts | 2.00 | 2.00 | 1/60×12=0.200 | 0.200 | standard | standard | ✓ |
| 23 | Skirting board removal | 0.10 | 0.10 | 0.070 | 0.070 | standard | standard | ✓ |
| 24 | Strip wall paper | 0.50 | 0.50 | 0.500 | 0.500 | standard | standard | ✓ |
| 25 | Antinox floor boards | 4.16×1.1=4.576 | 4.576 | 1/60×2=0.033 | 0.033 | standard | standard | ✓ |
| 29 | Remove plaster/render | 0.00 | 0.00 | 0.300 | 0.300 | standard | standard | ✓ |
| 30 | Removal of stud walls | 0.00 | 0.00 | 0.400 | 0.400 | standard | standard | ✓ |
| 31 | Plaster & stud removal (ceilings) | 0.00 | 0.00 | 0.800 | 0.800 | standard | standard | ✓ |
| 32 | Strip timber floor GF | 0.00 | 0.00 | 0.500 | 0.500 | standard | standard | ✓ |
| 33 | Scrape back sub floors | 0.00 | 0.00 | 0.250 | 0.250 | standard | standard | ✓ |
| 34 | Bag up debris & cart outside | 1.00/bag | 1.00/bag | 0.010 | 0.010 | bag_and_cart | bag_and_cart | ✓ |
| 35 | Disposal (licensed agent) | IF(≤20,40/qty,2) | 0.00 | 0 | 0 | material-tiered | tiered_disposal | ✗ CRITICAL-A |
| 40 | DPC Installation - Traditional | depth-dependent | n/a | 0.350 | 0.350 | depth×LM×rate | LM×rate only | ✗ CRITICAL-B |
| 42 | DPC Installation - Digital | 650 if present | 650 | 1.0 | 1.0 | standard, J=0.154 | digital_dpc | ✗ CRITICAL-C |
| 44 | Wall membrane 1m | CEILING.MATH ÷5×4.166×1.1 | 4.166/m² | 0.300 | 0.300 | ceiling_coverage | ceiling_coverage | ✓ |
| 45 | Wall membrane 1.2m | CEILING.MATH ÷5×4.445×1.1 | 4.445/m² | 0.300 | 0.300 | ceiling_coverage | ceiling_coverage | ✓ |
| 46-48 | Wall membrane 2m (#1-3) | 0 | 0 | 0 | 0 | standard (helper rows) | standard | ✓ |
| 49 | Wall membrane 2m (subtotal) | CEILING.MATH ÷5×4.417×1.1 | 4.417/m² | 0.300 | 0.300 | ceiling_coverage | ceiling_coverage | ✓ |
| 50 | Membrane plugs | CEILING.MATH ÷2×0.933×1.1 | 0.933/m² | 0.250 | 0.250 | ceiling_coverage | ceiling_coverage | ✓ |
| 51 | Sealing tape | CEILING.MATH ÷22×0.871×1.1 | 0.871/m² | 0.100 | 0.100 | ceiling_coverage | ceiling_coverage | ✓ |
| 52 | Technoseal | 80/80=1.00 | 1.00 | 1/60=0.0167 | 0.0167 | standard | standard | ✓ |
| 53 | Wall/floor fillet joint | CEILING.MATH ÷12×2.043×1.1 | 2.043/m² | 0.300 | 0.300 | ceiling_coverage | ceiling_coverage | ✓ |
| 55 | Overtape | CEILING.MATH ÷5×2.166×1.1 | 2.166/m² | 0.100 | 0.100 | ceiling_coverage | ceiling_coverage | ✓ |
| 56 | Fixing rope | CEILING.MATH ÷5×2.066×1.1 | 2.066/m² | 0.100 | 0.100 | ceiling_coverage | ceiling_coverage | ✓ |
| 57 | Difficulty hours (walls) | 0 | 0 | 1.000 | 1.000 | standard | standard | ✓ |
| 61 | Dubbing out coat | CEILING.MATH ÷2 compound | compound formula | 0.300 | 0.300 | ceiling/compound | compound_material | ✓ |
| 62 | 2 coat tanking slurry | CEILING.MATH ÷7×3.10×1.1 | 3.10/m² | 0.350 | 0.350 | ceiling_coverage | ceiling_coverage | ✓ |
| 63 | Renovating plaster | CEILING.MATH ÷3×5.417×1.1 | 5.417/m² | 0.300 | 0.300 | ceiling_coverage | ceiling_coverage | ✓ |
| 64 | Wall/floor fillet joint (tanking) | CEILING.MATH ÷12×2.043×1.1 | 2.043/m² | 0.300 | 0.300 | ceiling_coverage | ceiling_coverage | ✓ |
| 65 | Difficulty hours (tanking) | 0 | 0 | 1.000 | 1.000 | standard | standard | ✓ |
| 69 | EP40 resin primer | CEILING.MATH ÷30×1.89×1.1 | 1.89/m² | 0.040 | 0.040 | ceiling_coverage | ceiling_coverage | ✓ |
| 70 | EP40 resin top coat | CEILING.MATH ÷30×2.123×1.1 | 2.123/m² | 0.040 | 0.040 | ceiling_coverage | ceiling_coverage | ✓ |
| 71 | Wall/floor fillet (resin) | CEILING.MATH ÷12×2.043×1.1 | 2.043/m² | 0.300 | 0.300 | ceiling_coverage | ceiling_coverage | ✓ |
| 72 | Grip grit | CEILING.MATH ÷25×0.083×1.1 | 0.083/m² | 0.010 | 0.010 | ceiling_coverage | ceiling_coverage | ✓ |
| 73 | Difficulty hours (resin) | 0 | 0 | 1.000 | 1.000 | standard | standard | ✓ |
| 77 | Construct stud wall | 14.00 | 14.00 | 0.400 | 0.400 | standard | standard | ✓ |
| 78 | Plasterboarding | (8.24/1.098)×1.3=9.756 | 9.760 | 0.400 | 0.400 | standard | standard | ≈✓ (rounding) |
| 79 | Warmline IWI (roll+adhesive combined) | CEILING ÷3.5625 + ÷7.125 | 7.748+5.404/m² | IF(qty<7,2.5/qty,20/60) | 0.400 | ceiling_coverage×2 | ceiling_coverage×2 | ✗ MAJOR-1 (labour 0.400 vs 0.333) |
| 80 | Skimming walls | CEILING.MATH ÷10×1.208×1.1 | 1.208/m² | 4/15=0.267 | 0.267 | ceiling_coverage+block labour | ceiling_coverage | ✓ |
| 81 | Plastering stop bead 3m | 1×1.1=1.100 | 1.100 | 0 | 0 | standard | standard | ✓ |
| 82 | Thin coat angle 2.4m | 1.66×1.1=1.826 | 1.826 | 0 | 0 | standard | standard | ✓ |
| 83 | Thin coat angle 3m | 2.5×1.1=2.750 | 2.750 | 0 | 0 | standard | standard | ✓ |
| 84 | Difficulty hours (plastering) | 0 | 0 | 1.000 | 1.000 | standard | standard | ✓ |
| 89–94 | Joists 100×50 to 225×50 | 5.46–9.50 | 5.46–9.50 | 0.25–0.40 | 0.25–0.40 | standard | standard | ✓ |
| 95 | Treat and endwrap joist | 3.00 | 3.00 | 0.150 | 0.150 | standard | standard | ✓ |
| 96 | Wall plate 100×25 | 4.84 | 4.84 | 0.400 | 0.400 | standard | standard | ✓ |
| 97 | Bower beams (pair) | 36.00 | 36.00 | 1.500 | 1.500 | standard | standard | ✓ |
| 98 | Flitch plates (pair) | 42.00 | 42.00 | 1.500 | 1.500 | standard | standard | ✓ |
| 99 | Difficulty hours (joists) | 0 | 0 | 1.000 | 1.000 | standard | standard | ✓ |
| 101–106 | Flooring types 18–22mm/T&G/Eng | 18–52.80 | 18–52.80 | 0.400–0.900 | 0.400–0.900 | standard | standard | ✓ |
| 107 | Insulation to suspended floor | 6.80 | 6.80 | 0.200 | 0.200 | standard | standard | ✓ |
| 112 | Clean out airbrick | 16.00 | 16.00 | 0.500 | 0.500 | standard | standard | ✓ |
| 113 | Lift/upgrade airbrick | 16.00 | 16.00 | 0.800 | 0.800 | standard | standard | ✓ |
| 114 | Install additional airbrick | 16.00 | 16.00 | 2.000 | 2.000 | standard | standard | ✓ |
| 118 | Fog sub floor (anti-fungal) | CEILING.MATH ÷100×0.210×1.1 | 0.210/m² | 0.200 | 0.200 | ceiling_coverage | ceiling_coverage | ✓ |
| 123 | Aco drain | 8.00 | 8.00 | 1.000 | 1.000 | standard | standard | ✓ |
| 124 | French drain | 2.41 | 2.41 | 40/60=0.667 | 0.667 | standard | standard | ✓ |
| 128 | Aquaban | CEILING.MATH ÷25×0.50×1.1 | 0.50/m² | 1/20=0.050 | 0.050 | ceiling_coverage+min_labour | ceiling_coverage | ✓ (min_labour=2.7) |
| 132 | Asbestos testing | 30.00 | 30.00 | 0.640 | 0.640 | fixed_price | fixed_price | ✓ |
| 136 | Rubbish removal skips | 270.00 | 270.00 | 0 | 0 | standard ×qty | skip_hire (no qty) | ✗ CRITICAL-D |

### CONDENSATION — full comparison

| WB Row | Description | WB H | DB mat rate | WB N | DB lab | Status |
|--------|-------------|------|-------------|------|--------|--------|
| 21 | VA Pozidry loft - heated | 324.13 | 324.13 | 2.5 | 2.5 | ✓ |
| 22 | VA Pozidry loft - unheated | 309.96 | 309.96 | 2.5 | 2.5 | ✓ |
| 23 | Electrical pack (loft) | 12.46 | 12.46 | 1.5 | 1.5 | ✓ |
| 24 | Sarkvents | 3.00 | 3.00 | 0.08 | 0.08 | ✓ |
| 28 | VA Pozidry Compact wall unit | 273.74 | 273.74 | 4.0 | 4.0 | ✓ |
| 29 | Electrical pack (PIV wall) | 12.46 | 12.46 | 1.5 | 1.5 | ✓ |
| 30–40 | Ducting items (all 10 types) | as per WB | match DB | 0.1 each | 0.1 each | ✓ |
| 41 | Diamond core 107mm | 0.00 | 0.00 | 2.0 | 2.0 | ✓ |
| 45 | Trickle/boost humidistat fan | 70.20 | 70.20 | 1.5 | 1.5 | ✓ |
| 46 | Electrical pack (fan) | 12.46 | 12.46 | 1.5 | 1.5 | ✓ |
| 47 | Grille | 2.42 | 2.42 | 0.1 | 0.1 | ✓ |
| 48 | Diamond core 107mm (fan) | 0.00 | 0.00 | 2.0 | 2.0 | ✓ |
| 52 | Dryaire Cpass passive vent | 36.18 | 36.18 | 1.5 | 1.5 | ✓ |
| 57 | Dryaire Cvent | 12.50 | 12.50 | 1.5 | 1.5 | ✓ |
| 62 | Joinery ducting (min 2.4m) | IF(qty<2.4,(15×2.4)/qty,15) | 15.00 | 0.5 | 0.5 | ✓ (min_qty=2.4 ✓) |
| 66 | New loft hatch | 360.00 | 360.00 | 4.0 | 4.0 | ✓ |
| 70 | Existing loft hatch enlarge | 45.00 | 45.00 | 4.0 | 4.0 | ✓ |
| 74 | Mould treatment | 0.50 | 0.50 | 0.25 | 0.25 | ✓ |
| 78 | Asbestos testing | 30.00 | 30.00 | 0.64 | 0.64 | ✓ |
| 82 | Clean out airbrick | 16.00 | 16.00 | 0.5 | 0.5 | ✓ |
| 83 | Lift/upgrade airbrick | 16.00 | 16.00 | 0.8 | 0.8 | ✓ |
| 84 | Install additional airbrick | 16.00 | 16.00 | 2.0 | 2.0 | ✓ |
| 88 | Skip hire | 270 | 270 | 0 | 0 | ✗ CRITICAL-D |

Section PIV Loft has `F = -5` (−5% section adjustment) in the sample file — this is a deliberate user entry, not a data issue.

### TIMBER — key items (preparatory/flooring items same as Damp ✓)

| WB Row | Description | WB H | DB mat rate | WB Formula | DB Formula | Status |
|--------|-------------|------|-------------|------------|------------|--------|
| 29 | Remove carpet/tiles/overlays | 0 | 0 | standard | standard | ✓ |
| 35 | Grind back mortar courses | 0 | 0 | standard | standard | ✓ |
| 36 | Wire scrub brickwork | 0 | 0 | standard | standard | ✓ |
| 38 | Disposal | IF(≤20,40/qty,2) | 0 | material-tiered | tiered_disposal | ✗ CRITICAL-A |
| 42 | Apply 2×Brunosol+1×Wykabor | 5.50 | 5.50 | standard | standard | ✓ |
| 58 | Dubbing out coat | 7×1.1=7.70 | 7.70 | standard | standard | ✓ |
| 59 | 2 coat tanking slurry | **3.78** | 3.10/ceiling | standard | ceiling_coverage | ✗ MAJOR-2 |
| 60 | Renovating plaster | (16.25/3)×1.1=5.958 | 5.417/ceiling | standard | ceiling_coverage | ⚠ formula type different |
| 61 | Wall/floor fillet joint | **2.00** | 2.043/ceiling | standard | ceiling_coverage | ✗ MAJOR-3 |
| 73 | Warmline IWI | CEILING combined | 7.748+5.404/m² | ceiling_coverage×2 | ceiling_coverage×2 | ✗ MAJOR-1 (labour) |
| 94–101 | Flooring deck types | 18–52.80 | 18–52.80 | standard | standard | ✓ |
| 105 | Clear debris sub floor | 0 | 0 | standard (0.15 lab) | standard | ✓ |
| 106 | Masonry sterilant | **35.00** per 10m² | ROUNDUP ÷10×3.50 | ROUNDUP/10 | ceiling_coverage | ✓ (math equivalent) |
| 107 | Protective treatment | **22.00** per 25m² | ROUNDUP ÷25×0.88 | ROUNDUP/25 | ceiling_coverage | ✓ (math equivalent) |
| 108 | 40.1 Gel injection | **2.22** per 4m² | ROUNDUP ÷4×0.555 | ROUNDUP/4 | ceiling_coverage | ✓ (math equivalent) |
| 109 | Fog subfloor void | 1.00 | 1.00 | standard | standard | ✓ |
| 110 | Fogging staircase (open) | 0.20 | 0.20 | standard | standard | ✓ |
| 111 | Fogging staircase (closed) | 2.00 | 2.00 | standard | standard | ✓ |
| 121 | Skip hire | 270 | 270 | standard ×qty | skip_hire (no qty) | ✗ CRITICAL-D |

**Note on Timber renovating plaster (row 60):**
Workbook: H = (16.25/3)×1.1 = 5.958 (standard formula, no CEILING.MATH).
DB: `ceiling_coverage` with cost_per_coverage_unit=5.417. These give different results unless qty is always a multiple of 3. Lower priority than MAJOR-2/3 but same class of issue.

### WOODWORM — key items

| WB Row | Description | WB H | DB mat rate | Status |
|--------|-------------|------|-------------|--------|
| All preparatory/flooring | Same as Damp/Timber | Match | Match | ✓ |
| 34 | Bag & cart | 1.00/bag | 1.00/bag | ✓ |
| 35 | Disposal | IF(≤20,40/qty,2) | 0 | ✗ CRITICAL-A |
| 73 | Protective treatment to new timbers | 0.50 | 0.50 | ✓ |
| 74 | 40.1 Gel injection | 2.22 | 2.22 | ✓ (standard, not ceiling — but DB has standard too ✓) |
| 75 | Fogging floor area | 0.50 | 0.50 | ✓ |
| 76 | Fogging boarded area | 0.50, N=1/43=0.0233 | 0.50, N=0.023 | ≈✓ (rounding) |
| 77 | Fogging staircase open | 0.50 | 0.50 | ✓ |
| 78 | Fogging staircase closed | 2.00 | 2.00 | ✓ |
| 79 | Lifting loft insulation | 0 | 0 | ✓ |
| 80 | Fogging loft area | 0.50, N=0.04 | 0.50, N=0.04 | ✓ |
| 81 | Relaying loft insulation | 0 | 0 | ✓ |
| 91 | Skip hire | 270 | 270 | ✗ CRITICAL-D |

---

## Items NOT in DB (workbook has items DB is missing)

None found. All workbook line items have corresponding DB entries.

## Items NOT in Workbook (DB has entries workbook doesn't)

- `damp|dpc_digital|dpc_installation_digital` — exists in DB as `digital_dpc` formula type; workbook row 42 exists but formula type unimplemented (CRITICAL-C)

---

## Minor Rounding Discrepancies (negligible, ≤0.03% impact)

| Item | WB value | DB value | Diff |
|------|----------|----------|------|
| Remove radiators labour | 1/60×20 = 0.3333 | 0.3330 | 0.001 hrs |
| Antinox labour | 1/60×2 = 0.0333 | 0.0330 | 0.0003 hrs |
| Fogging boarded area (WW) | 1/43 = 0.02326 | 0.0230 | 0.0003 hrs |
| French drain labour | 40/60 = 0.6667 | 0.6670 | 0.0003 hrs |

These are inconsequential. No action needed.

---

## Priority Fix List

| Priority | Issue | Fix |
|----------|-------|-----|
| 🔴 P1 | CRITICAL-A: tiered_disposal formula | Rewrite calcTieredDisposal as material-only charge |
| 🔴 P1 | CRITICAL-B: DPC material doesn't scale with depth | Fix calcDpcInjection to multiply by F=D×E |
| 🔴 P1 | CRITICAL-C: digital_dpc not implemented | Add formula type + fix markup (0.154) + wastage (1.0) |
| 🔴 P1 | CRITICAL-D: skip hire ignores quantity | Multiply by inputQuantity in calcSkipHire |
| 🟠 P2 | MAJOR-1: Warmline IWI labour 0.40 vs 0.333 | Update labour_rate_per_unit + add 2.5 hr minimum |
| 🟠 P2 | MAJOR-2: Timber tanking slurry formula/rate wrong | Change to standard, rate=3.78, wastage=1.0 |
| 🟠 P2 | MAJOR-3: Timber fillet joint formula/rate wrong | Change to standard, rate=2.00, wastage=1.0 |
| 🟡 P3 | Timber renovating plaster formula type | Change to standard, rate=(16.25/3)×1.1=5.958, wastage=1.0 |

---

*Report generated from direct workbook analysis via openpyxl. All formulas read from unprotected sheets (password: "window").*
