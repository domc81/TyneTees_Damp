# Parity report — `brad-brown-tt-2026-0029`

**Verdict: FAIL — 50 variance(s)**

- Golden master: `workbook_extraction/workbooks/Copy of Damp Costing v48 CF - 220126.xlsm` (evaluated live)
- Engine: live pipeline: generateCostingFromSurvey + calculateTravelOverhead + replicated page summary

| Level | Item | Workbook (expected) | Platform (actual) | Δ | Status |
|---|---|---:|---:|---:|---|
| line | prep_remove_radiators [remove_radiators_valves] materials | 18.2000 | 20.0200 | +1.8200 | ❌ |
| line | prep_remove_radiators [remove_radiators_valves] hours | 0.6667 | 0.6660 | -0.0007 | ❌ |
| line | prep_remove_radiators [remove_radiators_valves] labour | 40.8400 | 40.7992 | -0.0408 | ❌ |
| line | prep_remove_radiators [remove_radiators_valves] total | 59.0400 | 60.8192 | +1.7792 | ❌ |
| line | prep_remove_sockets [remove_socket_fronts] materials | 7.8000 | 8.5800 | +0.7800 | ❌ |
| line | prep_remove_sockets [remove_socket_fronts] hours | 0.6000 | 0.6000 | +0.0000 | ✅ |
| line | prep_remove_sockets [remove_socket_fronts] labour | 36.7560 | 36.7560 | +0.0000 | ✅ |
| line | prep_remove_sockets [remove_socket_fronts] total | 44.5560 | 45.3360 | +0.7800 | ❌ |
| line | prep_skirting_removal [skirting_board_removal] materials | 1.9500 | 2.1450 | +0.1950 | ❌ |
| line | prep_skirting_removal [skirting_board_removal] hours | 1.0500 | 1.0500 | +0.0000 | ✅ |
| line | prep_skirting_removal [skirting_board_removal] labour | 64.3230 | 64.3230 | +0.0000 | ✅ |
| line | prep_skirting_removal [skirting_board_removal] total | 66.2730 | 66.4680 | +0.1950 | ❌ |
| line | prep_antinox_boards [floor_protection_boards] materials | 35.6928 | 39.2621 | +3.5693 | ❌ |
| line | prep_antinox_boards [floor_protection_boards] hours | 0.2000 | 0.1980 | -0.0020 | ❌ |
| line | prep_antinox_boards [floor_protection_boards] labour | 12.2520 | 12.1295 | -0.1225 | ❌ |
| line | prep_antinox_boards [floor_protection_boards] total | 47.9448 | 51.3916 | +3.4468 | ❌ |
| line | strip_remove_plaster_walls [remove_plaster_walls] hours | 5.3100 | 5.3100 | +0.0000 | ✅ |
| line | strip_remove_plaster_walls [remove_plaster_walls] labour | 325.2906 | 325.2906 | +0.0000 | ✅ |
| line | strip_remove_plaster_walls [remove_plaster_walls] total | 325.2906 | 325.2906 | +0.0000 | ✅ |
| line | strip_bag_debris [bag_cart_debris] materials | 46.0200 | 46.8000 | +0.7800 | ❌ |
| line | strip_bag_debris [bag_cart_debris] hours | 0.3540 | 0.3600 | +0.0060 | ❌ |
| line | strip_bag_debris [bag_cart_debris] labour | 21.6860 | 22.0536 | +0.3676 | ❌ |
| line | strip_bag_debris [bag_cart_debris] total | 67.7060 | 68.8536 | +1.1476 | ❌ |
| line | strip_disposal [licensed_disposal] materials | 92.0400 | 93.6000 | +1.5600 | ❌ |
| line | strip_disposal [licensed_disposal] total | 92.0400 | 93.6000 | +1.5600 | ❌ |
| line | dpc_traditional [dpc_injection_traditional] materials | 104.5794 | 885.7612 | +781.1818 | ❌ |
| line | dpc_traditional [dpc_injection_traditional] hours | 6.3000 | 0.3500 | -5.9500 | ❌ |
| line | dpc_traditional [dpc_injection_traditional] labour | 385.9380 | 21.4410 | -364.4970 | ❌ |
| line | dpc_traditional [dpc_injection_traditional] total | 490.5174 | 907.2022 | +416.6848 | ❌ |
| line | membrane_1_2m [wall_membrane_1_2m] materials | 127.1270 | 115.5960 | -11.5310 | ❌ |
| line | membrane_1_2m [wall_membrane_1_2m] hours | 5.9040 | 5.9040 | -0.0000 | ✅ |
| line | membrane_1_2m [wall_membrane_1_2m] labour | 361.6790 | 361.6790 | -0.0000 | ✅ |
| line | membrane_1_2m [wall_membrane_1_2m] total | 488.8060 | 477.2750 | -11.5310 | ❌ |
| line | membrane_plugs [membrane_plugs] materials | 26.6838 | 24.3100 | -2.3738 | ❌ |
| line | membrane_plugs [membrane_plugs] hours | 4.9200 | 4.9200 | -0.0000 | ✅ |
| line | membrane_plugs [membrane_plugs] labour | 301.3992 | 301.3992 | -0.0000 | ✅ |
| line | membrane_plugs [membrane_plugs] total | 328.0830 | 325.7092 | -2.3738 | ❌ |
| line | membrane_sealing_tape [sealing_tape] materials | 27.3988 | 24.9080 | -2.4908 | ❌ |
| line | membrane_sealing_tape [sealing_tape] hours | 0.7872 | 1.9680 | +1.1808 | ❌ |
| line | membrane_sealing_tape [sealing_tape] labour | 48.2239 | 120.5597 | +72.3358 | ❌ |
| line | membrane_sealing_tape [sealing_tape] total | 75.6227 | 145.4677 | +69.8450 | ❌ |
| line | membrane_fillet_joint [wall_floor_fillet_joint] materials | 70.0986 | 63.7260 | -6.3726 | ❌ |
| line | membrane_fillet_joint [wall_floor_fillet_joint] hours | 4.6200 | 4.6200 | +0.0000 | ✅ |
| line | membrane_fillet_joint [wall_floor_fillet_joint] labour | 283.0212 | 283.0212 | +0.0000 | ✅ |
| line | membrane_fillet_joint [wall_floor_fillet_joint] total | 353.1198 | 346.7472 | -6.3726 | ❌ |
| line | membrane_overtape [overtape] materials | 61.9476 | 56.3160 | -5.6316 | ❌ |
| line | membrane_overtape [overtape] hours | 1.6400 | 1.6400 | +0.0000 | ✅ |
| line | membrane_overtape [overtape] labour | 100.4664 | 100.4664 | +0.0000 | ✅ |
| line | membrane_overtape [overtape] total | 162.4140 | 156.7824 | -5.6316 | ❌ |
| line | resin_topcoat [resin_topcoat_ep40] materials | 182.1820 | 165.6200 | -16.5620 | ❌ |
| line | resin_topcoat [resin_topcoat_ep40] hours | 1.6000 | 1.6000 | +0.0000 | ✅ |
| line | resin_topcoat [resin_topcoat_ep40] labour | 98.0160 | 98.0160 | +0.0000 | ✅ |
| line | resin_topcoat [resin_topcoat_ep40] total | 280.1980 | 263.6360 | -16.5620 | ❌ |
| line | plaster_boarding [plaster_boarding] materials | 224.4837 | 247.0354 | +22.5516 | ❌ |
| line | plaster_boarding [plaster_boarding] hours | 7.0800 | 7.0800 | +0.0000 | ✅ |
| line | plaster_boarding [plaster_boarding] labour | 433.7208 | 433.7208 | +0.0000 | ✅ |
| line | plaster_boarding [plaster_boarding] total | 658.2045 | 680.7562 | +22.5516 | ❌ |
| line | plaster_skimming [skimming_walls] materials | 51.8232 | 47.1120 | -4.7112 | ❌ |
| line | plaster_skimming [skimming_walls] hours | 8.0000 | 8.0000 | +0.0000 | ✅ |
| line | plaster_skimming [skimming_walls] labour | 490.0800 | 490.0800 | +0.0000 | ✅ |
| line | plaster_skimming [skimming_walls] total | 541.9032 | 537.1920 | -4.7112 | ❌ |
| line | plaster_corner_bead_24 [thin_coat_angle_2_4m] materials | 9.4952 | 10.4447 | +0.9495 | ❌ |
| line | plaster_corner_bead_24 [thin_coat_angle_2_4m] total | 9.4952 | 10.4447 | +0.9495 | ❌ |
| line | UNEXPECTED engine line resin_primer_ep40 (floor_resin) total | 0.0000 | 245.4360 | +245.4360 | ❌ engine emitted a line the golden master does not |
| line | UNEXPECTED engine line grip_grit (floor_resin) total | 0.0000 | 29.9120 | +29.9120 | ❌ engine emitted a line the golden master does not |
| total | Materials subtotal | 1,108.8421 | 2,004.0644 | +895.2223 | ❌ |
| total | Labour subtotal | 3,020.4366 | 2,834.2552 | -186.1814 | ❌ |
| total | Labour hours | 49.3052 | 46.2660 | -3.0392 | ❌ |
| total | Travel (PSO) | 459.5936 | 459.5936 | +0.0000 | ✅ |
| total | Travel hours | 12.0533 | 12.0533 | +0.0000 | ✅ |
| total | Days on site | 4.0000 | 4.0000 | +0.0000 | ✅ |
| total | Subtotal ex VAT | 4,588.8723 | 5,297.9131 | +709.0409 | ❌ |
| total | VAT | 917.7745 | 1,059.5826 | +141.8082 | ❌ |
| total | Total inc VAT | 5,506.6467 | 6,357.4958 | +850.8491 | ❌ |
