# CLAUDE.md — TyneTees Damp Proofing Survey System

@./AGENTS.md
@../CLAUDE.md

## Project Overview

Web platform for a Newcastle damp proofing contractor. Translating 4 Excel costing workbooks (Damp v48, Condensation v37, Timber v33, Woodworm v26) into a web application. MVP: Lead Gen + CRM + Survey System with automated pricing.

**Client:** TyneTees Damp Proofing (sole contractor)
**Developer:** Dominic / DC81 Ltd
**Repository:** https://github.com/domc81/TyneTees_Damp.git
**Live URL:** https://ttdp.dc81.io

Stack, local commands, ground truth, conventions, and gotchas are in `AGENTS.md` (imported above). Full architecture detail — repository layout, component/lib/API indexes, data model, pricing config — is in `docs/ARCHITECTURE.md`.

## Infrastructure & Deployment

- **Deployment:** Coolify (auto-deploy on push to `main`) → Traefik → Cloudflare
- **App container:** `es4ws4gosc4g84gkosk4c008` (Next.js standalone, node:22-alpine multi-stage Dockerfile, port 3000)
- **Supabase container prefix:** `y04kk0wwoswogw0oowcs04gw` (14 containers) — API at `https://api.ttdp.dc81.io` via Kong
- **TTDP Postgres is NOT host-mapped** — access via Kong or `docker exec` (psql + migration commands in `AGENTS.md` → How to work locally)
- `.env.local` at `survey-system/.env.local` is owned by `root:dc81-secrets` and injected by Coolify at build time. Full environment variable table: `docs/ARCHITECTURE.md`.

### Credentials

All read from `/home/dominic/.credentials/` at runtime — **never hardcode or commit values**.

| File | Used for |
|---|---|
| `.ttdp-supabase-credentials` | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, Postgres password |
| `.resend-credentials` | `RESEND_API_KEY` for transactional emails |
| `.deepgram-credentials` | `DEEPGRAM_API_KEY` for speech-to-text |
| `.cloudflare-credentials` | Cloudflare API access |
| `coolify_api_token` | Coolify API bearer token |

## Architecture Summary

Full detail, data flow, and design rationale: `docs/ARCHITECTURE.md`.

- **Room-first survey wizard** — 5 steps: Site Details → External Inspection → Room-by-Room (repeats) → Additional Works → Review. Rooms multi-select issues (damp / condensation / timber / woodworm); only relevant fields appear. Data: `surveys.survey_data` JSONB (property-level) + `survey_rooms.room_data` JSONB (per room).
- **Costing flow** — mapping engine aggregates rooms → `LineInput[]` → pricing engine (11 formula types against `costing_line_templates` + `pricing_config`) → travel overhead post-engine.
- **Enquiry pipeline** — Kanban with stages New → Awaiting Payment → Booked → Survey Complete → Sent → Won → Closed (side lanes: On Hold, Lost); auto-transitions; detail drawer with integrated customer management.
- **Quotations & reports** — quotation PDF + public accept/decline with e-signature (deposit auto-created on acceptance); report LLM narrative (OpenRouter `anthropic/claude-sonnet-5`) → section editor → published branded public page.

## TypeScript Conventions

- **Canonical DB types** in `src/types/database.types.ts`
- **Data functions** in `src/lib/supabase-data.ts` — primary data layer for all Supabase queries
- **Wizard types** in `src/types/survey-wizard.types.ts` (canonical for wizard data)
- **Report types** in `src/types/survey-report.types.ts`
- **Path alias:** `@/*` maps to `./src/*`
- **Auth context** exports: `session`, `user`, `profile`, `role`, `isAdmin`, `isOffice`, `isSurveyor`, `mustChangePassword`

## External API Access Available

- **Cloudflare** — DNS, CDN (credentials at `.cloudflare-credentials`)
- **Coolify** — Deployment management (API token at `coolify_api_token`)
- **Resend** — Transactional email (credentials at `.resend-credentials`)
- **Deepgram** — Speech-to-text (credentials at `.deepgram-credentials`)
- **OpenRouter** — LLM API access (key in `.env.local`, model: `anthropic/claude-sonnet-5` (report narrative + polish))

## Claude-specific policy

- Preferred tools: Edit/Grep/Glob over bash equivalents (per server CLAUDE.md)
- Run `npm run build` from `survey-system/` before any push to validate routes compile
- Run `npm run lint` to catch issues — the build ignores type errors (`ignoreBuildErrors: true`)
- Spawn the `Explore` subagent for codebase-wide searches of 3+ queries
- Never start dev servers or use Playwright against this app — commit and push, let Coolify deploy
- All LLM calls go through OpenRouter (model: `anthropic/claude-sonnet-5` (report narrative + polish)) — never call Anthropic API directly
- After a sprint or doc-update request, use the `update-project-docs` skill — status goes to `docs/PROJECT_STATE.md`, catalogs to `docs/ARCHITECTURE.md`, NOT into this file
- Skills: none project-specific
- MCP servers: none project-specific

## References

- Server-wide context: imported via `@../CLAUDE.md`
- Deployment playbook: `/home/dominic/app-dc81/docs/DEPLOYMENT_PLAYBOOK.md`
- This project's architecture (incl. repository layout, component/lib/API indexes, data model, pricing config): `docs/ARCHITECTURE.md`
- This project's deploy procedure: `docs/DEPLOYMENT.md`
- Current focus, open threads, known issues: `docs/PROJECT_STATE.md`
- Implementation trivia (retry/timeout behaviour, storage layouts, UI mechanics): `docs/specs/implementation-notes.md`
- Setup guides: `docs/setup/` · Workbook analysis: `docs/workbook-analysis/` · Audits: `docs/audits/`
- Training guides: `docs/training/` (4 role-based onboarding docs with live screenshots)
