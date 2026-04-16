# SURVEY_TYPE Migration — Pre-Work Investigation Plan

**Purpose:** Before migrating away from `surveys.survey_type` to a derived, room-based tagging system, two architectural questions must be answered precisely. This document defines exactly what to read, query, and test to answer them.

**Context:** `surveys.survey_type` is a legacy field, hardcoded to `'damp'` on every new survey regardless of what the surveyor finds. The intent is to replace it with a computed array derived from `survey_rooms.issues_identified[]`. Two systems may depend on `survey_type` in ways that need to be understood before that change.

---

## Question 1 — Report Generation: Live Code or Dead Code?

### What we need to know
Is `loadDefaultTemplate(surveyType)` in the report generation flow actually used at runtime, or is it a vestigial code path? If it is used, does it select a structural skeleton (section headings, layout) or does it select content? Either way, can it survive without `surveys.survey_type`, and if not, what replaces the input?

### Files to read in full

| File | What to look for |
|------|-----------------|
| `src/lib/report-generator.ts` | Trace `generateReport()` from entry point to output. Is `loadDefaultTemplate()` called? What does the returned template object contribute to the final report — structure only, or content? Is there a code path that bypasses it? |
| `src/lib/report-data.ts` | Does any function filter by `survey_type`? What does it return when called? Is the return value used downstream? |
| `src/app/survey/[projectId]/report/page.tsx` | How does the page initiate report generation? What parameters does it pass? Does it ever read `survey.survey_type` directly from the surveys row? |
| `src/app/api/generate-report/route.ts` | What inputs does the API accept? Is `survey_type` a required parameter or is it derived server-side? |
| `src/types/survey-report.types.ts` | Does `ReportTemplate` or `SurveyReport` have `survey_type` as a required field? |

### Database queries to run

```sql
-- 1. What templates exist and how many?
SELECT id, survey_type, name, is_default
FROM report_templates
ORDER BY survey_type, name;

-- 2. Have any reports ever been generated (i.e. is the table in use)?
SELECT status, COUNT(*)
FROM survey_reports
GROUP BY status;

-- 3. If reports exist, what survey_type values do they carry?
SELECT sr.survey_type, COUNT(*)
FROM survey_reports sr
GROUP BY sr.survey_type;
```

### What to check on the live app

1. Navigate to any completed survey → open the Report tab
2. Note: does the page load without error? Does a report exist or does it prompt to generate?
3. If "Generate Report" exists, click it and observe: does it complete, error, or produce output?
4. If a report renders: does its structure look like it came from a template (fixed section headings), or is it entirely driven by what was found in rooms?

### Decision output

After investigation, answer:

- [ ] Is `loadDefaultTemplate()` called at runtime for any active survey? **YES / NO**
- [ ] If YES: does removing the `survey_type` input break it, or can the template be selected another way (e.g. by detecting issue types from rooms)?
- [ ] Is the `report_templates` table populated with real data, or just seed/placeholder rows?
- [ ] Is `survey_reports` table being actively written to, or is it empty/legacy?
- [ ] Can report generation be triggered today without `survey_type` being set?

---

## Question 2 — Costing Sections: Filtered at Runtime or Load-All?

### What we need to know
Does `pricing-data.ts` query `costing_sections WHERE survey_type = ?` at runtime, filtering which sections/line items are loaded? Or does it load all sections and the surveyor sees everything regardless? The answer determines whether removing `survey_type` from `surveys` silently empties the costing engine or has no effect.

### Files to read in full

| File | What to look for |
|------|-----------------|
| `src/lib/pricing-data.ts` | Find every query against `costing_sections` and `costing_line_templates`. Does any query use `survey_type` as a WHERE clause? If so, where does the `survey_type` value come from — is it read from `surveys.survey_type`, passed in as a parameter, or derived from room `issues_identified[]`? |
| `src/lib/survey-mapping.ts` | What is the entry point function? What does it receive as input? Does it receive `survey_type` as a direct parameter, or does it derive the type from room data? Trace the full input → output path. |
| `src/app/survey/[projectId]/costing/page.tsx` | When the costing page loads, what does it call? What parameters does it pass? Does it read `survey.survey_type` from the surveys row and pass it anywhere? |
| `src/components/wizard/` (all files) | Does any wizard step pass `survey_type` to a costing or section-loading function? Or do wizard steps only write to `issues_identified[]` in room data? |

### Database queries to run

```sql
-- 1. What survey_type values exist in costing_sections?
SELECT survey_type, COUNT(*) as section_count
FROM costing_sections
GROUP BY survey_type
ORDER BY survey_type;

-- 2. Are there any sections with NULL survey_type (i.e. universal sections)?
SELECT id, name, survey_type
FROM costing_sections
WHERE survey_type IS NULL;

-- 3. What survey_type values exist in costing_line_templates (via their section)?
SELECT cs.survey_type, COUNT(clt.id) as template_count
FROM costing_sections cs
LEFT JOIN costing_line_templates clt ON clt.section_id = cs.id
GROUP BY cs.survey_type
ORDER BY cs.survey_type;

-- 4. Have any survey_costing_lines been written for non-damp types?
-- (This tells us whether the engine has ever run for timber/condensation/woodworm)
SELECT cs.survey_type, COUNT(scl.id) as calculated_lines
FROM survey_costing_lines scl
JOIN costing_line_templates clt ON scl.line_template_id = clt.id
JOIN costing_sections cs ON clt.section_id = cs.id
GROUP BY cs.survey_type;
```

### What to check on the live app

1. Open an existing survey that has rooms with issues marked
2. Navigate to the Costing tab
3. Observe: does it show sections for ALL issue types found in rooms, or only the type matching `surveys.survey_type` ('damp')?
4. If a survey has rooms with only timber issues marked — does the costing tab show timber sections, or does it show damp sections (because `surveys.survey_type = 'damp'`)?

### Decision output

After investigation, answer:

- [ ] Does any query in `pricing-data.ts` use `survey_type` as a WHERE filter at runtime? **YES / NO**
- [ ] If YES: where does that `survey_type` value come from — `surveys.survey_type` column, or derived from `issues_identified[]`?
- [ ] If the costing page is loaded for a survey where `surveys.survey_type = NULL`, does it error, show nothing, or work correctly?
- [ ] Does the mapping engine (`survey-mapping.ts`) receive `survey_type` as an explicit input, or does it compute it internally from room data?

---

## After Both Questions Are Answered

Once the above is documented, the migration plan can be written with confidence. The expected outcome is:

**If reports and costing both derive type from room data (ideal):**
- `surveys.survey_type` can be made nullable immediately with no code changes
- Derived tagging (computed array from `issues_identified[]`) becomes the canonical type signal
- Display/filtering code updated to use derived value — roughly 4–5 places

**If either system hard-reads `surveys.survey_type`:**
- That system needs a small refactor first (replace column read with derived-value function)
- Then nullable migration proceeds safely

---

*Created: 2026-03-01*
*Related: `surveys.survey_type` is hardcoded to `'damp'` in `src/app/survey/new/page.tsx` — this is a known bug independent of this migration*
