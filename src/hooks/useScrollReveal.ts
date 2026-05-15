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
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 58, rotateX: 5 },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
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
        gsap.fromTo(
          line,
          { scaleX: 0.2 },
          {
            scaleX: 1,
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
    });

    return () => context.revert();
  }, [key, reducedMotion]);
}
