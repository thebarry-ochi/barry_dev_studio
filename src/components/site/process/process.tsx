"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { ProcessSkipLink } from "./process-skip-link";
import { Container } from "@/components/layout/container";
import { KifaruGraphic } from "@/components/graphics/kifaru/kifaru-graphic";
import { processStages } from "@/lib/content";
import { useProcessScroll } from "./use-process-scroll";
export function Process() {
  const [active, setActive] = useState(0);
  const { root, selectStage } = useProcessScroll(setActive);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (["ArrowDown", "ArrowRight"].includes(event.key)) next = (index + 1) % 4;
    else if (["ArrowUp", "ArrowLeft"].includes(event.key)) next = (index + 3) % 4;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 3;
    else return;
    event.preventDefault(); selectStage(next); tabs.current[next]?.focus({ preventScroll: true });
  }
  return <section ref={root} id="process" className="process" aria-labelledby="process-title"><div className="process-pin"><Container>
    <div className="process-heading"><div><p className="eyebrow">The Process</p><h2 id="process-title">We design the journey,<br /> not just the website.</h2></div></div>
    <div className="process-stage-layout" data-active={active}>
    <svg className="process-connectors" viewBox="0 0 1400 500" preserveAspectRatio="none" aria-hidden="true">{["M330 90 C365 85 365 170 420 170", "M330 420 C365 420 365 295 420 295", "M1070 90 C1030 85 1030 170 980 170", "M1070 420 C1030 420 1030 295 980 295"].map((d,i) => <g key={d} data-active={active===i}><path d={d}/><circle cx={i<2?330:1070} cy={i%2===0?90:420} r="5" /></g>)}</svg>
    <div className="process-tabs" role="tablist" aria-label="Our design process" aria-orientation="vertical">{processStages.map((stage,index) => <button type="button" role="tab" key={stage.name} ref={el => {tabs.current[index]=el;}} id={`process-tab-${index}`} aria-controls="process-graphic" aria-selected={active===index} tabIndex={active===index?0:-1} onClick={()=>selectStage(index)} onKeyDown={e=>handleKey(e,index)}><span className="step-number">0{index+1}</span><span className="process-step-label">{stage.name}</span><span className="process-step-description">{stage.description}</span><span className="step-rule" /></button>)}</div>
    <figure id="process-graphic" role="tabpanel" aria-labelledby={`process-tab-${active}`} tabIndex={0} className="process-art"><KifaruGraphic stage={processStages[active].graphicStage} /></figure>
    </div><ProcessSkipLink />
  </Container></div></section>;
}
