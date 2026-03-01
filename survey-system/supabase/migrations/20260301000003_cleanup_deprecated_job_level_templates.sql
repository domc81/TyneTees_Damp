-- =============================================================================
-- Migration: Clean up deprecated per-type job-level templates
--
-- Background: Phase 3 introduced a single site_preparation survey type that
-- emits skip hire, antinox floor protection, bag & cart debris, and licensed
-- disposal once per job. The equivalent templates that existed under each
-- per-type section (damp, timber, woodworm, condensation) are now unused.
--
-- Verification: All 13 deprecated templates have costing_line_count = 0 in
-- survey_costing_lines — no historical records are affected.
--
-- Mapping code: survey-mapping.ts mapSitePreparation() uses
-- lookupCache.site_preparation exclusively for these line items. The per-type
-- lookups no longer reference these keys.
-- =============================================================================

BEGIN;

-- ============================================================
-- 1. Delete per-type job-level templates from sections that
--    still contain active treatment templates (sections survive)
-- ============================================================

-- damp / preparatory_work: remove floor_protection_boards
-- (section retains: remove_radiators_valves, remove_socket_fronts,
--  skirting_board_removal, strip_wallpaper)
DELETE FROM costing_line_templates
WHERE id = '21037768-e1c4-4f1f-aac4-630d19a44286'; -- damp:preparatory_work:floor_protection_boards

-- damp / strip_out: remove bag_cart_debris and licensed_disposal
-- (section retains: remove_plaster_walls, remove_stud_walls,
--  plaster_removal_ceilings, strip_timber_floor_gf, scrape_subfloors)
DELETE FROM costing_line_templates
WHERE id IN (
  'f188d94d-1daa-4026-ba32-b612329dd0c0', -- damp:strip_out:bag_cart_debris
  '59379245-7fda-412f-a4e6-9d1fa5467241'  -- damp:strip_out:licensed_disposal
);

-- timber / preparatory_work: remove antinox_hd_floor_protection_boards_24m_x_12m
-- (section retains: remove_radiators_cap_valves, remove_socket_fronts_and_isolate,
--  skirting_board_removal_set_aside, strip_wall_paper)
DELETE FROM costing_line_templates
WHERE id = 'c83ee94f-07ec-4cb0-a0f5-341d5d20d81f'; -- timber:preparatory_work:antinox_hd_floor_protection_boards_24m_x_12m

-- timber / strip_out: remove bag_up_debris_cart_outside and disposal_via_licensed_transfer_agent
-- (section retains 8 other templates including remove_carpettilesoverlays,
--  remove_plasterrender_walls, strip_out_existing_timber_floor_gf, etc.)
DELETE FROM costing_line_templates
WHERE id IN (
  '7e6ea457-725b-466c-9fb3-3d51f5e5a30e', -- timber:strip_out:bag_up_debris_cart_outside
  '2fa35e07-b423-45fd-93c5-dc37bb25820e'  -- timber:strip_out:disposal_via_licensed_transfer_agent
);

-- woodworm / preparatory_work: remove antinox_hd_floor_protection_boards_24m_x_12m
-- (section retains: remove_radiators_cap_valves, remove_socket_fronts_and_isolate,
--  skirting_board_removal_set_aside, strip_wall_paper)
DELETE FROM costing_line_templates
WHERE id = '9126ed79-0086-43ba-ab01-fa0507a09841'; -- woodworm:preparatory_work:antinox_hd_floor_protection_boards_24m_x_12m

-- woodworm / strip_out: remove bag_up_debris_cart_outside and disposal_via_licensed_transfer_agent
-- (section retains: remove_plasterrender_walls, removal_of_stud_walls_etc_bag_cart_away,
--  plaster_lath_removal_denail_ceilings, strip_out_existing_timber_floor_gf,
--  scrape_backclear_sub_floors)
DELETE FROM costing_line_templates
WHERE id IN (
  '6b7a97e2-c231-4829-a62c-82ce8d4dd0ab', -- woodworm:strip_out:bag_up_debris_cart_outside
  '72637f21-b2df-4b1a-8338-1a88464d3029'  -- woodworm:strip_out:disposal_via_licensed_transfer_agent
);

-- ============================================================
-- 2. Delete now-empty per-type skip_hire sections
--    ON DELETE CASCADE removes the single template in each
-- ============================================================

-- damp / skip_hire (was: skip_hire template 3085826a-4f80-480a-94e7-6b5d64820d2e)
DELETE FROM costing_sections
WHERE id = 'f3190fa3-f78e-471d-95ae-670f0e7a649f'; -- damp:skip_hire

-- timber / skip_hire (was: rubbish_removal_skips template 48a51258-1693-4666-839a-a6a3a5b4c626)
DELETE FROM costing_sections
WHERE id = 'f71640c5-ebca-4598-b304-3dfed71cb1e7'; -- timber:skip_hire

-- woodworm / skip_hire (was: rubbish_removal_skips template 60c5c91e-2b5e-4829-8af2-46a5eb995d54)
DELETE FROM costing_sections
WHERE id = '14e0ee78-2fa0-4611-a982-0017597dfc35'; -- woodworm:skip_hire

-- condensation / skip_hire (was: rubbish_removal_skips template 35d8c8a9-8a54-4327-bc9a-1355866e70d3)
DELETE FROM costing_sections
WHERE id = '16384fec-2edd-42c9-b079-f432c97e8722'; -- condensation:skip_hire

COMMIT;
