"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { Container } from "@/components/layout/container";

const links = [{ href: "#process", label: "The Process" }, { href: "#work", label: "Work" }, { href: "#contact", label: "Contact" }];

function MenuLabel({ children }: { children: string }) {
  return <span className="menu-label">{children}<svg className="menu-underline" viewBox="0 0 100 9" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M2 5 Q24 1 49 4 T98 3 M9 8 Q48 5 89 7" /></svg></span>;
}

export function Header() {
  const [open, setOpen] = useState(false);
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
          {links.slice(0, 2).map((link) => <a href={link.href} key={link.href}><MenuLabel>{link.label}</MenuLabel></a>)}
        </nav>
        <a className="button header-contact" href="#contact"><MenuLabel>Contact</MenuLabel> <ArrowUpRightIcon size={17} aria-hidden="true" /></a>
        <button ref={trigger} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>
          {open ? <XIcon size={25} aria-hidden="true" /> : <ListIcon size={25} aria-hidden="true" />}
        </button>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
          {links.map((link) => <a href={link.href} key={link.href} onClick={() => setOpen(false)}><MenuLabel>{link.label}</MenuLabel><ArrowUpRightIcon size={20} aria-hidden="true" /></a>)}
        </nav>
      </Container>
    </header>
  );
}
