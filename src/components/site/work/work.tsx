import { Container } from "@/components/layout/container";
import { projects } from "@/lib/content";
import { ProjectCard } from "./project-card";

export function Work() {
  return (
    <section id="work" className="work section" aria-labelledby="work-title">
      <Container>
        <div className="work-heading">
          <p className="eyebrow">The Work</p>
          <h2 id="work-title">Selected Work</h2>
          <p className="section-description">Every case study starts with a problem, not a template.</p>
        </div>
        <div className="project-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
      </Container>
    </section>
  );
}
