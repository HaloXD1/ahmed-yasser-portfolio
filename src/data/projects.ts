import cloudPreview from "../../assets/cloud_security_dashboard_demo.gif";
import egxHoldoutExcessChart from "../../assets/egx_holdout_excess.png";
import egxHoldoutChart from "../../assets/egx_holdout_validation.png";
import egxMembershipChart from "../../assets/egx_membership_impact.png";
import egxPreview from "../../assets/egx_research_demo.gif";
import egxRiskMapChart from "../../assets/egx_risk_adjusted_map.png";
import opsPreview from "../../assets/opstwin_command_center.png";
import protocolPreview from "../../assets/protocol_app_demo.gif";
import protocolDashboardImage from "../../assets/protocol_dashboard.jpg";
import protocolFocusImage from "../../assets/protocol_focus.jpg";
import protocolMarketImage from "../../assets/protocol_market.jpg";
import protocolTerminalImage from "../../assets/protocol_terminal.jpg";
import retailPreview from "../../assets/retail_dashboard_demo.gif";
import saasPreview from "../../assets/saas_dashboard_demo.gif";

export type ProjectLink = {
  label: string;
  href: string;
  primary?: boolean;
};

export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  fit?: "cover" | "contain";
  tone?: "light" | "dark";
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
  intent: string;
  howItWorks: string;
  whyItMatters: string;
  highlights: string[];
  previewImage: string;
  gallery?: ProjectImage[];
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
    summary: "I took messy retail-style files and built the layer I would want before trusting the dashboard.",
    intent:
      "I built this because dashboards can look polished even when the data underneath is a mess. The project starts before the chart: check the raw files, reject broken rows, define the KPIs, and only then show the numbers.",
    howItWorks:
      "Synthetic CSV inputs flow through Python validation, contract checks, rejected-row reporting, SQLite loading, SQL models, dashboard exports, and Streamlit views.",
    whyItMatters:
      "This is the kind of data work I enjoy most: quiet reliability. If the inputs are checked, the load is repeatable, and the metric logic is clear, the dashboard stops being decoration and starts being useful.",
    highlights: [
      "Raw data is validated before it enters the warehouse.",
      "Bad records are separated instead of silently corrupting KPIs.",
      "The final tables support revenue, returns, product, and regional reporting."
    ],
    previewImage: retailPreview,
    accent: "teal",
    links: [
      { label: "Live demo", href: "https://ahmed-retail-kpi-dashboard.streamlit.app/", primary: true },
      { label: "Repository", href: "https://github.com/AhmedYasserShalaby/data-pipeline-kpi-dashboard" },
      {
        label: "Quality diagnosis",
        href: "https://github.com/AhmedYasserShalaby/data-pipeline-kpi-dashboard/blob/main/docs/quality_diagnosis.md"
      },
      { label: "Lineage", href: "https://github.com/AhmedYasserShalaby/data-pipeline-kpi-dashboard/blob/main/docs/lineage.md" }
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
    summary: "A supply-chain disruption simulator for playing with decisions before the damage is real.",
    intent:
      "I wanted one project that was not just another dashboard. OpsTwin is a small decision lab: change the disruption, choose a response, and watch how service, cost, inventory, and risk move together.",
    howItWorks:
      "A deterministic 26-week operations simulation connects suppliers, warehouses, product families, regions, lanes, scenario events, decision playbooks, Monte Carlo variants, charts, SQL, and generated postmortems.",
    whyItMatters:
      "The point is tradeoffs. A decision can improve service and hurt cost, or reduce risk and create inventory pressure. I built it to practice turning business uncertainty into something interactive and measurable.",
    highlights: [
      "Scenario builder for demand, supplier, and logistics shocks.",
      "Decision playbook for recovery actions and tradeoffs.",
      "SQL lab and generated postmortems inside a static browser app."
    ],
    previewImage: opsPreview,
    accent: "blue",
    links: [
      { label: "Live demo", href: "https://ahmedyassershalaby.github.io/ops-twin-control-tower/", primary: true },
      { label: "Repository", href: "https://github.com/AhmedYasserShalaby/ops-twin-control-tower" }
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
    summary: "A SaaS metrics pipeline for the numbers teams argue about when definitions are unclear.",
    intent:
      "I built this around a common analytics problem: everyone wants MRR, churn, adoption, and health scores, but the numbers become useless if every report defines them differently.",
    howItWorks:
      "Synthetic account, invoice, subscription, and event data are stored in DuckDB and Parquet, then shaped into dashboard-ready marts and Streamlit views.",
    whyItMatters:
      "The important part is not the dashboard. It is having one place where the metric logic lives, so revenue and product questions are answered from models instead of one-off formulas.",
    highlights: [
      "Models subscription, account, invoice, and product-event data.",
      "Creates SQL marts for recurring SaaS metrics.",
      "Keeps metric logic close to the warehouse layer."
    ],
    previewImage: saasPreview,
    accent: "coral",
    links: [
      { label: "Live demo", href: "https://ahmed-saas-analytics-pipeline.streamlit.app/", primary: true },
      { label: "Repository", href: "https://github.com/AhmedYasserShalaby/saas-analytics-engineering-pipeline" }
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
    summary: "An offline cloud security scanner built with synthetic AWS-style accounts, so no secrets are involved.",
    intent:
      "I wanted to show cloud security thinking without connecting a real cloud account. The scanner asks basic but important questions: what is exposed, who has too much access, what is unencrypted, and what is missing logging?",
    howItWorks:
      "Synthetic AWS-style snapshots are scanned against YAML policy rules for storage, IAM, network exposure, encryption, logging, and account-level risk.",
    whyItMatters:
      "The project is about turning security checks into something readable. A finding should not only say what is wrong; it should show severity, affected service, and the next sensible fix.",
    highlights: [
      "Uses synthetic snapshots instead of real cloud accounts.",
      "Encodes checks as editable YAML policies.",
      "Groups findings by severity, account, service, and remediation path."
    ],
    previewImage: cloudPreview,
    accent: "gold",
    links: [
      { label: "Live demo", href: "https://ahmed-cloud-security-auditor.streamlit.app/", primary: true },
      { label: "Repository", href: "https://github.com/AhmedYasserShalaby/cloud-security-posture-auditor" }
    ]
  },
  {
    number: "05",
    slug: "egx-research-toolkit",
    title: "EGX Research Toolkit",
    shortTitle: "EGX Research Toolkit",
    category: "Financial research tooling",
    type: "Research workflow",
    stack: ["Python", "Financial data", "Research", "Testing"],
    summary: "A Python toolkit for turning messy EGX data into repeatable research runs.",
    intent:
      "I built this because EGX research can change a lot depending on the data source, index membership history, and portfolio rules. The goal was not to pretend one chart is the truth; it was to make the assumptions visible.",
    howItWorks:
      "A CLI workflow normalizes market data, runs strategy configurations, records backtest outputs, compares holdout periods, and saves charts and run notes for later review.",
    whyItMatters:
      "This is not a stock-picking promise. It is a research system that shows how data quality, risk, and validation can change the story before anyone trusts the result.",
    highlights: [
      "Compares results across data assumptions instead of hiding them.",
      "Uses holdout checks so the analysis is not only in-sample.",
      "Shows return, drawdown, and risk-adjusted context together."
    ],
    previewImage: egxPreview,
    gallery: [
      {
        src: egxMembershipChart,
        alt: "EGX chart comparing strategy results across membership assumptions.",
        caption: "Data provenance can flip the result, so the toolkit makes membership assumptions visible.",
        fit: "contain",
        tone: "light"
      },
      {
        src: egxHoldoutChart,
        alt: "EGX holdout validation chart comparing research runs against a baseline.",
        caption: "Holdout validation checks whether a run still makes sense outside the tuning window.",
        fit: "contain",
        tone: "light"
      },
      {
        src: egxHoldoutExcessChart,
        alt: "EGX holdout excess ladder chart.",
        caption: "The ladder shows which research variants added value after the baseline comparison.",
        fit: "contain",
        tone: "light"
      },
      {
        src: egxRiskMapChart,
        alt: "EGX risk map plotting return against drawdown.",
        caption: "The risk map keeps drawdown beside return, because a bigger number is not automatically a better system.",
        fit: "contain",
        tone: "light"
      }
    ],
    accent: "blue",
    secondary: true,
    links: [{ label: "Repository", href: "https://github.com/AhmedYasserShalaby/egx-research", primary: true }]
  },
  {
    number: "06",
    slug: "protocol-productivity-app",
    title: "Protocol Productivity App",
    shortTitle: "Protocol Productivity App",
    category: "Application building",
    type: "Productivity app",
    stack: ["App development", "Product workflows", "UI", "Tests"],
    summary: "A mobile productivity app built around habits, focus sessions, rewards, and daily feedback.",
    intent:
      "Protocol sits outside the main data projects on purpose. I wanted to build something with a real product loop: check the day, complete habits, start a focus session, earn points, and see progress without feeling like it belongs in a spreadsheet.",
    howItWorks:
      "The app combines a daily dashboard, habit tracking, a focus timer, a reward market, inventory, and a terminal-style diagnostics view into one mobile-first workflow.",
    whyItMatters:
      "It adds range to the portfolio. It shows I can think about product behavior, interface detail, state, and user motivation, not only backend pipelines and analysis scripts.",
    highlights: [
      "Turns daily habits into a visible feedback loop.",
      "Uses a reward market to make progress feel concrete.",
      "Shows product and frontend execution alongside the data projects."
    ],
    previewImage: protocolPreview,
    gallery: [
      {
        src: protocolDashboardImage,
        alt: "Protocol mobile dashboard with market pulse, daily habits, and command cards.",
        caption: "The dashboard pulls market pulse, habits, points, and daily commands into one starting screen.",
        fit: "contain",
        tone: "dark"
      },
      {
        src: protocolTerminalImage,
        alt: "Protocol terminal diagnostics screen showing daily commits and activity.",
        caption: "The diagnostics view turns activity history into something reviewable instead of hidden.",
        fit: "contain",
        tone: "dark"
      },
      {
        src: protocolMarketImage,
        alt: "Protocol reward market and inventory screen.",
        caption: "The market gives the habit system a simple reward loop with points, history, and inventory.",
        fit: "contain",
        tone: "dark"
      },
      {
        src: protocolFocusImage,
        alt: "Protocol focus timer screen for a study session.",
        caption: "The focus screen makes the session feel intentional, with a timer and launch checklist.",
        fit: "contain",
        tone: "dark"
      }
    ],
    accent: "coral",
    secondary: true,
    links: [{ label: "Repository", href: "https://github.com/AhmedYasserShalaby/Protocol", primary: true }]
  }
];

export function getProject(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}
