-- =============================================================================
-- Migration: Fix Realtime publication for notifications + missing updated_at triggers
-- Date: 2026-03-02
-- Purpose:
--   1. Add notifications table to supabase_realtime publication so that
--      Postgres Changes events are broadcast to the NotificationBell component.
--   2. Safely recreate updated_at triggers on survey_bookings and
--      surveyor_availability that were defined in the previous migration but
--      are absent from the live database.
-- =============================================================================

-- 1. Add notifications to Realtime publication
-- The table was created in migration 20260302000004 but never added to the
-- supabase_realtime publication, so INSERT events were never broadcast.
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- 2. Recreate updated_at triggers (safe — drops first in case partially applied)
DROP TRIGGER IF EXISTS set_survey_bookings_updated_at       ON public.survey_bookings;
DROP TRIGGER IF EXISTS set_surveyor_availability_updated_at ON public.surveyor_availability;

CREATE TRIGGER set_survey_bookings_updated_at
    BEFORE UPDATE ON public.survey_bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER set_surveyor_availability_updated_at
    BEFORE UPDATE ON public.surveyor_availability
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();
