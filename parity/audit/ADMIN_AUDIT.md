# Admin Backend Audit — rates & materials the admin can see/edit

**Date:** 11 July 2026. Scope: `/admin/rates` (pricing_config), `/admin/materials` (materials_catalog), against what the costing engine ACTUALLY consumes and the workbook truth. Dominic's suspicion confirmed: several admin-editable values drove nothing.

## Findings & actions

### 1. Dead config controls — FIXED (migration 20260711000005)
- **`asbestos_testing_cost`** and **`digital_dpc_base_cost`** were editable on /admin/rates but consumed by **no code path** — the real prices live in the costing templates (asbestos base £30, digital DPC base £650, both workbook-exact). Editing the config rows changed nothing: a silent admin trap. → Config rows **deleted**, page controls **removed** with an explanatory comment. Single source of truth: the templates.
- **`contractor_hourly_rate` (£28)** — editable, consumed by nothing *today*. It is the workbook's E155 subcontractor pay rate, needed by the upcoming operative-outputs feature. → Kept, **relabelled as reserved** in both the DB description and the page helper text.
- `survey_fee_amount` / `survey_fee_expiry_days` — verified LIVE (Convert & Book flow in EnquiryDrawer). No action.
- All other keys verified consumed: `hourly_labour_rate` (10 sites), `default_material_markup`/`default_labour_markup`/`default_wastage_factor`, `vehicle_cost_per_mile`, `skip_hire_8yd_cost`, four `*_deposit_pct`.

### 2. VAT hardcode — FIXED
`vat_rate` (0.2) existed in config and on the admin page, but the costing page **hardcoded 0.20**. Both the page and the parity runner now read `pricing_config.vat_rate` (identical value today — zero price change, trap removed).

### 3. Materials catalog: 7 no-op rows — DEACTIVATED (migration 5)
`antinox_floor_protection`, `plasterboard_9_5mm`, `plastering_stop_bead_3m`, `plastic_airbrick`, `technoseal_dpm`, `thin_coat_angle_bead_2_4m`, `thin_coat_angle_bead_3m` are referenced by **no template and no engine fallback** — their lines price from template `base_unit_cost` (workbook-exact). Editing these catalog prices changed nothing. → `is_active = false` so they stop presenting as live rates.

**Recommended follow-up (not done — needs its own harness-gated batch):** wire these lines properly so admin price edits flow: template `product_key` → catalog supplier price, template `base_unit_cost` NULL, `wastage_factor` carrying the workbook's ×1.1 where applicable (verified clean for antinox/stop-bead/angle-beads; plasterboard's `(8.24/1.098)×1.3` shape and technoseal's 80-per-80m roll need modelling decisions).

**Decision 2026-07-11 (superseding the above, post pricing-control map):** re-link **on client demand only, and only the 4 clean rows** — the lines are already fully price-editable at /admin/costing, so a re-link changes where you edit, not whether you can. Full rationale (incl. why plasterboard/Technoseal/plastic-airbrick can't be linked honestly, and the `standard`-formula `base_unit_cost` shadowing guard any batch needs): `docs/workbook-analysis/PRICING_CONTROL_MAP.md` §3.

### 4. Catalog rows that DO drive live pricing — 25 of 34
These are the engine's first-precedence price source (catalog ÷ coverage). All were made workbook-exact in batches 1–4 (including the pack-price representations: `cm3_membrane_1_2m` 22.225, `isotherm_tiwi` 98.335 = half-roll). **Admin edits to these change live quotes immediately** — the parity suite is the guard: any rate change should be followed by `oracle → engine → compare` before being trusted, and will FAIL against the workbook until the workbook itself is updated to match. That is the correct behaviour for a golden-master regime: the workbooks and the platform move together.

### 5. Template editor
Costing templates (the deepest price source) are maintained via migrations under the parity gate — there is no free-form template editor exposed to admin beyond materials/rates, which is the right containment given the golden-master regime.
