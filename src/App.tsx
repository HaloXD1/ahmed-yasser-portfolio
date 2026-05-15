import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { BackgroundEffects } from "./components/BackgroundEffects";
import { SiteHeader } from "./components/SiteHeader";
import { useScrollReveal } from "./hooks/useScrollReveal";
import { HomePage } from "./pages/HomePage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ProjectsPage } from "./pages/ProjectsPage";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

function ScrollManager() {
  const location = useLocation();

  useScrollReveal(`${location.pathname}${location.hash}`);

  useEffect(() => {
    if (location.hash) {
      const id = window.decodeURIComponent(location.hash.slice(1));
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
      }, 30);
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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
      <BackgroundEffects />
      <AppRoutes />
    </BrowserRouter>
  );
}
