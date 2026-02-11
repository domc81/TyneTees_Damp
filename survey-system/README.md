# Tyne Tees Damp Proofing - Survey System

A modern, professional survey and costing system for damp proofing, timber, woodworm, and condensation surveys. Built with Next.js, TypeScript, and Supabase.

## Features

- **Multi-type Surveys**: Damp, Timber, Woodworm, and Condensation survey support
- **Photo Documentation**: Capture and organize site photos by category
- **Cost Calculator**: Line-item pricing with dimensions, waste factors, and markups
- **Quotation Generator**: Customer-facing quotes with optional items
- **Report Generation**: Professional PDF reports with findings and recommendations
- **Real-time Sync**: Offline-capable with cloud sync via Supabase

## Tech Stack

- **Frontend**: Next.js 14 + React + TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage (photos, PDFs)
- **Backend**: Supabase Edge Functions
- **Forms**: React Hook Form + Zod

## Project Structure

```
survey-system/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Dashboard
│   │   ├── survey/            # Survey pages
│   │   ├── costing/           # Cost calculator
│   │   ├── reports/           # Report generation
│   │   └── projects/          # Project list
│   ├── components/            # Reusable components
│   ├── lib/                   # Utilities & clients
│   │   ├── supabase-client.ts
│   │   ├── supabase-server.ts
│   │   └── cost-calculator.ts
│   └── types/                 # TypeScript types
│       └── database.types.ts
├── supabase/
│   ├── migrations/            # Database migrations
│   │   └── 001_initial_schema.sql
│   └── functions/             # Edge Functions
│       ├── send-quotation/
│       └── generate-report/
├── public/                    # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase account

### 1. Clone and Install

```bash
cd survey-system
npm install
```

### 2. Set Up Supabase

```bash
# Create a new Supabase project
# https://supabase.com

# Set environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### 3. Run Database Migrations

```bash
# Using Supabase CLI
supabase db push

# Or run the SQL in migrations/001_initial_schema.sql manually
```

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Set Up Edge Functions

```bash
# Deploy Edge Functions
supabase functions deploy send-quotation
supabase functions deploy generate-report
```

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email Provider (optional)
RESEND_API_KEY=your-resend-key
```

## Survey Types

| Type | Icon | Description |
|------|------|-------------|
| Damp | 💧 Rising damp, penetrating damp, tanking |
| Timber | 🪵 Structural timber, decay analysis |
| Woodworm | 🪲 Beetle infestation, treatment planning |
| Condensation | 💨 Ventilation, moisture control |

## Costing Features

- **Line Items**: Add materials, labor, equipment, subcontractors
- **Dimensions**: Calculate from length × width or manual quantity
- **Waste Factors**: Built-in waste percentages (default 10%)
- **Markup**: Section-level markup percentages
- **Travel**: Hours and distance calculations
- **VAT**: Automatic 20% VAT calculation

## Photos

- Capture via camera or upload
- Categorize by type (damp evidence, timber, ventilation, etc.)
- GPS tagging support
- Automatic inclusion in reports

## Quotation

- Professional PDF generation
- Optional item toggling
- Deposit calculation (30% default)
- Email directly to customers

## Deployment

### Vercel (Frontend)

```bash
# Connect your GitHub repo to Vercel
# Add environment variables in Vercel dashboard
vercel deploy
```

### Supabase (Backend)

```bash
# Deploy Edge Functions
supabase functions deploy --project-ref your-project-ref
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Proprietary - Tyne Tees Damp Proofing
