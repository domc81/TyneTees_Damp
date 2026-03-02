-- =============================================================================
-- Migration: Report View Tracking & Sent Status
--
-- Adds view-tracking columns to survey_reports (mirrors quotation pattern)
-- and creates report_views table (mirrors quotation_views).
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Add tracking columns to survey_reports
-- ---------------------------------------------------------------------------

ALTER TABLE survey_reports
  ADD COLUMN IF NOT EXISTS sent_at          TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS sent_to_email    TEXT,
  ADD COLUMN IF NOT EXISTS first_viewed_at  TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_viewed_at   TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS view_count       INTEGER NOT NULL DEFAULT 0;

-- ---------------------------------------------------------------------------
-- 2. Create report_views table (mirrors quotation_views)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS report_views (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id        UUID NOT NULL REFERENCES survey_reports(id) ON DELETE CASCADE,
  viewed_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip_address       INET,
  user_agent       TEXT,
  duration_seconds INTEGER,
  referrer         TEXT
);

CREATE INDEX IF NOT EXISTS idx_report_views_report_id ON report_views(report_id);

-- ---------------------------------------------------------------------------
-- 3. RLS policies for report_views
-- ---------------------------------------------------------------------------

ALTER TABLE report_views ENABLE ROW LEVEL SECURITY;

-- Public page inserts view records (no auth — customer-facing)
CREATE POLICY report_views_insert_public
  ON report_views FOR INSERT
  WITH CHECK (true);

-- Only admin/office can read view analytics
CREATE POLICY report_views_select_admin_office
  ON report_views FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.user_id = auth.uid()
        AND user_profiles.role IN ('admin', 'office')
        AND user_profiles.is_active = true
    )
  );

-- ---------------------------------------------------------------------------
-- 4. Add report_viewed and report_sent notification preference rows
-- ---------------------------------------------------------------------------

INSERT INTO notification_preferences (event_type, description, in_app_enabled, email_enabled)
VALUES
  ('report_sent', 'When a survey report is emailed to a customer', true, false),
  ('report_viewed', 'When a customer first opens their survey report', true, false)
ON CONFLICT (event_type) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 5. Add report_sent and report_viewed to the notification type check constraint
--    (if the constraint exists — gracefully skip if it doesn't)
-- ---------------------------------------------------------------------------

DO $$
BEGIN
  -- Drop old constraint if it exists, then recreate with expanded values
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'notifications_type_check' AND table_name = 'notifications'
  ) THEN
    ALTER TABLE notifications DROP CONSTRAINT notifications_type_check;
  END IF;

  -- Recreate with all known types including the new ones
  ALTER TABLE notifications ADD CONSTRAINT notifications_type_check CHECK (
    type IN (
      'booking_created', 'booking_updated', 'booking_cancelled', 'booking_reminder',
      'survey_created', 'survey_assigned', 'survey_completed', 'survey_status_changed',
      'quotation_generated', 'quotation_sent', 'quotation_viewed', 'quotation_accepted', 'quotation_declined',
      'report_generated', 'report_published', 'report_sent', 'report_viewed',
      'enquiry_created',
      'system_alert'
    )
  );
EXCEPTION
  WHEN others THEN
    RAISE NOTICE 'Could not update notifications_type_check constraint: %', SQLERRM;
END;
$$;
