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
          <ProjectLinks project={project} />
        </div>
        <div className="detail-visual">
          <img src={project.previewImage} alt="" />
        </div>
      </section>

      <section className="case-grid" aria-label={`${project.title} overview`}>
        <article className="case-panel reveal">
          <span>Intent</span>
          <p>{project.intent}</p>
        </article>
        <article className="case-panel reveal">
          <span>How it works</span>
          <p>{project.howItWorks}</p>
        </article>
        <article className="case-panel wide reveal">
          <span>Why it matters</span>
          <p>{project.whyItMatters}</p>
        </article>
      </section>

      <section className="proof-section reveal">
        <div>
          <p className="eyebrow">What to notice</p>
          <h2>The main ideas behind the project.</h2>
        </div>
        <ol>
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
