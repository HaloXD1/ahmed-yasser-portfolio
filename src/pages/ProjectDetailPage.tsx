import { Link, Navigate, useParams } from "react-router-dom";
import { ProjectLinks } from "../components/ProjectLinks";
import { getProject } from "../data/projects";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <main className={`page-shell detail-page accent-${project.accent}`}>
      <section className="detail-hero">
        <div className="detail-copy reveal">
          <Link className="back-link" to="/#work">
            &lt;- Projects
          </Link>
          <p className="eyebrow">
            {project.number} / {project.category}
          </p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <ProjectLinks project={project} includeProofSheet />
        </div>
        <div className="detail-visual">
          <img src={project.previewImage} alt="" />
        </div>
      </section>

      <section className="case-grid" aria-label={`${project.title} case study`}>
        <article className="case-panel reveal">
          <span>Problem</span>
          <p>{project.problem}</p>
        </article>
        <article className="case-panel reveal">
          <span>Architecture</span>
          <p>{project.architecture}</p>
        </article>
        <article className="case-panel wide reveal">
          <span>What it proves</span>
          <p>{project.proof}</p>
        </article>
      </section>

      <section className="proof-section reveal">
        <div>
          <p className="eyebrow">Strongest proof</p>
          <h2>Fast evidence to mention in interviews.</h2>
        </div>
        <ol>
          {project.strongestProof.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="pitch-section reveal">
        <p className="eyebrow">Interview line</p>
        <blockquote>{project.interviewPitch}</blockquote>
      </section>
    </main>
  );
}
