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
- LLM: OpenRouter / `x-ai/grok-4.1-fast` (report narratives, observation polishing)
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
- Data model: `survey-system/supabase/migrations/` (35 SQL migrations, applied manually via docker exec)
- Pricing logic source of truth: original Excel workbooks at project root (`*.xlsm`, `*.xls`) — all 227 costing line templates must match these
- Architecture: `docs/ARCHITECTURE.md`
- Deploy/rollback: `docs/DEPLOYMENT.md`
- Current focus and open threads: `docs/PROJECT_STATE.md`
- Workbook analysis: `docs/workbook-analysis/`

## Conventions

- Commits: conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`), commit directly to `main` per server policy
- PRs: not used on this repo (server-wide rule)
- What is committed: `survey-system/src/`, `survey-system/supabase/migrations/`, docs, config files, Dockerfile
- What is ignored: `node_modules/`, `.next/`, `.env`, `.env.local`, `build/`, `dist/`, `.claude/`
- Toast notifications use `sonner` — never use `alert()` calls
- Enquiry source values stored in Title Case
- Server actions body size limit is 10MB (photo uploads)
- Route param `[projectId]` in `/survey/` routes is historical — it refers to survey ID
- `client_name` can be null — always use `(project.client_name || '')`

## Gotchas

- `typescript.ignoreBuildErrors: true` in next.config.mjs — type errors do not fail the build. Run `npm run lint` to catch issues before push.
- TTDP Postgres is not host-mapped. Access only via Kong API gateway or `docker exec -it supabase-db-y04kk0wwoswogw0oowcs04gw psql -U supabase_admin -d postgres`.
- Edge functions in `supabase/functions/` are legacy dead code — all LLM/email operations use Next.js API routes under `src/app/api/`.
- `survey_type` enum includes `structural`, `comprehensive`, and `site_preparation` but these have no wizard steps, mapping, or report templates — selecting them creates dead-end surveys.
- The 13 survey-type extension tables (`survey_damp_report`, etc.) are provisioned but unused — the wizard stores everything in `survey_rooms.room_data` JSONB.
- `public/` directory must never be empty — Dockerfile COPY requires it. Keep `.gitkeep` if needed.
- The Next.js app lives in `survey-system/` subdirectory, not project root. All npm commands must run from there.

## Do not touch

- `workbook_extraction/` — analysis scripts for the original Excel workbooks; reference only
- `*.xlsm`, `*.xls`, `*.csv` at project root — original Excel workbooks and exports
- `survey-system/node_modules/`, `survey-system/.next/`, `survey-system/dist/` — build artefacts
- `survey-system/supabase/functions/` — legacy edge functions, not in active use
- Anything listed in `.gitignore`
