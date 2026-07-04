-- =============================================================================
-- Migration: Handover Pack — Guarantee Cleanup
-- =============================================================================
-- Removes Westminster Protected Guarantee references from company_profile.
-- The guarantee_scheme_name and about_us_text are updated to use the generic
-- "Protected Guarantee" wording (Westminster ceased trading).
--
-- The 'handed_over' enquiry status is added to the PostgreSQL enum type.
-- =============================================================================

-- 1. Add 'handed_over' to the enquiry_status enum (after 'completed')
ALTER TYPE public.enquiry_status ADD VALUE IF NOT EXISTS 'handed_over' AFTER 'completed';

-- 3. Update guarantee scheme name
UPDATE public.company_profile
SET guarantee_scheme_name = 'Protected Guarantee',
    updated_at = NOW()
WHERE guarantee_scheme_name LIKE '%Westminster%';

-- 4. Update about_us_text if it references Westminster
UPDATE public.company_profile
SET about_us_text = REPLACE(about_us_text, 'Westminster Protected Guarantee', 'Protected Guarantee'),
    updated_at = NOW()
WHERE about_us_text LIKE '%Westminster%';
