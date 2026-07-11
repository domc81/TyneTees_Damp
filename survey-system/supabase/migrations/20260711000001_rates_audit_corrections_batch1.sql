-- Fix batch 1: rates-audit corrections (parity/audit/RATES_AUDIT.md)
-- The workbooks are the golden master. Two parts:
--  1) Widen numeric scales — the original columns (numeric(10,4) rates,
--     numeric(10,2) catalog prices) physically could not store the workbook's
--     exact values; extraction truncation was partly schema-forced.
--  2) Set every mismatched value at its true source (wastage_factor,
--     base_unit_cost, labour_rate_per_unit, params.cost_per_coverage_unit,
--     materials_catalog.unit_cost) so engine-effective == workbook exactly.
-- Harness evidence: parity/audit/BATCH1_BEFORE_AFTER.md
BEGIN;
ALTER TABLE costing_line_templates
  ALTER COLUMN base_unit_cost TYPE numeric(14,8),
  ALTER COLUMN labour_rate_per_unit TYPE numeric(14,8),
  ALTER COLUMN coverage_rate TYPE numeric(14,8);
ALTER TABLE materials_catalog
  ALTER COLUMN unit_cost TYPE numeric(12,4);
-- Fix batch 1: rates-audit corrections (parity/audit/RATES_AUDIT.md, commit a238c98)
-- 70 wastage misapplications + truncated constants + catalog pack-price precision.
-- Workbooks are the golden master; harness before/after: parity/audit/BATCH1_BEFORE_AFTER.md
-- damp R22 Remove socket fronts and isolate
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '00ae7cc0-6ac9-4d81-8895-1f9dafa09717';
-- damp R90 Joists, 125 x 50
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '01313b4d-05cf-4fbf-9baa-2dafe536788d';
-- damp R102 Install Weyrock flooring 22mm (M2)
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '03442549-7986-4175-a4d3-b388fbb290e4';
-- damp R128 Aquaban water repellent system
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '04d4372c-d873-4ba7-bed8-34802d53e57e';
-- timber R74 Skimming walls (multi finish plaster)
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '06db19f2-1e94-4042-8749-959e7a24bc05';
-- damp R132 Asbestos Testing
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '0719cf16-fa3b-4a69-bf2b-e77376808c1d';
-- damp R107 Provide insulation to suspended flooring
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '0882f49e-40c0-467a-923c-49d0179982eb';
-- damp R44 Wall membrane CM3  - 1mtr
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '0db77a3a-e800-4672-9ccb-ea2e7eabbecc';
-- damp R98 Flitch plates (pair)
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '110fc7f3-02b2-4612-a38a-9e19845ef489';
-- damp R101 Install Weyrock flooring 18mm (M2)
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '1907ce18-fc6d-4e49-98b6-798c51b85ad0';
-- damp R93 Joists, 200 x 50
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '1b4bee7b-d9cf-4640-8a9d-e95d3f7b4713';
-- timber R61 Wall/floor fillet joint
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '21f595dd-3b59-4279-8628-ca6fa0d6a127';
-- damp R64 Wall/floor fillet joint
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '299b6497-05a5-4beb-8777-6b17d37b2f66';
-- damp R96 Wall plate 100x25
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '2a730796-691e-4ba4-85bc-7253a491d1cb';
-- damp R45 Wall membrane CM3  - 1.2mtr
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '2aec06f2-af7b-45b3-bd78-8aa0d78d2b23';
-- timber R60 Renovating plaster
UPDATE costing_line_templates SET base_unit_cost = 5.9583333333 WHERE id = '34cf4e30-cb96-49ba-9858-962ab61dac36';
-- timber R72 Plasterboarding (inc dab/screws)
UPDATE costing_line_templates SET base_unit_cost = 9.7559198543 WHERE id = '38a76850-e992-4336-8bd1-84e7241ba796';
-- woodworm R41 Skimming walls (multi finish plaster)
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '3ca4092d-a328-4c1d-8ffd-670a50a18974';
-- damp R94 Joists, 225 x 50
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '45265509-db56-41b7-af9e-139ee26553ea';
-- timber R54 Fixing Rope Lm
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '455fb129-4cb9-4482-af29-37b319fc3968';
-- damp R106 Install Structural Engineered Flooring sheet (M2) 
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '4714994e-1809-4a54-af53-054bb717b27b';
-- timber R48 Wall membrane CM3 - Subtotals for above 3 lines
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '4f5a6d2f-f8d8-42de-af09-89512944f653';
-- damp R63 Renovating plaster
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '54047dc1-caad-4991-ad31-a6a1b99cb264';
-- damp R25 Antinox HD Floor Protection Boards – 2.4m x 1.2m
UPDATE costing_line_templates SET wastage_factor = 1, labour_rate_per_unit = 0.0333333333 WHERE id = '553ac8c6-f75f-4ecb-a238-4914a700b2ef';
-- damp R97 Bower beams (pair)
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '5f5c8e28-3c56-4f84-b5dc-34d48a1de4d1';
-- damp R51 Sealing Tape Lm
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '62f9f27d-aa89-4609-b094-8df774a2e4f4';
-- damp R123 Aco Drain per linear meter
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '63c4f7e3-44cc-4662-ad99-bd4f57021e9f';
-- damp R55 Overtape Lm
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '6d297e6a-19ef-4b45-9b92-03121aa4cc63';
-- damp R56 Fixing Rope Lm
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '6d5c7884-8a3f-4ceb-8dda-aab52c482a37';
-- damp R80 Skimming walls (multi finish plaster)
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '6eaecc7c-c0a0-46f9-8198-d14988abde87';
-- damp R50 Membrane plugs for m2 listed
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '719cb690-7e8b-4cd1-8d7e-c9dc371faa32';
-- timber R43 Wall membrane CM3  - 1mtr
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '7a054fc2-3f97-4761-82e9-f2861e3c48cd';
-- damp R103 Install std T&G Floorboards (M2)
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '8188b5cd-a406-44e4-8911-89d763571fbf';
-- timber R21 Remove radiators & cap valves
UPDATE costing_line_templates SET labour_rate_per_unit = 0.3333333333 WHERE id = '8305a4e3-6667-403f-b767-f52ec903b19a';
-- damp R24 Strip Wall Paper
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '84a49656-54ae-4bd1-aad2-7df1db6519cb';
-- damp R69 EP40 2 Pack resin Primer
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '8a5fabba-6a5e-4ee3-a630-d47e8aa96c17';
-- damp R104 Install Victorian T&G Floorboards (M2)
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '8f9f9d27-e2f8-40e3-95e7-00d08256c647';
-- damp R105 Install Engineered Flooring sheet (M2)
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = '9296b580-4af0-4cd9-9d94-72214c182250';
-- damp R118 Fog sub floor void with anti fungal treatment
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '93895ca4-c1a4-4b2a-86a3-243ddddbd757';
-- woodworm R21 Remove radiators & cap valves
UPDATE costing_line_templates SET labour_rate_per_unit = 0.3333333333 WHERE id = 'a062d347-4971-4206-a893-97cdbda1f8cf';
-- damp R92 Joists, 175 x 50
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = 'a10804aa-ff63-47a9-a4b3-1ce8ad85ea4b';
-- damp R114 Install additional  airbrick
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = 'a76d8a89-396b-4efb-b350-d06a7aa38acb';
-- damp R91 Joists, 150 x 50
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = 'a9681116-b341-4bf8-8540-f9319b1e0938';
-- damp R49 Wall membrane CM3 - Subtotals for above 3 lines
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'abb67f74-713d-428a-ac52-a1c431104d3d';
-- damp R77 Construct stud wall to perimeter
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = 'ac65b8e6-56ba-4a6d-a35c-b315553534ca';
-- damp R53 Wall/floor fillet joint
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'adb7ca16-868a-408f-bd63-5c41e5d25279';
-- timber R50 Sealing Tape Lm
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'affa7052-c2c9-458c-b433-aadf37e9a3f1';
-- timber R29 Remove carpet/tiles/overlays
UPDATE costing_line_templates SET labour_rate_per_unit = 0.1666666667 WHERE id = 'b0e7ddce-8573-4ed5-81cd-ee120642ab10';
-- timber R53 Overtape Lm
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'b284705b-9c47-4413-9208-ae5dc065a0ef';
-- damp R136 Rubbish removal skips
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = 'b36c0971-1972-4521-81ff-5d8b7b5b9031';
-- damp R124 French Drain per linear meter
UPDATE costing_line_templates SET wastage_factor = 1, labour_rate_per_unit = 0.6666666667 WHERE id = 'b8acc359-e00b-4451-877a-083ce9dda474';
-- damp R52 Technoseal Lm
UPDATE costing_line_templates SET labour_rate_per_unit = 0.0166666667 WHERE id = 'c3f69dee-c93c-44ff-93f9-54a826684979';
-- damp R72 Grip grit
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'c5e5e323-5cfd-43a7-abd7-afdde5123e44';
-- timber R49 Membrane plugs for m2 listed
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'c63b32ac-5fea-4e17-a22d-e278f276b1d0';
-- woodworm R40 Plasterboarding (inc dab/screws)
UPDATE costing_line_templates SET base_unit_cost = 9.7559198543 WHERE id = 'd05d37ba-d0e3-4e37-92cb-924e96fdf58d';
-- timber R76 Plastering Thin Coat Angle/Corner Bead - 2.4m leng
UPDATE costing_line_templates SET base_unit_cost = 1.826 WHERE id = 'd2f29a90-2190-4264-8c10-0b80a9477c55';
-- damp R23 Skirting board removal & set aside
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = 'd3c1573a-c80b-4ff2-bfee-82fa02e53c6a';
-- damp R81 Plastering Stop Bead - 3m length
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = 'd40ba502-d764-45bb-8598-b0e31209551e';
-- damp R95 Treat and endwrap joist
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = 'd59b5696-5238-449f-b57e-438b66000c67';
-- timber R51 Technoseal Lm
UPDATE costing_line_templates SET labour_rate_per_unit = 0.0166666667 WHERE id = 'de2e0696-1c07-4001-9e5a-da95e8afb4df';
-- damp R71 Wall/floor fillet joint
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'e4b56c35-ee37-42e2-b20e-70558840b90e';
-- damp R21 Remove radiators & cap valves
UPDATE costing_line_templates SET wastage_factor = 1, labour_rate_per_unit = 0.3333333333 WHERE id = 'e4e3c3d4-cf05-4c64-981e-c8a2003f258f';
-- timber R44 Wall membrane CM3  - 1.2mtr
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'eb04b37d-d5b4-4380-b61e-58f1f458adcf';
-- woodworm R76 Fogging boarded area
UPDATE costing_line_templates SET labour_rate_per_unit = 0.023255814 WHERE id = 'ec465720-19a3-4812-81c4-33b5c5a26a76';
-- damp R82 Plastering Thin Coat Angle/Corner Bead - 2.4m leng
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = 'edfc8756-8292-477b-9af4-2bb24abe51f5';
-- damp R70 EP40 2 Pack resin top coat
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'f147cd83-3a04-4c0d-b47a-a7c3637a13e8';
-- damp R113 Lift / upgrade existing airbrick/fit new face
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = 'f6737c79-33c0-45ba-9203-626cbad42819';
-- damp R34 Bag up debris & cart outside
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = 'f93d504a-e8b0-41e9-8773-7a8a56773104';
-- damp R112 Clean out airbrick/fit new face
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = 'fbc60902-9f9a-4b4d-bf6b-b117ff278ff0';
-- woodworm R43 Plastering Thin Coat Angle/Corner Bead - 2.4m leng
UPDATE costing_line_templates SET base_unit_cost = 1.826 WHERE id = 'fd1cdc94-a835-47f1-bf26-89e6bbd9a634';
-- damp R78 Plaster boarding (inc dab/screws)
UPDATE costing_line_templates SET wastage_factor = 1, base_unit_cost = 9.7559198543 WHERE id = 'fd3b4fbd-3ea8-4228-b5e4-fb71746410a3';
-- damp R89 Joists, 100 x 50
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = 'fdbee5cc-61c6-4940-ad60-ec998c494075';
-- damp R62 2 coat tanking slurry
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'ff1a87cb-26a6-4f74-8932-5aed413a05ef';
-- damp R83 Plastering Thin Coat Angle/Corner Bead - 3m length
UPDATE costing_line_templates SET wastage_factor = 1 WHERE id = 'ffffeeef-747a-4487-a7f3-aeb8de6b0ec1';
-- catalog cm3_membrane_1_2m: damp R45 Wall membrane CM3  - 1.2mtr; timber R44 Wall membrane CM3  - 1.2mtr
UPDATE materials_catalog SET unit_cost = 22.2250000000 WHERE product_key = 'cm3_membrane_1_2m';
-- catalog cm3_membrane_2m: damp R49 Wall membrane CM3 - Subtotals for above 3 lines; timber R48 Wall membrane CM3 - Subtotals for above 3 lines
UPDATE materials_catalog SET unit_cost = 22.0850000000 WHERE product_key = 'cm3_membrane_2m';
-- catalog membrane_fixing_plugs_50mm: damp R50 Membrane plugs for m2 listed; timber R49 Membrane plugs for m2 listed
UPDATE materials_catalog SET unit_cost = 1.8660000000 WHERE product_key = 'membrane_fixing_plugs_50mm';
-- catalog microtech_concentrate: damp R118 Fog sub floor void with anti fungal treatment
UPDATE materials_catalog SET unit_cost = 20.9790000000 WHERE product_key = 'microtech_concentrate';
COMMIT;
