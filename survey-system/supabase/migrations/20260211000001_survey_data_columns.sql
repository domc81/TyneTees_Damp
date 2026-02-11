-- Migration: Add survey_data column for structured survey answers
-- Run this after the initial schema migration

-- Add JSONB column to store structured survey answers
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS survey_data JSONB DEFAULT '{}'::jsonb;

-- Add column for skipped sections
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS survey_skipped_sections TEXT[] DEFAULT '{}';

-- Add column for survey progress percentage
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS survey_progress INTEGER DEFAULT 0;

-- Add column for survey completion status
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS survey_completed BOOLEAN DEFAULT FALSE;

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_survey_data ON projects USING GIN (survey_data);
CREATE INDEX IF NOT EXISTS idx_projects_survey_progress ON projects (survey_progress);
CREATE INDEX IF NOT EXISTS idx_projects_survey_completed ON projects (survey_completed) WHERE survey_completed = TRUE;

COMMENT ON COLUMN projects.survey_data IS 'JSON object storing all structured survey question answers';
COMMENT ON COLUMN projects.survey_skipped_sections IS 'Array of section IDs that were skipped';
COMMENT ON COLUMN projects.survey_progress IS 'Percentage of survey completion (0-100)';
COMMENT ON COLUMN projects.survey_completed IS 'Whether the survey has been marked as complete';
