-- Migration: Add site_preparation survey type with job-level sections and templates
-- Purpose: Deduplicate job-level items (skip hire, Antinox, bag & cart, disposal)
--          that were previously duplicated across every survey type on a job.
--          A single site_preparation costing section now holds these once-per-job items.
-- Phase: PHASE-3 of site preparation refactor

-- ============================================================================
-- STEP 1: Add 'site_preparation' to the survey_type ENUM
-- ============================================================================
ALTER TYPE survey_type ADD VALUE IF NOT EXISTS 'site_preparation';

-- Must commit the enum addition before it can be used in DML
-- (ADD VALUE cannot run inside a multi-statement transaction in some PG versions)
-- Using a DO block after the ALTER TYPE ensures it's available.

-- ============================================================================
-- STEP 2 & 3: Create sections and templates in a single DO block
-- ============================================================================
DO $$
DECLARE
  v_prep_section_id    uuid;
  v_strip_section_id   uuid;
  v_skip_section_id    uuid;
BEGIN
  -- -----------------------------------------------------------------------
  -- STEP 2: Create costing_sections for site_preparation
  -- -----------------------------------------------------------------------

  -- Section 1: Preparatory Work (floor protection boards, etc.)
  INSERT INTO costing_sections (id, survey_type, section_key, section_name, display_order, is_optional)
  VALUES (gen_random_uuid(), 'site_preparation', 'preparatory_work', 'Preparatory Work', 1, false)
  RETURNING id INTO v_prep_section_id;

  -- Section 2: Strip Out & Disposal (bagging debris, licensed disposal)
  INSERT INTO costing_sections (id, survey_type, section_key, section_name, display_order, is_optional)
  VALUES (gen_random_uuid(), 'site_preparation', 'strip_out_disposal', 'Strip Out & Disposal', 2, false)
  RETURNING id INTO v_strip_section_id;

  -- Section 3: Skip Hire
  INSERT INTO costing_sections (id, survey_type, section_key, section_name, display_order, is_optional)
  VALUES (gen_random_uuid(), 'site_preparation', 'skip_hire', 'Skip Hire', 3, false)
  RETURNING id INTO v_skip_section_id;

  -- -----------------------------------------------------------------------
  -- STEP 3: Create costing_line_templates under the new sections
  -- All pricing parameters copied from the DAMP versions (reference rates)
  -- -----------------------------------------------------------------------

  -- Template 1: Antinox floor protection boards
  -- Source: damp → preparatory_work → floor_protection_boards
  INSERT INTO costing_line_templates (
    id, section_id, line_key, description, uom,
    cost_formula, base_unit_cost, material_markup, wastage_factor,
    labour_rate_per_unit, labour_markup, formula_params,
    coverage_rate, product_url, display_order, is_active
  ) VALUES (
    gen_random_uuid(), v_prep_section_id, 'floor_protection_boards',
    'Antinox HD Floor Protection Boards 2.4m x 1.2m', 'each',
    'standard', 4.5760, 0.300, 1.100,
    0.0330, 1.000, NULL,
    NULL, NULL, 1, true
  );

  -- Template 2: Bag up debris & cart outside
  -- Source: damp → strip_out → bag_cart_debris
  INSERT INTO costing_line_templates (
    id, section_id, line_key, description, uom,
    cost_formula, base_unit_cost, material_markup, wastage_factor,
    labour_rate_per_unit, labour_markup, formula_params,
    coverage_rate, product_url, display_order, is_active
  ) VALUES (
    gen_random_uuid(), v_strip_section_id, 'bag_cart_debris',
    'Bag up debris & cart outside', 'bags',
    'bag_and_cart', 1.0000, 0.300, 1.100,
    0.0100, 1.000, '{"auto_from": "strip_out_areas", "multiplier": 2}'::jsonb,
    NULL, NULL, 1, true
  );

  -- Template 3: Disposal via licensed transfer agent
  -- Source: damp → strip_out → licensed_disposal
  INSERT INTO costing_line_templates (
    id, section_id, line_key, description, uom,
    cost_formula, base_unit_cost, material_markup, wastage_factor,
    labour_rate_per_unit, labour_markup, formula_params,
    coverage_rate, product_url, display_order, is_active
  ) VALUES (
    gen_random_uuid(), v_strip_section_id, 'licensed_disposal',
    'Disposal via licensed transfer agent', 'bags',
    'tiered_disposal', 0.0000, 0.300, 1.100,
    0.0000, 1.000, '{"threshold": 20, "min_charge": 40, "per_bag_over": 2}'::jsonb,
    NULL, NULL, 2, true
  );

  -- Template 4: Skip hire
  -- Source: damp → skip_hire → skip_hire
  INSERT INTO costing_line_templates (
    id, section_id, line_key, description, uom,
    cost_formula, base_unit_cost, material_markup, wastage_factor,
    labour_rate_per_unit, labour_markup, formula_params,
    coverage_rate, product_url, display_order, is_active
  ) VALUES (
    gen_random_uuid(), v_skip_section_id, 'skip_hire',
    'Rubbish removal skips', 'each',
    'skip_hire', 270.0000, 0.300, 1.100,
    0.0000, 1.000, NULL,
    NULL, NULL, 1, true
  );

  RAISE NOTICE 'site_preparation sections and templates created successfully';
  RAISE NOTICE 'Sections: preparatory_work (%), strip_out_disposal (%), skip_hire (%)',
    v_prep_section_id, v_strip_section_id, v_skip_section_id;
END $$;
