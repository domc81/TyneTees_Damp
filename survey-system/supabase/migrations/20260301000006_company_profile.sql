-- =============================================================================
-- Migration: company_profile table + company-assets storage bucket
-- =============================================================================
-- Single-row table holding the company's identity, contact details, about text,
-- guarantee info, and T&Cs.  A singleton constraint ensures exactly one row.
--
-- Also creates a public storage bucket for company assets (logo, letterhead).
--
-- RLS: authenticated SELECT + UPDATE; no INSERT/DELETE (seed only).
-- =============================================================================

-- 1. Create table
CREATE TABLE public.company_profile (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Singleton enforcement — only one row can ever exist
    is_singleton    BOOLEAN NOT NULL DEFAULT true UNIQUE CHECK (is_singleton = true),

    -- Identity
    name                        TEXT NOT NULL,
    trading_name                TEXT,
    established_year            INTEGER,

    -- Registered address
    registered_address_line1    TEXT,
    registered_address_line2    TEXT,
    registered_address_city     TEXT,
    registered_address_county   TEXT,
    registered_address_postcode TEXT,

    -- Contact
    phone_primary               TEXT,
    phone_secondary             TEXT,
    email_primary               TEXT,
    email_secondary             TEXT,
    website                     TEXT,

    -- Branding
    logo_url                    TEXT,  -- Supabase Storage URL

    -- Content
    about_us_text               TEXT,
    terms_and_conditions        TEXT,
    default_deposit_note        TEXT,

    -- Guarantee
    guarantee_years             INTEGER DEFAULT 25,
    guarantee_scheme_name       TEXT,

    -- Registration
    company_registration_number TEXT,
    vat_number                  TEXT,

    -- Timestamps
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.company_profile IS 'Singleton table holding the company identity, contact details, about text, guarantee info, and T&Cs.';
COMMENT ON COLUMN public.company_profile.is_singleton IS 'Enforces single-row constraint via UNIQUE + CHECK.';

-- 2. updated_at trigger
CREATE TRIGGER set_company_profile_updated_at
    BEFORE UPDATE ON public.company_profile
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

-- 3. Enable Row Level Security
ALTER TABLE public.company_profile ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies

-- All authenticated staff can read company profile
CREATE POLICY "Authenticated users can view company profile"
    ON public.company_profile FOR SELECT
    TO authenticated
    USING (true);

-- All authenticated staff can update (restrict to admin later if needed)
CREATE POLICY "Authenticated users can update company profile"
    ON public.company_profile FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- No INSERT or DELETE policies — seed data only, singleton row

-- 5. Seed the single row
INSERT INTO public.company_profile (
    name,
    trading_name,
    phone_primary,
    email_primary,
    website,
    established_year,
    guarantee_years,
    guarantee_scheme_name,
    about_us_text,
    terms_and_conditions
) VALUES (
    'Tyne Tees Damp Proofing Ltd',
    'Tyne Tees',
    '0191 XXX XXXX',
    'info@tyneteesdampproofing.co.uk',
    'https://www.tyneteesdampproofing.co.uk',
    1987,
    25,
    'Westminster Protected Guarantee',
    E'Tyne Tees Damp Proofing Ltd is a specialist remedial contractor serving residential and commercial clients across the North East of England, including Tyneside, Wearside, Northumberland and County Durham. Our team has been working in the damp proofing industry since 1987.\n\nWe specialise in the diagnosis and treatment of rising damp, penetrating damp, condensation, timber decay (dry rot and wet rot), woodworm infestation and basement waterproofing. Our surveyors are trained to correctly differentiate between the causes of damp \u2014 ensuring accurate diagnosis and effective treatment first time.\n\nQualifications & Standards\n\nOur surveyors hold the Certificated Surveyor in Remedial Treatments (CSRT) qualification and are Associate members of the Institute of Specialist Surveyors and Engineers (A.Inst.SSE). All survey and treatment works are carried out using only BBA-approved products and in accordance with current industry best practice.\n\nGuarantees\n\nWe offer 25-year company and insurance-backed guarantees for damp proofing and timber treatment works above external ground level. All guarantees cover both materials and labour. Our membrane products carry a 25-year manufacturer\u2019s product guarantee. Insurance-backed guarantees are issued through the Westminster Protected Guarantee scheme, which operates independently of the contractor and does not rely on renewal premiums for continued cover \u2014 providing genuine long-term protection that is fully transferable to future property owners.\n\nOur Track Record\n\nWe maintain a 100% success rate on all damp and timber treatments, with no guarantee claims to date.',
    E'1. A deposit is required prior to the commencement of works as stated in this quotation.\n2. The balance is due upon satisfactory completion of all works.\n3. This quotation is valid for the period stated above from the date of issue.\n4. All specified works are guaranteed against failure as per our standard guarantee documentation.\n5. Access to the property and appropriate working conditions must be provided throughout the works.\n6. Tyne Tees Damp Proofing Ltd reserves the right to revise this quotation should site conditions differ materially from those assessed during the survey.\n7. Any additional works identified and agreed during the course of the project will be charged at our standard rates.'
);

-- =============================================================================
-- 6. Storage bucket: company-assets
-- =============================================================================
-- Public bucket for company logo, letterhead, and other brand assets.
-- Logos must be publicly accessible for inclusion in reports and quotation PDFs.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'company-assets',
    'company-assets',
    true,
    5242880,  -- 5 MB
    ARRAY['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 7. Storage RLS for company-assets bucket

-- All authenticated users can read company assets
CREATE POLICY "Authenticated users can read company assets"
    ON storage.objects FOR SELECT TO authenticated
    USING (bucket_id = 'company-assets');

-- All authenticated users can upload company assets
CREATE POLICY "Authenticated users can upload company assets"
    ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'company-assets');

-- All authenticated users can update company asset metadata
CREATE POLICY "Authenticated users can update company assets"
    ON storage.objects FOR UPDATE TO authenticated
    USING (bucket_id = 'company-assets')
    WITH CHECK (bucket_id = 'company-assets');

-- Only admin can delete company assets
CREATE POLICY "Admin can delete company assets"
    ON storage.objects FOR DELETE TO authenticated
    USING (
        bucket_id = 'company-assets'
        AND EXISTS (
            SELECT 1 FROM public.user_profiles
            WHERE user_profiles.user_id = auth.uid()
              AND user_profiles.role = 'admin'
              AND user_profiles.is_active = true
        )
    );

-- Public read access (bucket is public — needed for report/quotation PDFs)
CREATE POLICY "Public read access for company assets"
    ON storage.objects FOR SELECT TO anon
    USING (bucket_id = 'company-assets');
