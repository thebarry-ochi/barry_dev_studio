"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRightIcon, XIcon } from "@phosphor-icons/react";
import { publicLinks } from "@/lib/links";
import type { projects } from "@/lib/content";

type Project = (typeof projects)[number];

export function ProjectCard({ project }: { project: Project }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const index = project.id === "rom-africa" ? 0 : project.id === "ridgeview" ? 1 : 2;
  const titles = ["Unforgettable Safari Experiences in East Africa", "Luxury Homes in Exceptional Locations", "Premium Vehicles for Every Journey"];
  const brands = ["ROM AFRICA", "Ridgeview", "AUTOLUX"];
  const summaries = ["A modern, conversion-focused website for a premium safari company, designed to showcase unforgettable experiences and make it easy for travellers to plan their dream trip.", "A sleek, modern website for a real estate company, designed to build trust and generate enquiries for high-value properties.", "A high-performance website for a premium car dealership, showcasing inventory and making it simple for customers to get in touch."];
  const href = publicLinks.projects[project.id];
  return (
    <article className="project-card">
      <div className="project-visual" role="img" aria-label={`${project.name} website concept: ${titles[index]}`}>
        <Image src={project.image} alt="" width={1536} height={1024} sizes="(max-width: 767px) 100vw, 70vw" />
        <div className="sample-browser" aria-hidden="true"><div className="sample-nav"><strong>{brands[index]}</strong><span>Home　 {index === 0 ? "Safaris　 Destinations" : index === 1 ? "Properties　 Services" : "Vehicles　 Services"}　 About</span><em>{index===0?"Plan Your Safari":"Enquire"}</em></div><div className="sample-hero"><Image src={project.image} alt="" width={1536} height={1024} sizes="(max-width: 767px) 90vw, 60vw"/><div className="sample-copy"><strong>{titles[index]}</strong><p>{index===0?"Custom safari experiences across Kenya, Tanzania and beyond.":"Discover a more considered experience."}</p><span>{index===0?"Plan Your Safari":index===1?"Explore Properties":"Browse Inventory"} →</span></div></div></div>
      </div>
      <div className="project-info"><p className="project-category">{index===0?"Travel / Web Design / Development":index===1?"Real Estate / Web Design":"Automotive / Web Design"}</p><h3>{project.name}</h3><p className="project-description">{summaries[index]}</p>
      {href ? <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">View project <ArrowRightIcon size={22} aria-hidden="true"/></a> : <button className="text-link" type="button" aria-haspopup="dialog" aria-label={`View project: ${project.name}`} onClick={() => dialog.current?.showModal()}>View project <ArrowRightIcon size={22} aria-hidden="true" /></button>}</div>
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
          <p className="concept-note">Exploratory work with illustrative imagery. The live sample website will be linked here when its URL is ready.</p>
        </div>
      </dialog>
    </article>
  );
}
