"use client";

import { useEffect, useRef } from "react";

/** Keep the complete project grid readable before the contact surface covers it. */
export function useWorkOverlap() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    const contact = document.getElementById("contact");
    const footer = document.querySelector<HTMLElement>(".site-footer");
    if (!section || !contact) return;
    const media = window.matchMedia("(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;

    function update() {
      frame = 0;
      if (!section || !contact) return;
      if (!media.matches) {
        delete section.dataset.contactOverlap;
        section.style.removeProperty("--work-pin-top");
        contact.style.removeProperty("--contact-min-height");
        section.inert = false;
        return;
      }
      section.style.setProperty("--work-pin-top", `${Math.min(0, window.innerHeight - section.offsetHeight)}px`);
      section.dataset.contactOverlap = "active";
      contact.style.setProperty("--contact-min-height", `${Math.max(0, window.innerHeight - (footer?.offsetHeight ?? 0))}px`);
      // Native dialogs remain interactive in the top layer, including on resize.
      section.inert = !section.querySelector("dialog[open]") && contact.getBoundingClientRect().top < section.getBoundingClientRect().bottom - 1;
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    const observer = new ResizeObserver(schedule);
    observer.observe(section);
    observer.observe(contact);
    if (footer) observer.observe(footer);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    section.addEventListener("close", schedule, true);
    media.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      section.removeEventListener("close", schedule, true);
      media.removeEventListener("change", schedule);
      delete section.dataset.contactOverlap;
      section.style.removeProperty("--work-pin-top");
      contact.style.removeProperty("--contact-min-height");
      section.inert = false;
    };
  }, []);

  return ref;
}
