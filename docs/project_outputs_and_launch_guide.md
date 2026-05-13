# Project Outputs And Launch Guide

Use this file to understand what each project produces and what Ahmed must do manually to make everything public-facing.

## Portfolio

Public URL:

- https://haloxd1.github.io/ahmed-yasser-portfolio/

What it shows:

- `Data Reliability Lab` positioning.
- Role switcher for Data Engineering, BI/Analytics, and Cloud Security.
- Flagship Retail system.
- SaaS and Cloud Security support projects.
- Proof sheet, case study, company packs, and SQL prep links.

Output preview:

- `docs/portfolio_home_preview.png`

## Project 1: Retail Data Pipeline And KPI Dashboard

Repository:

- https://github.com/HaloXD1/data-pipeline-kpi-dashboard

Main output:

- Streamlit dashboard with Executive, Sales, Products, Customers, and Data Quality views.

Visual files:

- `data-pipeline-kpi-dashboard/dashboard/screenshots/streamlit_dashboard.png`
- `data-pipeline-kpi-dashboard/dashboard/demo/retail_dashboard_demo.gif`

Technical outputs:

- SQLite warehouse: `data/processed/kpi_dashboard.sqlite`
- Clean CSVs: `data/processed/`
- Dashboard exports: `data/processed/dashboard_exports/`
- KPI CSVs: executive overview, monthly revenue, product performance, customer analysis, returns quality.
- Data quality report: `docs/data_quality_report.md`
- Quality diagnosis: `docs/quality_diagnosis.md`
- Lineage map: `docs/lineage.md`
- Run summary: `docs/run_summary.md`
- dbt-style SQL views under `models/`
- Optional Airflow DAG under `orchestration/airflow/`

What to understand:

- This is the strongest Data Engineering project.
- It proves pipeline reliability, not just dashboarding.
- The dashboard is the final layer; the real value is contracts, rejected rows, models, diagnosis, lineage, tests, and CI.

Local run:

```bash
cd /Users/ahmedyasser/Documents/NotUseless/Intern/data-pipeline-kpi-dashboard
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
retail-kpi generate-data
retail-kpi run-pipeline --mode full
retail-kpi run-models
retail-kpi diagnose-quality
retail-kpi export-lineage
streamlit run app/streamlit_dashboard.py
```

## Project 2: SaaS Analytics Engineering Pipeline

Repository:

- https://github.com/HaloXD1/saas-analytics-engineering-pipeline

Main output:

- Streamlit dashboard with SaaS executive metrics, revenue, churn, product usage, customer health, and data quality.

Visual files:

- `saas-analytics-engineering-pipeline/dashboard/screenshots/saas_dashboard.png`
- `saas-analytics-engineering-pipeline/dashboard/demo/saas_dashboard_demo.gif`

Technical outputs:

- DuckDB warehouse.
- Parquet layer exports.
- Gold KPI marts.
- Dashboard CSV exports.
- Data quality report.
- Run summary.

What to understand:

- This is the best Analytics Engineering / BI proof.
- It proves business metrics: MRR, churn, trial conversion, product adoption, customer health.
- It shows warehouse-to-mart thinking with DuckDB and Parquet.

Local run:

```bash
cd /Users/ahmedyasser/Documents/NotUseless/Intern/saas-analytics-engineering-pipeline
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
saas-analytics generate-data
saas-analytics run-pipeline --mode full
streamlit run app/streamlit_dashboard.py
```

## Project 3: Cloud Security Posture Auditor

Repository:

- https://github.com/HaloXD1/cloud-security-posture-auditor

Main output:

- Streamlit dashboard with risk summary, critical findings, IAM, network exposure, storage security, logging/detection, and remediation views.

Visual files:

- `cloud-security-posture-auditor/dashboard/screenshots/cloud_security_dashboard.png`
- `cloud-security-posture-auditor/dashboard/demo/cloud_security_dashboard_demo.gif`

Technical outputs:

- Synthetic AWS-style JSON snapshots.
- Findings database.
- CSV exports.
- Markdown security report.
- Remediation plan.
- Rules reference.

What to understand:

- This is the best Cloud Security / automation proof.
- It is safe to publish because it uses synthetic offline snapshots, not real AWS credentials.
- It proves YAML policy rules, risk scoring, remediation reporting, dashboarding, CI, and secret-safe design.

Local run:

```bash
cd /Users/ahmedyasser/Documents/NotUseless/Intern/cloud-security-posture-auditor
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
cloud-audit generate-snapshots
cloud-audit scan --source snapshots
streamlit run app/streamlit_dashboard.py
```

## Project 4: Outlook To Google Calendar Scanner

Repository:

- https://github.com/HaloXD1/outlook-calendar-automation

Main output:

- Python automation that scans Outlook emails, extracts academic deadlines, deduplicates them with SQLite, and creates Google Calendar events.

What to understand:

- This is the most personal/practical automation project.
- It proves API usage, deduplication, dry-run safety, audit logs, and solving a real workflow problem.
- Do not demo live credentials publicly.

## Manual Step-By-Step: Deploy Streamlit Apps

You must do this because it requires your Streamlit/GitHub login.

### A. Retail Dashboard

1. Go to https://share.streamlit.io/
2. Sign in with GitHub.
3. Click `Create app`.
4. Choose repository: `HaloXD1/data-pipeline-kpi-dashboard`.
5. Branch: `main`.
6. Main file path: `app/streamlit_dashboard.py`.
7. App URL suggestion: `ahmed-retail-kpi-dashboard`.
8. Secrets: none.
9. Click `Deploy`.
10. Wait for build logs to finish.
11. Open the app.
12. Test all tabs: Executive, Sales, Products, Customers, Data Quality.
13. Copy the live URL.

### B. SaaS Dashboard

1. Create another app.
2. Repository: `HaloXD1/saas-analytics-engineering-pipeline`.
3. Branch: `main`.
4. Main file path: `app/streamlit_dashboard.py`.
5. App URL suggestion: `ahmed-saas-analytics-pipeline`.
6. Secrets: none.
7. Deploy.
8. Test all tabs: Executive, Revenue, Churn, Product Usage, Customer Health, Data Quality.
9. Copy the live URL.

### C. Cloud Security Dashboard

1. Create another app.
2. Repository: `HaloXD1/cloud-security-posture-auditor`.
3. Branch: `main`.
4. Main file path: `app/streamlit_dashboard.py`.
5. App URL suggestion: `ahmed-cloud-security-auditor`.
6. Secrets: none.
7. Deploy.
8. Test all tabs: Executive Risk Summary, Critical Findings, IAM, Network Exposure, Storage Security, Logging and Detection, Remediation Tracker.
9. Copy the live URL.

## After You Have The 3 Streamlit URLs

Send the URLs back here.

Then I can update:

- Portfolio project buttons.
- GitHub profile README.
- Each project README `Live Demo` section.
- Proof sheet.
- CV source/PDF/DOCX if the links are stable.

## Manual Step-By-Step: GitHub Profile

1. Go to https://github.com/HaloXD1
2. Click `Customize your pins`.
3. Pin these repos in order:
   1. `data-pipeline-kpi-dashboard`
   2. `saas-analytics-engineering-pipeline`
   3. `cloud-security-posture-auditor`
   4. `ahmed-yasser-portfolio`
   5. `outlook-calendar-automation`
   6. `egx-research`
4. Save.

## Manual Step-By-Step: LinkedIn

1. Open your LinkedIn profile.
2. Update headline:

```text
Business Informatics Student | Data Engineering & Analytics Engineering | Python, SQL, Data Pipelines
```

3. Add Featured links:
   - Portfolio: `https://haloxd1.github.io/ahmed-yasser-portfolio/`
   - Proof sheet: `https://haloxd1.github.io/ahmed-yasser-portfolio/docs/Ahmed_Yasser_Portfolio_Proof_Sheet.pdf`
   - Retail Streamlit URL after deployment.
   - SaaS Streamlit URL after deployment.
   - Cloud Security Streamlit URL after deployment.

## What I Need From You

Only these:

1. The three Streamlit live URLs after you deploy them.
2. Confirmation that GitHub pins are done.
3. Confirmation that LinkedIn Featured links are added.

No secrets, passwords, or private credentials needed.
