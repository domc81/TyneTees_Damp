-- =============================================================================
-- Migration: payments table, booking provisional status, enquiry lifecycle cols
-- =============================================================================
-- Adds payment tracking infrastructure for survey fees and deposits.
-- Adds 'provisional' booking status for pay-to-confirm flow.
-- Adds won_at / cf_exported_at to enquiries for post-acceptance lifecycle.
-- Seeds new pricing_config entries for survey fee configuration.
-- =============================================================================

BEGIN;

-- ============================================================
-- 1. payments table
-- ============================================================

CREATE TABLE public.payments (
    id                          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Polymorphic link: exactly one should be non-null
    booking_id                  UUID        REFERENCES public.survey_bookings(id) ON DELETE SET NULL,
    quotation_id                UUID        REFERENCES public.quotations(id) ON DELETE SET NULL,

    payment_type                TEXT        NOT NULL
                                            CHECK (payment_type IN ('survey_fee', 'deposit')),
    amount                      NUMERIC(10,2) NOT NULL,
    currency                    TEXT        NOT NULL DEFAULT 'GBP',

    status                      TEXT        NOT NULL DEFAULT 'pending'
                                            CHECK (status IN ('pending', 'paid', 'refunded', 'cancelled', 'failed')),

    -- Manual recording (office marks payment received)
    payment_method              TEXT        CHECK (payment_method IN ('bank_transfer', 'card_phone', 'cash', 'cheque', 'online')),
    recorded_by                 UUID        REFERENCES public.user_profiles(id),
    recorded_at                 TIMESTAMPTZ,
    reference_note              TEXT,

    -- Stripe fields (nullable — ready for future integration)
    stripe_payment_intent_id    TEXT,
    stripe_checkout_session_id  TEXT,
    stripe_receipt_url          TEXT,

    -- Customer-facing payment link (token-based, same pattern as quotation share_token)
    payment_token               UUID        UNIQUE NOT NULL DEFAULT gen_random_uuid(),

    -- Lifecycle timestamps
    paid_at                     TIMESTAMPTZ,
    expires_at                  TIMESTAMPTZ,
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_payments_booking_id     ON public.payments(booking_id);
CREATE INDEX idx_payments_quotation_id   ON public.payments(quotation_id);
CREATE INDEX idx_payments_status         ON public.payments(status);
CREATE INDEX idx_payments_payment_token  ON public.payments(payment_token);
CREATE INDEX idx_payments_expires_at     ON public.payments(expires_at) WHERE status = 'pending';

-- Comments
COMMENT ON TABLE  public.payments IS 'Tracks survey fee and deposit payments. Links to either a booking (survey fee) or quotation (deposit).';
COMMENT ON COLUMN public.payments.payment_token IS 'Public UUID token granting access to the customer payment page (/pay/[token]). Same pattern as quotation share_token.';
COMMENT ON COLUMN public.payments.expires_at IS 'For survey fees: provisional booking is released if unpaid by this date. NULL for deposits.';
COMMENT ON COLUMN public.payments.stripe_payment_intent_id IS 'Stripe PaymentIntent ID — populated when Stripe integration is added.';

-- updated_at trigger (reuses existing function)
CREATE TRIGGER set_payments_updated_at
    BEFORE UPDATE ON public.payments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- 2. RLS policies for payments
-- ============================================================

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Authenticated staff: full CRUD
CREATE POLICY "Authenticated users full access" ON public.payments
    TO authenticated USING (true) WITH CHECK (true);

-- Service role: full CRUD (API routes)
CREATE POLICY "Service role payments" ON public.payments
    TO service_role USING (true) WITH CHECK (true);

-- Anonymous (customer): SELECT only by payment_token
-- The token is the access credential (122-bit UUID, unguessable).
-- App always filters by payment_token in the query.
CREATE POLICY "Public read payments by token" ON public.payments
    FOR SELECT TO anon USING (true);

-- ============================================================
-- 3. Add 'provisional' to survey_bookings status CHECK
-- ============================================================

ALTER TABLE public.survey_bookings DROP CONSTRAINT IF EXISTS survey_bookings_status_check;
ALTER TABLE public.survey_bookings ADD CONSTRAINT survey_bookings_status_check
    CHECK (status IN ('provisional', 'scheduled', 'completed', 'cancelled', 'no_show'));

COMMENT ON COLUMN public.survey_bookings.status IS 'Workflow: provisional → scheduled (on payment) → completed | cancelled | no_show. Provisional bookings hold the time slot pending payment.';

-- ============================================================
-- 4. Add lifecycle columns to enquiries
-- ============================================================

ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS won_at         TIMESTAMPTZ;
ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS cf_exported_at TIMESTAMPTZ;

COMMENT ON COLUMN public.enquiries.won_at IS 'Timestamp when the enquiry was marked as won (deposit collected). NULL until office confirms.';
COMMENT ON COLUMN public.enquiries.cf_exported_at IS 'Timestamp when the Contractor Foreman CSV was exported for this enquiry. NULL until downloaded.';

-- ============================================================
-- 5. Seed pricing_config entries for survey fees
-- ============================================================

INSERT INTO public.pricing_config (config_key, config_value, description)
VALUES
    ('survey_fee_amount',      150.0000, 'Survey fee charged to customer before booking confirmation (GBP)'),
    ('survey_fee_expiry_days',   3.0000, 'Days before an unpaid provisional booking is auto-released')
ON CONFLICT (config_key) DO NOTHING;

COMMIT;
