-- =============================================================================
-- Migration: Pipeline Unification
-- =============================================================================
-- Adds new enquiry pipeline statuses and migrates existing records.
--
-- New statuses: awaiting_payment, booked, survey_complete, sent, won, closed, lost
-- Old statuses remain in enum (PostgreSQL cannot drop enum values) but are
-- never written by application code after this migration.
--
-- Status mapping:
--   assigned   → awaiting_payment or booked (based on booking payment state)
--   surveyed   → survey_complete
--   quoted     → sent
--   accepted   → won
--   declined   → lost
--   completed  → won
--   handed_over → closed
--   new        → new (unchanged)
--   on_hold    → on_hold (unchanged)
-- =============================================================================

-- 1. Add new enum values
ALTER TYPE public.enquiry_status ADD VALUE IF NOT EXISTS 'awaiting_payment' AFTER 'new';
ALTER TYPE public.enquiry_status ADD VALUE IF NOT EXISTS 'booked' AFTER 'awaiting_payment';
ALTER TYPE public.enquiry_status ADD VALUE IF NOT EXISTS 'survey_complete' AFTER 'booked';
ALTER TYPE public.enquiry_status ADD VALUE IF NOT EXISTS 'sent' AFTER 'survey_complete';
ALTER TYPE public.enquiry_status ADD VALUE IF NOT EXISTS 'won' AFTER 'sent';
ALTER TYPE public.enquiry_status ADD VALUE IF NOT EXISTS 'closed' AFTER 'won';
ALTER TYPE public.enquiry_status ADD VALUE IF NOT EXISTS 'lost' AFTER 'closed';

-- 2. Migrate existing records to new statuses
-- Note: Must COMMIT the ALTER TYPE before using new values in DML.
-- In psql, each statement auto-commits. In a transaction block, we need
-- to split this. Since we apply via psql (not in a transaction), this works.

-- 2a. assigned → check booking/payment state
-- If there's a scheduled (paid) booking → booked
-- If there's a provisional (unpaid) booking → awaiting_payment
-- If no booking at all → new (need to rebook)
UPDATE public.enquiries e
SET status = 'booked', status_changed_at = NOW()
WHERE e.status = 'assigned'
  AND EXISTS (
    SELECT 1 FROM public.surveys s
    JOIN public.survey_bookings sb ON sb.survey_id = s.id
    WHERE s.enquiry_id = e.id
      AND sb.status = 'scheduled'
  );

UPDATE public.enquiries e
SET status = 'awaiting_payment', status_changed_at = NOW()
WHERE e.status = 'assigned'
  AND EXISTS (
    SELECT 1 FROM public.surveys s
    JOIN public.survey_bookings sb ON sb.survey_id = s.id
    WHERE s.enquiry_id = e.id
      AND sb.status = 'provisional'
  );

UPDATE public.enquiries
SET status = 'new', status_changed_at = NOW()
WHERE status = 'assigned';

-- 2b. Simple renames
UPDATE public.enquiries SET status = 'survey_complete', status_changed_at = NOW() WHERE status = 'surveyed';
UPDATE public.enquiries SET status = 'sent',             status_changed_at = NOW() WHERE status = 'quoted';
UPDATE public.enquiries SET status = 'won',              status_changed_at = NOW() WHERE status = 'accepted';
UPDATE public.enquiries SET status = 'lost',             status_changed_at = NOW() WHERE status = 'declined';
UPDATE public.enquiries SET status = 'closed',           status_changed_at = NOW() WHERE status = 'handed_over';

-- 2c. completed → won (handover tracking distinguishes progress)
UPDATE public.enquiries SET status = 'won', status_changed_at = NOW() WHERE status = 'completed';

-- 3. Update the default value for new enquiries
ALTER TABLE public.enquiries ALTER COLUMN status SET DEFAULT 'new'::public.enquiry_status;
