-- Admin backend audit fixes:
-- 1) Remove DEAD pricing_config rows whose values are duplicates of template
--    data and are consumed by NOTHING (editing them changed no price — the
--    exact admin trap suspected): asbestos price lives in the asbestos
--    template (base 30), digital DPC in its template (base 650).
-- 2) Mark contractor_hourly_rate as reserved (workbook E155; consumed by the
--    upcoming operative-outputs feature, not by costing today).
-- 3) Deactivate the 7 materials_catalog rows referenced by NO template and
--    NO engine fallback — editing them changes nothing. Proper wiring
--    (template product_key + supplier price + wastage) is a documented
--    follow-up in ADMIN_AUDIT.md.
BEGIN;
DELETE FROM pricing_config WHERE config_key IN ('asbestos_testing_cost', 'digital_dpc_base_cost');
UPDATE pricing_config SET description = 'RESERVED — subcontractor pay rate (workbook Costing E155). Not consumed by customer pricing; will drive the operative/subcontractor outputs feature.' WHERE config_key = 'contractor_hourly_rate';
UPDATE materials_catalog SET is_active = false WHERE product_key IN ('antinox_floor_protection', 'plasterboard_9_5mm', 'plastering_stop_bead_3m', 'plastic_airbrick', 'technoseal_dpm', 'thin_coat_angle_bead_2_4m', 'thin_coat_angle_bead_3m');
COMMIT;
