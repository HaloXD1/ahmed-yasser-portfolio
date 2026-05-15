import { Link, useLocation } from "react-router-dom";
import { useActiveSection } from "../hooks/useActiveSection";

const navItems = [
  { label: "01/Hey", to: "/#hey", section: "hey" },
  { label: "02/About", to: "/#about", section: "about" },
  { label: "03/Work", to: "/#work", section: "work" },
  { label: "04/Contact", to: "/#contact", section: "contact" }
];

export function SiteHeader() {
  const location = useLocation();
  const activeSection = useActiveSection();
  const onHome = location.pathname === "/";

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
