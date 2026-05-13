# Streamlit Deployment Walkthroughs

Official docs:

- https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/deploy
- https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/file-organization
- https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/app-dependencies

Community Cloud runs `streamlit run` from the repository root. Each project keeps `requirements.txt` at the root and the entrypoint at `app/streamlit_dashboard.py`.

## Retail Dashboard

Repository: `HaloXD1/data-pipeline-kpi-dashboard`

Values:

- Branch: `main`
- Main file path: `app/streamlit_dashboard.py`
- Python version: `3.12`
- Secrets: none
- Suggested app URL: `ahmed-retail-kpi-dashboard`

After deployment:

- Test Executive, Sales, Products, Customers, and Data Quality tabs.
- Paste URL into README `Live Demo`.
- Paste URL into LinkedIn Featured.
- Close issue: `Deploy Streamlit demo`.

## SaaS Dashboard

Repository: `HaloXD1/saas-analytics-engineering-pipeline`

Values:

- Branch: `main`
- Main file path: `app/streamlit_dashboard.py`
- Python version: `3.12`
- Secrets: none
- Suggested app URL: `ahmed-saas-analytics-pipeline`

After deployment:

- Test Executive, Revenue, Churn, Product Usage, Customer Health, and Data Quality tabs.
- Paste URL into README `Live Demo`.
- Paste URL into LinkedIn Featured.
- Close issue: `Deploy Streamlit demo`.

## Cloud Security Dashboard

Repository: `HaloXD1/cloud-security-posture-auditor`

Values:

- Branch: `main`
- Main file path: `app/streamlit_dashboard.py`
- Python version: `3.12`
- Secrets: none
- Suggested app URL: `ahmed-cloud-security-auditor`

After deployment:

- Test Executive Risk Summary, Critical Findings, IAM, Network Exposure, Storage Security, Logging and Detection, and Remediation Tracker tabs.
- Paste URL into README `Live Demo`.
- Paste URL into LinkedIn Featured.
- Close issue: `Deploy Streamlit demo`.

## Debugging

- Build fails because dependencies are missing: check root `requirements.txt`.
- App cannot find CSV files: check bootstrap function runs before loading exports.
- App imports fail: verify package install works with `pip install -e .`.
- App works locally but not in cloud: check paths are relative to the repository root.
- App is slow on first load: wait for first bootstrap run and refresh.
- Wrong code deployed: verify branch is `main`.
