-- Allow 'published' as a valid report status
ALTER TABLE survey_reports DROP CONSTRAINT survey_reports_status_check;
ALTER TABLE survey_reports ADD CONSTRAINT survey_reports_status_check
  CHECK (status IN ('draft', 'generated', 'reviewed', 'finalised', 'published'));
