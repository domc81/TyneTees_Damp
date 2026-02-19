# TyneTees Damp — Project State
**Last updated:** 2026-02-19
**Last commit:** fa41f61 — fix: align pricing engine with actual DB schema

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

## Database State
44 costing sections, 227 line templates, 14 pricing config values, 30 material products seeded.
Tables: enquiries, customers, surveyors, surveys (renamed from projects), survey_rooms, costing_sections, costing_line_templates, pricing_config, materials_catalog, survey_costing_lines, plus survey type extension tables and output tables.

## What's Next (Build Order)
1. ✅ Survey wizard types — src/types/survey-wizard.types.ts (DONE 2026-02-19)
2. ✅ Room-first DB migration — add issues_identified and room_data JSONB to survey_rooms (DONE 2026-02-19)
3. Survey wizard UI components — room-by-room, issue-driven panels
4. Survey wizard page — multi-step form with save/load
5. Supabase persistence — wire wizard to surveys.survey_data + survey_rooms
6. Mapping engine — survey_data → LineInput[] (aggregates rooms, applies costing rules)
7. Costing review page — auto-calculated costs, manual overrides
8. Estimate PDF generation
9. CF CSV export

## Architecture Decision: Room-First Survey
The survey follows how a surveyor physically works: room by room. In each room they select what issues they find (Damp, Condensation, Timber Decay, Woodworm). Only relevant measurement fields appear. A single room can have multiple issue types. The mapping engine aggregates all room data across the property to generate costing line items.

## Key Files
- CLAUDE.md — project context for Claude Code
- src/lib/pricing-engine.ts — calculation engine (8 formula types)
- src/lib/pricing-data.ts — data loading + orchestration
- src/lib/supabase-data.ts — all Supabase queries
- src/types/database.types.ts — canonical DB TypeScript types
