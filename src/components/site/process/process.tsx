"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Container } from "@/components/layout/container";
import { KifaruGraphic } from "@/components/graphics/kifaru/kifaru-graphic";
import { kifaruStages } from "@/components/graphics/kifaru/kifaru-system";
import { processStages } from "@/lib/content";
import { useProcessScroll } from "./use-process-scroll";

export function Process() {
  const [active, setActive] = useState(0);
  const { root, selectStage } = useProcessScroll(setActive);
  const graphicStage = processStages[active].graphicStage;
  const graphic = kifaruStages[graphicStage];
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % processStages.length;
    else if (event.key === "ArrowLeft") next = (index + processStages.length - 1) % processStages.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = processStages.length - 1;
    else return;
    event.preventDefault();
    selectStage(next);
    tabs.current[next]?.focus();
  }
  return (
    <section ref={root} id="process" className="process section" aria-labelledby="process-title">
      <div className="process-pin">
      <Container className="process-grid">
        <div className="process-copy">
          <p className="eyebrow">The Process</p>
          <h2 id="process-title">We design the journey, not just the website.</h2>
          <p className="section-description">Go beyond a beautiful website. Build a digital experience that makes your business stronger.</p>
          <div className="process-scroll-guide"><span>Scroll to explore, or choose a step</span><a href="#work">Skip to work ↓</a></div>
          <div className="process-panel">
            <div className="process-tabs" role="tablist" aria-label="Our design process">
              {processStages.map((stage, index) => (
                <button type="button" role="tab" ref={(el) => { tabs.current[index] = el; }} key={stage.name} id={`process-tab-${index}`} aria-controls={`process-panel-${index}`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => selectStage(index)} onKeyDown={(event) => handleKey(event, index)}>
                  <span className="step-number">0{index + 1}</span><span>{stage.name}</span>
                </button>
              ))}
            </div>
            <div className="process-scroll-progress" aria-hidden="true"><span /></div>
            {processStages.map((stage, index) => (
              <div role="tabpanel" id={`process-panel-${index}`} aria-labelledby={`process-tab-${index}`} key={stage.name} hidden={index !== active} tabIndex={0} className="process-detail">
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
                <p className="process-deliverable">{stage.deliverable}</p>
              </div>
            ))}
          </div>
        </div>
        <figure className="process-art">
          <KifaruGraphic stage={graphicStage} />
          <figcaption className="kifaru-caption" aria-live="polite" aria-atomic="true"><strong>{graphic.label}</strong><span>{graphic.description}</span></figcaption>
        </figure>
      </Container>
      </div>
    </section>
  );
}
