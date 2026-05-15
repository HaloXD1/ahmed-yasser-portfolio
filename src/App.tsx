import { useEffect, useLayoutEffect, useState, useRef } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { SiteHeader } from "./components/SiteHeader";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { HomePage } from "./pages/HomePage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ProjectsPage } from "./pages/ProjectsPage";

function CustomCursor() {
  const [isOverRing, setIsOverRing] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -200, y: -200 });
  const currentPos = useRef({ x: -200, y: -200 });
  const isOverRingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.15);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.15);

      if (dotRef.current) {
        dotRef.current.style.left = `${currentPos.current.x}px`;
        dotRef.current.style.top = `${currentPos.current.y}px`;
      }
      if (ringRef.current && isOverRingRef.current) {
        ringRef.current.style.left = `${currentPos.current.x}px`;
        ringRef.current.style.top = `${currentPos.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const handleRingHover = (e: CustomEvent) => {
      isOverRingRef.current = e.detail;
      setIsOverRing(e.detail);

      if (e.detail && ringRef.current) {
        // Snap ring to current cursor position immediately on first hover
        ringRef.current.style.left = `${targetPos.current.x}px`;
        ringRef.current.style.top = `${targetPos.current.y}px`;
        currentPos.current.x = targetPos.current.x;
        currentPos.current.y = targetPos.current.y;
      }
    };

    window.addEventListener("ringHover", handleRingHover as EventListener);
    return () => window.removeEventListener("ringHover", handleRingHover as EventListener);
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot${isOverRing ? " hidden" : ""}`}
        style={{
          position: "fixed",
          left: -200,
          top: -200,
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)"
        }}
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring${isOverRing ? " visible" : ""}`}
        style={{
          position: "fixed",
          left: -200,
          top: -200,
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)"
        }}
      >
        ROTATE ME
      </div>
    </>
  );
}

gsap.registerPlugin(ScrollTrigger);

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

function ScrollManager() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useScrollReveal(`${location.pathname}${location.hash}`);

  // Lenis Smooth Scroll Initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useLayoutEffect(() => {
    if (location.hash) {
      const id = window.decodeURIComponent(location.hash.slice(1));
      window.setTimeout(() => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(document.getElementById(id) || 0, { immediate: true });
        } else {
          document.getElementById(id)?.scrollIntoView({ block: "start" });
        }
      }, 30);
      return;
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [location.pathname, location.hash]);

  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollManager />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/projects.html" element={<Navigate to="/projects" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <CustomCursor />
      <BackgroundEffects />
      <AppRoutes />
    </BrowserRouter>
  );
}
