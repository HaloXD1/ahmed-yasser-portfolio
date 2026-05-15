import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "01/Hey", to: "/#hey" },
  { label: "02/About", to: "/#about" },
  { label: "03/Work", to: "/#work" },
  { label: "04/Contact", to: "/#contact" }
];

export function SiteHeader() {
  const location = useLocation();
  const onHome = location.pathname === "/";

  return (
    <header className="site-header" aria-label="Primary navigation">
      <nav>
        {navItems.map((item) => (
          <Link key={item.label} to={item.to} className={onHome && location.hash === item.to.slice(1) ? "active" : ""}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
