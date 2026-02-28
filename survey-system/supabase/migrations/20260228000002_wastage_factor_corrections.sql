-- =============================================================================
-- Wastage Factor Corrections — Timber & Woodworm templates
--
-- Problem: The seed data applied wastage_factor=1.100 (10% wastage) to ALL
-- templates as a blanket default. But base_unit_cost already stores the
-- workbook's H8 value, which ALREADY includes ×1.1 for items that have
-- wastage (Antinox, Dubbing Coat, Stop Beads, Angle Beads, etc.).
-- Applying wastage_factor=1.100 on top double-counts the 10%.
-- Items without ×1.1 in H8 also shouldn't have wastage applied.
--
-- For ceiling_coverage items: cost_per_coverage_unit stores the RAW tub/bag
-- cost (before ×1.1), so wastage_factor=1.100 correctly provides the ×1.1
-- multiplier. These items keep their existing wastage_factor.
--
-- Fix: Set wastage_factor=1.000 for ALL non-ceiling_coverage Timber/Woodworm
-- templates (standard, bag_and_cart, tiered_disposal, skip_hire).
-- The 4 ceiling_coverage items already at 1.000 (masonry sterilant,
-- protective treatment, gel injection, grip grit) stay at 1.000 because
-- their workbook formulas don't apply ×1.1.
--
-- Also fixes:
--   Grip Grit (Timber) — cost_per_coverage_unit 0.083→0.104, add labour=0.01
--
-- Reference: Timber workbook Costing R21-R120, Woodworm workbook Costing R21-R91
-- =============================================================================

BEGIN;

-- ─────────────────────────────────────────────────────────────────────────────
-- Bulk fix: ALL non-ceiling_coverage Timber/Woodworm items → wastage 1.000
-- This covers ~94 standard, bag_and_cart, tiered_disposal, skip_hire items.
-- These formulas either don't use wastage_factor (bag_and_cart, skip_hire)
-- or have base_unit_cost already set to the workbook's H8 value which
-- includes ×1.1 where applicable (standard items).
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE costing_line_templates clt
SET wastage_factor = 1.000
FROM costing_sections cs
WHERE clt.section_id = cs.id
AND cs.survey_type IN ('timber', 'woodworm')
AND clt.cost_formula != 'ceiling_coverage'
AND clt.wastage_factor != 1.000;


-- ─────────────────────────────────────────────────────────────────────────────
-- Grip Grit (Timber) — fix cost and add labour
-- Workbook H8=2.60 per bag, coverage=25m², per-m² = 2.60/25 = 0.104
-- Previous migration had cost_per_coverage_unit=0.083 (wrong: used £2.08/bag)
-- Also needs labour_rate_per_unit=0.01 (workbook I8=0.01)
-- ─────────────────────────────────────────────────────────────────────────────

UPDATE costing_line_templates SET
  wastage_factor = 1.000,
  labour_rate_per_unit = 0.0100,
  formula_params = '{"coverage_rate": 25, "cost_per_coverage_unit": 0.104}'::jsonb
WHERE id = '289a1868-e8a6-4049-b2a4-a84080b5a9a1';


-- ─────────────────────────────────────────────────────────────────────────────
-- ITEMS NOT TOUCHED (ceiling_coverage with wastage_factor=1.100):
-- These use cost_per_coverage_unit = RAW tub/bag cost (pre-×1.1).
-- wastage_factor=1.100 correctly provides the ×1.1 multiplier.
--
-- Timber (14 items):
--   Wall membrane CM3 1m, 1.2m, Subtotals
--   Membrane plugs, Sealing Tape, Overtape, Fixing Rope
--   Dubbing coat tanking slurry, Renovating plaster, Wall/floor fillet
--   EP40 Primer, EP40 Top Coat
--   Warmline IWI, Skimming walls
--
-- Woodworm (1 item):
--   Skimming walls
--
-- ITEMS ALREADY at 1.000 (ceiling_coverage without ×1.1 in workbook):
--   Masonry sterilant, Protective treatment, Gel injection, Grip Grit
-- ─────────────────────────────────────────────────────────────────────────────

COMMIT;
