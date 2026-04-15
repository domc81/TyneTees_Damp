-- Remove misleading wastage_factor from labour-only costing line templates.
-- Templates with base_unit_cost = 0 are pure labour — wastage (a material
-- multiplier) has no meaning and confuses the admin UI.
-- This is a no-op for pricing: 1.10 × £0.00 = £0.00 = 1.0 × £0.00.

UPDATE costing_line_templates
SET    wastage_factor = 1.0
WHERE  base_unit_cost = 0
  AND  wastage_factor != 1.0;
