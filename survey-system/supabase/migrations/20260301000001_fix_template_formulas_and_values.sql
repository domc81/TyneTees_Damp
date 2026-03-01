-- Migration: Fix template data issues [CRITICAL-C, MAJOR-1 through MAJOR-4]
-- Fixes 5 costing_line_templates issues identified in costings audit

BEGIN;

-- FIX 1 — CRITICAL-C: digital_dpc formula type does not exist in pricing engine
-- Change to 'standard' (it's a flat £650 unit, no special formula needed)
-- Keep material_markup at 15.4% (already correct), set wastage to 1.0 (no wastage on digital DPC)
UPDATE costing_line_templates
SET cost_formula = 'standard',
    wastage_factor = 1.0,
    formula_params = '{}'::jsonb
WHERE line_key = 'dpc_installation_digital'
  AND section_id IN (SELECT id FROM costing_sections WHERE survey_type = 'damp');

-- FIX 2 — MAJOR-1: warmline IWI labour rate should be 0.333 hrs/m² (not 0.400)
-- Workbook formula: area / 3 = labour hours → 0.333 hrs per m²
-- Also add minimum_labour_hours of 2.5 (workbook enforces MIN(hours, 2.5))

-- 2a: damp version
UPDATE costing_line_templates
SET labour_rate_per_unit = 0.333,
    formula_params = formula_params || '{"minimum_labour_hours": 2.5}'::jsonb
WHERE line_key = 'warmline_iwi'
  AND section_id IN (SELECT id FROM costing_sections WHERE survey_type = 'damp');

-- 2b: timber version (different line_key due to earlier migration split)
UPDATE costing_line_templates
SET labour_rate_per_unit = 0.333,
    formula_params = formula_params || '{"minimum_labour_hours": 2.5}'::jsonb
WHERE line_key = 'warmline_internal_wall_insulation'
  AND section_id IN (SELECT id FROM costing_sections WHERE survey_type = 'timber');

-- FIX 3 — MAJOR-2: timber 2-coat tanking slurry should be 'standard' with unit cost £3.78/m²
-- Timber workbook uses simple area × rate, not ceiling_coverage rounding
UPDATE costing_line_templates
SET cost_formula = 'standard',
    base_unit_cost = 3.78,
    wastage_factor = 1.0,
    formula_params = '{}'::jsonb
WHERE line_key = '2_coat_tanking_slurry'
  AND section_id IN (SELECT id FROM costing_sections WHERE survey_type = 'timber');

-- FIX 4 — MAJOR-3: timber wall/floor fillet joint should be 'standard' with unit cost £2.00/m
-- Timber workbook uses simple length × rate, not ceiling_coverage rounding
UPDATE costing_line_templates
SET cost_formula = 'standard',
    base_unit_cost = 2.00,
    wastage_factor = 1.10,
    formula_params = '{}'::jsonb
WHERE line_key = 'wallfloor_fillet_joint'
  AND section_id IN (SELECT id FROM costing_sections WHERE survey_type = 'timber');

-- FIX 5 — MAJOR-4: timber renovating plaster should be 'standard' with unit cost £5.958/m²
-- Timber workbook uses simple area × rate, not ceiling_coverage rounding
UPDATE costing_line_templates
SET cost_formula = 'standard',
    base_unit_cost = 5.958,
    wastage_factor = 1.0,
    formula_params = '{}'::jsonb
WHERE line_key = 'renovating_plaster'
  AND section_id IN (SELECT id FROM costing_sections WHERE survey_type = 'timber');

COMMIT;
