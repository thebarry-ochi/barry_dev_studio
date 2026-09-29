"use client";

import { useEffect, useRef, type RefObject } from "react";

/** Progressive enhancement: all copy stays visible if JS or motion is unavailable. */
export function useAboutReveal(section: RefObject<HTMLElement | null>) {
  const revealed = useRef(new WeakSet<Element>());
  useEffect(() => {
    const root = section.current;
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    const reset = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      if (preference.matches) return;
      const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-about-reveal]"));
      observer = new IntersectionObserver(entries => {
        const entering = entries.filter(entry => entry.isIntersecting && !revealed.current.has(entry.target))
          .sort((a, b) => elements.indexOf(a.target as HTMLElement) - elements.indexOf(b.target as HTMLElement));
        entering.forEach(({ target }, index) => {
          revealed.current.add(target);
          observer?.unobserve(target);
          const kind = (target as HTMLElement).dataset.aboutReveal;
          const frames = kind === "emphasis"
            ? [{ opacity: 0 }, { opacity: 1 }]
            : [{ opacity: 0, transform: `translateY(${kind === "eyebrow" ? 10 : 16}px)` }, { opacity: 1, transform: "translateY(0)" }];
          const animation = target.animate(frames, { duration: 520, delay: index * 70, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" });
          animations.add(animation);
          animation.onfinish = () => { animations.delete(animation); animation.cancel(); };
        });
      }, { threshold: 0.08 });
      elements.forEach(element => { if (!revealed.current.has(element)) observer?.observe(element); });
    };
    reset();
    preference.addEventListener("change", reset);
    return () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      preference.removeEventListener("change", reset);
    };
  }, [section]);
}
