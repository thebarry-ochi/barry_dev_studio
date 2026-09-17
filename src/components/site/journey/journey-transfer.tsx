"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { transferFrame, type Anchor } from "./transfer-geometry";

/** Progressive enhancement: both sections retain their ordinary static layout. */
export function JourneyTransfer({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = root.current;
    const slot = host?.querySelector<HTMLElement>(".hero-art");
    const hero = host?.querySelector<HTMLElement>(".hero");
    const copy = host?.querySelector<HTMLElement>(".hero-copy");
    const processSection = host?.querySelector<HTMLElement>("#process");
    const source = slot?.querySelector<HTMLElement>(".kifaru-scene");
    const artwork = source?.querySelector<SVGElement>(".kifaru-artwork");
    const target = host?.querySelector<HTMLElement>(".process-art .kifaru-scene");
    if (!host || !slot || !source || !artwork || !target || !("ResizeObserver" in window)) return;
    const media = matchMedia("(min-width: 1024px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)");
    let anchors: { source: Anchor; target: Anchor } | undefined;
    let copyY = 0;
    let cover: { heroTop: number; processTop: number; copyBottom: number } | undefined;
    let frame = 0;
    let disposed = false;
    const reset = () => {
      delete host.dataset.transfer;
      source.style.removeProperty("transform");
      artwork.style.removeProperty("transform");
    };
    const update = () => {
      frame = 0;
      if (copy && cover && media.matches) {
        copyY = Math.max(0, Math.min(scrollY - cover.heroTop, cover.processTop - cover.heroTop));
        copy.style.transform = `translate3d(0, ${copyY}px, 0)`;
        copy.inert = cover.copyBottom + copyY > cover.processTop;
      } else if (copy) {
        copy.style.removeProperty("transform");
        copy.inert = false;
        copyY = 0;
      }
      if (!media.matches || !anchors || target.dataset.kifaruStage !== "sketch") { reset(); return; }
      const value = transferFrame(anchors.source, anchors.target, window.scrollY, innerHeight);
      host.dataset.transfer = value.progress >= 1 ? "landed" : value.progress <= 0 ? "ready" : "moving";
      source.style.transform = `translate3d(${value.x}px, ${value.y}px, 0) scale(${value.scale})`;
      artwork.style.transform = `rotate(${value.rotation}deg)`;
      // Fast scrolling should carry a complete sketch, not a paused entrance.
      if (value.progress > 0) slot.dataset.drawing = "complete";
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => {
      if (hero && copy && processSection) {
        cover = {
          heroTop: hero.getBoundingClientRect().top + scrollY,
          processTop: processSection.getBoundingClientRect().top + scrollY,
          copyBottom: copy.getBoundingClientRect().bottom + scrollY - copyY,
        };
      }
      const from = slot.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const process = target.closest<HTMLElement>("#process");
      const pin = process?.querySelector<HTMLElement>(".process-pin");
      // Remove sticky travel: the handoff anchor is the pin’s original document position.
      const targetTop = process?.dataset.scrollProcess && pin
        ? process.getBoundingClientRect().top + scrollY + to.top - pin.getBoundingClientRect().top
        : to.top + scrollY;
      anchors = {
        source: { left: from.left, top: from.top + scrollY, width: from.width, height: from.height },
        target: { left: to.left, top: targetTop, width: to.width, height: to.height },
      };
      schedule();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(slot);
    resize.observe(target);
    resize.observe(host);
    const stages = new MutationObserver(schedule);
    stages.observe(target, { attributes: true, attributeFilter: ["data-kifaru-stage"] });
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
      stages.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pageshow", measure);
      media.removeEventListener("change", measure);
      reset();
      copy?.style.removeProperty("transform");
      if (copy) copy.inert = false;
    };
  }, []);
  return <div className="journey-transfer" ref={root}>{children}</div>;
}
