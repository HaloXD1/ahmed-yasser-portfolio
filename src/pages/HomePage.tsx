import { Mascot } from "../components/Mascot";
import { WorkSection } from "../components/WorkSection";
import { publicUrl } from "../utils/urls";

export function HomePage() {
  return (
    <main id="hey">
      <section className="hero" aria-labelledby="hero-title">
        <Mascot />
        <div className="hero-copy">
          <p className="reveal">Ahmed Yasser Shalaby / Business Informatics / Summer 2026 internships</p>
          <h1 id="hero-title" className="reveal">
            Data systems that hold up.
          </h1>
        </div>
        <span className="year-mark">(c)2026</span>
      </section>

      <section className="about" id="about" aria-labelledby="about-title">
        <div className="about-lede reveal">
          <h2 id="about-title">
            Ahmed builds reliable data and operations systems for teams that need proof, not just dashboards.
          </h2>
        </div>

        <p className="about-note reveal">
          Data Engineering first. Analytics Engineering close behind. Cloud Security as the technical edge.
        </p>

        <div className="about-copy reveal">
          <p>
            I am a Business Informatics student focused on projects that behave like real work: contracts before
            loading, models before dashboards, failure diagnosis after bad data, and clear evidence recruiters can
            inspect fast.
          </p>
          <p>
            The portfolio is built around a simple idea: small systems can still show professional habits. Each project
            has a public repo, deployed proof where useful, and an interview story that connects business impact to
            technical execution.
          </p>
        </div>
      </section>

      <WorkSection />

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="contact-copy reveal">
          <h2 id="contact-title">Want proof?</h2>
          <a className="email-link" href="mailto:Ahmedy999.ay@gmail.com">
            Ahmedy999.ay@gmail.com
          </a>
        </div>
        <div className="contact-links reveal" aria-label="Portfolio links">
          <a href={publicUrl("docs/Ahmed_Yasser_Portfolio_Proof_Sheet.pdf")}>Proof Sheet</a>
          <a href={publicUrl("projects.html")}>Project Guide</a>
          <a href="https://github.com/HaloXD1">GitHub</a>
          <a href="https://www.linkedin.com/in/ahmed-yasser-shalaby/">LinkedIn</a>
        </div>
      </section>
    </main>
  );
}
