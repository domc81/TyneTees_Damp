-- Migration: Fix skimming walls labour rate (was 0.000, should be 0.27)
-- Date: 2026-02-20
-- Fixes zero labour cost issue for skimming walls line items

UPDATE costing_line_templates
SET labour_rate_per_unit = 0.27
WHERE line_key = 'skimming_walls'
  AND section_id IN (
    SELECT id FROM costing_sections
    WHERE section_key = 'plastering'
  );

-- Also fix the other skimming variants if they exist
UPDATE costing_line_templates
SET labour_rate_per_unit = 0.27
WHERE line_key = 'skimming_walls_multi_finish_plaster'
  AND labour_rate_per_unit = 0.000;
