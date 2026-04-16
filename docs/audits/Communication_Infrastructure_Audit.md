# Communication Infrastructure Audit

**Date:** 2 March 2026
**Scope:** Technical audit of notification infrastructure, email/SMS delivery capabilities, database triggers, and Realtime configuration
**Status:** READ-ONLY ANALYSIS — No modifications made

---

## Section 1: Notifications Table — Full Schema & Constraints

### Column Listing

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| `id` | UUID | NOT NULL | `gen_random_uuid()` | Primary key |
| `user_id` | UUID | NOT NULL | — | FK to `user_profiles.id` (recipient) |
| `type` | TEXT | NOT NULL | — | Event type, restricted by CHECK constraint |
| `title` | TEXT | NOT NULL | — | Human-readable notification title |
| `message` | TEXT | NOT NULL | — | Notification body text |
| `booking_id` | UUID | nullable | — | FK to `survey_bookings.id`, ON DELETE SET NULL |
| `read` | BOOLEAN | NOT NULL | `false` | Whether the user has seen/dismissed it |
| `created_at` | TIMESTAMPTZ | NOT NULL | `now()` | Creation timestamp |

**Source:** Migration `20260302000004_calendar_booking_availability_notifications.sql`

### Indexes

| Index Name | Type | Columns |
|------------|------|---------|
| `notifications_pkey` | PRIMARY KEY (btree) | `id` |
| `idx_notifications_user_id` | btree | `user_id` |
| `idx_notifications_user_unread` | composite btree | `(user_id, read)` |

### Constraints

| Constraint | Type | Definition |
|------------|------|------------|
| `notifications_pkey` | PRIMARY KEY | `id` |
| `notifications_type_check` | CHECK | `type IN ('booking_created', 'booking_updated', 'booking_cancelled', 'booking_reminder')` |
| `notifications_user_id_fkey` | FOREIGN KEY | `user_id` → `user_profiles(id)` ON DELETE CASCADE |
| `notifications_booking_id_fkey` | FOREIGN KEY | `booking_id` → `survey_bookings(id)` ON DELETE SET NULL |

### RLS Policies

| Policy Name | Operation | Roles | Condition |
|-------------|-----------|-------|-----------|
| Users can view own notifications | SELECT | `authenticated` | `user_profiles.id = notifications.user_id AND user_profiles.user_id = auth.uid()` |
| Users can update own notifications | UPDATE | `authenticated` | Same as above (USING + WITH CHECK) |
| Office and admins can insert notifications | INSERT | `authenticated` | `is_office_or_admin()` |
| Service role full access to notifications | ALL | `service_role` | `true` (unrestricted) |

**Key observation:** There is NO policy allowing surveyors to INSERT notifications. Notification creation currently works because the `createNotification()` function runs client-side using the logged-in office/admin user's session. If a surveyor action ever needs to create a notification (e.g. wizard completion notifying the office), it would fail under the current RLS unless routed through an API route using the service role key.

### Current Row Count

| Metric | Value |
|--------|-------|
| Total rows | 3 |
| Unread | 3 |
| Read | 0 |
| Distinct users | 1 |
| Oldest notification | 2026-03-02 15:52:56 UTC |
| Newest notification | 2026-03-02 16:09:28 UTC |

All 3 notifications are `booking_created` type, all for the same surveyor, all unread. This confirms the system is working end-to-end for booking creation notifications but has seen minimal real usage.

---

## Section 2: Notification Data Flow — End to End

### How `notifyBookingCreated` Works

**Trigger chain:**

1. **Office user clicks "Book" in the SlotPicker UI**
2. → Calls `createBooking(formData)` in `src/lib/calendar-data.ts:497–534`
3. → Inserts row into `survey_bookings` table via Supabase client (runs with the office user's session)
4. → On success, calls `notifyBookingCreated(booking)` **fire-and-forget** (`.catch()` swallows errors)
5. → `notifyBookingCreated()` calls `createNotification()` which inserts into `notifications` table
6. → The INSERT uses the **office user's** Supabase client session
7. → RLS policy "Office and admins can insert notifications" allows this INSERT

**Realtime pickup in NotificationBell:**

8. → `NotificationBell.tsx` component mounts and creates a Supabase Realtime channel
9. → Channel name: `notifications-{user.id}` (where `user.id` is `auth.uid()`)
10. → Subscribes to `postgres_changes` event: `INSERT` on `public.notifications` table
11. → **Filter:** `user_id=eq.${user.id}` — only receives notifications for the logged-in user

**CRITICAL ISSUE: The `notifications` table is NOT in the `supabase_realtime` publication.**

Verified by querying `pg_publication_tables`:
```sql
SELECT tablename FROM pg_publication_tables WHERE pubname = 'supabase_realtime';
-- (0 rows) — NO tables are in the publication
```

This means the Realtime subscription in `NotificationBell.tsx` is **silently not receiving any events**. The component currently works because:
- On mount, it fetches the initial unread count via `getUnreadCount()` (direct query)
- On dropdown open, it fetches notifications via `getNotificationsForUser()` (direct query)
- But live push updates (new notification appearing without refresh) are **non-functional**

To fix this, the notifications table needs to be added to the publication:
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
```

### Realtime Subscription Details

```typescript
// NotificationBell.tsx:119-130
const channel = supabase
  .channel(`notifications-${user.id}`)
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'notifications',
    filter: `user_id=eq.${user.id}`,
  }, callback)
  .subscribe()
```

- **Filter correctness:** The filter uses `user.id` which comes from `useAuth()`. This is `auth.uid()` (the Supabase Auth UUID). However, `notifications.user_id` stores `user_profiles.id` (the profile table PK), NOT `auth.uid()`. These are **different UUIDs**.
- **Impact:** Even if Realtime were enabled, the filter `user_id=eq.${auth.uid()}` would never match because `notifications.user_id` contains `user_profiles.id` values.
- **Evidence:** The existing notification rows show `user_id = 6f64abdb-c9f1-4229-a175-53f36c5286de` which is a `user_profiles.id` value. The `auth.uid()` for this user is a different UUID stored in `user_profiles.user_id`.

**This is a double bug:**
1. Realtime publication not configured (no events at all)
2. Even if configured, the filter would use the wrong UUID column

### Error Handling Gaps

| Scenario | Current Behaviour | Risk |
|----------|-------------------|------|
| Notification INSERT fails | `.catch()` logs to console, booking still succeeds | Low — notification is fire-and-forget, booking is primary operation |
| Supabase client is null | `createNotification()` returns `null`, no error thrown | Low — graceful degradation |
| RLS denies INSERT | Error logged to console, swallowed by `.catch()` | Medium — silent failure, no retry, notification lost |
| Realtime subscription fails | Error logged by subscribe callback, no retry logic | Medium — user must refresh to see new notifications |
| User not logged in | `NotificationBell` returns `null` (no render) | None — correct behaviour |

---

## Section 3: Supabase Auth Email Configuration

### Self-Hosted Setup

The Supabase instance is self-hosted on a **Hetzner server via Coolify**:
- **Kong gateway:** `https://api.ttdp.dc81.io:8000` (the `NEXT_PUBLIC_SUPABASE_URL`)
- **App URL:** `https://ttdp.dc81.io`

### Auth Email Config (from `config.toml`)

```toml
[auth.email]
enable_signup = true
double_confirm_changes = true
enable_confirmations = false    # Users don't need to confirm email before signing in
secure_password_change = false
max_frequency = "1s"
otp_length = 6
otp_expiry = 3600               # 1 hour

# SMTP is COMMENTED OUT — not configured
# [auth.email.smtp]
# host = "smtp.sendgrid.net"
# port = 587
# user = "apikey"
# pass = "env(SENDGRID_API_KEY)"
```

**Key findings:**
- SMTP is **not configured** in config.toml — the section is commented out
- On a self-hosted Supabase instance, auth emails (password reset, signup confirmation) require SMTP configuration
- Since `enable_confirmations = false`, signup doesn't need email confirmation, so the missing SMTP hasn't been a visible problem
- **Password reset emails will NOT work** without SMTP configured (the forgot-password flow at `/forgot-password` will silently fail)
- No custom email templates exist — the `[auth.email.template.*]` sections are all commented out

### SMS Auth Config

```toml
[auth.sms]
enable_signup = false
enable_confirmations = false

[auth.sms.twilio]
enabled = false
account_sid = ""
message_service_sid = ""
auth_token = "env(SUPABASE_AUTH_SMS_TWILIO_AUTH_TOKEN)"
```

SMS auth is fully disabled. Twilio config exists as a placeholder but is not active.

### Can Supabase Auth Send Arbitrary Emails?

**No.** Supabase Auth's built-in email system is strictly limited to:
- Signup confirmation
- Password reset / magic link
- Email change confirmation
- Invite emails

It cannot send arbitrary emails (quotation links, booking confirmations, report notifications). For those, a separate email service is needed.

---

## Section 4: Environment Variables Audit

### Variables in `.env.local`

| Variable Name | Purpose |
|---------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Kong gateway URL (`https://api.ttdp.dc81.io:8000`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon JWT for client-side Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Privileged server-side key (bypasses RLS) |
| `DATABASE_URL` | Direct PostgreSQL connection string |
| `NEXT_PUBLIC_APP_URL` | App URL (`https://ttdp.dc81.io`) |
| `OPENROUTER_API_KEY` | LLM report generation via OpenRouter |
| `DEEPGRAM_API_KEY` | Speech-to-text for audio recording |

### Email/SMS Service Variables

**None exist.** There are no environment variables for:
- SMTP configuration (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`)
- SendGrid (`SENDGRID_API_KEY`)
- Resend (`RESEND_API_KEY`)
- Twilio (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`)
- Vonage/Nexmo
- AWS SES
- Mailgun

### Docker/Coolify Configuration

The `docker-compose.yml` is a minimal local-dev setup (Postgres + Adminer only). No email, SMS, or SMTP services are defined.

The Dockerfile is a standard Next.js standalone build. No email libraries or services are included.

**Coolify environment variables** are managed via the Coolify dashboard and mirror `.env.local`. Based on the audit of the codebase, no email/SMS variables are configured there either.

---

## Section 5: Supabase Edge Functions

### Directory Structure

```
supabase/functions/
├── generate-report/
│   └── index.ts          (2,958 bytes)
└── send-quotation/
    └── index.ts          (5,610 bytes)
```

### `generate-report/index.ts`

- **Purpose:** Generate a PDF report for a survey
- **Status:** PLACEHOLDER — the `generatePDF()` function returns an empty `Uint8Array()`
- **Not deployed or called** — the actual report PDF generation uses `src/lib/report-pdf-renderer.tsx` + `src/app/api/report-pdf/route.ts` instead
- References the old `projects` table (pre-rename), confirming it's stale code

### `send-quotation/index.ts`

- **Purpose:** Send a quotation email to a customer
- **Status:** PLACEHOLDER — the `sendEmail()` function is stubbed out with a `console.log`
- **Not deployed or called** — no frontend code invokes this Edge Function
- Contains a well-designed email HTML template (professional layout, branded, responsive)
- Has commented-out Resend integration code showing the intended approach:
  ```typescript
  // const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
  // const response = await resend.emails.send({
  //   from: 'Tyne Tees Damp Proofing <quotes@tyneteesdamp.co.uk>',
  //   to, subject, html: htmlContent, attachments: [...]
  // })
  ```
- **Key insight:** Someone planned to use **Resend** as the email provider, with a `quotes@tyneteesdamp.co.uk` sender address

### Edge Functions on Self-Hosted Supabase

**The `edge_runtime` is configured in config.toml:**
```toml
[edge_runtime]
enabled = true
policy = "oneshot"
inspector_port = 8083
```

However, **self-hosted Supabase Edge Functions via Coolify have significant limitations:**
- Edge Functions require the Deno runtime container to be running alongside the other Supabase services
- Coolify's one-click Supabase deployment may or may not include the Edge Functions container
- Edge Functions are **not suitable for scheduled tasks** (no cron capability built in) — they respond to HTTP invocations only
- For scheduled tasks (booking reminders, daily digests), you would need `pg_cron` (not installed) or an external scheduler

**Recommendation:** For the communication module, use Next.js API routes (`src/app/api/...`) instead of Edge Functions. API routes run within the Next.js app (already deployed on Coolify), have access to all environment variables, and can use any npm package (Resend, Nodemailer, Twilio SDK, etc.).

---

## Section 6: Database Triggers and Functions

### User-Created Triggers

**Zero triggers exist on any table in the public schema.**

The migration file defines two triggers but they were likely not applied or were dropped:
```sql
CREATE TRIGGER set_surveyor_availability_updated_at ...
CREATE TRIGGER set_survey_bookings_updated_at ...
```

The `update_updated_at()` function exists (confirmed below), but the triggers referencing it are not present in the live database. This means `updated_at` columns on `survey_bookings` and `surveyor_availability` are **not auto-updating** on row changes.

### Custom Functions in Public Schema

| Function | Arguments | Returns | Purpose |
|----------|-----------|---------|---------|
| `get_user_role` | (none) | `user_role` | Returns the current user's role enum |
| `handle_user_profiles_updated_at` | (none) | `trigger` | Trigger function for user_profiles updated_at |
| `is_admin` | (none) | `boolean` | RLS helper: checks if current user is admin |
| `is_office_or_admin` | (none) | `boolean` | RLS helper: checks if current user is admin or office |
| `set_quotation_defaults` | (none) | `trigger` | Trigger function for quotation default values |
| `update_updated_at` | (none) | `trigger` | Generic trigger function: sets `updated_at = now()` |

**No notification-related triggers or functions exist.** There are no:
- Triggers on `quotation_views` INSERT (to alert office when customer views quotation)
- Triggers on `surveys` UPDATE (to notify when status changes)
- Triggers on `survey_reports` UPDATE (to notify when report is published)

### Relevant Extension: `pg_net`

`pg_net` (v0.14.0) **is installed**. This extension allows making HTTP requests directly from SQL:
```sql
SELECT net.http_post(url, body, headers);
```

This is significant because it means database triggers could potentially:
- Call a Next.js API route to send an email when a quotation is viewed
- Call a webhook when a survey status changes
- Trigger a notification dispatch without any application-level code

However, `pg_net` requests are asynchronous and fire-and-forget. Error handling is limited to checking `net._http_response` after the fact.

### Missing Extension: `pg_cron`

`pg_cron` is **NOT installed**. This means:
- No scheduled database jobs are possible
- Booking reminders (24h before survey) cannot be triggered from the database
- Daily digest emails cannot be triggered from the database
- An external scheduler would be needed (e.g. a cron job on the Hetzner server, Coolify scheduled task, or a third-party service like Inngest/QStash)

---

## Section 7: Scalability Assessment of Current Notifications

### Current Limitations

**1. Single FK to `booking_id`:**
The `notifications` table only has a `booking_id` FK. To support notifications for surveys, reports, quotations, and enquiries, the table would need:

Option A — Add nullable FK columns:
```sql
ALTER TABLE notifications ADD COLUMN survey_id UUID REFERENCES surveys(id) ON DELETE SET NULL;
ALTER TABLE notifications ADD COLUMN quotation_id UUID REFERENCES quotations(id) ON DELETE SET NULL;
ALTER TABLE notifications ADD COLUMN report_id UUID REFERENCES survey_reports(id) ON DELETE SET NULL;
ALTER TABLE notifications ADD COLUMN enquiry_id UUID REFERENCES enquiries(id) ON DELETE SET NULL;
```

Option B — Generic polymorphic reference:
```sql
ALTER TABLE notifications ADD COLUMN reference_type TEXT; -- 'booking', 'survey', 'quotation', etc.
ALTER TABLE notifications ADD COLUMN reference_id UUID;
-- No FK constraint, but more flexible
```

Option A is safer (referential integrity), Option B is more extensible.

**2. Type CHECK Constraint:**
The current constraint is hard-coded to 4 booking values:
```sql
CHECK (type IN ('booking_created', 'booking_updated', 'booking_cancelled', 'booking_reminder'))
```

Expanding this requires an `ALTER TABLE` to drop and recreate the constraint:
```sql
ALTER TABLE notifications DROP CONSTRAINT notifications_type_check;
ALTER TABLE notifications ADD CONSTRAINT notifications_type_check
  CHECK (type IN (
    'booking_created', 'booking_updated', 'booking_cancelled', 'booking_reminder',
    'survey_assigned', 'survey_completed', 'quotation_viewed', 'quotation_accepted',
    'quotation_declined', 'report_published', 'enquiry_created', 'system_alert'
  ));
```

Alternatively, drop the CHECK constraint entirely and validate at application level (more flexible but less safe).

**3. Realtime Subscription Pattern:**
Current pattern: one channel per user per `NotificationBell` component mount.

```typescript
supabase.channel(`notifications-${user.id}`)
  .on('postgres_changes', { event: 'INSERT', table: 'notifications', filter: ... })
```

This is fine for a small team (3-10 users). Each user gets one Realtime connection. Supabase Realtime handles this well. The pattern is scalable enough for this business (a single contractor with a handful of office staff and surveyors).

**The main issue is not scalability but correctness** — the `user_id` filter bug and missing publication need fixing first.

---

## Section 8: SMS Capability Assessment

### Current State

**No SMS infrastructure exists.** There is no:
- SMS provider SDK installed (`npm ls twilio` returns nothing)
- SMS-related environment variables
- SMS-related API routes
- Twilio/Vonage account configured

The `config.toml` has Twilio auth disabled with empty credentials.

### What Would Be Needed

To send SMS from the platform:

1. **Choose a provider:** Twilio, Vonage, or MessageBird (all support UK numbers)
2. **Get a UK sender number or use alphanumeric sender ID** (e.g. "TyneTees" — UK supports up to 11 characters)
3. **Install SDK:** `npm install twilio` (or equivalent)
4. **Add environment variables:** Account SID, Auth Token, Sender Number
5. **Create API route:** `src/app/api/sms/send/route.ts`
6. **Estimated cost:** ~3p per SMS (UK domestic rate on Twilio)

### Phone Number Format Assessment

**Current stored formats (from live data):**

| Table | Example Formats | Consistent? |
|-------|----------------|-------------|
| `customers.phone` | `07700900005`, `07974350522` | Yes — all UK mobile format, no spaces, no country code |
| `customers.mobile` | (all NULL in current data) | N/A |
| `survey_bookings.customer_phone` | `07700900007`, `07700900005` | Yes — matches customers format |
| `user_profiles.phone` | `07700 900000`, `07700900002` | **INCONSISTENT** — one has a space, others don't |

**Issues for SMS delivery:**

1. **No country code prefix:** All numbers stored as `07xxx` (UK domestic format). SMS APIs typically require E.164 format (`+447700900005`). A normalisation step is needed.
2. **Inconsistent spacing:** `user_profiles` has at least one number with a space (`07700 900000`). Needs stripping before sending.
3. **No validation on input:** Phone fields are plain TEXT with no format constraint. Users can enter anything.
4. **Mobile vs landline:** Not all `07` numbers are mobile (some are VoIP). No way to distinguish SMS-capable numbers from landlines stored in the `phone` field.
5. **`mobile` field rarely populated:** The dedicated mobile field on `customers` is empty in all current records. The `phone` field appears to hold mobile numbers instead.

**Recommendation:** Before implementing SMS, add a phone normalisation utility that:
- Strips spaces, dashes, parentheses
- Converts `07xxx` to `+447xxx` (E.164)
- Validates against a regex for UK mobile patterns
- Rejects obviously invalid numbers

---

## Section 9: Summary of Findings

### What Works Today

| Capability | Status | Notes |
|------------|--------|-------|
| In-app notification creation | Working | 3 real notifications exist in the database |
| Notification INSERT via office/admin session | Working | RLS policy allows it |
| Notification read/unread tracking | Working | Schema supports it, UI renders correctly |
| NotificationBell UI component | Working | Fetches on mount and dropdown open |
| Realtime push delivery | **BROKEN** | Table not in `supabase_realtime` publication + user_id filter uses wrong UUID |
| Service role notification creation | Working | RLS policy exists for `service_role` |

### What's Completely Absent

| Capability | Status | Effort to Add |
|------------|--------|---------------|
| Email sending (any kind) | Not configured | Medium — need provider (Resend), API route, templates |
| SMS sending | Not configured | Medium — need provider (Twilio), API route, phone normalisation |
| SMTP for auth emails | Not configured | Low — add SMTP config to Supabase auth settings |
| Scheduled tasks (cron) | Not possible | Medium — `pg_cron` not installed, need external scheduler |
| Database triggers for notifications | None exist | Low — can add triggers using `pg_net` to call API routes |
| Customer-facing notifications | None | High — needs email/SMS provider + templates + send logic |
| Communication audit trail | None | Medium — needs a `communication_log` table |

### Critical Bugs Found

| Bug | Severity | Impact |
|-----|----------|--------|
| `notifications` table not in `supabase_realtime` publication | HIGH | Realtime push notifications are silently non-functional. Users must refresh to see new notifications. |
| NotificationBell Realtime filter uses `auth.uid()` but `notifications.user_id` stores `user_profiles.id` | HIGH | Even with publication fix, Realtime filter would never match. Double-broken. |
| `updated_at` triggers not applied to `survey_bookings` and `surveyor_availability` | MEDIUM | `updated_at` columns never auto-update on row changes |
| Password reset emails non-functional (no SMTP configured) | MEDIUM | Users cannot reset forgotten passwords via the forgot-password flow |

### Key Infrastructure Available But Unused

| Resource | Status | Potential Use |
|----------|--------|---------------|
| `pg_net` extension | Installed (v0.14.0) | HTTP requests from database triggers — could call API routes for notification dispatch |
| `send-quotation` Edge Function | Placeholder with email template | Has a well-designed HTML email template that could be repurposed |
| `SUPABASE_SERVICE_ROLE_KEY` | Configured | Enables server-side notification creation bypassing RLS |
| Customer email addresses | Required field, always populated | Ready for email delivery |
| Customer phone numbers | Required field, always populated | Ready for SMS (after E.164 normalisation) |
| `booking_reminder` notification type | Defined in CHECK constraint | Enum value ready to use once a scheduler exists |

---

*This document informs the technical approach for the communication module architecture.*
