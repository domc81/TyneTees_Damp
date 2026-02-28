-- =============================================================================
-- Costings Data Corrections — Part 2 of Costings Engine Fix
-- Fixes CRITICAL-2, CRITICAL-3, CRITICAL-4 plus moderate and minor issues
-- Reference: survey-system/docs/COSTINGS_AUDIT_REPORT.md
-- =============================================================================

BEGIN;

-- ─────────────────────────────────────────────────────────────────────────────
-- CRITICAL-2: Timber/Woodworm zero-value line templates
-- These items had 0.00 in DB where the workbooks have non-zero values.
-- The Damp equivalents already have correct values.
-- ─────────────────────────────────────────────────────────────────────────────

-- Labour rate fixes (labour_rate_per_unit: 0.0000 → correct value)

-- Remove radiators & cap valves — Timber
UPDATE costing_line_templates SET labour_rate_per_unit = 0.3330
WHERE id = '8305a4e3-6667-403f-b767-f52ec903b19a';

-- Remove radiators & cap valves — Woodworm
UPDATE costing_line_templates SET labour_rate_per_unit = 0.3330
WHERE id = 'a062d347-4971-4206-a893-97cdbda1f8cf';

-- Remove socket fronts and isolate — Timber
UPDATE costing_line_templates SET labour_rate_per_unit = 0.2000
WHERE id = 'b769b079-21d2-4a51-b17c-36c24a8d7cea';

-- Remove socket fronts and isolate — Woodworm
UPDATE costing_line_templates SET labour_rate_per_unit = 0.2000
WHERE id = 'ba014c15-40e0-4f64-8ff4-5605ca1c4eb5';

-- Antinox Floor Protection — Timber (also fix base_unit_cost)
UPDATE costing_line_templates SET labour_rate_per_unit = 0.0330, base_unit_cost = 4.5760
WHERE id = 'c83ee94f-07ec-4cb0-a0f5-341d5d20d81f';

-- Antinox Floor Protection — Woodworm (also fix base_unit_cost)
UPDATE costing_line_templates SET labour_rate_per_unit = 0.0330, base_unit_cost = 4.5760
WHERE id = '9126ed79-0086-43ba-ab01-fa0507a09841';

-- Remove carpet/tiles/overlays — Timber only
UPDATE costing_line_templates SET labour_rate_per_unit = 0.1670
WHERE id = 'b0e7ddce-8573-4ed5-81cd-ee120642ab10';

-- Technoseal LM — Timber (also fix base_unit_cost)
UPDATE costing_line_templates SET labour_rate_per_unit = 0.0170, base_unit_cost = 1.0000
WHERE id = 'de2e0696-1c07-4001-9e5a-da95e8afb4df';

-- Fogging boarded area — Woodworm only
UPDATE costing_line_templates SET labour_rate_per_unit = 0.0230
WHERE id = 'ec465720-19a3-4812-81c4-33b5c5a26a76';

-- Material cost fixes (base_unit_cost: 0.0000 → correct value)

-- Dubbing out coat — Timber
UPDATE costing_line_templates SET base_unit_cost = 7.7000
WHERE id = '6c5aa1a3-8ad6-4632-987b-a050a1b945bd';

-- Renovating plaster — Timber
UPDATE costing_line_templates SET base_unit_cost = 5.9600
WHERE id = '34cf4e30-cb96-49ba-9858-962ab61dac36';

-- EP40 Resin Primer — Timber
UPDATE costing_line_templates SET base_unit_cost = 62.3700
WHERE id = '6e33feb4-c2de-4fc7-8435-487df0b39be9';

-- EP40 Resin Top Coat — Timber
UPDATE costing_line_templates SET base_unit_cost = 70.0700
WHERE id = '36c77cfa-1d9d-4404-87a2-5c79cda5d7b3';

-- Plasterboarding (inc dab/screws) — Timber
UPDATE costing_line_templates SET base_unit_cost = 9.7600
WHERE id = '38a76850-e992-4336-8bd1-84e7241ba796';

-- Plasterboarding (inc dab/screws) — Woodworm
UPDATE costing_line_templates SET base_unit_cost = 9.7600
WHERE id = 'd05d37ba-d0e3-4e37-92cb-924e96fdf58d';

-- Plastering Stop Bead 3m — Timber
UPDATE costing_line_templates SET base_unit_cost = 1.1000
WHERE id = '65cdcae6-c354-47fd-955a-0218b1a0e44d';

-- Plastering Stop Bead 3m — Woodworm
UPDATE costing_line_templates SET base_unit_cost = 1.1000
WHERE id = 'aaa4ae7a-0613-4f0a-adee-4b5776ac1487';

-- Thin Coat Angle Bead 2.4m — Timber
UPDATE costing_line_templates SET base_unit_cost = 1.8300
WHERE id = 'd2f29a90-2190-4264-8c10-0b80a9477c55';

-- Thin Coat Angle Bead 2.4m — Woodworm
UPDATE costing_line_templates SET base_unit_cost = 1.8300
WHERE id = 'fd1cdc94-a835-47f1-bf26-89e6bbd9a634';

-- Thin Coat Angle Bead 3m — Timber
UPDATE costing_line_templates SET base_unit_cost = 2.7500
WHERE id = '950ca4fd-ebad-4fd8-a4bb-e927589d1b21';

-- Thin Coat Angle Bead 3m — Woodworm
UPDATE costing_line_templates SET base_unit_cost = 2.7500
WHERE id = 'd22d0df9-9420-416a-a7c7-6362156eee4d';


-- ─────────────────────────────────────────────────────────────────────────────
-- CRITICAL-3: Condensation joinery ducting — zero cost with minimum charge
-- Workbook: IF(qty<2.4, 15×2.4/qty, 15) per metre → minimum charge of £36
-- Change from fixed_price to standard with minimum_quantity=2.4
-- Engine now supports minimum_quantity in formula_params for calcStandard
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE costing_line_templates SET
  base_unit_cost = 15.0000,
  cost_formula = 'standard',
  formula_params = '{"minimum_quantity": 2.4}'::jsonb
WHERE id = 'c55b0bf4-0ea2-4359-a109-6170f1fed633';


-- ─────────────────────────────────────────────────────────────────────────────
-- CRITICAL-4: Timber treatment formula types — standard → ceiling_coverage
-- These items need ROUNDUP to whole purchase units per the workbook formulas.
-- ─────────────────────────────────────────────────────────────────────────────

-- Masonry sterilant (Wykabor 20) — ROUNDUP(qty/10, 0) × cost
-- base_unit_cost=35.00 is per 10m² tub → per m² = 3.50
UPDATE costing_line_templates SET
  cost_formula = 'ceiling_coverage',
  coverage_rate = 10.0000,
  formula_params = '{"coverage_rate": 10, "cost_per_coverage_unit": 3.50}'::jsonb
WHERE id = 'c3b34b00-e870-4541-a6cc-205962b5c60d';

-- Protective treatment (DP or bug) — ROUNDUP(qty/25, 0) × cost
-- base_unit_cost=22.00 is per 25m² → per m² = 0.88
UPDATE costing_line_templates SET
  cost_formula = 'ceiling_coverage',
  coverage_rate = 25.0000,
  formula_params = '{"coverage_rate": 25, "cost_per_coverage_unit": 0.88}'::jsonb
WHERE id = 'cf17de47-dc7b-42d7-b416-ad28e3d42cc4';

-- 40.1 Gel injection — ROUNDUP(qty/4, 0) × cost
-- base_unit_cost=2.22 is per 4m² pack → per m² = 0.555
UPDATE costing_line_templates SET
  cost_formula = 'ceiling_coverage',
  coverage_rate = 4.0000,
  formula_params = '{"coverage_rate": 4, "cost_per_coverage_unit": 0.555}'::jsonb
WHERE id = '4daabc0c-fecf-4825-bacb-6e7879e1085a';


-- ─────────────────────────────────────────────────────────────────────────────
-- FIX 4: Mursec Eco materials_catalog price — 750.00 → 650.00
-- Workbook, costing templates, and pricing_config all use 650.00.
-- Only the materials_catalog entry was wrong.
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE materials_catalog SET unit_cost = 650.00
WHERE id = 'mursec_eco_unit';


-- ─────────────────────────────────────────────────────────────────────────────
-- MINOR FIX 5: Condensation mould_treatment — set is_optional=true
-- Workbook marks this as "Optional Item For Customer"
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE costing_sections SET is_optional = true
WHERE id = 'f9d6ed65-9b13-4ff0-b547-0f4a169078b2';


-- ─────────────────────────────────────────────────────────────────────────────
-- MINOR FIX 6: Technoseal wastage_factor — set to 1.000 (no wastage)
-- Workbook formula H=80/80=1.0, no wastage applied to Technoseal
-- ─────────────────────────────────────────────────────────────────────────────

-- Damp Technoseal
UPDATE costing_line_templates SET wastage_factor = 1.000
WHERE id = 'c3f69dee-c93c-44ff-93f9-54a826684979';

-- Timber Technoseal (already updating base_unit_cost and labour above)
UPDATE costing_line_templates SET wastage_factor = 1.000
WHERE id = 'de2e0696-1c07-4001-9e5a-da95e8afb4df';


-- ─────────────────────────────────────────────────────────────────────────────
-- MODERATE FIX 7: Warmline IWI — add missing adhesive cost
-- Workbook charges for BOTH TIWI roll (£27.60/7.125m²) AND adhesive (£38.50/7.125m²)
-- Combined per-m² cost: (27.60 + 38.50) / 7.125 = 9.278
-- Also fix coverage_rate from 3.56 to 7.125 (correct per-roll coverage)
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE costing_line_templates SET
  coverage_rate = 7.1250,
  formula_params = '{"coverage_rate": 7.125, "cost_per_coverage_unit": 9.278}'::jsonb
WHERE id = 'ef24b002-dfc5-4d7e-88e5-64e75fb1fd73';


-- ─────────────────────────────────────────────────────────────────────────────
-- MODERATE FIX 8: Aquaban minimum labour hours
-- Workbook enforces minimum of 2.7 hours (54m² × 0.05) regardless of area
-- Engine now supports minimum_labour_hours in formula_params
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE costing_line_templates SET
  formula_params = '{"coverage_rate": 25, "cost_per_coverage_unit": 0.500, "minimum_labour_hours": 2.7}'::jsonb
WHERE id = '04d4372c-d873-4ba7-bed8-34802d53e57e';


-- ─────────────────────────────────────────────────────────────────────────────
-- MODERATE FIX 9: Skimming walls labour — block-based rounding
-- Workbook: ROUNDUP(area/15, 0) × 4 hours per block
-- Engine now supports labour_block_size and labour_hours_per_block in formula_params
-- ─────────────────────────────────────────────────────────────────────────────

-- Damp skimming walls
UPDATE costing_line_templates SET
  formula_params = '{"coverage_rate": 10, "cost_per_coverage_unit": 1.208, "labour_block_size": 15, "labour_hours_per_block": 4}'::jsonb
WHERE id = '6eaecc7c-c0a0-46f9-8198-d14988abde87';

-- Timber skimming walls
UPDATE costing_line_templates SET
  formula_params = '{"labour_block_size": 15, "labour_hours_per_block": 4}'::jsonb
WHERE id = '06db19f2-1e94-4042-8749-959e7a24bc05';

-- Woodworm skimming walls
UPDATE costing_line_templates SET
  formula_params = '{"labour_block_size": 15, "labour_hours_per_block": 4}'::jsonb
WHERE id = '3ca4092d-a328-4c1d-8ffd-670a50a18974';


-- ─────────────────────────────────────────────────────────────────────────────
-- MINOR FIX 10: Remove duplicate legacy materials_catalog entries
-- Legacy entries have string IDs (not UUID format) and no product_key.
-- The pricing engine uses product_key from the UUID entries.
-- No application code references materials_catalog by string ID.
-- ─────────────────────────────────────────────────────────────────────────────

DELETE FROM materials_catalog
WHERE id NOT LIKE '________-____-____-____-____________'
  AND id != 'mursec_eco_unit';

-- Also clean up the mursec_eco_unit legacy entry (price already corrected above,
-- but it's a legacy string-ID entry — keep it since it's referenced by product name)
-- Actually, mursec_eco_unit doesn't have a UUID duplicate, so we keep it.
-- Let me check: do we have a UUID entry for Mursec?
-- Looking at seed data: only 'mursec_eco_unit' (string ID). No UUID version exists.
-- So we must keep this one.

COMMIT;
