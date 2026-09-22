"use client";

import { useEffect, useRef, useState, useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { Container } from "@/components/layout/container";

const links = [{ href: "#process", label: "Process" }, { href: "#work", label: "Our Work" }, { href: "#contact", label: "Reach out" }];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const id = useId();
  const reduced = useReducedMotion();
  function menuLinks(scope: string) {
    return links.map(link => <a href={link.href} key={link.href} aria-current={active === link.href ? "location" : undefined} onClick={() => { setActive(link.href); setOpen(false); }}>
      {active === link.href && <motion.span className="nav-active-pill" layoutId={`${id}-${scope}`} transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 35 }} />}
      <span className="nav-label">{link.label}</span>
    </a>);
  }
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const element = header.current;
    const contact = document.getElementById("contact");
    if (!element || !contact) return;
    let frame = 0;
    let wasCovered = false;
    const update = () => {
      frame = 0;
      const height = element.offsetHeight;
      const current = [...links].reverse().find(link => {
        const section = document.querySelector(link.href);
        return section && section.getBoundingClientRect().top <= height + 32;
      });
      setActive(current?.href ?? "");
      const offset = Math.max(-height, Math.min(0, contact.getBoundingClientRect().top - height));
      element.style.setProperty("--header-offset", `${offset}px`);
      const covered = offset < 0;
      element.inert = covered;
      if (covered && !wasCovered) setOpen(false);
      wasCovered = covered;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    observer.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      element.style.removeProperty("--header-offset");
      element.inert = false;
    };
  }, []);

  return (
    <header ref={header} className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape" && open) { setOpen(false); trigger.current?.focus(); }
    }}>
      <Container className="header-inner">
        <a className="wordmark" href="#top" aria-label="Barry Dev Studio home">Barry Dev Studio<span aria-hidden="true">.</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {menuLinks("desktop")}
        </nav>
        <button ref={trigger} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>
          {open ? <XIcon size={25} aria-hidden="true" /> : <ListIcon size={25} aria-hidden="true" />}
        </button>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
          {menuLinks("mobile")}
        </nav>
      </Container>
    </header>
  );
}
