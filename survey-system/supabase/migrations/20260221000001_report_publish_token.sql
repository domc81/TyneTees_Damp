-- =============================================================================
-- Migration: Add publish token to survey_reports
-- Enables token-based public report sharing without authentication.
--
-- The publish_token is the sole credential for public access.
-- Cleared on unpublish to immediately revoke access.
-- =============================================================================

ALTER TABLE survey_reports
ADD COLUMN IF NOT EXISTS publish_token TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_survey_reports_token
  ON survey_reports(publish_token)
  WHERE publish_token IS NOT NULL;

COMMENT ON COLUMN survey_reports.publish_token IS 'Unique token for public report access. Generated on publish, cleared on unpublish.';
COMMENT ON COLUMN survey_reports.published_at IS 'Timestamp when the report was published for customer viewing.';
