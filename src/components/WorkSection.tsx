import { type KeyboardEvent, type MouseEvent, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { type Project, projects } from "../data/projects";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ProjectLinks } from "./ProjectLinks";

type TransitionState = {
  project: Project;
  bounds: DOMRect;
};

function targetIsLink(eventTarget: EventTarget | null) {
  return eventTarget instanceof Element && Boolean(eventTarget.closest("a"));
}

export function WorkSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [transition, setTransition] = useState<TransitionState | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const transitionRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const desktopHover = useMediaQuery("(hover: hover) and (min-width: 900px)");

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview || !desktopHover || reducedMotion) {
      return;
    }

    const xTo = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3.out" });

    function onMove(event: PointerEvent) {
      xTo(event.clientX + 34);
      yTo(event.clientY - 150);
    }

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [desktopHover, reducedMotion]);

  useEffect(() => {
    if (!previewRef.current || reducedMotion) {
      return;
    }

    gsap.to(previewRef.current, {
      autoAlpha: activeProject ? 1 : 0,
      scale: activeProject ? 1 : 0.92,
      duration: 0.34,
      ease: "power3.out"
    });
  }, [activeProject, reducedMotion]);

  useEffect(() => {
    const element = transitionRef.current;
    if (!element || !transition) {
      return;
    }

    const margin = Math.max(28, Math.min(window.innerWidth * 0.035, 54));
    const finalWidth = window.innerWidth - margin * 2;
    const finalHeight = Math.min(window.innerHeight * 0.58, 560);

    gsap.set(element, {
      left: transition.bounds.left,
      top: transition.bounds.top,
      width: transition.bounds.width,
      height: transition.bounds.height,
      autoAlpha: 1
    });

    gsap.to(element, {
      left: margin,
      top: 118,
      width: finalWidth,
      height: finalHeight,
      duration: 0.78,
      ease: "expo.inOut",
      onComplete: () => navigate(`/projects/${transition.project.slug}`)
    });
  }, [navigate, transition]);

  function openProject(project: Project, eventTarget: EventTarget | null) {
    if (targetIsLink(eventTarget)) {
      return;
    }

    if (!desktopHover || reducedMotion || !previewRef.current) {
      navigate(`/projects/${project.slug}`);
      return;
    }

    setActiveProject(project);
    setTransition({ project, bounds: previewRef.current.getBoundingClientRect() });
  }

  function onRowKeyDown(project: Project, event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(project, event.target);
    }
  }

  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="section-heading reveal">
        <p>03/Work</p>
        <h2 id="work-title">Selected systems</h2>
      </div>

      <div className="work-list" onMouseLeave={() => setActiveProject(null)}>
        {projects.map((project) => (
          <article
            key={project.slug}
            className={`work-row accent-${project.accent} ${project.secondary ? "secondary" : ""}`}
            role="link"
            tabIndex={0}
            onClick={(event: MouseEvent<HTMLElement>) => openProject(project, event.target)}
            onFocus={() => setActiveProject(project)}
            onMouseEnter={() => setActiveProject(project)}
            onKeyDown={(event) => onRowKeyDown(project, event)}
          >
            <div className="work-title">
              <span>{project.number}</span>
              <h3>{project.shortTitle}</h3>
            </div>
            <p>{project.stack.join("/")}</p>
            <p>{project.summary}</p>
            <ProjectLinks project={project} compact />
            <img className="work-mobile-preview" src={project.previewImage} alt="" loading="lazy" />
            <div className="line-reveal" />
          </article>
        ))}
      </div>

      <div ref={previewRef} className="work-preview" aria-hidden="true">
        {activeProject && (
          <>
            <img src={activeProject.previewImage} alt="" />
            <span>{activeProject.category}</span>
          </>
        )}
      </div>

      {transition && (
        <div ref={transitionRef} className="project-transition-card" aria-hidden="true">
          <img src={transition.project.previewImage} alt="" />
        </div>
      )}
    </section>
  );
}
