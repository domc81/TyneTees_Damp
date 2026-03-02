-- =============================================================================
-- Migration: platform_settings + notification_preferences tables
-- Date: 2026-03-02
-- Purpose: Dynamic email configuration and per-event notification toggles.
--
-- platform_settings   — service-role-only key-value store for sensitive config
-- notification_preferences — admin-editable toggles for in-app + email per event
-- =============================================================================

-- =============================================================================
-- 1. platform_settings — key-value store (service role access only)
-- =============================================================================

CREATE TABLE public.platform_settings (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    key             TEXT        NOT NULL UNIQUE,
    value           TEXT,                               -- NULL = unset/not configured
    is_sensitive    BOOLEAN     NOT NULL DEFAULT false, -- true = API keys, never return to browser
    description     TEXT,                               -- Human-readable label for admin UI
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.platform_settings IS 'Key-value store for platform-wide configuration. Sensitive values (API keys) are service-role-only and must never be returned to the browser.';
COMMENT ON COLUMN public.platform_settings.is_sensitive IS 'When true the value must not be returned to the browser — API routes return a masked indicator (configured: true) instead.';

-- updated_at trigger
CREATE TRIGGER set_platform_settings_updated_at
    BEFORE UPDATE ON public.platform_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

-- RLS: enable, service role only (no user policies — all access via API routes)
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

-- No authenticated-user policies — only service role key bypasses RLS.
-- API routes use the service role client and verify auth + role independently.

-- =============================================================================
-- 2. notification_preferences — per-event-type email/in-app toggles
-- =============================================================================

CREATE TABLE public.notification_preferences (
    id                      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type              TEXT        NOT NULL UNIQUE,
    in_app_enabled          BOOLEAN     NOT NULL DEFAULT true,
    email_enabled           BOOLEAN     NOT NULL DEFAULT false,
    email_recipient_type    TEXT        NOT NULL DEFAULT 'internal'
                                CHECK (email_recipient_type IN ('internal', 'customer', 'both')),
    description             TEXT,                       -- Human-readable label for settings UI
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.notification_preferences IS 'Admin-configurable toggles for in-app and email delivery per event type. All authenticated users can SELECT (needed at notification time). Only admins can modify.';
COMMENT ON COLUMN public.notification_preferences.email_recipient_type IS 'internal = internal staff only; customer = booking customer; both = internal staff + customer.';

-- updated_at trigger
CREATE TRIGGER set_notification_preferences_updated_at
    BEFORE UPDATE ON public.notification_preferences
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

-- RLS
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read (needed when creating notifications to check preferences)
CREATE POLICY "Authenticated users can read notification preferences"
    ON public.notification_preferences FOR SELECT
    TO authenticated
    USING (true);

-- Only admins can insert
CREATE POLICY "Admins can insert notification preferences"
    ON public.notification_preferences FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

-- Only admins can update
CREATE POLICY "Admins can update notification preferences"
    ON public.notification_preferences FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

-- Only admins can delete
CREATE POLICY "Admins can delete notification preferences"
    ON public.notification_preferences FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- =============================================================================
-- 3. Seed default notification preferences (17 event types)
-- ON CONFLICT DO NOTHING — safe to re-run
-- =============================================================================

INSERT INTO public.notification_preferences (event_type, in_app_enabled, email_enabled, email_recipient_type, description)
VALUES
    -- Bookings
    ('booking_created',         true,   true,   'customer',  'Booking confirmation'),
    ('booking_updated',         true,   true,   'customer',  'Booking rescheduled'),
    ('booking_cancelled',       true,   true,   'customer',  'Booking cancelled'),
    ('booking_reminder',        true,   true,   'customer',  'Upcoming survey reminder'),
    -- Surveys
    ('survey_created',          true,   false,  'internal',  'New survey created'),
    ('survey_assigned',         true,   false,  'internal',  'Surveyor assigned to survey'),
    ('survey_completed',        true,   false,  'internal',  'Survey wizard completed'),
    ('survey_status_changed',   true,   false,  'internal',  'Survey status updated'),
    -- Quotations
    ('quotation_generated',     true,   false,  'internal',  'Quotation generated'),
    ('quotation_sent',          true,   true,   'customer',  'Quotation emailed to customer'),
    ('quotation_viewed',        true,   false,  'internal',  'Customer viewed quotation'),
    ('quotation_accepted',      true,   false,  'internal',  'Customer accepted quotation'),
    ('quotation_declined',      true,   false,  'internal',  'Customer declined quotation'),
    -- Reports
    ('report_generated',        true,   false,  'internal',  'Report AI generation complete'),
    ('report_published',        true,   true,   'customer',  'Report published and emailed'),
    -- Enquiries
    ('enquiry_created',         true,   false,  'internal',  'New enquiry received'),
    -- System
    ('system_alert',            true,   false,  'internal',  'System notification')
ON CONFLICT (event_type) DO NOTHING;

-- =============================================================================
-- 4. Seed default platform settings for email configuration
-- ON CONFLICT DO NOTHING — safe to re-run
-- =============================================================================

INSERT INTO public.platform_settings (key, value, is_sensitive, description)
VALUES
    ('email_mode',              'platform', false, '''platform'' or ''custom'' — which email sending mode to use'),
    ('platform_resend_api_key', '',         true,  'Resend API key for platform email mode (falls back to RESEND_API_KEY env var)'),
    ('custom_resend_api_key',   '',         true,  'Client''s own Resend API key (custom mode only)'),
    ('custom_from_email',       '',         false, 'Client''s verified sending email address (custom mode only)'),
    ('custom_from_name',        '',         false, 'Display name for outbound emails in custom mode'),
    ('platform_from_email',     '',         false, 'Platform sending address e.g. notifications@mail.dc81.io (platform mode)')
ON CONFLICT (key) DO NOTHING;
