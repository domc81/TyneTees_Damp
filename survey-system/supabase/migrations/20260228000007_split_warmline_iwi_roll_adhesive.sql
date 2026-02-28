-- =============================================================================
-- Migration: Split Warmline IWI into TIWI Roll + Adhesive
-- Fixes MODERATE-1 from costings audit.
--
-- Background:
--   Warmline IWI uses TWO materials with different coverage rates that each
--   need independent CEILING rounding:
--     - TIWI roll: £27.60/roll, 3.5625 m²/roll → £7.748/m²
--     - Adhesive:  £38.50/can,  7.125  m²/can  → £5.404/m²
--
--   The original single template used the adhesive coverage rate (7.125) and
--   a blended cost_per_coverage_unit (9.278) which produced neither correct
--   value independently.
--
-- Changes:
--   1. UPDATE existing warmline_iwi (damp) → TIWI Roll values
--   2. UPDATE existing warmline_internal_wall_insulation (timber) → TIWI Roll values
--   3. INSERT warmline_iwi_adhesive for damp plastering section (idempotent)
--   4. INSERT warmline_iwi_adhesive for timber plastering section (idempotent)
--
-- The roll template keeps its line_key so existing survey-mapping.ts lookups
-- continue to work without changes to the roll emission logic.
-- =============================================================================

-- ─── 1. Update damp warmline_iwi → TIWI Roll ────────────────────────────────

UPDATE costing_line_templates
SET
  description          = 'Warmline IWI - TIWI Roll',
  base_unit_cost       = 0,
  coverage_rate        = 3.5625,
  labour_rate_per_unit = 0.40,
  formula_params       = '{"coverage_rate": 3.5625, "cost_per_coverage_unit": 7.748}'::jsonb
WHERE id = 'ef24b002-dfc5-4d7e-88e5-64e75fb1fd73';

-- ─── 2. Update timber warmline_internal_wall_insulation → TIWI Roll ──────────

UPDATE costing_line_templates
SET
  description          = 'Warmline IWI - TIWI Roll',
  base_unit_cost       = 0,
  coverage_rate        = 3.5625,
  labour_rate_per_unit = 0.40,
  formula_params       = '{"coverage_rate": 3.5625, "cost_per_coverage_unit": 7.748}'::jsonb
WHERE id = 'e5139456-4ace-4bdd-9f0c-7a5bfa2567b6';

-- ─── 3. Insert warmline_iwi_adhesive for damp (idempotent) ──────────────────

DO $$
DECLARE
  v_section_id uuid := '1ff6f8e8-0f4a-403c-aee8-83d64e062e68'; -- damp > plastering
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM   costing_line_templates
    WHERE  section_id = v_section_id
    AND    line_key   = 'warmline_iwi_adhesive'
  ) THEN
    INSERT INTO costing_line_templates (
      section_id,
      line_key,
      description,
      uom,
      cost_formula,
      base_unit_cost,
      coverage_rate,
      labour_rate_per_unit,
      wastage_factor,
      material_markup,
      labour_markup,
      display_order,
      formula_params,
      is_active
    ) VALUES (
      v_section_id,
      'warmline_iwi_adhesive',
      'Warmline IWI - Adhesive',
      'm2',
      'ceiling_coverage',
      0,
      7.125,
      0,
      1.10,
      0.300,
      1.000,
      38,  -- immediately after the roll at display_order 37
      '{"coverage_rate": 7.125, "cost_per_coverage_unit": 5.404}'::jsonb,
      true
    );
  END IF;
END $$;

-- ─── 4. Insert warmline_iwi_adhesive for timber (idempotent) ─────────────────

DO $$
DECLARE
  v_section_id uuid := '7824037e-72a6-406d-9e0b-6a4a587091dd'; -- timber > plastering
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM   costing_line_templates
    WHERE  section_id = v_section_id
    AND    line_key   = 'warmline_iwi_adhesive'
  ) THEN
    INSERT INTO costing_line_templates (
      section_id,
      line_key,
      description,
      uom,
      cost_formula,
      base_unit_cost,
      coverage_rate,
      labour_rate_per_unit,
      wastage_factor,
      material_markup,
      labour_markup,
      display_order,
      formula_params,
      is_active
    ) VALUES (
      v_section_id,
      'warmline_iwi_adhesive',
      'Warmline IWI - Adhesive',
      'm2',
      'ceiling_coverage',
      0,
      7.125,
      0,
      1.10,
      0.300,
      1.000,
      38,  -- immediately after the roll at display_order 37
      '{"coverage_rate": 7.125, "cost_per_coverage_unit": 5.404}'::jsonb,
      true
    );
  END IF;
END $$;
