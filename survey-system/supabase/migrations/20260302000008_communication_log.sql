-- =============================================================================
-- Communication Log
--
-- Audit trail for all outbound (and future inbound) communications.
-- Every sendEmail() call inserts a row here via the service role.
-- Service role bypasses RLS — no INSERT policy needed for logging.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Table
-- ---------------------------------------------------------------------------

CREATE TABLE public.communication_log (
    id               UUID        NOT NULL DEFAULT gen_random_uuid(),
    channel          TEXT        NOT NULL,
    direction        TEXT        NOT NULL DEFAULT 'outbound',
    status           TEXT        NOT NULL,
    recipient_email  TEXT,
    recipient_phone  TEXT,
    recipient_name   TEXT,
    subject          TEXT,
    template_name    TEXT,
    message_id       TEXT,
    error_message    TEXT,
    customer_id      UUID,
    survey_id        UUID,
    quotation_id     UUID,
    booking_id       UUID,
    sent_by          UUID,
    metadata         JSONB,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT communication_log_pkey PRIMARY KEY (id),
    CONSTRAINT communication_log_channel_check
        CHECK (channel IN ('email', 'sms', 'in_app')),
    CONSTRAINT communication_log_direction_check
        CHECK (direction IN ('outbound', 'inbound')),
    CONSTRAINT communication_log_status_check
        CHECK (status IN ('sent', 'failed', 'pending', 'delivered', 'bounced')),

    CONSTRAINT communication_log_customer_id_fkey
        FOREIGN KEY (customer_id) REFERENCES public.customers (id) ON DELETE SET NULL,
    CONSTRAINT communication_log_survey_id_fkey
        FOREIGN KEY (survey_id) REFERENCES public.surveys (id) ON DELETE SET NULL,
    CONSTRAINT communication_log_quotation_id_fkey
        FOREIGN KEY (quotation_id) REFERENCES public.quotations (id) ON DELETE SET NULL,
    CONSTRAINT communication_log_booking_id_fkey
        FOREIGN KEY (booking_id) REFERENCES public.survey_bookings (id) ON DELETE SET NULL,
    CONSTRAINT communication_log_sent_by_fkey
        FOREIGN KEY (sent_by) REFERENCES public.user_profiles (id) ON DELETE SET NULL
);

COMMENT ON TABLE public.communication_log IS
    'Audit trail of every outbound communication sent by the platform.';
COMMENT ON COLUMN public.communication_log.channel IS
    'Communication channel: email | sms | in_app';
COMMENT ON COLUMN public.communication_log.direction IS
    'outbound = sent by the platform; inbound reserved for future use';
COMMENT ON COLUMN public.communication_log.status IS
    'sent | failed | pending | delivered | bounced';
COMMENT ON COLUMN public.communication_log.message_id IS
    'Provider message ID (e.g. Resend email ID) for delivery tracking';
COMMENT ON COLUMN public.communication_log.sent_by IS
    'user_profiles.id of the staff member who triggered the send';

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

CREATE INDEX idx_communication_log_customer
    ON public.communication_log (customer_id);

CREATE INDEX idx_communication_log_survey
    ON public.communication_log (survey_id);

CREATE INDEX idx_communication_log_created
    ON public.communication_log (created_at DESC);

CREATE INDEX idx_communication_log_channel_status
    ON public.communication_log (channel, status);

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

ALTER TABLE public.communication_log ENABLE ROW LEVEL SECURITY;

-- Admins and office staff can read all communication history
CREATE POLICY "Office and admins can view communication log"
    ON public.communication_log FOR SELECT
    TO authenticated
    USING (public.is_office_or_admin());

-- Admins and office staff can manually insert (e.g. logging a phone call in future)
CREATE POLICY "Office and admins can insert communication log"
    ON public.communication_log FOR INSERT
    TO authenticated
    WITH CHECK (public.is_office_or_admin());

-- No UPDATE or DELETE — the log is append-only and immutable
