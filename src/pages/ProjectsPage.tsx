import { Link } from "react-router-dom";
import { ProjectLinks } from "../components/ProjectLinks";
import { projects } from "../data/projects";

export function ProjectsPage() {
  return (
    <main className="page-shell projects-page">
      <section className="page-hero">
        <p className="eyebrow reveal">Project guide</p>
        <h1 className="reveal">What each system proves.</h1>
        <p className="page-intro reveal">
          A recruiter-readable guide to the portfolio: problem, proof, technical signal, and the fastest links to open
          before an interview.
        </p>
      </section>

      <section className="project-index" aria-label="Project index">
        {projects.map((project) => (
          <article key={project.slug} className={`project-index-row accent-${project.accent} reveal`}>
            <Link className="project-index-image" to={`/projects/${project.slug}`} aria-label={`Open ${project.title}`}>
              <img src={project.previewImage} alt="" loading="lazy" />
            </Link>
            <div>
              <p className="eyebrow">
                {project.number} / {project.category}
              </p>
              <h2>
                <Link to={`/projects/${project.slug}`}>{project.title}</Link>
              </h2>
              <p>{project.summary}</p>
              <div className="tag-row">
                {project.stack.map((item) => (
                  <span key={`${project.slug}-${item}`}>{item}</span>
                ))}
              </div>
              <ProjectLinks project={project} />
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
