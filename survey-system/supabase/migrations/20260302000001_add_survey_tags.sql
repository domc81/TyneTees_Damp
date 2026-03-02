-- Add survey_tags column to surveys table
-- Auto-populated array of granular finding tags derived from room data and external inspection.
-- Plain TEXT[] (not ENUM) for flexibility. Empty array is the default.

ALTER TABLE surveys ADD COLUMN survey_tags TEXT[] DEFAULT '{}';

COMMENT ON COLUMN surveys.survey_tags IS 'Auto-populated array of granular finding tags derived from room data and external inspection';
