# Development Guide - Tyne Tees Survey System

## Quick Start (No Database Required)

The app works out of the box with sample data for demo purposes:

```bash
cd survey-system
npm install
npm run dev
```

Open http://localhost:3000 - you'll see the full UI with sample projects. Data resets on page refresh.

---

## Local Supabase with Docker

### Option 1: Simple Docker Compose

```bash
# Start PostgreSQL
cd survey-system
docker-compose up -d

# Run migrations (creates all tables)
PGPASSWORD=postgres psql -h localhost -U postgres -d postgres \
    -f supabase/migrations/001_initial_schema.sql
```

**Access:**
- Database: `localhost:5432` (postgres/postgres)
- Admin UI: http://localhost:8080

### Option 2: Full Supabase CLI

```bash
# Install Supabase CLI
brew install supabase/tap/supabase

# Start all Supabase services locally
cd survey-system
supabase start

# Get credentials
supabase status --show-keys
```

**Access:**
- API: http://localhost:54321
- Studio: http://localhost:54323
- DB: localhost:54322

---

## Switching Between Modes

### Demo Mode (No Database)
1. App runs with hardcoded sample data
2. Data persists in browser session only
3. Perfect for: UI testing, design reviews

### Local Database Mode
1. Set `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=http://localhost:5432
   NEXT_PUBLIC_SUPABASE_ANON_KEY=any-value
   ```
2. Restart dev server
3. Data persists in local PostgreSQL

### Cloud Mode (Production)
1. Create project at supabase.com
2. Add credentials to `.env.local`
3. Push migrations:
   ```bash
   supabase db push
   ```

---

## Database Schema

Key tables:
- `projects` - Survey projects with client/site info
- `photos` - Site photos with categories
- `sections` - Costing sections (Preparatory, DPC, etc.)
- `line_items` - Individual cost items
- `quotations` - Customer quotes
- `reports` - Generated PDF reports

---

## Common Commands

```bash
# Start development server
npm run dev

# Start with local database
docker-compose up -d && npm run dev

# View database (Adminer)
open http://localhost:8080

# Reset database
docker-compose down -v
docker-compose up -d
# Re-run migrations

# Generate TypeScript types from DB
supabase gen types typescript --local > types/database.types.ts
```
