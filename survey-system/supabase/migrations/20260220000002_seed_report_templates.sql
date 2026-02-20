-- Migration: Seed default report templates for all 4 survey types
-- Date: 2026-02-20
-- Reason: One default template per survey type, extracted from workbook
--         analysis and completed report PDFs.
-- Depends on: 20260220000001_report_templates.sql
-- Rollback: DELETE FROM report_templates WHERE is_default = true;

-- ============================================================
-- DAMP REPORT TEMPLATE
-- Source: DAMP_WORKBOOK_ANALYSIS.md + completed damp report PDFs
-- Title prefix: "Specific Defects Inspection - Rising Damp"
-- ============================================================

INSERT INTO report_templates (name, survey_type, version, is_default, sections, settings)
VALUES (
  'Damp Survey Report v1',
  'damp',
  1,
  true,
  '[
    {
      "key": "cover",
      "title": "Report",
      "type": "cover",
      "order": 1,
      "required": true,
      "content_source": "survey_data",
      "data_fields": ["client_name", "site_address", "site_address_line2", "site_city", "site_county", "site_postcode", "internal_reference", "inspection_date", "weather_conditions", "temperature_c"]
    },
    {
      "key": "property",
      "title": "The Property",
      "type": "property",
      "order": 2,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["property_type", "construction_type", "approx_build_year"],
      "photo_categories": ["property_front", "building_exterior", "street_view"]
    },
    {
      "key": "survey_context",
      "title": "The Survey/Specific Defects Inspection",
      "type": "boilerplate",
      "order": 3,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["reported_defect"],
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "In accordance with your instructions, we carried out a survey/specific defects inspection to the above property for the reported problem which was:"
        }
      ],
      "sub_sections": [
        {
          "key": "orientation",
          "title": "Orientation",
          "type": "boilerplate",
          "order": 1,
          "required": true,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "always",
              "text": "The terms left, right, front and rear are used in accordance with facing the front elevation from the outside of the building."
            }
          ]
        },
        {
          "key": "scope",
          "title": "The Scope",
          "type": "boilerplate",
          "order": 2,
          "required": true,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "always",
              "text": "We must draw to your attention to the scope of our inspection. The inspection was solely to identify evidence of problems which were within those areas pointed out to us at the time of our visit which are listed above. Any areas not specifically referred to in this report have not been included and are not covered by the report or estimate."
            }
          ]
        },
        {
          "key": "abbreviations",
          "title": "Abbreviations Used In Report",
          "type": "boilerplate",
          "order": 3,
          "required": true,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "always",
              "text": "DPC = Damp Proof Course, DPM = Damp proof membrane, USCC = Under separate contract and costs, ACMs = Asbestos containing materials, W/W = Water Weight."
            }
          ]
        },
        {
          "key": "general_notes",
          "title": "",
          "type": "boilerplate",
          "order": 4,
          "required": true,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "always",
              "text": "Our findings and proposals are set out below and should be read in conjunction with the enclosed document ''General Notes for clients and Health and Safety precautions''."
            }
          ]
        }
      ]
    },
    {
      "key": "external_inspection",
      "title": "EXTERNAL INSPECTION",
      "type": "findings",
      "order": 4,
      "required": true,
      "content_source": "mixed",
      "sub_sections": [
        {
          "key": "building_defects",
          "title": "Building Defects",
          "type": "findings",
          "order": 1,
          "required": true,
          "content_source": "mixed",
          "data_fields": ["building_defects_found", "building_defects"],
          "photo_categories": ["building_defect", "roof_defect", "gutter_defect", "pointing_defect"],
          "boilerplate_variants": [
            {
              "condition": "no_defects",
              "text": "No building defects were noted at the time of our inspection."
            },
            {
              "condition": "defects_found",
              "text": "We noted the following building defects:"
            },
            {
              "condition": "defects_warning_cause",
              "text": "The above items should be checked and addressed in the short term (3 months maximum) as they have been identified as possible causes of moisture ingress to the fabric of the building, failure to correct them may exacerbate the reported problems."
            },
            {
              "condition": "defects_warning_general",
              "text": "The above items should be checked and addressed in the short term (3 months maximum) as they have been identified as possible causes of moisture ingress to the fabric of the building."
            },
            {
              "condition": "flat_lease_warning",
              "text": "You should check your lease and find who is responsible for the upkeep of the roof, it is possible the upstairs flat may need to carry out the repairs or it could be shared cost. Whilst the roof repairs may fall under the freeholder''s responsibility, any damp or timber decay resulting from the roof failure will be your responsibility to remedy."
            }
          ]
        },
        {
          "key": "wall_ties",
          "title": "Wall Ties",
          "type": "findings",
          "order": 2,
          "required": false,
          "content_source": "mixed",
          "data_fields": ["wall_tie_concern"],
          "boilerplate_variants": [
            {
              "condition": "wall_tie_concern",
              "text": "Our surveyor noted lateral cracks within the render/mortar beds, this is often a sign of decayed wall ties."
            },
            {
              "condition": "wall_tie_recommend_internal",
              "text": "You should instruct our survey department to arrange a wall tie survey USCC."
            },
            {
              "condition": "wall_tie_recommend_external",
              "text": "We would suggest you arrange a wall tie inspection from a reputable specialist under separate contract and costs."
            }
          ]
        },
        {
          "key": "cracking",
          "title": "Cracking To Walls",
          "type": "findings",
          "order": 3,
          "required": false,
          "content_source": "mixed",
          "data_fields": ["cracking_concern"],
          "boilerplate_variants": [
            {
              "condition": "cracking_concern",
              "text": "Our surveyor noted lateral/stepped cracks within the render/mortar beds, this is often a sign of movement within the structure of a building."
            },
            {
              "condition": "cracking_recommend_survey",
              "text": "You should instruct our survey department to arrange a structural repair survey USCC."
            },
            {
              "condition": "cracking_recommend_engineer",
              "text": "The cracking is quite pronounced and we recommend you advise for a structural engineer to assess the integrity of the building, under separate contract and costs."
            }
          ]
        },
        {
          "key": "ground_levels",
          "title": "External Ground Levels",
          "type": "findings",
          "order": 4,
          "required": false,
          "content_source": "mixed",
          "boilerplate_variants": [
            {
              "condition": "no_ground_issues",
              "text": "There were no apparent ground level issues."
            },
            {
              "condition": "high_ground_levels",
              "text": "We noted high ground levels to the following areas:"
            },
            {
              "condition": "ground_falling_towards",
              "text": "External ground was falling towards building at:"
            },
            {
              "condition": "ground_recommendation",
              "text": "All ground levels to be maintained at a minimum of 150mm below DPC level, paths, drives, yards etc should not cause rainwater etc to run against your property walls. You should arrange work to correct this as a matter of urgency. Ideally, ground levels should be sloping away from the building to shed rainwater and to allow the building to dry out."
            },
            {
              "condition": "aco_drain_recommended",
              "text": "The following areas would benefit from the installation of an aco drain channel to carry water to the drain."
            },
            {
              "condition": "lower_ground_levels",
              "text": "Lower the ground levels to the affected area of the property to create sufficient clearance below the DPC."
            },
            {
              "condition": "french_drain_recommended",
              "text": "Form a french drain by installing gravel to promote breathing of the walls to reduce damp levels."
            }
          ]
        }
      ]
    },
    {
      "key": "dpc_findings",
      "title": "Damp Proof Course",
      "type": "findings",
      "order": 5,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["dpc_required", "dpc_type"],
      "boilerplate_variants": [
        {
          "condition": "dpc_original_exists",
          "text": "There is evidence of an original damp proof course in the mortar bed of the property."
        },
        {
          "condition": "dpc_chemical_exists",
          "text": "There is evidence of a chemical injection damp proof course to the property."
        },
        {
          "condition": "dpc_not_visible",
          "text": "The area where the damp proof course should be located, was not visible and we can neither confirm or deny the existence of a damp proof course installation."
        },
        {
          "condition": "dpc_previous_work",
          "text": "It is possible that work may have been carried out by another company in the past."
        },
        {
          "condition": "dpc_check_guarantee",
          "text": "You should check if any guarantee exists and if the work now required is covered by that guarantee as any work carried out by ourselves may invalidate existing guarantees."
        },
        {
          "condition": "dpc_proposal",
          "text": "Install a low pressure injection damp proof course system, into the mortar courses of the walls as indicated on the attached sketch plan."
        }
      ]
    },
    {
      "key": "sub_floor_ventilation",
      "title": "Sub Floor Ventilation",
      "type": "findings",
      "order": 6,
      "required": false,
      "content_source": "mixed",
      "data_fields": ["airbrick_clean_count", "airbrick_upgrade_count", "airbrick_new_count"],
      "boilerplate_variants": [
        {
          "condition": "no_airbricks",
          "text": "There were no airbricks installed."
        },
        {
          "condition": "airbricks_not_inspectable",
          "text": "It was not possible to inspect the airbricks due to the following:"
        },
        {
          "condition": "airbricks_present",
          "text": "The sub floor voids were ventilated by the following ''visible'' number of airbricks:"
        },
        {
          "condition": "ventilation_sufficient",
          "text": "It is our opinion that the above airbricks are providing sufficient airflow to the sub floor voids as the above reading is below 20% W/W."
        },
        {
          "condition": "ventilation_insufficient",
          "text": "It is our opinion that the above airbricks do not provide sufficient airflow to the sub floor voids as this moisture reading is equal to or above 20% W/W."
        },
        {
          "condition": "airbricks_blocked",
          "text": "During our inspection it was noted that some of the existing airbricks appeared to be blocked and may be providing insufficient airflow to the sub floor voids."
        },
        {
          "condition": "airbricks_too_low",
          "text": "During our inspection it was noted that some of the existing airbricks were installed too low to the external ground levels and may permit water ingress to the sub floor voids."
        },
        {
          "condition": "proposal_remove_clean",
          "text": "Remove air bricks, check airflow, adjust as necessary, clean debris & reinstall."
        },
        {
          "condition": "proposal_upgrade",
          "text": "Upgrade air bricks to 225 x 150 airbricks."
        },
        {
          "condition": "proposal_install_new",
          "text": "Install new 225 x 150 additional airbricks."
        },
        {
          "condition": "proposal_benefit",
          "text": "This will increase the airflow through the floor voids, reduce the humidity and the moisture content of linked timbers, which will greatly reduce the chances of attack by wood rotting fungi such as dry rot or wet rot."
        },
        {
          "condition": "proposal_lift",
          "text": "Lift the existing air bricks."
        },
        {
          "condition": "lift_benefit",
          "text": "Lifting the airbricks will help to prevent water ponding and snow melting, causing water to run into the sub floor void, elevating the moisture levels of the timbers within."
        },
        {
          "condition": "no_works_required",
          "text": "No further works required."
        }
      ]
    },
    {
      "key": "internal_inspection",
      "title": "INTERNAL INSPECTION",
      "type": "boilerplate",
      "order": 7,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "non_destructive_notice",
          "text": "Note: This is a non-destructive inspection. You may wish to accept this report as is or you may wish to arrange for further inspection and checks, should this be the case the options available are outlined below."
        },
        {
          "condition": "damp_timber_risk",
          "text": "Whilst this is arranged as a non-destructive inspection, properties with dampness often have problems with timbers in contact with damp masonry (such as wet rot or dry rot) leaving them at risk. If dampness is found it would be prudent to arrange for a further inspection to gain access to areas concealed within the structure and for timber treatment to be specified."
        },
        {
          "condition": "destructive_permission_template",
          "text": "We have attached a pre-filled email template to request permission for a destructive inspection, to create further access as required to complete the report."
        },
        {
          "condition": "no_permission_negotiate",
          "text": "Should you not be able to obtain permission for a destructive inspection, you may wish to negotiate a discount to the purchase price to allow for the fact there may be treatments, or even timber replacement costs, that we have been unable to assess."
        },
        {
          "condition": "no_permission_arrange_later",
          "text": "Should you not be able to obtain permission for a destructive inspection, once you own the property, we can arrange for technicians to create access points (this will be quoted for separately, in addition to the cost of this inspection)."
        }
      ]
    },
    {
      "key": "room_findings",
      "title": "Room Findings",
      "type": "findings",
      "order": 8,
      "required": true,
      "content_source": "mixed",
      "repeats_per": "room",
      "photo_categories": ["damp_evidence", "room_overview"],
      "llm_prompt_hint": "Generate a room-by-room narrative describing damp findings. For each room, describe: wall moisture readings, plaster condition, visible damp signs, and any associated timber issues. Reference the attached photos inline.",
      "sub_sections": [
        {
          "key": "walls_inspection",
          "title": "Walls",
          "type": "findings",
          "order": 1,
          "required": true,
          "content_source": "mixed",
          "data_fields": ["walls", "moisture_readings"],
          "boilerplate_variants": [
            {
              "condition": "inspection_method",
              "text": "Our surveyor has carried out an inspection of the solid walls as requested. The inspection was carried out with the aid of an electronic moisture meter, a digital laser thermometer and a tactile examination of all plaster surfaces."
            },
            {
              "condition": "plaster_degradation",
              "text": "It is apparent that the wall plastering has suffered degradation due to the effects of dampness. We noted defects to various areas of the plaster surface:"
            },
            {
              "condition": "defect_shadow_bands",
              "text": "Shadow bands (where damp areas appear darker - resembles a shadow)"
            },
            {
              "condition": "defect_salting",
              "text": "Signs of salting"
            },
            {
              "condition": "defect_loss_of_key",
              "text": "Loss of key"
            },
            {
              "condition": "no_plaster_degradation",
              "text": "At the time of our inspection, there was no apparent degradation to the internal plaster/render surfaces."
            },
            {
              "condition": "walls_not_inspectable",
              "text": "It was not possible to inspect the moisture content of some walls due to the following:"
            }
          ]
        },
        {
          "key": "walls_proposals",
          "title": "Proposal",
          "type": "proposals",
          "order": 2,
          "required": false,
          "content_source": "mixed",
          "boilerplate_variants": [
            {
              "condition": "proposal_header",
              "text": "We would propose for the following works to be carried out:"
            },
            {
              "condition": "proposal_remove_radiators",
              "text": "Remove and set aside radiators as required"
            },
            {
              "condition": "proposal_remove_sockets",
              "text": "Remove, make safe electric supply and set aside socket fronts as required"
            },
            {
              "condition": "proposal_remove_skirting",
              "text": "Remove skirting boards/boxing as required and set aside for re-use (please refer to general notes on skirting boards)"
            },
            {
              "condition": "proposal_strip_plaster",
              "text": "Strip off existing plaster/render"
            },
            {
              "condition": "proposal_strip_wallpaper",
              "text": "Strip back wallpaper as required"
            },
            {
              "condition": "proposal_install_dpc_system",
              "text": "Install a damp proofing system as per the attached sketch plan."
            },
            {
              "condition": "proposal_fillet_seal",
              "text": "Install a wall floor fillet seal to join with installed membrane"
            },
            {
              "condition": "proposal_debris_disposal",
              "text": "Bag up debris and dispose of debris via a licensed transfer facility"
            },
            {
              "condition": "proposal_asbestos_test",
              "text": "Asbestos testing: The ceiling/areas designated for the above installations is covered in Artex/decorative plasterwork. These applications can be Asbestos containing materials (ACMs). It will therefore be necessary to have these tested prior to works commencing."
            },
            {
              "condition": "no_works_required",
              "text": "No further works required."
            }
          ]
        },
        {
          "key": "floors_inspection",
          "title": "Floors",
          "type": "findings",
          "order": 3,
          "required": false,
          "content_source": "mixed",
          "data_fields": ["floor_treatment", "floor_area"],
          "boilerplate_variants": [
            {
              "condition": "timber_floors_heading",
              "text": "Timber floors"
            },
            {
              "condition": "no_timber_defects",
              "text": "An inspection of timbers adjacent to damp masonry did not reveal any timber defects at the time of inspection."
            },
            {
              "condition": "timber_defects_found_with_report",
              "text": "An inspection of the floor timbers adjacent to the damp masonry, revealed issues with wood rot, please see attached timber inspection report for details."
            },
            {
              "condition": "timber_defects_found",
              "text": "An inspection of the floor timbers adjacent to the damp masonry, revealed issues with wood rot."
            },
            {
              "condition": "non_accessible",
              "text": "It was not possible to inspect the sub floor timbers adjacent to the damp masonry due to the following:"
            },
            {
              "condition": "obstruction_polished_floor",
              "text": "Polished solid wood flooring"
            },
            {
              "condition": "obstruction_laminate",
              "text": "Laminate, vinyl, Lino or cushion-floor overlay"
            },
            {
              "condition": "obstruction_carpet",
              "text": "Carpets heavily tacked and in danger of tearing whilst lifting"
            },
            {
              "condition": "obstruction_ceramic",
              "text": "Ceramic tiling"
            },
            {
              "condition": "obstruction_furniture",
              "text": "Furniture obstructing access"
            },
            {
              "condition": "solid_floors_excluded",
              "text": "Solid floors are not included in our inspection."
            },
            {
              "condition": "solid_floor_damp_found",
              "text": "Our surveyor noted dampness within the concrete floor(s) marked ''DC'' on the attached sketch plan."
            },
            {
              "condition": "solid_floor_proposal",
              "text": "Install a resin bonded membrane system to the top surface of the concrete floors marked ''DC'' on the sketch plan."
            }
          ]
        }
      ]
    },
    {
      "key": "timber_at_risk",
      "title": "Timbers at risk",
      "type": "findings",
      "order": 9,
      "required": false,
      "content_source": "mixed",
      "boilerplate_variants": [
        {
          "condition": "timbers_at_risk_intro",
          "text": "Timbers equal to or above 20% W/W are classed as being ''at risk''."
        },
        {
          "condition": "timber_summary",
          "text": "It was noted that you had issues in the following timbers:"
        },
        {
          "condition": "issue_woodworm",
          "text": "A woodworm infestation, the attack was of common furniture beetle (anobium punctatum)"
        },
        {
          "condition": "issue_wet_rot",
          "text": "An attack of wood rotting fungi, this was identified as wet rot"
        },
        {
          "condition": "issue_woodboring_weevil",
          "text": "Rotting timbers were also suffering from an infestation of woodboring weevil (Pentarthrum Huttoni)"
        },
        {
          "condition": "issue_dry_rot",
          "text": "An attack of wood rotting fungi, this was identified as dry rot (sepulae lacrymans)"
        },
        {
          "condition": "issue_high_moisture",
          "text": "A high W/W moisture level to the floor timbers, this was due to a lack of ventilation to the sub floor voids"
        },
        {
          "condition": "fogging_proposal",
          "text": "We propose that these timbers are treated with an anti fungal fogging application. This is a short term precaution (non-guaranteed) to protect the timbers from attack whilst the improved airflow dries them out. This is a non-guaranteed treatment and should not be relied upon as a long-term solution."
        }
      ]
    },
    {
      "key": "proposals",
      "title": "Schedule of Works",
      "type": "proposals",
      "order": 10,
      "required": true,
      "content_source": "costing_data",
      "data_fields": ["costing_sections", "costing_lines"]
    },
    {
      "key": "ancillary_items",
      "title": "Ancillary Items",
      "type": "closing",
      "order": 11,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "No allowance has been made in our estimate for the removal or replacement of floor coverings, furnishings, furniture, roof void stored contents and any other items that may obstruct our work. Whilst we will be happy to roll back and loosely relay carpets, you should arrange for rooms to be cleared of anything delicate or of value, prior to our arrival on site. Unless otherwise agreed in writing, any time spent clearing areas to enable work to proceed will be charged for at our standard hourly day rates and added to your final account."
        }
      ]
    },
    {
      "key": "extent_of_survey",
      "title": "Extent of Survey",
      "type": "closing",
      "order": 12,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "The areas we have reported upon are those inspected in accordance with your instructions. If there are any omissions or if you believe that we have misinterpreted your survey instruction, please let us know at once. Where treatment has been recommended, unless otherwise stated above, this is on the understanding that the specified area has not previously been treated and guaranteed.\n\nYou should be aware that we have reported upon problems evident to us at the time of our inspection. We are not commenting in any general sense on the risks of dampness, fungal decay or any other defect not evident at the time of inspection, or that may develop in the future."
        }
      ]
    },
    {
      "key": "payment_terms",
      "title": "Payment",
      "type": "closing",
      "order": 13,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "An initial payment of 30% of the contract value will be payable in advance, this will give us confidence to order job specific materials, and to book the time for your project into our technicians schedules. The balance should always be paid in full within 7 days of completion."
        }
      ]
    },
    {
      "key": "surveyor_comments",
      "title": "Additional Supporting Comments From Surveyor",
      "type": "findings",
      "order": 14,
      "required": false,
      "content_source": "llm_generated",
      "llm_prompt_hint": "Summarise the key findings and provide practical advice to the homeowner. Mention the most critical issues first. Keep the tone professional but accessible. This section is editable by the surveyor before finalising."
    },
    {
      "key": "surveyor_signature",
      "title": "Report Author",
      "type": "signature",
      "order": 15,
      "required": true,
      "content_source": "survey_data",
      "data_fields": ["surveyor_name", "surveyor_credentials", "surveyor_title"],
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "Report produced under the guidance of Tyne Tees Damp Proofing Ltd by:"
        }
      ]
    },
    {
      "key": "sketch_plan",
      "title": "Sketch Plan",
      "type": "sketch",
      "order": 16,
      "required": false,
      "content_source": "surveyor_input",
      "photo_categories": ["sketch_plan"]
    }
  ]'::jsonb,
  '{
    "title_prefix": "Specific Defects Inspection - Rising Damp",
    "abbreviations": {
      "DPC": "Damp Proof Course",
      "DPM": "Damp proof membrane",
      "USCC": "Under separate contract and costs",
      "ACMs": "Asbestos containing materials",
      "W/W": "Water Weight",
      "SOP": "Standard Operating Procedures"
    },
    "include_sketch_plan": true,
    "include_payment_terms": true,
    "payment_deposit_percentage": 30,
    "guarantee_years": 25,
    "company_name": "Tyne Tees Damp Proofing Ltd",
    "company_website": "https://www.tyneteesdampproofing.co.uk",
    "general_notes_document": "General Notes for clients and Health and Safety precautions"
  }'::jsonb
);

-- ============================================================
-- CONDENSATION REPORT TEMPLATE
-- Source: CONDENSATION_WORKBOOK_ANALYSIS.md + completed condensation PDFs
-- Title prefix: "Specific Defects Inspection - Condensation"
-- ============================================================

INSERT INTO report_templates (name, survey_type, version, is_default, sections, settings)
VALUES (
  'Condensation Survey Report v1',
  'condensation',
  1,
  true,
  '[
    {
      "key": "cover",
      "title": "Report",
      "type": "cover",
      "order": 1,
      "required": true,
      "content_source": "survey_data",
      "data_fields": ["client_name", "site_address", "site_address_line2", "site_city", "site_county", "site_postcode", "internal_reference", "inspection_date", "weather_conditions", "temperature_c"]
    },
    {
      "key": "property",
      "title": "The Property",
      "type": "property",
      "order": 2,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["property_type", "construction_type", "approx_build_year"],
      "photo_categories": ["property_front", "building_exterior", "street_view"]
    },
    {
      "key": "survey_context",
      "title": "The Survey/Specific Defects Inspection",
      "type": "boilerplate",
      "order": 3,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "In accordance with your specific instructions, we carried out a survey of the above property for problems with mould, mildew & condensation."
        }
      ],
      "sub_sections": [
        {
          "key": "general_notes",
          "title": "",
          "type": "boilerplate",
          "order": 1,
          "required": true,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "always",
              "text": "Our findings and proposals are set out below and should be read in conjunction with the enclosed document ''General Notes for clients and Health and Safety precautions''."
            }
          ]
        },
        {
          "key": "orientation",
          "title": "Orientation",
          "type": "boilerplate",
          "order": 2,
          "required": true,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "always",
              "text": "The terms left, right, front and rear are used in accordance with facing the front elevation from the outside of the building."
            }
          ]
        },
        {
          "key": "scope",
          "title": "The Scope",
          "type": "boilerplate",
          "order": 3,
          "required": true,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "always",
              "text": "Our specific defects inspection was solely to identify evidence of problems that you have requested us to inspect which was that of mould and condensation within the above property."
            }
          ]
        },
        {
          "key": "abbreviations",
          "title": "Abbreviations Used In Report",
          "type": "boilerplate",
          "order": 4,
          "required": true,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "always",
              "text": "PIV = Positive Input Ventilation, ACMs = Asbestos containing materials."
            }
          ]
        }
      ]
    },
    {
      "key": "internal_inspection",
      "title": "Internal Inspection",
      "type": "findings",
      "order": 4,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["humidity_reading"],
      "photo_categories": ["condensation_evidence", "room_overview"],
      "repeats_per": "room",
      "llm_prompt_hint": "Describe the condensation and mould findings for each room inspected. Reference humidity readings, window condensation, mould severity, and ventilation observations. Include inline photo references.",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "During the internal inspection the following issues were noted:"
        },
        {
          "condition": "condensation_on_windows",
          "text": "Condensation, was apparent on the windows."
        },
        {
          "condition": "low_temp_dew_points",
          "text": "Areas of low temperature/poor air movement to the walls creating dew points."
        },
        {
          "condition": "black_mould",
          "text": "Black spot mould was present within the building."
        },
        {
          "condition": "lack_ventilation",
          "text": "There was a lack of ventilation and air movement within the property."
        },
        {
          "condition": "poor_insulation",
          "text": "We suspect poor insulation values due to solid brick walls."
        },
        {
          "condition": "humidity_reading",
          "text": "Humidity readings were taken within the property, these readings peaked at"
        }
      ]
    },
    {
      "key": "causes",
      "title": "Causes",
      "type": "findings",
      "order": 5,
      "required": true,
      "content_source": "mixed",
      "llm_prompt_hint": "Explain the root causes of the condensation problems based on the survey findings. Reference lack of ventilation, poor insulation, humidity levels, and any contributing factors.",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "The above problems have been caused by:"
        },
        {
          "condition": "cause_ventilation",
          "text": "A lack of ventilation and air movement within the property."
        },
        {
          "condition": "cause_insulation",
          "text": "Poor insulation values of solid brick walls."
        },
        {
          "condition": "cause_dampness",
          "text": "Dampness within the fabric of the building."
        },
        {
          "condition": "cause_elevated_humidity",
          "text": "Lack of ventilation and air movement with the property have caused elevated humidity levels within the building."
        },
        {
          "condition": "cause_insufficient_extraction",
          "text": "It is our opinion that the current extraction and ventilation at the property does not provide sufficient ventilation"
        }
      ]
    },
    {
      "key": "proposals",
      "title": "Proposal",
      "type": "proposals",
      "order": 6,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["piv_type", "piv_count", "fan_count"],
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "We would propose for the following works to be carried out:"
        },
        {
          "condition": "ventilation_system",
          "text": "Supply and install a system of devices and measures to introduce fresh air and remove stale damp air. This system will reduce humidity levels and create air movement to combat the condensation problem within the property."
        },
        {
          "condition": "services_header",
          "text": "You will need the following services:"
        },
        {
          "condition": "piv_loft_heated",
          "text": "Supply & install of loft mounted Dryair PIV heated unit(s) to the following area(s):"
        },
        {
          "condition": "piv_loft_diffusor",
          "text": "Loft area and diffusor to hallway ceiling"
        },
        {
          "condition": "piv_loft_unheated",
          "text": "Supply & install of loft mounted Dryair PIV unheated unit(s) to the following area(s):"
        },
        {
          "condition": "piv_wall_heated",
          "text": "Supply & install of wall mounted Dryair PIV heated unit(s) to the following area(s):"
        },
        {
          "condition": "fans_humidistat",
          "text": "Supply & install of Humidistat trickle and boost fan(s) to the following area(s):"
        },
        {
          "condition": "fans_upgrade",
          "text": "Upgrade the existing extractors at the property"
        },
        {
          "condition": "electrical_fittings",
          "text": "Supply and installation of any necessary electrical fittings/ducting/trunking/grilles required for the installation of Fans/PIVs/Vents (if applicable)."
        },
        {
          "condition": "mould_treatment",
          "text": "Supply of labour and materials to treat and kill black mould (Any area treated for mould may require you to redecorate)."
        },
        {
          "condition": "asbestos_test",
          "text": "Asbestos testing: The ceiling/areas designated for the above installations is covered in Artex/decorative plasterwork. These applications can be Asbestos containing materials (ACMs). It will therefore be necessary to have these tested prior to works commencing."
        },
        {
          "condition": "electrical_not_current",
          "text": "Electrical system not up to current standards: A check of your electrical system revealed that it was not up to current standards. We recommend that you contact a qualified electrician to upgrade your system."
        }
      ]
    },
    {
      "key": "loft_access",
      "title": "Loft Access",
      "type": "findings",
      "order": 7,
      "required": false,
      "content_source": "mixed",
      "photo_categories": ["general"],
      "boilerplate_variants": [
        {
          "condition": "new_loft_hatch",
          "text": "Supply and install of new loft hatch with sturdy fold down ladder, handrail and switched lamp."
        },
        {
          "condition": "enlarge_loft_hatch",
          "text": "Supply of labour and materials to enlarge current loft hatch."
        }
      ]
    },
    {
      "key": "piv_info",
      "title": "Additional Information: Benefits of PIV systems",
      "type": "boilerplate",
      "order": 8,
      "required": false,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "piv_selected",
          "text": "For more information on the benefits of Positive Input Ventilation systems please visit the link below:\nhttps://www.tyneteesdampproofing.co.uk/piv-video/"
        }
      ]
    },
    {
      "key": "extent_of_survey",
      "title": "Extent Of Survey",
      "type": "closing",
      "order": 9,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "You should be aware that we have reported upon condensation problems evident to us at the time of our inspection and in accordance with your instructions. If there are any omissions or if you believe that we have misinterpreted your survey instruction, please let us know at once. Our recommendations will be for improvements that will help to combat the problems reported and visible to our surveyor at the time of inspection. Please read carefully the content of this report and all of its enclosures."
        }
      ]
    },
    {
      "key": "external_inspection",
      "title": "EXTERNAL INSPECTION",
      "type": "findings",
      "order": 10,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["building_defects_found", "building_defects"],
      "photo_categories": ["building_defect"],
      "sub_sections": [
        {
          "key": "building_defects",
          "title": "Building Defects",
          "type": "findings",
          "order": 1,
          "required": true,
          "content_source": "mixed",
          "boilerplate_variants": [
            {
              "condition": "see_damp_report",
              "text": "See Damp report for building defects."
            },
            {
              "condition": "no_defects",
              "text": "No building defects were noted at the time of our inspection."
            },
            {
              "condition": "defects_found",
              "text": "We noted the following building defects:"
            },
            {
              "condition": "defects_warning",
              "text": "The above items should be checked and addressed in the short term (3 months maximum) as they have been identified as possible causes of moisture ingress to the fabric of the building, failure to correct them may exacerbate the reported problems."
            }
          ]
        }
      ]
    },
    {
      "key": "surveyor_comments",
      "title": "Additional Supporting Comments From Surveyor",
      "type": "findings",
      "order": 11,
      "required": false,
      "content_source": "llm_generated",
      "llm_prompt_hint": "Provide practical advice about managing condensation. Mention repainting tips (stain blocker for ceilings), ventilation habits, and any additional observations. Keep tone professional but accessible."
    },
    {
      "key": "surveyor_signature",
      "title": "Report Author",
      "type": "signature",
      "order": 12,
      "required": true,
      "content_source": "survey_data",
      "data_fields": ["surveyor_name", "surveyor_credentials", "surveyor_title"],
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "Report produced under the guidance of Tyne Tees Damp Proofing Ltd by:"
        }
      ]
    }
  ]'::jsonb,
  '{
    "title_prefix": "Specific Defects Inspection - Condensation",
    "abbreviations": {
      "PIV": "Positive Input Ventilation",
      "ACMs": "Asbestos containing materials"
    },
    "include_sketch_plan": false,
    "include_payment_terms": false,
    "payment_deposit_percentage": 30,
    "guarantee_years": 25,
    "company_name": "Tyne Tees Damp Proofing Ltd",
    "company_website": "https://www.tyneteesdampproofing.co.uk",
    "general_notes_document": "General Notes for clients and Health and Safety precautions",
    "piv_info_url": "https://www.tyneteesdampproofing.co.uk/piv-video/"
  }'::jsonb
);

-- ============================================================
-- TIMBER REPORT TEMPLATE
-- Source: TIMBER_WORKBOOK_ANALYSIS.md + completed timber report PDF
-- Title prefix: "Timbers Inspection"
-- ============================================================

INSERT INTO report_templates (name, survey_type, version, is_default, sections, settings)
VALUES (
  'Timber Survey Report v1',
  'timber',
  1,
  true,
  '[
    {
      "key": "cover",
      "title": "Report",
      "type": "cover",
      "order": 1,
      "required": true,
      "content_source": "survey_data",
      "data_fields": ["client_name", "site_address", "site_address_line2", "site_city", "site_county", "site_postcode", "internal_reference", "inspection_date", "weather_conditions", "temperature_c"]
    },
    {
      "key": "property",
      "title": "The Property",
      "type": "property",
      "order": 2,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["property_type", "construction_type", "approx_build_year"],
      "photo_categories": ["property_front", "building_exterior"]
    },
    {
      "key": "survey_context",
      "title": "The Survey/Specific Defects Inspection",
      "type": "boilerplate",
      "order": 3,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["reported_defect"],
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "In accordance with your instructions, we carried out a survey/specific defects inspection to the above property for the reported problem which was:"
        }
      ],
      "sub_sections": [
        {
          "key": "general_notes",
          "title": "",
          "type": "boilerplate",
          "order": 1,
          "required": true,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "always",
              "text": "Our findings and proposals are set out below and should be read in conjunction with the enclosed document ''General Notes for clients and Health and Safety precautions''."
            }
          ]
        },
        {
          "key": "orientation",
          "title": "Orientation",
          "type": "boilerplate",
          "order": 2,
          "required": true,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "always",
              "text": "The terms left, right, front and rear are used in accordance with facing the front elevation from the outside of the building."
            }
          ]
        },
        {
          "key": "scope",
          "title": "The Scope",
          "type": "boilerplate",
          "order": 3,
          "required": true,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "always",
              "text": "We must draw to your attention to the scope of our inspection. The inspection was solely to identify evidence of problems which were within those areas pointed out to us at the time of our visit which are listed above. Any areas not specifically referred to in this report have not been included and are not covered by the report or estimate."
            }
          ]
        },
        {
          "key": "abbreviations",
          "title": "Abbreviations Used In Report",
          "type": "boilerplate",
          "order": 4,
          "required": true,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "always",
              "text": "W/W = Water Weight, SOP = Standard Operating Procedures."
            }
          ]
        }
      ]
    },
    {
      "key": "external_building_defects",
      "title": "External Building Defects",
      "type": "findings",
      "order": 4,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["building_defects_found", "building_defects"],
      "photo_categories": ["building_defect"],
      "boilerplate_variants": [
        {
          "condition": "no_defects",
          "text": "No building defects were noted at the time of our inspection."
        },
        {
          "condition": "defects_found",
          "text": "We noted the following building defects:"
        },
        {
          "condition": "defects_warning",
          "text": "The above items should be checked and addressed in the short term (3 months maximum) as they have been identified as possible causes of moisture ingress to the fabric of the building, failure to correct them may exacerbate the reported problems."
        },
        {
          "condition": "flat_lease_warning",
          "text": "You should check your lease and find who is responsible for the upkeep of the roof, it is possible the upstairs flat may need to carry out the repairs or it could be shared cost. Whilst the roof repairs may fall under the freeholder''s responsibility, any damp or timber decay resulting from the roof failure will be your responsibility to remedy."
        }
      ]
    },
    {
      "key": "ground_levels",
      "title": "External Ground Levels",
      "type": "findings",
      "order": 5,
      "required": false,
      "content_source": "mixed",
      "boilerplate_variants": [
        {
          "condition": "no_ground_issues",
          "text": "There were no apparent ground level issues."
        },
        {
          "condition": "high_ground_levels",
          "text": "We noted high ground levels to the following areas:"
        },
        {
          "condition": "ground_falling_towards",
          "text": "External ground was falling towards building at:"
        },
        {
          "condition": "ground_recommendation",
          "text": "All ground levels to be maintained at a minimum of 150mm below DPC level, paths, drives, yards etc should not cause rainwater etc to run against your property walls. You should arrange work to correct this as a matter of urgency. Ideally, ground levels should be sloping away from the building to shed rainwater and to allow the building to dry out."
        },
        {
          "condition": "aco_drain_recommended",
          "text": "The rear yard would benefit from the installation of an aco drain channel to carry water to the drain."
        }
      ]
    },
    {
      "key": "sub_floor_ventilation",
      "title": "Sub Floor Ventilation",
      "type": "findings",
      "order": 6,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["airbrick_clean_count", "airbrick_upgrade_count", "airbrick_new_count"],
      "boilerplate_variants": [
        {
          "condition": "no_airbricks",
          "text": "There were no airbricks installed."
        },
        {
          "condition": "airbricks_not_inspectable",
          "text": "It was not possible to inspect the airbricks due to the following:"
        },
        {
          "condition": "airbricks_present",
          "text": "The sub floor voids were ventilated by the following ''visible'' number of airbricks:"
        },
        {
          "condition": "proposal_remove_clean",
          "text": "Remove air bricks, check airflow, adjust as necessary, clean debris & reinstall."
        },
        {
          "condition": "proposal_install_new",
          "text": "Install new 225 x 150 additional airbricks."
        },
        {
          "condition": "proposal_benefit",
          "text": "This will increase the airflow through the floor voids, reduce the humidity and the moisture content of linked timbers, which will greatly reduce the chances of attack by wood rotting fungi such as dry rot (serpulae lacrymans) in the future."
        },
        {
          "condition": "proposal_lift",
          "text": "Lift the existing air bricks."
        },
        {
          "condition": "lift_benefit",
          "text": "Lifting the airbricks will help to prevent water ponding and snow melting, causing water to run into the sub floor void, elevating the moisture levels of the timbers within."
        },
        {
          "condition": "no_works_required",
          "text": "No further works required."
        }
      ]
    },
    {
      "key": "room_inspection",
      "title": "Internal Room Inspection Details",
      "type": "findings",
      "order": 7,
      "required": true,
      "content_source": "mixed",
      "repeats_per": "room",
      "data_fields": ["room_name", "room_designation", "moisture_reading"],
      "photo_categories": ["timber_damage", "room_overview"],
      "llm_prompt_hint": "For each room, describe: room name and designation, ceiling condition, wall condition (joinery timbers, woodworm, wood rot, dampness), floor void condition (woodworm, wood rot, woodboring insects), and moisture reading. Reference photos inline.",
      "sub_sections": [
        {
          "key": "ceiling",
          "title": "Ceiling",
          "type": "findings",
          "order": 1,
          "required": true,
          "content_source": "mixed",
          "boilerplate_variants": [
            {
              "condition": "no_defects",
              "text": "At the time of inspection there were no defects to the ceilings of this room."
            },
            {
              "condition": "defects_found",
              "text": "At the time of inspection the following defects were observed to the ceiling of this room:"
            }
          ]
        },
        {
          "key": "walls",
          "title": "Walls",
          "type": "findings",
          "order": 2,
          "required": true,
          "content_source": "mixed",
          "boilerplate_variants": [
            {
              "condition": "no_defects",
              "text": "At the time of inspection there were no defects to the walls of this room."
            },
            {
              "condition": "defects_found",
              "text": "At the time of inspection the following defects were observed to the walls of this room:"
            }
          ]
        },
        {
          "key": "floors_voids",
          "title": "Floors and floor voids",
          "type": "findings",
          "order": 3,
          "required": true,
          "content_source": "mixed",
          "boilerplate_variants": [
            {
              "condition": "no_defects",
              "text": "At the time of inspection there were no defects to the floor voids of this room."
            },
            {
              "condition": "defects_found",
              "text": "At the time of inspection the following defects were observed to the floor voids of this room:"
            }
          ]
        },
        {
          "key": "moisture_reading",
          "title": "Moisture Reading",
          "type": "data",
          "order": 4,
          "required": false,
          "content_source": "survey_data",
          "boilerplate_variants": [
            {
              "condition": "reading_taken",
              "text": "Moisture reading taken from the timbers was recorded as:"
            }
          ]
        }
      ]
    },
    {
      "key": "summary",
      "title": "Summary",
      "type": "findings",
      "order": 8,
      "required": true,
      "content_source": "mixed",
      "llm_prompt_hint": "Aggregate all room findings into a concise summary. List the timber issues found and their locations.",
      "boilerplate_variants": [
        {
          "condition": "issues_intro",
          "text": "The timbers were suffering from the following issues:"
        },
        {
          "condition": "issue_woodworm",
          "text": "A woodworm infestation, the attack was of common furniture beetle (anobium punctatum)"
        },
        {
          "condition": "issue_wet_rot",
          "text": "An attack of wood rotting fungi, this was identified as wet rot"
        },
        {
          "condition": "issue_woodboring_weevil",
          "text": "Rotting timbers were also suffering from an infestation of woodboring weevil (Pentarthrum Huttoni)"
        },
        {
          "condition": "issue_dry_rot",
          "text": "An attack of wood rotting fungi, this was identified as dry rot (sepulae lacrymans)"
        },
        {
          "condition": "issue_high_moisture",
          "text": "A high W/W moisture level to the floor timbers, this was due to a lack of ventilation to the sub floor voids"
        }
      ]
    },
    {
      "key": "dry_rot_party_wall",
      "title": "Dry Rot - Treatment And Party Wall Act",
      "type": "boilerplate",
      "order": 9,
      "required": false,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "dry_rot_party_wall",
          "text": "Should an attack of dry rot affect the party wall (the wall between you and your neighbouring property) it is important that we treat the fungal attack in its entirety, that is from both sides. The homeowner is required by law to give notice to their neighbour before carrying out work that affects a shared wall."
        },
        {
          "condition": "party_wall_letter",
          "text": "Please find attached letter of notification to print out and pass to your neighbour, this should also assist with your party wall obligations (you are legally required to tell your neighbour of anything that may affect the party wall)."
        },
        {
          "condition": "non_guaranteed_party_wall",
          "text": "Non-guaranteed work: The work in this quotation is carried out as per your instructions and not as per our recommendations, we have no way of knowing if the attack has spread to adjoining properties. The guarantee will not apply to the party wall treatment."
        }
      ]
    },
    {
      "key": "proposals",
      "title": "Proposals",
      "type": "proposals",
      "order": 10,
      "required": true,
      "content_source": "mixed",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "We would propose for the following works to be carried out:"
        },
        {
          "condition": "proposal_dry_rot",
          "text": "Treatment for Dry Rot attack, as per the schedule specified below."
        },
        {
          "condition": "proposal_wet_rot",
          "text": "Timber replacement and treatment for wood rot, as per the schedule specified below."
        },
        {
          "condition": "proposal_wet_rot_weevil",
          "text": "Timber replacement and treatment for wood rot and woodboring insects, as per the schedule specified below."
        },
        {
          "condition": "proposal_woodworm",
          "text": "Treatment for woodworm infestation, as per the schedule specified below."
        },
        {
          "condition": "proposal_destructive_survey",
          "text": "Obtain permission from the vendor to carry out a destructive survey. For your convenience we have included a pre-filled email template to request permission from the property owner."
        }
      ]
    },
    {
      "key": "treatment_schedule",
      "title": "Treatment Schedule",
      "type": "treatment",
      "order": 11,
      "required": false,
      "content_source": "template",
      "sub_sections": [
        {
          "key": "schedule_woodworm",
          "title": "Schedule For Treatment Of Woodworm",
          "type": "treatment",
          "order": 1,
          "required": false,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "woodworm_treatment",
              "text": "Create openings/lift floorboards as required ensuring no nails left sticking out of removed boards.\nCover open electric outlets with polythene to prevent wetting (electric shock hazard).\nApply fog to voids/surfaces as per SOP.\nMake good to all areas treated."
            }
          ]
        },
        {
          "key": "schedule_dry_rot",
          "title": "Schedule For Treatment Of Dry Rot",
          "type": "treatment",
          "order": 2,
          "required": false,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "dry_rot_treatment",
              "text": "Open up affected area.\nSupport any structural bearing timbers for duration of works.\nCut out affected timbers as per SOP.\nTreat all remaining timber cut ends as per SOP.\nPrepare and place new timbers, do not fix.\nRemove new timbers.\nTreat all masonry as per SOP.\nClean out and sterilise joist wall socket holes as per SOP.\nApply fungal treatment gel to walls.\nInstall membrane system to protect walls and promote drying of masonry.\nTreat all surfaces of new timbers.\nInstall bower beam metal plating system.\nTreat and endwrap joists as per SOP.\nInstall and fix new timbers as per SOP.\nBag up and remove debris to safe external area.\nClean and tidy site."
            }
          ]
        },
        {
          "key": "schedule_wet_rot",
          "title": "Schedule For Treatment Of Wet Rot",
          "type": "treatment",
          "order": 3,
          "required": false,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "wet_rot_treatment",
              "text": "Open up affected area.\nCut out affected timbers as per SOP.\nTreat all remaining timber cut ends as per SOP.\nTreat all masonry as per SOP.\nClean out and sterilise joist wall socket holes as per SOP.\nTreat and endwrap joists as per SOP.\nInstall and fix new timbers as per SOP.\nBag up and remove debris to safe external area.\nClean and tidy site."
            }
          ]
        },
        {
          "key": "schedule_wet_rot_weevil",
          "title": "Schedule For Treatment Of Wet Rot And Woodboring Weevil",
          "type": "treatment",
          "order": 4,
          "required": false,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "wet_rot_weevil_treatment",
              "text": "Open up affected area.\nCut out affected timbers as per SOP.\nTreat all remaining timber cut ends as per SOP.\nTreat all masonry as per SOP.\nClean out and sterilise joist wall socket holes as per SOP.\nTreat all surfaces of new timbers with dual purpose application.\nTreat and endwrap joists as per SOP.\nInstall and fix new timbers as per SOP.\nBag up and remove debris to safe external area.\nClean and tidy site."
            }
          ]
        }
      ]
    },
    {
      "key": "surveyor_comments",
      "title": "Additional Supporting Comments From Surveyor",
      "type": "findings",
      "order": 12,
      "required": false,
      "content_source": "llm_generated",
      "llm_prompt_hint": "Provide practical advice about the timber issues found. Mention guarantee details (25 year), recommend full solutions over patching, and note any safety concerns. Reference specific room findings."
    },
    {
      "key": "ancillary_items",
      "title": "Ancillary Items",
      "type": "closing",
      "order": 13,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "No allowance has been made in our estimate for the removal or replacement of floor coverings, furnishings, furniture, roof void stored contents and any other items that may obstruct our work. Whilst we will be happy to roll back and loosely relay carpets, you should arrange for rooms to be cleared of anything delicate or of value, prior to our arrival on site. Unless otherwise agreed in writing, any time spent clearing areas to enable work to proceed will be charged for at our standard hourly day rates and added to your final account."
        }
      ]
    },
    {
      "key": "extent_of_survey",
      "title": "Extent of Survey",
      "type": "closing",
      "order": 14,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "The areas we have reported upon are those inspected in accordance with your instructions. If there are any omissions or if you believe that we have misinterpreted your survey instruction, please let us know at once. Where treatment has been recommended, unless otherwise stated above, this is on the understanding that the specified area has not previously been treated and guaranteed.\n\nYou should be aware that we have reported upon problems evident to us at the time of our inspection. We are not commenting in any general sense on the risks of dampness, fungal decay or any other defect not evident at the time of inspection, or that may develop in the future."
        }
      ]
    },
    {
      "key": "payment_terms",
      "title": "Payment",
      "type": "closing",
      "order": 15,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "An initial payment of 30% of the contract value will be payable in advance, this will give us confidence to order job specific materials, and to book the time for your project into our technicians schedules. The balance should always be paid in full within 7 days of completion."
        }
      ]
    },
    {
      "key": "surveyor_signature",
      "title": "Report Author",
      "type": "signature",
      "order": 16,
      "required": true,
      "content_source": "survey_data",
      "data_fields": ["surveyor_name", "surveyor_credentials", "surveyor_title"],
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "Report produced under the guidance of Tyne Tees Damp Proofing Ltd by:"
        }
      ]
    },
    {
      "key": "sketch_plan",
      "title": "Sketch Plan",
      "type": "sketch",
      "order": 17,
      "required": false,
      "content_source": "surveyor_input",
      "photo_categories": ["sketch_plan"]
    }
  ]'::jsonb,
  '{
    "title_prefix": "Timbers Inspection",
    "abbreviations": {
      "W/W": "Water Weight",
      "SOP": "Standard Operating Procedures"
    },
    "include_sketch_plan": true,
    "include_payment_terms": true,
    "payment_deposit_percentage": 30,
    "guarantee_years": 25,
    "company_name": "Tyne Tees Damp Proofing Ltd",
    "company_website": "https://www.tyneteesdampproofing.co.uk",
    "general_notes_document": "General Notes for clients and Health and Safety precautions"
  }'::jsonb
);

-- ============================================================
-- WOODWORM REPORT TEMPLATE
-- Source: WOODWORM_WORKBOOK_ANALYSIS.md + completed woodworm report PDF
-- Title prefix: "Specific Defects Inspection - Woodworm"
-- ============================================================

INSERT INTO report_templates (name, survey_type, version, is_default, sections, settings)
VALUES (
  'Woodworm Survey Report v1',
  'woodworm',
  1,
  true,
  '[
    {
      "key": "cover",
      "title": "Report",
      "type": "cover",
      "order": 1,
      "required": true,
      "content_source": "survey_data",
      "data_fields": ["client_name", "site_address", "site_address_line2", "site_city", "site_county", "site_postcode", "internal_reference", "inspection_date", "weather_conditions", "temperature_c"]
    },
    {
      "key": "property",
      "title": "The Property",
      "type": "property",
      "order": 2,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["property_type", "construction_type", "approx_build_year"],
      "photo_categories": ["property_front", "building_exterior"]
    },
    {
      "key": "reported_problem",
      "title": "Reported Problem",
      "type": "data",
      "order": 3,
      "required": true,
      "content_source": "survey_data",
      "data_fields": ["reported_defect"],
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "Woodworm suspected to:"
        }
      ]
    },
    {
      "key": "scope",
      "title": "The Scope",
      "type": "boilerplate",
      "order": 4,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "We must draw to your attention to the scope of our inspection. The inspection was solely to identify evidence of problems which were within those areas pointed out to us at the time of our visit which are listed above. Any areas not specifically referred to in this report have not been included and are not covered by the report or estimate."
        }
      ],
      "sub_sections": [
        {
          "key": "general_notes",
          "title": "",
          "type": "boilerplate",
          "order": 1,
          "required": true,
          "content_source": "template",
          "boilerplate_variants": [
            {
              "condition": "always",
              "text": "Our findings and proposals are set out below and should be read in conjunction with the enclosed document ''General Notes for clients and Health and Safety precautions''."
            }
          ]
        }
      ]
    },
    {
      "key": "inspection_findings",
      "title": "Inspection",
      "type": "findings",
      "order": 5,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["species_identified", "infestation_status"],
      "photo_categories": ["woodworm_evidence", "room_overview"],
      "boilerplate_variants": [
        {
          "condition": "no_damage",
          "text": "Our surveyor did not identify any damage related to wood boring insects."
        },
        {
          "condition": "historic_attack",
          "text": "Our inspection confirmed an historic attack of common furniture beetle (anobium punctatum)."
        },
        {
          "condition": "active_infestation",
          "text": "Our inspection confirmed an active infestation of common furniture beetle (anobium punctatum - picture below)."
        },
        {
          "condition": "infestation_areas_intro",
          "text": "The infestation was noted to the following areas:"
        }
      ],
      "sub_sections": [
        {
          "key": "ground_floor_rooms",
          "title": "Ground floor rooms:",
          "type": "findings",
          "order": 1,
          "required": false,
          "content_source": "survey_data",
          "repeats_per": "room"
        },
        {
          "key": "first_floor_rooms",
          "title": "First floor rooms:",
          "type": "findings",
          "order": 2,
          "required": false,
          "content_source": "survey_data",
          "repeats_per": "room"
        },
        {
          "key": "loft_rooms",
          "title": "Loft area/Attic rooms:",
          "type": "findings",
          "order": 3,
          "required": false,
          "content_source": "survey_data",
          "repeats_per": "room"
        },
        {
          "key": "other_rooms",
          "title": "Other rooms:",
          "type": "findings",
          "order": 4,
          "required": false,
          "content_source": "survey_data",
          "repeats_per": "room"
        },
        {
          "key": "inaccessible_areas",
          "title": "Inaccessible Areas",
          "type": "findings",
          "order": 5,
          "required": false,
          "content_source": "mixed",
          "boilerplate_variants": [
            {
              "condition": "inaccessible_intro",
              "text": "It was not possible to inspect all timbers at the time of our visit. Some areas were inaccessible because of:"
            },
            {
              "condition": "obstruction_laminate",
              "text": "Laminate/Wood overlay."
            },
            {
              "condition": "obstruction_carpet",
              "text": "Tacked or specialist carpet."
            },
            {
              "condition": "obstruction_sealed_floor",
              "text": "Sealed natural floor."
            }
          ]
        }
      ]
    },
    {
      "key": "proposals",
      "title": "Proposal",
      "type": "proposals",
      "order": 6,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["spray_floor_area", "spray_timber_area"],
      "boilerplate_variants": [
        {
          "condition": "no_treatment",
          "text": "No further treatment is necessary."
        },
        {
          "condition": "treatment_header",
          "text": "We would propose for the following works to be carried out:"
        },
        {
          "condition": "proposal_discrete_openings",
          "text": "Create discrete openings as required to facilitate treatment."
        },
        {
          "condition": "proposal_fogging",
          "text": "Carry out treatment for woodboring insects using our environmentally friendly (water based with no solvents or propellants) micro biocidal fluid fogging system."
        },
        {
          "condition": "proposal_staircase",
          "text": "Create access points to facilitate treatment of the staircase."
        },
        {
          "condition": "proposal_roof_void_heading",
          "text": "Roof void"
        },
        {
          "condition": "proposal_remove_insulation",
          "text": "Remove loft insulation and set aside to permit access to the roof base timbers."
        },
        {
          "condition": "proposal_roof_treatment",
          "text": "Carry out treatment for the eradication of woodworm infestation."
        },
        {
          "condition": "proposal_treat_roof_timbers",
          "text": "Treat all roof timbers and ceiling studs to the loft area."
        },
        {
          "condition": "proposal_replace_insulation",
          "text": "Replace the loft insulation quilt."
        },
        {
          "condition": "proposal_replace_timbers",
          "text": "Replace structurally compromised timbers to:"
        }
      ]
    },
    {
      "key": "treatment_methodology",
      "title": "Treatment",
      "type": "treatment",
      "order": 7,
      "required": false,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "treatment_method",
          "text": "We will apply new generation, Microtec woodworm treatment chemicals using our specialist Electronic aerosol micro spray system. This system allows the work to be carried out with minimum disruption. Treatment by electro-aerosol allows the chemical to permeate all connected voids with extremely high surface coverage even to remote areas."
        },
        {
          "condition": "insulation_handling",
          "text": "Loft Insulation (where possible) will be lifted to one side of the roof void area to expose timbers below, that area will be treated. The insulation will then be transferred to the treated side, the now exposed area will be treated and the insulation will be re-laid flat."
        }
      ]
    },
    {
      "key": "exclusion_zone",
      "title": "Exclusion Zone",
      "type": "boilerplate",
      "order": 8,
      "required": false,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "There will be no permitted entry to the areas of treatment, during the treatment and for 1 hour after completion of treatment works. Exclusion will be to the whole of all rooms treated and if communal areas such as halls, landings are treated we advise vacating the whole property. This applies to humans and all animals/pets."
        },
        {
          "condition": "fish_tanks",
          "text": "Fish tanks should be covered and sealed for the same duration. We advise that fish are removed and kept away from the area and that the tank water is changed prior to return of the fish."
        }
      ]
    },
    {
      "key": "ancillary_items",
      "title": "Ancillary Items",
      "type": "closing",
      "order": 9,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "No allowance has been made in our estimate for the removal or replacement of floor coverings, furnishings, furniture, roof void stored contents and any other items that may obstruct our work. Whilst we will be happy to roll back and loosely relay carpets, you should arrange for rooms to be cleared of anything delicate or of value, prior to our arrival on site. Unless otherwise agreed in writing, any time spent clearing areas to enable work to proceed will be charged for at our standard hourly day rates and added to your final account."
        }
      ]
    },
    {
      "key": "extent_of_survey",
      "title": "Extent of Survey",
      "type": "closing",
      "order": 10,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "The areas we have reported upon are those inspected in accordance with your instructions. If there are any omissions or if you believe that we have misinterpreted your survey instruction, please let us know at once. Where treatment has been recommended, unless otherwise stated above, this is on the understanding that the specified area has not previously been treated and guaranteed.\n\nYou should be aware that we have reported upon problems evident to us at the time of our inspection. We are not commenting in any general sense on the risks of dampness, fungal decay or any other defect not evident at the time of inspection, or that may develop in the future."
        }
      ]
    },
    {
      "key": "payment_terms",
      "title": "Payment",
      "type": "closing",
      "order": 11,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "An initial payment of 30% of the contract value will be payable in advance, this will give us confidence to order job specific materials, and to book the time for your project into our technicians schedules. The balance should always be paid in full within 7 days of completion."
        }
      ]
    },
    {
      "key": "surveyor_comments",
      "title": "Additional Supporting Comments From Surveyor",
      "type": "findings",
      "order": 12,
      "required": false,
      "content_source": "llm_generated",
      "llm_prompt_hint": "Provide practical advice about the woodworm findings. If no guarantee or recorded treatment exists, recommend treatment. Mention the guarantee period. Keep tone professional."
    },
    {
      "key": "surveyor_signature",
      "title": "Report Author",
      "type": "signature",
      "order": 13,
      "required": true,
      "content_source": "survey_data",
      "data_fields": ["surveyor_name", "surveyor_credentials", "surveyor_title"],
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "Report produced under the guidance of Tyne Tees Damp Proofing Ltd by:"
        }
      ]
    }
  ]'::jsonb,
  '{
    "title_prefix": "Specific Defects Inspection - Woodworm",
    "abbreviations": {},
    "include_sketch_plan": false,
    "include_payment_terms": true,
    "payment_deposit_percentage": 30,
    "guarantee_years": 25,
    "company_name": "Tyne Tees Damp Proofing Ltd",
    "company_website": "https://www.tyneteesdampproofing.co.uk",
    "general_notes_document": "General Notes for clients and Health and Safety precautions"
  }'::jsonb
);
