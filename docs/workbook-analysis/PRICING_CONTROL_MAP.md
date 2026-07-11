# Pricing Control Map — Workbooks → Platform → Admin

**Date:** 11 July 2026 · **Status:** verified against all four live workbooks (openpyxl), the live TTDP database, and the engine source.
**Purpose:** prove that every pricing input from the four Excel costing workbooks has an editable home in the platform's three admin areas, and document exactly how each one reaches the costing engine. This is the reference for "the client updates their own prices — no code change, no developer".

Companion docs: per-workbook input inventories are summarised here from `docs/workbook-analysis/*_WORKBOOK_ANALYSIS.md`; the config/materials audit trail is `parity/audit/ADMIN_AUDIT.md`; the release gate is `parity/README.md`.

---

## 1. How the workbooks actually structured pricing (verified)

The working hypothesis — "a materials table and a rates table feed the costing lines" — is **not** how the workbooks work. All four share one architecture:

| Pricing input | Where it lived in the workbook | Central? |
|---|---|---|
| Base labour rate (£30.63/hr) | ONE cell per workbook (`Costing!D155` damp / `D139` timber / `D107` cond / `D110` woodworm), referenced by every line's col P | ✅ centralized |
| Contractor labour rate (£28/hr) | Sister cell `E155/E139/E107/E110`, referenced by every line's col V | ✅ centralized |
| Travel hourly rate | `C155` etc. — always `=D…` (mirrors labour rate) | ✅ centralized |
| Vehicle cost (£0.50/mile) | `J155/J139/J107/J110` | ✅ centralized |
| **Material unit prices** | **Hardcoded per line in col H** — bare constants (`5.46`) or micro-formulas embedding pack price ÷ pack size × 1.1 (`(20.83/5)*1.1`) | ❌ scattered (~45 damp, ~65 timber, ~35 cond, ~50 woodworm) |
| Material markup | Col J per line (0.3 typical; 0.4 PIV units; 0.154 digital DPC; 0 strip-out) | ❌ scattered |
| Labour markup | Col R per line (1.0 = +100% everywhere) | ❌ scattered |
| Labour hours per unit | Col N per line (productivity constants) | ❌ scattered |
| Section price adjustment % | One editable cell per section (col F rows; picker −5…+50 from Data Lists) | ◐ semi-central |
| VAT 20%, deposit 30%/50%, wastage ×1.1, contractor uplift ×1.1, contractor mileage £0.45, 6.5 h/day, 30 mph, disposal tiering 40/20/2, pack sizes | **Magic numbers inside formulas — no editable cell at all** | ❌ formula-only |

Two aggravating factors made the "ask the workbook admin" complaint inevitable:

- **Damp duplicates every material price twice**: `Costing!H` (drives pricing) *and* `Material-List!L` (purchasing list) had to be edited together or the built-in variance check broke.
- **The magic numbers required editing formula text**, not a cell — e.g. changing VAT meant editing 3–4 formulas across 2 sheets per workbook.

The downstream sheets (`CF CSV Upload`, `Customer Summary`, `Sub Contractor Costs`, `Report`, `CAF1`) carry **no independent prices** in any workbook — all derived from `Costing`.

## 2. How the platform structures the same data

Three tables feed the engine **in parallel at calculation time** (they do not "feed the templates" at rest — the join happens per line, per formula type, inside `pricing-engine.ts`):

```
pricing_config      (14+ keys)      →  /admin/rates      "Pricing Configuration"
materials_catalog   (27 active)     →  /admin/materials  "Materials Catalog"
costing_line_templates (220 lines,  →  /admin/costing    "Costing Templates"
  in 44 costing_sections)
        │
        ▼
calculateSurveyCosting():  loads all three → calculateLine(input, template, config, materials)
                           per formula type (9 types) → travel overhead post-engine
```

- **Costing Templates** are the platform's version of the workbook line rows: `base_unit_cost` ≈ col H, `labour_rate_per_unit` ≈ col N, `material_markup` ≈ col J, `labour_markup` ≈ col R, `wastage_factor` ≈ the baked ×1.1, `coverage_rate` ≈ the pack-size divisor, `formula_params` ≈ the special-case formula logic.
- **Materials Catalog** is the platform's (single-copy) version of damp's `Material-List`: supplier pack prices with `product_key` links. Templates that carry a `product_key` price from the catalog **live** — a catalog edit reprices those lines immediately.
- **Pricing Configuration** is the rate block **plus every magic number promoted to an editable key**.

### Material price resolution per formula type (engine precedence)

| Formula (count) | Price source precedence | Catalog-live? |
|---|---|---|
| `ceiling_coverage` (31) | catalog `unit_cost ÷ coverage_rate` → legacy `cost_per_coverage_unit` → `base_unit_cost` | ✅ all 31 linked |
| `compound_material` (1) | catalog per component (`components[].product_key`) | ✅ |
| `whole_pack` (6) | **catalog pack price** → `params.pack_cost` (snapshot fallback) → `base_unit_cost` | ✅ since 2026-07-11 wiring (was shadowed by `pack_cost`) |
| `dpc_injection` (1) | cream + drill-plug pack: **catalog** (`wykamol_ultracure_dpc_cream`, `drill_plugs_12mm`) → params fallback | ✅ since 2026-07-11 wiring (was shadowed by params) |
| `standard` (176) / `fixed_price` (2) | `base_unit_cost` on the template (none carry a `product_key`) | — template-priced, matching the workbook's per-line col H. Editable at /admin/costing |
| `tiered_disposal`, `bag_and_cart` (2) | `formula_params` (threshold/min-charge/per-bag) | — params editable at /admin/costing |
| `skip_hire` (1) | `pricing_config.skip_hire_8yd_cost` | — config editable at /admin/rates |

**Unit semantics to preserve:** `drill_plugs_12mm` is priced as a **pack of 100** (£4.29 — workbook `Material-List!L17 = 4.29/100` per plug; the costing formula consumes the pack figure). The EP40 resin materials are **raw pack prices** (£56.70 / £63.70); the workbook's baked ×1.1 lives in those templates' `wastage_factor = 1.1`, not in the price.

## 3. Master map — every workbook pricing input → platform home → admin surface

| # | Workbook input (all 4 unless noted) | Workbook location | Platform home | Admin surface | Engine consumption |
|---|---|---|---|---|---|
| 1 | Base labour rate £30.63 | `Costing!D155/D139/D107/D110` | `pricing_config.hourly_labour_rate` | /admin/rates | every labour calc; travel labour; CF CSV export |
| 2 | Travel hourly rate (=labour) | `C155` etc. (`=D…`) | same key (mirror by design) | /admin/rates | `calculateTravelOverhead` |
| 3 | Contractor labour £28 | `E155` etc. | `pricing_config.contractor_hourly_rate` | /admin/rates (marked **reserved**) | none yet — subcontractor-outputs feature |
| 4 | Vehicle cost £0.50/mile | `J155` etc. | `pricing_config.vehicle_cost_per_mile` | /admin/rates | travel overhead → PSO |
| 5 | Material unit prices (col H, per line) | ~195 lines across 4 workbooks | template `base_unit_cost` (standard/fixed) **or** `materials_catalog` via `product_key` (coverage/pack/compound/DPC) | /admin/costing **and** /admin/materials | per formula type (§2) |
| 6 | Pack prices ÷ pack size (inside H formulas) | e.g. `(20.83/5)*1.1` | catalog `unit_cost` + template `coverage_rate` (or `pack_size` param) | /admin/materials + /admin/costing | ceiling_coverage / whole_pack |
| 7 | Baked wastage ×1.1 (inside H formulas) | most material H cells | template `wastage_factor` (default `pricing_config.default_wastage_factor`) | /admin/costing (+ default at /admin/rates) | material cost line calc |
| 8 | Material markup (col J) | per line | template `material_markup` (default in config) | /admin/costing | `×(1+markup)` |
| 9 | Labour markup (col R) | per line | template `labour_markup` (default in config) | /admin/costing | `×(1+markup)` |
| 10 | Labour hours/unit (col N) | per line | template `labour_rate_per_unit` | /admin/costing | `hours = qty × rate` |
| 11 | Section price adjustment % | one cell per section (e.g. cond `F25 = −5`) | `costing_sections.default_adjustment_pct` (master default) + `costing_section_adjustments` (per survey) | /admin/costing (default) + costing page (per survey) | post-engine section multiplier |
| 12 | VAT 20% (magic, 3–4 formulas each) | `K143`, summaries | `pricing_config.vat_rate` | /admin/rates | costing page, quotations, parity runner |
| 13 | Deposit % (magic; damp/timber/woodworm 30%, condensation 50%) | Customer Summary | `pricing_config.{type}_deposit_pct` ×4 | /admin/rates | quotation/deposit creation |
| 14 | Working day 6.5 h (magic) | days-on-site formula | `pricing_config.productive_hours_per_day` | /admin/rates | travel overhead day count |
| 15 | Travel speed 30 mph (magic) | travel-hours formula | `pricing_config.travel_speed_mph` | /admin/rates | travel overhead hours |
| 16 | Contractor mileage £0.45/mile (magic) | `V142` etc. | `pricing_config.contractor_mileage_rate` (**reserved**) | /admin/rates (reserved) | none yet — subcontractor outputs |
| 17 | Contractor materials uplift ×1.1 (magic, col U) | every line | `pricing_config.contractor_material_uplift` (**reserved**) | /admin/rates (reserved) | none yet — subcontractor outputs |
| 18 | Disposal tiering £40 min / 20 bags / £2 (magic) | `H35` IF-formula | `tiered_disposal` `formula_params` | /admin/costing | tiered_disposal |
| 19 | Bag & cart £1/bag, 0.01 h/bag | col H/N | `bag_and_cart` `formula_params` | /admin/costing | bag_and_cart |
| 20 | Joinery £15/LM, min 2.4 m (magic, cond `H62`) | inside formula | template + `params.minimum_quantity` | /admin/costing | standard minimum-quantity |
| 21 | Skimming 15 m² blocks @ 4 h (magic) | `N80/O80` | `params.labour_block_size` / `labour_hours_per_block` | /admin/costing | ceiling_coverage block labour |
| 22 | Aquaban minimum labour (2.7 h) | formula | `params.minimum_labour_hours` | /admin/costing | ceiling_coverage floor |
| 23 | DPC constants (÷1.15, 6 holes/m, 0.35 h/LM) | `H40`/`O40` | dpc `formula_params` | /admin/costing | dpc_injection |
| 24 | DPC cream £13.93 / drill plugs £4.29 per 100 | `H40` + `Material-List!L16/L17` | `materials_catalog` | /admin/materials | dpc_injection (catalog-first) |
| 25 | Skip hire £270 | `H136` etc. | `pricing_config.skip_hire_8yd_cost` | /admin/rates | skip_hire |
| 26 | Asbestos £30, digital DPC £650 | H cells | their templates' `base_unit_cost` | /admin/costing | standard/fixed (dead config rows removed — ADMIN_AUDIT §1) |
| 27 | Joist size/price table (6 sizes) | fixed rows H83–88/H50–55 | 6 standard templates | /admin/costing | standard |
| 28 | Damp `Material-List` sheet (duplicate price copy) | damp only | **eliminated** — `materials_catalog` is the single copy | /admin/materials | n/a |
| 29 | Survey fee £150 / expiry 3 days (platform addition) | n/a | `pricing_config.survey_fee_amount` / `survey_fee_expiry_days` | /admin/rates | Convert & Book flow |

**Not carried over (documented, deliberate):**
- Digital DPC "min sell £750" — advisory **text** in damp `F41`, not enforced by any workbook formula; not enforced in the platform either.
- Woodworm/condensation orphan cells (`Costing!L` columns) — referenced by no formula in the workbooks; dead legacy data.
- Damp refit "3-hour chunking" note — already encoded in the affected templates' labour values (parity-verified).
- 7 no-op catalog rows deactivated 2026-07-11 (`antinox_floor_protection`, `plasterboard_9_5mm`, `plastering_stop_bead_3m`, `plastic_airbrick`, `technoseal_dpm`, `thin_coat_angle_bead_2_4m/_3m`) — their lines price from template `base_unit_cost`, still fully editable at /admin/costing, and the inactive rows are invisible in the materials UI (`getMaterials` filters `is_active`). **Decision 2026-07-11: re-link on client demand only, and only the 4 clean rows** (Antinox, stop bead, both angle beads — their workbook prices are supplier price × 1.1). The other 3 cannot be linked honestly: plasterboard is a derived rate (`(8.24/1.098)×1.3` — board price over coverage at 30%, not unit × 1.1), Technoseal's costing uses £80/80m-roll while the workbook's own Material-List says £23.33 (the sheets disagree), and the plastic airbrick line charges £16/each supply-and-fix against a ~£1.66 supplier product. A fabricated "supplier" price recreates the confusion the deactivation removed. Any re-link batch must also NULL `base_unit_cost` AND grey out the Unit Cost input for linked `standard` lines — `standard` resolves `base_unit_cost` BEFORE the catalog, so a typed-in value would silently shadow it again.

## 4. Gap register — found in this audit, closed by the 2026-07-11 wiring sprint

| Gap | Severity | Fix |
|---|---|---|
| `whole_pack` (6 timber/woodworm lines): `params.pack_cost` **shadowed** the catalog — catalog edits did nothing; `pack_cost` was editable **nowhere** in the UI | High — 6 lines re-priceable only via SQL | Engine precedence flipped to catalog-first; EP40 ×1.1 moved into `wastage_factor`; `pack_cost` params updated to raw pack prices (fallback snapshots); whole_pack badge/params/material-link added to /admin/costing |
| `dpc_injection`: `params.base_cream_cost`/`drill_cost` shadowed the catalog; catalog drill row had per-plug price (£0.04) while the engine needs the pack figure (£4.29) — a silent mis-price if the fallback ever fired | High | Engine precedence flipped to catalog-first for cream + drill pack; catalog drill row re-stated as pack-of-100 £4.29; params kept as fallback; UI now shows the material links instead of dead param inputs |
| Template `is_active` toggle was **decorative** — neither the mapping lookup nor the engine filtered on it (UI promised exclusion) | Medium (no live impact — all 220 active) | Mapping lookup now skips inactive templates silently (no "missing template" warning) |
| CF CSV export hardcoded £30.63/hr (`STANDARD_HOURLY_RATE`) — a labour-rate change would not flow to CF exports | Medium | `generateCFCSV` takes the rate from `pricing_config` via its callers |
| 6.5 h/day and 30 mph were hardcoded in `travel-overhead.ts` (same magic numbers as the workbooks) | Medium | Promoted to `pricing_config` keys, editable at /admin/rates |
| Section default adjustment % (`default_adjustment_pct`, the workbook master F-cells) not editable in any admin UI | Low | Editable per section on /admin/costing |
| `getTemplatesReferencingMaterial` missed compound components and the DPC engine keys → an ingredient material could be hard-deleted, silently pricing components at £0 | Medium | Detection extended to components + DPC keys |
| Contractor mileage £0.45 and ×1.1 uplift existed nowhere in the platform | Low (feature reserved) | Added as **reserved** config keys with the contractor rate |

## 5. Operating rules after this wiring

1. **Everything price-shaped is edited in the three admin areas.** If a price change ever requires a migration again, that is a regression against this map — file it.
2. **The parity harness remains the gate for structural costing changes** (engine code, formula types, template semantics). Admin **value** edits are the system working as designed: after go-live they intentionally diverge from the frozen workbooks (ADMIN_AUDIT §4).
3. **Precedence rule of thumb:** template `product_key` present → the Materials Catalog price is live and the template's `base_unit_cost` is ignored; no `product_key` → `base_unit_cost` is the price. The /admin/costing UI shows a material-link row wherever the catalog is authoritative.
4. **Deactivating a material** (`is_active=false`) removes it from the engine lookup — linked lines fall back to their snapshot params/`base_unit_cost`. Prefer editing the price over deactivating.
