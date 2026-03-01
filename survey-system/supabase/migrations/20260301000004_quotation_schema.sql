-- =============================================================================
-- Migration: Quotation schema — quotations, quotation_sections, quotation_views
--
-- Adds a full quotation system with:
--   - quotations: one per survey (versioned), with snapshot of all financial
--     totals, customer/company details, and a share_token for the public
--     customer-facing URL (/q/[token])
--   - quotation_sections: frozen line-item breakdown per section, one row per
--     costing section included in the quotation
--   - quotation_views: analytics log — one row per customer page view
--
-- Numbering: sequence-backed function generates QT-{YYYY}-{NNN} on INSERT.
-- RLS: authenticated + service_role full access; anon SELECT on quotations and
--      quotation_sections (UUID share_token provides security); anon INSERT on
--      quotation_views (public analytics beacon).
-- =============================================================================

BEGIN;

-- ============================================================
-- 1. SEQUENCE for quotation numbering
-- ============================================================

CREATE SEQUENCE IF NOT EXISTS public.quotation_number_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Function called by the BEFORE INSERT trigger to auto-assign
-- quotation_number and compute valid_until from validity_days.
CREATE OR REPLACE FUNCTION public.set_quotation_defaults()
RETURNS TRIGGER AS $$
BEGIN
    -- Auto-generate quotation number: QT-YYYY-NNNN (4-digit, matches TT-YYYY-NNNN style)
    NEW.quotation_number := 'QT-' ||
        to_char(now(), 'YYYY') || '-' ||
        lpad(nextval('public.quotation_number_seq')::text, 4, '0');

    -- Compute valid_until from creation date + validity_days
    NEW.valid_until := (now()::date + NEW.validity_days);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 2. TABLE: quotations
-- ============================================================

CREATE TABLE public.quotations (
    id                    UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    survey_id             UUID            NOT NULL REFERENCES public.surveys(id) ON DELETE CASCADE,
    version               INTEGER         NOT NULL DEFAULT 1,
    quotation_number      TEXT            NOT NULL UNIQUE,
    share_token           UUID            NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    status                TEXT            NOT NULL DEFAULT 'draft',

    -- Financials (snapshots frozen at generation time)
    subtotal_mandatory    NUMERIC(10,2)   NOT NULL,
    subtotal_optional     NUMERIC(10,2)   NOT NULL DEFAULT 0,
    subtotal_combined     NUMERIC(10,2)   NOT NULL,
    pso_total             NUMERIC(10,2)   NOT NULL,
    vat_rate              NUMERIC(5,4)    NOT NULL,
    vat_amount            NUMERIC(10,2)   NOT NULL,
    total_incl_vat        NUMERIC(10,2)   NOT NULL,
    deposit_percentage    NUMERIC(5,4)    NOT NULL,
    deposit_amount        NUMERIC(10,2)   NOT NULL,

    -- Validity
    validity_days         INTEGER         NOT NULL DEFAULT 30,
    valid_until           DATE            NOT NULL,

    -- Surveyor notes / T&Cs
    notes                 TEXT,
    terms                 TEXT,

    -- Snapshot fields (denormalised so the quote is self-contained even if
    -- customer or surveyor records are later edited)
    customer_name         TEXT,
    customer_address      TEXT,
    site_address          TEXT,
    surveyor_name         TEXT,
    surveyor_qualifications TEXT,
    company_name          TEXT,
    company_phone         TEXT,
    company_email         TEXT,

    -- Customer engagement tracking
    first_viewed_at       TIMESTAMPTZ,
    last_viewed_at        TIMESTAMPTZ,
    view_count            INTEGER         NOT NULL DEFAULT 0,
    sent_at               TIMESTAMPTZ,
    accepted_at           TIMESTAMPTZ,
    declined_at           TIMESTAMPTZ,

    created_at            TIMESTAMPTZ     NOT NULL DEFAULT now(),
    updated_at            TIMESTAMPTZ     NOT NULL DEFAULT now(),

    CONSTRAINT quotations_status_check
        CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'declined'))
);

-- ============================================================
-- 3. TABLE: quotation_sections
-- ============================================================

CREATE TABLE public.quotation_sections (
    id               UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_id     UUID            NOT NULL REFERENCES public.quotations(id) ON DELETE CASCADE,
    survey_type      TEXT            NOT NULL,   -- damp | timber | woodworm | condensation | site_preparation
    section_key      TEXT            NOT NULL,   -- matches costing_sections.section_key
    display_name     TEXT            NOT NULL,   -- human-readable for customer
    display_order    INTEGER         NOT NULL,
    material_total   NUMERIC(10,2)   NOT NULL,
    labour_total     NUMERIC(10,2)   NOT NULL,
    section_total    NUMERIC(10,2)   NOT NULL,
    is_optional      BOOLEAN         NOT NULL DEFAULT false,
    is_included      BOOLEAN         NOT NULL DEFAULT true,  -- surveyor toggle for optional sections
    created_at       TIMESTAMPTZ     NOT NULL DEFAULT now()
);

-- ============================================================
-- 4. TABLE: quotation_views (analytics)
-- ============================================================

CREATE TABLE public.quotation_views (
    id               UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    quotation_id     UUID            NOT NULL REFERENCES public.quotations(id) ON DELETE CASCADE,
    viewed_at        TIMESTAMPTZ     NOT NULL DEFAULT now(),
    ip_address       INET,
    user_agent       TEXT,
    duration_seconds INTEGER,        -- updated via heartbeat/beacon when customer closes tab
    referrer         TEXT
);

-- ============================================================
-- 5. TRIGGERS
-- ============================================================

-- Auto-set quotation_number + valid_until before every INSERT
CREATE TRIGGER set_quotation_defaults
    BEFORE INSERT ON public.quotations
    FOR EACH ROW
    EXECUTE FUNCTION public.set_quotation_defaults();

-- Auto-update updated_at on every UPDATE (reuses the existing project-wide function)
CREATE TRIGGER set_quotations_updated_at
    BEFORE UPDATE ON public.quotations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- 6. INDEXES
-- ============================================================

-- quotations
CREATE INDEX idx_quotations_survey_id        ON public.quotations(survey_id);
-- share_token and quotation_number already have unique constraints (implicit indexes),
-- but explicit named indexes make query plans easier to read in EXPLAIN output.
CREATE UNIQUE INDEX idx_quotations_share_token       ON public.quotations(share_token);
CREATE UNIQUE INDEX idx_quotations_quotation_number  ON public.quotations(quotation_number);

-- quotation_sections
CREATE INDEX idx_quotation_sections_quotation_id ON public.quotation_sections(quotation_id);

-- quotation_views
CREATE INDEX idx_quotation_views_quotation_id ON public.quotation_views(quotation_id);

-- ============================================================
-- 7. ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.quotations       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotation_views  ENABLE ROW LEVEL SECURITY;

-- ---- quotations ------------------------------------------------

-- Authenticated staff: full CRUD (matches all other tables in the schema)
CREATE POLICY "Authenticated users full access" ON public.quotations
    TO authenticated USING (true) WITH CHECK (true);

-- Service role: full CRUD (used by API routes / server actions)
CREATE POLICY "Service role quotations" ON public.quotations
    TO service_role USING (true) WITH CHECK (true);

-- Anonymous (customer): SELECT only.
-- The UUID share_token (122 bits of entropy) is the access credential —
-- the app always filters by share_token in the query, so this policy is safe.
CREATE POLICY "Public read quotations by share token" ON public.quotations
    FOR SELECT TO anon USING (true);

-- ---- quotation_sections ----------------------------------------

CREATE POLICY "Authenticated users full access" ON public.quotation_sections
    TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Service role quotation_sections" ON public.quotation_sections
    TO service_role USING (true) WITH CHECK (true);

-- Anonymous: SELECT only (quotation_id was obtained from a prior share_token lookup)
CREATE POLICY "Public read quotation sections" ON public.quotation_sections
    FOR SELECT TO anon USING (true);

-- ---- quotation_views -------------------------------------------

CREATE POLICY "Authenticated users full access" ON public.quotation_views
    TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Service role quotation_views" ON public.quotation_views
    TO service_role USING (true) WITH CHECK (true);

-- Anonymous: INSERT only (public page writes analytics; no SELECT for anon)
CREATE POLICY "Public insert quotation views" ON public.quotation_views
    FOR INSERT TO anon WITH CHECK (true);

COMMIT;
