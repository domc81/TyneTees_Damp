-- =============================================================================
-- Migration: Handover Pack — Guarantee Cleanup
-- =============================================================================
-- Removes Westminster Protected Guarantee references from company_profile.
-- The guarantee_scheme_name and about_us_text are updated to use the generic
-- "Protected Guarantee" wording (Westminster ceased trading).
--
-- The new 'handed_over' enquiry status does not require a DDL change because
-- enquiries.status is TEXT (not a PostgreSQL enum).
-- =============================================================================

-- 1. Update guarantee scheme name
UPDATE public.company_profile
SET guarantee_scheme_name = 'Protected Guarantee',
    updated_at = NOW()
WHERE guarantee_scheme_name LIKE '%Westminster%';

-- 2. Update about_us_text if it references Westminster
UPDATE public.company_profile
SET about_us_text = REPLACE(about_us_text, 'Westminster Protected Guarantee', 'Protected Guarantee'),
    updated_at = NOW()
WHERE about_us_text LIKE '%Westminster%';
