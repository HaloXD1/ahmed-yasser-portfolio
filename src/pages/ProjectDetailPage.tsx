import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ProjectLinks } from "../components/ProjectLinks";
import { getProject } from "../data/projects";

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [slug]);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const carouselImages = project.gallery ?? [];
  const selectedImage = carouselImages[activeImage];
  const hasCarousel = carouselImages.length > 1;
  const visualTone = selectedImage?.tone ?? "light";
  const visualFit = selectedImage?.fit ?? "cover";

  const showPreviousImage = () => {
    setActiveImage((current) => (current === 0 ? carouselImages.length - 1 : current - 1));
  };

  const showNextImage = () => {
    setActiveImage((current) => (current + 1) % carouselImages.length);
  };

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
        <div className={`detail-visual tone-${visualTone} fit-${visualFit}`}>
          <img src={selectedImage?.src ?? project.previewImage} alt={selectedImage?.alt ?? ""} />
          {hasCarousel ? (
            <div className="detail-carousel-controls" aria-label={`${project.title} image controls`}>
              <button type="button" aria-label="Previous image" onClick={showPreviousImage}>
                &lt;
              </button>
              <span>
                {activeImage + 1} / {carouselImages.length}
              </span>
              <button type="button" aria-label="Next image" onClick={showNextImage}>
                &gt;
              </button>
            </div>
          ) : null}
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

      {project.gallery?.length ? (
        <section className="project-gallery reveal" aria-label={`${project.title} visuals`}>
          <div className="project-gallery-heading">
            <p className="eyebrow">Project visuals</p>
          </div>
          <div className="project-gallery-grid">
            {project.gallery.map((image, index) => (
              <figure
                className={[
                  index === 0 ? "featured" : "",
                  image.fit === "contain" ? "fit-contain" : "",
                  `tone-${image.tone ?? "light"}`
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={image.src}
              >
                <img src={image.src} alt={image.alt} />
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
