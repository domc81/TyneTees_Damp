-- =============================================================================
-- Migration: Expand notifications for platform-wide event types
-- Adds polymorphic FK columns, link_url, and expands type CHECK constraint
-- =============================================================================

-- 1. Add new FK columns for polymorphic references
ALTER TABLE notifications ADD COLUMN survey_id UUID REFERENCES surveys(id) ON DELETE SET NULL;
ALTER TABLE notifications ADD COLUMN quotation_id UUID REFERENCES quotations(id) ON DELETE SET NULL;
ALTER TABLE notifications ADD COLUMN report_id UUID REFERENCES survey_reports(id) ON DELETE SET NULL;
ALTER TABLE notifications ADD COLUMN enquiry_id UUID REFERENCES enquiries(id) ON DELETE SET NULL;

-- 2. Add link_url column for click navigation
ALTER TABLE notifications ADD COLUMN link_url TEXT;

-- 3. Add indexes on new FK columns for query performance
CREATE INDEX idx_notifications_survey_id ON notifications(survey_id) WHERE survey_id IS NOT NULL;
CREATE INDEX idx_notifications_quotation_id ON notifications(quotation_id) WHERE quotation_id IS NOT NULL;
CREATE INDEX idx_notifications_report_id ON notifications(report_id) WHERE report_id IS NOT NULL;
CREATE INDEX idx_notifications_enquiry_id ON notifications(enquiry_id) WHERE enquiry_id IS NOT NULL;

-- 4. Replace type CHECK constraint with expanded set
ALTER TABLE notifications DROP CONSTRAINT notifications_type_check;
ALTER TABLE notifications ADD CONSTRAINT notifications_type_check
  CHECK (type IN (
    'booking_created', 'booking_updated', 'booking_cancelled', 'booking_reminder',
    'survey_created', 'survey_assigned', 'survey_completed', 'survey_status_changed',
    'quotation_generated', 'quotation_sent', 'quotation_viewed', 'quotation_accepted', 'quotation_declined',
    'report_generated', 'report_published',
    'enquiry_created',
    'system_alert'
  ));

-- 5. Verify: existing booking notifications are unaffected (they use types still in the new constraint)
-- No data migration needed — all existing rows have booking_* types which are retained.
