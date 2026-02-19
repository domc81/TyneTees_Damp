-- =====================================================================
-- Migration: Room-First Survey Wizard Schema
-- Date: 2026-02-19
-- Description: Add issues_identified and room_data columns to support
--              the room-first, issue-driven survey wizard architecture.
-- =====================================================================

-- Add issues_identified column (multi-select issue types per room)
ALTER TABLE survey_rooms
ADD COLUMN IF NOT EXISTS issues_identified TEXT[] DEFAULT '{}';

COMMENT ON COLUMN survey_rooms.issues_identified IS
'Multi-select array of issue types identified in this room. Valid values: damp, condensation, timber_decay, woodworm. A room can have 0-N issues. Empty array means no issues identified yet.';

-- Add room_data column (per-issue measurements and findings)
ALTER TABLE survey_rooms
ADD COLUMN IF NOT EXISTS room_data JSONB DEFAULT '{}'::jsonb;

COMMENT ON COLUMN survey_rooms.room_data IS
'Per-room measurements and findings, keyed by issue type. Structure matches RoomData interface in survey-wizard.types.ts. Example: {"damp": {"walls": [...], "dpc_required": true}, "timber_decay": {"floor_type": "suspended_timber", ...}}. Only contains keys for issues present in issues_identified array.';

-- Rename project_id to survey_id for consistency (projects table was renamed to surveys)
-- Use DO block to check if column exists before renaming to avoid errors if run twice
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'survey_rooms'
      AND column_name = 'project_id'
  ) THEN
    -- Drop the old foreign key constraint
    ALTER TABLE survey_rooms
    DROP CONSTRAINT IF EXISTS survey_rooms_project_id_fkey;

    -- Rename the column
    ALTER TABLE survey_rooms
    RENAME COLUMN project_id TO survey_id;

    -- Add the new foreign key constraint pointing to surveys table
    ALTER TABLE survey_rooms
    ADD CONSTRAINT survey_rooms_survey_id_fkey
    FOREIGN KEY (survey_id) REFERENCES surveys(id) ON DELETE CASCADE;

    -- Drop old index and create new one
    DROP INDEX IF EXISTS idx_survey_rooms_project;
    CREATE INDEX IF NOT EXISTS idx_survey_rooms_survey ON survey_rooms(survey_id);

    RAISE NOTICE 'Column project_id renamed to survey_id in survey_rooms table';
  ELSE
    RAISE NOTICE 'Column project_id does not exist in survey_rooms table (already renamed or never existed)';
  END IF;
END $$;

-- Add GIN indexes on new columns for efficient querying
-- GIN index on issues_identified for fast array containment queries (@> operator)
CREATE INDEX IF NOT EXISTS idx_survey_rooms_issues
ON survey_rooms USING GIN (issues_identified);

COMMENT ON INDEX idx_survey_rooms_issues IS
'GIN index for efficient queries on issues_identified array. Supports queries like: WHERE issues_identified @> ARRAY[''damp''] or WHERE ''timber_decay'' = ANY(issues_identified)';

-- GIN index on room_data for fast JSONB queries
CREATE INDEX IF NOT EXISTS idx_survey_rooms_data
ON survey_rooms USING GIN (room_data);

COMMENT ON INDEX idx_survey_rooms_data IS
'GIN index for efficient queries on room_data JSONB field. Supports queries like: WHERE room_data @> ''{"damp": {"dpc_required": true}}'' or WHERE room_data ? ''condensation''';

-- =====================================================================
-- Migration Complete
-- The survey_rooms table now supports the room-first wizard architecture:
-- - Surveyors select which issues are present per room (issues_identified)
-- - Only relevant measurement fields are captured (room_data, keyed by issue)
-- - A single room can have multiple issue types simultaneously
-- - The wizard UI conditionally renders panels based on issues_identified
-- =====================================================================
