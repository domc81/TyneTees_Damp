# TyneTees Damp — Architecture

## System overview

```
Customer ──→ Enquiry Pipeline ──→ Survey Wizard ──→ Costing Engine ──→ Quotation ──→ Report
                  │                     │                │                  │            │
              Kanban board       Room-by-room        8 formula         PDF + email   LLM narrative
              (drag-drop)        inspection          types             public page   public page
                  │                     │                │
              Calendar/          Voice recording     Mapping engine
              Bookings           + AI polish         (aggregates rooms)
```

The Next.js app (`survey-system/src/`) serves both the internal staff UI and public-facing pages (quotation acceptance, report viewing). All authenticated pages are client-rendered; public pages use Server Components.

## Components

### Frontend (Next.js 14, App Router)

- **Dashboard** — survey stats, enquiry pipeline widget, recent activity feed
- **Enquiry Pipeline** — Kanban board with 7 columns (New through Won/Declined), drag-and-drop via @dnd-kit, detail drawer with inline editing, SLA traffic lights, auto-status transitions
- **Survey Wizard** — 5-step room-first workflow: Site Details → External Inspection → Room Inspection (repeats) → Additional Works → Review. Voice recording via Deepgram, photo capture, auto-save with 2-second debounce
- **Costing Review** — auto-calculated from wizard data, section-by-section breakdown with adjustment controls, multi-survey-type tabs
- **Quotations** — PDF generation via @react-pdf/renderer, email delivery, public accept/decline page with e-signature
- **Reports** — LLM-generated narrative (Grok 4.1 Fast via OpenRouter), section editor, status workflow, public branded web report
- **Calendar** — FullCalendar with booking management, surveyor availability, booking notifications
- **Admin** — materials catalogue, costing line templates, pricing rates, team management

### Backend (Next.js API routes + Supabase)

21 API routes handle server-side operations requiring secrets (LLM calls, email sending, PDF generation, cron triggers). All CRUD for surveys, enquiries, bookings, and notifications is done via direct Supabase client SDK calls from the frontend, not through API routes.

The canonical data access layer is `src/lib/supabase-data.ts`.

### Database (Supabase / PostgreSQL)

Self-hosted Supabase stack (14 containers, prefix `y04kk0w`). Key table clusters:

- **CRM:** `enquiries`, `enquiry_activity`, `customers`, `communication_log`
- **Surveys:** `surveys` (central table — 22 FKs into it), `survey_rooms` (room_data JSONB), `survey_images`
- **Costing:** `costing_sections` (44), `costing_line_templates` (227), `pricing_config` (14 values), `materials_catalog` (30 products), `survey_costing_lines`
- **Quotations:** `quotations`, `quotation_sections`, `quotation_acceptances` (immutable audit trail)
- **Reports:** `report_templates` (4, one per survey type), `survey_reports`, `report_view_events`
- **Calendar:** `bookings`, `surveyor_availability`, `booking_reminders_sent`
- **Notifications:** `notifications` (realtime subscriptions)

35 migrations applied manually via `docker exec`.

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
4. Pricing engine (`pricing-engine.ts`) calculates material + labour costs using 8 formula types against `costing_line_templates` and `pricing_config`
5. Travel overhead (`travel-overhead.ts`) adds vehicle costs post-engine
6. Results written to `survey_costing_lines`, displayed in costing review page
7. Generate quotation → snapshots costing into `quotation_sections`, creates PDF
8. Send to customer → email with public link → customer accepts/declines with e-signature
9. Generate report → LLM writes narrative sections from survey data → publish as branded web page

### Pricing formula types

`standard`, `ceiling_coverage`, `dpc_injection`, `compound_material`, `fixed_price`, `tiered_disposal`, `bag_and_cart`, `skip_hire`

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
- **Excel workbooks as pricing source of truth:** All 227 line templates and formula parameters must match the original XLSM workbooks. Deviations cause real business impact.
- **Client-side rendering for authenticated pages:** All authenticated pages fetch data client-side. No SSR/streaming. Causes flash-of-spinner but was the faster path to MVP.
- **Forward-only enquiry transitions:** `shouldAutoTransition()` enforces ordering to prevent status regression. Terminal statuses (won/declined) are never overwritten.
