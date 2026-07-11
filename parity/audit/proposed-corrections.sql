-- PROPOSED template corrections from parity/audit/rates_audit.py
-- DRAFT — DO NOT APPLY: costing freeze in force. Apply only inside the
-- harness-gated fix batch, then re-run the full parity suite.
BEGIN;
-- R21 Remove radiators & cap valves: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'e4e3c3d4-cf05-4c64-981e-c8a2003f258f';
-- R21 Remove radiators & cap valves: precision
UPDATE costing_line_templates SET labour_rate_per_unit = 0.33333333 WHERE id = 'e4e3c3d4-cf05-4c64-981e-c8a2003f258f';
-- R22 Remove socket fronts and isolate: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '00ae7cc0-6ac9-4d81-8895-1f9dafa09717';
-- R23 Skirting board removal & set aside: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'd3c1573a-c80b-4ff2-bfee-82fa02e53c6a';
-- R24 Strip Wall Paper: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '84a49656-54ae-4bd1-aad2-7df1db6519cb';
-- R25 Antinox HD Floor Protection Boards – 2.4m x 1.2m: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '553ac8c6-f75f-4ecb-a238-4914a700b2ef';
-- R25 Antinox HD Floor Protection Boards – 2.4m x 1.2m: precision
UPDATE costing_line_templates SET labour_rate_per_unit = 0.03333333 WHERE id = '553ac8c6-f75f-4ecb-a238-4914a700b2ef';
-- R34 Bag up debris & cart outside: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'f93d504a-e8b0-41e9-8773-7a8a56773104';
-- R44 Wall membrane CM3  - 1mtr: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '0db77a3a-e800-4672-9ccb-ea2e7eabbecc';
-- R45 Wall membrane CM3  - 1.2mtr: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '2aec06f2-af7b-45b3-bd78-8aa0d78d2b23';
-- R49 Wall membrane CM3 - Subtotals for above 3 lines: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'abb67f74-713d-428a-ac52-a1c431104d3d';
-- R50 Membrane plugs for m2 listed: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '719cb690-7e8b-4cd1-8d7e-c9dc371faa32';
-- R51 Sealing Tape Lm: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '62f9f27d-aa89-4609-b094-8df774a2e4f4';
-- R52 Technoseal Lm: precision
UPDATE costing_line_templates SET labour_rate_per_unit = 0.01666667 WHERE id = 'c3f69dee-c93c-44ff-93f9-54a826684979';
-- R53 Wall/floor fillet joint: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'adb7ca16-868a-408f-bd63-5c41e5d25279';
-- R55 Overtape Lm: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '6d297e6a-19ef-4b45-9b92-03121aa4cc63';
-- R56 Fixing Rope Lm: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '6d5c7884-8a3f-4ceb-8dda-aab52c482a37';
-- R62 2 coat tanking slurry: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'ff1a87cb-26a6-4f74-8932-5aed413a05ef';
-- R63 Renovating plaster: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '54047dc1-caad-4991-ad31-a6a1b99cb264';
-- R64 Wall/floor fillet joint: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '299b6497-05a5-4beb-8777-6b17d37b2f66';
-- R69 EP40 2 Pack resin Primer: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '8a5fabba-6a5e-4ee3-a630-d47e8aa96c17';
-- R70 EP40 2 Pack resin top coat: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'f147cd83-3a04-4c0d-b47a-a7c3637a13e8';
-- R71 Wall/floor fillet joint: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'e4b56c35-ee37-42e2-b20e-70558840b90e';
-- R72 Grip grit: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'c5e5e323-5cfd-43a7-abd7-afdde5123e44';
-- R77 Construct stud wall to perimeter: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'ac65b8e6-56ba-4a6d-a35c-b315553534ca';
-- R78 Plaster boarding (inc dab/screws): workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'fd3b4fbd-3ea8-4228-b5e4-fb71746410a3';
-- R80 Skimming walls (multi finish plaster): workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '6eaecc7c-c0a0-46f9-8198-d14988abde87';
-- R81 Plastering Stop Bead - 3m length: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'd40ba502-d764-45bb-8598-b0e31209551e';
-- R82 Plastering Thin Coat Angle/Corner Bead - 2.4m length: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'edfc8756-8292-477b-9af4-2bb24abe51f5';
-- R83 Plastering Thin Coat Angle/Corner Bead - 3m length: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'ffffeeef-747a-4487-a7f3-aeb8de6b0ec1';
-- R89 Joists, 100 x 50: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'fdbee5cc-61c6-4940-ad60-ec998c494075';
-- R90 Joists, 125 x 50: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '01313b4d-05cf-4fbf-9baa-2dafe536788d';
-- R91 Joists, 150 x 50: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'a9681116-b341-4bf8-8540-f9319b1e0938';
-- R92 Joists, 175 x 50: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'a10804aa-ff63-47a9-a4b3-1ce8ad85ea4b';
-- R93 Joists, 200 x 50: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '1b4bee7b-d9cf-4640-8a9d-e95d3f7b4713';
-- R94 Joists, 225 x 50: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '45265509-db56-41b7-af9e-139ee26553ea';
-- R95 Treat and endwrap joist: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'd59b5696-5238-449f-b57e-438b66000c67';
-- R96 Wall plate 100x25: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '2a730796-691e-4ba4-85bc-7253a491d1cb';
-- R97 Bower beams (pair): workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '5f5c8e28-3c56-4f84-b5dc-34d48a1de4d1';
-- R98 Flitch plates (pair): workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '110fc7f3-02b2-4612-a38a-9e19845ef489';
-- R101 Install Weyrock flooring 18mm (M2): workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '1907ce18-fc6d-4e49-98b6-798c51b85ad0';
-- R102 Install Weyrock flooring 22mm (M2): workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '03442549-7986-4175-a4d3-b388fbb290e4';
-- R103 Install std T&G Floorboards (M2): workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '8188b5cd-a406-44e4-8911-89d763571fbf';
-- R104 Install Victorian T&G Floorboards (M2): workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '8f9f9d27-e2f8-40e3-95e7-00d08256c647';
-- R105 Install Engineered Flooring sheet (M2): workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '9296b580-4af0-4cd9-9d94-72214c182250';
-- R106 Install Structural Engineered Flooring sheet (M2) onto joists: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '4714994e-1809-4a54-af53-054bb717b27b';
-- R107 Provide insulation to suspended flooring: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '0882f49e-40c0-467a-923c-49d0179982eb';
-- R112 Clean out airbrick/fit new face: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'fbc60902-9f9a-4b4d-bf6b-b117ff278ff0';
-- R113 Lift / upgrade existing airbrick/fit new face: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'f6737c79-33c0-45ba-9203-626cbad42819';
-- R114 Install additional  airbrick: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'a76d8a89-396b-4efb-b350-d06a7aa38acb';
-- R118 Fog sub floor void with anti fungal treatment: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '93895ca4-c1a4-4b2a-86a3-243ddddbd757';
-- R123 Aco Drain per linear meter: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '63c4f7e3-44cc-4662-ad99-bd4f57021e9f';
-- R124 French Drain per linear meter: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'b8acc359-e00b-4451-877a-083ce9dda474';
-- R124 French Drain per linear meter: precision
UPDATE costing_line_templates SET labour_rate_per_unit = 0.66666667 WHERE id = 'b8acc359-e00b-4451-877a-083ce9dda474';
-- R128 Aquaban water repellent system: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '04d4372c-d873-4ba7-bed8-34802d53e57e';
-- R132 Asbestos Testing: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '0719cf16-fa3b-4a69-bf2b-e77376808c1d';
-- R136 Rubbish removal skips: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'b36c0971-1972-4521-81ff-5d8b7b5b9031';
-- R88 Rubbish removal skips: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'b36c0971-1972-4521-81ff-5d8b7b5b9031';
-- R21 Remove radiators & cap valves: precision
UPDATE costing_line_templates SET labour_rate_per_unit = 0.33333333 WHERE id = '8305a4e3-6667-403f-b767-f52ec903b19a';
-- R25 Antinox HD Floor Protection Boards – 2.4m x 1.2m: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '553ac8c6-f75f-4ecb-a238-4914a700b2ef';
-- R25 Antinox HD Floor Protection Boards – 2.4m x 1.2m: precision
UPDATE costing_line_templates SET labour_rate_per_unit = 0.03333333 WHERE id = '553ac8c6-f75f-4ecb-a238-4914a700b2ef';
-- R29 Remove carpet/tiles/overlays: precision
UPDATE costing_line_templates SET labour_rate_per_unit = 0.16666667 WHERE id = 'b0e7ddce-8573-4ed5-81cd-ee120642ab10';
-- R37 Bag up debris & cart outside: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'f93d504a-e8b0-41e9-8773-7a8a56773104';
-- R43 Wall membrane CM3  - 1mtr: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '7a054fc2-3f97-4761-82e9-f2861e3c48cd';
-- R44 Wall membrane CM3  - 1.2mtr: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'eb04b37d-d5b4-4380-b61e-58f1f458adcf';
-- R48 Wall membrane CM3 - Subtotals for above 3 lines: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '4f5a6d2f-f8d8-42de-af09-89512944f653';
-- R49 Membrane plugs for m2 listed: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'c63b32ac-5fea-4e17-a22d-e278f276b1d0';
-- R50 Sealing Tape Lm: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'affa7052-c2c9-458c-b433-aadf37e9a3f1';
-- R51 Technoseal Lm: precision
UPDATE costing_line_templates SET labour_rate_per_unit = 0.01666667 WHERE id = 'de2e0696-1c07-4001-9e5a-da95e8afb4df';
-- R53 Overtape Lm: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = 'b284705b-9c47-4413-9208-ae5dc065a0ef';
-- R54 Fixing Rope Lm: workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '455fb129-4cb9-4482-af29-37b319fc3968';
-- R61 Wall/floor fillet joint: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '21f595dd-3b59-4279-8628-ca6fa0d6a127';
-- R74 Skimming walls (multi finish plaster): workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '06db19f2-1e94-4042-8749-959e7a24bc05';
-- R120 Rubbish removal skips: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'b36c0971-1972-4521-81ff-5d8b7b5b9031';
-- R21 Remove radiators & cap valves: precision
UPDATE costing_line_templates SET labour_rate_per_unit = 0.33333333 WHERE id = 'a062d347-4971-4206-a893-97cdbda1f8cf';
-- R25 Antinox HD Floor Protection Boards – 2.4m x 1.2m: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = '553ac8c6-f75f-4ecb-a238-4914a700b2ef';
-- R25 Antinox HD Floor Protection Boards – 2.4m x 1.2m: precision
UPDATE costing_line_templates SET labour_rate_per_unit = 0.03333333 WHERE id = '553ac8c6-f75f-4ecb-a238-4914a700b2ef';
-- R34 Bag up debris & cart outside: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'f93d504a-e8b0-41e9-8773-7a8a56773104';
-- R41 Skimming walls (multi finish plaster): workbook embeds x1.1 in pack price
UPDATE costing_line_templates SET wastage_factor = 1.1 WHERE id = '3ca4092d-a328-4c1d-8ffd-670a50a18974';
-- R76 Fogging boarded area: precision
UPDATE costing_line_templates SET labour_rate_per_unit = 0.02325581 WHERE id = 'ec465720-19a3-4812-81c4-33b5c5a26a76';
-- R91 Rubbish removal skips: workbook has no wastage on this line
UPDATE costing_line_templates SET wastage_factor = 1.0 WHERE id = 'b36c0971-1972-4521-81ff-5d8b7b5b9031';
COMMIT;
