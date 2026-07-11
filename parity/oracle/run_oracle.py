#!/usr/bin/env python3
"""Golden-master oracle: evaluates the ORIGINAL Excel workbooks with scenario
inputs and emits expected results JSON.

The workbook (not any reading of it) is the ground truth: this script loads the
actual .xlsm, injects the scenario's inputs into the real input cells, lets the
`formulas` library evaluate the sheet, and extracts every line/section/total
figure declared in the cell map.

Usage (from repo root):
    python3 parity/oracle/run_oracle.py --all
    python3 parity/oracle/run_oracle.py dpc-18lm-330mm [more-ids...]

Outputs: parity/results/expected/<scenario-id>.json

Validation: the mechanism was proven against the client review benchmarks
(DPC 18 LM @ 0.33 m -> £490.52; floor resin top coat 40 m² -> £280.20) before
being trusted. If you change a cell map, re-check those anchors.

Requires: pip install --break-system-packages formulas  (documented in README)
"""
import argparse
import json
import sys
from pathlib import Path

import formulas
import schedula  # noqa: F401  (formulas dependency; import check)

REPO_ROOT = Path(__file__).resolve().parents[2]
PARITY = REPO_ROOT / "parity"
SCENARIOS_DIR = PARITY / "scenarios"
CELLMAPS_DIR = PARITY / "oracle" / "cellmaps"
EXPECTED_DIR = PARITY / "results" / "expected"

_model_cache: dict = {}


def load_model(workbook_path: Path):
    """Load and compile an Excel model once per workbook file."""
    key = str(workbook_path)
    if key not in _model_cache:
        print(f"  loading workbook model: {workbook_path.name} ...", flush=True)
        xl = formulas.ExcelModel().loads(key).finish(circular=True)
        book_key = None
        for cell_key in xl.cells:
            if "COSTING" in cell_key.upper():
                book_key = cell_key.split("]")[0].lstrip("'[")
                break
        if not book_key:
            raise RuntimeError(f"could not find Costing sheet in {workbook_path}")
        _model_cache[key] = (xl, book_key)
    return _model_cache[key]


def scalar(v):
    """Extract a scalar from a formulas Ranges value."""
    try:
        while hasattr(v, "__len__") and not isinstance(v, str):
            v = v[0]
        if isinstance(v, str):
            return v if v else 0.0
        return round(float(v), 6)
    except (TypeError, ValueError, IndexError):
        return str(v)


def run_scenario(scenario: dict) -> dict:
    cellmap_path = CELLMAPS_DIR / f"{scenario['workbook']}.json"
    cellmap = json.loads(cellmap_path.read_text())
    wb_path = REPO_ROOT / cellmap["workbook_file"]
    sheet = cellmap["sheet"]
    xl, book_key = load_model(wb_path)

    def ref(cell):
        return f"'[{book_key}]{sheet}'!{cell}"

    cols = cellmap["line_columns"]
    lines = cellmap["lines"]
    scenario_lines = scenario.get("oracle", {}).get("lines", {})
    unknown = set(scenario_lines) - set(lines)
    if unknown:
        raise KeyError(f"scenario {scenario['id']}: unknown oracle lines {sorted(unknown)}")

    # --- Build inputs: every declared input cell gets an explicit value
    # (0 when the scenario doesn't use the line) so blank-cell semantics can
    # never diverge between Excel and the evaluator.
    inputs = {}
    for name, spec in lines.items():
        row = spec["row"]
        val = scenario_lines.get(name, 0)
        if spec["input"] == "f":
            if isinstance(val, dict):
                raise ValueError(f"line {name} takes a single quantity, got {val}")
            inputs[ref(f"F{row}")] = val
        elif spec["input"] == "de":
            d = val.get("d", 0) if isinstance(val, dict) else 0
            e = val.get("e", 0) if isinstance(val, dict) else 0
            inputs[ref(f"D{row}")] = d
            inputs[ref(f"E{row}")] = e
    travel = scenario.get("oracle", {}).get("travel", {})
    ti = cellmap["travel_inputs"]
    inputs[ref(ti["distance_one_way_miles"])] = travel.get("distance_miles", 0)
    inputs[ref(ti["men_travelling"])] = travel.get("men", 1)
    for sec, adj in (scenario.get("oracle", {}).get("section_adjustments") or {}).items():
        inputs[ref(cellmap["sections"][sec]["adjust_cell"])] = adj

    # --- Declare outputs
    outputs = []
    for name, spec in lines.items():
        row = spec["row"]
        for col in cols.values():
            outputs.append(ref(f"{col}{row}"))
    for sec, spec in cellmap["sections"].items():
        row = spec["total_row"]
        for col in ["K", "O", "S", "T", "U", "V"]:
            outputs.append(ref(f"{col}{row}"))
    outputs += [ref(c) for c in cellmap["totals"].values()]
    outputs += [ref(c) for c in cellmap["rates"].values()]

    sol = xl.calculate(inputs=inputs, outputs=outputs)

    def get(cell):
        return scalar(sol[ref(cell)].value)

    result = {
        "scenario": scenario["id"],
        "workbook": scenario["workbook"],
        "workbook_file": cellmap["workbook_file"],
        "oracle_inputs": {"lines": scenario_lines, "travel": travel},
        "lines": {},
        "sections": {},
        "totals": {},
        "rates": {},
    }
    for name, spec in lines.items():
        row = spec["row"]
        vals = {out: get(f"{col}{row}") for out, col in cols.items()}
        if any(isinstance(v, (int, float)) and abs(v) > 1e-9 for v in vals.values()):
            result["lines"][name] = {**vals, "line_keys": spec.get("line_keys"), "label": spec.get("label")}
    for sec, spec in cellmap["sections"].items():
        row = spec["total_row"]
        vals = {
            "materials": get(f"K{row}"), "hours": get(f"O{row}"), "labour": get(f"S{row}"),
            "total": get(f"T{row}"), "contractor_materials": get(f"U{row}"), "contractor_pay": get(f"V{row}"),
        }
        if any(isinstance(v, (int, float)) and abs(v) > 1e-9 for v in vals.values()):
            result["sections"][sec] = vals
    for key, cell in cellmap["totals"].items():
        result["totals"][key] = get(cell)
    for key, cell in cellmap["rates"].items():
        result["rates"][key] = get(cell)
    return result


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("ids", nargs="*", help="scenario ids to run")
    ap.add_argument("--all", action="store_true", help="run every scenario in parity/scenarios/")
    args = ap.parse_args()

    if args.all:
        paths = sorted(SCENARIOS_DIR.glob("*.json"))
    else:
        if not args.ids:
            ap.error("give scenario ids or --all")
        paths = [SCENARIOS_DIR / f"{i}.json" for i in args.ids]

    EXPECTED_DIR.mkdir(parents=True, exist_ok=True)
    for p in paths:
        scenario = json.loads(p.read_text())
        print(f"oracle: {scenario['id']}")
        result = run_scenario(scenario)
        out = EXPECTED_DIR / f"{scenario['id']}.json"
        out.write_text(json.dumps(result, indent=2))
        t = result["totals"]
        print(f"  subtotal ex VAT £{t.get('subtotal_ex_vat')}, "
              f"hours {t.get('labour_hours_subtotal')}, travel £{t.get('travel_price')} -> {out.relative_to(REPO_ROOT)}")


if __name__ == "__main__":
    sys.exit(main())
