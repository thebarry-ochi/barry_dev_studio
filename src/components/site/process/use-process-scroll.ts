"use client";

import { useEffect, useRef } from "react";
import { kifaruLayerNames, kifaruStages } from "@/components/graphics/kifaru/kifaru-system";
import { processStages } from "@/lib/content";
import { processPosition, processStageScroll, processScrollDistance } from "./process-timeline";

export function useProcessScroll(select: (index: number) => void) {
  const root = useRef<HTMLElement>(null);
  const jump = useRef<((index: number) => void) | null>(null);
  useEffect(() => {
    const section = root.current;
    const pin = section?.querySelector<HTMLElement>(".process-pin");
    const scene = section?.querySelector<HTMLElement>(".kifaru-scene");
    const svg = scene?.querySelector<SVGElement>(".kifaru-artwork");
    if (!section || !pin || !scene || !svg || !("ResizeObserver" in window)) return;
    const layers = kifaruLayerNames.map((name) => [name, scene.querySelector<SVGGElement>(`[data-kifaru-layer="${name}"]`)] as const);
    const elevation = scene.querySelector<SVGGElement>('[data-part="elevation"]');
    const media = matchMedia("(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)");
    const work = section.closest(".journey-transfer")?.nextElementSibling;
    let overlap = 0;
    let start = 0;
    let distance = 1;
    let frame = 0;
    let lastActive = -1;
    let disposed = false;
    const clear = () => {
      delete section.dataset.scrollProcess;
      layers.forEach(([, layer]) => layer?.style.removeProperty("opacity"));
      elevation?.style.removeProperty("opacity");
      svg.style.removeProperty("transform");
      pin.inert = false;
      jump.current = null;
      lastActive = -1;
    };
    const update = () => {
      frame = 0;
      if (!media.matches) return;
      // Covered controls must not receive keyboard focus behind the Work surface.
      pin.inert = overlap > 0 && scrollY > start + distance + 1;
      const pose = processPosition((scrollY - start) / distance);
      const from = kifaruStages[processStages[pose.from].graphicStage];
      const to = kifaruStages[processStages[pose.to].graphicStage];
      layers.forEach(([name, layer]) => {
        if (layer) layer.style.opacity = String(from.layers[name] + (to.layers[name] - from.layers[name]) * pose.mix);
      });
      if (elevation) elevation.style.opacity = String(from.layers.finished + (to.layers.finished - from.layers.finished) * pose.mix);
      svg.style.transform = `rotate(${from.rotation + (to.rotation - from.rotation) * pose.mix}deg)`;
      if (pose.active !== lastActive) {
        lastActive = pose.active;
        select(pose.active);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => {
      if (!media.matches) { clear(); return; }
      section.dataset.scrollProcess = "active";
      start = section.getBoundingClientRect().top + scrollY;
      overlap = work?.matches("#work") ? Math.max(0, -parseFloat(getComputedStyle(work).marginTop) || 0) : 0;
      distance = processScrollDistance(section.offsetHeight, pin.offsetHeight, overlap);
      jump.current = (index) => {
        // Immediate navigation preserves keyboard responsiveness and avoids racing a smooth scroll.
        window.scrollTo({ top: processStageScroll(index, start, distance), behavior: "instant" });
        update();
      };
      schedule();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(section);
    resize.observe(pin);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pageshow", measure);
    media.addEventListener("change", measure);
    document.fonts.ready.then(() => { if (!disposed) measure(); });
    measure();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pageshow", measure);
      media.removeEventListener("change", measure);
      clear();
    };
  }, [select]);
  const selectStage = (index: number) => {
    if (jump.current) jump.current(index);
    else select(index);
  };
  return { root, selectStage };
}
