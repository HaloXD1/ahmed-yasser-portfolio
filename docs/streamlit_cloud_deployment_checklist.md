# Streamlit Cloud Deployment Checklist

Source references:

- Streamlit deploy docs: https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/deploy
- Streamlit file organization docs: https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/file-organization
- Streamlit dependency docs: https://docs.streamlit.io/deploy/streamlit-community-cloud/deploy-your-app/app-dependencies

## Before Deployment

- Make the repository public when ready.
- Confirm `requirements.txt` exists.
- Confirm the Streamlit entrypoint exists:
  - Retail: `app/streamlit_dashboard.py`
  - SaaS: `app/streamlit_dashboard.py`
  - Cloud: `app/streamlit_dashboard.py`
- Confirm the dashboard bootstraps demo outputs when generated CSV files are missing.
- Confirm GitHub Actions are green.
- Confirm README has a placeholder for the live demo URL.

## Deploy Steps

1. Go to Streamlit Community Cloud.
2. Sign in with GitHub.
3. Select **Create app**.
4. Choose the GitHub repository.
5. Select branch: `main`.
6. Set main file path: `app/streamlit_dashboard.py`.
7. Choose a clean app URL if available.
8. Deploy.
9. Watch logs during first build.
10. Open the app URL and test all tabs.

## After Deployment

- Add the live URL to the project README.
- Add the live URL to the portfolio landing page.
- Add the live URL to LinkedIn Featured.
- Add the live URL to the CV only after all apps are stable.
- Close the GitHub issue named `Deploy Streamlit demo`.

## Troubleshooting

- If imports fail, check `requirements.txt`.
- If data files are missing, verify bootstrap logic runs on app startup.
- If the app is slow on first load, rerun once after initial dependency installation.
- If the app points to old code, confirm Streamlit is deploying branch `main`.
