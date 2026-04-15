-- Migration: Fix compound_material formula_params product_key references
--
-- The seed data stored incorrect product_keys in the dubbing_out_coat template:
--   sbr_primer   → should be sbr_latex_5ltr
--   sharp_sand   → should be building_sand
--   cement       → should be cement_25kg
--
-- It also stored quantities as "per_unit" (coverage per material unit) rather than
-- "qty_per_coverage" (material units per coverage area). Migration 20260228000006
-- renamed the key but kept the old values. This migration sets the correct
-- qty_per_coverage values derived from the workbook recipe (per 2m² coverage_unit):
--   SBR Latex 5ltr:  0.5  (half a 5ltr tub)
--   Building Sand:   1.0  (one bag)
--   Cement 25kg:     0.375 (3/8 of a bag)
--
-- Resulting cost: (16.66×0.5 + 2.79×1.0 + 7.69×0.375) / 2m² × 1.10 wastage ≈ £7.70/m²
-- This matches the Damp workbook value.
--
-- Idempotent: only updates rows where the old product_keys still exist.

UPDATE costing_line_templates
SET formula_params = '{"components": [{"product_key": "sbr_latex_5ltr", "qty_per_coverage": 0.5}, {"product_key": "building_sand", "qty_per_coverage": 1.0}, {"product_key": "cement_25kg", "qty_per_coverage": 0.375}], "coverage_unit": 2}'::jsonb
WHERE cost_formula = 'compound_material'
  AND line_key = 'dubbing_out_coat'
  AND EXISTS (
    SELECT 1
    FROM jsonb_array_elements(formula_params->'components') AS comp
    WHERE comp->>'product_key' IN ('sbr_primer', 'sharp_sand', 'cement')
  );

-- Also fix any compound_material templates that had the per_unit rename but still
-- reference the wrong product_keys (catch-all for any we missed)
UPDATE costing_line_templates
SET formula_params = (
  SELECT jsonb_set(
    formula_params,
    '{components}',
    jsonb_agg(
      CASE
        WHEN comp->>'product_key' = 'sbr_primer'
          THEN jsonb_build_object('product_key', 'sbr_latex_5ltr', 'qty_per_coverage', 0.5)
        WHEN comp->>'product_key' = 'sharp_sand'
          THEN jsonb_build_object('product_key', 'building_sand', 'qty_per_coverage', 1.0)
        WHEN comp->>'product_key' = 'cement'
          THEN jsonb_build_object('product_key', 'cement_25kg', 'qty_per_coverage', 0.375)
        ELSE comp
      END
    )
  )
  FROM jsonb_array_elements(formula_params->'components') AS comp
)
WHERE cost_formula = 'compound_material'
  AND EXISTS (
    SELECT 1
    FROM jsonb_array_elements(formula_params->'components') AS c
    WHERE c->>'product_key' IN ('sbr_primer', 'sharp_sand', 'cement')
  );
