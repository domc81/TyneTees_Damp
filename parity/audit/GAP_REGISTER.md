# GAP REGISTER — CLOSED (11 July 2026)

All capture gaps identified by the full-coverage instrument are CLOSED.
Definition of done met: all six full-coverage scenarios (damp, condensation
+ two PIV siblings, timber, woodworm) PASS to the penny alongside the nine
real-job scenarios — every priced input row of all four workbooks is
capturable in the wizard, mapped, and workbook-exact.

Regenerate the register at any time (it should stay empty):
    python3 parity/scenarios/build_full_coverage.py
    python3 parity/oracle/run_oracle.py --all
    cd survey-system && npx tsx scripts/parity/run-engine.ts --all && cd ..
    python3 parity/compare.py --all

Historical baseline (pre-closure): platform could price only £8,593/£15,267
damp, £13,241/£24,790 condensation, £5,668/£11,219 timber, £4,558/£11,137
woodworm of a full-coverage job. See git history for the working lists.
