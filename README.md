# TyneTees Damp Proofing Survey System

Survey management platform for a Newcastle damp proofing contractor. Handles the full lifecycle from customer enquiry through on-site survey, automated costing, quotation generation, and AI-written reports. Live at https://ttdp.dc81.io.

## Quick start

```bash
cd survey-system
npm ci
npm run build       # production build (validates routes compile)
npm run lint        # ESLint checks
# Do NOT run npm run dev — commit and push to main; Coolify auto-deploys.
```

Environment variables are injected by Coolify at build time. For the full list, see `docs/DEPLOYMENT.md`.

## Repository map

```
TyneTees_Damp/
├── AGENTS.md              # Agent/coding-assistant context
├── CLAUDE.md              # Claude Code policy + project reference
├── README.md              # This file
├── survey-system/         # Next.js application root
│   ├── src/
│   │   ├── app/           # App Router pages + API routes (21 routes)
│   │   ├── components/    # UI components (layout, wizard, report, calendar, UI primitives)
│   │   ├── context/       # AuthContext, CompanyProfileContext
│   │   ├── hooks/         # useSmartBack
│   │   ├── lib/           # 31 library files (pricing, mapping, reports, email, data layer)
│   │   ├── middleware.ts  # Supabase SSR session management
│   │   └── types/         # TypeScript types (database, wizard, report, photo, installer)
│   ├── supabase/
│   │   └── migrations/    # 34 SQL migration files
│   ├── Dockerfile         # Multi-stage Node 22 Alpine build
│   └── package.json
├── docs/                  # Documentation
│   ├── ARCHITECTURE.md    # System architecture
│   ├── DEPLOYMENT.md      # How it ships
│   ├── PROJECT_STATE.md   # Current focus + open threads
│   ├── audits/            # Point-in-time audit reports
│   ├── guides/            # Admin guides
│   ├── investigations/    # Technical investigations
│   ├── plans/             # In-flight plans
│   ├── setup/             # Setup guides (DB, auth, dev, calendar)
│   └── workbook-analysis/ # Excel workbook reverse-engineering
├── workbook_extraction/   # Excel analysis scripts (reference only)
└── *.xlsm, *.xls, *.csv  # Original Excel costing workbooks
```

## Where the docs live

- Agent/coding-assistant context: `AGENTS.md`, `CLAUDE.md`
- Architecture: `docs/ARCHITECTURE.md`
- How it ships: `docs/DEPLOYMENT.md`
- Current focus: `docs/PROJECT_STATE.md`
- Workbook analysis: `docs/workbook-analysis/`
- Setup guides: `docs/setup/`

## License / ownership

Internal proprietary project. DC81 Ltd / Dominic. Not open-source.
