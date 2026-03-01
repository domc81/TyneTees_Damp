-- Migration: Drop orphaned legacy surveyors table
-- The surveyors table has been fully superseded by user_profiles with is_surveyor flag.
-- All application code was migrated in the previous commit.
-- surveys.surveyor_id FK was migrated to reference user_profiles in 20260302000001.
-- Confirmed zero FK constraints reference this table before dropping.

DROP TABLE IF EXISTS public.surveyors CASCADE;
