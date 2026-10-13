"use client";
import { useRef } from "react";
import { Container } from "@/components/layout/container";
import { useSectionReveal } from "@/components/site/motion/use-section-reveal";
import { projects } from "@/lib/content";
import { ProjectCard } from "./project-card";
export function Work() {
 const section = useRef<HTMLElement>(null);
 useSectionReveal(section);
 return <section ref={section} id="work" className="work section" aria-labelledby="work-title"><Container>
 <div className="work-heading"><div><p className="eyebrow" data-section-reveal>Portfolio</p><h2 id="work-title" data-section-reveal data-reveal-delay="70">Selected <span>Work</span></h2><p className="section-description" data-section-reveal data-reveal-delay="140">Every case study starts with a problem, not a template.</p></div></div>
 <div id="projects" className="project-grid">{projects.map(project=><ProjectCard key={project.id} project={project}/>)}</div>
 </Container></section>;
}
