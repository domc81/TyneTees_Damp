-- Seed data for Tyne Tees Damp Proofing Survey System
-- This populates the database with initial pricing data from the Excel workbook

-- ============================================================================
-- WORK SECTIONS
-- ============================================================================

INSERT INTO work_sections (id, name, description, is_optional, display_order) VALUES
  ('preparatory', 'Stripping Out / Preparatory Work', 'All preparatory works required before damp proofing', false, 1),
  ('walls_dpc', 'Walls (DPC Installation)', 'Damp proof course installation - traditional or digital', false, 2),
  ('walls_membrane', 'Walls (Cavity Drain Membrane)', 'CM3 mesh cavity drain membrane system', false, 3),
  ('tanking', 'Cementitious Tanking System', 'Internal tanking system for waterproofing', false, 4),
  ('floor_resin', 'Floor Liquid Resin Membranes', 'EP40 epoxy resin floor coating system', false, 5),
  ('plastering', 'Plastering & Finishing', 'All plastering and decorative finishes', false, 6),
  ('insulation', 'Warmline Internal Wall Insulation', 'TIWI thin internal wall insulation system', false, 7),
  ('flooring', 'Floor Joists & Decking', 'Structural timber floor repairs and replacements', false, 8),
  ('airbricks', 'Airbricks & Ventilation', 'Sub-floor ventilation improvements', false, 9),
  ('spray_treatment', 'Spray Treatments', 'Anti-fungal sub-floor treatments', false, 10),
  ('drains', 'Drainage Systems', 'Aco drain and French drain installation', true, 11),
  ('external_treatment', 'External Wall Treatment', 'Aquaban water repellent system', true, 12),
  ('asbestos', 'Asbestos Testing', 'Asbestos survey and testing', true, 13),
  ('overheads', 'Project Specific Overheads', 'Skips, tools, equipment, and project management', false, 14);

-- ============================================================================
-- BASE RATES
-- ============================================================================

INSERT INTO base_rates (id, category, rate_name, rate_value, description) VALUES
  ('labor_base', 'labor', 'Base Hourly Rate', 30.63, 'Base labor cost per hour'),
  ('labor_markup', 'labor', 'Labor Markup', 100.00, 'Percentage markup on labor'),
  ('contractor_rate', 'contractor', 'Contractor Hourly Rate', 28.00, 'Paid to external contractors'),
  ('travel_hourly', 'travel', 'Travel Time Rate', 30.63, 'Billed for travel time'),
  ('travel_mile', 'travel', 'Vehicle Cost Per Mile', 0.50, 'Fuel cost per mile');

-- ============================================================================
-- MARKUP CONFIG
-- ============================================================================

INSERT INTO markup_config (id, item_type, percentage, name) VALUES
  ('mtl', 'MTL', 30.00, 'Materials'),
  ('lbr', 'LBR', 100.00, 'Labour'),
  ('sub', 'SUB', 0.00, 'Subcontractor'),
  ('ovr', 'OVR', 30.00, 'Overheads'),
  ('tra', 'TRA', 0.00, 'Travel');

-- ============================================================================
-- MATERIALS CATALOG (from Preservation Shop pricing)
-- ============================================================================

INSERT INTO materials_catalog (id, name, supplier, supplier_url, unit_cost, unit, coverage, category) VALUES
  -- Prep
  ('antinox_floor_protection', 'Antinox HD Floor Protection Boards – 2.4m x 1.2m', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/antinox-heavy-duty-floor-protection-boards-2-4m-x-1-2m/', 4.16, 'Each', '2.88 m2 per sheet', 'prep'),

  -- DPC
  ('ultracure_cream', 'Wykamol Ultracure Damp Proofing Cream', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-ultracure-damp-proofing-cream/', 13.93, '1ltr Cartridge', '10 linear metres at 115mm brick thickness', 'dpc'),
  ('drill_plugs_12mm', 'Drill Plugs 12mm – Grey or Black', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/12mm-drill-plugs-grey-for-dpc-injection/', 0.04, 'Each', '50 plugs per 6 linear metres', 'dpc'),
  ('mursec_eco_unit', 'Mursec Eco Unit - Digital DPC', 'Murrett', NULL, 750.00, 'Each', 'Per unit (varies by property)', 'dpc'),

  -- Membrane
  ('cm3_membrane_1mtr', 'Wykamol CM3 Mesh Cavity Drain Membrane - 1 mtr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-cm3-mesh-cavity-drain-membrane/', 4.17, 'M2', 'Sold in 5m roll increments', 'membrane'),
  ('cm3_membrane_1_2mtr', 'Wykamol CM3 Mesh Cavity Drain Membrane - 1.2mtr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-cm3-mesh-cavity-drain-membrane/', 4.45, 'M2', 'Sold in 5m roll increments', 'membrane'),
  ('cm3_membrane_2mtr', 'Wykamol CM3 Mesh Cavity Drain Membrane - 2mtr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-cm3-mesh-cavity-drain-membrane/', 4.42, 'M2', 'Sold in 5m roll increments', 'membrane'),
  ('membrane_plugs_50mm', 'Cavity Membrane Fixing Plugs – 50mm', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/cavity-membrane-fixing-plugs-50mm/', 0.09, 'Each', '10 plugs per m2', 'membrane'),
  ('sealing_tape_28mm', 'Wykamol Membrane Sealing Tape – 28mm x 22m', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-membrane-sealing-tape-28mm-x-22m/', 19.16, 'Roll', '22 linear metres per roll', 'membrane'),
  ('technoseal_5ltr', 'Wykamol Technoseal Liquid DPM 5ltr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-technoseal-liquid-damp-proofing-membrane-dpm/', 23.33, '5ltr', '80 linear metres per 5ltr container', 'membrane'),
  ('universal_mortar', 'Wykamol Universal Mortar', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-universal-mortar/', 24.51, '25kg', '12 linear metres per bag (fillet joints)', 'membrane'),
  ('fleece_tape_115mm', 'Wykamol Membrane Fibre/Fleece Tape – 115mm X 5m', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-fibre-tape/', 10.83, 'Roll', '5 linear metres per roll', 'membrane'),
  ('rope_10mm', 'Wykamol Rope 10mm x 5m', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-rope-10mm-x-5m/', 10.33, 'Roll', '5 linear metres per roll', 'membrane'),

  -- Tanking
  ('sbr_latex', 'Wykamol SBR Latex – 5ltr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-sbr-latex-5l/', 16.66, '5ltr', 'Dubbing out: 4m per tub with sand/cement', 'tanking'),
  ('building_sand', 'Building Sand', 'Builders Merchant', NULL, 2.79, 'Bag', 'For tanking mix', 'tanking'),
  ('cement_25kg', 'Cement 25kg', 'Builders Merchant', 'https://www.preservationshop.co.uk/product/cement/', 7.69, 'Bag', 'For tanking mix', 'tanking'),
  ('hydradry_tanking', 'Wykamol Hydradry Tanking Slurry – 20kg', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/hydradry-tanking-slurry/', 21.70, '20kg', '7 m2 per tub (2 coat application)', 'tanking'),
  ('renovating_plaster', 'Wykamol Renovating Plaster – 20kg Bag', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/renovating-plaster/', 16.25, '20kg', '3 m2 per bag at 10mm thickness', 'tanking'),

  -- Resin Floor
  ('ep40_primer', 'EP40 2 Pack resin Primer', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/ep40-primer-coat/', 56.70, '5ltr', '30 m2 per tub', 'resin_floor'),
  ('ep40_topcoat', 'EP40 2 Pack resin top coat', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-ep40-epoxy-floor-coating-5l-grey/', 63.70, '5ltr', '30 m2 per tub', 'resin_floor'),
  ('grip_grit', 'Grip grit', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/grip-grit/', 2.08, 'Bag', '25 m2 per bag', 'resin_floor'),

  -- Plastering
  ('plasterboard_1220x900', 'Plasterboards, 1220mm x 900mm x 9.5mm', 'Builders Merchant', NULL, 8.24, 'Each', '1.098 m2 per board', 'plastering'),
  ('stop_bead_3m', 'Plastering Stop Bead - 3m length', 'Builders Merchant', NULL, 1.00, 'Each', 'Per length as needed', 'plastering'),
  ('angle_bead_2_4m', 'Plastering Thin Coat Angle/Corner Bead - 2.4m', 'Builders Merchant', NULL, 1.66, 'Each', 'Per length as needed', 'plastering'),
  ('angle_bead_3m', 'Plastering Thin Coat Angle/Corner Bead - 3m', 'Builders Merchant', NULL, 2.49, 'Each', 'Per length as needed', 'plastering'),
  ('multi_finish_plaster', 'Multi Finish Plaster – 25kg Bag', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/multi-finish-plaster-25kg-bag-british-gypsum-thistle/', 12.08, '25kg', '10 m2 per bag', 'plastering'),

  -- Insulation
  ('tiwi_roll', 'Wykamol ISO-THERM TIWI – 0.95m x 7.5m', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-iso-therm-thin-internal-wall-insulation-tiwi-1m-x-7-5m/', 27.60, 'Roll', '7.125 m2 per roll', 'insulation'),
  ('tiwi_adhesive', 'Wykamol ISO-THERM Adhesive For TIWI', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-iso-therm-adhesive-for-thin-internal-wall-insulation-tiwi/', 38.50, '15kg', '7.125 m2 per tub', 'insulation'),

  -- Ventilation
  ('plastic_airbrick', 'Plastic Airbrick 9 x 3', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/plastic-air-brick-9-x-3/', 1.66, 'Each', '2 plastic airbricks = 1 installed airbrick', 'ventilation'),

  -- Treatment
  ('microtech_dual', 'Wykamol Microtech Dual Purpose Concentrate - 400g', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-microtech-dual-purpose-concentrate/', 20.97, '400g', '400g makes 25 Litres = 100 m2 coverage', 'treatment'),

  -- External
  ('enviroseal_5ltr', 'Wykamol Enviroseal Liquid Water Repellent - 5ltr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-enviroseal-liquid-water-repellent/', 12.50, '5ltr', '25 m2 per 5ltr container', 'external');

-- ============================================================================
-- PRICING ITEMS (Work items with costs and labor hours)
-- ============================================================================

INSERT INTO pricing_items (id, section_id, name, unit, material_cost, labor_hours, item_type, is_mandatory) VALUES
  -- Preparatory
  ('prep_remove_radiators', 'preparatory', 'Remove radiators & cap valves', 'Each', 7.00, 0.33, 'MTL', true),
  ('prep_remove_sockets', 'preparatory', 'Remove socket fronts and isolate', 'Each', 2.00, 0.20, 'MTL', true),
  ('prep_skirting', 'preparatory', 'Skirting board removal & set aside', 'LM', 0.10, 0.07, 'MTL', true),
  ('prep_strip_wallpaper', 'preparatory', 'Strip Wall Paper', 'M2', 0.50, 0.50, 'MTL', true),
  ('prep_remove_plaster', 'preparatory', 'Remove plaster/render (Walls)', 'M2', 0.00, 0.30, 'LBR', true),
  ('prep_remove_stud', 'preparatory', 'Removal of stud walls etc', 'M2', 0.00, 0.40, 'LBR', true),
  ('prep_remove_ceiling', 'preparatory', 'Plaster & stud Removal (Ceilings)', 'M2', 0.00, 0.80, 'LBR', true),
  ('prep_remove_floor', 'preparatory', 'Strip out existing timber floor (GF)', 'M2', 0.00, 0.50, 'LBR', true),
  ('prep_scrape_subfloor', 'preparatory', 'Scrape back/clear sub floors', 'M2', 0.00, 0.25, 'LBR', true),
  ('prep_bags', 'preparatory', 'Bag up debris & cart outside', 'Bags', 1.00, 0.01, 'MTL', false),

  -- Walls DPC
  ('dpc_traditional', 'walls_dpc', 'DPC Installation - Traditional', 'LM', 0.00, 0.35, 'LBR', true),
  ('dpc_digital', 'walls_dpc', 'DPC Installation - Digital', 'Each', 0.00, 1.00, 'LBR', true),

  -- Walls Membrane
  ('membrane_cm3_1mtr', 'walls_membrane', 'Wall membrane CM3 - 1mtr', 'M2', 0.00, 0.30, 'LBR', false),
  ('membrane_cm3_1_2mtr', 'walls_membrane', 'Wall membrane CM3 - 1.2mtr', 'M2', 0.00, 0.30, 'LBR', false),
  ('membrane_plugs', 'walls_membrane', 'Membrane plugs for m2 listed', 'M2', 0.00, 0.25, 'LBR', false),
  ('sealing_tape', 'walls_membrane', 'Sealing Tape Lm', 'LM', 0.00, 0.10, 'LBR', false),
  ('technoseal', 'walls_membrane', 'Technoseal Lm', 'LM', 1.00, 0.0167, 'MTL', false),
  ('fillet_joint', 'walls_membrane', 'Wall/floor fillet joint', 'LM', 0.00, 0.30, 'LBR', false),

  -- Tanking
  ('tanking_dubbing', 'tanking', 'Dubbing out coat (sand/cement/SBR)', 'M2', 0.00, 0.30, 'LBR', false),
  ('tanking_slurry', 'tanking', '2 coat tanking slurry', 'M2', 0.00, 0.35, 'LBR', false),
  ('tanking_renovating', 'tanking', 'Renovating plaster', 'M2', 0.00, 0.30, 'LBR', false),
  ('tanking_fillet', 'tanking', 'Wall/floor fillet joint', 'LM', 0.00, 0.30, 'LBR', false),

  -- Floor Resin
  ('resin_primer', 'floor_resin', 'EP40 2 Pack resin Primer', 'M2', 0.00, 0.04, 'LBR', false),
  ('resin_topcoat', 'floor_resin', 'EP40 2 Pack resin top coat', 'M2', 0.00, 0.04, 'LBR', false),
  ('resin_fillet', 'floor_resin', 'Wall/floor fillet joint', 'LM', 0.00, 0.30, 'LBR', false),
  ('resin_grip', 'floor_resin', 'Grip grit', 'M2', 0.00, 0.01, 'LBR', false),

  -- Plastering
  ('plaster_studwall', 'plastering', 'Construct stud wall to perimeter', 'M2', 14.00, 0.40, 'MTL', false),
  ('plaster_boarding', 'plastering', 'Plaster boarding (inc dab/screws)', 'M2', 9.76, 0.40, 'MTL', false),
  ('plaster_skimming', 'plastering', 'Skimming walls (multi finish plaster)', 'M2', 0.00, 0.27, 'LBR', false),

  -- Flooring
  ('joist_100x50', 'flooring', 'Joists, 100 x 50', 'LM', 5.46, 0.25, 'MTL', false),
  ('joist_125x50', 'flooring', 'Joists, 125 x 50', 'LM', 6.50, 0.25, 'MTL', false),
  ('joist_150x50', 'flooring', 'Joists, 150 x 50', 'LM', 7.70, 0.25, 'MTL', false),
  ('flooring_18mm', 'flooring', 'Install Weyrock flooring 18mm (M2)', 'M2', 18.00, 0.40, 'MTL', false),
  ('flooring_22mm', 'flooring', 'Install Weyrock flooring 22mm (M2)', 'M2', 22.00, 0.425, 'MTL', false),

  -- Airbricks
  ('airbrick_clean', 'airbricks', 'Clean out airbrick/fit new face', 'Each', 16.00, 0.50, 'MTL', false),
  ('airbrick_upgrade', 'airbricks', 'Lift / upgrade existing airbrick/fit new face', 'Each', 16.00, 0.80, 'MTL', false),
  ('airbrick_additional', 'airbricks', 'Install additional airbrick', 'Each', 16.00, 2.00, 'MTL', false),

  -- Spray Treatment
  ('spray_fog', 'spray_treatment', 'Fog sub floor void with anti fungal treatment', 'M2', 0.00, 0.20, 'LBR', false),

  -- Drains (Optional)
  ('drain_aco', 'drains', 'Aco Drain per linear meter', 'LM', 8.00, 1.00, 'MTL', false),
  ('drain_french', 'drains', 'French Drain per linear meter', 'LM', 2.41, 0.67, 'MTL', false),

  -- External Treatment (Optional)
  ('external_aquaban', 'external_treatment', 'Aquaban water repellent system', 'M2', 0.00, 0.05, 'LBR', false),

  -- Asbestos (Optional)
  ('asbestos_test', 'asbestos', 'Asbestos Testing', 'Each', 30.00, 0.64, 'MTL', false),

  -- Overheads
  ('overhead_skip', 'overheads', 'Rubbish removal skips (8yd)', 'Each', 270.00, 0.00, 'OVR', false),
  ('overhead_vehicle', 'overheads', 'Vehicle Costs (Fuel)', 'Miles', 0.50, 0.00, 'TRA', false);

-- ============================================================================
-- SAMPLE PROJECT DATA
-- ============================================================================

-- Sample enquiry
INSERT INTO enquiries (
  id, enquiry_number, internal_reference, client_name, client_email, client_phone,
  site_address_1, site_city, site_county, site_postcode,
  survey_type, status, source, enquiry_date, proposed_survey_date, notes
) VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'CF-DAMP-2026-0001', 'SMITH-123', 'John Smith', 'john.smith@email.com', '01234 567890',
  '12 Victoria Street', 'Newcastle upon Tyne', 'Tyne and Wear', 'NE1 4LP',
  'damp', 'surveyed', 'Website', '2026-02-04', '2026-02-10', 'Rising damp reported in ground floor'
);

-- Sample project
INSERT INTO projects (
  id, enquiry_id, project_number, survey_type, status, survey_date, weather_conditions,
  client_name, site_address, site_postcode, notes
) VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000001',
  'TT-2026-0001', 'damp', 'in_progress', '2026-02-05', 'Dry',
  'John Smith', '12 Victoria Street', 'NE1 4LP', 'Rising damp to ground floor'
);

-- Sample survey room
INSERT INTO survey_rooms (
  id, project_id, name, room_type, floor_level, display_order,
  wall_type, findings, recommendations, is_completed
) VALUES (
  'c0000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  'Living Room', 'living_room', 'ground', 1,
  'solid_brick',
  'Rising damp to north wall up to 1.2m. Visible tide marks and salt crystallisation.',
  'Install physical DPC and replaster with renovating plaster system.',
  true
);

-- Sample moisture readings
INSERT INTO moisture_readings (room_id, location, reading, unit, material) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'North wall - low', 18.0, 'percentage', 'masonry'),
  ('c0000000-0000-0000-0000-000000000001', 'North wall - mid', 22.0, 'percentage', 'masonry'),
  ('c0000000-0000-0000-0000-000000000001', 'North wall - high', 19.0, 'percentage', 'masonry');
