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
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [transition, setTransition] = useState<TransitionState | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const transitionRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const desktopHover = useMediaQuery("(hover: hover) and (min-width: 900px)");

  // Debounce the project change
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (hoveredProject === activeProject) return;
    timeoutRef.current = setTimeout(() => {
      setActiveProject(hoveredProject);
    }, 250);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [hoveredProject, activeProject]);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview || !desktopHover || reducedMotion) {
      return;
    }

    const xTo = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3.out" });

    function onMove(event: PointerEvent) {
      xTo(event.clientX + 34);
      yTo(event.clientY - 210);
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
      scale: activeProject ? 1 : 0.96,
      duration: 0.6,
      ease: "power2.inOut"
    });
  }, [activeProject, reducedMotion]);

  useEffect(() => {
    const element = transitionRef.current;
    const list = listRef.current;
    const header = document.querySelector(".site-header");
    
    if (!element || !transition || !list) {
      return;
    }

    const startBounds = transition.bounds;
    const finalWidth = window.innerWidth;
    const finalHeight = window.innerHeight;
    
    const scaleX = finalWidth / startBounds.width;
    const scaleY = finalHeight / startBounds.height;
    const translateX = (finalWidth / 2) - (startBounds.left + startBounds.width / 2);
    const translateY = (finalHeight / 2) - (startBounds.top + startBounds.height / 2);

    const tl = gsap.timeline({
      onComplete: () => {
        navigate(`/projects/${transition.project.slug}`);
      }
    });

    // Reset previous states
    gsap.set(element, {
      left: startBounds.left,
      top: startBounds.top,
      width: startBounds.width,
      height: startBounds.height,
      transformOrigin: "center center",
      autoAlpha: 1,
      x: 0,
      y: 0,
      scale: 1
    });

    // 1. "Move Camera" past the current UI (Scale list up and fade)
    tl.to([list, header, ".section-heading"], {
      scale: 1.4,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power2.in",
      transformOrigin: "center center"
    }, 0);

    // 2. "Zoom Camera" into the project image
    tl.to(element, {
      x: translateX,
      y: translateY,
      scaleX: scaleX,
      scaleY: scaleY,
      duration: 0.8,
      ease: "expo.inOut"
    }, 0.1);

    // 3. Subtle background depth effect
    tl.to(".data-field", {
      scale: 1.2,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power2.inOut"
    }, 0);

    return () => {
      tl.kill();
    };
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
    <section ref={sectionRef} className="work" id="work" aria-labelledby="work-title">
      <div className="section-heading reveal">
        <p>03/Work</p>
        <h2 id="work-title">Selected systems</h2>
      </div>

      <div ref={listRef} className="work-list" onMouseLeave={() => setHoveredProject(null)}>
        {projects.map((project) => (
          <article
            key={project.slug}
            className={`work-row accent-${project.accent} ${project.secondary ? "secondary" : ""}`}
            role="link"
            tabIndex={0}
            onClick={(event: MouseEvent<HTMLElement>) => openProject(project, event.target)}
            onFocus={() => setHoveredProject(project)}
            onMouseEnter={() => setHoveredProject(project)}
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
          <img src={activeProject.previewImage} alt="" />
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
