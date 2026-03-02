-- =============================================================================
-- Migration: Calendar, booking, availability, and notification system
-- Date: 2026-03-02
-- Purpose: Add surveyor availability schedules, availability blocks, survey
--          bookings with overlap prevention, and in-app notifications.
-- =============================================================================

-- 1. Install btree_gist extension
-- Required for the EXCLUSION constraint on survey_bookings, which needs
-- GiST index support for both UUID equality (btree-in-gist) and tsrange
-- overlap (&&) in a single atomic database-level constraint.
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- =============================================================================
-- 2. Helper function: is_office_or_admin()
-- =============================================================================
-- Follows the same SECURITY DEFINER pattern as the existing is_admin()
-- function defined in 20260226000001_user_profiles.sql.
CREATE OR REPLACE FUNCTION public.is_office_or_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE user_id = auth.uid() AND role IN ('admin', 'office')
    );
$$;

COMMENT ON FUNCTION public.is_office_or_admin() IS 'Returns true if the current user has admin or office role. Use in RLS policies.';

-- =============================================================================
-- 3. surveyor_availability — Standard weekly working hours per surveyor
-- =============================================================================
-- Admin-managed. Multiple rows per surveyor are allowed (one per working day,
-- or multiple per day to represent split shifts / different time windows).

CREATE TABLE public.surveyor_availability (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    surveyor_id     UUID        NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    day_of_week     INTEGER     NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    start_time      TIME        NOT NULL,
    end_time        TIME        NOT NULL,
    is_active       BOOLEAN     NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT surveyor_availability_unique_slot
        UNIQUE (surveyor_id, day_of_week, start_time),

    CONSTRAINT surveyor_availability_time_order
        CHECK (end_time > start_time)
);

COMMENT ON TABLE public.surveyor_availability IS 'Standard weekly working hours per surveyor. Multiple rows per surveyor allowed for split shifts. Admin-managed.';
COMMENT ON COLUMN public.surveyor_availability.day_of_week IS '0 = Sunday, 1 = Monday … 6 = Saturday.';
COMMENT ON COLUMN public.surveyor_availability.is_active IS 'Inactive rows are ignored when computing availability.';

CREATE INDEX idx_surveyor_availability_surveyor_id ON public.surveyor_availability (surveyor_id);

-- =============================================================================
-- 4. availability_blocks — Periods overriding standard availability
-- =============================================================================
-- Covers annual leave, sickness, training, etc. Takes precedence over
-- the standard weekly schedule for the given date range.

CREATE TABLE public.availability_blocks (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    surveyor_id     UUID        NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    start_date      DATE        NOT NULL,
    end_date        DATE        NOT NULL,
    block_type      TEXT        NOT NULL CHECK (block_type IN ('annual_leave', 'sickness', 'training', 'other')),
    reason          TEXT,
    created_by      UUID        NOT NULL REFERENCES public.user_profiles(id),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT availability_blocks_date_order
        CHECK (end_date >= start_date)
);

COMMENT ON TABLE public.availability_blocks IS 'Periods where a surveyor is unavailable, overriding their standard weekly schedule (surveyor_availability).';
COMMENT ON COLUMN public.availability_blocks.block_type IS 'Category of absence: annual_leave, sickness, training, or other.';
COMMENT ON COLUMN public.availability_blocks.created_by IS 'user_profiles.id of the admin/office user who created this block.';

CREATE INDEX idx_availability_blocks_surveyor_id ON public.availability_blocks (surveyor_id);
CREATE INDEX idx_availability_blocks_date_range   ON public.availability_blocks (start_date, end_date);

-- =============================================================================
-- 5. survey_bookings — Scheduled survey appointments
-- =============================================================================

CREATE TABLE public.survey_bookings (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    survey_id           UUID        REFERENCES public.surveys(id) ON DELETE SET NULL,
    surveyor_id         UUID        NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    customer_name       TEXT        NOT NULL,
    customer_phone      TEXT,
    customer_email      TEXT,
    customer_address    TEXT,
    booking_date        DATE        NOT NULL,
    start_time          TIME        NOT NULL,
    end_time            TIME        NOT NULL,
    status              TEXT        NOT NULL DEFAULT 'scheduled'
                                    CHECK (status IN ('scheduled', 'completed', 'cancelled', 'no_show')),
    notes               TEXT,
    created_by          UUID        NOT NULL REFERENCES public.user_profiles(id),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT survey_bookings_time_order CHECK (end_time > start_time)
);

COMMENT ON TABLE public.survey_bookings IS 'Scheduled survey appointments. Overlap prevention for active bookings is enforced via EXCLUSION constraint (btree_gist).';
COMMENT ON COLUMN public.survey_bookings.survey_id IS 'Optional link to a survey record. NULL for bookings not yet associated with a survey.';
COMMENT ON COLUMN public.survey_bookings.status IS 'Workflow: scheduled → completed | cancelled | no_show. Cancelled bookings are excluded from overlap checks.';
COMMENT ON COLUMN public.survey_bookings.created_by IS 'user_profiles.id of the admin/office user who created the booking.';

CREATE INDEX idx_survey_bookings_surveyor_id  ON public.survey_bookings (surveyor_id);
CREATE INDEX idx_survey_bookings_booking_date ON public.survey_bookings (booking_date);
CREATE INDEX idx_survey_bookings_survey_id    ON public.survey_bookings (survey_id);

-- Overlap prevention: prevent two non-cancelled bookings for the same surveyor
-- from occupying overlapping time windows on the same date.
-- Uses btree_gist (installed above) to mix UUID equality with tsrange overlap
-- in a single GiST index — this is enforced atomically at database level.
-- The WHERE clause excludes cancelled bookings so that rebooking a cancelled
-- slot is permitted.
ALTER TABLE public.survey_bookings
    ADD CONSTRAINT survey_bookings_no_surveyor_overlap
    EXCLUDE USING gist (
        surveyor_id WITH =,
        tsrange(
            (booking_date + start_time)::timestamp,
            (booking_date + end_time)::timestamp,
            '[)'
        ) WITH &&
    ) WHERE (status <> 'cancelled');

-- =============================================================================
-- 6. notifications — In-app notification system
-- =============================================================================

CREATE TABLE public.notifications (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID        NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    type        TEXT        NOT NULL CHECK (type IN ('booking_created', 'booking_updated', 'booking_cancelled', 'booking_reminder')),
    title       TEXT        NOT NULL,
    message     TEXT        NOT NULL,
    booking_id  UUID        REFERENCES public.survey_bookings(id) ON DELETE SET NULL,
    read        BOOLEAN     NOT NULL DEFAULT false,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.notifications IS 'In-app notification system for booking events and reminders. user_id references user_profiles.id (not auth.uid()).';
COMMENT ON COLUMN public.notifications.user_id IS 'Recipient: user_profiles.id of the user this notification is for.';
COMMENT ON COLUMN public.notifications.type IS 'Event type: booking_created, booking_updated, booking_cancelled, booking_reminder.';
COMMENT ON COLUMN public.notifications.booking_id IS 'Optional link to the related booking. NULL if booking is deleted.';

-- Composite index optimised for the most common query: "unread notifications for user X"
CREATE INDEX idx_notifications_user_unread ON public.notifications (user_id, read);
CREATE INDEX idx_notifications_user_id     ON public.notifications (user_id);

-- =============================================================================
-- 7. updated_at triggers
-- =============================================================================
-- Reuses the existing public.update_updated_at() function (generic shared
-- trigger function, same pattern used on company_profile and other tables).

CREATE TRIGGER set_surveyor_availability_updated_at
    BEFORE UPDATE ON public.surveyor_availability
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_survey_bookings_updated_at
    BEFORE UPDATE ON public.survey_bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

-- =============================================================================
-- 8. Enable Row Level Security
-- =============================================================================

ALTER TABLE public.surveyor_availability  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability_blocks    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_bookings        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications          ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 9. RLS Policies: surveyor_availability
-- =============================================================================

-- All authenticated staff can view availability (needed to render calendars)
CREATE POLICY "Authenticated users can view surveyor availability"
    ON public.surveyor_availability FOR SELECT
    TO authenticated
    USING (true);

-- Only admins can manage the standard weekly schedule
CREATE POLICY "Admins can insert surveyor availability"
    ON public.surveyor_availability FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update surveyor availability"
    ON public.surveyor_availability FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete surveyor availability"
    ON public.surveyor_availability FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- =============================================================================
-- 10. RLS Policies: availability_blocks
-- =============================================================================

-- All authenticated staff can view absence blocks
CREATE POLICY "Authenticated users can view availability blocks"
    ON public.availability_blocks FOR SELECT
    TO authenticated
    USING (true);

-- Admins and office staff can manage absence records
CREATE POLICY "Office and admins can insert availability blocks"
    ON public.availability_blocks FOR INSERT
    TO authenticated
    WITH CHECK (public.is_office_or_admin());

CREATE POLICY "Office and admins can update availability blocks"
    ON public.availability_blocks FOR UPDATE
    TO authenticated
    USING (public.is_office_or_admin())
    WITH CHECK (public.is_office_or_admin());

CREATE POLICY "Office and admins can delete availability blocks"
    ON public.availability_blocks FOR DELETE
    TO authenticated
    USING (public.is_office_or_admin());

-- =============================================================================
-- 11. RLS Policies: survey_bookings
-- =============================================================================

-- All authenticated staff can view bookings
CREATE POLICY "Authenticated users can view bookings"
    ON public.survey_bookings FOR SELECT
    TO authenticated
    USING (true);

-- Admins and office staff can create bookings
CREATE POLICY "Office and admins can insert bookings"
    ON public.survey_bookings FOR INSERT
    TO authenticated
    WITH CHECK (public.is_office_or_admin());

-- Admins and office staff can update any booking (status, notes, rescheduling, etc.)
CREATE POLICY "Office and admins can update bookings"
    ON public.survey_bookings FOR UPDATE
    TO authenticated
    USING (public.is_office_or_admin())
    WITH CHECK (public.is_office_or_admin());

-- Surveyors can update their own bookings (e.g. mark as completed or no_show).
-- Field-level restriction (preventing surveyors from altering surveyor_id,
-- dates, or customer details) is enforced at application level, not here.
CREATE POLICY "Surveyors can update own bookings"
    ON public.survey_bookings FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = survey_bookings.surveyor_id
              AND user_profiles.user_id = auth.uid()
              AND user_profiles.is_surveyor = true
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = survey_bookings.surveyor_id
              AND user_profiles.user_id = auth.uid()
              AND user_profiles.is_surveyor = true
        )
    );

-- Admins and office staff can delete/cancel bookings
CREATE POLICY "Office and admins can delete bookings"
    ON public.survey_bookings FOR DELETE
    TO authenticated
    USING (public.is_office_or_admin());

-- =============================================================================
-- 12. RLS Policies: notifications
-- =============================================================================

-- Users can only read their own notifications
CREATE POLICY "Users can view own notifications"
    ON public.notifications FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = notifications.user_id
              AND user_profiles.user_id = auth.uid()
        )
    );

-- Users can update their own notifications (e.g. mark as read)
CREATE POLICY "Users can update own notifications"
    ON public.notifications FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = notifications.user_id
              AND user_profiles.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.id = notifications.user_id
              AND user_profiles.user_id = auth.uid()
        )
    );

-- Admins and office staff can create notifications (for manual alerts)
CREATE POLICY "Office and admins can insert notifications"
    ON public.notifications FOR INSERT
    TO authenticated
    WITH CHECK (public.is_office_or_admin());

-- Service role has full access (for system-generated booking notifications
-- and reminders created via API routes using SUPABASE_SERVICE_ROLE_KEY)
CREATE POLICY "Service role full access to notifications"
    ON public.notifications
    TO service_role
    USING (true)
    WITH CHECK (true);
