-- =============================================================================
-- Migration: Set REPLICA IDENTITY FULL on notifications table
-- Date: 2026-03-03
-- Purpose:
--   Fix "mismatch between server and client bindings for postgres changes"
--   error in the NotificationBell Realtime subscription.
--
--   The client subscribes with filter: user_id=eq.<uuid>
--   but REPLICA IDENTITY DEFAULT only includes the PK (id) in WAL output.
--   The Realtime server cannot evaluate the user_id filter without FULL
--   replica identity, which includes all columns in the WAL stream.
-- =============================================================================

ALTER TABLE public.notifications REPLICA IDENTITY FULL;
