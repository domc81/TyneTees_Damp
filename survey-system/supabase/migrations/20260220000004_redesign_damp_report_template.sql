-- Migration: Redesign damp report template
-- Date: 2026-02-20
-- Reason: Complete redesign of damp report structure and boilerplate text
--         - New section structure (15 sections)
--         - Rewritten boilerplate for clarity and professionalism
--         - New sections: about_us, summary_of_works, surveyor_profile
--         - Simplified survey_context section
--         - Improved room_findings section
-- Depends on: 20260220000002_seed_report_templates.sql
-- Rollback: Apply 20260220000002_seed_report_templates.sql again

-- Update the existing damp template (preserves foreign key references)
UPDATE report_templates
SET
  name = 'Damp Survey Report v2',
  version = 2,
  sections = $$[
    {
      "key": "cover",
      "title": "Survey Report",
      "type": "cover",
      "order": 1,
      "required": true,
      "content_source": "survey_data",
      "data_fields": ["client_name", "site_address", "site_city", "site_county", "site_postcode", "reference", "inspection_date", "weather_conditions"]
    },
    {
      "key": "about_us",
      "title": "About Tyne Tees Damp Proofing Ltd",
      "type": "boilerplate",
      "order": 2,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "Tyne Tees Damp Proofing Ltd is a specialist remedial contractor serving residential and commercial clients across the North East of England, including Tyneside, Wearside, Northumberland and County Durham. Our team has been working in the damp proofing industry since 1987.\n\nWe specialise in the diagnosis and treatment of rising damp, penetrating damp, condensation, timber decay (dry rot and wet rot), woodworm infestation and basement waterproofing. Our surveyors are trained to correctly differentiate between the causes of damp — ensuring accurate diagnosis and effective treatment first time.\n\nQualifications & Standards\n\nOur surveyors hold the Certificated Surveyor in Remedial Treatments (CSRT) qualification and are Associate members of the Institute of Specialist Surveyors and Engineers (A.Inst.SSE). All survey and treatment works are carried out using only BBA-approved products and in accordance with current industry best practice.\n\nGuarantees\n\nWe offer 25-year company and insurance-backed guarantees for damp proofing and timber treatment works above external ground level. All guarantees cover both materials and labour. Our membrane products carry a 25-year manufacturer's product guarantee. Insurance-backed guarantees are issued through the Westminster Protected Guarantee scheme, which operates independently of the contractor and does not rely on renewal premiums for continued cover — providing genuine long-term protection that is fully transferable to future property owners.\n\nOur Track Record\n\nWe maintain a 100% success rate on all damp and timber treatments, with no guarantee claims to date."
        }
      ]
    },
    {
      "key": "survey_context",
      "title": "The Survey",
      "type": "boilerplate",
      "order": 3,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["reported_defect"],
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "In accordance with your instructions, we carried out a specific defects inspection of the above property for the following reported problem:\n\nReported defect: {reported_defect}\n\nOrientation\n\nThe terms left, right, front and rear are used as viewed from the outside of the building, facing the front elevation.\n\nScope of Inspection\n\nThis inspection was limited to identifying evidence of the problems listed above within the areas indicated to us at the time of our visit. Any areas not referred to in this report were not inspected and are not covered by our findings or estimate.\n\nWhere treatment has been recommended, this is on the understanding that the specified area has not previously been treated under an existing guarantee, unless otherwise stated.\n\nAbbreviations\n\nDPC — Damp Proof Course · DPM — Damp Proof Membrane · USCC — Under Separate Contract and Costs · ACMs — Asbestos Containing Materials · W/W — Water Weight"
        }
      ]
    },
    {
      "key": "property",
      "title": "The Property",
      "type": "property",
      "order": 4,
      "required": true,
      "content_source": "survey_data",
      "data_fields": ["property_type", "construction", "build_year"],
      "photo_categories": ["street_view", "property_front"]
    },
    {
      "key": "external_inspection",
      "title": "External Inspection",
      "type": "findings",
      "order": 5,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["building_defects", "wall_tie_concern", "cracking_concern", "ground_level_issues"],
      "photo_categories": ["building_defect", "general"],
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
              "text": "You should check your lease and find who is responsible for the upkeep of the roof, it is possible the upstairs flat may need to carry out the repairs or it could be shared cost. Whilst the roof repairs may fall under the freeholder's responsibility, any damp or timber decay resulting from the roof failure will be your responsibility to remedy."
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
      "order": 6,
      "required": true,
      "content_source": "mixed",
      "data_fields": ["dpc_type", "dpc_condition", "dpc_evidence"],
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
      "order": 7,
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
          "text": "The sub floor voids were ventilated by the following 'visible' number of airbricks:"
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
      "key": "room_findings",
      "title": "Internal Inspection",
      "type": "room_findings",
      "order": 8,
      "required": true,
      "content_source": "llm_generated",
      "repeats_per": "room",
      "photo_categories": ["damp_evidence", "room_general"],
      "llm_prompt_hint": "Write a 1-2 paragraph narrative for this room describing the damp findings. State what was found, where it was found, and what treatment is recommended. Reference specific measurements. End with the recommended treatment action. Note: This was a non-destructive inspection. All findings are based on visual assessment, electronic moisture meter readings, digital laser thermometer readings and tactile examination of accessible surfaces. No opening up works were carried out."
    },
    {
      "key": "summary_of_works",
      "title": "Summary of Proposed Works",
      "type": "data",
      "order": 9,
      "required": true,
      "content_source": "survey_data",
      "data_fields": ["rooms_summary", "additional_works"]
    },
    {
      "key": "surveyor_comments",
      "title": "Surveyor Comments",
      "type": "findings",
      "order": 10,
      "required": false,
      "content_source": "llm_generated",
      "llm_prompt_hint": "Write 2-3 paragraphs summarising the overall survey findings. Reference specific rooms, measurements and treatments. State the most urgent priorities. Provide practical context for the homeowner about the recommended works."
    },
    {
      "key": "ancillary_items",
      "title": "Ancillary Items",
      "type": "boilerplate",
      "order": 11,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "Our estimate does not include the removal or replacement of floor coverings, furnishings, furniture, stored items in roof voids, or any other items that may obstruct the works.\n\nPlease arrange for rooms to be cleared of anything delicate or of value before our arrival on site. We are happy to roll back and loosely relay carpets where possible.\n\nAny time spent clearing areas to enable work to proceed will be charged at our standard day rates and added to your final account, unless otherwise agreed in writing."
        }
      ]
    },
    {
      "key": "extent_of_survey",
      "title": "Extent of Survey",
      "type": "boilerplate",
      "order": 12,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "We have reported on the areas inspected in accordance with your instructions. If you believe any areas have been omitted or that we have misinterpreted your requirements, please contact us immediately.\n\nOur findings relate to conditions evident at the time of inspection. We are not commenting on the general risk of dampness, fungal decay or any other defect not visible during our visit, or that may develop in the future."
        }
      ]
    },
    {
      "key": "payment_terms",
      "title": "Payment Terms",
      "type": "boilerplate",
      "order": 13,
      "required": true,
      "content_source": "template",
      "boilerplate_variants": [
        {
          "condition": "always",
          "text": "An initial payment of 30% of the contract value is required before works commence. This covers the cost of ordering materials specific to your project and securing a date in our installation schedule.\n\nThe remaining balance is due within 7 days of completion."
        }
      ]
    },
    {
      "key": "surveyor_profile",
      "title": "Your Surveyor",
      "type": "signature",
      "order": 14,
      "required": true,
      "content_source": "survey_data",
      "data_fields": ["surveyor_name", "surveyor_title", "surveyor_credentials", "surveyor_photo", "surveyor_experience"]
    },
    {
      "key": "sketch_plan",
      "title": "Sketch Plan",
      "type": "sketch",
      "order": 15,
      "required": false,
      "content_source": "surveyor_input"
    }
  ]$$::jsonb,
  settings = $${
    "title_prefix": "Specific Defects Inspection - Rising Damp",
    "abbreviations": {
      "DPC": "Damp Proof Course",
      "DPM": "Damp proof membrane",
      "USCC": "Under separate contract and costs",
      "ACMs": "Asbestos containing materials",
      "W/W": "Water Weight"
    },
    "include_sketch_plan": true,
    "include_payment_terms": true,
    "payment_deposit_percentage": 30,
    "guarantee_years": 25,
    "company_name": "Tyne Tees Damp Proofing Ltd",
    "company_website": "https://www.tyneteesdampproofing.co.uk",
    "general_notes_document": "General Notes for clients and Health and Safety precautions"
  }$$::jsonb,
  updated_at = now()
WHERE survey_type = 'damp' AND is_default = true;
