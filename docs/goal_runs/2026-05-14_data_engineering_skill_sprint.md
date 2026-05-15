# Data Engineering Skill Sprint - 2026-05-14

Status: Week 1 active.

Work done:

- Added solved SQL examples (5 core + 4 analytics) to `week_01_sql_query_pack.md`.
- Added missing `CAREER_CONTEXT.md` so future runs have one source of truth.

Top next actions (10-15h/week cap):

- Skill task 1 (SQL core): solve remaining 10 core queries + 1-2 sentence explain/validate each.
- Skill task 2 (SQL analytics): solve remaining 11 analytics queries, focus windows + churn/cohorts edge cases.

Mini deliverable:

- Finish Week 1 pack: all 30 solved queries + explanations in `week_01_sql_query_pack.md`.

Interview questions:

1. What is “grain” and why does it matter in joins?
2. When do you use `COUNT(*)` vs `COUNT(col)`?
3. How do window functions differ from aggregations?
4. How do you debug double-counting in revenue queries?
5. How do you define churn for retail vs SaaS?

Answer guidance (tight):

- Grain = one row meaning; mismatched grain => fanout/double-counting; fix by dedup/aggregate before join.
- `COUNT(*)` counts rows incl NULLs; `COUNT(col)` ignores NULL; validate with NULL rate checks.
- Windows keep row detail while adding metrics; aggregates collapse rows; use windows for ranks/running totals.
- Check join keys + uniqueness; compute revenue at line grain; compare totals pre/post joins; add anti-dup tests.
- Retail churn = inactivity since last purchase; SaaS churn = subscription cancel/non-renew; define window + cohort.

Weak-skill note:

- Watch for join fanout + window partition mistakes; always state grain + keys before writing SQL.

Blockers:

- None.

Unresolved:

- SQL dialect target (Postgres vs SQLite) for functions like `date_trunc`.
