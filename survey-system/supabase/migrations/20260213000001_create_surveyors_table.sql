-- ============================================================================
-- CREATE SURVEYORS TABLE
-- This migration adds a dedicated surveyors table for managing surveyor details
-- ============================================================================

-- Create the surveyors table
CREATE TABLE surveyors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  qualifications TEXT,
  availability BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index for faster lookups
CREATE INDEX idx_surveyors_email ON surveyors(email);
CREATE INDEX idx_surveyors_user_id ON surveyors(user_id);

-- Comment on the table and columns for documentation
COMMENT ON TABLE surveyors IS 'Table for managing surveyor details and assignments';
COMMENT ON COLUMN surveyors.user_id IS 'Reference to the Supabase auth user';
COMMENT ON COLUMN surveyors.availability IS 'Indicates if the surveyor is available for new assignments';

-- ============================================================================
-- UPDATE PROJECTS TABLE TO REFERENCE SURVEYORS
-- ============================================================================

-- First, drop the existing surveyor_id column if it exists referencing auth.users
ALTER TABLE projects DROP COLUMN IF EXISTS surveyor_id;

-- Add the new surveyor_id column referencing the surveyors table
ALTER TABLE projects ADD COLUMN surveyor_id UUID REFERENCES surveyors(id) ON DELETE SET NULL;

-- Add a comment for documentation
COMMENT ON COLUMN projects.surveyor_id IS 'Reference to the assigned surveyor from the surveyors table';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================