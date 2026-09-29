"use client";
import { Container } from "@/components/layout/container";
import { projects } from "@/lib/content";
import { ProjectCard } from "./project-card";
export function Work() {
 return <section id="work" className="work section" aria-labelledby="work-title"><Container>
 <div className="work-heading"><div><p className="eyebrow">Portfolio</p><h2 id="work-title">Selected <span>Work</span></h2><p className="section-description">Every case study starts with a problem, not a template.</p></div></div>
 <div id="projects" className="project-grid">{projects.map(project=><ProjectCard key={project.id} project={project}/>)}</div>
 </Container></section>;
}
