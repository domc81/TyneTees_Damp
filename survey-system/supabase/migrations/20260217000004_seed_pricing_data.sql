-- Seed pricing data from pricing-database.ts
-- STATUS: Already applied to live DB on 17 Feb 2026

-- ============================================================================
-- BASE RATES (5 entries)
-- ============================================================================

INSERT INTO base_rates (id, category, rate_name, rate_value, description)
VALUES 
    ('labor_base_hourly_rate', 'labor', 'Base Hourly Rate', 30.63, '£30.63 per hour base'),
    ('labor_markup_percentage', 'labor', 'Markup Percentage', 100.00, '100% markup = £61.26 charged'),
    ('contractor_hourly_rate', 'contractor', 'Hourly Rate', 28.00, '£28.00 per hour paid to contractor'),
    ('travel_hourly_rate', 'travel', 'Hourly Rate', 30.63, 'Travel time billed at labor rate'),
    ('travel_vehicle_cost_per_mile', 'travel', 'Vehicle Cost Per Mile', 0.50, 'Fuel cost per mile')
ON CONFLICT (id) DO UPDATE
SET 
    category = EXCLUDED.category,
    rate_name = EXCLUDED.rate_name,
    rate_value = EXCLUDED.rate_value,
    description = EXCLUDED.description;

-- ============================================================================
-- MARKUP CONFIGURATIONS (5 entries)
-- ============================================================================

INSERT INTO markup_config (id, item_type, percentage, name)
VALUES 
    ('MTL', 'MTL', 30.00, 'Materials'),
    ('LBR', 'LBR', 100.00, 'Labour'),
    ('SUB', 'SUB', 0.00, 'Subcontractor'),
    ('OVR', 'OVR', 30.00, 'Overheads'),
    ('TRA', 'TRA', 0.00, 'Travel')
ON CONFLICT (id) DO UPDATE
SET 
    item_type = EXCLUDED.item_type,
    percentage = EXCLUDED.percentage,
    name = EXCLUDED.name;

-- ============================================================================
-- WORK SECTIONS (14 sections)
-- ============================================================================

INSERT INTO work_sections (id, name, description, is_optional, display_order)
VALUES 
    ('preparatory', 'Stripping Out / Preparatory Work', 'All preparatory works required before damp proofing', FALSE, 1),
    ('walls_dpc', 'Walls (DPC Installation)', 'Damp proof course installation - traditional or digital', FALSE, 2),
    ('walls_membrane', 'Walls (Cavity Drain Membrane)', 'CM3 mesh cavity drain membrane system', FALSE, 3),
    ('tanking', 'Cementitious Tanking System', 'Internal tanking system for waterproofing', FALSE, 4),
    ('floor_resin', 'Floor Liquid Resin Membranes', 'EP40 epoxy resin floor coating system', FALSE, 5),
    ('plastering', 'Plastering & Finishing', 'All plastering and decorative finishes', FALSE, 6),
    ('insulation', 'Warmline Internal Wall Insulation', 'TIWI thin internal wall insulation system', FALSE, 7),
    ('flooring', 'Floor Joists & Decking', 'Structural timber floor repairs and replacements', FALSE, 8),
    ('airbricks', 'Airbricks & Ventilation', 'Sub-floor ventilation improvements', FALSE, 9),
    ('spray_treatment', 'Spray Treatments', 'Anti-fungal sub-floor treatments', FALSE, 10),
    ('drains', 'Drainage Systems', 'Aco drain and French drain installation', TRUE, 11),
    ('external_treatment', 'External Wall Treatment', 'Aquaban water repellent system', TRUE, 12),
    ('asbestos', 'Asbestos Testing', 'Asbestos survey and testing', TRUE, 13),
    ('overheads', 'Project Specific Overheads', 'Skips, tools, equipment, and project management', FALSE, 14)
ON CONFLICT (id) DO UPDATE
SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    is_optional = EXCLUDED.is_optional,
    display_order = EXCLUDED.display_order;

-- ============================================================================
-- PRICING ITEMS (44 items)
-- ============================================================================

INSERT INTO pricing_items (id, section_id, name, unit, material_cost, labor_hours, item_type, is_mandatory, markup_override, contractor_cost)
VALUES 
    -- SECTION 1: STRIPPING OUT / PREPARATORY WORK
    ('prep_remove_radiators', 'preparatory', 'Remove radiators & cap valves', 'Each', 7.00, 0.33, 'MTL', TRUE, NULL, NULL),
    ('prep_remove_sockets', 'preparatory', 'Remove socket fronts and isolate', 'Each', 2.00, 0.20, 'MTL', TRUE, NULL, NULL),
    ('prep_skirting', 'preparatory', 'Skirting board removal & set aside', 'LM', 0.10, 0.07, 'MTL', TRUE, NULL, NULL),
    ('prep_strip_wallpaper', 'preparatory', 'Strip Wall Paper', 'M2', 0.50, 0.50, 'MTL', TRUE, NULL, NULL),
    ('prep_remove_plaster', 'preparatory', 'Remove plaster/render (Walls)', 'M2', 0.00, 0.30, 'LBR', TRUE, NULL, NULL),
    ('prep_remove_stud', 'preparatory', 'Removal of stud walls etc (Bag & cart away)', 'M2', 0.00, 0.40, 'LBR', TRUE, NULL, NULL),
    ('prep_remove_ceiling', 'preparatory', 'Plaster & stud Removal (Ceilings)', 'M2', 0.00, 0.80, 'LBR', TRUE, NULL, NULL),
    ('prep_remove_floor', 'preparatory', 'Strip out existing timber floor (GF)', 'M2', 0.00, 0.50, 'LBR', TRUE, NULL, NULL),
    ('prep_scrape_subfloor', 'preparatory', 'Scrape back/clear sub floors', 'M2', 0.00, 0.25, 'LBR', TRUE, NULL, NULL),
    ('prep_bags', 'preparatory', 'Bag up debris & cart outside', 'Bags', 1.00, 0.01, 'MTL', FALSE, NULL, NULL),
    ('prep_disposal', 'preparatory', 'Disposal via licensed transfer agent', 'Bags', 0.00, 0.00, 'MTL', FALSE, NULL, NULL),
    
    -- SECTION 2: WALLS DPC
    ('dpc_traditional', 'walls_dpc', 'DPC Installation - Traditional', 'LM', 0.00, 0.35, 'LBR', TRUE, NULL, NULL),
    ('dpc_digital', 'walls_dpc', 'DPC Installation - Digital', 'Each', 0.00, 1.00, 'LBR', TRUE, 15.4, NULL),
    
    -- SECTION 3: WALLS MEMBRANE
    ('membrane_cm3_1mtr', 'walls_membrane', 'Wall membrane CM3 - 1mtr', 'M2', 0.00, 0.30, 'LBR', FALSE, NULL, NULL),
    ('membrane_cm3_1_2mtr', 'walls_membrane', 'Wall membrane CM3 - 1.2mtr', 'M2', 0.00, 0.30, 'LBR', FALSE, NULL, NULL),
    ('membrane_cm3_2mtr_1', 'walls_membrane', 'Wall membrane CM3 - 2mtr #1', 'M2', 0.00, 0.00, 'LBR', FALSE, NULL, NULL),
    ('membrane_cm3_2mtr_2', 'walls_membrane', 'Wall membrane CM3 - 2mtr #2', 'M2', 0.00, 0.00, 'LBR', FALSE, NULL, NULL),
    ('membrane_cm3_2mtr_3', 'walls_membrane', 'Wall membrane CM3 - 2mtr #3', 'M2', 0.00, 0.00, 'LBR', FALSE, NULL, NULL),
    ('membrane_plugs', 'walls_membrane', 'Membrane plugs for m2 listed', 'M2', 0.00, 0.25, 'LBR', FALSE, NULL, NULL),
    ('sealing_tape', 'walls_membrane', 'Sealing Tape Lm', 'LM', 0.00, 0.10, 'LBR', FALSE, NULL, NULL),
    ('technoseal', 'walls_membrane', 'Technoseal Lm', 'LM', 1.00, 0.0167, 'MTL', FALSE, NULL, NULL),
    ('fillet_joint', 'walls_membrane', 'Wall/floor fillet joint', 'LM', 0.00, 0.30, 'LBR', FALSE, NULL, NULL),
    ('overtape', 'walls_membrane', 'Overtape Lm', 'LM', 0.00, 0.10, 'LBR', FALSE, NULL, NULL),
    ('fixing_rope', 'walls_membrane', 'Fixing Rope Lm', 'LM', 0.00, 0.10, 'LBR', FALSE, NULL, NULL),
    ('difficulty_hours', 'walls_membrane', 'Difficulty hours (additional hours if required)', 'Hours', 0.00, 1.00, 'LBR', FALSE, NULL, NULL),
    
    -- SECTION 4: CEMENTITIOUS TANKING
    ('tanking_dubbing', 'tanking', 'Dubbing out coat (sand/cement/SBR)', 'M2', 0.00, 0.30, 'LBR', FALSE, NULL, NULL),
    ('tanking_slurry', 'tanking', '2 coat tanking slurry', 'M2', 0.00, 0.35, 'LBR', FALSE, NULL, NULL),
    ('tanking_renovating', 'tanking', 'Renovating plaster', 'M2', 0.00, 0.30, 'LBR', FALSE, NULL, NULL),
    ('tanking_fillet', 'tanking', 'Wall/floor fillet joint', 'LM', 0.00, 0.30, 'LBR', FALSE, NULL, NULL),
    ('tanking_difficulty', 'tanking', 'Difficulty hours (additional hours if required)', 'Hours', 0.00, 1.00, 'LBR', FALSE, NULL, NULL),
    
    -- SECTION 5: FLOOR RESIN MEMBRANES
    ('resin_primer', 'floor_resin', 'EP40 2 Pack resin Primer', 'M2', 0.00, 0.04, 'LBR', FALSE, NULL, NULL),
    ('resin_topcoat', 'floor_resin', 'EP40 2 Pack resin top coat', 'M2', 0.00, 0.04, 'LBR', FALSE, NULL, NULL),
    ('resin_fillet', 'floor_resin', 'Wall/floor fillet joint', 'LM', 0.00, 0.30, 'LBR', FALSE, NULL, NULL),
    ('resin_grip', 'floor_resin', 'Grip grit', 'M2', 0.00, 0.01, 'LBR', FALSE, NULL, NULL),
    ('resin_difficulty', 'floor_resin', 'Difficulty hours (additional hours if required)', 'Hours', 0.00, 1.00, 'LBR', FALSE, NULL, NULL),
    
    -- SECTION 6: PLASTERING & FINISHING
    ('plaster_studwall', 'plastering', 'Construct stud wall to perimeter', 'M2', 14.00, 0.40, 'MTL', FALSE, NULL, NULL),
    ('plaster_boarding', 'plastering', 'Plaster boarding (inc dab/screws)', 'M2', 9.76, 0.40, 'MTL', FALSE, NULL, NULL),
    ('plaster_tiwi', 'plastering', 'Warmline Internal Wall Insulation', 'M2', 0.00, 0.00, 'LBR', FALSE, NULL, NULL),
    ('plaster_skimming', 'plastering', 'Skimming walls (multi finish plaster)', 'M2', 0.00, 0.27, 'LBR', FALSE, NULL, NULL),
    ('plaster_stop_bead', 'plastering', 'Plastering Stop Bead - 3m length', 'Each', 1.10, 0.00, 'MTL', FALSE, NULL, NULL),
    ('plaster_angle_2_4m', 'plastering', 'Plastering Thin Coat Angle/Corner Bead - 2.4m length', 'Each', 1.83, 0.00, 'MTL', FALSE, NULL, NULL),
    ('plaster_angle_3m', 'plastering', 'Plastering Thin Coat Angle/Corner Beed - 3m length', 'Each', 2.75, 0.00, 'MTL', FALSE, NULL, NULL),
    ('plaster_difficulty', 'plastering', 'Difficulty hours (fireplace, corners etc)', 'Hours', 0.00, 1.00, 'LBR', FALSE, NULL, NULL),
    
    -- SECTION 7: FLOOR JOISTS & DECKING
    ('joist_100x50', 'flooring', 'Joists, 100 x 50', 'LM', 5.46, 0.25, 'MTL', FALSE, NULL, NULL),
    ('joist_125x50', 'flooring', 'Joists, 125 x 50', 'LM', 6.50, 0.25, 'MTL', FALSE, NULL, NULL),
    ('joist_150x50', 'flooring', 'Joists, 150 x 50', 'LM', 7.70, 0.25, 'MTL', FALSE, NULL, NULL),
    ('joist_175x50', 'flooring', 'Joists, 175 x 50', 'LM', 8.00, 0.30, 'MTL', FALSE, NULL, NULL),
    ('joist_200x50', 'flooring', 'Joists, 200 x 50', 'LM', 8.90, 0.30, 'MTL', FALSE, NULL, NULL),
    ('joist_225x50', 'flooring', 'Joists, 225 x 50', 'LM', 9.50, 0.40, 'MTL', FALSE, NULL, NULL),
    ('joist_endwrap', 'flooring', 'Treat and endwrap joist', 'Each', 3.00, 0.15, 'MTL', FALSE, NULL, NULL),
    ('wall_plate', 'flooring', 'Wall plate 100x25', 'Each', 4.84, 0.40, 'MTL', FALSE, NULL, NULL),
    ('bower_beams', 'flooring', 'Bower beams (pair)', 'Pairs', 36.00, 1.50, 'MTL', FALSE, NULL, NULL),
    ('flitch_plates', 'flooring', 'Flitch plates (pair)', 'Pairs', 42.00, 1.50, 'MTL', FALSE, NULL, NULL),
    ('flooring_18mm', 'flooring', 'Install Weyrock flooring 18mm (M2)', 'M2', 18.00, 0.40, 'MTL', FALSE, NULL, 24.50),
    ('flooring_22mm', 'flooring', 'Install Weyrock flooring 22mm (M2)', 'M2', 22.00, 0.425, 'MTL', FALSE, NULL, 26.04),
    ('flooring_tg', 'flooring', 'Install std T&G Floorboards (M2)', 'M2', 46.30, 0.60, 'MTL', FALSE, NULL, 36.76),
    ('flooring_victorian_tg', 'flooring', 'Install Victorian T&G Floorboards (M2)', 'M2', 52.80, 0.60, 'MTL', FALSE, NULL, 36.76),
    ('flooring_engineered', 'flooring', 'Install Engineered Flooring sheet (M2)', 'M2', 49.99, 0.40, 'MTL', FALSE, NULL, 24.50),
    ('flooring_structural', 'flooring', 'Install Structural Engineered Flooring sheet (M2) onto joists', 'M2', 52.80, 0.90, 'MTL', FALSE, NULL, 55.13),
    ('flooring_insulation', 'flooring', 'Provide insulation to suspended flooring', 'M2', 6.80, 0.20, 'MTL', FALSE, NULL, NULL),
    ('flooring_difficulty', 'flooring', 'Difficulty hours (additional hours if required)', 'Hours', 0.00, 1.00, 'LBR', FALSE, NULL, NULL),
    
    -- SECTION 8: AIRBRICKS
    ('airbrick_clean', 'airbricks', 'Clean out airbrick/fit new face', 'Each', 16.00, 0.50, 'MTL', FALSE, NULL, NULL),
    ('airbrick_upgrade', 'airbricks', 'Lift / upgrade existing airbrick/fit new face', 'Each', 16.00, 0.80, 'MTL', FALSE, NULL, NULL),
    ('airbrick_additional', 'airbricks', 'Install additional airbrick', 'Each', 16.00, 2.00, 'MTL', FALSE, NULL, NULL),
    
    -- SECTION 9: SPRAY TREATMENTS
    ('spray_fog', 'spray_treatment', 'Fog sub floor void with anti fungal treatment', 'M2', 0.00, 0.20, 'LBR', FALSE, NULL, NULL),
    ('spray_difficulty', 'spray_treatment', 'Difficulty hours (additional hours if required)', 'Hours', 0.00, 1.00, 'LBR', FALSE, NULL, NULL),
    
    -- SECTION 10: DRAINS (OPTIONAL)
    ('drain_aco', 'drains', 'Aco Drain per linear meter', 'LM', 8.00, 1.00, 'MTL', FALSE, NULL, NULL),
    ('drain_french', 'drains', 'French Drain per linear meter', 'LM', 2.41, 0.67, 'MTL', FALSE, NULL, NULL),
    
    -- SECTION 11: EXTERNAL WALL (OPTIONAL)
    ('external_aquaban', 'external_treatment', 'Aquaban water repellent system', 'M2', 0.00, 0.05, 'LBR', FALSE, NULL, NULL),
    
    -- SECTION 12: ASBESTOS TESTING (OPTIONAL)
    ('asbestos_test', 'asbestos', 'Asbestos Testing', 'Each', 30.00, 0.64, 'MTL', FALSE, NULL, NULL),
    
    -- SECTION 13: PROJECT OVERHEADS
    ('overhead_skip', 'overheads', 'Rubbish removal skips (8yd)', 'Each', 270.00, 0.00, 'OVR', FALSE, NULL, NULL),
    ('overhead_vehicle', 'overheads', 'Vehicle Costs (Fuel)', 'Miles', 0.50, 0.00, 'TRA', FALSE, NULL, NULL),
    ('overhead_travel', 'overheads', 'Travel Costs for Tradesmen', 'Hours', 0.00, 0.00, 'TRA', FALSE, NULL, NULL)
ON CONFLICT (id) DO UPDATE
SET 
    section_id = EXCLUDED.section_id,
    name = EXCLUDED.name,
    unit = EXCLUDED.unit,
    material_cost = EXCLUDED.material_cost,
    labor_hours = EXCLUDED.labor_hours,
    item_type = EXCLUDED.item_type,
    is_mandatory = EXCLUDED.is_mandatory,
    markup_override = EXCLUDED.markup_override,
    contractor_cost = EXCLUDED.contractor_cost;

-- ============================================================================
-- MATERIALS CATALOG (31 materials)
-- ============================================================================

INSERT INTO materials_catalog (id, name, supplier, supplier_url, unit_cost, unit, coverage, category, default_quantity, is_active)
VALUES 
    -- PREP WORK MATERIALS
    ('antinox_floor_protection', 'Antinox HD Floor Protection Boards – 2.4m x 1.2m', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/antinox-heavy-duty-floor-protection-boards-2-4m-x-1-2m/', 4.16, 'Each', '2.88 m2 per sheet', 'prep', 0, TRUE),
    
    -- DPC MATERIALS
    ('ultracure_cream', 'Wykamol Ultracure Damp Proofing Cream', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-ultracure-damp-proofing-cream/', 13.93, '1ltr Cartridge', '10 linear metres at 115mm brick thickness', 'dpc', 0, TRUE),
    ('drill_plugs_12mm', 'Drill Plugs 12mm – Grey or Black', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/12mm-drill-plugs-grey-for-dpc-injection/', 0.04, 'Each (round to 50)', '50 plugs per 6 linear metres', 'dpc', 0, TRUE),
    ('mursec_eco_unit', 'Mursec Eco Unit - Digital DPC', 'Murrett', NULL, 750.00, 'Each', 'Per unit (varies by property)', 'dpc', 0, TRUE),
    
    -- CAVITY DRAIN MEMBRANE - 1mtr
    ('cm3_membrane_1mtr', 'Wykamol CM3 Mesh Cavity Drain Membrane - 1 mtr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-cm3-mesh-cavity-drain-membrane/', 4.17, 'M2', 'Sold in 5m roll increments', 'membrane', 0, TRUE),
    
    -- CAVITY DRAIN MEMBRANE - 1.2mtr
    ('cm3_membrane_1_2mtr', 'Wykamol CM3 Mesh Cavity Drain Membrane - 1.2mtr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-cm3-mesh-cavity-drain-membrane/', 4.45, 'M2', 'Sold in 5m roll increments', 'membrane', 0, TRUE),
    
    -- CAVITY DRAIN MEMBRANE - 2mtr
    ('cm3_membrane_2mtr', 'Wykamol CM3 Mesh Cavity Drain Membrane - 2mtr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-cm3-mesh-cavity-drain-membrane/', 4.42, 'M2', 'Sold in 5m roll increments', 'membrane', 0, TRUE),
    
    -- MEMBRANE FIXINGS
    ('membrane_plugs_50mm', 'Cavity Membrane Fixing Plugs – 50mm', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/cavity-membrane-fixing-plugs-50mm/', 0.09, 'Each (round to 20)', '10 plugs per m2', 'membrane', 0, TRUE),
    ('sealing_tape_28mm', 'Wykamol Membrane Sealing Tape – 28mm x 22m', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-membrane-sealing-tape-28mm-x-22m/', 19.16, 'Roll x 22 mtrs', '22 linear metres per roll', 'membrane', 0, TRUE),
    ('technoseal_5ltr', 'Wykamol Technoseal Liquid DPM 5ltr - Black or White', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-technoseal-liquid-damp-proofing-membrane-dpm/', 23.33, '5ltr Container', '80 linear metres per 5ltr container', 'membrane', 0, TRUE),
    ('universal_mortar', 'Wykamol Universal Mortar', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-universal-mortar/', 24.51, '25kg Bag', '12 linear metres per bag (fillet joints)', 'membrane', 0, TRUE),
    ('fleece_tape_115mm', 'Wykamol Membrane Fibre/Fleece Tape – 115mm X 5m', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-fibre-tape/', 10.83, 'Roll x 5 mtrs', '5 linear metres per roll', 'membrane', 0, TRUE),
    ('rope_10mm', 'Wykamol Rope 10mm x 5m', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-rope-10mm-x-5m/', 10.33, 'Roll x 5 mtrs', '5 linear metres per roll', 'membrane', 0, TRUE),
    
    -- CEMENTITIOUS TANKING
    ('sbr_latex', 'Wykamol SBR Latex – 5ltr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-sbr-latex-5l/', 16.66, '5ltr Container', 'Dubbing out: 4m per tub with sand/cement', 'tanking', 0, TRUE),
    ('building_sand', 'Building Sand', 'Builders Merchant', NULL, 2.79, 'Per bag', 'For tanking mix', 'tanking', 0, TRUE),
    ('cement_25kg', 'Cement 25kg', 'Builders Merchant', 'https://www.preservationshop.co.uk/product/cement/', 7.69, 'Per bag', 'For tanking mix', 'tanking', 0, TRUE),
    ('hydradry_tanking', 'Wykamol Hydradry Tanking Slurry – 20kg', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/hydradry-tanking-slurry/', 21.70, '20kg Container', '7 m2 per tub (2 coat application)', 'tanking', 0, TRUE),
    ('renovating_plaster', 'Wykamol Renovating Plaster – 20kg Bag', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/renovating-plaster/', 16.25, '20kg Bag', '3 m2 per bag at 10mm thickness', 'tanking', 0, TRUE),
    
    -- FLOOR RESIN SYSTEM
    ('ep40_primer', 'EP40 2 Pack resin Primer', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/ep40-primer-coat/', 56.70, '5ltr Container', '30 m2 per tub', 'resin_floor', 0, TRUE),
    ('ep40_topcoat', 'EP40 2 Pack resin top coat', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-ep40-epoxy-floor-coating-5l-grey/', 63.70, '5ltr Container', '30 m2 per tub', 'resin_floor', 0, TRUE),
    ('grip_grit', 'Grip grit', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/grip-grit/', 2.08, 'Bag', '25 m2 per bag', 'resin_floor', 0, TRUE),
    
    -- PLASTERING MATERIALS
    ('plasterboard_1220x900', 'Plasterboards, 1220mm x 900mm x 9.5mm', 'Builders Merchant', NULL, 8.24, 'Each', '1.098 m2 per board', 'plastering', 0, TRUE),
    ('stop_bead_3m', 'Plastering Stop Bead - 3m length', 'Builders Merchant', NULL, 1.00, 'Each', 'Per length as needed', 'plastering', 0, TRUE),
    ('angle_bead_2_4m', 'Plastering Thin Coat Angle/Corner Bead - 2.4m length', 'Builders Merchant', NULL, 1.66, 'Each', 'Per length as needed', 'plastering', 0, TRUE),
    ('angle_bead_3m', 'Plastering Thin Coat Angle/Corner Bead - 3m length', 'Builders Merchant', NULL, 2.49, 'Each', 'Per length as needed', 'plastering', 0, TRUE),
    ('multi_finish_plaster', 'Multi Finish Plaster – 25kg Bag (British Gypsum Thistle)', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/multi-finish-plaster-25kg-bag-british-gypsum-thistle/', 12.08, '25kg Bag', '10 m2 per bag', 'plastering', 0, TRUE),
    
    -- INTERNAL WALL INSULATION
    ('tiwi_roll', 'Wykamol ISO-THERM TIWI – 0.95m x 7.5m', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-iso-therm-thin-internal-wall-insulation-tiwi-1m-x-7-5m/', 27.60, 'Roll (7.125 m2)', '7.125 m2 per roll', 'insulation', 0, TRUE),
    ('tiwi_adhesive', 'Wykamol ISO-THERM Adhesive For TIWI', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-iso-therm-adhesive-for-thin-internal-wall-insulation-tiwi/', 38.50, 'Per 15kg tub', '7.125 m2 per tub', 'insulation', 0, TRUE),
    
    -- AIRBRICKS
    ('plastic_airbrick', 'Plastic Airbrick 9 x 3 (Beige, Black or Terracotta)', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/plastic-air-brick-9-x-3/', 1.66, 'Each', '2 plastic airbricks = 1 installed airbrick', 'ventilation', 0, TRUE),
    
    -- SPRAY TREATMENTS
    ('microtech_dual', 'Wykamol Microtech Dual Purpose Concentrate - 400g', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-microtech-dual-purpose-concentrate/', 20.97, '400g bottle', '400g makes 25 Litres = 100 m2 coverage', 'treatment', 0, TRUE),
    
    -- EXTERNAL WALL TREATMENT
    ('enviroseal_5ltr', 'Wykamol Enviroseal Liquid Water Repellent - 5ltr', 'Preservation Shop', 'https://www.preservationshop.co.uk/product/wykamol-enviroseal-liquid-water-repellent/', 12.50, '5ltr Container', '25 m2 per 5ltr container', 'external', 0, TRUE)
ON CONFLICT (id) DO UPDATE
SET 
    name = EXCLUDED.name,
    supplier = EXCLUDED.supplier,
    supplier_url = EXCLUDED.supplier_url,
    unit_cost = EXCLUDED.unit_cost,
    unit = EXCLUDED.unit,
    coverage = EXCLUDED.coverage,
    category = EXCLUDED.category,
    default_quantity = EXCLUDED.default_quantity,
    is_active = EXCLUDED.is_active;