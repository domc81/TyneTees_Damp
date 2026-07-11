-- Phase B: whole_pack formula conversions (timber R65-67/R105-107) +
-- PIV-loft default section adjustment (condensation master ships F25 = -5).
-- enum extension must commit before use (cannot run inside the transaction)
ALTER TYPE cost_formula_type ADD VALUE IF NOT EXISTS 'whole_pack';

BEGIN;
ALTER TABLE costing_sections ADD COLUMN IF NOT EXISTS default_adjustment_pct numeric(6,3) NOT NULL DEFAULT 0;
UPDATE costing_sections SET default_adjustment_pct = -5 WHERE survey_type = 'condensation' AND section_key = 'piv_loft';
-- timber grip_grit: workbook whole-pack 2.6 per 25
UPDATE costing_line_templates SET cost_formula = 'whole_pack', wastage_factor = 1.0, labour_rate_per_unit = 0.01, coverage_rate = 25, formula_params = coalesce(formula_params,'{}'::jsonb) || '{"pack_size": 25, "pack_cost": 2.6}'::jsonb WHERE id = '289a1868-e8a6-4049-b2a4-a84080b5a9a1';
-- timber ep40_2_pack_resin_top_coat: workbook whole-pack 70.07 per 30
UPDATE costing_line_templates SET cost_formula = 'whole_pack', wastage_factor = 1.0, labour_rate_per_unit = 0.04, coverage_rate = 30, formula_params = coalesce(formula_params,'{}'::jsonb) || '{"pack_size": 30, "pack_cost": 70.07}'::jsonb WHERE id = '36c77cfa-1d9d-4404-87a2-5c79cda5d7b3';
-- timber 401_gel_injection_100mm_centres_plug_with_dowel: workbook whole-pack 2.22 per 4
UPDATE costing_line_templates SET cost_formula = 'whole_pack', wastage_factor = 1.0, labour_rate_per_unit = 0.25, coverage_rate = 4, formula_params = coalesce(formula_params,'{}'::jsonb) || '{"pack_size": 4, "pack_cost": 2.22}'::jsonb WHERE id = '4daabc0c-fecf-4825-bacb-6e7879e1085a';
-- timber ep40_2_pack_resin_primer: workbook whole-pack 62.37 per 30
UPDATE costing_line_templates SET cost_formula = 'whole_pack', wastage_factor = 1.0, labour_rate_per_unit = 0.04, coverage_rate = 30, formula_params = coalesce(formula_params,'{}'::jsonb) || '{"pack_size": 30, "pack_cost": 62.37}'::jsonb WHERE id = '6e33feb4-c2de-4fc7-8435-487df0b39be9';
-- timber masonry_sterilant_wyakbor_20_brush_applied: workbook whole-pack 35.0 per 10
UPDATE costing_line_templates SET cost_formula = 'whole_pack', wastage_factor = 1.0, labour_rate_per_unit = 0.05, coverage_rate = 10, formula_params = coalesce(formula_params,'{}'::jsonb) || '{"pack_size": 10, "pack_cost": 35.0}'::jsonb WHERE id = 'c3b34b00-e870-4541-a6cc-205962b5c60d';
-- timber protective_treatment_following_new_timbers_installation_dp_o: workbook whole-pack 22.0 per 25
UPDATE costing_line_templates SET cost_formula = 'whole_pack', wastage_factor = 1.0, labour_rate_per_unit = 0.02, coverage_rate = 25, formula_params = coalesce(formula_params,'{}'::jsonb) || '{"pack_size": 25, "pack_cost": 22.0}'::jsonb WHERE id = 'cf17de47-dc7b-42d7-b416-ad28e3d42cc4';
COMMIT;
