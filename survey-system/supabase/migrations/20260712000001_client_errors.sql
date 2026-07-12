-- =============================================================================
-- Client error log — review pt 2 (browser reliability on public pages)
--
-- Populated by POST /api/client-error when an error boundary fires on a
-- customer-facing page (/q, /pay, /report). Gives office/support enough to
-- help a customer who phones in: when, which page (token hashed, never
-- echoed), which browser, what failed.
-- =============================================================================

CREATE TABLE IF NOT EXISTS client_errors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  occurred_at timestamptz NOT NULL DEFAULT now(),
  -- Path with the token replaced by its sha256 prefix, e.g. /q/#a1b2c3d4
  path text NOT NULL,
  user_agent text,
  message text,
  -- Where the report came from: 'error-boundary' | 'global-error' | future sources
  source text NOT NULL DEFAULT 'error-boundary'
);

CREATE INDEX IF NOT EXISTS idx_client_errors_occurred ON client_errors (occurred_at DESC);

-- Service-role only: the API route writes with the service key; no anon or
-- authenticated access needed.
ALTER TABLE client_errors ENABLE ROW LEVEL SECURITY;
