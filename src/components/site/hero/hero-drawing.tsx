"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const INTRO_PAUSE_MS = 1000;
const INTRO_DURATION_MS = 2200;

/** Hold the opening message, then automatically reveal the finished Hero once. */
export function HeroDrawing({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const art = root.current;
    const hero = art?.closest<HTMLElement>(".hero");
    const grid = hero?.querySelector<HTMLElement>(".hero-grid");
    const heading = hero?.querySelector<HTMLElement>("h1");
    const copy = hero?.querySelector<HTMLElement>(".hero-copy");
    const actions = hero?.querySelector<HTMLElement>(".hero-actions");
    if (!art || !hero || !grid || !heading || !copy || !actions) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const parts = Array.from(art.querySelectorAll<SVGGElement>("[data-part]"));
    const stages: Record<string, [number, number]> = {
      page: [0.06, 0.28], navigation: [0.17, 0.38], "hero-copy": [0.28, 0.48],
      cta: [0.39, 0.55], "hero-image": [0.45, 0.72], cards: [0.63, 0.83],
      notes: [0.72, 0.94], arrows: [0.75, 0.98], measurements: [0.75, 0.98],
    };
    let frame = 0;
    let disposed = false;
    let progress = 0;
    let headingTarget = 0;
    let copyTarget = 0;
    let layoutProgress = 0;

    hero.dataset.heroAnimation = "active";
    actions.inert = true;

    const render = () => {
      const layout = clamp(progress / 0.26);
      layoutProgress = 1 - Math.pow(1 - layout, 3);
      const drawProgress = clamp((progress - 0.26) / 0.6);
      const artOpacity = clamp((progress - 0.2) / 0.27);
      const ctaOpacity = clamp((progress - 0.85) / 0.13);

      hero.style.setProperty("--hero-heading-y", `${headingTarget * layoutProgress}px`);
      hero.style.setProperty("--hero-copy-y", `${copyTarget * layoutProgress}px`);
      art.style.setProperty("--hero-art-opacity", `${artOpacity}`);
      art.style.setProperty("--hero-art-scale", `${0.96 + artOpacity * 0.04}`);
      actions.style.setProperty("--hero-cta-opacity", `${ctaOpacity}`);
      hero.dataset.ctaVisible = ctaOpacity > 0.05 ? "true" : "false";
      actions.inert = ctaOpacity <= 0.05;
      for (const part of parts) {
        const [start, end] = stages[part.dataset.part ?? ""] ?? [0.12, 0.9];
        part.style.setProperty("--intro-draw", `${clamp((drawProgress - start) / (end - start))}`);
      }
    };

    const measure = () => {
      // Remove the current translation from measured bounds, including after resize.
      const gridTop = grid.getBoundingClientRect().top;
      const artTop = (grid.clientHeight - art.offsetHeight) / 2;
      const headingBottom = heading.getBoundingClientRect().bottom - gridTop - headingTarget * layoutProgress;
      const copyTop = copy.getBoundingClientRect().top - gridTop - copyTarget * layoutProgress;
      headingTarget = Math.min(-20, artTop + art.offsetHeight * (49 / 540) - 24 - headingBottom);
      copyTarget = Math.max(0, artTop + art.offsetHeight * (500 / 540) + 24 - copyTop);
      render();
    };
    const finish = () => {
      cancelAnimationFrame(frame);
      progress = 1;
      render();
    };
    const onScroll = () => {
      // Fast scrolling or restored deep links must hand off a complete drawing.
      // Scrolling never starts or reverses the entrance timeline.
      const release = hero.offsetHeight - grid.offsetHeight;
      if (progress < 1 && -hero.getBoundingClientRect().top >= release) finish();
    };
    const start = performance.now() + INTRO_PAUSE_MS;
    const tick = (now: number) => {
      progress = clamp((now - start) / INTRO_DURATION_MS);
      render();
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    measure();
    frame = requestAnimationFrame(tick);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pageshow", onScroll);
    reducedMotion.addEventListener("change", finish);
    document.fonts.ready.then(() => { if (!disposed) measure(); });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pageshow", onScroll);
      reducedMotion.removeEventListener("change", finish);
      delete hero.dataset.heroAnimation;
      delete hero.dataset.ctaVisible;
      hero.style.removeProperty("--hero-heading-y");
      hero.style.removeProperty("--hero-copy-y");
      art.style.removeProperty("--hero-art-opacity");
      art.style.removeProperty("--hero-art-scale");
      actions.style.removeProperty("--hero-cta-opacity");
      parts.forEach(part => part.style.removeProperty("--intro-draw"));
      actions.inert = false;
    };
  }, []);

  return <div ref={root} className="hero-art hero-drawing" data-drawing="complete">{children}</div>;
}
