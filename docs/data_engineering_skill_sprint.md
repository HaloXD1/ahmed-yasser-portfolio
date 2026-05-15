# 24-Week Data Engineering Skill Sprint

Assumption: 10-15 hours/week while applying for internships.

## Weekly Output

- 2 skill tasks.
- 1 mini deliverable.
- 5 interview questions.
- 1 weak-skill note.
- 1 short progress log in `goal_runs/`.

## Weeks 1-4: SQL And Python Base

| Week | Focus | Skill Tasks | Mini Deliverable |
|---|---|---|---|
| 1 | SQL foundations | JOINs, CTEs, aggregation, NULL handling | 30-query pack on retail/SaaS data |
| 2 | Analytics SQL | window functions, cohorts, KPI calculations | KPI query set with explanations |
| 3 | Python pipeline basics | files, functions, logging, errors | CSV cleaner with rejected-row output |
| 4 | API and database loading | requests, JSON, SQLite/Postgres loading | API-to-database loader with idempotency note |

## Weeks 5-8: Modeling And Analytics Engineering

| Week | Focus | Skill Tasks | Mini Deliverable |
|---|---|---|---|
| 5 | Data modeling | facts, dimensions, grain, keys | star schema sketch for retail project |
| 6 | dbt basics | sources, models, refs, tests | small dbt project or dbt-style SQL layer |
| 7 | Data quality | contracts, accepted values, freshness | test matrix for one flagship project |
| 8 | Documentation | lineage, model docs, KPI definitions | recruiter-readable data model doc |

## Weeks 9-12: Orchestration And Reliability

| Week | Focus | Skill Tasks | Mini Deliverable |
|---|---|---|---|
| 9 | Airflow basics | DAGs, tasks, dependencies | simple local DAG for one pipeline |
| 10 | Scheduling reliability | retries, backfills, failure states | failure-handling checklist |
| 11 | Docker | images, compose, env vars | clean local run instructions |
| 12 | Observability | health checks, logs, freshness | pipeline health report |

## Weeks 13-16: Cloud And Security-Aware Data

| Week | Focus | Skill Tasks | Mini Deliverable |
|---|---|---|---|
| 13 | AWS basics | S3, IAM, least privilege | safe S3-style architecture note |
| 14 | Warehouse concepts | partitions, Parquet, cost awareness | warehouse tradeoff memo |
| 15 | Secrets and config | `.env`, sample configs, rotation basics | secrets-safety audit of repos |
| 16 | Data security | PII handling, access control, logging | security-aware pipeline checklist |

## Weeks 17-20: Interview Conversion

| Week | Focus | Skill Tasks | Mini Deliverable |
|---|---|---|---|
| 17 | SQL interviews | joins, windows, edge cases | 20 solved SQL questions |
| 18 | Pipeline design | ingestion, transforms, failures | 2 pipeline design answers |
| 19 | Project defense | tradeoffs, mistakes, improvements | 1-minute and 3-minute project pitches |
| 20 | Mock interviews | behavioral and technical drills | answer bank updates |

## Weeks 21-24: Capstone Polish

| Week | Focus | Skill Tasks | Mini Deliverable |
|---|---|---|---|
| 21 | Retail upgrade | one reliability or data-quality improvement | merged improvement with tests |
| 22 | SaaS upgrade | one modeling or dashboard improvement | merged improvement with tests |
| 23 | Cloud auditor upgrade | one policy or reporting improvement | merged improvement with tests |
| 24 | Final application sprint | CV, LinkedIn, tracker, demos | apply-ready package review |

## Interview Drill Template

Every skill run should answer:

1. What did I build?
2. What data problem does it solve?
3. What can break?
4. How do I validate correctness?
5. What would I improve in production?
