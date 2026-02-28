-- CRITICAL-3: Condensation joinery ducting — correct unit cost, labour rate, and formula type
--
-- Workbook formula: IF(qty=0, 0, IF(qty<2.4, (15×2.4)/qty, 15))
--   - Material: £15 per linear metre
--   - Labour:   0.5 hr per linear metre
--   - Minimum charge: 2.4m (handled in mapping layer via Math.max(quantity, 2.4))
--
-- The formula_type must be 'standard' (cost scales with quantity), not 'fixed_price'.
-- This migration is idempotent: only updates if values differ from the target.

UPDATE public.costing_line_templates
SET
    base_unit_cost         = 15.00,
    labour_rate_per_unit   = 0.50,
    cost_formula           = 'standard',
    wastage_factor         = 1.000
WHERE
    line_key = 'joinery_to_box_in_ducting_per_metre_min_charge_24_metres'
    AND section_id = (
        SELECT id
        FROM public.costing_sections
        WHERE survey_type = 'condensation'
          AND section_key = 'joinery_ducting'
    )
    AND (
        base_unit_cost       IS DISTINCT FROM 15.00
        OR labour_rate_per_unit IS DISTINCT FROM 0.50
        OR cost_formula        IS DISTINCT FROM 'standard'
        OR wastage_factor      IS DISTINCT FROM 1.000
    );
