-- Migration: Survey output tables (summary, overheads, CAF1, subcontractor)
-- Date: 2026-02-18
-- Reason: These tables represent the output pipeline: survey → costing →
--         customer summary → CAF1 acceptance → CF CSV export
-- Depends on: 20260218000003_new_costing_engine.sql
-- Rollback: DROP all tables created here in reverse order

-- ============================================================
-- CUSTOMER SUMMARY (aggregated section totals for quotes)
-- ============================================================

CREATE TABLE survey_customer_summary (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id       UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  section_key     TEXT NOT NULL,
  section_name    TEXT NOT NULL,
  material_total  DECIMAL(10,2) DEFAULT 0,
  labour_total    DECIMAL(10,2) DEFAULT 0,
  section_total   DECIMAL(10,2) DEFAULT 0,
  is_optional     BOOLEAN DEFAULT false,
  display_order   INTEGER DEFAULT 0,

  UNIQUE(survey_id, section_key)
);

-- ============================================================
-- PROJECT OVERHEADS (travel, scaffolding, skip, access)
-- ============================================================

CREATE TABLE survey_overheads (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id       UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  overhead_type   TEXT NOT NULL,
  description     TEXT,
  quantity        DECIMAL(6,1) DEFAULT 1,
  unit_cost       DECIMAL(10,2) DEFAULT 0,
  total_cost      DECIMAL(10,2) DEFAULT 0,
  display_order   INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- CAF1 ON-SITE ACCEPTANCE FORM
-- ============================================================

CREATE TABLE survey_caf1 (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id       UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  subtotal_ex_vat DECIMAL(10,2),
  vat_amount      DECIMAL(10,2),
  total_inc_vat   DECIMAL(10,2),
  deposit_pct     DECIMAL(5,2),
  deposit_ex_vat  DECIMAL(10,2),
  deposit_inc_vat DECIMAL(10,2),
  payment_method  TEXT,
  signed          BOOLEAN DEFAULT false,
  signed_at       TIMESTAMPTZ,
  signatory_name  TEXT,
  waive_cooling_off BOOLEAN DEFAULT false,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now(),

  UNIQUE(survey_id)
);

-- ============================================================
-- SUBCONTRACTOR COST ALLOCATION
-- ============================================================

CREATE TABLE survey_subcontractor_costs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id       UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  section_key     TEXT NOT NULL,
  section_name    TEXT,
  contractor_mat_cost DECIMAL(10,2) DEFAULT 0,
  contractor_lab_cost DECIMAL(10,2) DEFAULT 0,
  contractor_total    DECIMAL(10,2) DEFAULT 0,
  projected_hours DECIMAL(6,1),
  assigned_to     TEXT,
  notes           TEXT,
  display_order   INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_customer_summary_survey ON survey_customer_summary(survey_id);
CREATE INDEX idx_overheads_survey ON survey_overheads(survey_id);
CREATE INDEX idx_caf1_survey ON survey_caf1(survey_id);
CREATE INDEX idx_subcontractor_costs_survey ON survey_subcontractor_costs(survey_id);

-- ============================================================
-- RLS POLICIES
-- ============================================================

ALTER TABLE survey_customer_summary ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_overheads ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_caf1 ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_subcontractor_costs ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'survey_customer_summary', 'survey_overheads',
    'survey_caf1', 'survey_subcontractor_costs'
  ])
  LOOP
    EXECUTE format('CREATE POLICY "Authenticated read %s" ON %I FOR SELECT TO authenticated USING (true)', tbl, tbl);
    EXECUTE format('CREATE POLICY "Authenticated insert %s" ON %I FOR INSERT TO authenticated WITH CHECK (true)', tbl, tbl);
    EXECUTE format('CREATE POLICY "Authenticated update %s" ON %I FOR UPDATE TO authenticated USING (true) WITH CHECK (true)', tbl, tbl);
    EXECUTE format('CREATE POLICY "Authenticated delete %s" ON %I FOR DELETE TO authenticated USING (true)', tbl, tbl);
    EXECUTE format('CREATE POLICY "Service role %s" ON %I FOR ALL TO service_role USING (true) WITH CHECK (true)', tbl, tbl);
  END LOOP;
END $$;