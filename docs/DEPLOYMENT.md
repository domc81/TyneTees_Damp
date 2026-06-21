# TyneTees Damp — Deployment

## Deploy mechanism

Push-to-deploy via Coolify. The flow:

1. Commit and push to `main` on GitHub (`domc81/TyneTees_Damp`)
2. Coolify webhook detects the push and builds the Docker image
3. Multi-stage Dockerfile: `node:22-alpine` builder → standalone Next.js output → runner image on port 3000
4. Traefik (coolify-proxy) handles TLS termination and routes `ttdp.dc81.io` to the container
5. Cloudflare sits in front as DNS proxy and CDN

**Never run `npm run dev`, `docker run`, or `docker-compose up` for this app.** Commit, push, let Coolify deploy.

## Container details

- **App container:** `es4ws4gosc4g84gkosk4c008` (Next.js standalone, port 3000)
- **Supabase stack:** 14 containers with prefix `y04kk0wwoswogw0oowcs04gw` (db, kong, auth, rest, realtime, storage, meta, studio, analytics, vector, edge-functions, supavisor, imgproxy, minio)
- **Supabase API:** `https://api.ttdp.dc81.io` (via Kong gateway)
- **Docker network:** `coolify` (shared across all deployed projects)

## Required environment variables

Set in Coolify dashboard (injected at build time):

| Variable | Source |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `.ttdp-supabase-credentials` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.ttdp-supabase-credentials` |
| `SUPABASE_SERVICE_ROLE_KEY` | `.ttdp-supabase-credentials` |
| `OPENROUTER_API_KEY` | `/home/dominic/app-dc81/.env` |
| `DEEPGRAM_API_KEY` | `.deepgram-credentials` |
| `RESEND_API_KEY` | `.resend-credentials` |
| `CRON_SECRET` | Generated, stored in Coolify |
| `NEXT_PUBLIC_APP_URL` | `https://ttdp.dc81.io` |
| `NEXT_PUBLIC_SITE_URL` | `https://ttdp.dc81.io` |

All credential files live at `/home/dominic/.credentials/` (symlinks to `/root/`). Never hardcode values.

## First-time setup

Follow the server-wide deployment playbook at `/home/dominic/app-dc81/docs/DEPLOYMENT_PLAYBOOK.md` for the general procedure. TTDP-specific steps:

1. Create the GitHub repo (`domc81/TyneTees_Damp`) and push the codebase
2. In Coolify, create a new project and resource pointing to the repo
3. Set all environment variables listed above in the Coolify resource settings
4. Configure the build: Dockerfile path `survey-system/Dockerfile`, base directory `survey-system/`
5. Add DNS record in Cloudflare: `ttdp` CNAME to server, proxied
6. Coolify auto-provisions the TLS certificate via Traefik
7. Set up the Supabase stack separately (14 containers) — see `docs/setup/DATABASE.md`
8. Apply all migrations: `docker exec -i supabase-db-y04kk0wwoswogw0oowcs04gw psql -U supabase_admin -d postgres < supabase/migrations/<file>.sql`
9. Run seed data if needed: `survey-system/supabase/seed.sql`

## Database migrations

Migrations are applied manually (no automated migration runner):

```bash
docker exec -i supabase-db-y04kk0wwoswogw0oowcs04gw psql -U supabase_admin -d postgres < survey-system/supabase/migrations/<filename>.sql
```

39 migrations exist (38 in `survey-system/supabase/migrations/` + 1 in root `supabase/migrations/`).

## Rollback procedure

1. In Coolify dashboard, navigate to the TTDP resource
2. Click "Deployments" to see the deployment history
3. Select a previous successful deployment and click "Redeploy"
4. Alternatively, revert the commit on `main` and push — Coolify will rebuild from the reverted state

For database rollbacks, there are no down-migrations. Restore from the daily Postgres dump (backed up at 03:00 daily to Hetzner Storage Box, 7-day retention).

## Post-deploy verification

1. Visit https://ttdp.dc81.io — confirm the page loads without errors
2. Log in and verify the dashboard renders (stats, pipeline widget, activity feed)
3. Navigate to Enquiries — confirm the Kanban board loads with existing data
4. Navigate to Surveys — confirm the survey list loads
5. Check the Coolify deployment log for any build warnings or errors

## References

- Server-wide deployment playbook: `/home/dominic/app-dc81/docs/DEPLOYMENT_PLAYBOOK.md`
- Database setup: `docs/setup/DATABASE.md`
- Authentication setup: `docs/setup/AUTHENTICATION.md`
- Architecture: `docs/ARCHITECTURE.md`
