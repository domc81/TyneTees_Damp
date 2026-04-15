-- Migration: Move remaining hardcoded pricing constants into formula_params
--
-- The pricing engine previously hardcoded several constants that should be
-- database-configurable. This migration adds them to formula_params so the
-- client can adjust them without code changes.
--
-- DPC Injection: labour_hours_per_depth was the only missing constant
-- (base_cream_cost, cream_divisor, holes_per_meter, drill_cost already present)
--
-- Bag & Cart: hours_per_bag and material_cost_per_bag were both hardcoded
-- in the engine with no formula_params lookup
--
-- Tiered Disposal: already fully parameterised — no changes needed
--
-- Idempotent: uses jsonb concatenation which overwrites existing keys

-- 1. DPC Injection — add labour_hours_per_depth (0.35 hours per half-brick depth)
UPDATE costing_line_templates
SET formula_params = formula_params || '{"labour_hours_per_depth": 0.35}'::jsonb
WHERE cost_formula = 'dpc_injection';

-- 2. Bag & Cart — add hours_per_bag (0.01 = ~36 sec) and material_cost_per_bag (£1)
UPDATE costing_line_templates
SET formula_params = formula_params || '{"hours_per_bag": 0.01, "material_cost_per_bag": 1.00}'::jsonb
WHERE cost_formula = 'bag_and_cart';
