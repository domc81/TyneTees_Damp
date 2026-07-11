-- =============================================================================
-- Pricing control wiring — close the gaps found by the workbook→platform
-- pricing map (docs/workbook-analysis/PRICING_CONTROL_MAP.md §4).
-- Parity-neutral by construction: every change preserves today's computed
-- prices exactly (verified by the parity harness after apply).
-- =============================================================================

-- 1. Promote the two travel magic numbers (hardcoded in travel-overhead.ts AND
--    in the workbook formulas — Damp K146 "/6.5", O141 "/30") to editable
--    pricing_config keys. Same values → zero price change.
INSERT INTO pricing_config (config_key, config_value, description) VALUES
  ('productive_hours_per_day', 6.5,
   'Productive working hours per man per day — drives days-on-site: ROUNDUP(total hours / this / men). Workbook magic number (Damp Costing K146 "/6.5").'),
  ('travel_speed_mph', 30,
   'Assumed average travel speed (mph) converting round-trip miles to travel hours. Workbook magic number (Damp Costing O141 "/30").')
ON CONFLICT (config_key) DO NOTHING;

-- 2. Capture the two contractor-side workbook magic numbers as RESERVED keys
--    (same treatment as contractor_hourly_rate — ADMIN_AUDIT §1): not consumed
--    by customer pricing today; needed by the upcoming operative/subcontractor
--    outputs feature (workbook V142 "×0.45", col U "×1.1").
INSERT INTO pricing_config (config_key, config_value, description) VALUES
  ('contractor_mileage_rate', 0.45,
   'RESERVED — contractor mileage rate £/mile (workbook Costing V142 ×0.45; differs from customer vehicle_cost_per_mile 0.50). Feeds the operative/subcontractor outputs feature, not customer prices.'),
  ('contractor_material_uplift', 1.10,
   'RESERVED — contractor materials uplift factor (workbook col U = qty × price × 1.1). Feeds the operative/subcontractor outputs feature, not customer prices.')
ON CONFLICT (config_key) DO NOTHING;

-- 3. whole_pack catalog wiring: the engine now prices whole_pack lines from the
--    materials catalog (product_key) first. The EP40 templates carried the
--    workbook's baked ×1.1 inside params.pack_cost (62.37 = 56.70 × 1.1,
--    70.07 = 63.70 × 1.1 — timber Costing H65/H66 "=56.7*1.1"/"=63.7*1.1").
--    Move that ×1.1 into wastage_factor so catalog price × wastage reproduces
--    the identical figure, and restate params.pack_cost as the RAW pack price
--    (it is now only a fallback snapshot for when the material is inactive).
--    The other four whole_pack templates already have pack_cost = catalog
--    price and wastage 1.0 (no baked uplift in the workbook) — unchanged.
UPDATE costing_line_templates
SET wastage_factor = 1.1,
    formula_params = jsonb_set(formula_params, '{pack_cost}', '56.7')
WHERE line_key = 'ep40_2_pack_resin_primer' AND cost_formula = 'whole_pack';

UPDATE costing_line_templates
SET wastage_factor = 1.1,
    formula_params = jsonb_set(formula_params, '{pack_cost}', '63.7')
WHERE line_key = 'ep40_2_pack_resin_top_coat' AND cost_formula = 'whole_pack';

-- 4. DPC drill plugs: the engine consumes the PACK figure (£4.29 per 100 —
--    Damp Material-List L17 stores "=4.29/100" per plug; Costing H40 uses the
--    4.29 pack constant). The catalog row held the per-plug price (£0.04),
--    which would silently mis-price DPC ~100× if the catalog fallback ever
--    fired. Restate the row with pack semantics so the catalog is safe to be
--    the first-precedence source.
UPDATE materials_catalog
SET unit_cost = 4.29,
    name = 'Drill Plugs 12mm Grey or Black (pack of 100)',
    unit = 'Pack of 100',
    unit_size = '100 plugs',
    updated_at = now()
WHERE product_key = 'drill_plugs_12mm';
