"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Only the entrance lifecycle is client-side; the shared SVG remains server-rendered. */
export function HeroDrawing({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    const finish = () => {
      element.dataset.drawing = "complete";
      observer?.disconnect();
    };
    const onPreference = () => { if (preference.matches) finish(); };
    if (preference.matches || !("IntersectionObserver" in window)) finish();
    else {
      observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.dataset.drawing = "running";
          observer?.disconnect();
        }
      }, { threshold: 0.2 });
      observer.observe(element);
    }
    preference.addEventListener("change", onPreference);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", onPreference);
    };
  }, []);

  return (
    <div ref={root} className="hero-art hero-drawing" data-drawing="pending">
      {children}
      <noscript><style>{`.hero-drawing [data-draw], .hero-drawing text { animation: none !important; }`}</style></noscript>
    </div>
  );
}
