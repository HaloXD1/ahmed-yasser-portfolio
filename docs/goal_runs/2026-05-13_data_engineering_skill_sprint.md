# Data Engineering Skill Sprint - 2026-05-13

Status: initialized.

Work done:

- Created 24-week Data Engineering skill plan.
- Set weekly output: 2 skill tasks, 1 mini deliverable, 5 interview questions, 1 weak-skill note.
- Added Week 1 SQL drill file: `week_01_sql_query_pack.md`.

Week 1 starting point:

- Skill task 1: write 15 SQL queries using JOINs, CTEs, aggregation, and NULL handling.
- Skill task 2: write 15 SQL queries focused on business KPIs from retail/SaaS data.
- Mini deliverable: complete `week_01_sql_query_pack.md` with SQL answers and short explanations.
- Weak-skill note: confirm whether window functions or joins feel weaker after the first drill.

Interview questions:

1. What is the difference between INNER JOIN and LEFT JOIN?
2. How do you prevent double-counting revenue?
3. What is a CTE and why use it?
4. How do NULL values affect aggregations?
5. How would you validate a KPI query?

Answer guidance:

- INNER JOIN keeps matching rows only; LEFT JOIN keeps all rows from the left table and adds NULLs where no match exists.
- Prevent double-counting by checking grain, joining on stable keys, aggregating after deduplication, and testing totals against source tables.
- A CTE makes complex SQL easier to read, debug, and reuse inside one query.
- NULLs are ignored by many aggregations like `SUM` and `AVG`, but `COUNT(*)` still counts rows.
- Validate KPI queries with row counts, source-total reconciliation, known test cases, edge cases, and dashboard export checks.

Blockers:

- None.
