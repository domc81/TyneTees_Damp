#!/usr/bin/env python3
"""Golden-master differ: compares oracle expected vs engine actual to the penny.

Joins at two levels:
  1. LINES — oracle line entries declare `line_keys` (our costing_line_templates
     keys); the oracle figure is compared against the SUM of the engine lines
     with those keys (some workbook rows map to 2 templates, e.g. Warmline
     board+adhesive).
  2. TOTALS — materials/labour/hours/travel/subtotal/VAT/grand total/days.

Tolerance: ±0.005 (half a penny) absolute, matching the review's release gate
("match to the penny").

Usage (from repo root):
    python3 parity/compare.py --all
    python3 parity/compare.py dpc-18lm-330mm ...

Reads  parity/results/expected/<id>.json + parity/results/actual/<id>.json
Writes parity/results/reports/<id>.md and parity/results/reports/SUMMARY.md
Exit code 0 = full parity, 1 = variances found.
"""
import argparse
import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
PARITY = REPO_ROOT / "parity"
EXPECTED = PARITY / "results" / "expected"
ACTUAL = PARITY / "results" / "actual"
REPORTS = PARITY / "results" / "reports"

TOL = 0.005
HOURS_TOL = 0.0005

TOTALS_COMPARED = [
    # (key, label, tolerance)
    ("materials_subtotal", "Materials subtotal", TOL),
    ("labour_subtotal", "Labour subtotal", TOL),
    ("labour_hours_subtotal", "Labour hours", HOURS_TOL),
    ("travel_price", "Travel (PSO)", TOL),
    ("travel_hours", "Travel hours", HOURS_TOL),
    ("days", "Days on site", 0.0005),
    ("subtotal_ex_vat", "Subtotal ex VAT", TOL),
    ("vat", "VAT", TOL),
    ("total_inc_vat", "Total inc VAT", TOL),
]

LINE_FIELDS = [
    ("materials", "materials", TOL),
    ("hours", "hours", HOURS_TOL),
    ("labour", "labour", TOL),
    ("total", "total", TOL),
]


def fnum(v):
    try:
        return float(v)
    except (TypeError, ValueError):
        return 0.0


def compare_scenario(sid: str):
    expected = json.loads((EXPECTED / f"{sid}.json").read_text())
    actual = json.loads((ACTUAL / f"{sid}.json").read_text())

    # Join keys come from the CURRENT cellmap, not the frozen golden — a
    # cellmap line_keys correction must not require an oracle re-run.
    cellmap_path = PARITY / "oracle" / "cellmaps" / f"{expected['workbook']}.json"
    if cellmap_path.exists():
        cm_lines = json.loads(cellmap_path.read_text())["lines"]
        for name, entry in expected["lines"].items():
            if name in cm_lines:
                entry["line_keys"] = cm_lines[name].get("line_keys")

    # Known WORKBOOK SUMMATION DEFECTS (deliberate platform deviations): the
    # damp/condensation sheets price asbestos testing but omit its section
    # from their own Materials/Labour subtotals (K139/O140 skip K133) — the
    # customer would never be billed for priced work. The platform includes
    # it; scenarios declare the affected line so expected totals are lifted
    # to the CORRECT sum. Reported to Steve, not silently reproduced.
    scenario_path = PARITY / "scenarios" / f"{sid}.json"
    if scenario_path.exists():
        scenario = json.loads(scenario_path.read_text())
        for dev in scenario.get("workbook_summation_defects", []):
            line = expected["lines"].get(dev["line"])
            if not line:
                continue
            fields = dev.get("fields")  # None = all money+hours
            t = expected["totals"]
            if fields is None or "hours" in fields:
                t["labour_hours_subtotal"] = fnum(t.get("labour_hours_subtotal")) + fnum(line.get("hours"))
            if fields is None:
                t["materials_subtotal"] = fnum(t.get("materials_subtotal")) + fnum(line.get("materials"))
                t["labour_subtotal"] = fnum(t.get("labour_subtotal")) + fnum(line.get("labour"))
                t["subtotal_ex_vat"] = fnum(t.get("subtotal_ex_vat")) + fnum(line.get("total"))
                t["vat"] = fnum(t.get("vat")) + fnum(line.get("total")) * 0.2
                t["total_inc_vat"] = fnum(t.get("total_inc_vat")) + fnum(line.get("total")) * 1.2

    rows = []
    fails = 0

    # ---- Line-level ----
    matched_keys = set()
    for name, exp in expected["lines"].items():
        keys = exp.get("line_keys")
        if not keys:
            continue
        act = {"materials": 0.0, "hours": 0.0, "labour": 0.0, "total": 0.0}
        found = False
        for k in keys:
            a = actual["lines"].get(k)
            if a:
                found = True
                matched_keys.add(k)
                for f in act:
                    act[f] += fnum(a.get(f))
        for ef, af, tol in LINE_FIELDS:
            e, a = fnum(exp.get(ef)), act[af]
            if abs(e) < 1e-9 and abs(a) < 1e-9:
                continue
            ok = abs(e - a) <= tol
            if not ok:
                fails += 1
            rows.append(("line", f"{name} [{'+'.join(keys)}] {ef}", e, a, ok,
                         "" if found else "NO ENGINE LINE EMITTED"))

    # Engine lines that produced money the oracle didn't ask for (e.g. force-bundled components)
    for k, a in actual["lines"].items():
        if k in matched_keys:
            continue
        if abs(fnum(a.get("total"))) < 1e-9:
            continue
        oracle_has = any(k in (l.get("line_keys") or []) for l in expected["lines"].values())
        if not oracle_has:
            fails += 1
            rows.append(("line", f"UNEXPECTED engine line {k} ({a.get('section')}) total", 0.0,
                         fnum(a.get("total")), False, "engine emitted a line the golden master does not"))

    # ---- Totals ----
    for key, label, tol in TOTALS_COMPARED:
        e = fnum(expected["totals"].get(key))
        a = fnum(actual["totals"].get(key))
        if abs(e) < 1e-9 and abs(a) < 1e-9:
            continue
        ok = abs(e - a) <= tol
        if not ok:
            fails += 1
        rows.append(("total", label, e, a, ok, ""))

    return rows, fails, expected, actual


def write_report(sid, rows, fails, expected, actual):
    REPORTS.mkdir(parents=True, exist_ok=True)
    lines = [f"# Parity report — `{sid}`", ""]
    lines.append(f"**Verdict: {'PASS — full parity to the penny' if fails == 0 else f'FAIL — {fails} variance(s)'}**")
    lines.append("")
    lines.append(f"- Golden master: `{expected['workbook_file']}` (evaluated live)")
    lines.append(f"- Engine: {actual.get('engine', 'n/a')}")
    miss = actual.get("diagnostics", {}).get("missing_templates") or []
    if miss:
        lines.append(f"- ⚠ Missing templates during mapping: {', '.join(miss)}")
    lines.append("")
    lines.append("| Level | Item | Workbook (expected) | Platform (actual) | Δ | Status |")
    lines.append("|---|---|---:|---:|---:|---|")
    for level, item, e, a, ok, note in rows:
        delta = a - e
        status = "✅" if ok else f"❌ {note}".strip()
        lines.append(f"| {level} | {item} | {e:,.4f} | {a:,.4f} | {delta:+,.4f} | {status} |")
    lines.append("")
    (REPORTS / f"{sid}.md").write_text("\n".join(lines))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("ids", nargs="*")
    ap.add_argument("--all", action="store_true")
    args = ap.parse_args()
    if args.all:
        sids = sorted(p.stem for p in EXPECTED.glob("*.json") if (ACTUAL / p.name).exists())
    else:
        sids = args.ids
    if not sids:
        ap.error("give scenario ids or --all")

    summary = ["# Parity summary", ""]
    total_fails = 0
    for sid in sids:
        rows, fails, expected, actual = compare_scenario(sid)
        write_report(sid, rows, fails, expected, actual)
        total_fails += fails
        verdict = "PASS" if fails == 0 else f"FAIL ({fails})"
        print(f"{verdict:10s} {sid}")
        for level, item, e, a, ok, note in rows:
            if not ok:
                print(f"    ❌ {item}: workbook {e:,.4f} vs platform {a:,.4f} (Δ {a-e:+,.4f}) {note}")
        summary.append(f"- **{verdict}** — [{sid}](./{sid}.md)")
    (REPORTS / "SUMMARY.md").write_text("\n".join(summary) + "\n")
    print(f"\n{'ALL SCENARIOS PASS' if total_fails == 0 else f'TOTAL VARIANCES: {total_fails}'}")
    sys.exit(0 if total_fails == 0 else 1)


if __name__ == "__main__":
    main()
