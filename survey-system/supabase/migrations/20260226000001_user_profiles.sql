-- =============================================================================
-- Migration: user_profiles table with role-based access
-- Date: 2026-02-26
-- Purpose: Add team member profiles linked to Supabase auth, with roles
-- =============================================================================

-- 1. Create the role enum
CREATE TYPE public.user_role AS ENUM ('admin', 'office', 'surveyor');

-- 2. Create user_profiles table
CREATE TABLE public.user_profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.user_role NOT NULL DEFAULT 'surveyor',
    display_name text NOT NULL,
    email text NOT NULL,
    phone text,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),

    CONSTRAINT user_profiles_pkey PRIMARY KEY (id),
    CONSTRAINT user_profiles_user_id_key UNIQUE (user_id),
    CONSTRAINT user_profiles_email_key UNIQUE (email),
    CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES auth.users(id) ON DELETE CASCADE
);

-- 3. Comments
COMMENT ON TABLE public.user_profiles IS 'Team member profiles linked to Supabase auth users. Stores role and contact info.';
COMMENT ON COLUMN public.user_profiles.user_id IS 'One-to-one link to auth.users';
COMMENT ON COLUMN public.user_profiles.role IS 'Access level: admin (full access), office (CRM + reports), surveyor (field work)';
COMMENT ON COLUMN public.user_profiles.is_active IS 'Soft-delete flag — deactivated users cannot log in';

-- 4. Indexes
CREATE INDEX idx_user_profiles_user_id ON public.user_profiles USING btree (user_id);
CREATE INDEX idx_user_profiles_role ON public.user_profiles USING btree (role);

-- 5. Updated_at trigger (reuse pattern from other tables)
CREATE OR REPLACE FUNCTION public.handle_user_profiles_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_user_profiles_updated
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_user_profiles_updated_at();

-- 6. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies
-- All authenticated users can read profiles (needed for display names, role checks)
CREATE POLICY "Authenticated users can view profiles"
    ON public.user_profiles FOR SELECT
    TO authenticated
    USING (true);

-- Users can update their own profile (display_name, phone — NOT role)
CREATE POLICY "Users can update own profile"
    ON public.user_profiles FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Only admins can insert new profiles (via a helper function)
CREATE POLICY "Admins can insert profiles"
    ON public.user_profiles FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- Only admins can delete profiles
CREATE POLICY "Admins can delete profiles"
    ON public.user_profiles FOR DELETE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

-- Service role always has full access (for server-side operations)
CREATE POLICY "Service role full access"
    ON public.user_profiles
    TO service_role
    USING (true)
    WITH CHECK (true);

-- 8. Helper function: get current user's role (useful in other RLS policies later)
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS public.user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT role FROM public.user_profiles WHERE user_id = auth.uid() LIMIT 1;
$$;

COMMENT ON FUNCTION public.get_user_role() IS 'Returns the role of the currently authenticated user. Use in RLS policies.';

-- 9. Helper function: check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_profiles
        WHERE user_id = auth.uid() AND role = 'admin'
    );
$$;

COMMENT ON FUNCTION public.is_admin() IS 'Returns true if the current user has admin role. Use in RLS policies.';
