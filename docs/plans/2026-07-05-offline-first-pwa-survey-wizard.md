# Offline-First PWA — Survey Wizard Implementation Plan

**Date:** 2026-07-05
**Status:** Approved for build
**Driver:** Steve (surveyor) loses signal in the field — sometimes minutes inside a property, sometimes an entire rural job where signal drops before arrival and never returns. The survey wizard must work with zero, intermittent, or slow connectivity, indistinguishably from full signal.
**Decision record:** Native app (Expo/React Native) rebuild was considered and rejected — the wizard is already a fully client-side SPA talking directly to Supabase, so the hard work (local-first data layer + durable sync) is identical on any platform, and a PWA reuses 100% of the existing wizard code with no app-store distribution overhead. If a native shell is ever wanted later, Capacitor wraps this same offline layer.

---

## 0. Non-negotiable design decisions (locked — do not re-litigate)

1. **Local-first, always — not online-with-offline-fallback.** Every wizard read and write goes to IndexedDB first, synchronously from the user's perspective. A background sync engine pushes to Supabase when it can. Intermittent signal is the worst case today (30s hangs on one bar); network must never block the UI.
2. **Scope is the surveyor's field surface only:** the wizard (`/survey/[projectId]/wizard`), its photos, its audio transcription, and the surveys list page needed to reach it. Costing, reports, quotations, Kanban, calendar, admin — all office work, all stay online-only. Do not route them through the offline layer.
3. **Booking-driven prefetch, not cache-on-open.** Rural jobs lose signal before arrival. Whenever the app is online it automatically mirrors every survey booked for the signed-in surveyor (today + tomorrow) into IndexedDB.
4. **Op-based outbox with coalescing.** The queue stores typed operations, not raw HTTP. Wizard-data and rooms saves coalesce to one pending op each per survey (a 3-hour survey must not accumulate thousands of queue entries). Photo/audio ops append.
5. **The sync engine reuses the existing server-write functions** in `src/lib/survey-wizard-data.ts` and `src/lib/survey-photo-service.ts` (which already handle the read-modify-write merge on `surveys.survey_data` and the shared `serializeWrite` queue). The UI stops calling them directly; only the sync engine calls them, and only when online. Their merge semantics are load-bearing — do not reimplement them.
6. **No Background Sync API.** iOS Safari doesn't support it. Sync is driven by: app foreground/visibility events, `online` events, a periodic timer while the app is open with pending ops, and an explicit "Sync now" button.
7. **Conflict policy: last-write-wins per survey.** Exactly one surveyor works a survey; office staff don't edit wizard keys. The existing merge in `saveWizardData` already preserves non-wizard keys (`photos`). Document, don't engineer around, the residual risk.
8. **Existing function signatures stay intact for non-wizard callers.** `loadSurveyPhotos` etc. are used by office surfaces — build the offline layer as a new module (`src/lib/offline/`) that wraps them; never change their behaviour.

---

## 1. Ground truth — current architecture (verified 2026-07-05)

Everything below was read from the code; trust it over intuition.

### Wizard
- `src/app/survey/[projectId]/wizard/page.tsx` — `'use client'` SPA. State in `useState` (`wizardData`, `rooms`, `photos`, `currentStep`), latest values mirrored to refs (`wizardDataRef`, `roomsRef`, lines 74–85) for the debounced save.
- Field edits → `triggerDebouncedSave()` (2s debounce, lines 162–170). Navigation (`handleNext`/`handleBack`/`handleStepClick`) and the Save button call `handleAutoSave()` immediately.
- `handleAutoSave` (lines 127–159): `saveWizardData()` → `saveAllRooms()` → fire-and-forget `updateSurveyTags()`, then reconciles temp room IDs (`room-` prefix) against returned DB IDs by matching `name` + `display_order` (lines 144–150).
- `handleCompleteSurvey` (lines 237–292): saves with `wizard_completed: true` (which also flips `surveys.status` to `'completed'` inside `saveWizardData`), awaits `updateSurveyTags`, auto-transitions the linked enquiry to `survey_complete` via `autoTransitionEnquiryStatus(survey.enquiry_id, ...)` (fetches `enquiry_id` live), fire-and-forget POST `/api/notifications/trigger`, then surveyor → confirmation screen, office/admin → `/survey/[id]/costing`.
- Initial load (lines 88–124): client-side `useEffect` → `loadWizardData(projectId)` + `loadSurveyPhotos(projectId)` + a direct query for `project_number`. Spinner until resolved; hard error message on failure.

### Data layer
- `src/lib/survey-wizard-data.ts` — all direct browser supabase-js calls (`getSupabase()` from `src/lib/supabase-client.ts`, `createBrowserClient` from `@supabase/ssr`, session persisted in cookies).
  - `loadWizardData(surveyId)` → `surveys.survey_data` JSONB + `survey_rooms` rows ordered by `display_order`. **Returns empty defaults on error** (line 89–96) — offline today this silently presents a blank wizard; the offline layer must never let that path run for a mirrored survey.
  - `saveWizardData(surveyId, wizardData)` → inside `serializeWrite`: reads current `survey_data`, merges (`photos` key always kept from DB copy — line 144), writes back; sets `survey_completed` and `status: 'completed'` when `wizard_completed`.
  - `saveAllRooms(surveyId, rooms)` → per-room insert (temp `room-` IDs) or update, then deletes DB rooms absent from the array. **This diff-delete is the room-deletion mechanism** — the sync engine must always flush the complete rooms array.
  - `updateSurveyTags(surveyId, tags)` — fire-and-forget update of `surveys.survey_tags`.
- `src/lib/write-queue.ts` — `serializeWrite(surveyId, fn)`: in-memory per-survey promise chain. Keep it (the sync engine still uses it when flushing); it is *not* the durable queue.

### Photos
- `src/lib/survey-photo-service.ts`, used by `src/components/wizard/PhotoCapture.tsx` (522 lines; camera + gallery inputs, 15MB pre-compression cap, retry ×2, description/visibility modal).
- `uploadSurveyPhoto(surveyId, capture)`: canvas-compresses to JPEG ≤1920px q0.8 (~200–500KB), reads dimensions, non-blocking geolocation (5s timeout, 5-min cache), uploads direct to storage bucket `survey-photos` at `${surveyId}/${step}/${timestamp}-${random}.jpg`, then under `serializeWrite` appends metadata to `survey_data.photos` (RMW), rolling back the storage object if the metadata write fails.
- `loadSurveyPhotos(surveyId)`: reads `survey_data.photos`; if empty, attempts `recoverPhotosFromStorage`. Also used outside the wizard — do not modify.
- `deleteSurveyPhoto`, `updateSurveyPhotoMeta`: storage remove + RMW metadata edit under `serializeWrite`.
- `getPhotoUrl(storagePath)`: public URL from the bucket — photos render via network URLs today.
- Photo metadata (`SurveyPhoto` in `src/types/survey-photo.types.ts`) includes `room_id` — which for a photo taken in an unsaved room is a **temp `room-` ID**.

### Audio / transcription
- `src/components/wizard/AudioRecorder.tsx` (363 lines): `MediaRecorder` → WebM → in-browser WAV 16kHz PCM conversion → `fetch('/api/transcribe', FormData)`. Max 120s, Wake Lock. `/api/transcribe/route.ts` requires an authenticated session and proxies Deepgram Nova-3 (key server-side). **This is the wizard's only server dependency.**

### Auth
- `src/context/AuthContext.tsx`: session state comes from `supabase.auth.onAuthStateChange` — the `INITIAL_SESSION` event fires from locally persisted cookies, **so `session` is available offline**. The `user_profiles` fetch (lines 34–55) is a network call; on failure it sets `profile: null` and allows the app to load ("allowing login without profile"). Offline consequence today: `role`, `profile.id` are null.
- `src/components/ProtectedRoute.tsx`: gates on `session` only (plus optional roles) — works offline once the session hydrates.
- `src/middleware.ts`: refreshes tokens via `supabase.auth.getUser()` on every server-served navigation; does **no route protection**. Offline navigations served by the service worker never reach it — fine.

### Bookings (prefetch source)
- `src/lib/calendar-data.ts` → `getBookingsForSurveyor(surveyorId, startDate?, endDate?)` — `survey_bookings` by `surveyor_id` + `booking_date` range. Booking rows carry `survey_id` (nullable) and `status` (`provisional | scheduled | completed | cancelled | no_show`). `surveyor_id` references **`user_profiles.id`** — use `profile.id`, never `user.id` (standing project rule).

### Build/deploy constraints
- Next.js 14.2.35, App Router, `output: 'standalone'`, `typescript.ignoreBuildErrors: true` (build passes with type errors — `npm run lint` is the safety net, but note ESLint is currently unconfigured; at minimum ensure `npm run build` passes).
- No PWA infrastructure exists: no manifest, no service worker, `public/` contains only `images/`.
- **Never run dev servers or Playwright against this app.** Verify by `npm run build`, commit to `main`, push, let Coolify deploy, then test on https://ttdp.dc81.io (Chrome DevTools offline emulation + real iPhone).

---

## 2. New dependencies

Add to `survey-system/package.json`:

| Package | Version | Purpose |
|---|---|---|
| `dexie` | `^4` | IndexedDB wrapper — schema, transactions, Blob storage |
| `dexie-react-hooks` | `^1.1` | `useLiveQuery` for reactive pending-count UI |
| `@serwist/next` | `^9` | Service worker build integration for Next 14 App Router |
| `serwist` | `^9` (devDependency) | SW runtime (precache, runtime caching, strategies) |

Verify current Serwist v9 API against its docs when implementing (it moved fast post-Workbox-fork); the sketches in §8 are directional.

---

## 3. Module layout (new code)

```
survey-system/src/lib/offline/
  db.ts               Dexie database: schema, versioning, types
  outbox.ts           enqueue/coalesce/claim/complete/fail operations
  sync-engine.ts      flush loop, ordering, retry/backoff, id-mapping
  connectivity.ts     online/offline detection: events + active probe
  local-data.ts       offline-aware load/save API the wizard uses
  photos-offline.ts   photo capture→local, queue upload, merged photo list
  audio-offline.ts    audio note queue + deferred transcription apply
  prefetch.ts         booking-driven survey mirroring
  profile-cache.ts    cache user_profiles row for offline role/id
  index.ts            public exports

survey-system/src/hooks/
  useSyncStatus.ts    live pending counts + connectivity for UI
  useConnectivity.ts  online/offline boolean hook

survey-system/src/components/offline/
  SyncStatusPill.tsx  wizard-header pill (states in §9)
  OfflineReadyBadge.tsx  surveys-list per-survey badge
  StaleSyncBanner.tsx global nudge when unsynced work is old

survey-system/src/app/sw.ts        service worker source (Serwist)
survey-system/src/app/manifest.ts  PWA manifest (Next metadata route)
survey-system/public/icons/        PWA icons (192/512 + maskable)
```

---

## 4. Dexie schema (`src/lib/offline/db.ts`)

```ts
import Dexie, { type EntityTable } from 'dexie'
import type { SurveyWizardData, SurveyRoomRow } from '@/types/survey-wizard.types'
import type { SurveyPhoto } from '@/types/survey-photo.types'

/** Mirror of one survey, locally authoritative while pending ops exist. */
interface LocalSurvey {
  surveyId: string            // pk — surveys.id
  projectNumber: string | null
  enquiryId: string | null    // captured at mirror time; needed for offline completion
  wizardData: SurveyWizardData  // NEVER contains the `photos` key (stripped on write)
  rooms: SurveyRoomRow[]      // complete array; temp ids keep `room-` prefix until flushed
  surveyCompleted: boolean
  mirroredAt: number          // last server fetch
  localUpdatedAt: number      // last local edit; 0 if clean
}

type OutboxType =
  | 'wizard_data'      // coalesced: max one pending per survey
  | 'rooms'            // coalesced: max one pending per survey
  | 'tags'             // coalesced
  | 'photo_upload'     // append; payload: { photo: SurveyPhoto, blobKey: string }
  | 'photo_delete'     // append; payload: { photo: SurveyPhoto }
  | 'photo_meta'       // append; payload: { photoId, changes }
  | 'audio_transcribe' // append; payload: { blobKey, target: TranscriptionTarget }
  | 'enquiry_transition' // payload: { enquiryId, status: 'survey_complete' }
  | 'notify_complete'  // payload: { surveyId } → POST /api/notifications/trigger

interface OutboxOp {
  id?: number            // pk autoincrement — creation order = flush order
  surveyId: string       // index
  type: OutboxType
  payload: unknown
  createdAt: number
  updatedAt: number      // bumped on coalesce
  attempts: number
  lastError: string | null
  status: 'pending' | 'failed'   // 'failed' = fatal, needs user attention; never auto-retried
}

interface LocalBlob {
  key: string            // pk — `photo:${photoId}` / `audio:${noteId}`
  blob: Blob
  mimeType: string
  createdAt: number
}

/** Local photo registry — union of synced (server) and pending (local) photos. */
interface LocalPhoto {
  photoId: string        // pk — same id scheme as SurveyPhoto.id
  surveyId: string       // index
  meta: SurveyPhoto
  syncState: 'pending' | 'synced'
  blobKey: string | null // set while pending; blob deleted after successful upload
}

interface KV { key: string; value: unknown }  // profile cache, last-prefetch, etc.
```

Dexie stores: `surveys` (pk `surveyId`), `outbox` (pk `++id`, indexes `surveyId`, `[surveyId+type]`, `status`), `blobs` (pk `key`), `photos` (pk `photoId`, index `surveyId`), `kv` (pk `key`). DB name `ttdp-offline`, version 1. All timestamps `Date.now()`.

On first open, call `navigator.storage.persist()` (best-effort, ignore result) — reduces eviction risk on iOS/Android.

---

## 5. Outbox semantics (`src/lib/offline/outbox.ts`)

- `enqueue(op)`:
  - For coalesced types (`wizard_data`, `rooms`, `tags`): upsert — if a `pending` op with the same `(surveyId, type)` exists, replace its `payload`, bump `updatedAt`, **keep its original `id`** (preserves queue position, prevents starvation). Else insert.
  - For append types: always insert.
- All local-mirror writes and their outbox enqueue happen in **one Dexie transaction** — a crash can never leave a mirror edit without its op or vice versa.
- `pendingCounts(surveyId?)` → `{ data: number, photos: number, audio: number, failed: number }` for the UI (via `useLiveQuery`).
- Failed ops (`status: 'failed'`) are fatal-error ops (e.g. RLS denial, 4xx). They surface in the UI with a retry button (`retryFailed(surveyId)` resets them to `pending`); they do **not** block later ops for other types, but see ordering rules below.

---

## 6. Sync engine (`src/lib/offline/sync-engine.ts`)

### Triggers
Start once from a client-side bootstrap (see §10) and run on:
1. `window` `online` event and connectivity-probe transitions to online
2. `visibilitychange` → visible, and page load
3. every 60s while pending ops exist and probe says online
4. explicit `syncNow()` (Sync button / pull nudge)

### Single-flight and multi-tab safety
Wrap the whole flush in `navigator.locks.request('ttdp-sync', { ifAvailable: true }, ...)` — if the lock is held (another tab syncing), skip this cycle. Web Locks is supported on iOS 15.4+ and all Chromium. Also keep a module-level `isFlushing` guard.

### Flush algorithm
```
for each surveyId with pending ops (oldest first):
  ops = pending ops for survey, ordered by id ASC
  reorder within the survey: rooms → wizard_data → photo_* (id order) → tags
                             → audio_transcribe → enquiry_transition → notify_complete
  for each op:
    try execute (see per-op behaviour)
    on success: delete op (and its blob for uploads)
    on retryable failure (network / timeout / 5xx / 429):
      attempts++, lastError, ABORT this survey's flush (order must hold), continue next survey
    on fatal failure (4xx, RLS, validation):
      status = 'failed', lastError, continue with next op ONLY if the op is independent
      (photo_*, tags, notify) — for rooms/wizard_data failures abort the survey's flush
      (later ops likely depend on them)
```
Backoff between engine cycles when the last cycle had retryable failures: 5s → 15s → 60s → 5min cap, reset on any success or on an `online` event.

### Per-op execution
- **`rooms`**: call `saveAllRooms(surveyId, rooms)` with the mirror's complete rooms array. On success, build temp→DB id map (match returned rooms by `name` + `display_order`, same as `wizard/page.tsx:144-150`), then in one Dexie transaction: rewrite ids in `surveys.rooms`, in every pending `photo_upload`/`photo_meta` payload whose `room_id` is a mapped temp id, and in `photos` registry metas. Notify the wizard (see §7, `onRemoteIdsMapped`) so open UI state updates too.
- **`wizard_data`**: strip any `photos` key from the payload defensively, call `saveWizardData(surveyId, wizardData)`. The function's internal RMW merge + `serializeWrite` handle concurrency with photo metadata writes.
- **`photo_upload`**: read blob from `blobs`. Upload with a **deterministic path derived from the photo id** — `${surveyId}/${step}/${photo.id}.jpg` — and `upsert: true`, making retries idempotent (today's random `${timestamp}-${random}.jpg` path would duplicate objects on retry-after-timeout). Then append metadata to `survey_data.photos` under `serializeWrite` (reuse/adapt the metadata-append half of `uploadSurveyPhoto` — factor it into an exported `appendPhotoMetadata(surveyId, photo)` in the photo service rather than duplicating the RMW). On success: mark `photos` registry row `synced`, delete blob.
- **`photo_delete`**: if the photo was still `pending` locally (never uploaded), the enqueue path should have already cancelled the pending `photo_upload` op + blob and no server op is needed — assert and skip. Otherwise call `deleteSurveyPhoto(surveyId, photo)`.
- **`photo_meta`**: call `updateSurveyPhotoMeta(...)`.
- **`tags`**: call `updateSurveyTags(...)`.
- **`audio_transcribe`**: see §12.
- **`enquiry_transition`**: call `autoTransitionEnquiryStatus(enquiryId, 'survey_complete', null)` (from `src/lib/supabase-data.ts`). Uses the mirror's stored `enquiryId` — captured at prefetch so no live lookup is needed.
- **`notify_complete`**: POST `/api/notifications/trigger` `{ event_type: 'survey_completed', survey_id }` — relative URL (standing rule: never absolute).

### Timeouts
Wrap every PostgREST call with `.abortSignal(AbortSignal.timeout(15_000))`. Storage uploads don't take a signal — race the upload promise against a 60s timer; on timeout treat as retryable (safe because paths are now deterministic + upsert). The connectivity probe (§below) prevents most doomed attempts.

### Token refresh
Before each flush cycle call `supabase.auth.getSession()` — if the access token expired while offline, supabase-js refreshes it (network available at this point). If refresh fails with an auth error (revoked), surface a "Sign in again to sync" state in the pill; do not drop ops.

### Connectivity (`src/lib/offline/connectivity.ts`)
`navigator.onLine` lies on flaky signal. Maintain state via: `online`/`offline` events as hints, plus an active probe — `fetch(`${NEXT_PUBLIC_SUPABASE_URL}/auth/v1/health`, { method: 'GET', signal: AbortSignal.timeout(4000), cache: 'no-store' })`. Probe on hint changes and every 30s while pending ops exist. Expose `getState()`, `subscribe(cb)`, and the `useConnectivity()` hook.

---

## 7. Offline-aware data API (`src/lib/offline/local-data.ts`) + wizard integration

### Read path
`loadWizardDataLocalFirst(surveyId)`:
1. Read mirror from Dexie.
2. If mirror exists **and** has pending ops (or `localUpdatedAt > mirroredAt`) → return mirror immediately (local is ahead of server; a server fetch would resurrect stale data).
3. Else if probe says online → fetch via existing `loadWizardData` + `loadSurveyPhotos` + `project_number` query with an 8s overall timeout; on success update mirror (+ `photos` registry rows as `synced`) and return fresh; on failure fall back to mirror.
4. Else return mirror.
5. No mirror and offline → throw `NotAvailableOfflineError` — the wizard shows a dedicated screen: "This survey isn't downloaded. Connect to signal and it will download automatically." **Never** let the current `loadWizardData` error path return blank defaults for an offline miss (it would look like a fresh empty survey and a subsequent save could clobber real data at flush).

### Write path
`saveWizardLocal(surveyId, wizardData, rooms)` — one Dexie transaction: update mirror (`wizardData` with `photos` stripped, `rooms`, `localUpdatedAt`), coalesce-enqueue `wizard_data` + `rooms` + `tags` (tags payload from `deriveSurveyTags`, computed in the wizard as today). Then poke the sync engine (`requestFlush()` — debounced internally; it no-ops when offline).

### Wizard page changes (`wizard/page.tsx`)
- Replace the load `useEffect` body with `loadWizardDataLocalFirst`; add the not-available-offline state.
- `handleAutoSave` becomes: `await saveWizardLocal(...)` (fast, local) → `setLastSaved(new Date())`. Remove the "Failed to save changes" network-error path for saves — local writes only fail on quota/db errors, which get their own message ("Device storage error — do not continue, contact office."). Keep the 2s debounce exactly as is.
- Temp-room-id reconciliation moves to the sync engine (§6 `rooms`). Give the engine a registration hook: `onRemoteIdsMapped(surveyId, mapping)` — the wizard subscribes and patches its in-memory `rooms`/`photos` state if it has that survey open (same match-and-replace as current lines 144–150). If the wizard isn't open, the Dexie rewrite already covered persistence.
- `handleCompleteSurvey` becomes fully offline-capable: `saveWizardLocal` with `wizard_completed: true`, then enqueue `enquiry_transition` (using mirror's `enquiryId`; skip if null) and `notify_complete`. Surveyor confirmation screen gains a line driven by pending counts: "Waiting for signal to send — keep the app installed and it will sync automatically" vs "Synced ✓". Office/admin redirect to costing unchanged (they're online).
- Header: replace the `lastSaved`/spinner cluster with `SyncStatusPill` (§9). Keep the manual Save button (now writes locally + `syncNow()`).

---

## 8. PWA shell — manifest + service worker

### Manifest (`src/app/manifest.ts`)
Next metadata route returning: `name: 'TTDP Surveys'`, `short_name: 'TTDP'`, `start_url: '/'`, `display: 'standalone'`, `background_color`/`theme_color` from the brand theme in `tailwind.config` (the app is dark — pick the actual bg token, don't guess), icons `/icons/icon-192.png`, `/icons/icon-512.png`, plus a maskable 512. Generate icons from the existing brand logo in `public/images/` (or the company logo used in report branding); commit the PNGs.

### Service worker (`src/app/sw.ts` via `@serwist/next`)
`next.config.mjs`:
```js
import withSerwistInit from '@serwist/next'
const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
})
export default withSerwist(nextConfig)
```
`sw.ts` core: Serwist with `precacheEntries: self.__SW_MANIFEST`, `skipWaiting: true`, `clientsClaim: true`, `runtimeCaching: defaultCache` from `@serwist/next/worker`, **plus** these custom pieces:

1. **Navigation strategy**: NetworkFirst with a 3s `networkTimeoutSeconds`, cache name `ttdp-pages`. Every page the surveyor visits while online is offline-revisitable. Never serve a *different* route's cached HTML as a fallback — App Router HTML embeds route-specific RSC payload; cross-route fallback renders the wrong page.
2. **Page seeding**: the SW listens for a `{ type: 'SEED_URLS', urls: string[] }` message and `cache.put`s a fresh fetch of each URL into `ttdp-pages`. Prefetch (§11) sends the wizard URL (`/survey/${id}/wizard`) and `/surveys` for every mirrored survey so a **cold offline launch** can navigate straight into a never-visited wizard.
3. **Photo image caching**: CacheFirst (30 days, maxEntries ~500) for `GET` requests to `${SUPABASE_URL}/storage/v1/object/public/survey-photos/*` — synced photos then render offline. Pending photos render from local blobs (§11), so all photos display offline.
4. **Never cache**: any non-GET, `/api/*`, `auth/v1/*`, `rest/v1/*` (PostgREST must always hit the network and fail fast — the outbox is the offline mechanism, not HTTP caching).

Register the SW + `beforeinstallprompt` handling in the client bootstrap (§10). Add an unobtrusive "Install app" hint on the surveys page for Android; iOS needs Share → Add to Home Screen — put a one-line instruction in the surveyor training doc (`docs/training/`), not in-app modals.

**Deploy safety**: `skipWaiting + clientsClaim` + Serwist's hashed precache means each Coolify deploy invalidates cleanly. Smoke-test after the first SW deploy that a subsequent deploy actually shows new UI (stale-SW bugs are the classic PWA failure).

---

## 9. Sync status UI

`useSyncStatus()` → `{ connectivity, pendingData, pendingPhotos, pendingAudio, failed, oldestPendingAt, syncing }` via `useLiveQuery` on the outbox + engine state.

**`SyncStatusPill`** (wizard header + surveys page header), states in priority order:
1. `failed > 0` → red: "Sync problem — tap to retry" (tap → `retryFailed` + `syncNow`; if it persists, show `lastError` detail)
2. syncing → spinner: "Syncing… (N left)"
3. pending > 0 && offline → amber: "Saved on phone — N changes, M photos waiting for signal"
4. pending > 0 && online → amber: "Syncing shortly…" (+ Sync now on tap)
5. clean → green check: "All synced HH:MM"

**`OfflineReadyBadge`** on each row of `/surveys` for surveyors: "Downloaded ✓" (mirror exists, clean) / "Unsynced changes" (pending ops) / nothing (not mirrored).

**`StaleSyncBanner`** mounted in the shared `Layout`: if `oldestPendingAt` > 12h, persistent banner "Survey data from {relative time} hasn't reached the office yet — connect to WiFi and open the app" + a `sonner` toast on app open (never `alert()` — standing rule).

**Data-loss honesty**: the training doc gets one paragraph: unsynced work lives only on that phone; a lost/broken phone loses it, exactly like paper notes. Sync before leaving site when signal allows (the pill turning green is the confirmation).

---

## 10. Client bootstrap + auth offline hardening

`src/components/offline/OfflineBootstrap.tsx` (`'use client'`, renders null), mounted once in the root layout:
- registers the service worker
- starts the connectivity monitor and sync engine
- kicks prefetch (§11) when authenticated + online
- calls `navigator.storage.persist()`

**Profile cache** (`profile-cache.ts`): on every successful `fetchProfile` in `AuthContext.tsx`, write the profile row to the Dexie `kv` store; when the fetch throws/fails **and** a cached profile exists for the same `user.id`, hydrate from cache instead of `profile: null`. This keeps `role` (surveyor confirmation screen, RoleGuard on `/admin/availability`) and `profile.id` (prefetch query, any FK writes) working offline. Cache is cleared on `SIGNED_OUT`.

Sanity checklist (already true, verify while wiring): session hydrates offline via `INITIAL_SESSION`; `ProtectedRoute` gates on `session` only; middleware does no route protection so SW-served offline navigations lose nothing.

---

## 11. Prefetch (`src/lib/offline/prefetch.ts`) and offline photos

### Prefetch
`prefetchSurveyorSurveys(profileId)` — runs on bootstrap when online, on `online` transitions, and every 15 min while the app is open and online:
1. `getBookingsForSurveyor(profileId, today, tomorrow)` (local-timezone dates via `date-fns`), filter `status IN ('scheduled', 'provisional')` and `survey_id != null`.
2. For each survey **without pending local ops** (never overwrite local-ahead state): fetch survey row (`survey_data`, `survey_completed`, `project_number`, `enquiry_id`), rooms, and photo metadata; upsert mirror + `photos` registry (`synced`).
3. Send `SEED_URLS` to the SW for each `/survey/${id}/wizard` + `/surveys`.
4. Warm the photo image cache: for each synced photo, `fetch(getPhotoUrl(path))` — the SW's CacheFirst route stores it. Cap at ~50 photos per survey.
5. Record `kv['lastPrefetchAt']`; surface staleness subtly on /surveys ("Downloaded 07:42").

Also mirror-on-open: any survey the surveyor opens online gets the same treatment (the read path in §7 already does this).

### Photos offline (`photos-offline.ts` + `PhotoCapture.tsx` changes)
New capture path `capturePhotoLocal(surveyId, capture)`:
1. Compress + dimensions + geolocation exactly as today (all local — reuse the exported helpers from `survey-photo-service.ts`).
2. Build the `SurveyPhoto` meta (id `photo_${timestamp}_${random}` as today; `storage_path` set to the deterministic future path `${surveyId}/${step}/${id}.jpg`).
3. One Dexie transaction: blob → `blobs` (`photo:${id}`), meta → `photos` registry (`pending`), enqueue `photo_upload`. Poke flush.
4. Return the meta immediately — capture UX is now instant even on full signal (upload happens behind the pill).

Photo listing for the wizard: `loadSurveyPhotosLocalFirst(surveyId)` merges the `photos` registry (pending + synced) — when online and clean it refreshes the registry from `loadSurveyPhotos` first. Rendering: pending photos get `URL.createObjectURL(blob)` (create on demand, revoke on unmount — a `usePhotoUrl(photo)` hook in `photos-offline.ts` that resolves blob-URL for pending / `getPhotoUrl` for synced). `PhotoCapture.tsx` swaps its `uploadSurveyPhoto`/`loadSurveyPhotos`/`deleteSurveyPhoto`/`updateSurveyPhotoMeta` calls for the offline-aware equivalents; its retry/modal UX stays. Deleting a pending photo cancels the queued upload + blob + registry row locally (no server op). Meta edits on a pending photo just rewrite the registry meta + queued payload.

---

## 12. Audio notes offline (`audio-offline.ts` + `AudioRecorder.tsx`)

Recording and WAV conversion are already fully client-side. Change the submit step:
- Online (probe green): current behaviour — POST `/api/transcribe`, insert text via the existing callback. No regression risk.
- Offline/timeout: store the WAV blob (`audio:${noteId}`) + enqueue `audio_transcribe` with a **declarative target**: add a `transcriptionTarget` prop to `AudioRecorder` describing where the text lands — `{ kind: 'room', roomId, field: 'surveyor_notes' | ... }` or `{ kind: 'wizard', field: 'surveyor_additional_comments' | ... }` — set by each step component that mounts it (audit each `AudioRecorder` usage to enumerate targets). Immediately append a visible placeholder to the target field text: `⏳ [Voice note HH:MM — will transcribe when back in signal]` so the surveyor sees it registered.
- Flush execution: POST the WAV to `/api/transcribe` (relative URL, authenticated session). On success, load the mirror, replace that note's placeholder with the transcript (match on the placeholder token including `noteId`), enqueue coalesced `rooms`/`wizard_data`, delete blob. If the target room id was a temp id, the §6 mapping already rewrote it. If the placeholder text was deleted by the user meanwhile, append the transcript to the field instead. On fatal transcription failure, replace placeholder with `⚠️ [Voice note failed to transcribe — audio kept]` and keep the blob + a `failed` op for manual retry.
- Completing a survey with pending audio: warn in the Review step ("2 voice notes not yet transcribed — they'll be added when back in signal"); don't block completion.

---

## 13. Implementation phases — build order, each ends green-build + committed + deployed

Work from `survey-system/`. Per phase: `npm run build` must pass → conventional commit to `main` → push → Coolify deploys → smoke-test on https://ttdp.dc81.io. One commit per phase minimum; more is fine.

**Phase 1 — Foundations** (`feat: offline foundation — dexie store, outbox, connectivity`)
`db.ts`, `outbox.ts`, `connectivity.ts`, `profile-cache.ts` + AuthContext cache fallback, `OfflineBootstrap` (registering only connectivity + persist for now). No behaviour change to the wizard yet. Risk: none.

**Phase 2 — Local-first wizard data** (`feat: wizard saves local-first with durable sync outbox`)
`local-data.ts`, `sync-engine.ts` (ops: `wizard_data`, `rooms`, `tags`), wizard page integration (§7) incl. offline completion ops (`enquiry_transition`, `notify_complete`), `SyncStatusPill` minimal version. **This is the highest-risk phase — the wizard's save path changes.** Verify heavily (§15 T1–T5) before moving on.

**Phase 3 — Photos offline** (`feat: offline photo capture with queued uploads`)
`photos-offline.ts`, deterministic upload paths + `upsert: true`, factor `appendPhotoMetadata` out of `uploadSurveyPhoto`, `PhotoCapture.tsx` swap, blob-URL rendering, pending-photo delete/meta-edit. (§15 T6–T8)

**Phase 4 — Prefetch + surveys list** (`feat: booking-driven offline prefetch`)
`prefetch.ts`, `OfflineReadyBadge`, /surveys wiring, `NotAvailableOfflineError` screen. (§15 T9)

**Phase 5 — PWA shell** (`feat: PWA — service worker, manifest, offline shell`)
Serwist config, `sw.ts` (navigation strategy, SEED_URLS, photo cache), `manifest.ts`, icons, SW registration in bootstrap, install hint. Includes the double-deploy staleness check. (§15 T10–T12)

**Phase 6 — Audio queue** (`feat: offline voice notes with deferred transcription`)
`audio-offline.ts`, `AudioRecorder` targets + placeholders, Review-step pending-audio warning. (§15 T13)

**Phase 7 — Polish + hardening** (`feat: sync status UI polish + stale-sync nudges`)
Full pill states, `StaleSyncBanner`, failed-op retry UI, surveys-page "Downloaded HH:MM", training-doc updates (`docs/training/` surveyor guide: install to home screen, the pill, the phone-holds-data caveat), then run the `update-project-docs` skill to route status/architecture/gotcha updates (new gotchas: offline module is wizard-only; deterministic photo paths; profile cache).

Suggested effort weighting: Phase 2 ≈ a third of the total work; Phases 3 and 5 the next chunk; 1, 4, 6, 7 smaller.

---

## 14. Edge cases the implementation must handle (checklist)

- [ ] Debounced save fires while a previous local write is in-flight → Dexie transactions serialize; no torn mirror.
- [ ] Survey opened on phone, edited offline; office edits a *different* survey_data key meanwhile → flush RMW merge preserves office key (existing `saveWizardData` merge) — verify, don't assume.
- [ ] Photo taken in a room that's still temp-id, then survey flushes → mapping rewrites payloads before upload (§6); photo's `room_id` correct server-side.
- [ ] Room deleted offline after photos were taken in it → photos keep orphan room_id (matches current online behaviour — photos aren't deleted with rooms); no special handling, just don't crash.
- [ ] App killed mid-flush (op executed server-side, not yet deleted locally) → re-execution must be safe: `saveWizardData`/`saveAllRooms` are idempotent replays; photo upload is idempotent via deterministic path + upsert; metadata append must **dedupe by photo id** inside `appendPhotoMetadata` (skip if `photos[]` already contains the id) — add this guard.
- [ ] `enquiry_transition` replay → `autoTransitionEnquiryStatus` is a status set; re-setting `survey_complete` is harmless. `notify_complete` replay → duplicate notification, acceptable; note it.
- [ ] Two surveys pending simultaneously (two jobs in a no-signal day) → per-survey ordering independent; one survey's fatal error must not block the other's flush.
- [ ] Quota exceeded writing a photo blob (iOS storage pressure) → catch `QuotaExceededError`, show explicit blocking error in PhotoCapture ("Phone storage full — free space before taking more photos"), don't lose the already-saved wizard data.
- [ ] Logout with pending ops → warn via ConfirmDialog ("Unsynced survey data will be lost if you sign out on this device") — outbox is per-device, not per-user-safe; on confirmed logout, clear the Dexie DB (client requirement: no cross-user residue).
- [ ] Clock skew: all ordering uses autoincrement ids, never wall-clock.
- [ ] `wizard_completed` synced from a stale mirror is impossible by construction: mirrors with pending ops are never overwritten by prefetch (§11 step 2) and the read path prefers local-ahead state (§7 step 2).

---

## 15. Verification plan (no dev servers — deployed-only testing)

After each phase deploys, on desktop Chrome against ttdp.dc81.io using DevTools → Network → Offline (and iPhone Safari for the marked ones):

- **T1**: open a survey online, go offline (DevTools), edit fields across steps, add/rename/delete a room → pill shows queued; reload the tab while offline → data still there (mirror), still queued. Go online → pill green; verify in DB (`docker exec` psql per AGENTS.md) that `survey_data` + `survey_rooms` match.
- **T2**: intermittent simulation — DevTools "Slow 3G" + toggling offline every ~20s during continuous editing → UI never blocks, no error toasts, eventual green pill, DB correct.
- **T3**: offline **completion** — complete survey offline as a surveyor test account → confirmation screen shows "waiting for signal"; go online → survey `status='completed'`, enquiry auto-moves to Survey Complete on the Kanban, notification row created.
- **T4**: local-ahead protection — edit offline, then (as office, another browser) edit the same survey's *other* keys online, then let the phone sync → both edits present.
- **T5**: two surveys queued at once; kill the tab mid-sync (close during flush) → reopen → no duplicates (rooms not doubled, photos not doubled), everything green.
- **T6**: photos offline — take 5 photos offline incl. inside a brand-new room → thumbnails render (blob URLs); reconnect → objects in `survey-photos` at deterministic paths, metadata in `survey_data.photos`, correct DB `room_id`.
- **T7**: delete a pending photo offline → nothing hits the server after reconnect. Edit description of a pending photo offline → server gets the edited version.
- **T8**: retry idempotency — throttle to Slow 3G so an upload is slow, kill mid-upload, reopen → exactly one storage object, one metadata entry.
- **T9**: prefetch — book tomorrow's survey for the test surveyor, log in on a fresh browser online, wait for prefetch, go fully offline, cold-navigate to /surveys → badge "Downloaded"; open the wizard for a survey never opened in this browser → loads (SEED_URLS worked).
- **T10** *(Android — Steve's platform, primary)*: install via Chrome's install prompt, airplane mode, cold-launch from icon → app opens, prefetched survey editable, photos render (cached + pending). Repeat on an iPhone as the secondary check (Share → Add to Home Screen) — iOS is the more constrained platform, so it must still pass even though no current surveyor uses it.
- **T11**: deploy-staleness — push a trivial visible change after Phase 5; confirm an already-installed PWA picks it up on next open (SW update path works).
- **T12**: public pages unaffected — `/q/[token]`, `/pay/[token]`, `/report/[id]` still serve fresh state (SW must not cache them into staleness; they're already `force-dynamic` server-side — confirm the SW navigation cache respects their no-store headers or exclude those paths from `ttdp-pages`).
- **T13**: record a voice note offline → placeholder appears in the field; reconnect → transcript replaces placeholder, saved to DB.
- **T14** *(field pilot)*: Steve runs one real rural survey with the PWA installed on his Android phone before the old workflow assumption is retired; capture his sync-pill comprehension feedback. If it shows the stale-sync nudge firing often, consider layering the Background Sync API as an Android-only enhancement (flushes the queue even with the app closed; unsupported on iOS, which is why the core design doesn't rely on it).

Use the UX-audit test accounts (`~/.credentials/.ux-audit-credentials`) and a pipeline-created test survey (New Lead → Convert & Book — never a direct insert; pipeline-only creation is a standing rule). Restore/mark test records afterwards as the audits did.

---

## 16. Explicit project-rule reminders for the implementing session

- Commit directly to `main`, conventional commits, no branches/PRs; push per phase.
- `npm run build` from `survey-system/` before every push; `ignoreBuildErrors: true` means type errors won't fail the build — be disciplined with types anyway.
- Never `alert()`/`window.confirm` — `sonner` toasts + `ConfirmDialog`.
- Always `profile.id` (from `useAuth()`) for FK writes and the bookings query — never `user.id`.
- Relative URLs for internal API calls (`/api/transcribe`, `/api/notifications/trigger`).
- Don't touch: report/costing/quotation pages, `supabase/functions/`, measurement-hiding logic, LLM prompts.
- LLM/API changes are out of scope here; transcription stays on `/api/transcribe` (Deepgram).
- New DB migrations: none required by this plan (everything is client-side + existing tables). If one becomes necessary, apply via `docker exec` per AGENTS.md.
- After Phase 7, run the `update-project-docs` skill; new durable gotchas belong in AGENTS.md, status in `docs/PROJECT_STATE.md`, architecture (offline module map, sync-engine data flow) in `docs/ARCHITECTURE.md`.

## 17. Out of scope (explicitly)

- Offline costing/report/quotation work (office surfaces, always online)
- On-device speech-to-text (queued transcription covers the need)
- Cross-device sync of unsynced work / server-side draft escrow
- Capacitor/native wrapper (future option; unblocked by this work)
- Background sync while the app is closed (impossible on iOS PWA; foreground-driven sync + the stale banner cover it)
- RLS tightening (separate open thread; the outbox uses the same authenticated anon client as today)
