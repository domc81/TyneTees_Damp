-- =============================================================================
-- Migration: Add is_included column to costing_section_adjustments
--
-- Background: the costing page needs to persist whether each optional section
-- is included or excluded from the job total. The existing
-- costing_section_adjustments table already stores per-survey, per-section
-- state (adjustment_pct); adding is_included here keeps the state co-located
-- in a single row per (survey, section) pair, avoiding an extra table and join.
--
-- Default: true — all sections are included by default. Only excluded optional
-- sections that the surveyor has explicitly toggled off will have is_included = false.
-- =============================================================================

BEGIN;

ALTER TABLE public.costing_section_adjustments
    ADD COLUMN is_included BOOLEAN NOT NULL DEFAULT true;

COMMIT;
