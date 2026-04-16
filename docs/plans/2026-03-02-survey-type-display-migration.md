# Survey Type Display Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Stop reading `surveys.survey_type` (which is hardcoded to `'damp'` on every survey) for report template selection and display logic — derive those values from `survey_tags` instead, so surveys correctly reflect what was actually found.

**Architecture:** A single pure helper function `primarySurveyTypeFromTags()` is added to the existing `survey-tags.ts` and used in 3 places: report generation, and two display pages. The `survey_type` column in the database is **not removed** — it stays as-is, zero DB changes. The fallback in the helper is always `'damp'`, identical to the current `|| 'damp'` behaviour, so old surveys with empty tags behave exactly as today.

**Tech Stack:** TypeScript, Next.js 14 App Router, Supabase

---

## Safety Constraints (read before touching anything)

- `pricing-data.ts` and `survey-mapping.ts` already derive survey type from room data — **do not touch them**
- `survey_type` write in `survey/new/page.tsx` stays hardcoded to `'damp'` — **do not touch it**
- The DB column `surveys.survey_type` is **not changed, not removed, not migrated**
- The fallback must always be `'damp'` — this matches current behaviour for surveys with no tags

---

## Tag-to-Type Mapping

The `survey_tags` array uses issue names (`damp`, `timber_decay`, `woodworm`, `condensation`).
The DB `survey_type` enum uses slightly different keys (`timber` not `timber_decay`).

| Tag present in `survey_tags` | Maps to `SurveyType` |
|------------------------------|----------------------|
| `damp`                       | `'damp'`             |
| `condensation`               | `'condensation'`     |
| `timber_decay`               | `'timber'`           |
| `woodworm`                   | `'woodworm'`         |
| none / empty                 | `'damp'` (fallback)  |

Priority order when multiple types present: **damp → condensation → timber → woodworm**
(Most surveys lead with damp; this preserves existing behaviour for mixed surveys.)

---

## Files Modified

| File | Change |
|------|--------|
| `src/lib/survey-tags.ts` | Add `primarySurveyTypeFromTags()` helper (~15 lines) |
| `src/lib/report-generator.ts` | Line 735: replace `survey.survey_type \|\| 'damp'` with helper call |
| `src/app/surveys/[surveyId]/page.tsx` | Line ~166: replace `surveyTypeConfig[survey.survey_type]` with helper |
| `src/app/surveys/page.tsx` | Lines 68, 183, 254: replace `survey.survey_type` with helper |
| `src/app/page.tsx` | Lines 185, 230: replace `survey.survey_type` with helper |

---

## Task 1: Add `primarySurveyTypeFromTags` to survey-tags.ts

**File:** `src/lib/survey-tags.ts`

**Step 1: Add the helper function at the bottom of the file**

```typescript
// Priority order for picking the dominant type when multiple issues are present.
// Damp first — most common and most likely to need the correct report template.
const ISSUE_TAG_TO_SURVEY_TYPE: Array<{ tag: string; type: string }> = [
  { tag: 'damp',         type: 'damp' },
  { tag: 'condensation', type: 'condensation' },
  { tag: 'timber_decay', type: 'timber' },
  { tag: 'woodworm',     type: 'woodworm' },
]

/**
 * Derive the primary SurveyType string from a survey_tags array.
 * Used to replace reads of surveys.survey_type (which is hardcoded 'damp' on all rows).
 * Falls back to 'damp' — identical to the previous `survey.survey_type || 'damp'` behaviour.
 */
export function primarySurveyTypeFromTags(tags: string[] | null | undefined): string {
  if (!tags || tags.length === 0) return 'damp'
  for (const { tag, type } of ISSUE_TAG_TO_SURVEY_TYPE) {
    if (tags.includes(tag)) return type
  }
  return 'damp'
}
```

**Step 2: Verify build still passes**

Run: `npm run build`
Expected: `✓ Compiled successfully` — no errors

**Step 3: Commit**

```bash
git add survey-system/src/lib/survey-tags.ts
git commit -m "feat(survey-tags): add primarySurveyTypeFromTags helper"
```

---

## Task 2: Fix report-generator.ts

**File:** `src/lib/report-generator.ts`

**Step 1: Add import at the top of the file**

Find the existing imports block. Add:
```typescript
import { primarySurveyTypeFromTags } from './survey-tags'
```

**Step 2: Replace the survey_type read (line 735)**

Find:
```typescript
  const surveyType = survey.survey_type || 'damp'
```

Replace with:
```typescript
  const surveyType = primarySurveyTypeFromTags(survey.survey_tags)
```

Note: `survey` here is the survey row object returned from Supabase. The `survey_tags` field is already in the `Survey` type (`survey_tags?: string[] | null`). Verify that the query fetching `survey` in this function also selects `survey_tags` — if not, add it to the `.select()` call.

**Step 3: Check the survey query fetches survey_tags**

Search in `report-generator.ts` for the Supabase query that fetches the survey row. Confirm `survey_tags` is included in the select list. If it uses `select('*')` it is already included. If it lists specific columns, add `survey_tags` to the list.

**Step 4: Verify build**

Run: `npm run build`
Expected: `✓ Compiled successfully`

**Step 5: Commit**

```bash
git add survey-system/src/lib/report-generator.ts
git commit -m "fix(reports): derive report template type from survey_tags not survey_type"
```

---

## Task 3: Fix survey detail page display

**File:** `src/app/surveys/[surveyId]/page.tsx`

**Step 1: Add import**

Find the existing import from `@/lib/survey-tags`. Add `primarySurveyTypeFromTags` to it:
```typescript
// Existing import currently only has TAG_LABELS, TAG_COLOURS etc (defined inline)
// Add at top of file with other imports:
import { primarySurveyTypeFromTags } from '@/lib/survey-tags'
```

**Step 2: Replace survey_type config lookup (~line 166)**

Find:
```typescript
  const config = surveyTypeConfig[survey.survey_type] || surveyTypeConfig.damp
```

Replace with:
```typescript
  const config = surveyTypeConfig[primarySurveyTypeFromTags(survey.survey_tags)] || surveyTypeConfig.damp
```

**Step 3: Verify build**

Run: `npm run build`
Expected: `✓ Compiled successfully`

**Step 4: Commit**

```bash
git add 'survey-system/src/app/surveys/[surveyId]/page.tsx'
git commit -m "fix(survey-detail): show correct survey type icon from tags"
```

---

## Task 4: Fix surveys list page display and filter

**File:** `src/app/surveys/page.tsx`

This file has three `survey.survey_type` reads:
- Line 68: filter logic (type filter dropdown)
- Line 183: config lookup for survey card display
- Line 254: config lookup for another display location

**Step 1: Add import**

Add at the top of the file:
```typescript
import { primarySurveyTypeFromTags } from '@/lib/survey-tags'
```

**Step 2: Fix the type filter (line 68)**

Find:
```typescript
    const matchesType = typeFilter === 'all' || survey.survey_type === typeFilter
```

Replace with:
```typescript
    const matchesType = typeFilter === 'all' || primarySurveyTypeFromTags(survey.survey_tags) === typeFilter
```

**Step 3: Fix the display config lookups (lines 183 and 254)**

Both will be the same pattern. Find each:
```typescript
const config = surveyTypeConfig[survey.survey_type]
```

Replace each with:
```typescript
const config = surveyTypeConfig[primarySurveyTypeFromTags(survey.survey_tags)]
```

**Step 4: Verify build**

Run: `npm run build`
Expected: `✓ Compiled successfully`

**Step 5: Commit**

```bash
git add survey-system/src/app/surveys/page.tsx
git commit -m "fix(surveys-list): derive type icon and filter from survey_tags"
```

---

## Task 5: Fix dashboard display

**File:** `src/app/page.tsx`

Two `survey.survey_type` reads (lines 185 and 230).

**Step 1: Add import**

Add at the top:
```typescript
import { primarySurveyTypeFromTags } from '@/lib/survey-tags'
```

**Step 2: Fix line 185 — config lookup**

Find:
```typescript
const config = surveyTypeConfig[survey.survey_type]
```

Replace with:
```typescript
const config = surveyTypeConfig[primarySurveyTypeFromTags(survey.survey_tags)]
```

**Step 3: Fix line 230 — inline type label**

Find:
```typescript
{survey.survey_type}
```

Replace with:
```typescript
{primarySurveyTypeFromTags(survey.survey_tags)}
```

**Step 4: Verify build**

Run: `npm run build`
Expected: `✓ Compiled successfully`

**Step 5: Commit**

```bash
git add survey-system/src/app/page.tsx
git commit -m "fix(dashboard): derive survey type display from survey_tags"
```

---

## Task 6: Final verification and push

**Step 1: Full build check**

Run: `npm run build`
Expected: `✓ Compiled successfully`, all 30 static pages generated, no errors

**Step 2: Quick sanity check on survey_tags data in DB**

Run this against the remote DB to confirm tags are being written:
```sql
SELECT id, survey_tags, survey_type
FROM surveys
WHERE survey_tags IS NOT NULL AND array_length(survey_tags, 1) > 0
LIMIT 10;
```

If rows exist with populated `survey_tags`, the helper will work correctly.
If all rows have empty tags, the fallback kicks in — behaviour is identical to today.

**Step 3: Push to main**

```bash
git push origin main
```

Expected: Coolify auto-deploy triggers. No breaking changes — fallback path is `'damp'` throughout.

---

## What This Does NOT Change

- `surveys.survey_type` column in DB — untouched
- `survey/new/page.tsx` — still writes `survey_type: 'damp'` on creation (harmless, no code reads it anymore)
- `pricing-data.ts` — not touched (already room-driven)
- `survey-mapping.ts` — not touched (already room-driven)
- Report template data in `report_templates` table — untouched
- Quotation system — not affected
- PDF renderer — not affected
