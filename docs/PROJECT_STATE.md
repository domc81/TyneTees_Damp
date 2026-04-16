# TyneTees Damp — Project State
**Last updated:** 2026-04-14
**Last commit:** 077839b — fix: prevent mapAdditionalWorks duplication for multi-issue surveys

## What This Project Is
Web platform for a Newcastle damp proofing contractor. Translating 4 Excel costing workbooks (Damp v48, Condensation v37, Timber v33, Woodworm v26) into a web application. MVP: Lead Gen + CRM + Survey System with automated pricing.

Tech: Next.js 14.2.35, Supabase (PostgreSQL), TypeScript, Tailwind CSS.

## What's Built & Working

### Auth & Access Control
- Login, forgot/change/update password flows
- ProtectedRoute client-side guard with role-based UI (admin, office, surveyor)
- Supabase SSR middleware for session management and token rotation
- Custom 404 and error boundary pages

### Dashboard
- Survey stats overview
- Enquiry pipeline widget with column counts
- Recent activity feed

### Enquiry Pipeline
- Kanban board with drag-and-drop (New → Contacted → Booked → Surveyed → Quoted → Won / On Hold / Declined)
- Detail drawer with tabs (details, activity, notes)
- Inline field editing with save
- SLA traffic lights and follow-up indicators with column urgency counts
- Auto-status transitions on survey completion and quotation generation
- Quotation accept/decline auto-transitions enquiry status
- On-hold customer email notifications with template messages
- Convert-and-book flow (enquiry → customer find-or-create + survey + booking)
- Card quick actions (contact shortcuts, follow-up picker)

### Customer Management
- List with search, create, edit
- Detail page with history and communication log

### Calendar & Bookings
- FullCalendar hub with booking display and status management
- Admin availability management (weekly hours, absence blocks)
- Surveyor availability patterns
- SlotPicker and SurveyorSelect reusable components
- Inline slot picker on survey detail page for booking/rebooking
- Survey creation integrates booking with surveyor assignment
- Booking confirmation, cancellation, and update emails
- Daily booking reminder cron with duplicate prevention
- Agenda view, directions link, mobile optimisation

### Survey System
- Survey creation with separate booking flow
- Survey list and detail hub page
- 5-step room-first wizard with auto-save (2-second debounce)
- Voice recording with Deepgram STT (Nova-3 with domain keyterm prompting + construction dictionary)
- AI observation polishing via OpenRouter (Grok 4.1 Fast)
- Photo capture: room ID photo, RH reading, unified defect evidence photos, per-wall moisture meter photos
- External inspection with per-defect photos and STT observations
- Floor number dropdown for flats

#### Damp Fields
- Wall moisture meter readings with per-wall photo
- Floor resin fillet joint mapping
- Overtape field
- Manual strip-out inputs (walls, stud walls, ceilings) with waste calculation

#### Condensation Fields
- Room-level RH measurement with auto-fill to humidity reading
- Property-level PIV section (wall-mounted PIV, electrical pack, core hole)
- Room extraction with active/passive flow types
- Passive vents (Cpass), Dryaire CVent, joinery ducting boxwork
- Loft hatch support
- 11 ducting component types

#### Timber Fields
- Joist replacement with corrected size dropdown (5x2, 7x2)
- Flooring types aligned with workbook
- Masonry preparation, sterilant, and protective treatment fields
- Clear sub-floor debris field
- Antinox floor protection board
- Staircase fogging
- Loft insulation lift/relay optional toggles for fogging

#### Woodworm Fields
- Staircase fogging support

### Pricing Engine
- 8 formula types (standard, ceiling_coverage, dpc_injection, compound_material, fixed_price, tiered_disposal, bag_and_cart, skip_hire)
- Supabase data loading and orchestration
- Travel and vehicle overhead calculator (runs post-engine)

### Mapping Engine
- Transforms wizard survey data into LineInput[] for pricing engine
- Aggregates room measurements across all rooms
- All 4 survey types (damp, condensation, timber, woodworm)
- Auto-cascading calculations (e.g., debris bags from strip-out area)
- Condensation PIV and extraction data wired to costing
- Manual strip-out inputs with workbook-matching waste calculation
- Fix for additional works duplication on multi-issue surveys

### Costing
- Auto-calculated from wizard data, section-by-section breakdown
- Material/labour cost separation with labour hours
- VAT calculation (20%)
- Multi-survey-type tabs
- Section price adjustment controls (percentage adjustments)
- Travel overhead integrated into display

### Quotations
- Generation from survey costing
- PDF rendering via @react-pdf/renderer
- Email sending with status tracking and copy link
- Public quotation page with token-based access
- UK-compliant acceptance with e-signature, consent capture, and immutable audit trail
- View tracking

### Reports
- LLM narrative generation (OpenRouter / Grok 4.1 Fast) with flat field mapping
- 4 default templates (damp, condensation, timber, woodworm)
- Executive summary section
- Detailed scope of works covering all 4 issue types
- Room findings for all issue types with enriched LLM context
- Section editor with inline review
- Status workflow: draft → generated → reviewed → finalised → published
- Publish/unpublish flow with shareable token link
- Public web report page with branded HTML, lightbox photos, urgency indicators
- Email sending with view tracking and copy link

### Notifications
- In-app realtime notifications via Supabase Realtime
- Notification bell with realtime updates
- Platform-wide event types with polymorphic references
- Notification preference management
- Email notification settings

### Email
- Resend integration with branded HTML templates
- Communication log with email audit trail
- Test email endpoint
- Config loading from platform_settings

### Settings & Admin
- Company profile with logo upload
- Notification preferences
- Team/surveyor management with role-based access
- Materials catalogue view and admin
- Pricing config editable via /admin/rates

### Installer Info
- Per-survey installer information form with dynamic categories
- Photo upload

### Other
- Smart back navigation (context-aware routing)
- CF CSV export with test coverage
- Dockerfile for production builds (Node 22 Alpine, standalone output)

## Database State
34 migrations applied. 44 costing sections, 227 line templates, 14 pricing config values, 30 material products, 4 report templates seeded.

Key tables: enquiries, enquiry_activity, on_hold_templates, customers, communication_log, user_profiles, platform_settings, surveys, survey_rooms, survey_images, costing_sections, costing_line_templates, pricing_config, materials_catalog, survey_costing_lines, costing_section_adjustments, quotations, quotation_sections, quotation_acceptances, report_templates, survey_reports, report_view_events, bookings, surveyor_availability, booking_reminders_sent, notifications, company_profile, section_inclusions, plus survey type extension tables.

## Codebase Stats
- 21 API routes
- 29 lib files
- 12 wizard components
- 18 report components
- 232 commits since 2026-02-20

## What's Next
- Workbook formula accuracy pass — verify all 227 line template calculations match Excel workbooks
- Costing manual overrides (surveyor adjusts individual line items)
- Woodworm wizard fields parity with workbook
- End-to-end testing with real survey data
- Mobile surveyor UX polish

## Architecture Decision: Room-First Survey
The survey follows how a surveyor physically works: room by room. In each room they select what issues they find (Damp, Condensation, Timber Decay, Woodworm). Only relevant measurement fields appear. A single room can have multiple issue types. The mapping engine aggregates all room data across the property to generate costing line items.

## Key Files
- `CLAUDE.md` — project context for Claude Code
- `src/lib/pricing-engine.ts` — calculation engine (8 formula types)
- `src/lib/pricing-data.ts` — pricing data loading + orchestration
- `src/lib/survey-mapping.ts` — transforms wizard data into pricing inputs
- `src/lib/travel-overhead.ts` — travel and vehicle overhead calculator
- `src/lib/survey-wizard-data.ts` — wizard persistence layer
- `src/lib/report-generator.ts` — LLM report narrative generation
- `src/lib/report-data.ts` — report CRUD
- `src/lib/report-publish.ts` — report publish/share
- `src/lib/quotation-pdf-renderer.tsx` — PDF generation
- `src/lib/email-service.ts` — Resend email sending
- `src/lib/supabase-data.ts` — canonical Supabase data layer
- `src/lib/calendar-data.ts` — booking queries
- `src/lib/customer-data.ts` — customer queries
- `src/types/database.types.ts` — canonical DB TypeScript types
- `src/types/survey-wizard.types.ts` — wizard data model types
- `src/types/survey-report.types.ts` — report types
