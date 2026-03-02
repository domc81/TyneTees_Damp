// =============================================================================
// Cron Authentication — validates Bearer token against CRON_SECRET env var.
//
// Used by scheduled task endpoints (e.g. /api/cron/booking-reminders) to ensure
// only authorised callers (Coolify cron jobs) can trigger them.
//
// Fail-closed: if CRON_SECRET is not set, always returns false.
// =============================================================================

/**
 * Validate that the request carries a valid cron secret in the Authorization header.
 *
 * Expects: `Authorization: Bearer <token>`
 * Compares against `process.env.CRON_SECRET`.
 *
 * Returns `true` if the token matches, `false` otherwise.
 * If CRON_SECRET is not configured, always returns `false` (fail-closed).
 */
export function validateCronSecret(request: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false

  const authHeader = request.headers.get('authorization') || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''

  return token.length > 0 && token === secret
}
