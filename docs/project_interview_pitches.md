# Project Interview Pitches

## Retail Data Pipeline and KPI Dashboard

I built this as a junior Data Engineering portfolio project. The idea is that a retail business has messy CSV exports for customers, products, orders, and returns. My pipeline generates realistic messy data, validates it with YAML data contracts, cleans it with Python, loads it into SQLite, and exports KPI datasets for a Streamlit dashboard.

The project includes full and incremental pipeline modes, so rerunning the pipeline does not double-count revenue. It also stores rejected rows, writes data quality summaries, creates run summaries, and has health checks to make sure exported KPIs match the SQLite warehouse. I added tests, Docker, GitHub Actions, and documentation so it behaves like a small production-style ETL project rather than only a dashboard.

## SaaS Analytics Engineering Pipeline

I built this project to show analytics engineering. The business case is a SaaS company that wants trusted metrics from customer, subscription, invoice, product-event, and support-ticket data. The pipeline validates raw CSV and JSONL data, creates cleaned warehouse tables in DuckDB, writes Parquet layers, and builds SQL marts for MRR, churn, feature adoption, and customer health.

The dashboard is only the final layer. The stronger part is the modeling behind it: separating raw, cleaned, and gold KPI outputs, making business definitions explicit, proving incremental loading is idempotent, and checking that exports match the warehouse. It is designed to be easy to run locally, in Docker, and in CI.

## Cloud Security Posture Auditor

I built this project to show cloud/security automation without needing real AWS credentials. It generates synthetic AWS-style account snapshots and scans them with YAML policy rules. The rules check IAM MFA, old access keys, wildcard permissions, public S3 buckets, missing encryption, risky public security-group rules, public databases, missing logging, and missing detection flags.

Each finding has severity, explanation, remediation, and a compliance tag. The project exports findings, account scorecards, markdown reports, SQLite tables, and a Streamlit dashboard. It is safe for a public portfolio because it uses offline sample data, while still showing how cloud posture auditing works.

## Outlook to Google Calendar Scanner

I built this to solve a real university workflow problem: academic deadlines were spread across Outlook emails, and manually tracking them was error-prone. The tool scans emails, extracts exams, assignments, quizzes, and deadline information, deduplicates events with SQLite, and creates Google Calendar entries.

The important engineering parts are incremental scanning, course-aware classification, duplicate protection, dry-run mode, and JSON audit logs. It shows practical Python automation with APIs and safety checks.
