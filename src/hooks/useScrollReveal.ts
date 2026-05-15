import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(key: string) {
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(".reveal");

      if (reducedMotion) {
        gsap.set(elements, { autoAlpha: 1, y: 0, rotateX: 0 });
        return;
      }

      elements.forEach((element) => {
        gsap.from(
          element,
          {
            autoAlpha: 0,
            y: 58,
            rotateX: 5,
            duration: 1.05,
            ease: "expo.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true
            }
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".line-reveal").forEach((line) => {
        gsap.from(
          line,
          {
            scaleX: 0.2,
            duration: 0.9,
            ease: "expo.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: line,
              start: "top 88%",
              once: true
            }
          }
        );
      });

      // Work Row Reveal
      gsap.utils.toArray<HTMLElement>(".work-row").forEach((row) => {
        gsap.from(
          row,
          {
            autoAlpha: 0,
            y: 30,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              once: true
            }
          }
        );
      });
    });

    return () => context.revert();
  }, [key, reducedMotion]);
}
