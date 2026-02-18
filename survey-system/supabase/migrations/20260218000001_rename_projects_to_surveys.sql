-- Migration: Rename projects → surveys + add shared survey columns
-- Date: 2026-02-18
-- Reason: The "projects" table is actually a survey. Renaming for clarity.
-- Depends on: 20260217000004_seed_pricing_data.sql
-- Rollback: ALTER TABLE surveys RENAME TO projects; then DROP added columns

-- Step 1: Rename the table
ALTER TABLE projects RENAME TO surveys;

-- Step 2: Add new shared columns for survey execution
ALTER TABLE surveys ADD COLUMN IF NOT EXISTS reported_problem TEXT;
ALTER TABLE surveys ADD COLUMN IF NOT EXISTS reported_problem_override TEXT;
ALTER TABLE surveys ADD COLUMN IF NOT EXISTS completion_pct INTEGER DEFAULT 0;
ALTER TABLE surveys ADD COLUMN IF NOT EXISTS is_complete BOOLEAN DEFAULT false;
ALTER TABLE surveys ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMPTZ;
ALTER TABLE surveys ADD COLUMN IF NOT EXISTS office_notes TEXT;

-- Step 3: Add distance_miles to enquiries (needed for travel cost calculation)
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS distance_miles DECIMAL(6,1);
ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS reported_problem TEXT;

-- Step 4: Update any existing RLS policies that reference 'projects'
-- Drop old policies (they reference the old table name)
DROP POLICY IF EXISTS "Users can view their own projects" ON surveys;
DROP POLICY IF EXISTS "Users can create projects" ON surveys;
DROP POLICY IF EXISTS "Users can update their own projects" ON surveys;
DROP POLICY IF EXISTS "Authenticated users can view all projects" ON surveys;
DROP POLICY IF EXISTS "Authenticated users can create projects" ON surveys;
DROP POLICY IF EXISTS "Authenticated users can update projects" ON surveys;
DROP POLICY IF EXISTS "Service role full access" ON surveys;

-- Recreate with new table name
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view all surveys"
  ON surveys FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create surveys"
  ON surveys FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update surveys"
  ON surveys FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on surveys"
  ON surveys FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Step 5: Add index for common query patterns
CREATE INDEX IF NOT EXISTS idx_surveys_survey_type ON surveys(survey_type);
CREATE INDEX IF NOT EXISTS idx_surveys_status ON surveys(status);
CREATE INDEX IF NOT EXISTS idx_surveys_enquiry ON surveys(enquiry_id);