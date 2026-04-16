# Survey Wizard Data Capture Audit

**Date:** 2026-02-28
**Status:** Investigation Complete — No Changes Made
**Scope:** All 4 workbooks (Damp v48, Condensation v37, Timber v33, Woodworm v26) vs Survey Wizard + Pricing Engine + Report Generator

---

## Executive Summary

The survey wizard captures the majority of **costing-critical quantity inputs** but has significant gaps in several areas. The most impactful findings:

- **12–15 Section Price Adjustment % fields per workbook are completely missing** — surveyors cannot fine-tune section pricing
- **Travel/logistics costs are captured by the UI but never consumed** by the pricing engine
- **5 condensation-specific equipment types** (Cpass vents, Cvents, wall-mounted PIV unit, joinery ducting, loft hatches) are missing entirely
- **6 ducting component types** from the workbook are not available in the wizard
- **Antinox floor protection boards** (all 4 workbooks) are not captured
- **Flooring deck type selection** for damp surveys is missing (7 options in workbook)
- **Several per-section difficulty hours** are missing or not routed to the pricing engine
- **Report generator has field name mismatches** that cause surveyor names to render as "undefined undefined"

### Impact by Severity

| Severity | Count | Impact |
|----------|-------|--------|
| CRITICAL | 8 | Quotes will be wrong or materially incomplete |
| HIGH | 12 | Quotes missing significant line items |
| MEDIUM | 9 | Report content missing or incorrect |
| LOW | 6 | Nice-to-have fields not captured |

---

## 1. CRITICAL GAPS — Quotes Will Be Wrong

### C1. Section Price Adjustment % — ALL Survey Types

**Workbook:** Every workbook has 10–15 section-level % adjustment inputs (range: -5% to +46%)
**Wizard:** No equivalent field exists
**Pricing Engine:** No mechanism to apply per-section adjustments
**DB Schema:** `costing_section_adjustments` table exists but is empty and unused

**Impact:** Surveyors cannot adjust section pricing for site-specific conditions (awkward access, extra complexity, competitive pressure). In workbooks, this is used on nearly every quote to fine-tune pricing.

**Affected sections (Damp example):**
- Preparatory Work, Strip Out, Walls, Cementitious Tanking, Floor Resin, Plastering, Floor Joists, Airbricks, Spray Treatments, Drains, Aquaban, Asbestos (12 adjustments)

---

### C2. Travel & Logistics — Captured but Not Consumed

**Workbook:** `distance_from_office` (miles) and `num_men_travelling` feed travel cost calculation in every workbook
**Wizard:** Fields exist in AdditionalWorksStep.tsx (lines 699-726) and saved to `additional_works`
**Pricing Engine:** `survey-mapping.ts` NEVER reads `distance_from_office` or `num_men_travelling`
**Costing:** Travel costs are completely omitted from all quotes

**Impact:** Every quote is missing travel costs. In the workbooks, travel is calculated as: `(days × distance × 2) × vehicle_cost_per_mile`. This can be £50–£200+ per job.

---

### C3. Condensation: Wall-Mounted PIV Unit — Missing from Mapping

**Workbook:** Condensation Costing F28 — VA Pozidry Compact wall mounted unit (Each)
**Wizard:** UI offers `piv_type: 'wall_mounted'` option (AdditionalWorksStep line 128)
**Pricing Engine:** `mapCondensationSurvey` only maps to `piv_loft:va_pozidry_loft_unit_*`. When `piv_type` is `wall_mounted`, the unit itself is never emitted as a line item — only ducting components are mapped.

**Impact:** Wall-mounted PIV unit cost (£350+ per unit) is omitted from quotes when wall-mounted type is selected. The ducting components are correctly mapped, but the unit itself is missing.

---

### C4. Condensation: Cpass Passive Vents — Missing Entirely

**Workbook:** Condensation Costing F52 — Dryaire Cpass passive vent (Each), F53 — Diamond core hole
**Wizard:** No field in `AdditionalWorks` type or UI for Cpass vent count
**Pricing Engine:** No mapping for `cpass_passive_vent:*` section

**Impact:** Cpass passive vents (a common condensation remedy, ~£120 each) cannot be quoted.

---

### C5. Condensation: Cvent Units — Missing Entirely

**Workbook:** Condensation Costing F57 — Dryaire Cvent (Each), F58 — Diamond core hole
**Wizard:** No field in `AdditionalWorks` type or UI for Cvent count
**Pricing Engine:** No mapping for `cvent:*` section

**Impact:** Cvent units cannot be quoted.

---

### C6. Condensation: Joinery Ducting Boxwork — Missing Entirely

**Workbook:** Condensation Costing F62 — Joinery to box in ducting (Linear Metres, with 2.4m minimum charge). Marked "Optional Item For Customer"
**Wizard:** No field for joinery ducting length
**Pricing Engine:** No mapping for `joinery_ducting:*` section

**Impact:** When wall-mounted PIV ducting needs to be boxed in, this cost (£15/m with 2.4m minimum = minimum £36) is omitted.

---

### C7. PIV Type Mapping Mismatch

**Wizard:** UI stores `piv_type` as `'loft_heated' | 'loft_unheated' | 'wall_mounted' | 'none'`
**Type Definition:** `PIVType = 'nuaire_drimaster_eco' | 'nuaire_drimaster_2000' | 'other'`
**Mapping Engine:** Checks `pivType === 'nuaire_drimaster_2000'` to select unheated, otherwise defaults to heated

**Impact:** The UI sends `'loft_heated'` or `'loft_unheated'` but the mapping engine checks for `'nuaire_drimaster_2000'`. This means the unheated variant is never selected — ALL loft PIV units are priced as heated regardless of what the surveyor chooses. Heated units cost more, so quotes are too high when unheated is selected.

---

### C8. Timber/Woodworm Difficulty Hours — Aggregated but Never Emitted

**Workbook:** Separate difficulty hours per section (Timber: R100, R78; Woodworm: R68, R45)
**Wizard:** `difficulty_hours` captured per room for timber and woodworm
**Pricing Engine:** `mapTimberSurvey` and `mapWoodwormSurvey` aggregate `totalDifficultyHours` but **never call `createLineInput`** with it. The variable is calculated and then discarded.

**Impact:** Surveyor-entered difficulty hours for timber and woodworm work are silently ignored, making quotes too low for complex jobs.

---

## 2. HIGH GAPS — Quotes Missing Significant Items

### H1. Antinox Floor Protection Boards — All Survey Types

**Workbook:** Damp Costing F25, Timber F25, Woodworm F25 — Antinox HD Floor Protection Boards (M² or Each)
**Wizard:** No field exists
**Pricing Engine:** No mapping

**Impact:** Floor protection for the customer's property during work (£5–£10/board) is not quoted. Used on most damp and timber jobs.

---

### H2. Damp: Flooring Deck Type Selection — Missing

**Workbook:** Damp Costing F101-F107 — 7 flooring options (Weyrock 18mm, 22mm, Standard T&G, Victorian T&G, Engineered Flooring Sheet, Structural Engineered, Floor Insulation). Each has different unit cost.
**Wizard:** DampRoomData has no `flooring_type` or `flooring_area` for replacement decking
**Pricing Engine:** No mapping for `floor_joists_decking:*` under damp survey type

**Impact:** When damp work requires floor replacement (stripping + new floor), the replacement flooring cost is not quoted. The strip-out cost IS captured, but the new floor is missing.

---

### H3. Damp: Warmline Internal Wall Insulation — Missing from Room Data

**Workbook:** Damp Costing F79 — Warmline Internal Wall Insulation (M²)
**Wizard:** `AdditionalWorks.warmline_insulation_area` exists but is only used for timber surveys (via `need_insulation` gate and mapped to `floor_joists_decking:insulation_suspended_flooring`)
**Pricing Engine:** For damp surveys, Warmline insulation is never mapped. The workbook has it in the Plastering section, not the joist section.

**Impact:** Wall insulation for damp rooms (a significant cost item at £30+/m²) cannot be quoted.

---

### H4. Condensation: Loft Hatch (New + Enlarge) — Missing

**Workbook:** Condensation Costing F66 (new loft hatch with ladder), F70 (enlarge existing). Both marked "Optional Item For Customer"
**Wizard:** No fields for loft hatch work
**Pricing Engine:** No mapping

**Impact:** When PIV installation requires loft access modifications, the loft hatch cost (£200–£400) is omitted.

---

### H5. Condensation: 6 Ducting Component Types Missing

**Workbook:** 11 ducting types (Costing F29-F40): 1m length, round elbow, round straight connector, round 1m, flat-to-round adaptor, flat straight connector, flat horizontal bend, flat vertical bend, flat 1m, insulated flexi 3m, grille
**Wizard:** Only 5 types available: `flexible_duct`, `rigid_duct`, `duct_elbow`, `duct_connector`, `grille`
**Mapping Engine:** Only maps those 5 types

**Missing:** flat-to-round adaptor, flat straight connector, flat horizontal bend, flat vertical bend, flat 1m, round 1m (separate from rigid_duct)

**Impact:** Complex ducting installations cannot be accurately quoted. Some component types are missing £5–£15 each.

---

### H6. Timber: Masonry Sterilant and Protective Treatment — Missing from Mapping

**Workbook:** Timber Costing F105 — Masonry sterilant Wykabor 20 brush applied (M²), F106 — Protective treatment new timbers (M²)
**Wizard:** No explicit fields for masonry sterilant or new timber protective treatment
**Pricing Engine:** No mapping for these line items under timber survey

**Impact:** Critical treatment items for timber decay (masonry sterilant after fungal removal, and preservative treatment for new joists) are not quoted. These are essential for guaranteeing the work.

---

### H7. Timber/Woodworm: Staircase Fogging — Missing

**Workbook:** Timber Costing F109 — Fogging staircase open rear treads (per step), F110 — Fogging staircase rear closed drill and plug (per step). Also in Woodworm F77, F78.
**Wizard:** No per-step staircase fogging fields
**Pricing Engine:** No mapping for staircase fogging

**Impact:** Staircase treatment (a common requirement, charged per step) is not quoted.

---

### H8. Woodworm: Loft Insulation Lift/Relay — Missing

**Workbook:** Woodworm Costing F79 — Lifting loft insulation (M²), F80 — Fogging loft area (M²), F81 — Relaying loft insulation (M²)
**Wizard:** No loft insulation fields for woodworm
**Pricing Engine:** No mapping for loft insulation under woodworm

**Impact:** When treating woodworm in roof timbers, loft insulation must be lifted, treatment applied, and insulation replaced. These costs (labour-intensive, £5–£8/m²) are omitted.

---

### H9. Timber: Grind Back Mortar / Wire Scrub Brickwork — Missing

**Workbook:** Timber Costing F35 — Grind back mortar courses on brickwork (M²), F36 — Wire scrub brickwork faces (M²)
**Wizard:** No fields for masonry preparation
**Pricing Engine:** No mapping

**Impact:** Essential preparation work for exposing masonry before treatment is not quoted.

---

### H10. Damp: Overtape — Missing from Wizard

**Workbook:** Damp Costing D55+E55 — Overtape (length + height). Auto-derived area = D55+(E55×2)
**Wizard:** No overtape field in DampRoomData
**Pricing Engine:** No mapping for overtape

**Impact:** Overtape (sealing membrane joints) is calculated automatically in the workbook from membrane area. Neither the measurement nor the auto-calculation exists.

---

### H11. Damp: Floor Resin Wall/Floor Fillet Joint — Not Mapped Separately

**Workbook:** Damp Costing F71 — Wall/floor fillet joint for floor resin section (LM). Separate from the membrane section's fillet joint (F53).
**Wizard:** `fillet_joint_length` exists but only maps to membrane or tanking fillet joint, not the floor resin section
**Pricing Engine:** No `floor_resin:wall_floor_fillet_joint` mapping

**Impact:** When floor resin treatment is applied, the perimeter fillet seal cost is omitted.

---

### H12. Damp/Timber: Difficulty Hours per Section — Only One Captured

**Workbook:** Separate difficulty hours for each section (Damp: F57 walls, F65 tanking, F73 floor resin, F84 plastering, F99 joists, F108 flooring, F119 spray. Timber: similar)
**Wizard:** Single `difficulty_hours` per room. Only mapped to `wall_membrane:difficulty_hours_walls` for damp.
**Pricing Engine:** No mapping for tanking difficulty, floor resin difficulty, joist difficulty, flooring difficulty

**Impact:** Only wall membrane difficulty hours are costed. All other section difficulties are silently ignored.

---

## 3. MEDIUM GAPS — Report Content Missing

### M1. External Inspection: Ground Level Observations — Missing

**Workbook:** Damp Report B155-B188 — detailed ground level inspection with high ground levels, falling ground, aco drain areas (3 slots), lower ground levels, french drain recommendations
**Wizard:** External inspection only has `building_defects_found`, `building_defects[]`, `wall_tie_concern`, `cracking_concern`, `notes`
**Report Generator:** Uses `aco_drain_length > 0` or `french_drain_length > 0` as ground level issue proxy

**Impact:** Ground level issues appear in reports only as a costing-derived proxy, not as specific surveyor observations. The detailed defect descriptions from the workbook are missing.

---

### M2. External Inspection: DPC Observations — Missing

**Workbook:** Damp Report B189-B219 — Evidence of original DPC, chemical injection, not visible, previous company work, check guarantee, proposal to install
**Wizard:** DPC data captured per room in DampRoomData (`dpc_required`, `dpc_type`, `dpc_wall_length`, `dpc_wall_depth`)
**Report Generator:** Has DPC findings section that reads room-level DPC data

**Impact:** External DPC observations (what the surveyor sees from outside) vs room-level DPC requirements (what treatment is needed) are conflated. The external observation narrative is missing.

---

### M3. External Inspection: Sub-Floor Ventilation Observations — Partially Missing

**Workbook:** Damp/Timber Report — 20+ fields: airbrick counts per elevation (5 elevations), obstruction reasons (6 options), moisture readings, blocked/too low status
**Wizard:** No per-elevation airbrick counts. Airbrick work quantities captured in AdditionalWorks but without observational context
**Report Generator:** Uses airbrick counts from additional_works for sub-floor ventilation section

**Impact:** The report can state "install X new airbricks" but cannot describe existing ventilation adequacy per elevation — important context for the customer.

---

### M4. Surveyor Name Fields — Report Generator Mismatch

**Report Generator:** Accesses `surveyor.first_name` and `surveyor.last_name` (line 541)
**Database:** `surveyors` table has only `full_name` column
**Result:** Surveyor name renders as `"undefined undefined"` on reports

**Impact:** Every generated report has a broken surveyor name unless the wizard data fallback (`sd.surveyor_name`) is populated.

---

### M5. Surveyor Job Title — Missing Column

**Report Generator:** Accesses `surveyor.job_title` (line 1077)
**Database:** No `job_title` column on `surveyors` table
**Result:** Surveyor profile section always shows empty job title

---

### M6. Photo Categories Mismatch

**Report Generator:** Expects `room_id`, `defect_evidence`, `meter_reading` as primary room photo categories
**Photo Types:** `survey-photo.types.ts` defines `damp_evidence`, `timber_damage`, `condensation_evidence`, `woodworm_evidence`, `room_overview`
**Result:** Room photos only match via legacy fallback path

**Impact:** Photos may be misplaced or missing in reports if the primary matching fails.

---

### M7. Wall Treatment `injection` Code — Dead Code Path

**Report Generator:** Has branches for `wall_treatment === 'injection'` in both `getTreatmentLabel()` and scope of works builder
**Type Definition:** `WallTreatment = 'membrane' | 'tanking' | 'none'` — no `injection` option
**Wizard UI:** Only offers membrane, tanking, or none

**Impact:** The injection treatment path (DPC injection as wall treatment vs separate DPC) is unreachable. If this should be an option, it's missing from the wizard type and UI.

---

### M8. Sketch Plan — Not Captured

**Workbook:** All 4 workbooks have a sketch plan section (surveyor draws room layout)
**Wizard:** No sketch plan capture capability
**Report Generator:** No sketch plan section generated

**Impact:** Reports lack the visual floor plan that the original workbooks included.

---

### M9. Additional Surveyor Comments — Limited

**Workbook:** Multi-line free text area for additional comments
**Wizard:** `room.findings` per room and `external_inspection.notes` exist
**Report Generator:** Uses `room.findings` for room-level comments

**Impact:** There's no equivalent of the workbook's whole-survey "Additional Supporting Comments" section. Surveyors can only add comments per room, not at the survey level.

---

## 4. LOW GAPS — Nice to Have

### L1. Cover Sheet Image Selection

**Workbook:** All 4 have a cover sheet image dropdown (Image 1-10, based on customer demographics)
**Wizard:** No equivalent
**Impact:** Cosmetic — the web PDF uses a standard template

### L2. Customer Summary Optional Item Toggles

**Workbook:** 10–15 toggles per workbook marking sections as "Optional For Customer" vs mandatory
**Wizard/Engine:** No per-section optional flag mechanism
**Impact:** All line items appear as mandatory. The workbooks allow specific sections to be presented as optional for customer choice.

### L3. Office Notes Sheet

**Workbook:** Separate "Office Notes" sheet for internal notes
**Wizard:** No equivalent (though `surveyor_notes` on rooms and CRM notes exist)
**Impact:** Minor — office notes can go in the CRM

### L4. Workbook Per-Room Visibility Toggles (Timber)

**Workbook:** Timber workbook allows activating/deactivating rooms 2-10 via Y column
**Wizard:** Room creation/deletion handles this
**Impact:** None — wizard approach is better

### L5. Condensation Peak Humidity Reading

**Workbook:** Report!W55 — single peak humidity reading for the whole property
**Wizard:** `humidity_reading` exists per room in CondensationRoomData but no whole-property peak
**Impact:** Minor — per-room is more detailed than per-property

### L6. Reported Defect Source

**Workbook:** Pre-populated from Details!C13 (what customer reported)
**Wizard:** `reported_defect` field exists in SurveyWizardData
**Impact:** Already captured

---

## 5. FORMAT/DATA TYPE MISMATCHES

### F1. PIV Electrical Pack — Boolean vs Number

**Wizard Type:** `piv_electrical_pack: boolean`
**Wizard UI:** AdditionalWorksStep actually treats it as a NUMBER input (lines 169-175, uses `parseInt`)
**Mapping Engine:** Checks truthiness `if (additionalWorks.piv_electrical_pack)` then uses `pivCount` as quantity
**Workbook:** Electrical pack has its own count (Costing F23), always matches PIV count

**Impact:** The UI captures a number but the mapping engine treats it as boolean, defaulting to PIV count. This works when electrical pack count = PIV count, but if different counts are needed, the number entered is ignored.

### F2. PIV Type Values — UI vs Type Definition

**Wizard Type:** `PIVType = 'nuaire_drimaster_eco' | 'nuaire_drimaster_2000' | 'other'`
**Wizard UI:** Sends `'loft_heated' | 'loft_unheated' | 'wall_mounted' | 'none'`
**Impact:** Type-unsafe. The mapping engine's switch doesn't match what the UI sends (see C7).

### F3. Mould Area — Severity to Area Conversion

**Workbook:** Condensation Costing F74 — explicit m² input for mould treatment area
**Wizard:** No explicit area. Mapping engine converts severity to area: light=3m², moderate=6m², severe=12m² per room
**Impact:** Surveyor cannot enter actual mould area. The conversion is an approximation. Real areas may differ significantly from the 3/6/12 defaults.

### F4. Damp Wall Area vs Strip-Out Assumption

**Mapping Engine:** `stripoutArea = totalWallAreaWithWallpaper + totalWallAreaWithoutWallpaper` — assumes ALL measured walls need plaster removal
**Workbook:** Strip-out area (F29) is a separate, independent input
**Impact:** Some walls may be measured but not need stripping. Over-quoting strip-out work.

---

## 6. NAME/KEY MISMATCHES

### N1. Timber Strip-Out Line Keys — Inconsistent Naming

**Damp mapping uses:** `strip_out:remove_plaster_walls`, `strip_out:strip_timber_floor_gf`, `strip_out:scrape_subfloors`, `strip_out:bag_cart_debris`, `strip_out:licensed_disposal`
**Timber mapping uses:** `strip_out:remove_plasterrender_walls`, `strip_out:strip_out_existing_timber_floor_gf`, `strip_out:bag_up_debris_cart_outside`, `strip_out:disposal_via_licensed_transfer_agent`

**Impact:** If templates exist under one naming convention but not the other, line items will silently fail to match. Need to verify both sets of keys exist in `costing_line_templates`.

### N2. Condensation Mould Treatment Section Key

**Mapping uses:** `mould_treatment:mould_treatment`
**Workbook section:** "Mould Treatments" (Costing rows 74-75)
**Impact:** Need to verify this section_key:line_key exists in the condensation templates.

### N3. Surveyor Table Fields

**Report Generator expects:** `surveyor.first_name`, `surveyor.last_name`, `surveyor.job_title`
**Database has:** `surveyors.full_name`, `surveyors.qualifications`
**Impact:** See M4, M5 above.

---

## 7. CAPTURED BUT NOT USED

These fields are captured by the wizard but consumed by neither the pricing engine nor the report generator.

### U1. `room.surveyor_notes` and `room.recommendations`

**Captured:** Loaded by `loadWizardData`
**Used by:** Neither pricing engine nor report generator (only `room.findings` is used)

### U2. `external_inspection.raw_notes`

**Captured:** Stored as raw voice transcript
**Used by:** Report generator only uses `external_inspection.notes` (polished version)
**Note:** This is by design — preserved as audit trail

### U3. `external_inspection.defect_urgency`

**Captured:** `DefectUrgency` type with immediate/short_term/medium_term/long_term
**Used by:** Not consumed by report generator or pricing engine

### U4. Condensation Descriptive Fields per Room

**Captured:** `condensation_on_windows`, `ventilation_adequate`, `humidity_reading`, `piv_recommended`
**Used by:** Report generator stores them in report data but `piv_recommended` is not used for costing (PIV comes from additional_works). Other fields only appear in report narrative context.

### U5. Timber Descriptive Fields per Room

**Captured:** `floor_type`, `floor_condition`, `floor_access`, `sub_floor_inspected`, `sub_floor_ventilation`, `joist_condition`, `timber_replacement_needed`
**Used by:** Report generator uses `floor_condition`, `sub_floor_ventilation`, `fungal_findings`, `timber_replacement_needed`, `flooring_type`. Pricing engine only uses quantities.
**Note:** `floor_type`, `floor_access`, `sub_floor_inspected`, `joist_condition` are captured but only partially consumed.

### U6. Woodworm Descriptive Fields

**Captured:** `species_identified`, `infestation_status`
**Used by:** Report generator uses them in LLM context. Not used for costing.
**Note:** By design — descriptive not quantitative.

---

## 8. COMPLETE LINE ITEM COVERAGE — Workbook vs Mapping Engine

### Damp Workbook Line Items

| Workbook Section | Items | Mapped? | Gap Type |
|-----------------|-------|---------|----------|
| Preparatory: Remove radiators | F21 | YES | — |
| Preparatory: Remove sockets | F22 | YES | — |
| Preparatory: Skirting removal | F23 | YES | — |
| Preparatory: Strip wallpaper | F24 | YES | — |
| **Preparatory: Antinox floor boards** | **F25** | **NO** | **H1** |
| **Preparatory: Section adj %** | **F26** | **NO** | **C1** |
| Strip out: Remove plaster walls | F29 | YES | — |
| Strip out: Remove stud walls | F30 | NO (minor) | — |
| Strip out: Plaster/stud ceilings | F31 | NO (minor) | — |
| Strip out: Strip timber floor | F32 | YES | — |
| Strip out: Scrape subfloors | F33 | YES | — |
| Strip out: Bag debris (auto) | F34 | YES (auto-calc) | — |
| Strip out: Disposal (auto) | F35 | YES (auto-calc) | — |
| **Strip out: Section adj %** | **F36** | **NO** | **C1** |
| DPC Traditional: Injection | D40,E40 | YES | — |
| DPC Digital: Wall type + radius | D42,E42 | NO | HIGH (but template may not exist) |
| Walls: Membrane variants | D44-D48 | YES (via membrane_wall_lengths) | — |
| Walls: Membrane plugs (auto) | F51 | YES (auto-calc) | — |
| Walls: Sealing tape (auto) | F52 | YES (auto-calc) | — |
| Walls: Fillet joint | F53 | YES | — |
| **Walls: Overtape** | **D55,E55** | **NO** | **H10** |
| Walls: Technoseal (auto) | F56 | Not mapped separately | — |
| Walls: Difficulty hours | F57 | YES | — |
| **Walls: Section adj %** | **F58** | **NO** | **C1** |
| Tanking: Dubbing coat | F61 | YES | — |
| Tanking: Slurry | F62 | YES | — |
| Tanking: Renovating plaster | F63 | YES | — |
| Tanking: Fillet joint | F64 | YES | — |
| **Tanking: Difficulty hours** | **F65** | **NO** | **H12** |
| **Tanking: Section adj %** | **F66** | **NO** | **C1** |
| Floor resin: Primer | F69 | YES | — |
| Floor resin: Top coat | F70 | YES | — |
| **Floor resin: Fillet joint** | **F71** | **NO** | **H11** |
| Floor resin: Grip grit | F72 | YES | — |
| **Floor resin: Difficulty hours** | **F73** | **NO** | **H12** |
| **Floor resin: Section adj %** | **F74** | **NO** | **C1** |
| Plastering: Stud wall | F77 | YES | — |
| Plastering: Plasterboard | F78 | YES | — |
| **Plastering: Warmline insulation** | **F79** | **NO** | **H3** |
| Plastering: Skimming | F80 | YES | — |
| Plastering: Stop bead | F81 | YES (via additional_works) | — |
| Plastering: Corner bead 2.4m | F82 | YES (via additional_works) | — |
| Plastering: Corner bead 3m | F83 | YES (via additional_works) | — |
| Plastering: Difficulty hours | F84 | YES (via additional_works) | — |
| **Plastering: Section adj %** | **F85** | **NO** | **C1** |
| **Joists: All 6 sizes** | **D89-D94** | **NO (for damp)** | **H2** |
| **Joist extras (endwrap, wall plate, etc.)** | **D95-D98** | **NO (for damp)** | **H2** |
| **Flooring: 7 deck types** | **F101-F107** | **NO (for damp)** | **H2** |
| **Floor joists: Section adj %** | **F109** | **NO** | **C1** |
| Airbricks: Clean | F112 | YES | — |
| Airbricks: Upgrade | F113 | YES | — |
| Airbricks: Install new | F114 | YES | — |
| **Airbricks: Section adj %** | **F115** | **NO** | **C1** |
| Spray treatments: Fog subfloor | F118 | YES (via additional_works) | — |
| Spray: Difficulty hours | F119 | YES (via additional_works) | — |
| **Spray: Section adj %** | **F120** | **NO** | **C1** |
| Drains: Aco drain | F123 | YES | — |
| Drains: French drain | F124 | YES | — |
| **Drains: Section adj %** | **F125** | **NO** | **C1** |
| Aquaban | F128 | YES | — |
| **Aquaban: Section adj %** | **F129** | **NO** | **C1** |
| Asbestos testing | F132 | YES | — |
| **Asbestos: Section adj %** | **F133** | **NO** | **C1** |
| Skip hire | F136 | YES | — |
| **Travel: Distance** | **K147** | **NO** | **C2** |
| **Travel: Men count** | **K148** | **NO** | **C2** |

### Condensation Workbook Line Items

| Workbook Section | Items | Mapped? | Gap Type |
|-----------------|-------|---------|----------|
| PIV Loft: Heated unit | F21 | YES | — |
| PIV Loft: Unheated unit | F22 | YES (but type mismatch) | C7 |
| PIV Loft: Electrical pack | F23 | YES | — |
| PIV Loft: Sarkvents | F24 | YES | — |
| **PIV Loft: Section adj %** | **F25** | **NO** | **C1** |
| **PIV Wall: VA Pozidry Compact** | **F28** | **NO** | **C3** |
| PIV Wall: Electrical pack | F29 | NO | C3 |
| PIV Wall: 6 ducting types missing | F30-F38 | PARTIAL (5 of 11) | H5 |
| PIV Wall: Grille | F40 | YES | — |
| PIV Wall: Diamond core hole | F41 | NO (mapped under fan section only) | — |
| **PIV Wall: Section adj %** | **F42** | **NO** | **C1** |
| Fan: Trickle & boost | F45 | YES | — |
| Fan: Electrical pack | F46 | YES | — |
| Fan: Grille | F47 | YES | — |
| Fan: Diamond core hole | F48 | YES | — |
| **Fan: Section adj %** | **F49** | **NO** | **C1** |
| **Cpass: Passive vent** | **F52** | **NO** | **C4** |
| **Cpass: Diamond core** | **F53** | **NO** | **C4** |
| **Cpass: Section adj %** | **F54** | **NO** | **C1** |
| **Cvent: Unit** | **F57** | **NO** | **C5** |
| **Cvent: Diamond core** | **F58** | **NO** | **C5** |
| **Cvent: Section adj %** | **F59** | **NO** | **C1** |
| **Joinery ducting: Boxwork** | **F62** | **NO** | **C6** |
| **Joinery: Section adj %** | **F63** | **NO** | **C1** |
| **Loft hatch: New** | **F66** | **NO** | **H4** |
| **Loft hatch: Section adj %** | **F67** | **NO** | **C1** |
| **Loft hatch: Enlarge** | **F70** | **NO** | **H4** |
| **Enlarge hatch: Section adj %** | **F71** | **NO** | **C1** |
| Mould treatment | F74 | YES (via severity conversion) | F3 |
| **Mould: Section adj %** | **F75** | **NO** | **C1** |
| Asbestos testing | F78 | YES | — |
| **Asbestos: Section adj %** | **F79** | **NO** | **C1** |
| Airbricks: Clean/Upgrade/New | F82-F84 | YES | — |
| **Airbricks: Section adj %** | **F85** | **NO** | **C1** |
| Skip hire | F88 | YES | — |
| **Travel: Distance** | **K99** | **NO** | **C2** |
| **Travel: Men count** | **K100** | **NO** | **C2** |

### Timber Workbook — Key Missing Items Only

(Same prep/strip/plastering/joist/flooring structure as damp, already mapped)

| Missing Item | Ref | Gap Type |
|-------------|-----|----------|
| Antinox floor protection | F25 | H1 |
| Grind back mortar | F35 | H9 |
| Wire scrub brickwork | F36 | H9 |
| Apply Brunosol + Wykabor (wall treatment) | F42 | H6 |
| Masonry sterilant brush | F105 | H6 |
| Protective treatment new timbers | F106 | H6 |
| Fogging staircase (open rear) | F109 | H7 |
| Fogging staircase (closed rear) | F110 | H7 |
| All section price adj % (10) | Various | C1 |
| Travel & logistics | K131-K132 | C2 |
| Difficulty hours (floor joists section) | F100 | H12 |

### Woodworm Workbook — Key Missing Items Only

| Missing Item | Ref | Gap Type |
|-------------|-----|----------|
| Antinox floor protection | F25 | H1 |
| Clear debris from sub floor | F72 | Missing mapping |
| Protective treatment new timbers | F73 | Missing mapping |
| Fogging staircase (open rear) | F77 | H7 |
| Fogging staircase (closed rear) | F78 | H7 |
| Lifting loft insulation | F79 | H8 |
| Fogging loft area | F80 | H8 |
| Relaying loft insulation | F81 | H8 |
| All section price adj % (6) | Various | C1 |
| Travel & logistics | K102-K103 | C2 |

---

## 9. RECOMMENDATIONS (For Discussion)

**Priority 1 — Fix Broken Features (no quoting impact, but broken output):**
1. Fix surveyor name rendering (M4, M5)
2. Fix PIV type mapping mismatch (C7)
3. Wire up travel/logistics to pricing engine (C2)

**Priority 2 — Add Missing Costing-Critical Items:**
1. Add section price adjustment % mechanism (C1)
2. Add wall-mounted PIV unit to mapping (C3)
3. Add Cpass vents, Cvents, joinery ducting, loft hatches for condensation (C4, C5, C6, H4)
4. Wire difficulty hours for timber/woodworm to pricing (C8)

**Priority 3 — Add Missing High-Impact Items:**
1. Add flooring deck type selection for damp (H2)
2. Add Antinox floor protection (H1)
3. Add masonry sterilant and protective treatment (H6)
4. Add staircase fogging (H7)
5. Add missing ducting component types (H5)
6. Add Warmline insulation for damp (H3)
7. Add loft insulation for woodworm (H8)
8. Add masonry preparation items (H9)

---

*This audit is investigation-only. No code or data has been modified.*
