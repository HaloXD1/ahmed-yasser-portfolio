import { useEffect, useState } from "react";

const SECTION_IDS = ["hey", "about", "work", "contact"];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("hey");

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
