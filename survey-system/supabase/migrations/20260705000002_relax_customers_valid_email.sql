-- Relax customers.valid_email check constraint.
--
-- The original regex '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$'
-- rejected two classes of perfectly valid email addresses:
--   1. Plus-addressed local parts (user+tag@gmail.com) — no '+' in the class
--   2. TLDs longer than 4 chars (.photography, .family, .agency, ...)
--
-- Impact: the enquiry form accepted these addresses, but Convert & Book
-- failed at the customer-creation step with a raw constraint violation,
-- making the enquiry unbookable (found by UX audit 2026-07-05, finding P1-2).
--
-- Applied to the live TTDP database via docker exec on 2026-07-05.

ALTER TABLE customers DROP CONSTRAINT IF EXISTS valid_email;
ALTER TABLE customers ADD CONSTRAINT valid_email
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
