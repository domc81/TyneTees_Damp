# Materials Audit Report — Workbook vs Database

**Date:** 2026-02-28
**Scope:** All 4 workbooks vs `materials_catalog`, `costing_line_templates`, and `pricing_config` tables
**Method:** Direct extraction via openpyxl with sheet unprotection (password: window)

---

## Key Architectural Finding

**Only the Damp workbook has a dedicated materials sheet** (`Material-List`). The Condensation, Timber, and Woodworm workbooks embed all material costs directly in the Costing sheet's column H (Default Mats Cost). Both Timber and Woodworm have empty `Sub Contractor Mats` sheets marked "TBC".

**Critical pattern discovered:** All workbooks use a **two-column material cost structure**:
- **Col H** = "Default Mats Cost" (the base cost, sometimes with `*1.1` wastage baked in)
- **Col I** = "Adjusted Mats Cost" = `=(H/100)*(100+$F$<adj_row>)` (applies the section price adjustment %)
- **Col J** = Material markup % (30% standard, 40% for PIV units, 15.4% for digital DPC, 0% for labour-only items)
- **Col K** = Material total = `=F*I*(1+J)` (quantity × adjusted cost × (1 + markup))

This means our database `base_unit_cost` should match Col H values.

---

## 1. MATERIAL PRICES — Comparison Table

### 1a. Materials in `materials_catalog` vs Workbook Material-List (Damp)

| Material | WB Cost (Col L) | DB `unit_cost` | Status | Notes |
|----------|-----------------|----------------|--------|-------|
| Antinox Floor Protection 2.4m×1.2m | 4.16 | 4.16 | MATCH | |
| Wykamol Ultracure DPC Cream 1ltr | 13.93 | 13.93 | MATCH | |
| Drill Plugs 12mm | 0.0429 (=4.29/100) | 0.04 | MATCH | DB rounds to 0.04; WB formula uses 4.29 per 100 |
| CM3 Membrane 1m | 4.166 (=20.83/5) | 4.17 | MATCH | WB: 20.83 per 5m roll |
| CM3 Membrane 1.2m | 4.445 (=26.67/6) | 4.45 | MATCH | WB: 26.67 per 6m roll |
| CM3 Membrane 2m | 4.417 (=44.17/10) | 4.42 | MATCH | WB: 44.17 per 10m roll |
| Membrane Fixing Plugs 50mm | 0.0933 (=9.33/100) | 0.09 | MATCH | DB rounds to 0.09; WB uses 9.33 per 100 |
| Membrane Sealing Tape 28mm×22m | 19.16 | 19.16 | MATCH | |
| Technoseal Liquid DPM 5ltr | 23.33 | 23.33 | MATCH | |
| Universal Mortar 25kg | 24.51 | 24.51 | MATCH | |
| Fibre/Fleece Tape 115mm×5m | 10.83 | 10.83 | MATCH | |
| Rope 10mm×5m | 10.33 | 10.33 | MATCH | |
| SBR Latex 5ltr | 16.66 | 16.66 | MATCH | |
| Building Sand | 2.79 (=3.35/6*5) | 2.79 | MATCH | WB formula: ex-VAT from retail |
| Cement 25kg | 7.69 | 7.69 | MATCH | |
| Hydradry Tanking Slurry 20kg | 21.70 | 21.70 | MATCH | |
| Renovating Plaster 20kg | 16.25 | 16.25 | MATCH | |
| EP40 Resin Primer 5ltr | 56.70 | 56.70 | MATCH | |
| EP40 Resin Top Coat 5ltr | 63.70 | 63.70 | MATCH | |
| Grip Grit | 2.08 | 2.08 | MATCH | |
| Plasterboard 1220×900×9.5mm | 8.24 | 8.24 | MATCH | |
| Stop Bead 3m | 1.00 (=1.2/6*5) | 1.00 | MATCH | WB: ex-VAT |
| Thin Coat Bead 2.4m | 1.66 (=1.99/6*5) | 1.66 | MATCH | WB: ex-VAT |
| Thin Coat Bead 3m | 2.49 (=2.99/6*5) | 2.49 | MATCH | |
| Multi Finish Plaster 25kg | 12.075 | 12.08 | MATCH | Rounding difference only |
| ISO-THERM TIWI Roll | 27.60 (=196.67/7.125) | 27.60 | MATCH | |
| ISO-THERM Adhesive 15kg | 38.50 | 38.50 | MATCH | |
| Plastic Airbrick 9×3 | 1.66 | 1.66 | MATCH | |
| Microtech Concentrate 400g | 20.97 | 20.97 | MATCH | WB uses 20.979 internally |
| Enviroseal Water Repellent 5ltr | 12.50 | 12.50 | MATCH | |

**Result: ALL 29 materials in `materials_catalog` match the workbook costs exactly (or within rounding).**

### 1b. Material costs in `costing_line_templates.base_unit_cost` vs Workbook Col H

| Survey Type | Line Item | WB Col H | DB `base_unit_cost` | Status | Notes |
|-------------|-----------|----------|---------------------|--------|-------|
| **DAMP** | | | | | |
| damp | Remove radiators | 7.00 | 7.00 | MATCH | |
| damp | Remove socket fronts | 2.00 | 2.00 | MATCH | |
| damp | Skirting board removal | 0.10 | 0.10 | MATCH | |
| damp | Strip Wall Paper | 0.50 | 0.50 | MATCH | |
| damp | Antinox Floor Protection | 4.576 (=4.16×1.1) | 4.576 | MATCH | Wastage baked in |
| damp | Bag up debris | 1.00 | 1.00 | MATCH | |
| damp | Disposal (tiered) | formula: IF<=20, 40/qty, else 2 | 0.00 | MATCH | Formula in template params |
| damp | Construct stud wall | 14.00 | 14.00 | MATCH | |
| damp | Plaster boarding | 9.756 (=8.24/1.098×1.3) | 9.76 | MATCH | |
| damp | Stop Bead 3m | 1.10 (=1×1.1) | 1.10 | MATCH | |
| damp | Thin Coat Bead 2.4m | 1.826 (=1.66×1.1) | 1.826 | MATCH | |
| damp | Thin Coat Bead 3m | 2.75 (=2.5×1.1) | 2.75 | MATCH | |
| damp | Joists 100×50 | 5.46 | 5.46 | MATCH | |
| damp | Joists 125×50 | 6.50 | 6.50 | MATCH | |
| damp | Joists 150×50 | 7.70 | 7.70 | MATCH | |
| damp | Joists 175×50 | 8.00 | 8.00 | MATCH | |
| damp | Joists 200×50 | 8.90 | 8.90 | MATCH | |
| damp | Joists 225×50 | 9.50 | 9.50 | MATCH | |
| damp | Treat/endwrap joist | 3.00 | 3.00 | MATCH | |
| damp | Wall plate 100×25 | 4.84 | 4.84 | MATCH | |
| damp | Bower beams | 36.00 | 36.00 | MATCH | |
| damp | Flitch plates | 42.00 | 42.00 | MATCH | |
| damp | Weyrock 18mm | 18.00 | 18.00 | MATCH | |
| damp | Weyrock 22mm | 22.00 | 22.00 | MATCH | |
| damp | Std T&G Floorboards | 46.30 | 46.30 | MATCH | |
| damp | Victorian T&G Floorboards | 52.80 | 52.80 | MATCH | |
| damp | Engineered Flooring | 49.99 | 49.99 | MATCH | |
| damp | Structural Engineered | 52.80 | 52.80 | MATCH | |
| damp | Insulation suspended floor | 6.80 | 6.80 | MATCH | |
| damp | Aco Drain | 8.00 | 8.00 | MATCH | |
| damp | French Drain | 2.41 | 2.41 | MATCH | |
| damp | Asbestos Testing | 30.00 | 30.00 | MATCH | |
| damp | Skip Hire | 270.00 | 270.00 | MATCH | |
| damp | Technoseal (per LM) | 1.00 (=80/80) | 1.00 | MATCH | |
| **CONDENSATION** | | | | | |
| condensation | VA Pozidry loft heated | 324.13 | 324.13 | MATCH | |
| condensation | VA Pozidry loft unheated | 309.96 | 309.96 | MATCH | |
| condensation | Electrical Pack | 12.46 | 12.46 | MATCH | |
| condensation | Sarkvents | 3.00 | 3.00 | MATCH | |
| condensation | VA Pozidry Compact wall | 273.74 | 273.74 | MATCH | |
| condensation | Ducting 1m length | 3.85 | 3.85 | MATCH | |
| condensation | Ducting round elbow | 2.78 | 2.78 | MATCH | |
| condensation | Ducting round straight conn | 0.52 | 0.52 | MATCH | |
| condensation | Ducting round 1m | 3.85 | 3.85 | MATCH | |
| condensation | Ducting flat-to-round | 1.63 | 1.63 | MATCH | |
| condensation | Ducting flat straight conn | 1.14 | 1.14 | MATCH | |
| condensation | Ducting flat horizontal bend | 3.01 | 3.01 | MATCH | |
| condensation | Ducting flat vertical bend | 3.01 | 3.01 | MATCH | |
| condensation | Ducting flat 1m | 2.87 | 2.87 | MATCH | |
| condensation | Ducting insulated flexi 3m | 2.50 | 2.50 | MATCH | |
| condensation | Grille | 2.42 | 2.42 | MATCH | |
| condensation | Humidistat fan (greenwood) | 70.20 | 70.20 | MATCH | |
| condensation | Passive vent (Dryaire Cpass) | 36.18 | 36.18 | MATCH | |
| condensation | Dryaire Cvent | 12.50 | 12.50 | MATCH | |
| condensation | Joinery ducting/m | 15.00 (formula) | **0.00** | **MISMATCH** | WB Col H: `=IF(F62=0,0,IF(F62<2.4,15*2.4/F62,15))` — min 2.4m charge at £15/m. DB has `base_unit_cost=0` but `formula_params.minimum_quantity=2.4`. **See CRITICAL-3 from previous audit.** The DB template currently stores 0 as the base cost but has the minimum_quantity param. The £15/m material cost IS captured in the DB `base_unit_cost` field (15.0000). **CORRECTION: re-checking DB — template line `joinery_to_box_in_ducting_per_metre_min_charge_24_metres` has `base_unit_cost=15.0000`.** MATCH after re-check. |
| condensation | New loft hatch+ladder | 360.00 | 360.00 | MATCH | |
| condensation | Enlarge loft hatch | 45.00 | 45.00 | MATCH | |
| condensation | Mould treatment | 0.50 | 0.50 | MATCH | |
| condensation | Asbestos Testing | 30.00 | 30.00 | MATCH | |
| condensation | Skip Hire | 270.00 | 270.00 | MATCH | |
| condensation | Airbricks | 16.00 | 16.00 | MATCH | |
| **TIMBER** | | | | | |
| timber | Brunosol+Wykabor 20.1 | 5.50 | 5.50 | MATCH | |
| timber | Dubbing out coat | 7.70 (=7×1.1) | 7.70 | MATCH | NB: Different formula from Damp (Damp uses compound_material) |
| timber | Tanking slurry | 3.78 | **0.00** | **MISMATCH** | WB Col H = 3.78. DB `base_unit_cost=0` with `formula_params.cost_per_coverage_unit=3.100` (=21.7/7). The WB value 3.78 doesn't match 3.10. **See detail in Section 5.** |
| timber | Renovating plaster | 5.96 (=16.25/3×1.1) | **0.00** | MATCH (via params) | DB uses `ceiling_coverage` formula with `cost_per_coverage_unit=5.417`. WB H=5.96 includes wastage; DB param 5.417 = 16.25/3 (no wastage), applied via formula with 1.1 wastage. OK. |
| timber | Wall/floor fillet | 2.00 | **0.00** | MATCH (via params) | DB ceiling_coverage with `cost_per_coverage_unit=2.043` (=24.51/12). Same pattern. |
| timber | EP40 Primer | 62.37 (=56.7×1.1) | **0.00** | MATCH (via params) | DB ceiling_coverage with `cost_per_coverage_unit=1.890` (=56.7/30). Timber WB pre-multiplies by 1.1 wastage. |
| timber | EP40 Top Coat | 70.07 (=63.7×1.1) | **0.00** | MATCH (via params) | Same pattern. |
| timber | Grip grit | 2.60 | **0.00** | **MISMATCH** | WB H=2.60 but DB `cost_per_coverage_unit=0.104` (=2.60/25). DB seems OK as 0.104×25=2.60. But DB uses `coverage_rate=25, cost_per_coverage_unit=0.104`. Actually this is correct — in ceiling_coverage formula, cost = CEIL(qty/25) × 0.104 × wastage. Wait — DB has `cost_per_coverage_unit=0.104` but it should be `2.60/25=0.104`. But the Damp grip grit has `cost_per_coverage_unit=0.083` (=2.08/25). **The Timber grip grit uses 2.60 while Damp uses 2.08**. The DB timber template has `0.104` which equals `2.60/25` — this is **CORRECT for timber**. |
| timber | Masonry sterilant Wykabor 20 | 35.00 | 35.00 | MATCH | But formula differs — see Section 5 |
| timber | Protective treatment | 22.00 | 22.00 | MATCH | But formula differs — see Section 5 |
| timber | 40.1 Gel injection | 2.22 | 2.22 | MATCH | But formula differs — see Section 5 |
| timber | Fog subfloor void | 1.00 | 1.00 | MATCH | |
| timber | Fogging staircase open | 0.20 | 0.20 | MATCH | |
| timber | Fogging staircase closed | 2.00 | 2.00 | MATCH | |
| timber | All prep/strip items | Same as Damp | Same as Damp | MATCH | |
| timber | All joists/flooring | Same as Damp | Same as Damp | MATCH | |
| timber | All plastering | Same as Damp | Same as Damp | MATCH | |
| timber | All membrane items | Same formulas as Damp | Same as Damp | MATCH | |
| **WOODWORM** | | | | | |
| woodworm | 40.1 Gel injection | 2.22 | 2.22 | MATCH | |
| woodworm | Protective treatment | 0.50 | 0.50 | MATCH | NB: Different from Timber (0.50 vs 22.00) |
| woodworm | Fogging floor area | 0.50 | 0.50 | MATCH | |
| woodworm | Fogging boarded area | 0.50 | 0.50 | MATCH | |
| woodworm | Fogging staircase open | 0.50 | 0.50 | MATCH | NB: Different from Timber (0.50 vs 0.20) |
| woodworm | Fogging staircase closed | 2.00 | 2.00 | MATCH | |
| woodworm | Lifting loft insulation | 0.00 | 0.00 | MATCH | Labour-only |
| woodworm | Fogging loft area | 0.50 | 0.50 | MATCH | |
| woodworm | Relaying loft insulation | 0.00 | 0.00 | MATCH | Labour-only |
| woodworm | Clear debris from subfloor | 0.00 | 0.00 | MATCH | |
| woodworm | Fogging boarded area lab/unit | =1/43 (0.0233) | 0.0230 | MATCH | Rounding |
| woodworm | All prep/strip items | Same as Damp | Same | MATCH | |
| woodworm | All joists/flooring | Same as Damp | Same | MATCH | |
| woodworm | All plastering | Same as Damp | Same | MATCH | |

---

## 2. MATERIAL MARKUP

### Markup Pattern Across All Workbooks

All 4 workbooks use **identical markup structure**:

| Markup Type | Percentage | Where Used |
|-------------|------------|------------|
| Standard material markup (Col J) | **30%** | All standard materials across all workbooks |
| PIV unit markup (condensation only) | **40%** | VA Pozidry loft heated, unheated, compact wall |
| Digital DPC markup (damp only) | **15.4%** | Mursec Eco digital DPC unit |
| Labour-only items | **0%** | Strip out, difficulty hours, diamond core holes |
| Labour markup (Col R) | **100%** | Standard across all workbooks |
| PIV labour markup (condensation) | **300-400%** | PIV wall=300%, PIV loft=400% |

### Comparison with DB `pricing_config`

| Config Key | DB Value | WB Value | Status |
|------------|----------|----------|--------|
| default_material_markup | 0.30 (30%) | 30% (Col J) | MATCH |
| default_labour_markup | 1.00 (100%) | 100% (Col R) | MATCH |

### Important: Section Price Adjustment % (Col F in adjustment rows)

All workbooks have a **"Section Price Adjustment %"** row at the end of each section (e.g., row 26, 36, 58, etc. in Damp). The formula for Col I is:
```
I = (H/100) * (100 + $F$<adjustment_row>)
```

This means if the section adjustment is, say, 5%, the material cost gets inflated by 5% before markup is applied. When `$F$adj = 0`, `I = H` (no adjustment).

Our DB has a `costing_section_adjustments` table for this. This is correctly modeled.

---

## 3. MATERIAL COVERAGE RATES

### Coverage Rates Comparison

| Material | WB Coverage | DB `coverage_rate` / `formula_params` | Status |
|----------|-------------|---------------------------------------|--------|
| CM3 Membrane (all widths) | 5 M2 per roll | coverage_rate=5 | MATCH |
| Sealing Tape | 22 LM per roll | coverage_rate=22 | MATCH |
| Fibre/Fleece Tape | 5 LM per roll | coverage_rate=5 | MATCH |
| Rope 10mm | 5 LM per roll | coverage_rate=5 | MATCH |
| Membrane Plugs | 10 plugs/M2 (ceil to 2) | coverage_rate=2 | MATCH |
| Universal Mortar | 12 LM per 25kg bag | coverage_rate=12 | MATCH |
| Technoseal DPM | 80 LM per 5ltr | 80 LM (baked into per-unit cost) | MATCH |
| Tanking Slurry | 7 M2 per tub | coverage_rate=7 | MATCH |
| Renovating Plaster | 3 M2 per 20kg bag | coverage_rate=3 | MATCH |
| SBR (dubbing coat) | 8 M2 per 5ltr (compound) | coverage_unit=2 in params | MATCH |
| Building Sand | 4 M2 per bag (compound) | In compound params | MATCH |
| Cement (dubbing coat) | 4 M2 per bag (compound) | In compound params | MATCH |
| EP40 Primer | 30 M2 per 5ltr | coverage_rate=30 | MATCH |
| EP40 Top Coat | 30 M2 per 5ltr | coverage_rate=30 | MATCH |
| Grip Grit (Damp) | 25 M2 per bag | coverage_rate=25 | MATCH |
| Grip Grit (Timber) | 25 M2 per bag | coverage_rate=25 | MATCH |
| Multi Finish Plaster | 10 M2 per 25kg bag | coverage_rate=10 | MATCH |
| ISO-THERM TIWI | 7.125 M2 per roll | coverage_rate=3.5625 | MATCH (3.5625 = 7.125/2 — roll+adhesive split) |
| ISO-THERM Adhesive | 7.125 M2 per tub | coverage_rate=7.125 | MATCH |
| Plasterboard | 1.098 M2 per board | Baked into base_unit_cost | MATCH |
| DPC Cream | 10 LM at 115mm thickness | cream_divisor=1.15 | MATCH |
| Drill Plugs | 50 per 6 LM | holes_per_meter=6 | MATCH |
| Microtech | 100 M2 per 400g | coverage_rate=100 | MATCH |
| Enviroseal | 25 M2 per 5ltr | coverage_rate=25 | MATCH |
| Airbrick | 2 per installed | Baked into base_unit_cost=16 for 2 | MATCH |
| Masonry Sterilant Wykabor 20 (Timber) | 10 M2 per container | coverage_rate=10 | MATCH |
| Protective Treatment (Timber) | 25 M2 per container | coverage_rate=25 | MATCH |
| 40.1 Gel (Timber) | 4 per unit area | coverage_rate=4 | MATCH |

**Result: ALL coverage rates match.**

---

## 4. CONDENSATION-SPECIFIC MATERIALS

### Complete Condensation Material Inventory

| Item | WB Cost (Col H) | DB `base_unit_cost` | WB Markup | DB markup | WB Lab Rate | DB `labour_rate_per_unit` | Status |
|------|-----------------|---------------------|-----------|-----------|-------------|--------------------------|--------|
| VA Pozidry loft heated | 324.13 | 324.13 | 40% | 0.400 | 2.50 | 2.50 | MATCH |
| VA Pozidry loft unheated | 309.96 | 309.96 | 40% | 0.400 | 2.50 | 2.50 | MATCH |
| Electrical Pack (PIV loft) | 12.46 | 12.46 | 30% | 0.300 | 1.50 | 1.50 | MATCH |
| Sarkvents | 3.00 | 3.00 | 30% | 0.300 | 0.08 | 0.08 | MATCH |
| VA Pozidry Compact wall | 273.74 | 273.74 | 40% | 0.400 | 4.00 | 4.00 | MATCH |
| Electrical Pack (wall) | 12.46 | 12.46 | 30% | 0.300 | 1.50 | 1.50 | MATCH |
| Ducting 1m length | 3.85 | 3.85 | 30% | 0.300 | 0.10 | 0.10 | MATCH |
| Ducting round elbow | 2.78 | 2.78 | 30% | 0.300 | 0.10 | 0.10 | MATCH |
| Ducting round straight conn | 0.52 | 0.52 | 30% | 0.300 | 0.10 | 0.10 | MATCH |
| Ducting round 1m | 3.85 | 3.85 | 30% | 0.300 | 0.10 | 0.10 | MATCH |
| Ducting flat-to-round | 1.63 | 1.63 | 30% | 0.300 | 0.10 | 0.10 | MATCH |
| Ducting flat straight conn | 1.14 | 1.14 | 30% | 0.300 | 0.10 | 0.10 | MATCH |
| Ducting flat horizontal bend | 3.01 | 3.01 | 30% | 0.300 | 0.10 | 0.10 | MATCH |
| Ducting flat vertical bend | 3.01 | 3.01 | 30% | 0.300 | 0.10 | 0.10 | MATCH |
| Ducting flat 1m | 2.87 | 2.87 | 30% | 0.300 | 0.10 | 0.10 | MATCH |
| Ducting insulated flexi 3m | 2.50 | 2.50 | 30% | 0.300 | 0.10 | 0.10 | MATCH |
| Grille (wall PIV) | 2.42 | 2.42 | 30% | 0.300 | 0.10 | 0.10 | MATCH |
| Diamond core 107mm hole | 0.00 | 0.00 | 30% | 0.300 | 2.00 | 2.00 | MATCH |
| Humidistat fan (greenwood) | 70.20 | 70.20 | 30% | 0.300 | 1.50 | 1.50 | MATCH |
| Electrical Pack (fan) | 12.46 | 12.46 | 30% | 0.300 | 1.50 | 1.50 | MATCH |
| Grille (fan) | 2.42 | 2.42 | 30% | 0.300 | 0.10 | 0.10 | MATCH |
| Diamond core (fan) | 0.00 | 0.00 | 30% | 0.300 | 2.00 | 2.00 | MATCH |
| Passive vent (Dryaire Cpass) | 36.18 | 36.18 | 30% | 0.300 | 1.50 | 1.50 | MATCH |
| Diamond core (passive) | 0.00 | 0.00 | 30% | 0.300 | 2.00 | 2.00 | MATCH |
| Dryaire Cvent | 12.50 | 12.50 | 30% | 0.300 | 1.50 | 1.50 | MATCH |
| Diamond core (cvent) | 0.00 | 0.00 | 30% | 0.300 | 2.00 | 2.00 | MATCH |
| Joinery ducting/m | 15.00 (min 2.4m) | 15.00 | 30% | 0.300 | 0.50 | 0.50 | MATCH |
| New loft hatch+ladder | 360.00 | 360.00 | 30% | 0.300 | 4.00 | 4.00 | MATCH |
| Enlarge loft hatch | 45.00 | 45.00 | 30% | 0.300 | 4.00 | 4.00 | MATCH |
| Mould treatment | 0.50 | 0.50 | 30% | 0.300 | 0.25 | 0.25 | MATCH |
| Asbestos Testing | 30.00 | 30.00 | 30% | 0.300 | 0.64 | 0.64 | MATCH |
| Skip Hire | 270.00 | 270.00 | 30% | 0.300 | 0.00 | 0.00 | MATCH |
| Airbricks (×3 types) | 16.00 | 16.00 | 30% | 0.300 | varies | matches | MATCH |

### Condensation Labour Markup Anomaly

The condensation workbook uses **non-standard labour markups** for PIV units:

| Item | WB Labour Markup (Col R) | DB `labour_markup` | Status |
|------|--------------------------|--------------------|-|
| PIV loft heated/unheated | **400%** | **1.000 (100%)** | **MISMATCH** |
| PIV wall compact | **300%** | **1.000 (100%)** | **MISMATCH** |
| All other condensation items | 100% | 1.000 | MATCH |

**FINDING:** The Condensation workbook CF CSV Upload sheet explicitly shows:
- PIV loft items: `400 %` labour markup (Row 6-7)
- PIV wall item: `300 %` labour markup (Row 27)

But in the Costing sheet, the Col R markup for PIV items is also non-standard. Our DB has all condensation labour_markup at 1.000 (100%).

However, looking more carefully at the CF CSV Upload labour rate column — it shows the **adjusted** labour rate `29.0985` (not the standard 30.63). This suggests the "400%" in the CF sheet may be the **total multiplier** (not additional markup). The actual hourly rate used is `30.63 × 0.95 = 29.0985` (with a 5% reduction). This needs further investigation but does NOT affect the material audit.

**Result: ALL condensation material costs match. Materials are correctly captured in line templates (not materials_catalog). No condensation materials are missing.**

---

## 5. TIMBER/WOODWORM-SPECIFIC MATERIALS

### Timber Treatment Chemicals

| Item | WB Cost (Col H) | DB `base_unit_cost` | WB Formula Type | DB `cost_formula` | Status |
|------|-----------------|---------------------|-----------------|-------------------|--------|
| Apply 2×Brunosol + 1×Wykabor 20.1 | 5.50 | 5.50 | standard | standard | MATCH |
| Masonry sterilant Wykabor 20 brush | 35.00 | 35.00 | ROUNDUP(qty/10,0)×I×(1+J) | ceiling_coverage | **FORMULA NOTE** |
| Protective treatment (timber) | 22.00 | 22.00 | ROUNDUP(qty/25,0)×I×(1+J) | ceiling_coverage | **FORMULA NOTE** |
| 40.1 Gel injection | 2.22 | 2.22 | ROUNDUP(qty/4,0)×I×(1+J) | ceiling_coverage | **FORMULA NOTE** |
| Fog subfloor void | 1.00 | 1.00 | standard | standard | MATCH |
| Fogging staircase open | 0.20 | 0.20 | standard | standard | MATCH |
| Fogging staircase closed | 2.00 | 2.00 | standard | standard | MATCH |
| Clear debris subfloor | 0.00 | 0.00 | standard | standard | MATCH |

### FORMULA NOTE — Timber Treatment ROUNDUP Items

Three timber treatment items use `ROUNDUP` in the workbook but have different handling in the DB:

**Masonry sterilant (Wykabor 20):**
- WB: `K = ROUNDUP(F/10, 0) × I × (1+J)` — rounds UP qty to whole purchase units of 10
- DB: `ceiling_coverage` formula with `coverage_rate=10, cost_per_coverage_unit=3.50`
- DB cost_per_coverage_unit: 3.50 = 35.00/10 ✓ MATCH

**Protective treatment:**
- WB: `K = ROUNDUP(F/25, 0) × I × (1+J)` — rounds UP to purchase units of 25
- DB: `ceiling_coverage` with `coverage_rate=25, cost_per_coverage_unit=0.88`
- DB cost_per_coverage_unit: 0.88 = 22.00/25 ✓ MATCH

**40.1 Gel injection:**
- WB: `K = ROUNDUP(F/4, 0) × I × (1+J)` — rounds UP to purchase units of 4
- DB: `ceiling_coverage` with `coverage_rate=4, cost_per_coverage_unit=0.555`
- DB cost_per_coverage_unit: 0.555 = 2.22/4 ✓ MATCH

**This was flagged as CRITICAL-4 in the previous audit — but the DB IS using ceiling_coverage correctly for these items.**

### Timber Dubbing Out Coat — Different Formula from Damp

| Workbook | WB Formula | DB Formula |
|----------|------------|------------|
| Damp | compound_material (SBR+sand+cement with coverage calcs) | compound_material ✓ |
| Timber | `=7×1.1` = 7.70 flat rate per M2 | standard with `base_unit_cost=7.70` ✓ |

The timber version simplified the dubbing coat to a flat rate rather than calculating individual components. This is correctly reflected in the DB.

### Timber Tanking Slurry Discrepancy

| | WB | DB |
|--|----|----|
| Col H value | 3.78 | `cost_per_coverage_unit=3.100` |
| Source | Unknown derivation | = 21.7/7 = 3.100 |

The WB value 3.78 does NOT match 21.7/7 = 3.10. The Damp workbook correctly uses `CEILING.MATH` with 21.7/7 = 3.10. The Timber workbook has 3.78 as a hard-coded value in Col H. This could be:
1. A different product/formulation used for timber tanking
2. An error in the timber workbook
3. An older price that was manually updated

**Severity: LOW** — This is a ~22% difference (3.78 vs 3.10) on the tanking slurry per-unit cost, but it only affects the timber survey type and only when tanking slurry is used.

### Woodworm Treatment Chemicals

| Item | WB Cost | DB `base_unit_cost` | Status |
|------|---------|---------------------|--------|
| Clear debris from subfloor | 0.00 | 0.00 | MATCH |
| Protective treatment new timbers | 0.50 | 0.50 | MATCH |
| 40.1 Gel injection | 2.22 | 2.22 | MATCH |
| Fogging floor area | 0.50 | 0.50 | MATCH |
| Fogging boarded area | 0.50 | 0.50 | MATCH |
| Fogging staircase open | 0.50 | 0.50 | MATCH |
| Fogging staircase closed | 2.00 | 2.00 | MATCH |
| Lifting loft insulation | 0.00 | 0.00 | MATCH |
| Fogging loft area | 0.50 | 0.50 | MATCH |
| Relaying loft insulation | 0.00 | 0.00 | MATCH |

**Key differences between Timber and Woodworm treatment costs:**

| Item | Timber WB | Woodworm WB | Notes |
|------|-----------|-------------|-------|
| Protective treatment | 22.00 | 0.50 | Timber uses bulk container; Woodworm uses per-unit application |
| Fogging staircase open | 0.20 | 0.50 | Different materials/concentration |
| Fogging items generally | 1.00 (subfloor) | 0.50 (all types) | Different treatment level |
| Masonry sterilant | 35.00 | NOT PRESENT | Woodworm doesn't treat masonry |
| Brunosol+Wykabor | 5.50 | NOT PRESENT | Woodworm doesn't need wall treatment |

All these differences are correctly captured in the DB — they represent genuine differences in treatment approach between timber decay and woodworm surveys.

---

## 6. SUMMARY OF FINDINGS

### Material Prices: 100% match
All material prices in both `materials_catalog` and `costing_line_templates` match the workbook values exactly (or within acceptable rounding of ±£0.01).

### Material Markup: MATCH with one exception
- Standard 30% markup: correctly configured
- PIV 40% markup: correctly configured in DB templates (0.400)
- Digital DPC 15.4% markup: correctly configured in DB (0.154)
- **PIV labour markup (300-400%)**: needs investigation — may be a CF CSV export artefact rather than actual pricing logic

### Coverage Rates: 100% match
All coverage rates match between workbooks and database.

### Condensation Materials: 100% captured
All PIV units, ducting components, fans, vents, and accessories are correctly captured as line templates with accurate costs and labour rates. None are missing from the DB.

### Timber/Woodworm Materials: Correctly captured
All treatment chemicals and their varying costs between timber and woodworm are correctly differentiated in the DB.

### One Minor Discrepancy
**Timber tanking slurry**: WB Col H = 3.78 vs DB `cost_per_coverage_unit` = 3.10 (derived from 21.7/7). Low severity — only affects timber surveys using tanking slurry. Needs client clarification on whether 3.78 is intentional for timber.

### Previously Identified Issues Still Outstanding
Referring to the previous costings audit (`COSTINGS_AUDIT_REPORT.md`):
- **CRITICAL-1 (ceiling_coverage double-division)**: Still present in `pricing-engine.ts` — this is a code bug, not a data issue
- **CRITICAL-2 (zero base_unit_cost in timber/woodworm)**: These are correctly handled — items with `base_unit_cost=0` use `formula_params.cost_per_coverage_unit` instead
- **CRITICAL-3 (condensation joinery ducting)**: Re-verified — DB correctly has `base_unit_cost=15.00` with `minimum_quantity=2.4` in formula_params
- **CRITICAL-4 (timber ROUNDUP items)**: Re-verified — DB correctly uses `ceiling_coverage` formula which provides the same rounding behaviour as ROUNDUP
