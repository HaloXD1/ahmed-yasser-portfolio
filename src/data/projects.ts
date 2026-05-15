import cloudPreview from "../../assets/cloud_security_dashboard_demo.gif";
import egxPreview from "../../assets/egx_research_preview.svg";
import opsPreview from "../../assets/opstwin_command_center.png";
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
  intent: string;
  howItWorks: string;
  whyItMatters: string;
  highlights: string[];
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
    summary: "A Python research toolkit for making Egyptian Exchange analysis less one-off.",
    intent:
      "I built this because financial research can turn into scattered notebooks and half-repeatable steps very quickly. The goal was to make the research process more reusable and easier to inspect later.",
    howItWorks:
      "The toolkit organizes scripts, helpers, and tests around repeatable market research workflows for Egyptian Exchange analysis.",
    whyItMatters:
      "This is not a market prediction project. It is about workflow discipline: scripts, helpers, and tests instead of doing the same analysis manually every time.",
    highlights: [
      "Turns recurring research steps into reusable scripts.",
      "Keeps financial-data analysis organized and testable.",
      "Adds business-data context beyond dashboards."
    ],
    previewImage: egxPreview,
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
    summary: "A productivity app that shows I can build around a user workflow, not only around data files.",
    intent:
      "Protocol sits outside the main data projects on purpose. I wanted one project that shows I can think through a user workflow and build an actual app surface, not only pipelines and dashboards.",
    howItWorks:
      "The app organizes productivity workflows through a user-facing interface, with public code and tests supporting the core behavior.",
    whyItMatters:
      "It adds range. The main direction is still data, but this shows I can reason about product structure, interface behavior, and general software execution too.",
    highlights: [
      "Shows app-building range outside data pipelines.",
      "Focuses on workflow and product structure.",
      "Adds software execution context to the portfolio."
    ],
    previewImage: protocolPreview,
    accent: "coral",
    secondary: true,
    links: [{ label: "Repository", href: "https://github.com/AhmedYasserShalaby/Protocol", primary: true }]
  }
];

export function getProject(slug: string | undefined) {
  return projects.find((project) => project.slug === slug);
}
