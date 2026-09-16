"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowUpRightIcon, XIcon } from "@phosphor-icons/react";
import type { projects } from "@/lib/content";

type Project = (typeof projects)[number];

export function ProjectCard({ project }: { project: Project }) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <article className="project-card">
      <div className="project-image"><Image src={project.image} alt={project.alt} width={1536} height={1024} sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 45vw, 31vw" /></div>
      <div className="project-category"><span>{project.category}</span><span>Concept</span></div>
      <h3>{project.name}</h3>
      <p className="project-description">{project.description}</p>
      <button className="text-link" type="button" aria-haspopup="dialog" aria-label={`View project: ${project.name}`} onClick={() => dialog.current?.showModal()}>View Project <ArrowUpRightIcon size={18} aria-hidden="true" /></button>
      <dialog ref={dialog} className="project-dialog" aria-labelledby={`${project.id}-title`} onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.current?.close();
        }
      }}>
        <button type="button" className="dialog-close" aria-label="Close project preview" onClick={() => dialog.current?.close()}><XIcon size={22} aria-hidden="true" /></button>
        <Image src={project.image} alt={project.alt} width={1536} height={1024} sizes="(max-width: 767px) 90vw, 720px" />
        <div className="dialog-content">
          <p className="eyebrow">Concept preview</p>
          <h2 id={`${project.id}-title`}>{project.name}</h2>
          <p>{project.focus}</p>
          <h3>Design direction</h3>
          <p>{project.direction}</p>
          <p className="concept-note">Exploratory work with illustrative imagery. A full case study will be added when the project is ready.</p>
        </div>
      </dialog>
    </article>
  );
}
