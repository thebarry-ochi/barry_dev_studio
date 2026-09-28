"use client";

import { useLayoutEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { KifaruGraphic } from "@/components/graphics/kifaru/kifaru-graphic";
import { transferFrame, type TransferAnchor } from "./transfer-geometry";

const subscribe = () => () => {};
const getBody = () => document.body;
const getServerBody = () => null;

/** A body-level flight layer carries the finished sketch above both section backgrounds. */
export function JourneyTransfer({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const flight = useRef<HTMLDivElement>(null);
  const portalRoot = useSyncExternalStore(subscribe, getBody, getServerBody);

  useLayoutEffect(() => {
    const host = root.current;
    const overlay = flight.current;
    const hero = host?.querySelector<HTMLElement>(".hero");
    const grid = hero?.querySelector<HTMLElement>(".hero-grid");
    const slot = hero?.querySelector<HTMLElement>(".hero-art");
    const process = host?.querySelector<HTMLElement>("#process");
    const pin = process?.querySelector<HTMLElement>(".process-pin");
    const target = process?.querySelector<HTMLElement>(".process-art .kifaru-scene");
    const artwork = overlay?.querySelector<SVGElement>(".kifaru-artwork");
    if (!host || !overlay || !hero || !grid || !slot || !process || !pin || !target || !artwork) return;

    const media = matchMedia("(prefers-reduced-motion: no-preference)");
    let anchors: { source: TransferAnchor; target: TransferAnchor; start: number; end: number } | undefined;
    let frame = 0;
    let disposed = false;

    const reset = () => {
      delete host.dataset.transfer;
      overlay.dataset.visible = "false";
    };

    const update = () => {
      frame = 0;
      if (!media.matches || !anchors || hero.dataset.heroAnimation !== "active") {
        reset();
        return;
      }
      const value = transferFrame(anchors.source, anchors.target, scrollY, anchors.start, anchors.end);
      const phase = value.progress <= 0 ? "ready" : value.progress >= 1 ? "landed" : "moving";
      host.dataset.transfer = phase;
      overlay.dataset.visible = phase === "moving" ? "true" : "false";
      overlay.style.transform = `translate3d(${value.left}px, ${value.top}px, 0) scale(${value.scale})`;
      artwork.style.transform = `rotate(${value.rotation}deg)`;
      const tone = Math.round(value.progress * 255);
      overlay.style.setProperty("--sketch-paper", `rgb(${tone} ${tone} ${tone})`);
      overlay.style.setProperty("--sketch-ink", `rgb(${255 - tone} ${255 - tone} ${255 - tone})`);
      overlay.style.setProperty("--dark-image", String(1 - value.progress));
      overlay.style.setProperty("--annotation-opacity", String(1 - value.progress));
    };

    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => {
      if (!media.matches) { reset(); return; }
      const gridBox = grid.getBoundingClientRect();
      const targetBox = target.getBoundingClientRect();
      const heroTop = hero.getBoundingClientRect().top + scrollY;
      const processTop = process.getBoundingClientRect().top + scrollY;
      // The Hero has finished drawing AND holding its CTAs when its sticky canvas releases.
      // Use intrinsic dimensions so the initial reveal's scale cannot distort these anchors.
      anchors = {
        start: heroTop + hero.offsetHeight - grid.offsetHeight,
        end: processTop,
        source: {
          left: gridBox.left + (grid.clientWidth - slot.offsetWidth) / 2,
          top: (grid.clientHeight - slot.offsetHeight) / 2,
          width: slot.offsetWidth,
          height: slot.offsetHeight,
        },
        target: {
          left: targetBox.left,
          top: targetBox.top - pin.getBoundingClientRect().top,
          width: target.offsetWidth,
          height: target.offsetHeight,
        },
      };
      overlay.style.width = `${anchors.source.width}px`;
      update();
    };

    const observer = new ResizeObserver(measure);
    [hero, grid, slot, pin, target].forEach(element => observer.observe(element));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pageshow", measure);
    media.addEventListener("change", measure);
    document.fonts.ready.then(() => { if (!disposed) measure(); });
    measure();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pageshow", measure);
      media.removeEventListener("change", measure);
      reset();
    };
  }, [portalRoot]);

  return <>
    <div className="journey-transfer" ref={root}>{children}</div>
    {portalRoot && createPortal(
      <div className="journey-flight" ref={flight} aria-hidden="true">
        <KifaruGraphic stage="sketch" pose="hero" theme="dark" />
      </div>, portalRoot,
    )}
  </>;
}
