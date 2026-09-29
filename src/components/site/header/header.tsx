"use client";

import { useEffect, useRef, useState } from "react";

import { animated, useReducedMotion, useSpring, useTrail } from "@react-spring/web";
import { BarryDevStudioLogo } from "@/components/brand/barry-dev-studio-logo";
import { Container } from "@/components/layout/container";

const links = [{ href: "#process", label: "Process" }, { href: "#work", label: "Portfolio" }, { href: "#about", label: "About" }, { href: "#contact", label: "Reach Out" }];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [light, setLight] = useState(false);
  const reduceMotion = useReducedMotion();
  const panel = useRef<HTMLElement>(null);
  const { progress } = useSpring({
    progress: open ? 1 : 0,
    config: { tension: 360, friction: 30 },
    immediate: !!reduceMotion,
  });
  const panelSpring = useSpring({
    opacity: open ? 1 : 0,
    transform: open ? "translateY(0px) scale(1)" : "translateY(-10px) scale(0.98)",
    config: { tension: open ? 400 : 480, friction: 32, clamp: true },
    immediate: !!reduceMotion,
  });
  const linkSprings = useTrail(links.length, {
    opacity: open ? 1 : 0,
    transform: open ? "translateY(0px)" : "translateY(-5px)",
    config: { tension: 520, friction: 32, clamp: true },
    immediate: !!reduceMotion,
  });
  function menuLinks() {
    return links.map(link => <a href={link.href} key={link.href} aria-current={active === link.href ? "location" : undefined} onClick={() => { setActive(link.href); setOpen(false); }}>
      <span className="nav-label">{link.href === "#process" && !light ? "The Process" : link.label}</span>
    </a>);
  }
  const header = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const dismissOutside = (event: PointerEvent) => {
      const target = event.target;
      if (target instanceof Node && !panel.current?.contains(target) && !trigger.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [open]);

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
      setLight((document.getElementById("process")?.getBoundingClientRect().top ?? Infinity) < height + 12);
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
    <header ref={header} className="site-header" data-theme={light ? "light" : "dark"} onKeyDown={(event) => {
      if (event.key === "Escape" && open) { setOpen(false); trigger.current?.focus(); }
    }}>
      <Container className="header-inner">
        <a className="header-brand" href="#top" aria-label="Barry Dev Studio home">
          <BarryDevStudioLogo variant={light ? "light" : "dark"} decorative />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {menuLinks()}
        </nav>
        <button ref={trigger} className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(value => !value)} onBlur={(event) => {
          if (!panel.current?.contains(event.relatedTarget)) setOpen(false);
        }}>
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
            <animated.path d="M4 6H20" style={{ transformOrigin: "12px 12px", transform: progress.to(value => `rotate(${value * 45}deg) translateY(${value * 6}px)`) }} />
            <animated.path d="M4 12H20" style={{ opacity: progress.to(value => 1 - value), transformOrigin: "12px 12px", transform: progress.to(value => `scaleX(${1 - value * 0.3})`) }} />
            <animated.path d="M4 18H20" style={{ transformOrigin: "12px 12px", transform: progress.to(value => `rotate(${value * -45}deg) translateY(${value * -6}px)`) }} />
          </svg>
        </button>
        <animated.nav ref={panel} id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation"
          aria-hidden={!open} inert={!open}
          style={{ ...panelSpring, visibility: panelSpring.opacity.to(value => value === 0 ? "hidden" : "visible"), pointerEvents: open ? "auto" : "none" }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget) && event.relatedTarget !== trigger.current) setOpen(false);
          }}>
          {linkSprings.map((style, index) => {
            const link = links[index];
            return <animated.a key={link.href} href={link.href} style={style}
              aria-current={active === link.href ? "location" : undefined}
              onClick={() => { setActive(link.href); setOpen(false); }}>
              {link.href === "#process" && !light ? "The Process" : link.label}
            </animated.a>;
          })}
        </animated.nav>
      </Container>
    </header>
  );
}
