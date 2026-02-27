-- =============================================================================
-- Migration: survey_installer_info table
-- Date: 2026-02-27
-- Purpose: Standalone installer site information linked 1:1 to surveys.
--          Captures details installers need before arriving on site.
--          Surveyor fills this in during or after the survey.
--
-- Categories stored in site_info JSONB:
--   general_access, electrical, loft, external_works,
--   health_and_safety, ventilation, groundworks
-- =============================================================================

-- 1. Create table
CREATE TABLE public.survey_installer_info (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    survey_id uuid NOT NULL,

    -- Flexible field data grouped by category
    site_info jsonb NOT NULL DEFAULT '{}'::jsonb,

    -- Which categories are relevant for this survey (derived by UI from survey data)
    categories_applicable text[] NOT NULL DEFAULT '{}',

    -- Has the surveyor finished filling this in?
    completed boolean NOT NULL DEFAULT false,

    -- Free-text general installer notes
    notes text,

    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),

    -- Constraints
    CONSTRAINT survey_installer_info_pkey PRIMARY KEY (id),
    CONSTRAINT survey_installer_info_survey_id_key UNIQUE (survey_id),
    CONSTRAINT survey_installer_info_survey_id_fkey
        FOREIGN KEY (survey_id) REFERENCES public.surveys(id) ON DELETE CASCADE
);

-- 2. Comments
COMMENT ON TABLE public.survey_installer_info IS
    'Installer site information linked 1:1 to a survey. Captures access, electrical, loft, external works, H&S, ventilation, and groundworks details that installers need before arriving on site.';
COMMENT ON COLUMN public.survey_installer_info.site_info IS
    'JSONB keyed by category: general_access, electrical, loft, external_works, health_and_safety, ventilation, groundworks. Each key holds an object of category-specific fields.';
COMMENT ON COLUMN public.survey_installer_info.categories_applicable IS
    'Which categories are relevant for this survey, derived by the UI from survey findings (e.g. a condensation-only survey may not need groundworks).';
COMMENT ON COLUMN public.survey_installer_info.completed IS
    'True when the surveyor has finished filling in all applicable categories.';
COMMENT ON COLUMN public.survey_installer_info.notes IS
    'Free-text general notes for the installation team.';

-- 3. Indexes
CREATE INDEX idx_installer_info_survey_id ON public.survey_installer_info USING btree (survey_id);
CREATE INDEX idx_installer_info_completed ON public.survey_installer_info USING btree (completed);
CREATE INDEX idx_installer_info_categories ON public.survey_installer_info USING gin (categories_applicable);
CREATE INDEX idx_installer_info_site_info ON public.survey_installer_info USING gin (site_info);

-- 4. Auto-update trigger for updated_at (reuse existing function)
CREATE TRIGGER set_installer_info_updated_at
    BEFORE UPDATE ON public.survey_installer_info
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

-- 5. Enable Row Level Security
ALTER TABLE public.survey_installer_info ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies

-- All authenticated users can read (office staff, surveyors, admins all need visibility)
CREATE POLICY "Authenticated users can view installer info"
    ON public.survey_installer_info FOR SELECT
    TO authenticated
    USING (true);

-- Only admin and surveyor roles can insert
CREATE POLICY "Admins and surveyors can insert installer info"
    ON public.survey_installer_info FOR INSERT
    TO authenticated
    WITH CHECK (
        public.get_user_role() IN ('admin', 'surveyor')
    );

-- Only admin and surveyor roles can update
CREATE POLICY "Admins and surveyors can update installer info"
    ON public.survey_installer_info FOR UPDATE
    TO authenticated
    USING (
        public.get_user_role() IN ('admin', 'surveyor')
    )
    WITH CHECK (
        public.get_user_role() IN ('admin', 'surveyor')
    );

-- Service role always has full access (for server-side / API route operations)
CREATE POLICY "Service role full access to installer info"
    ON public.survey_installer_info
    TO service_role
    USING (true)
    WITH CHECK (true);
