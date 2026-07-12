-- =============================================================================
-- Operative outputs (review pt 15): survey_subcontractor_costs becomes the
-- live store for per-section contractor figures + office assignment/notes.
-- One row per (survey, section) — unique key so refreshes upsert instead of
-- duplicating, preserving assigned_to/notes across recomputes.
-- =============================================================================

CREATE UNIQUE INDEX IF NOT EXISTS uq_subcontractor_costs_survey_section
  ON survey_subcontractor_costs (survey_id, section_key);
