"use client";

import { useEffect, useRef, type RefObject } from "react";

const REVEAL_SELECTOR = "[data-section-reveal]";
const EASING = "cubic-bezier(0.23, 1, 0.32, 1)";

/**
 * Once-only entrances for content that starts hidden before the first paint.
 */
export function useSectionReveal(section: RefObject<HTMLElement | null>) {
  const revealed = useRef(new WeakSet<Element>());

  useEffect(() => {
    const root = section.current;
    if (!root) return;

    const elements = Array.from(root.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    if (!("IntersectionObserver" in window)) {
      elements.forEach(element => { element.dataset.revealState = "visible"; });
      return;
    }

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;

    const setup = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();

      observer = new IntersectionObserver(entries => {
        entries
          .filter(entry => entry.isIntersecting && !revealed.current.has(entry.target))
          .forEach(({ target }) => {
            const element = target as HTMLElement;
            revealed.current.add(element);
            observer?.unobserve(element);

            const delay = Number.parseInt(element.dataset.revealDelay ?? "0", 10);
            const offset = Number.parseInt(element.dataset.revealOffset ?? "16", 10);
            element.dataset.revealState = "visible";
            const parsedOpacity = Number.parseFloat(getComputedStyle(element).opacity);
            const opacity = Number.isFinite(parsedOpacity) ? parsedOpacity : 1;
            const frames = preference.matches
              ? [{ opacity: 0 }, { opacity }]
              : [
                  { opacity: 0, transform: `translate3d(0, ${offset}px, 0)`, filter: "blur(3px)" },
                  { opacity, transform: "translate3d(0, 0, 0)", filter: "blur(0)" },
                ];
            const animation = element.animate(frames, {
              duration: preference.matches ? 180 : 600,
              delay: preference.matches ? 0 : delay,
              easing: EASING,
              fill: "backwards",
            });

            animations.add(animation);
            animation.onfinish = () => {
              animations.delete(animation);
              animation.cancel();
            };
          });
      }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });

      elements.forEach(element => {
        if (!revealed.current.has(element)) observer?.observe(element);
      });
    };

    setup();
    preference.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      preference.removeEventListener("change", setup);
    };
  }, [section]);
}
