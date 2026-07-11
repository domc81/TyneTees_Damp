-- =============================================================================
-- Pricing hardening: role-gated RLS, change audit log, smoke-check baselines
-- =============================================================================
-- Closes the gaps documented in docs/workbook-analysis/PRICING_CONTROL_MAP.md
-- discussion (2026-07-11):
--   1. The four pricing tables had `authenticated USING (true)` write policies —
--      any logged-in user (incl. surveyors) could rewrite prices via PostgREST,
--      bypassing the admin-only UI gate. Writes now require an active admin
--      profile; reads stay open (the costing engine runs client-side for all
--      roles).
--   2. No audit trail existed for price changes. A SECURITY DEFINER trigger now
--      records every INSERT/UPDATE/DELETE on the four tables into
--      pricing_change_log with actor, changed fields, and full old/new rows.
--   3. pricing_smoke_baselines stores the last-accepted reference-scenario
--      totals for the in-app smoke check (admin UI recomputes reference jobs
--      after every pricing save and shows the delta).
--
-- Apply: docker exec -i supabase-db-y04kk0wwoswogw0oowcs04gw \
--          psql -U supabase_admin -d postgres < survey-system/supabase/migrations/20260711000007_pricing_rls_audit_baselines.sql

BEGIN;

-- =============================================================================
-- 1. Role helper — is the current PostgREST caller an active admin?
-- =============================================================================
-- SECURITY DEFINER so pricing policies keep working even if user_profiles RLS
-- is tightened later. auth.uid() is the Supabase Auth UUID; user_profiles
-- links to it via user_id (NOT the profile id — see AGENTS.md gotcha).

CREATE OR REPLACE FUNCTION public.is_pricing_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_profiles
    WHERE user_id = auth.uid()
      AND role = 'admin'
      AND is_active = true
  );
$$;

REVOKE ALL ON FUNCTION public.is_pricing_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_pricing_admin() TO authenticated, service_role;

-- =============================================================================
-- 2. Replace open write policies with admin-gated ones
-- =============================================================================

-- pricing_config -------------------------------------------------------------
DROP POLICY IF EXISTS "Authenticated insert pricing_config" ON public.pricing_config;
DROP POLICY IF EXISTS "Authenticated update pricing_config" ON public.pricing_config;
DROP POLICY IF EXISTS "Authenticated delete pricing_config" ON public.pricing_config;

CREATE POLICY "Pricing admins insert pricing_config" ON public.pricing_config
  FOR INSERT TO authenticated WITH CHECK (public.is_pricing_admin());
CREATE POLICY "Pricing admins update pricing_config" ON public.pricing_config
  FOR UPDATE TO authenticated USING (public.is_pricing_admin()) WITH CHECK (public.is_pricing_admin());
CREATE POLICY "Pricing admins delete pricing_config" ON public.pricing_config
  FOR DELETE TO authenticated USING (public.is_pricing_admin());

-- costing_line_templates -------------------------------------------------------
DROP POLICY IF EXISTS "Authenticated insert costing_line_templates" ON public.costing_line_templates;
DROP POLICY IF EXISTS "Authenticated update costing_line_templates" ON public.costing_line_templates;
DROP POLICY IF EXISTS "Authenticated delete costing_line_templates" ON public.costing_line_templates;

CREATE POLICY "Pricing admins insert costing_line_templates" ON public.costing_line_templates
  FOR INSERT TO authenticated WITH CHECK (public.is_pricing_admin());
CREATE POLICY "Pricing admins update costing_line_templates" ON public.costing_line_templates
  FOR UPDATE TO authenticated USING (public.is_pricing_admin()) WITH CHECK (public.is_pricing_admin());
CREATE POLICY "Pricing admins delete costing_line_templates" ON public.costing_line_templates
  FOR DELETE TO authenticated USING (public.is_pricing_admin());

-- costing_sections -------------------------------------------------------------
DROP POLICY IF EXISTS "Authenticated insert costing_sections" ON public.costing_sections;
DROP POLICY IF EXISTS "Authenticated update costing_sections" ON public.costing_sections;
DROP POLICY IF EXISTS "Authenticated delete costing_sections" ON public.costing_sections;

CREATE POLICY "Pricing admins insert costing_sections" ON public.costing_sections
  FOR INSERT TO authenticated WITH CHECK (public.is_pricing_admin());
CREATE POLICY "Pricing admins update costing_sections" ON public.costing_sections
  FOR UPDATE TO authenticated USING (public.is_pricing_admin()) WITH CHECK (public.is_pricing_admin());
CREATE POLICY "Pricing admins delete costing_sections" ON public.costing_sections
  FOR DELETE TO authenticated USING (public.is_pricing_admin());

-- materials_catalog ------------------------------------------------------------
-- Had a single ALL policy; split into open read + admin-gated writes.
DROP POLICY IF EXISTS "Authenticated users full access" ON public.materials_catalog;

CREATE POLICY "Authenticated read materials_catalog" ON public.materials_catalog
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Pricing admins insert materials_catalog" ON public.materials_catalog
  FOR INSERT TO authenticated WITH CHECK (public.is_pricing_admin());
CREATE POLICY "Pricing admins update materials_catalog" ON public.materials_catalog
  FOR UPDATE TO authenticated USING (public.is_pricing_admin()) WITH CHECK (public.is_pricing_admin());
CREATE POLICY "Pricing admins delete materials_catalog" ON public.materials_catalog
  FOR DELETE TO authenticated USING (public.is_pricing_admin());

-- =============================================================================
-- 3. Audit log — every change to the four pricing tables
-- =============================================================================

CREATE TABLE public.pricing_change_log (
  id              bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  changed_at      timestamptz NOT NULL DEFAULT now(),
  table_name      text        NOT NULL,
  row_pk          text        NOT NULL,
  row_label       text,
  operation       text        NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
  changed_by      uuid,   -- auth.users.id (auth.uid()); NULL for migrations/service jobs
  changed_by_name text,   -- display_name snapshot at change time (audit-correct even if renamed later)
  changed_fields  text[], -- UPDATE only; NULL for INSERT/DELETE
  old_values      jsonb,
  new_values      jsonb
);

CREATE INDEX idx_pricing_change_log_table_row ON public.pricing_change_log (table_name, row_pk, changed_at DESC);
CREATE INDEX idx_pricing_change_log_changed_at ON public.pricing_change_log (changed_at DESC);

ALTER TABLE public.pricing_change_log ENABLE ROW LEVEL SECURITY;

-- Read: pricing admins only. No authenticated write policies — the ONLY writer
-- is the SECURITY DEFINER trigger below (runs as table owner, bypasses RLS).
CREATE POLICY "Pricing admins read change log" ON public.pricing_change_log
  FOR SELECT TO authenticated USING (public.is_pricing_admin());
CREATE POLICY "Service role change log" ON public.pricing_change_log
  TO service_role USING (true) WITH CHECK (true);

GRANT SELECT ON public.pricing_change_log TO authenticated;
GRANT ALL ON public.pricing_change_log TO service_role;

CREATE OR REPLACE FUNCTION public.log_pricing_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_old        jsonb := CASE WHEN TG_OP = 'INSERT' THEN NULL ELSE to_jsonb(OLD) END;
  v_new        jsonb := CASE WHEN TG_OP = 'DELETE' THEN NULL ELSE to_jsonb(NEW) END;
  v_changed    text[];
  v_actor      uuid := auth.uid();
  v_actor_name text;
BEGIN
  IF TG_OP = 'UPDATE' THEN
    SELECT array_agg(k ORDER BY k) INTO v_changed
    FROM jsonb_object_keys(v_new) AS k
    WHERE k <> 'updated_at'
      AND (v_old -> k) IS DISTINCT FROM (v_new -> k);

    -- Timestamp-only / no-op update: don't log noise
    IF v_changed IS NULL THEN
      RETURN NEW;
    END IF;
  END IF;

  IF v_actor IS NOT NULL THEN
    SELECT display_name INTO v_actor_name
    FROM public.user_profiles WHERE user_id = v_actor;
  END IF;

  INSERT INTO public.pricing_change_log
    (table_name, row_pk, row_label, operation, changed_by, changed_by_name,
     changed_fields, old_values, new_values)
  VALUES (
    TG_TABLE_NAME,
    COALESCE(v_new ->> 'id', v_old ->> 'id'),
    CASE TG_TABLE_NAME
      WHEN 'pricing_config'         THEN COALESCE(v_new ->> 'config_key',   v_old ->> 'config_key')
      WHEN 'materials_catalog'      THEN COALESCE(v_new ->> 'name',         v_old ->> 'name')
      WHEN 'costing_line_templates' THEN COALESCE(v_new ->> 'description',  v_old ->> 'description')
      WHEN 'costing_sections'       THEN COALESCE(v_new ->> 'section_name', v_old ->> 'section_name')
    END,
    TG_OP,
    v_actor,
    v_actor_name,
    v_changed,
    v_old,
    v_new
  );

  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER trg_audit_pricing_config
  AFTER INSERT OR UPDATE OR DELETE ON public.pricing_config
  FOR EACH ROW EXECUTE FUNCTION public.log_pricing_change();

CREATE TRIGGER trg_audit_materials_catalog
  AFTER INSERT OR UPDATE OR DELETE ON public.materials_catalog
  FOR EACH ROW EXECUTE FUNCTION public.log_pricing_change();

CREATE TRIGGER trg_audit_costing_line_templates
  AFTER INSERT OR UPDATE OR DELETE ON public.costing_line_templates
  FOR EACH ROW EXECUTE FUNCTION public.log_pricing_change();

CREATE TRIGGER trg_audit_costing_sections
  AFTER INSERT OR UPDATE OR DELETE ON public.costing_sections
  FOR EACH ROW EXECUTE FUNCTION public.log_pricing_change();

-- =============================================================================
-- 4. Smoke-check baselines — last-accepted reference-scenario totals
-- =============================================================================

CREATE TABLE public.pricing_smoke_baselines (
  scenario_id text PRIMARY KEY,
  label       text  NOT NULL,
  totals      jsonb NOT NULL,                  -- { subtotal_ex_vat, total_inc_vat, labour_hours, line_count, ... }
  sections    jsonb NOT NULL DEFAULT '{}'::jsonb, -- { section_key: total }
  accepted_at timestamptz NOT NULL DEFAULT now(),
  accepted_by uuid REFERENCES public.user_profiles(id) ON DELETE SET NULL
);

ALTER TABLE public.pricing_smoke_baselines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pricing admins read baselines" ON public.pricing_smoke_baselines
  FOR SELECT TO authenticated USING (public.is_pricing_admin());
CREATE POLICY "Pricing admins insert baselines" ON public.pricing_smoke_baselines
  FOR INSERT TO authenticated WITH CHECK (public.is_pricing_admin());
CREATE POLICY "Pricing admins update baselines" ON public.pricing_smoke_baselines
  FOR UPDATE TO authenticated USING (public.is_pricing_admin()) WITH CHECK (public.is_pricing_admin());
CREATE POLICY "Pricing admins delete baselines" ON public.pricing_smoke_baselines
  FOR DELETE TO authenticated USING (public.is_pricing_admin());
CREATE POLICY "Service role baselines" ON public.pricing_smoke_baselines
  TO service_role USING (true) WITH CHECK (true);

GRANT ALL ON public.pricing_smoke_baselines TO authenticated;
GRANT ALL ON public.pricing_smoke_baselines TO service_role;

COMMIT;
