-- Migration: Report templates and survey reports tables
-- Date: 2026-02-20
-- Reason: Store structured report templates (per survey type) and generated
--         report instances. Reports are stored as JSONB sections that can be
--         rendered to PDF, HTML portal, or dashboard views.
-- Depends on: 20260219000001_room_first_wizard.sql
-- Rollback: DROP TABLE survey_reports; DROP TABLE report_templates;

-- ============================================================
-- REPORT TEMPLATES (one default per survey type)
-- ============================================================

CREATE TABLE report_templates (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  survey_type TEXT NOT NULL CHECK (survey_type IN ('damp', 'condensation', 'timber', 'woodworm')),
  version     INTEGER DEFAULT 1,
  sections    JSONB NOT NULL,    -- array of ReportTemplateSection
  settings    JSONB NOT NULL,    -- ReportSettings
  is_default  BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- Only one default template per survey type
CREATE UNIQUE INDEX idx_report_templates_default
  ON report_templates (survey_type)
  WHERE is_default = true;

-- ============================================================
-- SURVEY REPORTS (generated report instances)
-- ============================================================

CREATE TABLE survey_reports (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  survey_id     UUID NOT NULL REFERENCES surveys(id) ON DELETE CASCADE,
  template_id   UUID NOT NULL REFERENCES report_templates(id),
  status        TEXT NOT NULL DEFAULT 'draft'
                CHECK (status IN ('draft', 'generated', 'reviewed', 'finalised')),
  sections      JSONB NOT NULL DEFAULT '[]'::jsonb,  -- array of ReportSection
  generated_at  TIMESTAMPTZ,
  reviewed_by   TEXT,
  finalised_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX idx_report_templates_type ON report_templates(survey_type);
CREATE INDEX idx_survey_reports_survey ON survey_reports(survey_id);
CREATE INDEX idx_survey_reports_template ON survey_reports(template_id);
CREATE INDEX idx_survey_reports_status ON survey_reports(status);

-- ============================================================
-- RLS POLICIES
-- ============================================================

ALTER TABLE report_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_reports ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY['report_templates', 'survey_reports'])
  LOOP
    EXECUTE format('CREATE POLICY "Authenticated read %s" ON %I FOR SELECT TO authenticated USING (true)', tbl, tbl);
    EXECUTE format('CREATE POLICY "Authenticated insert %s" ON %I FOR INSERT TO authenticated WITH CHECK (true)', tbl, tbl);
    EXECUTE format('CREATE POLICY "Authenticated update %s" ON %I FOR UPDATE TO authenticated USING (true) WITH CHECK (true)', tbl, tbl);
    EXECUTE format('CREATE POLICY "Authenticated delete %s" ON %I FOR DELETE TO authenticated USING (true)', tbl, tbl);
    EXECUTE format('CREATE POLICY "Service role %s" ON %I FOR ALL TO service_role USING (true) WITH CHECK (true)', tbl, tbl);
  END LOOP;
END $$;
