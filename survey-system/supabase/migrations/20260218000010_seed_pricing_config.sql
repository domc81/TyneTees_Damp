-- Migration: Seed global pricing configuration
-- Date: 2026-02-18
-- Source: All 4 workbooks (Costing sheet row 155 area, Customer Summary deposit %)
-- Depends on: 20260218000003_new_costing_engine.sql
-- Rollback: DELETE FROM pricing_config;

INSERT INTO pricing_config (config_key, config_value, description) VALUES
  ('hourly_labour_rate', 30.63, 'Base hourly labour rate (£) — all workbooks Costing D155'),
  ('contractor_hourly_rate', 28.00, 'Rate paid to contractor per hour (£) — all workbooks Costing E155'),
  ('default_material_markup', 0.30, 'Default material markup 30% — workbook Col J standard'),
  ('default_labour_markup', 1.00, 'Default labour markup 100% — workbook Col R standard'),
  ('default_wastage_factor', 1.10, 'Default wastage factor 10% — baked into material cost formulas'),
  ('vat_rate', 0.20, 'VAT rate 20%'),
  ('damp_deposit_pct', 0.30, 'Damp survey deposit 30% — Damp Customer Summary'),
  ('condensation_deposit_pct', 0.50, 'Condensation survey deposit 50% — Condensation Customer Summary'),
  ('timber_deposit_pct', 0.30, 'Timber survey deposit 30% — Timber Customer Summary'),
  ('woodworm_deposit_pct', 0.30, 'Woodworm survey deposit 30% — Woodworm Customer Summary'),
  ('skip_hire_8yd_cost', 270.00, 'Skip hire 8 yard base cost (£)'),
  ('asbestos_testing_cost', 30.00, 'Asbestos testing per sample cost (£)'),
  ('digital_dpc_base_cost', 650.00, 'Mursec Eco digital DPC unit base cost (£)'),
  ('vehicle_cost_per_mile', 0.50, 'Vehicle running cost per mile (£)')
ON CONFLICT (config_key) DO UPDATE SET
  config_value = EXCLUDED.config_value,
  description = EXCLUDED.description,
  updated_at = now();