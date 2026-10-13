"use client";

import { StackIcon, TargetIcon, UsersThreeIcon } from "@phosphor-icons/react";
import { Container } from "@/components/layout/container";
import { useContactOverlap } from "@/components/site/contact/use-contact-overlap";
import { useSectionReveal } from "@/components/site/motion/use-section-reveal";
import { AboutPortrait, type PortraitSource } from "./about-portrait";

const organisations = ["Disney", "Verizon", "National Instruments", "Takeda", "Johnson & Johnson"];
const principles = [
  { title: "UX-led thinking", icon: UsersThreeIcon, copy: "I design around your customers — their needs, their journey and what helps them take action." },
  { title: "Ownership", icon: TargetIcon, copy: "You work directly with me from understanding the problem through design, development and launch." },
  { title: "Systems thinking", icon: StackIcon, copy: "I bring the same discipline, attention to detail and independent working style I've developed in enterprise environments." },
];

export function About({ portrait }: { portrait?: PortraitSource }) {
  const section = useContactOverlap();
  useSectionReveal(section);

  return (
    <>
    {/* Keep the navigation target in normal flow while the section pins. */}
    <div id="about" className="about-anchor" aria-hidden="true" />
    <section ref={section} className="about section" aria-labelledby="about-title">
      <Container>
        <div className="about-composition">
          <div className="about-heading">
            <p className="eyebrow" data-section-reveal>About</p>
            <h2 id="about-title">
              <span className="about-title-line" data-section-reveal data-reveal-delay="70">Design thinking</span>
              <span className="about-title-line" data-section-reveal data-reveal-delay="130">backed by <span className="about-title-accent">real-world experience.</span></span>
            </h2>
          </div>
          <div className="about-portrait" data-section-reveal data-reveal-delay="100">
            <AboutPortrait portrait={portrait} />
          </div>
          <div className="about-copy">
            <p data-section-reveal data-reveal-delay="180">I&apos;m Barry, a UI/UX designer and developer focused on creating digital experiences that make businesses easier to understand, trust and choose.</p>
            <p data-section-reveal data-reveal-delay="250">Alongside my design work, I&apos;ve supported enterprise client accounts through IgniteTech, including Disney, Verizon, National Instruments, Takeda and Johnson &amp; Johnson. Working in large, complex environments has taught me the value of clear processes, attention to detail and ownership — qualities I bring to every project at Barry Dev Studio.</p>
          </div>
          <aside className="about-enterprise" aria-labelledby="enterprise-title">
            <h3 id="enterprise-title" data-section-reveal>Enterprise experience <span>via IgniteTech</span></h3>
            <ul>{organisations.map((name, index) => <li key={name} data-section-reveal data-reveal-delay={String(60 + index * 50)}>{name}</li>)}</ul>
            <p data-section-reveal data-reveal-delay="320">Experience working within large, complex organisations and meeting demanding standards.</p>
          </aside>
        </div>
        <ol className="about-principles" aria-label="My approach">
          {principles.map(({ title, icon: Icon, copy }, index) => (
            <li className="about-principle" key={title} data-section-reveal data-reveal-delay={String(index * 70)}>
              <Icon className="about-principle-icon" size={54} weight="light" aria-hidden="true" />
              <div>
                <span className="about-principle-number" aria-hidden="true">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
    </>
  );
}
