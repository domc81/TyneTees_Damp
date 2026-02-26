-- =============================================================================
-- Migration: Add must_change_password flag to user_profiles
-- Date: 2026-02-26
-- Purpose: Force new team members to change their temporary password on first login
-- =============================================================================

-- 1. Add the column (default true — new users must change password)
ALTER TABLE public.user_profiles
  ADD COLUMN must_change_password boolean NOT NULL DEFAULT true;

COMMENT ON COLUMN public.user_profiles.must_change_password
  IS 'When true, user is redirected to change-password page and cannot access the app until they set a new password.';

-- 2. Set existing users to false (they already have their own passwords)
UPDATE public.user_profiles SET must_change_password = false;
