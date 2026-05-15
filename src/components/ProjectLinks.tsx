import type { Project } from "../data/projects";
import { publicUrl } from "../utils/urls";

type ProjectLinksProps = {
  project: Project;
  includeProofSheet?: boolean;
  compact?: boolean;
};

export function ProjectLinks({ project, includeProofSheet = false, compact = false }: ProjectLinksProps) {
  const baseLinks = compact ? project.links.slice(0, 2) : project.links;
  const links = includeProofSheet
    ? [
        ...baseLinks,
        {
          label: "Proof sheet",
          href: publicUrl("docs/Ahmed_Yasser_Portfolio_Proof_Sheet.pdf")
        }
      ]
    : baseLinks;

  return (
    <div className="button-row">
      {links.map((link) => (
        <a
          key={`${project.slug}-${link.label}`}
          className={link.primary ? "text-button primary" : "text-button"}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel={link.href.startsWith("http") ? "noreferrer" : undefined}
        >
          {link.label}
          <span aria-hidden="true">-&gt;</span>
        </a>
      ))}
    </div>
  );
}
