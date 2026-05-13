# Interview Answers

## Tell Me About Yourself

I am a Business Informatics student focused on Data Engineering, BI, and Analytics Engineering internships. I like building practical systems with Python and SQL, especially pipelines that clean messy data, validate it, load it into a small warehouse, and turn it into useful KPIs or dashboards.

Recently I built three portfolio projects: a retail ETL pipeline with SQLite and data contracts, a SaaS analytics pipeline with DuckDB and Parquet marts, and a cloud security posture auditor using YAML policy rules. I am looking for an internship where I can keep improving my Python, SQL, data quality, automation, and dashboarding skills in a real team.

## Walk Me Through Your Retail Pipeline

The retail project simulates messy business exports from customers, products, orders, and returns systems. The pipeline starts by generating raw CSV data, then validates the files against YAML data contracts. Those contracts check required columns, ID formats, numeric ranges, dates, duplicates, and foreign keys.

After validation, the pipeline cleans the data, separates rejected rows into a data quality issues file, and loads clean records into SQLite. It supports both full refresh and incremental mode, and it is idempotent, so rerunning the pipeline does not double-count revenue. Then SQL KPI queries export dashboard-ready datasets for revenue, margins, products, customers, returns, and quality metrics. The Streamlit dashboard reads those exports, and health checks prove exports match the warehouse totals.

## Why Data Engineering?

I like Data Engineering because it is technical, practical, and business-relevant. It uses Python, SQL, databases, automation, and system design, but the output still connects to business decisions. It also fits how I like to work: building reliable workflows, cleaning messy inputs, validating assumptions, and making data usable for other people.

Compared with pure dashboard work, Data Engineering feels more defensible because it focuses on the pipelines, models, quality checks, and reliability behind the dashboard. I still enjoy BI, but I want to build the data foundation, not only the final report.

## Full Refresh Vs Incremental?

A full refresh rebuilds the target tables from scratch. It is simpler and useful when the dataset is small, when logic changes, or when you want a clean rebuild.

An incremental load only adds new or changed records since the last run. It is more efficient and closer to production pipelines, but it requires keys, timestamps, metadata, and deduplication rules. In my retail and SaaS projects, I added incremental mode and tests to prove reruns do not double-count records or revenue.

## How Do You Handle Bad Data?

I try not to silently drop bad data. First, I define expectations in data contracts: required columns, valid ranges, ID formats, dates, duplicate keys, and foreign keys. Then the pipeline validates raw data and writes rejected or problematic rows to a separate issues file.

The clean data continues into the warehouse, but the rejected rows are still visible for debugging and reporting. I also create quality summaries and health checks, so the pipeline can fail if required exports are missing, quality scores are too low, or KPI exports disagree with database totals.

## Why DuckDB And SQLite?

SQLite is simple and reliable for transactional-style local storage. It is good for showing loading, primary keys, metadata tables, and idempotent pipeline behavior without needing a hosted database.

DuckDB is better for analytics-style work. It is local like SQLite, but optimized for analytical queries and works well with Parquet. That makes it a good fit for the SaaS analytics project, where the goal is SQL marts and dashboard-ready metrics. I used both because they show different tradeoffs without overengineering the portfolio.

## Explain Your Cloud Security Project

The cloud security project is an offline posture auditor. Instead of connecting to a real AWS account, it generates synthetic AWS-style JSON snapshots so it is safe to publish. The scanner reads those snapshots and applies YAML policy rules for common risks like IAM users without MFA, old access keys, wildcard permissions, public S3 buckets, missing encryption, risky public security-group rules, public databases, and missing logging.

Each finding includes the resource, rule ID, severity, risk explanation, remediation, and compliance tag. The project exports findings, account scorecards, markdown reports, a SQLite database, and a Streamlit dashboard. It shows security automation, policy-as-code, risk scoring, and reporting without exposing real credentials.
