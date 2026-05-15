import { useState } from "react";
import { Link } from "react-router-dom";
import { getProject } from "../data/projects";
import { publicUrl } from "../utils/urls";

type ProofStage = {
  id: "raw" | "model" | "dq" | "bi";
  label: string;
  title: string;
  summary: string;
  proof: string[];
  projectSlug: string;
};

const consoleRows = [
  { label: "public repos", value: "8", state: "ready" },
  { label: "retail tests", value: "60/60", state: "passing" },
  { label: "calendar tests", value: "9/9", state: "passing" },
  { label: "protocol tests", value: "20/20", state: "passing" },
  { label: "proof docs", value: "case studies + guide", state: "linked" },
  { label: "security", value: "synthetic data only", state: "safe" }
];

const pipelineStages: ProofStage[] = [
  {
    id: "raw",
    label: "RAW",
    title: "Source data is treated as untrusted.",
    summary:
      "The portfolio starts with messy inputs: retail exports, SaaS events, synthetic cloud snapshots, and schedule-like records.",
    proof: ["schema checks before load", "private data kept out of repos", "rejected-row reporting"],
    projectSlug: "retail-data-pipeline"
  },
  {
    id: "model",
    label: "MODEL",
    title: "Tables are shaped before dashboards.",
    summary:
      "The strongest projects separate ingestion from analytical outputs, with SQL models and metric definitions carrying the logic.",
    proof: ["KPI tables", "DuckDB/Parquet marts", "documented metric definitions"],
    projectSlug: "saas-analytics-engineering-pipeline"
  },
  {
    id: "dq",
    label: "DQ",
    title: "Bad data gets diagnosed, not hidden.",
    summary:
      "Data quality is part of the story: contracts, validation, failure notes, lineage, and explainable rejected records.",
    proof: ["quality diagnosis", "lineage docs", "contract-first loading"],
    projectSlug: "retail-data-pipeline"
  },
  {
    id: "bi",
    label: "BI",
    title: "Outputs connect back to business decisions.",
    summary:
      "Dashboards and simulations are framed as decision surfaces: revenue, churn, operations recovery, risk, and remediation.",
    proof: ["Streamlit dashboards", "OpsTwin SQL lab", "cloud remediation report"],
    projectSlug: "opstwin-control-tower"
  }
];

export function ProofConsole() {
  const [activeStage, setActiveStage] = useState<ProofStage>(pipelineStages[0]);
  const activeProject = getProject(activeStage.projectSlug);

  return (
    <section className="proof-console-section" aria-labelledby="proof-console-title">
      <div className="proof-console-heading reveal">
        <p className="eyebrow">02B/Proof console</p>
        <h2 id="proof-console-title">Evidence you can inspect fast.</h2>
      </div>

      <div className="proof-console-grid">
        <div className="proof-terminal reveal" aria-label="Portfolio proof status">
          <div className="proof-terminal-top">
            <span>portfolio://proof-run</span>
            <span>LIVE</span>
          </div>
          <div className="proof-command">$ verify internship_signal</div>
          <div className="proof-status-list">
            {consoleRows.map((row) => (
              <div key={row.label} className="proof-status-row">
                <span>{row.label}</span>
                <strong>{row.value}</strong>
                <em>{row.state}</em>
              </div>
            ))}
          </div>
          <div className="proof-terminal-actions">
            <a href={publicUrl("docs/Ahmed_Yasser_Portfolio_Proof_Sheet.pdf")}>Proof sheet</a>
            <Link to="/projects">Project guide</Link>
          </div>
        </div>

        <div className="pipeline-inspector reveal">
          <div className="pipeline-tabs" aria-label="Pipeline stages">
            {pipelineStages.map((stage) => (
              <button
                key={stage.id}
                className={stage.id === activeStage.id ? "active" : ""}
                type="button"
                onClick={() => setActiveStage(stage)}
              >
                {stage.label}
              </button>
            ))}
          </div>

          <div className="pipeline-detail">
            <p className="eyebrow">{activeStage.label} / pipeline proof</p>
            <h3>{activeStage.title}</h3>
            <p>{activeStage.summary}</p>
            <ul>
              {activeStage.proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {activeProject && <Link to={`/projects/${activeProject.slug}`}>Open {activeProject.shortTitle}</Link>}
          </div>
        </div>
      </div>
    </section>
  );
}
