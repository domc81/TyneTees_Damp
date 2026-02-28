-- Migration: Fix compound_material formula_params key name mismatch
-- The pricing engine reads component.qty_per_coverage but seed data stored component.per_unit
-- This renames the key in all compound_material template components without changing any numeric values
--
-- Idempotent: the WHERE clause only matches rows that still have 'per_unit' in a component

UPDATE costing_line_templates
SET formula_params = jsonb_set(
  formula_params,
  '{components}',
  (
    SELECT jsonb_agg(
      CASE
        WHEN component ? 'per_unit' THEN
          (component - 'per_unit') || jsonb_build_object('qty_per_coverage', component->'per_unit')
        ELSE
          component
      END
    )
    FROM jsonb_array_elements(formula_params->'components') AS component
  )
)
WHERE cost_formula = 'compound_material'
  AND EXISTS (
    SELECT 1
    FROM jsonb_array_elements(formula_params->'components') AS comp
    WHERE comp ? 'per_unit'
  );
