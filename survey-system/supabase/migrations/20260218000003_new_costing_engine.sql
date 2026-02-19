-- Migration: New costing engine tables
-- Date: 2026-02-18
-- Reason: Existing pricing tables don't capture formula logic. New tables add
--         cost_formula type and formula_params for server-side calculation.
-- Depends on: 20260218000002_survey_type_extensions.sql
-- Rollback: DROP all tables created here (old pricing tables still intact)
-- Note: Old tables (pricing_items, work_sections, base_rates, markup_config,
--        project_costing) are NOT dropped. They remain for backward compatibility
--        until frontend is fully migrated.

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE cost_formula_type AS ENUM (
  'standard',
  'ceiling_coverage',
  'tiered_disposal',
  'dpc_injection',
  'digital_dpc',
  'bag_and_cart',
  'ancillary_refit',
  'compound_material',
  'fixed_price',
  'per_room_fixed',
  'skip_hire'
);

CREATE TYPE uom_type AS ENUM (
  'm2', 'lm', 'each', 'hours', 'bags', 'pairs'
);

-- ============================================================
-- COSTING SECTIONS (replaces work_sections)
-- ============================================================

CREATE TABLE costing_sections (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_type     survey_type NOT NULL,
  section_key     TEXT NOT NULL,
  section_name    TEXT NOT NULL,
  display_order   INTEGER NOT NULL,
  is_optional     BOOLEAN DEFAULT false,

  UNIQUE(survey_type, section_key)
);

-- ============================================================
-- COSTING LINE TEMPLATES (replaces pricing_items)
-- ============================================================

CREATE TABLE costing_line_templates (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id      UUID NOT NULL REFERENCES costing_sections(id) ON DELETE CASCADE,
  line_key        TEXT NOT NULL,
  description     TEXT NOT NULL,
  uom             uom_type NOT NULL,

  -- Material pricing
  base_unit_cost  DECIMAL(10,4) DEFAULT 0,
  wastage_factor  DECIMAL(5,3) DEFAULT 1.1,
  coverage_rate   DECIMAL(10,4),
  material_markup DECIMAL(5,3) DEFAULT 0.3,

  -- Labour pricing
  labour_rate_per_unit DECIMAL(10,4) DEFAULT 0,
  labour_markup   DECIMAL(5,3) DEFAULT 1.0,

  -- Formula engine
  cost_formula    cost_formula_type NOT NULL DEFAULT 'standard',
  formula_params  JSONB DEFAULT '{}',

  -- Metadata
  product_url     TEXT,
  display_order   INTEGER NOT NULL,
  is_active       BOOLEAN DEFAULT true,

  UNIQUE(section_id, line_key)
);

-- ============================================================
-- COSTING SECTION ADJUSTMENTS (per-section price %)
-- ============================================================

CREATE TABLE costing_section_adjustments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id       UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  section_id      UUID NOT NULL REFERENCES costing_sections(id),
  adjustment_pct  DECIMAL(5,2) DEFAULT 0 CHECK (adjustment_pct BETWEEN -5 AND 50),

  UNIQUE(survey_id, section_id)
);

-- ============================================================
-- SURVEY COSTING LINES (replaces project_costing)
-- ============================================================

CREATE TABLE survey_costing_lines (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id       UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  template_id     UUID NOT NULL REFERENCES costing_line_templates(id),

  -- Surveyor inputs
  input_quantity  DECIMAL(10,2),
  input_dimension DECIMAL(10,2),

  -- Server-computed values (stored for audit)
  calculated_area         DECIMAL(10,2),
  material_unit_cost      DECIMAL(10,4),
  material_adjusted_cost  DECIMAL(10,4),
  material_total          DECIMAL(10,2),
  labour_hours            DECIMAL(10,2),
  labour_total            DECIMAL(10,2),
  line_total              DECIMAL(10,2),
  contractor_mat_cost     DECIMAL(10,2),
  contractor_lab_cost     DECIMAL(10,2),

  -- Override flags
  material_markup_override DECIMAL(5,3),
  labour_markup_override   DECIMAL(5,3),

  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now(),

  UNIQUE(survey_id, template_id)
);

-- ============================================================
-- PRICING CONFIG (replaces base_rates)
-- ============================================================

CREATE TABLE pricing_config (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config_key      TEXT UNIQUE NOT NULL,
  config_value    DECIMAL(10,4) NOT NULL,
  description     TEXT,
  effective_from  DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_costing_sections_type ON costing_sections(survey_type);
CREATE INDEX idx_costing_templates_section ON costing_line_templates(section_id);
CREATE INDEX idx_costing_lines_survey ON survey_costing_lines(survey_id);
CREATE INDEX idx_costing_lines_template ON survey_costing_lines(template_id);
CREATE INDEX idx_section_adjustments_survey ON costing_section_adjustments(survey_id);

-- ============================================================
-- RLS POLICIES
-- ============================================================

ALTER TABLE costing_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE costing_line_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE costing_section_adjustments ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_costing_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_config ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'costing_sections', 'costing_line_templates',
    'costing_section_adjustments', 'survey_costing_lines',
    'pricing_config'
  ])
  LOOP
    EXECUTE format('CREATE POLICY "Authenticated read %s" ON %I FOR SELECT TO authenticated USING (true)', tbl, tbl);
    EXECUTE format('CREATE POLICY "Authenticated insert %s" ON %I FOR INSERT TO authenticated WITH CHECK (true)', tbl, tbl);
    EXECUTE format('CREATE POLICY "Authenticated update %s" ON %I FOR UPDATE TO authenticated USING (true) WITH CHECK (true)', tbl, tbl);
    EXECUTE format('CREATE POLICY "Authenticated delete %s" ON %I FOR DELETE TO authenticated USING (true)', tbl, tbl);
    EXECUTE format('CREATE POLICY "Service role %s" ON %I FOR ALL TO service_role USING (true) WITH CHECK (true)', tbl, tbl);
  END LOOP;
END $$;