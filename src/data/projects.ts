import cloudPreview from "../../assets/cloud_security_dashboard_demo.gif";
import egxPreview from "../../assets/egx_research_preview.svg";
import hasalaPreview from "../../assets/hasala_preview.svg";
import opsPreview from "../../assets/opstwin_command_center.png";
import outlookPreview from "../../assets/outlook_calendar_preview.svg";
import protocolPreview from "../../assets/protocol_preview.svg";
import retailPreview from "../../assets/retail_dashboard_demo.gif";
import saasPreview from "../../assets/saas_dashboard_demo.gif";

export type ProjectLink = {
  label: string;
  href: string;
  primary?: boolean;
};

export type Project = {
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  type: string;
  stack: string[];
  summary: string;
  problem: string;
  architecture: string;
  proof: string;
  strongestProof: string[];
  interviewPitch: string;
  previewImage: string;
  accent: "teal" | "blue" | "coral" | "gold";
  links: ProjectLink[];
  secondary?: boolean;
};

export const projects: Project[] = [
  {
    number: "01",
    slug: "retail-data-pipeline",
    title: "Retail Data Pipeline and KPI Dashboard",
    shortTitle: "Retail Data Pipeline",
    category: "Data engineering flagship",
    type: "Pipeline / Dashboard",
    stack: ["Python", "SQL", "SQLite", "Streamlit", "Data contracts", "CI"],
    summary: "Raw retail exports into trusted KPI tables, quality diagnosis, lineage, and a live dashboard.",
    problem:
      "Messy retail exports need trusted KPIs before anyone can rely on revenue, returns, product, or regional reporting.",
    architecture:
      "Synthetic CSV inputs flow through Python validation, contract checks, rejected-row reporting, SQLite loading, SQL models, dashboard exports, and Streamlit views.",
    proof:
      "The project proves pipeline reliability: schema checks, incremental/idempotent loading, data quality reports, lineage docs, dbt-style SQL models, Docker, and tests.",
    strongestProof: [
      "Rejects bad rows before loading.",
      "Documents quality diagnosis and lineage.",
      "Exports dashboard-ready KPI tables recruiters can inspect."
    ],
    interviewPitch:
      "I built a small data pipeline that rejects bad rows before loading, models trusted KPIs in SQL, and documents the root cause of data quality issues.",
    previewImage: retailPreview,
    accent: "teal",
    links: [
      { label: "Live demo", href: "https://ahmed-retail-kpi-dashboard.streamlit.app/", primary: true },
      { label: "Repository", href: "https://github.com/HaloXD1/data-pipeline-kpi-dashboard" },
      {
        label: "Quality diagnosis",
        href: "https://github.com/HaloXD1/data-pipeline-kpi-dashboard/blob/main/docs/quality_diagnosis.md"
      },
      { label: "Lineage", href: "https://github.com/HaloXD1/data-pipeline-kpi-dashboard/blob/main/docs/lineage.md" }
    ]
  },
  {
    number: "02",
    slug: "opstwin-control-tower",
    title: "OpsTwin Control Tower",
    shortTitle: "OpsTwin Control Tower",
    category: "Business systems simulation",
    type: "React SPA",
    stack: ["React", "TypeScript", "Simulation", "D3", "DuckDB-Wasm", "Playwright"],
    summary: "Operations twin for disruption scenarios, decisions, SQL analysis, and postmortems.",
    problem:
      "Business teams need a way to test operational decisions before disruptions damage service, cash, and risk.",
    architecture:
      "A deterministic 26-week operations simulation connects suppliers, warehouses, product families, regions, lanes, scenario events, decision playbooks, Monte Carlo variants, charts, SQL, and generated postmortems.",
    proof:
      "This shows product thinking and technical range beyond dashboards: simulation logic, stateful UI, React Flow, D3, in-browser DuckDB, web workers, tests, and GitHub Pages deployment.",
    strongestProof: [
      "Interactive scenario builder and decision playbook.",
      "Monte Carlo worker for resilience analysis.",
      "SQL lab and postmortem generator in a static browser app."
    ],
    interviewPitch:
      "I wanted one project that felt different from normal dashboards, so I built a static decision tool that simulates operational disruption and explains the tradeoffs.",
    previewImage: opsPreview,
    accent: "blue",
    links: [
      { label: "Live demo", href: "https://haloxd1.github.io/ops-twin-control-tower/", primary: true },
      { label: "Repository", href: "https://github.com/HaloXD1/ops-twin-control-tower" }
    ]
  },
  {
    number: "03",
    slug: "saas-analytics-engineering-pipeline",
    title: "SaaS Analytics Engineering Pipeline",
    shortTitle: "SaaS Analytics Pipeline",
    category: "Analytics engineering",
    type: "Metrics pipeline",
    stack: ["DuckDB", "Parquet", "SQL marts", "Streamlit", "Docker", "CI"],
    summary: "Subscription metrics stack for MRR, churn, adoption, product usage, and customer health.",
    problem:
      "A SaaS team needs consistent revenue, churn, activation, adoption, and account-health metrics instead of scattered one-off reports.",
    architecture:
      "Synthetic account, invoice, subscription, and event data are stored in DuckDB and Parquet, then shaped into dashboard-ready marts and Streamlit views.",
    proof:
      "The project proves analytics engineering habits: model layers, metric definitions, dashboard exports, tests, CI, Docker, and explainable SaaS KPIs.",
    strongestProof: [
      "Models MRR, churn, adoption, and customer health.",
      "Uses DuckDB and Parquet as an analytical layer.",
      "Links business metrics to warehouse-style outputs."
    ],
    interviewPitch:
      "This project models the SaaS metrics a product or revenue team would actually monitor: MRR, churn, adoption, and account health.",
    previewImage: saasPreview,
    accent: "coral",
    links: [
      { label: "Live demo", href: "https://ahmed-saas-analytics-pipeline.streamlit.app/", primary: true },
      { label: "Repository", href: "https://github.com/HaloXD1/saas-analytics-engineering-pipeline" }
    ]
  },
  {
    number: "04",
    slug: "cloud-security-posture-auditor",
    title: "Cloud Security Posture Auditor",
    shortTitle: "Cloud Security Auditor",
    category: "Cloud security automation",
    type: "Policy scanner",
    stack: ["Python", "YAML policies", "Risk scoring", "Security reports", "Docker", "CI"],
    summary: "Offline AWS-style posture scanner with risk scores, findings, and remediation reports.",
    problem:
      "Cloud teams need posture checks and remediation reports without exposing real cloud credentials in a public portfolio.",
    architecture:
      "Synthetic AWS-style snapshots are scanned against YAML policy rules for storage, IAM, network exposure, encryption, logging, and account-level risk.",
    proof:
      "The project shows security automation, policy-as-code thinking, safe synthetic data design, severity scoring, remediation reporting, Streamlit output, Docker, and tests.",
    strongestProof: [
      "Uses synthetic snapshots instead of real accounts.",
      "Scores findings by severity and affected account.",
      "Produces remediation-focused reports."
    ],
    interviewPitch:
      "I built an offline cloud posture auditor to show security automation without needing any real AWS account or secrets.",
    previewImage: cloudPreview,
    accent: "gold",
    links: [
      { label: "Live demo", href: "https://ahmed-cloud-security-auditor.streamlit.app/", primary: true },
      { label: "Repository", href: "https://github.com/HaloXD1/cloud-security-posture-auditor" }
    ]
  },
  {
    number: "05",
    slug: "outlook-calendar-automation",
    title: "Outlook to Google Calendar Scanner",
    shortTitle: "Outlook Calendar Automation",
    category: "Automation utility",
    type: "Python automation",
    stack: ["Python", "APIs", "SQLite", "Dry-run mode", "Tests"],
    summary: "Turns academic schedule-like data into calendar-ready events without exposing private data.",
    problem:
      "Academic deadlines and events spread across messages are easy to miss and annoying to enter manually.",
    architecture:
      "The utility parses schedule-like data, normalizes events, deduplicates records, supports dry runs, and keeps private calendar configuration out of the public repo.",
    proof:
      "This proves practical automation, API workflow design, tests, safe config habits, and turning a personal operational problem into a repeatable tool.",
    strongestProof: [
      "Keeps private schedule data ignored.",
      "Uses tests around parsing and event logic.",
      "Solves a real personal workflow."
    ],
    interviewPitch:
      "I used code to remove a manual scheduling task, and I made the repo safe by keeping private calendar data ignored.",
    previewImage: outlookPreview,
    accent: "teal",
    secondary: true,
    links: [{ label: "Repository", href: "https://github.com/HaloXD1/outlook-calendar-automation", primary: true }]
  },
  {
    number: "06",
    slug: "egx-research-toolkit",
    title: "EGX Research Toolkit",
    shortTitle: "EGX Research Toolkit",
    category: "Financial research tooling",
    type: "Research workflow",
    stack: ["Python", "Financial data", "Research", "Testing"],
    summary: "Repeatable tooling for Egyptian Exchange research and analysis workflows.",
    problem:
      "Financial research becomes weak when every analysis is a manual one-off with no repeatable process.",
    architecture:
      "The toolkit organizes scripts, helpers, and tests around repeatable market research workflows for Egyptian Exchange analysis.",
    proof:
      "This adds financial data curiosity, Python practice, testing discipline, and business-data context to the portfolio.",
    strongestProof: [
      "Turns research into repeatable scripts.",
      "Shows comfort with financial data workflows.",
      "Adds breadth beyond dashboards."
    ],
    interviewPitch:
      "I built this to make financial research more repeatable, with scripts and tests instead of one-off manual analysis.",
    previewImage: egxPreview,
    accent: "blue",
    secondary: true,
    links: [{ label: "Repository", href: "https://github.com/HaloXD1/egx-research", primary: true }]
  },
  {
    number: "07",
    slug: "protocol-productivity-app",
    title: "Protocol Productivity App",
    shortTitle: "Protocol Productivity App",
    category: "Application building",
    type: "Productivity app",
    stack: ["App development", "Product workflows", "UI", "Tests"],
    summary: "Application-building proof beyond data scripts and dashboards.",
    problem:
      "A data-focused portfolio still benefits from proof that the owner can reason about application structure and user workflows.",
    architecture:
      "Protocol is positioned as an app project that organizes productivity workflows and shows product-building range outside pure data pipelines.",
    proof:
      "This supports software execution, UI/product thinking, workflow awareness, testing, and public repo polish.",
    strongestProof: [
      "Shows app-building range.",
      "Adds UI and product workflow evidence.",
      "Supports software/backend internship conversations."
    ],
    interviewPitch:
      "Protocol shows I have application-building range, not only data scripts and dashboards.",
    previewImage: protocolPreview,
    accent: "coral",
    secondary: true,
    links: [{ label: "Repository", href: "https://github.com/HaloXD1/Protocol", primary: true }]
  },
  {
    number: "08",
    slug: "hasala-team-project",
    title: "Hasala",
    shortTitle: "Hasala",
    category: "Course team project",
    type: "Team project",
    stack: ["Teamwork", "Course project", "Product delivery"],
    summary: "Course collaboration proof, clearly labeled as team work under another GitHub account.",
    problem:
      "Recruiters sometimes ask about teamwork, but this project should not be presented as an Ahmed-owned solo repo.",
    architecture:
      "Hasala is included as a secondary course team project and labeled carefully to avoid overstating ownership.",
    proof:
      "This supports collaboration, course delivery, and shared-codebase experience while the owned repos carry the main technical proof.",
    strongestProof: [
      "Useful for teamwork stories.",
      "Not presented as solo-owned.",
      "Secondary to Ahmed-owned public repos."
    ],
    interviewPitch:
      "Hasala was a course team project. I reference it for teamwork, while my owned public repos show my individual technical proof.",
    previewImage: hasalaPreview,
    accent: "gold",
    secondary: true,
    links: [{ label: "Repository", href: "https://github.com/AdamAmr05/Hasala", primary: true }]
  }
];

export function getProject(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}
