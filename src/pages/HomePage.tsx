import { useState } from "react";
import { Mascot } from "../components/Mascot";
import { WorkSection } from "../components/WorkSection";

export function HomePage() {
  const [copied, setCopied] = useState(false);
  const handleCopyEmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText("Ahmedy999.ay@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main id="hey">
      <section className="hero" aria-labelledby="hero-title">
        <Mascot />
        <div className="hero-copy">
          <h1 id="hero-title" className="reveal">
            Messy data, made useful.
          </h1>
        </div>
        <span className="year-mark">(c)2026</span>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <div className="about-lede reveal">
          <h2 id="about-title">
            <span>Ahmed</span><sup>*</sup> builds the boring parts that make dashboards less suspicious.
          </h2>
        </div>

        <p className="about-note reveal">
          <span>*</span> Ahmed /ah-med/: Business Informatics student. Usually found turning messy exports into
          something a dashboard can trust.
        </p>

        <div className="about-copy reveal">
          <p>
            I am aiming at Data Engineering first, Analytics Engineering close behind, and Cloud Security as the
            sharp edge. Basically: take the messy thing, make it dependable, then make it explain itself.
          </p>
          <p>
            I like the awkward middle where business questions meet technical reality: raw files, broken joins, weird
            metrics, quiet failures, and the small panic behind "can we trust this?" These projects are my way of
            learning that work in public.
          </p>
        </div>
      </section>

      <WorkSection />

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">
          Want to<br />reach out?
        </h2>
        <div className="contact-bottom">
          <div className="contact-links-row" aria-label="Social links">
            <a href="https://www.linkedin.com/in/ahmed-yasser-shalaby/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/AhmedYasserShalaby" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <a className="email-link" href="mailto:Ahmedy999.ay@gmail.com" onClick={handleCopyEmail}>
            <span className="email-icon">
              <svg width="0.75em" height="0.75em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            </span>
            {copied ? "Copied!" : "Ahmedy999.ay@gmail.com"}
          </a>
        </div>
      </section>
    </main>
  );
}
