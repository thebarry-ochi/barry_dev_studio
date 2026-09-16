"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { Container } from "@/components/layout/container";

const links = [{ href: "#process", label: "The Process" }, { href: "#work", label: "Work" }, { href: "#contact", label: "Contact" }];

export function Header() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape" && open) { setOpen(false); trigger.current?.focus(); }
    }}>
      <Container className="header-inner">
        <a className="wordmark" href="#top" aria-label="Barry Dev Studio home">Barry Dev Studio<span aria-hidden="true">.</span></a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.slice(0, 2).map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
        </nav>
        <a className="button header-contact" href="#contact">Contact <ArrowUpRightIcon size={17} aria-hidden="true" /></a>
        <button ref={trigger} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>
          {open ? <XIcon size={25} aria-hidden="true" /> : <ListIcon size={25} aria-hidden="true" />}
        </button>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
          {links.map((link) => <a href={link.href} key={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRightIcon size={20} aria-hidden="true" /></a>)}
        </nav>
      </Container>
    </header>
  );
}
