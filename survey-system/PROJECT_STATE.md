# TyneTees Damp — Project State
**Last updated:** 2026-02-19
**Last commit:** [current] — feat: add survey-to-costing mapping engine — transforms wizard data into pricing inputs

## What This Project Is
Web platform for a Newcastle damp proofing contractor. Translating 4 Excel costing workbooks (Damp v48, Condensation v37, Timber v33, Woodworm v26) into a web application. MVP: Lead Gen + CRM + Survey System with automated pricing.

Tech: Next.js 14, Supabase (PostgreSQL), TypeScript, Tailwind CSS.

## What's Built & Committed
- Login/auth flow with ProtectedRoute
- Dashboard with survey stats
- Enquiry management (list, create)
- Customer management (list, create, edit)
- Surveyor management (list, create, edit)
- Materials catalogue page
- Basic survey creation flow
- Photo upload to Supabase Storage
- Pricing engine: src/lib/pricing-engine.ts (8 formula types, tested and working)
- Pricing data layer: src/lib/pricing-data.ts (Supabase loader + orchestration)
- Pricing test page: src/app/admin/pricing-test/page.tsx
- Survey wizard: complete 5-step room-first UI with Supabase persistence
  - Wizard data layer: src/lib/survey-wizard-data.ts
  - Auto-save with 2-second debounce
  - Load/save wizard data and rooms
  - Room CRUD operations
- Mapping engine: src/lib/survey-mapping.ts
  - Transforms wizard survey data into LineInput[] for pricing engine
  - Aggregates room measurements across all rooms
  - Handles all 4 survey types (damp, condensation, timber, woodworm)
  - Auto-cascading calculations (e.g., debris bags = strip-out area × 2)
  - Template lookup from database by section_key + line_key

## Database State
44 costing sections, 227 line templates, 14 pricing config values, 30 material products seeded.
Tables: enquiries, customers, surveyors, surveys (renamed from projects), survey_rooms, costing_sections, costing_line_templates, pricing_config, materials_catalog, survey_costing_lines, plus survey type extension tables and output tables.

## What's Next (Build Order)
1. ✅ Survey wizard types — src/types/survey-wizard.types.ts (DONE 2026-02-19)
2. ✅ Room-first DB migration — add issues_identified and room_data JSONB to survey_rooms (DONE 2026-02-19)
3. ✅ Survey wizard UI components — COMPLETE (2026-02-19)
   - ✅ Wizard page skeleton (src/app/survey/[projectId]/wizard/page.tsx)
   - ✅ WizardStepper component (src/components/wizard/WizardStepper.tsx)
   - ✅ SiteDetailsStep component (src/components/wizard/SiteDetailsStep.tsx)
   - ✅ ExternalInspectionStep component (src/components/wizard/ExternalInspectionStep.tsx)
   - ✅ RoomInspectionStep component (src/components/wizard/RoomInspectionStep.tsx)
   - ✅ DampFields, CondensationFields, TimberFields, WoodwormFields components
   - ✅ AdditionalWorksStep component (src/components/wizard/AdditionalWorksStep.tsx)
   - ✅ ReviewStep component (src/components/wizard/ReviewStep.tsx)
4. ✅ Survey wizard persistence — COMPLETE (2026-02-19)
   - ✅ Wizard data layer: src/lib/survey-wizard-data.ts
   - ✅ Load wizard data on mount (loadWizardData)
   - ✅ Auto-save with 2-second debounce
   - ✅ Save wizard data (saveWizardData)
   - ✅ Room CRUD (saveRoom, deleteRoom, saveAllRooms)
   - ✅ Complete survey handler (marks wizard_completed = true)
   - ✅ Loading state, error handling, save indicators
5. ✅ Mapping engine — COMPLETE (2026-02-19)
   - ✅ src/lib/survey-mapping.ts
   - ✅ Template lookup loading from DB
   - ✅ Room data aggregation for all 4 survey types
   - ✅ Auto-cascading calculations
   - ✅ Additional works mapping
   - ✅ generateCostingFromSurvey() convenience function
6. Costing review page — auto-calculated costs, manual overrides
7. Estimate PDF generation
8. CF CSV export

## Architecture Decision: Room-First Survey
The survey follows how a surveyor physically works: room by room. In each room they select what issues they find (Damp, Condensation, Timber Decay, Woodworm). Only relevant measurement fields appear. A single room can have multiple issue types. The mapping engine aggregates all room data across the property to generate costing line items.

## Key Files
- CLAUDE.md — project context for Claude Code
- src/lib/pricing-engine.ts — calculation engine (8 formula types)
- src/lib/pricing-data.ts — pricing data loading + orchestration
- src/lib/survey-mapping.ts — transforms wizard data into pricing inputs
- src/lib/survey-wizard-data.ts — wizard persistence layer (load/save wizard data + rooms)
- src/lib/supabase-data.ts — general Supabase queries
- src/types/database.types.ts — canonical DB TypeScript types
- src/types/survey-wizard.types.ts — wizard data model types
