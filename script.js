const roleContent = {
  engineering: {
    title: "Retail pipeline first, SaaS pipeline second.",
    copy:
      "Lead with the retail ETL project: contracts, incremental loading, SQL model layer, quality diagnosis, lineage, Airflow example, Docker, CI, and dashboard exports.",
    items: [
      "Proves Python, SQL, validation, data modeling, and reliability.",
      "Shows root-cause thinking through the quality diagnosis report.",
      "Gives recruiters a fast proof sheet and deeper case study.",
    ],
    link: "https://ahmed-retail-kpi-dashboard.streamlit.app/",
    linkText: "Open retail demo",
  },
  analytics: {
    title: "SaaS metrics plus retail KPI proof.",
    copy:
      "Lead with the SaaS analytics project for MRR, churn, adoption, and customer health. Use retail as the pipeline and data-quality backup.",
    items: [
      "Shows business metrics, SQL marts, and dashboard-ready exports.",
      "Connects BI output to trusted modeling and validation.",
      "Fits data analyst, BI intern, and analytics engineering roles.",
    ],
    link: "https://ahmed-saas-analytics-pipeline.streamlit.app/",
    linkText: "Open SaaS demo",
  },
  security: {
    title: "Cloud security automation with data discipline.",
    copy:
      "Lead with the cloud security auditor, then connect it to the same automation habits: rules, findings, scoring, remediation, reports, dashboards, and CI.",
    items: [
      "Shows policy-as-code, IAM-style checks, and risk scoring.",
      "Keeps the security proof safe by using offline synthetic snapshots.",
      "Works for cloud, cyber, IAM, SOC, risk, and automation roles.",
    ],
    link: "https://ahmed-cloud-security-auditor.streamlit.app/",
    linkText: "Open security demo",
  },
};

const roleTabs = document.querySelectorAll(".role-tab");
const title = document.querySelector("#role-title");
const copy = document.querySelector("#role-copy");
const list = document.querySelector("#role-list");
const link = document.querySelector("#role-link");

roleTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const role = tab.dataset.role;
    const content = roleContent[role];
    roleTabs.forEach((item) => {
      item.classList.toggle("active", item === tab);
      item.setAttribute("aria-pressed", item === tab ? "true" : "false");
    });
    title.textContent = content.title;
    copy.textContent = content.copy;
    list.replaceChildren(...content.items.map((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    }));
    link.href = content.link;
    link.textContent = content.linkText;
  });
});
