-- Migration: Wire materials_catalog to all 37 ceiling_coverage templates
--
-- Currently each coverage-adjusted template has a hardcoded cost_per_coverage_unit
-- (CPCU) in formula_params. If a material price changes in the catalogue, the CPCU
-- doesn't update. This migration adds product_key references so the pricing engine
-- can derive CPCU dynamically: material.unit_cost / template.coverage_rate.
--
-- Three parts:
--   1. Fix 4 catalogue entries where unit_cost was per-meter/per-piece instead of
--      per-purchase-unit (membranes + plugs).
--   2. Add 4 new catalogue entries for timber treatment materials that were missing.
--   3. Add product_key to formula_params on all 37 ceiling_coverage templates.
--
-- The existing cost_per_coverage_unit values are kept as fallbacks — the engine
-- reads product_key first, falling back to cost_per_coverage_unit if the material
-- lookup fails.

-- =============================================================================
-- PART 1: Fix catalogue entries — convert per-meter/per-piece to per-purchase-unit
-- =============================================================================

-- CM3 Membrane 1m: was £4.17/meter, should be £20.83/roll (1m × 5m = 5m²)
UPDATE materials_catalog
SET unit_cost = 20.83,
    unit = 'Per roll',
    unit_size = 'Roll (1m × 5m)'
WHERE product_key = 'cm3_membrane_1m';

-- CM3 Membrane 1.2m: was £4.45/meter, should be £22.23/roll (1.2m × 5m)
UPDATE materials_catalog
SET unit_cost = 22.23,
    unit = 'Per roll',
    unit_size = 'Roll (1.2m × 5m)'
WHERE product_key = 'cm3_membrane_1_2m';

-- CM3 Membrane 2m: was £4.42/meter, should be £22.09/roll (2m × 5m)
UPDATE materials_catalog
SET unit_cost = 22.09,
    unit = 'Per roll',
    unit_size = 'Roll (2m × 5m)'
WHERE product_key = 'cm3_membrane_2m';

-- Membrane fixing plugs: was £0.09/plug, should be £1.87 per 2m² coverage
-- (approx 21 plugs per 2m² at £0.09 each ≈ £1.87)
UPDATE materials_catalog
SET unit_cost = 1.87,
    coverage_m2 = 2.00,
    coverage = '2 M2 per unit',
    unit = 'Per 2m²',
    unit_size = 'Per 2m² (~21 plugs)'
WHERE product_key = 'membrane_fixing_plugs_50mm';

-- =============================================================================
-- PART 2: Add missing catalogue entries for timber treatments
-- =============================================================================

INSERT INTO materials_catalog (id, name, supplier, supplier_url, unit_cost, unit, coverage, category, default_quantity, is_active, product_key, coverage_m2, unit_size)
VALUES
  (gen_random_uuid(), 'Wykamol Wyakbor 20 Masonry Sterilant', 'Preservation Shop', NULL, 35.00, 'Per container', '10 M2 per container', 'Timber Treatments', 0, true, 'masonry_sterilant_wyakbor20', 10.00, 'Per container'),
  (gen_random_uuid(), 'Protective Timber Treatment (DP/Bug)', NULL, NULL, 22.00, 'Per container', '25 M2 per container', 'Timber Treatments', 0, true, 'protective_timber_treatment', 25.00, 'Per container'),
  (gen_random_uuid(), '40:1 Gel Injection Cartridge', NULL, NULL, 2.22, 'Per cartridge', '4 M2 per cartridge', 'Timber Treatments', 0, true, 'gel_injection_401', 4.00, 'Per cartridge'),
  (gen_random_uuid(), 'Grip Grit (Timber)', NULL, NULL, 2.60, 'Bag', '25 M2 per bag', 'Floor Resin', 0, true, 'grip_grit_timber', 25.00, 'Bag')
ON CONFLICT (product_key) DO NOTHING;

-- =============================================================================
-- PART 3: Add product_key to all 37 ceiling_coverage templates
-- =============================================================================
-- Uses a CTE mapping (survey_type, section_key, line_key) → product_key.
-- The || operator merges into existing formula_params without removing other keys.

WITH mappings (survey_type, section_key, line_key, product_key) AS (
  VALUES
    -- DAMP (20 templates)
    ('damp'::text, 'aquaban', 'aquaban_system', 'enviroseal_water_repellent'),
    ('damp', 'cementitious_tanking', 'tankingslurry_2coat', 'hydradry_tanking_slurry'),
    ('damp', 'cementitious_tanking', 'renovating_plaster', 'renovating_plaster'),
    ('damp', 'cementitious_tanking', 'wall_floor_fillet_tanking', 'universal_mortar'),
    ('damp', 'floor_resin', 'resin_primer_ep40', 'ep40_primer'),
    ('damp', 'floor_resin', 'resin_topcoat_ep40', 'ep40_topcoat'),
    ('damp', 'floor_resin', 'wall_floor_fillet_resin', 'universal_mortar'),
    ('damp', 'floor_resin', 'grip_grit', 'grip_grit'),
    ('damp', 'plastering', 'warmline_iwi', 'isotherm_tiwi'),
    ('damp', 'plastering', 'warmline_iwi_adhesive', 'isotherm_adhesive'),
    ('damp', 'plastering', 'skimming_walls', 'multi_finish_plaster_25kg'),
    ('damp', 'spray_treatments', 'fog_subfloor_antifungal', 'microtech_concentrate'),
    ('damp', 'wall_membrane', 'wall_membrane_1m', 'cm3_membrane_1m'),
    ('damp', 'wall_membrane', 'wall_membrane_1_2m', 'cm3_membrane_1_2m'),
    ('damp', 'wall_membrane', 'wall_membrane_2m', 'cm3_membrane_2m'),
    ('damp', 'wall_membrane', 'membrane_plugs', 'membrane_fixing_plugs_50mm'),
    ('damp', 'wall_membrane', 'sealing_tape', 'membrane_sealing_tape'),
    ('damp', 'wall_membrane', 'wall_floor_fillet_joint', 'universal_mortar'),
    ('damp', 'wall_membrane', 'overtape', 'fibre_fleece_tape'),
    ('damp', 'wall_membrane', 'fixing_rope', 'rope_10mm'),
    -- TIMBER (16 templates)
    ('timber', 'floor_resin', 'ep40_2_pack_resin_primer', 'ep40_primer'),
    ('timber', 'floor_resin', 'ep40_2_pack_resin_top_coat', 'ep40_topcoat'),
    ('timber', 'floor_resin', 'grip_grit', 'grip_grit_timber'),
    ('timber', 'plastering', 'warmline_internal_wall_insulation', 'isotherm_tiwi'),
    ('timber', 'plastering', 'warmline_iwi_adhesive', 'isotherm_adhesive'),
    ('timber', 'plastering', 'skimming_walls_multi_finish_plaster', 'multi_finish_plaster_25kg'),
    ('timber', 'timber_treatments', 'masonry_sterilant_wyakbor_20_brush_applied', 'masonry_sterilant_wyakbor20'),
    ('timber', 'timber_treatments', 'protective_treatment_following_new_timbers_installation_dp_o', 'protective_timber_treatment'),
    ('timber', 'timber_treatments', '401_gel_injection_100mm_centres_plug_with_dowel', 'gel_injection_401'),
    ('timber', 'wall_membrane', 'wall_membrane_cm3_1mtr', 'cm3_membrane_1m'),
    ('timber', 'wall_membrane', 'wall_membrane_cm3_12mtr', 'cm3_membrane_1_2m'),
    ('timber', 'wall_membrane', 'wall_membrane_cm3_subtotals_for_above_3_lines', 'cm3_membrane_2m'),
    ('timber', 'wall_membrane', 'membrane_plugs_for_m2_listed', 'membrane_fixing_plugs_50mm'),
    ('timber', 'wall_membrane', 'sealing_tape_lm', 'membrane_sealing_tape'),
    ('timber', 'wall_membrane', 'overtape_lm', 'fibre_fleece_tape'),
    ('timber', 'wall_membrane', 'fixing_rope_lm', 'rope_10mm'),
    -- WOODWORM (1 template)
    ('woodworm', 'plastering', 'skimming_walls_multi_finish_plaster', 'multi_finish_plaster_25kg')
)
UPDATE costing_line_templates clt
SET formula_params = clt.formula_params || jsonb_build_object('product_key', m.product_key)
FROM mappings m
JOIN costing_sections cs ON cs.survey_type::text = m.survey_type AND cs.section_key = m.section_key
WHERE clt.section_id = cs.id AND clt.line_key = m.line_key;
