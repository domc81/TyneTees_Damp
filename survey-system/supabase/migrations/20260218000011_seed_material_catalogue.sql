-- Migration: Extend and seed material catalogue from Damp Material-List sheet
-- Date: 2026-02-18
-- Source: Damp workbook Material-List sheet (30 products)
-- Depends on: 20260218000003_new_costing_engine.sql
-- Rollback: Remove added columns and inserted rows
--
-- Existing columns: id (text NOT NULL), name (text NOT NULL), supplier (text),
--   supplier_url (text), unit_cost (numeric NOT NULL), unit (text), coverage (text),
--   category (text NOT NULL), default_quantity (int NOT NULL), is_active (bool),
--   created_at (timestamptz), updated_at (timestamptz)

-- Step 1: Add new columns for the pricing engine
ALTER TABLE materials_catalog ADD COLUMN IF NOT EXISTS product_key TEXT UNIQUE;
ALTER TABLE materials_catalog ADD COLUMN IF NOT EXISTS coverage_m2 DECIMAL(10,2);
ALTER TABLE materials_catalog ADD COLUMN IF NOT EXISTS unit_size TEXT;

-- Step 2: Seed products
INSERT INTO materials_catalog (id, name, supplier, supplier_url, unit_cost, unit, coverage, category, default_quantity, is_active, product_key, coverage_m2, unit_size)
VALUES
  (gen_random_uuid()::text, 'Antinox Heavy Duty Floor Protection Boards 2.4m x 1.2m', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/antinox-heavy-duty-floor-protection-boards-2-4m-x-1-2m/', 4.16, 'Per sheet', NULL, 'Preparatory Work', 0, true, 'antinox_floor_protection', NULL, 'Per sheet'),
  (gen_random_uuid()::text, 'Wykamol Ultracure Damp Proofing Cream', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-ultracure-damp-proofing-cream/', 13.93, '1ltr Cartridge', '10 LM at 115mm thickness', 'DPC', 0, true, 'wykamol_ultracure_dpc_cream', NULL, '1ltr Cartridge'),
  (gen_random_uuid()::text, 'Drill Plugs 12mm Grey or Black', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/12mm-drill-plugs-grey-for-dpc-injection/', 0.0429, 'Each', '50 plugs per 6 LM', 'DPC', 0, true, 'drill_plugs_12mm', NULL, 'Each (packs of 50)'),
  (gen_random_uuid()::text, 'Wykamol CM3 Mesh Cavity Drain Membrane - 1 mtr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-cm3-mesh-cavity-drain-membrane/', 4.166, 'M2', '5 M2 per roll', 'Wall Membrane', 0, true, 'cm3_membrane_1m', 5, 'Roll x 5m'),
  (gen_random_uuid()::text, 'Wykamol CM3 Mesh Cavity Drain Membrane - 1.2mtr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-cm3-mesh-cavity-drain-membrane/', 4.445, 'M2', '5 M2 per roll', 'Wall Membrane', 0, true, 'cm3_membrane_1_2m', 5, 'Roll x 5m'),
  (gen_random_uuid()::text, 'Wykamol CM3 Mesh Cavity Drain Membrane - 2mtr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-cm3-mesh-cavity-drain-membrane/', 4.417, 'M2', '5 M2 per roll', 'Wall Membrane', 0, true, 'cm3_membrane_2m', 5, 'Roll x 5m'),
  (gen_random_uuid()::text, 'Cavity Membrane Fixing Plugs 50mm', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/cavity-membrane-fixing-plugs-50mm/', 0.0933, 'Each', '10 plugs per M2', 'Wall Membrane', 0, true, 'membrane_fixing_plugs_50mm', NULL, 'Each (packs of 20)'),
  (gen_random_uuid()::text, 'Wykamol Membrane Sealing Tape 28mm x 22m', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-membrane-sealing-tape-28mm-x-22m/', 19.16, 'Roll', '22 LM per roll', 'Wall Membrane', 0, true, 'membrane_sealing_tape', 22, 'Roll x 22m'),
  (gen_random_uuid()::text, 'Wykamol Technoseal Liquid DPM 5ltr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-technoseal-liquid-damp-proofing-membrane-dpm/', 23.33, '5ltr Container', '80 LM per 5ltr', 'Wall Membrane', 0, true, 'technoseal_dpm', 80, '5ltr Container'),
  (gen_random_uuid()::text, 'Wykamol Universal Mortar 25kg', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-universal-mortar/', 24.51, '25kg Bag', '12 LM per 25kg bag', 'Wall Membrane', 0, true, 'universal_mortar', 12, '25kg Bag'),
  (gen_random_uuid()::text, 'Wykamol Membrane Fibre/Fleece Tape 115mm x 5m', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-fibre-tape/', 10.83, 'Roll', '5 LM per roll', 'Wall Membrane', 0, true, 'fibre_fleece_tape', 5, 'Roll x 5m'),
  (gen_random_uuid()::text, 'Wykamol Rope 10mm x 5m', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-rope-10mm-x-5m/', 10.33, 'Roll', '5 LM per roll', 'Wall Membrane', 0, true, 'rope_10mm', 5, 'Roll x 5m'),
  (gen_random_uuid()::text, 'Wykamol SBR Latex 5ltr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-sbr-latex-5l/', 16.66, '5ltr Container', '8 M2 per 5ltr', 'Cementitious Tanking', 0, true, 'sbr_latex_5ltr', 8, '5ltr Container'),
  (gen_random_uuid()::text, 'Building Sand', NULL, NULL, 2.79, 'Per bag', '4 M2 per bag', 'Cementitious Tanking', 0, true, 'building_sand', 4, 'Per bag'),
  (gen_random_uuid()::text, 'Cement 25kg', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/cement/', 7.69, 'Per bag', '4 M2 per bag', 'Cementitious Tanking', 0, true, 'cement_25kg', 4, '25kg Bag'),
  (gen_random_uuid()::text, 'Wykamol Hydradry Tanking Slurry 20kg', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/hydradry-tanking-slurry/', 21.70, '20kg Container', '7 M2 per tub', 'Cementitious Tanking', 0, true, 'hydradry_tanking_slurry', 7, '20kg Container'),
  (gen_random_uuid()::text, 'Wykamol Renovating Plaster 20kg Bag', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/renovating-plaster/', 16.25, '20kg Bag', '3 M2 per 20kg bag', 'Cementitious Tanking', 0, true, 'renovating_plaster', 3, '20kg Bag'),
  (gen_random_uuid()::text, 'EP40 2 Pack Resin Primer 5ltr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/ep40-primer-coat/', 56.70, '5ltr Container', '30 M2 per tub', 'Floor Resin', 0, true, 'ep40_primer', 30, '5ltr Container'),
  (gen_random_uuid()::text, 'EP40 Epoxy Floor Coating 5ltr Grey', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-ep40-epoxy-floor-coating-5l-grey/', 63.70, '5ltr Container', '30 M2 per tub', 'Floor Resin', 0, true, 'ep40_topcoat', 30, '5ltr Container'),
  (gen_random_uuid()::text, 'Grip Grit', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/grip-grit/', 2.08, 'Bag', '25 M2 per bag', 'Floor Resin', 0, true, 'grip_grit', 25, 'Bag'),
  (gen_random_uuid()::text, 'Plasterboards 1220mm x 900mm x 9.5mm', NULL, NULL, 8.24, 'Each', '1.098 M2 per board', 'Plastering', 0, true, 'plasterboard_9_5mm', 1.098, 'Each'),
  (gen_random_uuid()::text, 'Plastering Stop Bead - 3m length', NULL, NULL, 1.00, 'Each', NULL, 'Plastering', 0, true, 'plastering_stop_bead_3m', NULL, 'Each'),
  (gen_random_uuid()::text, 'Thin Coat Angle/Corner Bead - 2.4m length', NULL, NULL, 1.66, 'Each', NULL, 'Plastering', 0, true, 'thin_coat_angle_bead_2_4m', NULL, 'Each'),
  (gen_random_uuid()::text, 'Thin Coat Angle/Corner Bead - 3m length', NULL, NULL, 2.49, 'Each', NULL, 'Plastering', 0, true, 'thin_coat_angle_bead_3m', NULL, 'Each'),
  (gen_random_uuid()::text, 'Multi Finish Plaster 25kg Bag (British Gypsum Thistle)', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/multi-finish-plaster-25kg-bag-british-gypsum-thistle/', 12.075, '25kg Bag', '10 M2 per bag', 'Plastering', 0, true, 'multi_finish_plaster_25kg', 10, '25kg Bag'),
  (gen_random_uuid()::text, 'Wykamol ISO-THERM TIWI 0.95m x 7.5m', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-iso-therm-thin-internal-wall-insulation-tiwi-1m-x-7-5m/', 27.60, 'Roll', '7.125 M2 per roll', 'Plastering', 0, true, 'isotherm_tiwi', 7.125, 'Roll (7.125 M2)'),
  (gen_random_uuid()::text, 'Wykamol ISO-THERM Adhesive For TIWI 15kg', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-iso-therm-adhesive-for-thin-internal-wall-insulation-tiwi/', 38.50, '15kg tub', '7.125 M2 per tub', 'Plastering', 0, true, 'isotherm_adhesive', 7.125, '15kg tub'),
  (gen_random_uuid()::text, 'Plastic Airbrick 9 x 3 (Beige, Black or Terracotta)', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/plastic-air-brick-9-x-3/', 1.66, 'Each', '2 per installed airbrick', 'Airbricks', 0, true, 'plastic_airbrick', NULL, 'Each'),
  (gen_random_uuid()::text, 'Wykamol Microtech Dual Purpose Concentrate 400g', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-microtech-dual-purpose-concentrate/', 20.97, '400g bottle', '100 M2 per 400g', 'Spray Treatments', 0, true, 'microtech_concentrate', 100, '400g bottle'),
  (gen_random_uuid()::text, 'Wykamol Enviroseal Liquid Water Repellent 5ltr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-enviroseal-liquid-water-repellent/', 12.50, '5ltr Container', '25 M2 per 5ltr', 'Aquaban', 0, true, 'enviroseal_water_repellent', 25, '5ltr Container')
ON CONFLICT (product_key) DO UPDATE SET
  name = EXCLUDED.name,
  supplier = EXCLUDED.supplier,
  supplier_url = EXCLUDED.supplier_url,
  unit_cost = EXCLUDED.unit_cost,
  unit = EXCLUDED.unit,
  coverage = EXCLUDED.coverage,
  category = EXCLUDED.category,
  coverage_m2 = EXCLUDED.coverage_m2,
  unit_size = EXCLUDED.unit_size,
  updated_at = now();
