-- CF Project Reference — the manually-created Contractor Foreman project ID.
-- Free text, recorded per survey so the office can cross-reference a won job
-- back to its survey. Entered on the Survey Details card or via the soft
-- prompt shown when a lead is marked won.

ALTER TABLE surveys ADD COLUMN IF NOT EXISTS cf_project_reference text;

COMMENT ON COLUMN surveys.cf_project_reference IS
  'Contractor Foreman project reference (manually created in CF, recorded here for cross-referencing)';
