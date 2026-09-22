"use client";

import { useRef, useState, useId, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { MagnifyingGlassIcon, BlueprintIcon, PencilRulerIcon, RocketLaunchIcon, ArrowDownIcon } from "@phosphor-icons/react";
import { Container } from "@/components/layout/container";
import { KifaruGraphic } from "@/components/graphics/kifaru/kifaru-graphic";
import { processStages } from "@/lib/content";
import { useProcessScroll } from "./use-process-scroll";

const icons = [MagnifyingGlassIcon, BlueprintIcon, PencilRulerIcon, RocketLaunchIcon];
export function Process() {
  const [active, setActive] = useState(0);
  const { root, selectStage } = useProcessScroll(setActive);
  const id = useId();
  const reduced = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % 4;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + 3) % 4;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 3;
    else return;
    event.preventDefault(); selectStage(next); tabs.current[next]?.focus({ preventScroll: true });
  }
  return <section ref={root} id="process" className="process section" aria-labelledby="process-title">
    <div className="process-pin"><Container className="process-grid">
      <div className="process-copy">
        <p className="eyebrow">The Process</p>
        <h2 id="process-title">We design the journey, not just the website.</h2>
        <p className="section-description">Go beyond a beautiful website. Build a digital experience that makes your business stronger.</p>
        <div className="process-panel"><div className="process-tabs" role="tablist" aria-orientation="vertical" aria-label="Our design process">
          {processStages.map((stage, index) => {
            const Icon = icons[index];
            return <button type="button" role="tab" key={stage.name} ref={el => { tabs.current[index] = el; }} id={`process-tab-${index}`} aria-controls="process-graphic" aria-selected={active === index} aria-label={`${index + 1}. ${stage.name}`} aria-describedby={`process-description-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => selectStage(index)} onKeyDown={event => handleKey(event, index)}>
              {active === index && <motion.span className="process-active-card" layoutId={`${id}-card`} transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 36 }} />}
              <span className="step-number">0{index + 1}</span>
              <span className="process-step-label"><Icon size={20} aria-hidden="true" /><span>{stage.name}</span></span>
              <span id={`process-description-${index}`} className="process-step-description">{stage.description}</span>
            </button>;
          })}
        </div></div>
      </div>
      <figure id="process-graphic" role="tabpanel" aria-labelledby={`process-tab-${active}`} tabIndex={0} className="process-art"><KifaruGraphic stage={processStages[active].graphicStage} /></figure>
      <a href="#work" className="process-skip">Scroll to Work <ArrowDownIcon size={18} aria-hidden="true" /></a>
    </Container></div>
  </section>;
}
