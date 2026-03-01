-- Migration: Migrate surveyor identity to user_profiles
-- Adds is_surveyor flag and qualifications to user_profiles,
-- backfills from existing role='surveyor' rows,
-- bridges qualifications data from legacy surveyors table,
-- migrates surveys.surveyor_id FK from surveyors to user_profiles,
-- and adds admin UPDATE policy for team management.

-- ============================================================
-- STEP 1: Add new columns to user_profiles
-- ============================================================

ALTER TABLE user_profiles
  ADD COLUMN IF NOT EXISTS is_surveyor BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS qualifications TEXT;

-- Index for efficient filtering of bookable surveyors
CREATE INDEX IF NOT EXISTS idx_user_profiles_is_surveyor
  ON user_profiles (is_surveyor)
  WHERE is_surveyor = true;

-- ============================================================
-- STEP 2: Backfill is_surveyor for existing role='surveyor' profiles
-- ============================================================

UPDATE user_profiles
SET is_surveyor = true
WHERE role = 'surveyor'
  AND is_surveyor = false;

-- ============================================================
-- STEP 3: Data bridge — copy qualifications from legacy surveyors
-- table where email matches (case-insensitive) and target is null
-- ============================================================

UPDATE user_profiles up
SET qualifications = s.qualifications
FROM surveyors s
WHERE LOWER(up.email) = LOWER(s.email)
  AND s.qualifications IS NOT NULL
  AND s.qualifications != ''
  AND up.qualifications IS NULL;

-- ============================================================
-- STEP 4: Migrate surveys.surveyor_id FK
-- Drop old FK to surveyors(id), add new FK to user_profiles(id)
-- Safe because surveys.surveyor_id is entirely NULL (verified above)
-- ============================================================

-- Drop the old FK constraint (named from when the table was called 'projects')
ALTER TABLE surveys
  DROP CONSTRAINT IF EXISTS projects_surveyor_id_fkey;

-- Add new FK pointing to user_profiles
ALTER TABLE surveys
  ADD CONSTRAINT surveys_surveyor_id_fkey
    FOREIGN KEY (surveyor_id)
    REFERENCES user_profiles (id)
    ON DELETE SET NULL;

-- ============================================================
-- STEP 5: RLS — Add admin UPDATE policy for user_profiles
-- Existing policy only allows users to update their own profile.
-- Admins need to toggle is_surveyor and update other users' profiles
-- via Team Management.
-- ============================================================

DROP POLICY IF EXISTS "Admins can update any profile" ON user_profiles;

CREATE POLICY "Admins can update any profile"
  ON user_profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.user_id = uid()
        AND up.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.user_id = uid()
        AND up.role = 'admin'
    )
  );
