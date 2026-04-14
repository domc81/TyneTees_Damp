# Investigation: DPC Strip-Out Costing & Depth Formula

**Date:** 2026-04-14
**Status:** Investigation complete — no code changes made
**Build:** Clean (no existing errors)

---

## 1. DPC DEPTH CALCULATION

### 1a. Code Formula (pricing-engine.ts:297-363)

```typescript
// calcDpcInjection — exact formula from the codebase

// Parameters (from template formula_params or fallbacks)
const CREAM_BASE_COST = 13.93        // wykamol_ultracure_dpc_cream
const CREAM_ADJUSTMENT_DIVISOR = 1.15
const DRILL_PLUG_HOLES_PER_DEPTH = 6 // holes_per_meter
const DRILL_PLUG_COST = 4.29         // drill_plugs_12mm
const LABOUR_HOURS_PER_DEPTH = 0.35

// MATERIAL:
creamCostPerLM = (CREAM_BASE_COST / CREAM_ADJUSTMENT_DIVISOR)
               + ((DRILL_PLUG_HOLES_PER_DEPTH / wallDepth) * DRILL_PLUG_COST)

effectiveQuantity = wallDepth * linearMeters

materialAdjustedCost = creamCostPerLM * wastageFactor * effectiveQuantity
materialTotal        = materialAdjustedCost * (1 + materialMarkup)

// LABOUR:
labourHours = linearMeters * wallDepth * LABOUR_HOURS_PER_DEPTH
labourBase  = labourHours * hourlyLabourRate
labourTotal = labourBase * (1 + labourMarkup)
```

### 1b. Comparison Against Workbook (Damp Costing Row 40)

| Element | Workbook | Code | Match? |
|---------|----------|------|--------|
| Cream rate per LM | H40 = (13.93/1.15) + (6/D40 x 4.29) | `(13.93/1.15) + ((6/wallDepth) * 4.29)` | YES |
| Depth-dependent rate | Drill plug component DECREASES with depth | Same — `6/wallDepth` term | YES |
| Total quantity | F40 = D40 x E40 (depth x LM) | `effectiveQuantity = wallDepth * linearMeters` | YES |
| Material total | K40 = F40 x I40 x 1.30 | `creamCostPerLM * wastage * qty * (1 + 0.30)` | YES |
| **Labour hours** | **O40 = D40 x 0.35** | **`linearMeters * wallDepth * 0.35`** | **SEE BELOW** |

**Material verdict:** The material formula IS depth-dependent. It is NOT a straight multiplier. The code correctly implements the workbook formula where the unit rate decreases as depth increases (because drill plug cost is spread: `6/depth * 4.29`).

**Labour verdict — AMBIGUOUS:**

The client states `O40 = D40 x 0.35` means labour = `depth x 0.35` (not `depth x LM x 0.35`).

The code uses: `labourHours = linearMeters * wallDepth * 0.35`

The template in the database has `labour_rate_per_unit = 0.35`, which the DPC formula reads as `LABOUR_HOURS_PER_DEPTH`. However, the code then multiplies this by BOTH `linearMeters` and `wallDepth`.

**Two interpretations of O40:**

| Interpretation | Formula | depth=2, LM=10 | Realistic? |
|----------------|---------|-----------------|------------|
| O40 = total labour hours | 2 x 0.35 = 0.70 hrs (42 min) | £42.88 | Very low for 10m of drilling |
| O40 = hours-per-LM rate | (2 x 0.35) x 10 = 7.0 hrs | £428.82 | More realistic for physical work |

The code treats 0.35 as hours-per-depth-per-LM (interpretation 2). If the workbook truly uses interpretation 1, the code overcharges labour by a factor equal to the linear metres.

**ACTION NEEDED:** Client to verify in the actual workbook whether the labour cost in column O is:
- (a) Total hours for the row → code is WRONG, overcharges by LM factor
- (b) Hours per linear metre (with total = O40 x E40 elsewhere) → code is CORRECT

### 1c. Test Scenario: depth=2, linear_metres=10

**Code output:**
```
creamCostPerLM     = (13.93/1.15) + ((6/2) x 4.29) = 12.113 + 12.87 = 24.983
effectiveQuantity  = 2 x 10 = 20
materialAdjusted   = 24.983 x 1.10 x 20 = 549.63
materialTotal      = 549.63 x 1.30 = £714.51

labourHours        = 10 x 2 x 0.35 = 7.0
labourBase         = 7.0 x 30.63 = 214.41
labourTotal        = 214.41 x 2.00 = £428.82

lineTotal          = £714.51 + £428.82 = £1,143.33
```

**Workbook (interpretation 2 — O40 is per-LM):**
```
F40 = 2 x 10 = 20
H40 = (13.93/1.15) + (6/2 x 4.29) = 24.983
I40 = 24.983 x 1.10 = 27.481
K40 = 20 x 27.481 x 1.30 = £714.51  (MATCHES CODE)

Labour = (2 x 0.35) x 10 x 30.63 x 2.00 = £428.82  (MATCHES CODE)
```

**Workbook (interpretation 1 — O40 is total hours):**
```
Material = £714.51  (same)
Labour   = 0.70 x 30.63 x 2.00 = £42.88  (CODE OVERCHARGES BY 10x)
Total    = £757.39 vs code £1,143.33
```

---

## 2. STRIP-OUT LINE ITEMS

### 2a. What triggers strip-out in the mapping?

In `survey-mapping.ts:281-296`, the strip-out section is mapped from WALL AREA measurements:

```typescript
// === STRIP OUT ===

// Remove plaster from walls
const stripoutArea = totalWallAreaWithWallpaper + totalWallAreaWithoutWallpaper
const plasterRemovalInput = createLineInput(
  lookup, 'strip_out', 'remove_plaster_walls', stripoutArea
)

// Strip existing floor
const stripFloorInput = createLineInput(
  lookup, 'strip_out', 'strip_timber_floor_gf', totalStripFloorArea
)

// Scrape subfloors
const scrapeSubfloorInput = createLineInput(
  lookup, 'strip_out', 'scrape_subfloors', totalSubFloorArea
)
```

**Key finding:** Strip-out is driven by wall area measurements (`dampData.walls[].length * height`), NOT by DPC specification. DPC and strip-out are independent mappings.

### 2b. Does specifying DPC trigger any strip-out?

**NO.** The DPC mapping (lines 300-309) only creates a `dpc_traditional:dpc_injection_traditional` line item. It does not create any strip-out items.

Strip-out items are only created if the surveyor measured wall dimensions (length x height) for the room. If a room has `dpc_required = true` but no walls measured, strip-out area = 0 and no strip-out line items are generated.

### 2c. Gap in the mapping logic

Physically, DPC injection requires:
1. Remove plaster from the lower ~1m of affected walls to expose brickwork
2. Drill and inject the DPC cream
3. Re-plaster after curing

The current system has no mechanism to auto-generate a "DPC strip-out" area from `dpc_wall_length`. The surveyor would need to separately measure and enter wall dimensions that happen to cover the same walls. There is no dedicated DPC-specific strip-out calculation like:
```
dpc_strip_out_area = dpc_wall_length * 1.0m (standard strip height)
```

### 2d. Strip-out section in the database

The `strip_out` section EXISTS in `costing_sections` for damp (sort_order=2):

| line_key | description | formula | base_unit_cost | labour_rate_per_unit |
|----------|-------------|---------|----------------|---------------------|
| remove_plaster_walls | Remove plaster/render (Walls) | standard | £0.00 | 0.30 hrs/m² |
| remove_stud_walls | Removal of stud walls etc | standard | £0.00 | 0.40 hrs/m² |
| plaster_removal_ceilings | Plaster & stud Removal (Ceilings) | standard | £0.00 | 0.80 hrs/m² |
| strip_timber_floor_gf | Strip out existing timber floor (GF) | standard | £0.00 | 0.50 hrs/m² |
| scrape_subfloors | Scrape back/clear sub floors | standard | £0.00 | 0.25 hrs/m² |

All strip-out items are labour-only (£0 material cost). They are all `standard` formula.

**Note:** `remove_stud_walls` and `plaster_removal_ceilings` templates exist but are NOT mapped in `mapDampSurvey`. Only `remove_plaster_walls`, `strip_timber_floor_gf`, and `scrape_subfloors` are mapped.

### 2e. How the wizard captures strip-out data

The wizard does NOT have explicit "strip-out" fields. Strip-out quantities are DERIVED from:
- **Wall plaster removal:** Sum of all wall areas (wall.length x wall.height) for all damp rooms
- **Floor strip:** `dampData.strip_floor_area` (only if `dampData.strip_existing_floor` is true)
- **Subfloor scrape:** `dampData.sub_floor_area`

There is no explicit "how much plaster to remove for DPC access" field.

---

## 3. COSTING PAGE DISPLAY

### 3a. Line item visibility

The costing page (costing/page.tsx) shows INDIVIDUAL LINE ITEMS within each section via the `SectionCard` component. Each line displays:

| Column | Content |
|--------|---------|
| Description | Template description text |
| Quantity | `inputQuantity` (and `x inputDimension` if present) |
| Material | Material total (£) |
| Labour | Labour total (£) with hours in brackets |
| Total | Line total (£) |

Below each section: subtotal row + section adjustment % input.

### 3b. No expand/collapse

All line items are always visible — there is no expand/collapse mechanism. The sections are rendered flat within their survey-type tab.

### 3c. Section rendering order

For a damp survey, the following sections could appear (from costing_sections, sort_order):
1. Preparatory Work
2. **Stripping Out** ← would show IF strip-out items are generated
3. Walls — DPC Traditional
4. Walls — DPC Digital (Mursec)
5. Walls — Membrane CM3 System
6. Cementitious Tanking System
7. Floor — Liquid Resin Membranes
8. Plastering & Finishing
9. Floor Joists & Floor Decking
10. Airbricks
11. Spray Treatments
12. Drains
13. External Wall — Aquaban Water Repellent
14. Asbestos Testing
16. Project Specific Overheads

### 3d. Existing survey data

5 surveys have DPC data in the database, but **0 rows exist in `survey_costing_lines`** for either `strip_out` or `dpc_traditional` sections. The costing is calculated on-the-fly each time the page loads (not persisted to `survey_costing_lines`).

Example DPC surveys:
| Survey | Room | DPC Length | DPC Depth |
|--------|------|-----------|-----------|
| 7a99c3... | Living Room | 6m | 1.5 |
| cebea5... | Living Room, front room right | 20m | 2 |
| b42b67... | Living Room | 4m | null |
| 0421ff... | Full ground floor inspection | 14m | 2 |
| 5d5c1f... | Living Room | 8m | 3 |

---

## Summary of Issues Found

### Issue A: Strip-Out Visibility
**Root cause:** Strip-out is generated from wall area measurements, not from DPC specification. If the surveyor enters DPC wall length but doesn't separately measure wall dimensions, no strip-out items appear. There is no auto-link between "DPC needed on these walls" and "we need to remove plaster from these walls to do the DPC."

**Likely fix:** When `dpc_required = true` and `dpc_wall_length > 0`, auto-generate a strip-out line item for plaster removal using `dpc_wall_length * standard_strip_height` (e.g., 1.0m). This ensures DPC always has associated strip-out visibility.

### Issue B: DPC Depth Formula
**Material calculation: CORRECT.** The code faithfully implements the workbook formula with depth-dependent rate. It is NOT a straight multiplier.

**Labour calculation: NEEDS VERIFICATION.** The code computes `LM x depth x 0.35`. The client believes the workbook uses `depth x 0.35` (without the LM multiplier). If the workbook truly doesn't multiply by LM, the code overcharges labour by a factor of `linear_metres`. Client should verify against the actual Excel cell formula for the labour column.
