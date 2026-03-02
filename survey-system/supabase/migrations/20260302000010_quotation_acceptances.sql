-- =============================================================================
-- Migration: quotation_acceptances table + quotations response columns
--
-- Immutable audit trail for customer quotation responses (accept/decline).
-- Complies with:
--   - Consumer Contracts (Information, Cancellation & Additional Charges) Regs 2013
--   - Consumer Rights Act 2015
--   - Electronic Communications Act 2000 / UK eIDAS (typed e-signature)
-- =============================================================================

-- ─── 1. Create quotation_acceptances table ───────────────────────────────────

CREATE TABLE IF NOT EXISTS quotation_acceptances (
  id                             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_id                   UUID NOT NULL
    REFERENCES quotations(id) ON DELETE RESTRICT,
  response                       TEXT NOT NULL
    CHECK (response IN ('accepted', 'declined')),

  -- Typed electronic signature (required for acceptance, null for decline)
  signatory_name                 TEXT,
  signatory_typed_at             TIMESTAMPTZ,

  -- Consent flags — none pre-ticked
  consent_terms_accepted         BOOLEAN NOT NULL DEFAULT false,
  consent_cooling_off_acknowledged BOOLEAN NOT NULL DEFAULT false,
  waive_cooling_off              BOOLEAN NOT NULL DEFAULT false,
  consent_special_orders         BOOLEAN NOT NULL DEFAULT false,

  -- Terms version control — proves exactly what they agreed to
  terms_content_hash             TEXT NOT NULL,
  terms_content_snapshot         TEXT NOT NULL,

  -- Quotation snapshot — proves what financial terms they accepted
  quotation_snapshot             JSONB NOT NULL,

  -- Optional customer message
  customer_notes                 TEXT,

  -- Forensic data
  ip_address                     TEXT NOT NULL,
  user_agent                     TEXT NOT NULL,
  screen_resolution              TEXT,

  -- Timestamps
  responded_at                   TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at                     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for quick lookup by quotation
CREATE INDEX IF NOT EXISTS idx_quotation_acceptances_quotation_id
  ON quotation_acceptances(quotation_id);

-- ─── 2. RLS — append-only, no updates, no deletes ───────────────────────────

ALTER TABLE quotation_acceptances ENABLE ROW LEVEL SECURITY;

-- INSERT: service role only (API route uses service role client).
-- No RLS INSERT policy needed — service role bypasses RLS.

-- SELECT: admin and office roles only
CREATE POLICY "Admin and office can read acceptances"
  ON quotation_acceptances FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
        AND user_profiles.role IN ('admin', 'office')
        AND user_profiles.is_active = true
    )
  );

-- NO UPDATE policy — this table is immutable
-- NO DELETE policy — records must never be removed

-- ─── 3. Add response columns to quotations (if not already present) ─────────

-- accepted_at and declined_at already exist from a previous migration.
-- Add the new columns that don't exist yet.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotations' AND column_name = 'responded_at'
  ) THEN
    ALTER TABLE quotations ADD COLUMN responded_at TIMESTAMPTZ;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotations' AND column_name = 'customer_response_notes'
  ) THEN
    ALTER TABLE quotations ADD COLUMN customer_response_notes TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quotations' AND column_name = 'acceptance_id'
  ) THEN
    ALTER TABLE quotations ADD COLUMN acceptance_id UUID
      REFERENCES quotation_acceptances(id);
  END IF;
END $$;

-- ─── 4. Add 'accepted' and 'declined' to the quotation status check ─────────
-- The quotations table has a CHECK constraint on status. We need to ensure
-- 'accepted' and 'declined' are valid values. Drop and recreate the constraint
-- if it exists, otherwise just add it.

DO $$
DECLARE
  constraint_name TEXT;
BEGIN
  -- Find the existing CHECK constraint on the status column
  SELECT con.conname INTO constraint_name
  FROM pg_constraint con
  JOIN pg_attribute att ON att.attnum = ANY(con.conkey)
    AND att.attrelid = con.conrelid
  WHERE con.conrelid = 'quotations'::regclass
    AND att.attname = 'status'
    AND con.contype = 'c';

  -- Drop existing constraint if found
  IF constraint_name IS NOT NULL THEN
    EXECUTE format('ALTER TABLE quotations DROP CONSTRAINT %I', constraint_name);
  END IF;

  -- Add updated constraint with all valid statuses
  ALTER TABLE quotations ADD CONSTRAINT quotations_status_check
    CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'declined', 'expired', 'superseded'));

EXCEPTION WHEN OTHERS THEN
  -- If the constraint already includes these values, that's fine
  RAISE NOTICE 'Status constraint update skipped: %', SQLERRM;
END $$;
