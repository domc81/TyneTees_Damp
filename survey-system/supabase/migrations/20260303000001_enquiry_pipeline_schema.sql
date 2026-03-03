-- =============================================================================
-- Migration: Enquiry Pipeline — Schema Foundation
-- Date: 2026-03-03
-- Purpose:
--   Adds pipeline management columns to enquiries, creates the enquiry_activity
--   audit table, on_hold_message_templates lookup table, triggers for updated_at
--   and status_changed_at, RLS policies, and links communication_log to enquiries.
--
-- Sections:
--   1. New enum: on_hold_reason
--   2. New enum: enquiry_priority
--   3. New enum: enquiry_activity_type
--   4. ALTER TABLE enquiries — add pipeline columns + indexes
--   5. CREATE TABLE enquiry_activity (immutable audit log)
--   6. CREATE TABLE on_hold_message_templates + seed data
--   7. Triggers (updated_at on enquiries + on_hold_message_templates,
--      status_changed_at on enquiries)
--   8. RLS policies on new tables
--   9. Add enquiry_id to communication_log
-- =============================================================================


-- =============================================================================
-- 1. NEW ENUM: on_hold_reason
-- =============================================================================

CREATE TYPE public.on_hold_reason AS ENUM (
    'awaiting_supplier',
    'awaiting_customer_info',
    'scheduling_conflict',
    'specialist_assessment',
    'customer_requested',
    'other'
);

COMMENT ON TYPE public.on_hold_reason IS 'Structured reasons for placing an enquiry on hold. Used in enquiries.hold_reason and on_hold_message_templates.reason_key.';


-- =============================================================================
-- 2. NEW ENUM: enquiry_priority
-- =============================================================================

CREATE TYPE public.enquiry_priority AS ENUM ('low', 'medium', 'high', 'urgent');

COMMENT ON TYPE public.enquiry_priority IS 'Visual priority levels for enquiry pipeline board.';


-- =============================================================================
-- 3. NEW ENUM: enquiry_activity_type
-- =============================================================================

CREATE TYPE public.enquiry_activity_type AS ENUM (
    'status_change',
    'assignment_change',
    'note_added',
    'call_logged',
    'email_sent',
    'survey_created',
    'quotation_generated',
    'quotation_sent',
    'customer_notified',
    'follow_up_set',
    'priority_changed',
    'on_hold_reason_set',
    'created'
);

COMMENT ON TYPE public.enquiry_activity_type IS 'Categorises entries in the enquiry_activity audit log.';


-- =============================================================================
-- 4. ALTER TABLE enquiries — Add pipeline columns
-- =============================================================================

-- Link to customer record (nullable — existing enquiries don't have this)
ALTER TABLE public.enquiries
    ADD COLUMN customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL;

-- Who owns this enquiry (nullable)
ALTER TABLE public.enquiries
    ADD COLUMN assigned_to UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL;

-- Visual priority for pipeline board
ALTER TABLE public.enquiries
    ADD COLUMN priority public.enquiry_priority DEFAULT 'medium';

-- When to follow up next (nullable, used for SLA tracking)
ALTER TABLE public.enquiries
    ADD COLUMN follow_up_date DATE;

-- Expected job value for pipeline forecasting (nullable)
ALTER TABLE public.enquiries
    ADD COLUMN estimated_value NUMERIC(10,2);

-- Why was this declined? Only relevant when status = 'declined' (nullable)
ALTER TABLE public.enquiries
    ADD COLUMN loss_reason TEXT;

-- Required when status = 'on_hold' (nullable otherwise)
ALTER TABLE public.enquiries
    ADD COLUMN hold_reason public.on_hold_reason;

-- Optional extra context for the on_hold reason (nullable)
ALTER TABLE public.enquiries
    ADD COLUMN hold_reason_note TEXT;

-- When the status last changed — used for SLA calculations
ALTER TABLE public.enquiries
    ADD COLUMN status_changed_at TIMESTAMPTZ DEFAULT now();

-- Indexes for the new columns
CREATE INDEX idx_enquiries_customer_id
    ON public.enquiries(customer_id);

CREATE INDEX idx_enquiries_assigned_to
    ON public.enquiries(assigned_to);

CREATE INDEX idx_enquiries_follow_up_date
    ON public.enquiries(follow_up_date)
    WHERE follow_up_date IS NOT NULL;

CREATE INDEX idx_enquiries_status_changed_at
    ON public.enquiries(status_changed_at);


-- =============================================================================
-- 5. CREATE TABLE enquiry_activity
-- =============================================================================
-- Immutable audit/timeline table. Rows are only ever inserted, never updated
-- or deleted (enforced by RLS — no UPDATE/DELETE policies for regular users).

CREATE TABLE public.enquiry_activity (
    id              UUID            NOT NULL DEFAULT gen_random_uuid(),
    enquiry_id      UUID            NOT NULL,
    user_id         UUID,
    activity_type   public.enquiry_activity_type NOT NULL,
    title           TEXT            NOT NULL,
    description     TEXT,
    metadata        JSONB           DEFAULT '{}',
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT now(),

    CONSTRAINT enquiry_activity_pkey PRIMARY KEY (id),
    CONSTRAINT enquiry_activity_enquiry_id_fkey
        FOREIGN KEY (enquiry_id) REFERENCES public.enquiries(id) ON DELETE CASCADE,
    CONSTRAINT enquiry_activity_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES public.user_profiles(id) ON DELETE SET NULL
);

COMMENT ON TABLE public.enquiry_activity IS 'Immutable audit log for enquiry pipeline events. Rows are insert-only — no updates or deletes.';
COMMENT ON COLUMN public.enquiry_activity.user_id IS 'Who performed the action. NULL for system-generated events.';
COMMENT ON COLUMN public.enquiry_activity.title IS 'Short human-readable summary, e.g. "Status changed to quoted".';
COMMENT ON COLUMN public.enquiry_activity.metadata IS 'Structured data: status_change has {old_status, new_status}, assignment_change has {old_assignee_id, new_assignee_id, new_assignee_name}, etc.';

-- Indexes
CREATE INDEX idx_enquiry_activity_enquiry_id
    ON public.enquiry_activity(enquiry_id);

CREATE INDEX idx_enquiry_activity_created_at
    ON public.enquiry_activity(created_at DESC);

CREATE INDEX idx_enquiry_activity_type
    ON public.enquiry_activity(activity_type);


-- =============================================================================
-- 6. CREATE TABLE on_hold_message_templates + seed data
-- =============================================================================
-- Lookup table for on-hold customer notification messages. Editable by the
-- business without a code deployment.

CREATE TABLE public.on_hold_message_templates (
    id              UUID            NOT NULL DEFAULT gen_random_uuid(),
    reason_key      public.on_hold_reason NOT NULL,
    display_label   TEXT            NOT NULL,
    customer_message TEXT           NOT NULL,
    display_order   INTEGER         NOT NULL DEFAULT 0,
    is_active       BOOLEAN         NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ     NOT NULL DEFAULT now(),

    CONSTRAINT on_hold_message_templates_pkey PRIMARY KEY (id),
    CONSTRAINT on_hold_message_templates_reason_key_key UNIQUE (reason_key)
);

COMMENT ON TABLE public.on_hold_message_templates IS 'Lookup table for customer-facing on-hold notification messages. One template per on_hold_reason. Editable via admin UI.';
COMMENT ON COLUMN public.on_hold_message_templates.reason_key IS 'Maps 1:1 to the on_hold_reason enum values.';
COMMENT ON COLUMN public.on_hold_message_templates.display_label IS 'What appears in the dropdown when selecting a hold reason.';
COMMENT ON COLUMN public.on_hold_message_templates.customer_message IS 'The message sent to the customer when their enquiry is placed on hold.';

-- Seed the 6 default templates
INSERT INTO public.on_hold_message_templates (reason_key, display_label, customer_message, display_order)
VALUES
    ('awaiting_supplier',
     'Awaiting further supplier information',
     'We need a bit more detail from one of our suppliers before we can finalise your quote',
     1),

    ('awaiting_customer_info',
     'Awaiting further information',
     'We need a bit more detail from you before we can finalise your quote. A member of the team will be in touch shortly to discuss this',
     2),

    ('scheduling_conflict',
     'Scheduling conflict',
     'We''re experiencing an abnormally high workload at the moment and are working on rescheduling. We endeavour to complete your request as quickly as possible',
     3),

    ('specialist_assessment',
     'Awaiting specialist assessment',
     'We''re arranging a specialist review of elements of your survey and job requirements to ensure accuracy',
     4),

    ('customer_requested',
     'Customer requested delay',
     'As requested, we''ve paused this for now',
     5),

    ('other',
     'Other',
     'We''re currently reviewing your enquiry and will be in touch shortly with an update. Thank you for your patience',
     6);


-- =============================================================================
-- 7. TRIGGERS
-- =============================================================================

-- 7A. updated_at trigger on enquiries
-- The initial schema defined this trigger, but the live DB investigation found
-- it missing. Safe recreate: drop if exists, then create.
DROP TRIGGER IF EXISTS set_enquiries_updated_at ON public.enquiries;

CREATE TRIGGER set_enquiries_updated_at
    BEFORE UPDATE ON public.enquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

-- 7B. updated_at trigger on on_hold_message_templates
CREATE TRIGGER set_on_hold_message_templates_updated_at
    BEFORE UPDATE ON public.on_hold_message_templates
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at();

-- 7C. status_changed_at trigger on enquiries
-- Fires BEFORE UPDATE and sets status_changed_at = now() only when the
-- status column actually changes.
CREATE OR REPLACE FUNCTION public.update_enquiry_status_changed_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        NEW.status_changed_at = now();
    END IF;
    RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.update_enquiry_status_changed_at() IS 'Sets status_changed_at timestamp when the enquiry status column changes. Used for SLA tracking.';

CREATE TRIGGER set_enquiries_status_changed_at
    BEFORE UPDATE ON public.enquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.update_enquiry_status_changed_at();


-- =============================================================================
-- 8. RLS POLICIES
-- =============================================================================

-- --- enquiry_activity ---
ALTER TABLE public.enquiry_activity ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read all activity entries (same open policy as enquiries)
CREATE POLICY "Authenticated users can view enquiry activity"
    ON public.enquiry_activity FOR SELECT
    TO authenticated
    USING (true);

-- Authenticated users can insert activity entries (logging actions)
CREATE POLICY "Authenticated users can insert enquiry activity"
    ON public.enquiry_activity FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- No UPDATE or DELETE policies — the audit log is immutable for regular users

-- Service role has full access (system operations, migrations, cleanup)
CREATE POLICY "Service role full access to enquiry activity"
    ON public.enquiry_activity FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- --- on_hold_message_templates ---
ALTER TABLE public.on_hold_message_templates ENABLE ROW LEVEL SECURITY;

-- All authenticated users can read templates (needed for dropdown population)
CREATE POLICY "Authenticated users can view on-hold templates"
    ON public.on_hold_message_templates FOR SELECT
    TO authenticated
    USING (true);

-- Only admin/office can insert new templates
CREATE POLICY "Office and admins can insert on-hold templates"
    ON public.on_hold_message_templates FOR INSERT
    TO authenticated
    WITH CHECK (public.is_office_or_admin());

-- Only admin/office can update templates
CREATE POLICY "Office and admins can update on-hold templates"
    ON public.on_hold_message_templates FOR UPDATE
    TO authenticated
    USING (public.is_office_or_admin())
    WITH CHECK (public.is_office_or_admin());

-- Only admin/office can delete templates
CREATE POLICY "Office and admins can delete on-hold templates"
    ON public.on_hold_message_templates FOR DELETE
    TO authenticated
    USING (public.is_office_or_admin());

-- Service role has full access
CREATE POLICY "Service role full access to on-hold templates"
    ON public.on_hold_message_templates FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);


-- =============================================================================
-- 9. ADD enquiry_id TO communication_log
-- =============================================================================

ALTER TABLE public.communication_log
    ADD COLUMN enquiry_id UUID REFERENCES public.enquiries(id) ON DELETE SET NULL;

CREATE INDEX idx_communication_log_enquiry_id
    ON public.communication_log(enquiry_id)
    WHERE enquiry_id IS NOT NULL;

COMMENT ON COLUMN public.communication_log.enquiry_id IS 'Links emails/SMS sent about an enquiry back to it for the activity timeline.';
