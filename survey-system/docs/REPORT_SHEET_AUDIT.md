# Report Sheet Audit — Workbook vs App Report Generator

**Date:** 2026-02-28
**Scope:** Systematic comparison of the Report sheet from all 4 Excel workbooks against `src/lib/report-generator.ts`
**Method:** openpyxl extraction of all cells, formulas, and formatting from each workbook's Report sheet

---

## How the Workbook Report Sheets Work

All 4 workbooks use a consistent architecture:

- **Column A**: Visibility marker (`X` when visible, blank when hidden) — controlled by IF formulas referencing column AG/W
- **Column B**: Row visibility flag (`1` = show, `0` = hide, blank = conditional)
- **Column D–Z**: Content (text, formulas pulling from Costing sheet, manual input areas)
- **Column AB (or R in Woodworm)**: Surveyor instructions (never printed) — e.g. "← Enter Visibility", "Will always show"
- **Image Sections**: Paired Show/Hide toggles controlling photo slots (2 images side-by-side per section, up to 6 image sections per area)
- **Conditional text**: Multiple alternative paragraphs where surveyor picks which one to show (e.g., "No defects found" vs "We noted defects:")

The Report sheet is essentially a **template engine** — surveyors toggle visibility of pre-written paragraphs, enter room names and readings into cells, and paste photos into image slots. The printed output hides all rows where column A is blank.

---

## 1. DAMP WORKBOOK (v48) — Report Sheet (544 rows)

### Section Structure Inventory

| # | Section | Row Range | Content Type | App Section | Status |
|---|---------|-----------|-------------|-------------|--------|
| 1 | Sheet Validation / SHEET NOT COMPLETE | 1 | Internal validation banner | N/A | N/A (Excel-only) |
| 2 | **Client Name And Site Details** | 6–13 | Formulas → Costing!E7–E11 (name, address lines, postcode), Costing!E4 (ref ID) | `cover` section | MATCHED |
| 3 | **Weather Conditions** | 15–18 | Manual input: date, conditions, temperature °C | `cover` section (inspection_date, weather_conditions, temperature_c) | MATCHED |
| 4 | **The Property** | 19–30 | Image Section 1 (Front/Rear Elevation), manual: property type, construction, build year | `property` section + photos | MATCHED |
| 5 | **The Survey / Specific Defects Inspection** | 31–43 | Reported defect (formula → master doc), orientation text, scope text, abbreviations | `survey_context` section | MATCHED |
| 6 | **EXTERNAL INSPECTION** | 44 | Section header | `external_inspection` | MATCHED |
| 7 | **Building Defects** | 45–68 | Toggle: "No defects" vs bullet list of 16 specific defects + 3 custom "Other" lines | `external_inspection` sub-sections | MATCHED |
| 8 | **Building Defects Images** | 69–111 | 6 image sections (12 photo slots) with Show/Hide toggles | External inspection photos | PARTIALLY — app has unlimited photos per section |
| 9 | **Building Defects Warning Text** | 112–114 | 3 conditional warning paragraphs about urgency/maintenance | `external_inspection` | **MISSING** — app doesn't have these urgency warning variants |
| 10 | **Wall Ties** | 115–127 | Conditional: wall tie concern text + 1 image section + recommendation text (2 variants) | `wall_ties` sub-section | MATCHED |
| 11 | **Cracking To Walls** | 128–154 | Conditional: cracking text + 3 image sections + recommendation (2 variants) | `cracking` sub-section | MATCHED |
| 12 | **External Ground Levels** | 155–180 | Toggle: "No issues" vs "High ground levels to:" / "Ground falling towards building at:" + 3 image sections | `ground_levels` sub-section | PARTIALLY — app has basic version, workbook has specific area descriptions |
| 13 | **Ground Level Recommendation** | 181–188 | Always shows: 150mm DPC maintenance text, aco drain proposal, french drain proposal, ground lowering text | `ground_levels` | **MISSING** — app lacks the detailed ground level remediation text options |
| 14 | **Damp Proof Course** | 189–217 | 4 conditional variants about DPC status (original, chemical injection, not visible, previous work) + 3 image sections + guarantee recommendation | `dpc_findings` | PARTIALLY — app only has injection/digital DPC text, workbook has 4 DPC status descriptions |
| 15 | **DPC Proposal** | 218–219 | "Install low pressure injection DPC system" | `dpc_findings` / `scope_of_works` | MATCHED |
| 16 | **Sub Floor Ventilation** | 220–299 | Complex section with multiple toggles: no airbricks / obstructed airbricks / airbrick count per elevation (front/left/right/rear/offshoot) / W/W readings / conditional assessment (< or ≥ 20%) / proposals (remove/clean/upgrade/install/lift) / timber at risk assessment | `sub_floor_ventilation` | PARTIALLY — app captures airbrick counts but misses: per-elevation breakdown, W/W reading for sub-floor timbers, obstruction reasons, "timbers at risk" section |
| 17 | **INTERNAL INSPECTION** | 300 | Section header | `room_findings` | MATCHED |
| 18 | **Floors** | 301–316 | Timber floor assessment options: no defects / wood rot found / non-accessible areas (6 reasons) | Room sub-sections | **DIFFERENT** — workbook has separate floor inspection section; app combines into room-level findings |
| 19 | **Summary** | 317–335 | Timber summary: location bullet points, findings list (woodworm, wet rot, dry rot, woodboring weevil, high W/W) + proposals | Room findings / scope of works | PARTIALLY — app generates scope items but lacks the specific finding type descriptions |
| 20 | **Schedule For Treatment Of Wet Rot** | 336–351 | 14-step treatment schedule (open up, support, cut out, treat, prepare, etc.) | `scope_of_works` | **MISSING** — app has generic "Cut out and remove all timber" but workbook has detailed 14-step SOP |
| 21 | **Schedule For Treatment Of Wet Rot And Woodboring Weevil** | 337 | Same as above plus weevil-specific steps | `scope_of_works` | **MISSING** |
| 22 | **Walls** | 374–417 | 4 inspection description variants + plaster defect checklist (shadow bands, salting, loss of key) + 3 image sections + proposal (radiators, sockets, skirting, strip plaster, wallpaper, DPC system, fillet seal, debris disposal, asbestos testing) | Room sub-sections + scope_of_works | PARTIALLY — app has generic wall treatment proposals but misses plaster defect types and detailed work item descriptions |
| 23 | **Walls Unable To Inspect** | 418–433 | Reasons for inaccessibility (tiling, furniture, other) + images | Room findings | **MISSING** — app doesn't capture inaccessible wall explanations |
| 24 | **Non-destructive inspection note** | 434–438 | Always shows + destructive inspection recommendation options | `room_findings` content | PARTIALLY — app has the non-destructive note but lacks destructive inspection recommendation variants |
| 25 | **Solid floors** | 439–467 | Conditional: not included / dampness noted + images + resin membrane proposal | `scope_of_works` | PARTIALLY — app has floor treatment but misses "solid floors not included" disclaimer |
| 26 | **Additional Supporting Comments From Surveyor** | 468–469 | Free-text area for surveyor comments | Not in report generator | **MISSING** |
| 27 | **Surveyor Sign-off** | 470–481 | "Report produced by:" + conditional surveyor name/title/credentials (3 surveyors hardcoded: Steven Robinson, Graeme Hazel, Mike Davison) | `surveyor_profile` | MATCHED — app uses DB-driven surveyor data instead of hardcoded names |
| 28 | **Sketch Plan** | 482–485 | Image placeholder for sketch plan | `sketch_plan` | MATCHED |

### Photo Structure — DAMP

| Location | Image Sections | Slots | App Equivalent |
|----------|---------------|-------|----------------|
| The Property (Front/Rear) | 1 | 2 | `street_view` / `building_exterior` |
| Building Defects | 6 | 12 | External inspection photos (unlimited) |
| Wall Ties | 1 | 2 | External inspection photos |
| Cracking | 3 | 6 | External inspection photos |
| External Ground Levels | 3 | 6 | External inspection photos |
| DPC | 3 | 6 | Room photos |
| Sub Floor Ventilation | 3 | 6 | Room photos |
| Walls | 3 | 6 | Room photos |
| Walls Unable To Inspect | 1 | 2 | N/A |
| Solid Floors | 3 | 6 | Room photos |
| **TOTAL** | **27** | **54** | App: unlimited per category |

---

## 2. CONDENSATION WORKBOOK (v37) — Report Sheet (339 rows)

### Section Structure Inventory

| # | Section | Row Range | Content Type | App Section | Status |
|---|---------|-----------|-------------|-------------|--------|
| 1 | **Client Name And Site Details** | 6–13 | Same as Damp | `cover` | MATCHED |
| 2 | **Weather Conditions** | 16–19 | Same as Damp | `cover` | MATCHED |
| 3 | **The Property** | 20–38 | 2 image sections (4 slots: Front/Side/Rear + extra) + property type/construction/year | `property` | MATCHED |
| 4 | **The Survey** | 39–47 | Condensation-specific intro: "problems with mould, mildew & condensation" + abbreviations (PIV, ACM) | `survey_context` | PARTIALLY — app uses generic text, workbook has condensation-specific scope |
| 5 | **Internal Inspection** | 48–59 | Checklist of condensation evidence: windows condensation, dew points, black mould, ventilation, insulation, humidity reading (% with actual value), + 3 "Other" lines | Room findings | **DIFFERENT** — workbook has property-level summary; app does room-by-room |
| 6 | **Internal Inspection Images** | 60–81 | 3 image sections (6 slots) | Room photos | MATCHED |
| 7 | **Causes** | 83–90 | "The above problems have been caused by:" bullet list (ventilation, insulation, dampness, other + custom) | Not in report generator | **MISSING** — app doesn't generate a causes section |
| 8 | **Airbricks** | 91–150 | Nearly identical to Damp: no airbricks / obstructed / per-elevation count / assessment / blocked / low-level | `sub_floor_ventilation` | Same gaps as Damp |
| 9 | **Current Extraction Images** | 103–140 | 3× sets of image sections showing existing ventilation/extraction equipment | Room photos | **DIFFERENT** — workbook documents current extraction; app doesn't |
| 10 | **Proposal** | 151–179 | Detailed proposal section with specific equipment: PIV heated units (loft), PIV unheated, PIV wall-mounted, Humidistat fans, Cpass passive vents, Cvents, electrical fittings/ducting/grilles, diamond core holes, sark vents, airbricks, loft hatch (new/enlarge), mould treatment, external roof vents recommendation, electrical standards warning, asbestos testing | `scope_of_works` | PARTIALLY — app has PIV count + fan count but misses most equipment details |
| 11 | **Loft Access Image** | 180–186 | 1 image section | Photos | MATCHED |
| 12 | **Additional Information: Benefits of PIV** | 187–189 | Conditional on PIV being proposed: link to tyneteesdampproofing.co.uk/piv-video/ | Not in report generator | **MISSING** |
| 13 | **Extent Of Survey** | 190–191 | Condensation-specific disclaimer text | `extent_of_survey` | PARTIALLY — app has generic extent text; workbook has condensation-specific version |
| 14 | **EXTERNAL INSPECTION / Building Defects** | 192–263 | Same structure as Damp but with "See Damp report" option | `external_inspection` | MATCHED |
| 15 | **Additional Comments** | 264–277 | Free-text surveyor comments | Not in report | **MISSING** |
| 16 | **Sketch Plan** | 278–281 | Same as Damp | `sketch_plan` | MATCHED |
| 17 | **Surveyor Sign-off** | ~282+ | Same as Damp | `surveyor_profile` | MATCHED |

### Condensation-Specific Gaps

| Field | Workbook | App | Gap |
|-------|----------|-----|-----|
| Humidity reading with actual % value | `W55: 95` (peak reading) | `humidity_reading` on room data | DIFFERENT — workbook is property-level peak, app is per-room |
| Condensation causes analysis | Full section with bullet points | Not generated | **MISSING** |
| Current extraction documentation | Photos + descriptions of existing equipment | Not captured | **MISSING** |
| PIV system details (heated/unheated/wall-mounted) | Separate line items per type with locations | `piv_type` + `piv_count` on additional_works | PARTIALLY — app captures type but not per-location details |
| Ducting/boxwork for insulation | "Box in and insulate ducting" | `joinery_ducting_metres` | PARTIALLY |
| Sark vents count | Separate line item | `sarkvents_count` | MATCHED |
| Diamond core holes | Separate line item with count | `fan_core_hole_count` / `wall_mounted_core_hole_count` | MATCHED |
| Loft hatch new/enlarge | Two separate options | `loft_hatch_new_required` / `loft_hatch_enlarge_required` | MATCHED |
| PIV benefits link | Conditional link to website | Not in report | **MISSING** |
| Electrical standards warning | Conditional paragraph | Not in report | **MISSING** |
| "See Damp report for building defects" | Cross-reference option | Not applicable (each report standalone) | N/A |

---

## 3. TIMBER WORKBOOK (v34) — Report Sheet (920+ rows)

### Section Structure Inventory

| # | Section | Row Range | Content Type | App Section | Status |
|---|---------|-----------|-------------|-------------|--------|
| 1–5 | Client/Weather/Property/Survey/Scope/Abbreviations | 6–43 | Identical to Damp | Cover/survey_context | MATCHED |
| 6 | **External Building Defects** | 45–90 | Same as Damp (16 defects + 3 custom + images) | `external_inspection` | MATCHED |
| 7 | **External Ground Levels** | 91–117 | Same as Damp | `ground_levels` | Same gaps |
| 8 | **Sub Floor Ventilation** | 121–163 | Same as Damp | `sub_floor_ventilation` | Same gaps |
| 9 | **Internal Room Inspection Details** (×10 rooms) | 164–770 | **10 identical room blocks**, each containing: Room name (manual), Ceiling section, Walls section, Floors and floor voids section | Room sub-sections | **DIFFERENT** — workbook has 10 fixed room slots; app has dynamic rooms |
| 10 | **Per-Room: Ceiling** | Each ~20 rows | Options: not assessed / no defects / defects found (damp staining, mould, sagging, cracked, wet/dry rot, woodworm) + images | Room findings | **MISSING** — app has `ceiling_affected` + `ceiling_area` but not detailed defect types |
| 11 | **Per-Room: Walls** | Each ~20 rows | Options: not assessed / no defects / defects found (damp staining, cracks, mould) + images | Room findings | **MISSING** — app doesn't capture wall defect findings for timber surveys |
| 12 | **Per-Room: Floors and floor voids** | Each ~20 rows | Floor type (suspended timber/solid), sub-floor access, joist condition, fungal findings, W/W readings + images | Room findings | PARTIALLY — app captures most fields but misses some options |
| 13 | **Summary** | 772–788 | Same as Damp: timber location bullets, findings list | Room findings | Same gaps |
| 14 | **Dry Rot — Treatment And Party Wall Act** | 785–788 | Conditional: party wall notification text with legal reference | Not in report | **MISSING** |
| 15 | **Proposals** | 789–795 | Treatment proposals list | `scope_of_works` | MATCHED |
| 16 | **Schedule For Treatment Of Woodworm** | 796–800 | 5-step woodworm treatment schedule | `scope_of_works` | **MISSING** — app has generic treatment items |
| 17 | **Schedule For Treatment Of Dry Rot** | 801–817 | Detailed multi-step dry rot SOP (open up, support, cut out, grind mortar, wire scrub, sterilant, treat, end wrap, install bower beam, fix new timbers, bag debris, clean) | `scope_of_works` | **MISSING** — detailed SOP not reproduced |
| 18 | **Schedule For Treatment Of Wet Rot** | 818–832 | Similar multi-step SOP for wet rot | `scope_of_works` | **MISSING** |
| 19 | **Schedule For Treatment Of Wet Rot And Woodboring Weevil** | 833–847 | Combined SOP | `scope_of_works` | **MISSING** |
| 20 | **Additional Comments** | 848–861 | Free-text | Not in report | **MISSING** |
| 21 | **Sketch Plan + Surveyor** | 862–906 | Same as Damp | `sketch_plan` + `surveyor_profile` | MATCHED |

### Timber-Specific Gaps

| Field | Workbook | App | Gap |
|-------|----------|-----|-----|
| 10 fixed room inspection blocks | Each with ceiling/walls/floors sections | Dynamic rooms with `timber_decay` data | DIFFERENT structure — app is better (dynamic) but less detailed per area |
| Ceiling defect types | 8 specific defect options per room | `ceiling_affected` boolean + area m² | **MISSING** — no defect type detail |
| Wall defect assessment | Damp staining, cracks, mould options per room | Not captured for timber survey rooms | **MISSING** |
| Party Wall Act notification | Legal notification text for dry rot | Not generated | **MISSING** |
| Treatment SOPs | 4 separate multi-step schedules (woodworm/dry rot/wet rot/weevil) | Generic scope items | **MISSING** — significant gap |

---

## 4. WOODWORM WORKBOOK (v26) — Report Sheet (247 rows)

### Section Structure Inventory

| # | Section | Row Range | Content Type | App Section | Status |
|---|---------|-----------|-------------|-------------|--------|
| 1–4 | Client/Weather/Property | 5–29 | Same structure (uses columns D–K instead of D–Z) | `cover` + `property` | MATCHED |
| 5 | **Reported Problem** | 31–34 | "Woodworm suspected to:" + formula → master doc | `survey_context` | MATCHED |
| 6 | **The Scope** | 36–38 | Scope and general notes text | `survey_context` | MATCHED |
| 7 | **Inspection** | 40–179 | Main inspection section with: "No damage" / "Historic" / "Active" infestation options, **beetle species image** (anobium punctatum photo auto-shown), rooms listed by floor level (Ground/First/Loft/Other), 3 image sections per floor level (up to 12 per level = 36+ photo slots) | Room findings | PARTIALLY — app captures species/status/severity but workbook has floor-level room grouping |
| 8 | **Proposal** | 180–194 | "No further treatment" option, OR detailed proposal: create openings, fogging treatment, staircase access, roof void loft insulation lift/treat/replace, timber replacement lines (3 custom entries) | `scope_of_works` | PARTIALLY — app has spray/paste areas but misses detailed treatment methodology |
| 9 | **Treatment** | 195–198 | Treatment methodology description: "Microtec woodworm treatment chemicals using specialist Electronic aerosol micro spray system" + photos of protective clothing, electro-aerosol applicator, atomised micro-spray fogging | Not in report | **MISSING** — treatment methodology description with equipment photos |
| 10 | **Insulation** | 199–200 | Loft insulation handling process description | Not in report | **MISSING** |
| 11 | **Exclusion Zone** | 201–203 | Safety information: no entry during treatment + 1 hour after, communal areas warning, fish tank warning | Not in report | **MISSING** |
| 12 | **General / Ancillary Items** | 204–206 | Same as Damp but conditional on active infestation | `ancillary_items` | MATCHED |
| 13 | **Extent of Survey** | 207–209 | Same as Damp | `extent_of_survey` | MATCHED |
| 14 | **Payment** | 210–211 | Same as Damp | `payment_terms` | MATCHED |
| 15 | **Additional Comments** | 212–213 | Free-text | Not in report | **MISSING** |
| 16 | **Surveyor Sign-off** | 214–225 | Same structure, same 3 hardcoded surveyors | `surveyor_profile` | MATCHED |

### Woodworm-Specific Gaps

| Field | Workbook | App | Gap |
|-------|----------|-----|-----|
| Beetle species photo | Auto-shown reference photo of anobium punctatum | Not included | **MISSING** |
| Rooms grouped by floor level | Ground/First/Loft/Other with 3 rooms each | Dynamic rooms with floor_level field | DIFFERENT — app structure is better but report doesn't group by floor |
| Treatment methodology description | Paragraph about Microtec/aerosol system | Not generated | **MISSING** |
| Treatment equipment photos | 3 photos: protective clothing, applicator, fogging | Not included | **MISSING** |
| Insulation handling process | Detailed paragraph about loft insulation lift/treat/replace | Not generated | **MISSING** |
| Exclusion zone safety info | No entry rules + fish tank warning | Not generated | **MISSING** |
| "No further treatment" option | Explicit option when historic/no damage | Not generated (section simply omitted) | **DIFFERENT** — app omits rather than states explicitly |

---

## CROSS-WORKBOOK SUMMARY OF ALL GAPS

### CRITICAL GAPS (Content the customer sees that we don't generate)

| # | Gap | Affected Workbooks | Description |
|---|-----|-------------------|-------------|
| 1 | **Treatment SOPs / Schedules** | Damp, Timber | Workbooks have detailed multi-step treatment schedules (14 steps for wet rot, 12+ for dry rot, 5 for woodworm). App only generates generic scope items like "Cut out affected timbers." |
| 2 | **Treatment Methodology (Woodworm)** | Woodworm | Workbook describes the Microtec treatment system, includes equipment photos, and has safety information (exclusion zone, fish tanks). App generates none of this. |
| 3 | **Causes Analysis (Condensation)** | Condensation | Workbook has "The above problems have been caused by:" section with specific causes. App doesn't generate a causes section. |
| 4 | **Additional Surveyor Comments** | ALL 4 | All workbooks have a free-text "Additional Supporting Comments From Surveyor" section. App doesn't include this in the report. |
| 5 | **About Us / Company Profile** | ALL 4 (implicit) | App generates an "About Us" section. Workbooks do NOT have this — it's in the enclosed General Notes document instead. This is an APP IMPROVEMENT but could be duplicating content from the enclosed document. |
| 6 | **Executive Summary** | ALL 4 | App generates an LLM-written executive summary. Workbooks do NOT have this. This is an APP IMPROVEMENT. |

### MODERATE GAPS (Data fields that exist in workbook but not in report)

| # | Gap | Affected Workbooks | Description |
|---|-----|-------------------|-------------|
| 7 | **Building defect urgency warning text** | Damp | 3 variant paragraphs about defect urgency (short-term 3 months, with/without guarantee implications, lease responsibility). App has generic text. |
| 8 | **DPC status description** | Damp | 4 variants: original DPC / chemical injection / not visible / previous work by another company. App only has injection/digital DPC text. |
| 9 | **Per-elevation airbrick count** | Damp, Condensation, Timber | Workbooks record airbricks per elevation (front/left/right/rear/offshoot). App only captures total counts. |
| 10 | **Sub-floor timber W/W reading** | Damp | Specific W/W% reading for sub-floor timbers with conditional assessment (< or ≥ 20%). App doesn't capture this. |
| 11 | **Inaccessible areas documentation** | Damp, Timber | Detailed reasons why areas couldn't be inspected (polished floors, laminates, tiling, furniture, etc.). App has `floor_access` enum but not the detailed reason list. |
| 12 | **Plaster defect types** | Damp | Specific defect checklist: shadow bands, salting, loss of key. App doesn't capture plaster degradation types. |
| 13 | **Ground level specifics** | Damp | "High ground levels to the following areas:" and "External ground falling towards building at:" with specific area references. App has generic text. |
| 14 | **Ceiling defect types (Timber)** | Timber | 8 specific defect types per room ceiling. App only has boolean `ceiling_affected`. |
| 15 | **Party Wall Act notification** | Timber | Legal notification text required when dry rot is found near party walls. App doesn't generate this. |
| 16 | **PIV benefits link** | Condensation | Link to company website PIV video. App doesn't include. |
| 17 | **Current extraction documentation** | Condensation | Photos + descriptions of existing ventilation/extraction equipment. App doesn't capture or report. |

### MINOR GAPS / STRUCTURAL DIFFERENCES

| # | Gap | Description |
|---|-----|-------------|
| 18 | **Internal Reference ID** | Workbooks show Costing!E4 as reference ID. App shows survey ID differently. |
| 19 | **"See Damp report for building defects"** | Condensation workbook option to cross-reference. Not applicable in app (each report standalone). |
| 20 | **Enclosed document reference** | Workbooks reference "General Notes for clients and Health and Safety precautions" document. App mentions this but may not include it. |
| 21 | **Destructive inspection recommendation** | Damp workbook has 3 variants for recommending destructive inspection. App has a generic note. |
| 22 | **Electrical standards warning** | Condensation workbook warns if electrical system not up to standard. App doesn't include. |
| 23 | **"Solid floors not included"** | Damp workbook has explicit disclaimer. App doesn't include. |
| 24 | **Asbestos testing mention** | Damp, Condensation workbooks have conditional asbestos testing paragraph. App doesn't include. |
| 25 | **Beetle species reference photo** | Woodworm workbook auto-includes anobium punctatum photo. App doesn't. |

### APP IMPROVEMENTS (things the app does that workbooks don't)

| # | Improvement | Description |
|---|-------------|-------------|
| 1 | **Executive Summary (LLM)** | AI-generated summary of findings — not in any workbook |
| 2 | **About Us section** | Company profile in report body (workbooks put this in enclosed document) |
| 3 | **Dynamic rooms** | Unlimited rooms vs fixed 10 slots in Timber workbook |
| 4 | **Unlimited photos** | App supports unlimited photos per section vs fixed 2-per-slot in workbooks |
| 5 | **DB-driven surveyor profiles** | App uses database records vs 3 hardcoded surveyors |
| 6 | **Guarantee paragraph** | App includes guarantee information inline |
| 7 | **Multi-issue rooms** | App supports multiple issue types per room (damp + condensation + timber in one room) |

---

## PHOTO STRUCTURE COMPARISON

### Workbook Pattern
Every workbook uses the same photo pattern:
- 2 images per "Image Section" (side-by-side: columns D and Q)
- Each image has a Show/Hide toggle and a description field
- Multiple Image Sections per report section (typically 1–6)
- Photos are manually pasted into cells

### App Pattern
- Photos stored in Supabase Storage with category/room_id metadata
- Matched to report sections by `room_id` or `step` + `category`
- Unlimited photos per section
- Photos rendered by PDF renderer based on section data

### Key Difference
Workbook photos are **position-fixed** (e.g., "Image Section 3 of Building Defects"). App photos are **category-tagged** and dynamically placed. The app approach is more flexible but loses the explicit positional control the workbook provides.

---

## NARRATIVE TEXT COMPARISON

### Workbook Approach
- **Template-based**: Pre-written paragraphs with Show/Hide toggles
- **No AI**: All text is pre-written or manually entered
- **Conditional**: IF formulas determine which paragraph variant to show
- **Surveyor writes nothing**: Just toggles visibility and enters data values

### App Approach
- **Mixed**: Boilerplate constants + LLM-generated executive summary
- **AI for summary only**: Executive summary uses Llama 3.1 70B via OpenRouter
- **Direct field mapping**: Data pulled from wizard and formatted into text
- **Surveyor writes findings**: Free-text `findings` field per room

### Gap Assessment
The workbook has **far more pre-written text variants** than the app. Specifically:
- 3 building defect urgency warnings vs 0 in app
- 4 DPC status descriptions vs 2 in app
- 3 structural cracking recommendation variants vs 1 in app
- 14-step treatment SOPs vs generic 1-line scope items
- Treatment methodology descriptions with equipment photos vs nothing
- Safety information (exclusion zones) vs nothing

---

## RECOMMENDATIONS

### High Priority
1. **Add treatment SOPs/schedules** — These are customer-facing content that describes exactly what work will be done. Critical for professional credibility.
2. **Add treatment methodology section (Woodworm)** — Customers need to know the treatment approach, chemicals used, and safety precautions.
3. **Add causes analysis (Condensation)** — Customers want to understand WHY they have condensation.
4. **Add surveyor additional comments section** — All 4 workbooks have this; it's where surveyors add context not covered by templates.

### Medium Priority
5. **Add DPC status variants** — 4 options instead of 2
6. **Add building defect urgency text** — Warning about maintenance urgency
7. **Add inaccessible areas documentation** — Important for liability
8. **Add Party Wall Act notification** — Legal requirement for dry rot near party walls
9. **Add exclusion zone / safety info (Woodworm)** — Customer safety information
10. **Add per-elevation airbrick breakdown** — More detailed than total count

### Low Priority
11. Add plaster defect types
12. Add ground level area specifics
13. Add PIV benefits link
14. Add beetle species reference photo
15. Add electrical standards warning
16. Add asbestos testing paragraph
17. Add "solid floors not included" disclaimer
