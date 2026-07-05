# TyneTees Damp Proofing Survey System

Web platform for a Newcastle damp proofing contractor (Tyne Tees Damp Proofing). Translates 4 Excel costing workbooks (Damp v48, Condensation v37, Timber v33, Woodworm v26) into a survey management application covering enquiry pipeline, on-site wizard assessment, automated costing, quotation generation, AI report writing, and calendar/booking. Production: https://ttdp.dc81.io

## Stack

- Framework: Next.js 14.2.35 (App Router, `src/` directory, `output: 'standalone'`)
- Runtime: Node 22 (Alpine, for Docker build)
- Language: TypeScript 5.3+ (strict mode, `@/*` path alias to `./src/*`)
- Database: Supabase (self-hosted PostgreSQL) — container prefix `y04kk0w`, API via Kong at `https://api.ttdp.dc81.io`
- Auth: Supabase Auth with RLS + role-based access (admin, office, surveyor)
- Styling: Tailwind CSS 3.4 with custom brand theme
- Email: Resend (transactional emails)
- Speech-to-text: Deepgram Nova-3 (survey observation transcription)
- LLM: OpenRouter — `anthropic/claude-sonnet-5` (report narratives), `google/gemini-2.5-flash` (observation polishing)
- PDF: @react-pdf/renderer (quotation PDFs)
- Drag-and-drop: @dnd-kit (Kanban board)
- Calendar: FullCalendar 6.x (booking management)
- Deploy target: Coolify + Traefik on Hetzner EX44, auto-deploy on push to `main`

## How to work locally

All commands run from `survey-system/` directory:

- Install: `npm ci`
- Build: `npm run build` (production build; validates routes compile)
- Lint: `npm run lint` (ESLint)
- Dev: `npm run dev` — **DO NOT USE**. Commit and push; Coolify handles deployment.
- Type-check: not a separate script; `ignoreBuildErrors: true` in next.config.mjs means the build does not fail on type errors
- DB types: `npm run db:generate` (generates `types/database.types.ts` from Supabase)
- DB migrations: applied manually via `docker exec -i supabase-db-y04kk0wwoswogw0oowcs04gw psql -U supabase_admin -d postgres < supabase/migrations/<filename>.sql`

## Ground truth

- Code of record: `survey-system/src/`
- Data model: `survey-system/supabase/migrations/` (42 SQL migrations + 1 root-level, applied manually via docker exec)
- Pricing logic source of truth: original Excel workbooks at project root (`*.xlsm`, `*.xls`) — all 220 costing line templates must match these
- Architecture: `docs/ARCHITECTURE.md`
- Deploy/rollback: `docs/DEPLOYMENT.md`
- Current focus and open threads: `docs/PROJECT_STATE.md`
- Workbook analysis: `docs/workbook-analysis/`
- Training guides: `docs/training/` (role-based onboarding docs with live screenshots)

## Conventions

- Commits: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`), commit directly to `main` per server policy
- PRs: not used on this repo (server-wide rule)
- What is committed: `survey-system/src/`, `survey-system/supabase/migrations/`, docs, config files, Dockerfile
- What is ignored: `node_modules/`, `.next/`, `.env`, `.env.local`, `build/`, `dist/`, `.claude/`
- Toast notifications use `sonner` — never use `alert()` calls
- Enquiry source values stored in Title Case
- Server actions body size limit is 10MB (photo uploads)
- Route param `[projectId]` in `/survey/` routes is historical — it refers to survey ID
- Survey list lives at `/surveys`; per-survey sub-pages (wizard, costing, report, handover, installer-info) live under `/survey/[projectId]/`
- `client_name` can be null — always use `(project.client_name || '')`

## Gotchas

- **Two different user UUIDs exist — always use `profile.id`, never `user.id`.** `useAuth()` exposes `user.id` (Supabase Auth UUID from `auth.users`) and `profile.id` (`user_profiles` UUID). All FK columns (`enquiry_activity.user_id`, `enquiries.assigned_to`, `payments.recorded_by`, `survey_bookings.created_by`, `notifications.user_id`) reference `user_profiles.id`. Passing `user.id` causes FK violations.
- `typescript.ignoreBuildErrors: true` in next.config.mjs — type errors do not fail the build. Run `npm run lint` to catch issues before push.
- TTDP Postgres is not host-mapped. Access only via Kong API gateway or `docker exec -it supabase-db-y04kk0wwoswogw0oowcs04gw psql -U supabase_admin -d postgres`.
- Edge functions in `supabase/functions/` are legacy dead code — all LLM/email operations use Next.js API routes under `src/app/api/`.
- `survey_type` enum includes `structural`, `comprehensive`, and `site_preparation` — `site_preparation` has 3 costing sections but no wizard steps or report templates; the other two have nothing — selecting them creates dead-end surveys.
- The 13 survey-type extension tables (`survey_damp_report`, etc.) are provisioned but unused — the wizard stores everything in `survey_rooms.room_data` JSONB.
- `public/images/woodworm/` contains static reference images (beetle photo + 3 treatment equipment photos) used by the report generator. The beetle image is CC BY 3.0 (CSIRO attribution required).
- Customer-facing reports intentionally hide all m², area, volume, and joist size/quantity data. The internal editor still shows these. Do not re-add measurements to `RoomFindingsSection.tsx` or `ScopeOfWorksSection.tsx`.
- Treatment methodology step counts: membrane 8, tanking 7, DPC injection 4, wet rot 11, dry rot 13, woodworm 7. These are hardcoded constants in `report-generator.ts`, not in the database.
- Guarantee paragraph in `report-generator.ts` is hardcoded — does not read `guarantee_years`/`guarantee_scheme_name` from company profile. Covers: 25-year on rising damp/dry rot/woodworm, 7-year on mould, Protected Guarantee scheme. For handover pack, guarantee type is derived from survey type via `deriveGuaranteeType()` in `handover-pack.ts`.
- `survey_bookings` has a `status` column: `provisional`, `scheduled`, `completed`, `cancelled`, `no_show`. Status transitions are enforced by `validateStatusTransition()` in `calendar-types.ts` (provisional → scheduled/cancelled, scheduled → completed/no_show/cancelled, terminal statuses have no outgoing transitions). Provisional bookings are created by Convert & Book (awaiting survey fee payment), can be confirmed/paid from the calendar modal, and auto-released by cron if payment expires.
- `communication_log.channel` supports: `email`, `sms`, `in_app` (system-generated), `phone`, `whatsapp`, `in_person` (manually logged). Manual entries use status `logged`.
- `payments` table tracks survey fees and deposits with token-based public access. Two types: `survey_fee` (paid via `/pay/[token]`) and `deposit` (auto-created on quotation acceptance, office marks paid).
- `enquiries` has `won_at` (set when deposit marked paid) and `cf_exported_at` (set on CF CSV download) columns. Pipeline status flow: new → awaiting_payment → booked → survey_complete → sent → won → closed. Side lanes: on_hold, lost. Handover pack page at `/survey/[projectId]/handover/` provides all CF exports.
- The Next.js app lives in `survey-system/` subdirectory, not project root. All npm commands must run from there.
- `RoleGuard` in `admin/layout.tsx` blocks surveyors from `/admin/*` routes except `/admin/availability` and `/admin/workload`. `enquiries/layout.tsx` blocks surveyors from `/enquiries/*`. API routes for payments, quotations, and admin endpoints check `user_profiles.role` and return 403 for unauthorised roles.
- All writes to `surveys.survey_data` JSONB must go through `serializeWrite()` from `src/lib/write-queue.ts` to prevent race conditions between wizard auto-save, photo uploads, and sketch uploads.
- Sketch plan uploads in the report editor store files in `survey-photos` bucket under `{surveyId}/sketch/` and link to the `sketch_plan` report section's `photos` array via `updateReportSectionPhotos()`. Supports JPEG, PNG, and PDF.
- Supabase Auth SMTP is not configured on the TTDP instance (`GOTRUE_SMTP_HOST` is blank). Password reset emails silently fail. To reset a user's password: Admin API PUT + `must_change_password` flag on `user_profiles`.
- The shared `Input` component (`src/components/ui/input.tsx`) auto-shows a password visibility toggle (Eye/EyeOff) for any `type="password"` field.
- Pricing config values live in the `pricing_config` table and are editable at `/admin/rates` — never hardcode rates in code (`cf-csv-export.ts` currently hardcodes £30.63/hr; known issue, read from `pricing_config` instead when touching it).
- The customer reinstatement responsibility note appears on all damp survey reports (membrane, injection, tanking) — amber callout in scope of works, same pattern as the electrical standards and asbestos notes. Do not remove it.

## Do not touch

- `workbook_extraction/` — analysis scripts for the original Excel workbooks; reference only
- `*.xlsm`, `*.xls`, `*.csv` at project root — original Excel workbooks and exports
- `survey-system/node_modules/`, `survey-system/.next/`, `survey-system/dist/` — build artefacts
- `survey-system/supabase/functions/` — legacy edge functions, not in active use
- Anything listed in `.gitignore`
