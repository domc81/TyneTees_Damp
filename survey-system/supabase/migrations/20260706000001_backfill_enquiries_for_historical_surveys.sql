-- =============================================================================
-- Backfill enquiries for historical surveys (pre-pipeline).
--
-- 22 surveys created before pipeline-only survey creation (2026-07-05) have no
-- enquiry_id, making them invisible to the Kanban, fees, bookings — and the
-- handover pack, which gates on the linked enquiry being won/closed.
--
-- One enquiry per orphan survey, fields copied from the survey (+ customer
-- email/phone), then linked back via surveys.enquiry_id:
--   - enquiry_number continues the app's CF-{TYPE}-{YEAR}-{SEQ} sequence per type
--   - internal_reference = survey project_number (traceability + link-back key)
--   - source = 'Historical Import' (Title Case per convention; also the
--     rollback selector: delete enquiries with this source and re-null
--     surveys.enquiry_id to undo)
--   - status: survey_complete when the survey is completed, else booked
--     (NOT 'new' — a New card offers Convert & Book, which would create a
--     duplicate survey)
--   - enquiry_date/created_at = the survey's created_at (truthful history)
-- =============================================================================

BEGIN;

WITH orphans AS (
  SELECT s.id AS survey_id,
         s.project_number,
         s.survey_type,
         s.client_name,
         s.site_address, s.site_address_line2, s.site_city, s.site_county, s.site_postcode,
         s.notes, s.reported_problem,
         s.customer_id, s.surveyor_id, s.survey_completed, s.created_at,
         c.email AS client_email,
         c.phone AS client_phone,
         row_number() OVER (PARTITION BY s.survey_type ORDER BY s.created_at, s.project_number) AS rn
  FROM surveys s
  LEFT JOIN customers c ON c.id = s.customer_id
  WHERE s.enquiry_id IS NULL
),
maxseq AS (
  -- Highest existing sequence per type for CF-{TYPE}-2026-NNNN (app pads to 4)
  SELECT t.survey_type,
         COALESCE(MAX(right(e.enquiry_number, 4)::int), 0) AS max_seq
  FROM (SELECT DISTINCT survey_type FROM orphans) t
  LEFT JOIN enquiries e
    ON e.enquiry_number LIKE 'CF-' || upper(t.survey_type::text) || '-2026-%'
  GROUP BY t.survey_type
)
INSERT INTO enquiries (
  enquiry_number, internal_reference, client_name, client_email, client_phone,
  site_address_1, site_address_2, site_city, site_county, site_postcode,
  survey_type, status, source, enquiry_date, notes, reported_problem,
  customer_id, assigned_to, status_changed_at, created_at, updated_at
)
SELECT
  'CF-' || upper(o.survey_type::text) || '-2026-' || lpad((m.max_seq + o.rn)::text, 4, '0'),
  o.project_number,
  o.client_name,
  o.client_email,
  o.client_phone,
  o.site_address,
  o.site_address_line2,
  COALESCE(o.site_city, ''),
  o.site_county,
  o.site_postcode,
  o.survey_type,
  CASE WHEN o.survey_completed THEN 'survey_complete'::enquiry_status
       ELSE 'booked'::enquiry_status END,
  'Historical Import',
  o.created_at::date,
  o.notes,
  o.reported_problem,
  o.customer_id,
  o.surveyor_id,
  now(),
  o.created_at,
  now()
FROM orphans o
JOIN maxseq m USING (survey_type);

-- Link each survey to its new enquiry via the stashed project_number.
UPDATE surveys s
SET enquiry_id = e.id,
    updated_at = now()
FROM enquiries e
WHERE e.source = 'Historical Import'
  AND e.internal_reference = s.project_number
  AND s.enquiry_id IS NULL;

-- Activity log entry per backfilled enquiry (matches the app's 'created' shape).
INSERT INTO enquiry_activity (enquiry_id, user_id, activity_type, title, metadata)
SELECT e.id,
       NULL,
       'created',
       'Enquiry ' || e.enquiry_number || ' created for ' || e.client_name,
       jsonb_build_object(
         'backfill', true,
         'survey_project_number', e.internal_reference,
         'survey_type', e.survey_type,
         'enquiry_number', e.enquiry_number
       )
FROM enquiries e
WHERE e.source = 'Historical Import'
  AND NOT EXISTS (
    SELECT 1 FROM enquiry_activity a
    WHERE a.enquiry_id = e.id AND a.activity_type = 'created'
  );

-- Sanity: no orphan surveys may remain.
DO $$
DECLARE remaining int;
BEGIN
  SELECT count(*) INTO remaining FROM surveys WHERE enquiry_id IS NULL;
  IF remaining > 0 THEN
    RAISE EXCEPTION 'backfill incomplete: % surveys still have no enquiry_id', remaining;
  END IF;
END $$;

COMMIT;
