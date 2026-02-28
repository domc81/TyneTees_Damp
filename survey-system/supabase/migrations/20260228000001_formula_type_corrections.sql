-- =============================================================================
-- Formula Type Corrections — Timber/Woodworm ceiling_coverage alignment
--
-- Problem: Multiple Timber/Woodworm line items use 'standard' formula with
-- per-tub/per-bag costs, but their Damp equivalents correctly use
-- 'ceiling_coverage' which rounds up to whole purchase units.
-- Additionally, several existing ceiling_coverage items in Timber/Woodworm
-- are missing coverage_rate and cost_per_coverage_unit, producing £0 costs.
--
-- Reference: Damp workbook uses ROUNDUP(qty/coverage, 0) for these items.
-- Timber workbook confirms same ROUNDUP pattern for EP40, Grip Grit.
-- =============================================================================

BEGIN;

-- ─────────────────────────────────────────────────────────────────────────────
-- GROUP A: Change standard → ceiling_coverage (Timber floor_resin section)
-- These items have per-container costs that need ROUNDUP to whole units
-- ─────────────────────────────────────────────────────────────────────────────

-- EP40 2 Pack Resin Primer (Timber)
-- Was: standard @ £62.37/m² (per-tub cost × area = massively overpriced)
-- Fix: ceiling_coverage, £56.70 per 5L tub / 30m² = £1.890/m²
-- Matches Damp: coverage=30, cost_per_coverage_unit=1.890
UPDATE costing_line_templates SET
  cost_formula = 'ceiling_coverage',
  base_unit_cost = 0,
  coverage_rate = 30.0000,
  formula_params = '{"coverage_rate": 30, "cost_per_coverage_unit": 1.890}'::jsonb
WHERE id = '6e33feb4-c2de-4fc7-8435-487df0b39be9';

-- EP40 2 Pack Resin Top Coat (Timber)
-- Was: standard @ £70.07/m² (per-tub cost × area = massively overpriced)
-- Fix: ceiling_coverage, £63.70 per 5L tub / 30m² = £2.123/m²
-- Matches Damp: coverage=30, cost_per_coverage_unit=2.123
UPDATE costing_line_templates SET
  cost_formula = 'ceiling_coverage',
  base_unit_cost = 0,
  coverage_rate = 30.0000,
  formula_params = '{"coverage_rate": 30, "cost_per_coverage_unit": 2.123}'::jsonb
WHERE id = '36c77cfa-1d9d-4404-87a2-5c79cda5d7b3';

-- Grip Grit (Timber)
-- Was: standard @ £2.60/m² (per-bag cost × area)
-- Fix: ceiling_coverage, £2.08 per bag / 25m² = £0.083/m²
-- Matches Damp: coverage=25, cost_per_coverage_unit=0.083
UPDATE costing_line_templates SET
  cost_formula = 'ceiling_coverage',
  base_unit_cost = 0,
  coverage_rate = 25.0000,
  formula_params = '{"coverage_rate": 25, "cost_per_coverage_unit": 0.083}'::jsonb
WHERE id = '289a1868-e8a6-4049-b2a4-a84080b5a9a1';


-- ─────────────────────────────────────────────────────────────────────────────
-- GROUP B: Change standard → ceiling_coverage (Timber cementitious_tanking)
-- Same materials as Damp — sold in discrete bags, need whole-unit rounding
-- ─────────────────────────────────────────────────────────────────────────────

-- 2 Coat Tanking Slurry (Timber)
-- Was: standard @ £3.78/m² (pre-computed per-m² rate, no rounding to bags)
-- Fix: ceiling_coverage, £21.70 per 20kg bag / 7m² = £3.100/m²
-- Matches Damp: coverage=7, cost_per_coverage_unit=3.100
UPDATE costing_line_templates SET
  cost_formula = 'ceiling_coverage',
  base_unit_cost = 0,
  coverage_rate = 7.0000,
  formula_params = '{"coverage_rate": 7, "cost_per_coverage_unit": 3.100}'::jsonb
WHERE id = '53bb82fb-4102-490d-b1d0-460942a9c6fa';

-- Renovating Plaster (Timber)
-- Was: standard @ £5.96/m² (= £16.25/3m² × 1.1 wastage baked in)
-- Fix: ceiling_coverage, £16.25 per 20kg bag / 3m² = £5.417/m²
-- Matches Damp: coverage=3, cost_per_coverage_unit=5.417
UPDATE costing_line_templates SET
  cost_formula = 'ceiling_coverage',
  base_unit_cost = 0,
  coverage_rate = 3.0000,
  formula_params = '{"coverage_rate": 3, "cost_per_coverage_unit": 5.417}'::jsonb
WHERE id = '34cf4e30-cb96-49ba-9858-962ab61dac36';

-- Wall/Floor Fillet Joint (Timber)
-- Was: standard @ £2.00/LM
-- Fix: ceiling_coverage to match Damp approach with whole-unit rounding
-- Matches Damp: coverage=12, cost_per_coverage_unit=2.043
UPDATE costing_line_templates SET
  cost_formula = 'ceiling_coverage',
  base_unit_cost = 0,
  coverage_rate = 12.0000,
  formula_params = '{"coverage_rate": 12, "cost_per_coverage_unit": 2.043}'::jsonb
WHERE id = '21f595dd-3b59-4279-8628-ca6fa0d6a127';


-- ─────────────────────────────────────────────────────────────────────────────
-- GROUP C: Fix existing ceiling_coverage items missing coverage_rate/params
-- These items are already ceiling_coverage but would produce £0 material costs
-- ─────────────────────────────────────────────────────────────────────────────

-- Skimming Walls (Timber) — has labour params but missing material params
-- Matches Damp: coverage=10, cost_per_coverage_unit=1.208 (= £12.08/10m² bag)
UPDATE costing_line_templates SET
  coverage_rate = 10.0000,
  formula_params = '{"coverage_rate": 10, "cost_per_coverage_unit": 1.208, "labour_block_size": 15, "labour_hours_per_block": 4}'::jsonb
WHERE id = '06db19f2-1e94-4042-8749-959e7a24bc05';

-- Skimming Walls (Woodworm) — same fix as Timber
UPDATE costing_line_templates SET
  coverage_rate = 10.0000,
  formula_params = '{"coverage_rate": 10, "cost_per_coverage_unit": 1.208, "labour_block_size": 15, "labour_hours_per_block": 4}'::jsonb
WHERE id = '3ca4092d-a328-4c1d-8ffd-670a50a18974';

-- Warmline Internal Wall Insulation (Timber)
-- Matches Damp: coverage=7.125, cost_per_coverage_unit=9.278 (TIWI roll + adhesive)
UPDATE costing_line_templates SET
  coverage_rate = 7.1250,
  formula_params = '{"coverage_rate": 7.125, "cost_per_coverage_unit": 9.278}'::jsonb
WHERE id = 'e5139456-4ace-4bdd-9f0c-7a5bfa2567b6';


-- ─────────────────────────────────────────────────────────────────────────────
-- GROUP D: Fix Timber wall_membrane items missing coverage_rate/params
-- Matching values from Damp wall_membrane equivalents
-- ─────────────────────────────────────────────────────────────────────────────

-- Wall membrane CM3 - 1mtr (Timber)
-- Matches Damp wall_membrane_1m: coverage=5, cost=4.166
UPDATE costing_line_templates SET
  coverage_rate = 5.0000,
  formula_params = '{"coverage_rate": 5, "cost_per_coverage_unit": 4.166}'::jsonb
WHERE id = '7a054fc2-3f97-4761-82e9-f2861e3c48cd';

-- Wall membrane CM3 - 1.2mtr (Timber)
-- Matches Damp wall_membrane_1_2m: coverage=5, cost=4.445
UPDATE costing_line_templates SET
  coverage_rate = 5.0000,
  formula_params = '{"coverage_rate": 5, "cost_per_coverage_unit": 4.445}'::jsonb
WHERE id = 'eb04b37d-d5b4-4380-b61e-58f1f458adcf';

-- Wall membrane CM3 - Subtotals (Timber)
-- Matches Damp wall_membrane_2m: coverage=5, cost=4.417
UPDATE costing_line_templates SET
  coverage_rate = 5.0000,
  formula_params = '{"coverage_rate": 5, "cost_per_coverage_unit": 4.417}'::jsonb
WHERE id = '4f5a6d2f-f8d8-42de-af09-89512944f653';

-- Membrane plugs (Timber)
-- Matches Damp membrane_plugs: coverage=2, cost=0.933
UPDATE costing_line_templates SET
  coverage_rate = 2.0000,
  formula_params = '{"coverage_rate": 2, "cost_per_coverage_unit": 0.933}'::jsonb
WHERE id = 'c63b32ac-5fea-4e17-a22d-e278f276b1d0';

-- Sealing Tape (Timber)
-- Matches Damp sealing_tape: coverage=22, cost=0.871
UPDATE costing_line_templates SET
  coverage_rate = 22.0000,
  formula_params = '{"coverage_rate": 22, "cost_per_coverage_unit": 0.871}'::jsonb
WHERE id = 'affa7052-c2c9-458c-b433-aadf37e9a3f1';

-- Overtape (Timber)
-- Matches Damp overtape: coverage=5, cost=2.166
UPDATE costing_line_templates SET
  coverage_rate = 5.0000,
  formula_params = '{"coverage_rate": 5, "cost_per_coverage_unit": 2.166}'::jsonb
WHERE id = 'b284705b-9c47-4413-9208-ae5dc065a0ef';

-- Fixing Rope (Timber)
-- Matches Damp fixing_rope: coverage=5, cost=2.066
UPDATE costing_line_templates SET
  coverage_rate = 5.0000,
  formula_params = '{"coverage_rate": 5, "cost_per_coverage_unit": 2.066}'::jsonb
WHERE id = '455fb129-4cb9-4482-af29-37b319fc3968';


-- ─────────────────────────────────────────────────────────────────────────────
-- NOTE: Dubbing Out Coat (Timber, id=6c5aa1a3-8ad6-4632-987b-a050a1b945bd)
-- Damp equivalent uses 'compound_material' (SBR + sand + cement mix), NOT
-- ceiling_coverage. Timber currently uses 'standard' at £7.70/m².
-- This is a different formula type mismatch — not addressed in this migration.
-- ─────────────────────────────────────────────────────────────────────────────

COMMIT;
