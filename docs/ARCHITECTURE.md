# TyneTees Damp — Architecture

## System overview

```
Customer ──→ Enquiry Pipeline ──→ Survey Wizard ──→ Costing Engine ──→ Quotation ──→ Report
                  │                     │                │                  │            │
              Kanban board       Room-by-room        11 formula        PDF + email   LLM narrative
              (drag-drop)        inspection          types             public page   public page
                  │                     │                │
              Calendar/          Voice recording     Mapping engine
              Bookings           + AI polish         (aggregates rooms)
```

The Next.js app (`survey-system/src/`) serves both the internal staff UI and public-facing pages (quotation acceptance, report viewing). All authenticated pages are client-rendered; public pages use Server Components.

## Components

### Frontend (Next.js 14, App Router)

- **Dashboard** — survey stats, enquiry pipeline widget, recent activity feed
- **Enquiry Pipeline** — Kanban board with 7 columns (New → Assigned → Surveyed → Quoted → Accepted / Declined / On Hold), drag-and-drop via @dnd-kit, detail drawer with inline editing, SLA traffic lights, auto-status transitions
- **Survey Wizard** — 5-step room-first workflow: Site Details → External Inspection → Room Inspection (repeats) → Additional Works → Review. Voice recording via Deepgram, photo capture, auto-save with 2-second debounce
- **Costing Review** — auto-calculated from wizard data, section-by-section breakdown with adjustment controls, multi-survey-type tabs
- **Quotations** — PDF generation via @react-pdf/renderer, email delivery, public accept/decline page with e-signature
- **Reports** — LLM-generated narrative (Grok 4.1 Fast via OpenRouter), section editor, status workflow, public branded web report. Customer-facing view hides all measurements (m², joist sizes). Woodworm reports include beetle reference image, treatment equipment photos, and loft insulation note. Damp reports include customer reinstatement responsibility disclaimer.
- **Calendar** — FullCalendar with booking management, surveyor availability, booking notifications, confirm/mark-as-paid for provisional bookings, reschedule with SlotPicker, booking status state machine (provisional → scheduled → completed/no_show/cancelled), confirmation dialogs on all status changes
- **Admin** — materials catalogue (CRUD), costing line templates (formula params, pricing), pricing rates, surveyor availability, team management, workload dashboard

### Backend (Next.js API routes + Supabase)

25 API routes handle server-side operations requiring secrets (LLM calls, email sending, PDF generation, cron triggers). All CRUD for surveys, enquiries, bookings, and notifications is done via direct Supabase client SDK calls from the frontend, not through API routes.

The canonical data access layer is `src/lib/supabase-data.ts`.

### Database (Supabase / PostgreSQL)

Self-hosted Supabase stack (14 containers, prefix `y04kk0w`). 43 tables across these clusters:

- **CRM:** `enquiries`, `enquiry_activity`, `on_hold_message_templates`, `customers`, `communication_log`
- **User & Team:** `user_profiles`, `platform_settings`, `notification_preferences`
- **Surveys:** `surveys` (central table), `survey_rooms` (room_data JSONB), `survey_images`, `photos`, `survey_installer_info`
- **Costing:** `costing_sections` (44), `costing_line_templates` (220), `pricing_config` (14 values), `materials_catalog` (34 products), `survey_costing_lines`, `costing_section_adjustments`, `survey_customer_summary`, `survey_overheads`, `survey_subcontractor_costs`, `survey_caf1`
- **Quotations:** `quotations`, `quotation_sections`, `quotation_acceptances`, `quotation_views`
- **Reports:** `report_templates` (4, one per survey type), `survey_reports`, `report_views`
- **Calendar:** `survey_bookings`, `surveyor_availability`, `availability_blocks`
- **Notifications:** `notifications` (realtime subscriptions)
- **Company:** `company_profile`

41 migrations applied manually via `docker exec` (39 + 1 root-level + 1 communication_log expansion).

### External services

| Service | Purpose | Credential file |
|---------|---------|----------------|
| Supabase (self-hosted) | Auth, database, storage, realtime | `.ttdp-supabase-credentials` |
| OpenRouter (Grok 4.1 Fast) | Report narrative generation, observation polishing | `OPENROUTER_API_KEY` in `.env.local` |
| Deepgram (Nova-3) | Speech-to-text for survey observations | `.deepgram-credentials` |
| Resend | Transactional emails (quotations, reports, bookings) | `.resend-credentials` |
| Cloudflare | DNS + CDN proxy | `.cloudflare-credentials` |
| Coolify | Container deployment | `coolify_api_token` |

## Internal data flow

### Main use case: survey → quotation

1. Office creates enquiry (Kanban board), converts to customer + survey + booking
2. Surveyor completes 5-step wizard — data stored in `surveys.survey_data` JSONB (property-level) and `survey_rooms.room_data` JSONB (per-room)
3. Mapping engine (`survey-mapping.ts`) aggregates all rooms into `LineInput[]` per costing section
4. Pricing engine (`pricing-engine.ts`) calculates material + labour costs using 11 formula types against `costing_line_templates` and `pricing_config`
5. Travel overhead (`travel-overhead.ts`) adds vehicle costs post-engine
6. Results written to `survey_costing_lines`, displayed in costing review page
7. Generate quotation → snapshots costing into `quotation_sections`, creates PDF
8. Send to customer → email with public link → customer accepts/declines with e-signature
9. Generate report → LLM writes narrative sections from survey data → publish as branded web page

### Pricing formula types

`standard`, `ceiling_coverage`, `dpc_injection`, `digital_dpc`, `compound_material`, `fixed_price`, `per_room_fixed`, `ancillary_refit`, `tiered_disposal`, `bag_and_cart`, `skip_hire`

## Environment variables

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Supabase API base URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server | Admin Supabase access (bypasses RLS) |
| `OPENROUTER_API_KEY` | Server | LLM calls via OpenRouter |
| `DEEPGRAM_API_KEY` | Server | Speech-to-text transcription |
| `RESEND_API_KEY` | Server | Email sending |
| `CRON_SECRET` | Server | Authenticates cron-triggered API routes |
| `NEXT_PUBLIC_APP_URL` | Public | App base URL for email links |
| `NEXT_PUBLIC_SITE_URL` | Public | Fallback site URL |

## Non-obvious design decisions

- **Room-first survey model:** The wizard follows how a surveyor physically works (room by room), not issue-type-first. A single room can have multiple issue types (damp + timber + condensation). The mapping engine aggregates across all rooms to produce costing inputs.
- **JSONB over normalised tables:** 13 survey-type extension tables were provisioned but the wizard stores everything in `survey_rooms.room_data` JSONB. Simpler, working, and the extension tables are candidates for removal.
- **Excel workbooks as pricing source of truth:** All 220 line templates and formula parameters must match the original XLSM workbooks. Deviations cause real business impact.
- **Client-side rendering for authenticated pages:** All authenticated pages fetch data client-side. No SSR/streaming. Causes flash-of-spinner but was the faster path to MVP.
- **Forward-only enquiry transitions:** `shouldAutoTransition()` enforces ordering to prevent status regression. Terminal statuses (accepted/declined/completed) are never overwritten.
- **Booking status state machine:** `BOOKING_STATUS_TRANSITIONS` in `calendar-types.ts` defines valid transitions (provisional → scheduled/cancelled, scheduled → completed/no_show/cancelled, terminal statuses have no outgoing transitions). Enforced in `updateBooking()` and `cancelBooking()`, UI only shows valid action buttons.
- **Communication log channels:** `communication_log.channel` supports email, sms, in_app (system-generated), phone, whatsapp, in_person (manually logged by office staff). Manual entries use status `logged` to distinguish from system-sent entries.
- **Role-based route protection:** Two layers — `RoleGuard` (layout-level, wraps entire route groups like `/admin/*` and `/enquiries/*`) and `ProtectedRoute` with `allowedRoles` prop (page-level). Both redirect unauthorised users to the dashboard. API routes check role via `user_profiles.role` query against the service-role client.
- **Per-survey write queue:** `write-queue.ts` exports `serializeWrite(surveyId, fn)` which queues async writes per survey. Both `survey-photo-service.ts` (photo metadata append/delete) and `survey-wizard-data.ts` (auto-save) use this to prevent read-modify-write races on `surveys.survey_data` JSONB.
