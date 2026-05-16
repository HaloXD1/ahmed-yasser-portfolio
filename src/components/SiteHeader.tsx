import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useActiveSection } from "../hooks/useActiveSection";

const navItems = [
  { label: "01/Hey", to: { pathname: "/", hash: "#hey" }, section: "hey" },
  { label: "02/About", to: { pathname: "/", hash: "#about" }, section: "about" },
  { label: "03/Work", to: { pathname: "/", hash: "#work" }, section: "work" },
  { label: "04/Contact", to: { pathname: "/", hash: "#contact" }, section: "contact" }
];

const SECTION_IDS = navItems.map((item) => item.section);

export function SiteHeader() {
  const location = useLocation();
  const activeSection = useActiveSection();
  const onHome = location.pathname === "/";
  const hashLockRef = useRef<string | null>(null);
  const lastSetHashRef = useRef<string | null>(null);

  useEffect(() => {
    if (!onHome) {
      hashLockRef.current = null;
      lastSetHashRef.current = null;
      return;
    }

    const hashSection = location.hash.replace("#", "");
    if (!hashSection || !SECTION_IDS.includes(hashSection)) {
      return;
    }

    if (lastSetHashRef.current === location.hash) {
      lastSetHashRef.current = null;
      return;
    }

    hashLockRef.current = hashSection;
  }, [location.hash, onHome]);

  useEffect(() => {
    if (!onHome) {
      return;
    }

    if (hashLockRef.current) {
      if (activeSection === hashLockRef.current) {
        hashLockRef.current = null;
      } else {
        return;
      }
    }

    const nextHash = `#${activeSection}`;
    if (location.hash === nextHash) {
      return;
    }

    const nextUrl = `${window.location.pathname}${nextHash}`;
    lastSetHashRef.current = nextHash;
    window.history.replaceState(window.history.state, "", nextUrl);
  }, [activeSection, location.hash, location.pathname, onHome]);

  return (
    <header className="site-header" aria-label="Primary navigation">
      <nav>
        {navItems.map((item) => (
          <Link key={item.label} to={item.to} className={onHome && activeSection === item.section ? "active" : ""}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
