-- =============================================================================
-- Migration: Drop legacy pricing and inspection tables
--
-- These tables were part of the original schema and have been fully replaced:
--   base_rates, markup_config  → pricing_config table
--   work_sections, pricing_items → costing_sections + costing_line_templates
--   project_costing → survey_costing_lines + quotations
--   defects → survey_data JSONB + survey type extension tables
--   moisture_readings → survey_data JSONB + survey_damp_wall_readings
--
-- No active code references any of these tables.
-- =============================================================================

BEGIN;

-- pricing_items has FK to work_sections, drop it first
DROP TABLE IF EXISTS public.pricing_items CASCADE;
DROP TABLE IF EXISTS public.work_sections CASCADE;
DROP TABLE IF EXISTS public.base_rates CASCADE;
DROP TABLE IF EXISTS public.markup_config CASCADE;
DROP TABLE IF EXISTS public.project_costing CASCADE;
DROP TABLE IF EXISTS public.defects CASCADE;
DROP TABLE IF EXISTS public.moisture_readings CASCADE;

COMMIT;
