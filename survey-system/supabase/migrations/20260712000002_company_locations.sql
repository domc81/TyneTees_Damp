-- =============================================================================
-- Company locations — review pt 9
--
-- Central record for the registered office, regional offices, service areas
-- and regional contact numbers. Replaces the literals hardcoded in
-- ReportFooter.tsx so admin can update a location once, centrally.
--
-- type semantics:
--   registered      — the registered office (address renders with company no.)
--   regional_office — postal address rendered as an office
--   service_area    — town name only, NEVER rendered as a postal office
--   contact_number  — label + phone for the regional contact column
-- =============================================================================

CREATE TABLE IF NOT EXISTS company_locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  type text NOT NULL CHECK (type IN ('registered', 'regional_office', 'service_area', 'contact_number')),
  address_line1 text,
  address_line2 text,
  city text,
  county text,
  postcode text,
  phone text,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Service-role only (same pattern as company_profile writes): all app access
-- goes through server routes; no anon/authenticated policies.
ALTER TABLE company_locations ENABLE ROW LEVEL SECURITY;

-- Seed — Steven's approved list (review 11 Jul 2026, point 9)
INSERT INTO company_locations (label, type, address_line1, address_line2, city, county, postcode, phone, display_order)
VALUES
  ('Registered Office', 'registered', 'The Town Hall Conference & Business Centre', 'High Street East', 'Wallsend', 'Tyne & Wear', 'NE28 7AT', NULL, 0),
  ('South Shields', 'regional_office', 'South Shields Business Works', 'Henry Robson Way', 'South Shields', NULL, 'NE33 1RF', NULL, 10),
  ('Blyth', 'regional_office', 'Blyth Community Enterprise Centre', 'Ridley Street, Quayside', 'Blyth', NULL, 'NE24 3AG', NULL, 20),
  ('Corbridge', 'regional_office', 'Tinklers Yard', 'Corbridge Business Centre', 'Corbridge', NULL, 'NE45 5SB', NULL, 30),
  ('Sunderland', 'regional_office', 'Liberty Way', 'North Sands Business Centre', 'Sunderland', NULL, 'SR6 0QA', NULL, 40),
  ('Whitley Bay', 'service_area', NULL, NULL, NULL, NULL, NULL, NULL, 50),
  ('North Shields', 'service_area', NULL, NULL, NULL, NULL, NULL, NULL, 60),
  ('Durham', 'service_area', NULL, NULL, NULL, NULL, NULL, NULL, 70),
  ('Tyneside', 'contact_number', NULL, NULL, NULL, NULL, NULL, '0191 814 1613', 80),
  ('Wearside', 'contact_number', NULL, NULL, NULL, NULL, NULL, '0191 500 1097', 90),
  ('Northumberland', 'contact_number', NULL, NULL, NULL, NULL, NULL, '01434 303 725', 100),
  ('Durham', 'contact_number', NULL, NULL, NULL, NULL, NULL, '0191 300 3625', 110);
