import { useEffect, useState } from "react";

const SECTION_IDS = ["hey", "about", "work", "contact"];
const DEFAULT_SECTION = "hey";

function getInitialSection() {
  if (typeof window === "undefined") {
    return DEFAULT_SECTION;
  }

  const hash = window.location.hash.replace("#", "");
  if (SECTION_IDS.includes(hash)) {
    return hash;
  }

  return DEFAULT_SECTION;
}

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState(getInitialSection);

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY + window.innerHeight / 3;

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(SECTION_IDS[i]);
          break;
        }
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return activeSection;
}
