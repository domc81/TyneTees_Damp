-- One-off resync of denormalised contact/site details from enquiries.
--
-- Pipeline edits historically wrote to enquiries only; surveys.client_name/site_*
-- and survey_bookings.customer_* kept the values copied at Convert & Book.
-- Going forward the app propagates edits (propagateEnquiryContactDetails in
-- src/lib/supabase-data.ts); this migration repairs rows that drifted before
-- that shipped.
--
-- Scope: active pipeline stages only. Won/closed/lost jobs and completed/
-- cancelled/no_show bookings stay as historical snapshots, as do quotations
-- and reports (intentionally frozen at generation time).

BEGIN;

-- 1. Surveys: pull display columns from their enquiry where they differ
UPDATE public.surveys s
SET
    client_name        = e.client_name,
    site_address       = COALESCE(e.site_address_1, ''),
    site_address_line2 = e.site_address_2,
    site_city          = e.site_city,
    site_county        = e.site_county,
    site_postcode      = e.site_postcode
FROM public.enquiries e
WHERE e.id = s.enquiry_id
  AND e.status IN ('awaiting_payment', 'booked', 'survey_complete', 'sent', 'on_hold')
  AND (
       s.client_name        IS DISTINCT FROM e.client_name
    OR s.site_address       IS DISTINCT FROM COALESCE(e.site_address_1, '')
    OR s.site_address_line2 IS DISTINCT FROM e.site_address_2
    OR s.site_city          IS DISTINCT FROM e.site_city
    OR s.site_county        IS DISTINCT FROM e.site_county
    OR s.site_postcode      IS DISTINCT FROM e.site_postcode
  );

-- 2. Live bookings: pull the calendar's denormalised customer columns from the enquiry
UPDATE public.survey_bookings b
SET
    customer_name    = COALESCE(e.client_name, ''),
    customer_phone   = e.client_phone,
    customer_email   = e.client_email,
    customer_address = NULLIF(
        concat_ws(', ', e.site_address_1, e.site_address_2, e.site_city, e.site_county, e.site_postcode),
        ''
    )
FROM public.surveys s
JOIN public.enquiries e ON e.id = s.enquiry_id
WHERE b.survey_id = s.id
  AND b.status IN ('provisional', 'scheduled')
  AND e.status IN ('awaiting_payment', 'booked', 'survey_complete', 'sent', 'on_hold')
  AND (
       b.customer_name    IS DISTINCT FROM COALESCE(e.client_name, '')
    OR b.customer_phone   IS DISTINCT FROM e.client_phone
    OR b.customer_email   IS DISTINCT FROM e.client_email
    OR b.customer_address IS DISTINCT FROM NULLIF(
        concat_ws(', ', e.site_address_1, e.site_address_2, e.site_city, e.site_county, e.site_postcode),
        ''
    )
  );

COMMIT;
