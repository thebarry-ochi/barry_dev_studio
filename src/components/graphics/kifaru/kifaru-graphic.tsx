import { useId, type CSSProperties, type ComponentType } from "react";
import { AnnotationLayer, FinishedLayer, HighFidelityLayer, SketchLayer, WireframeLayer } from "./kifaru-layers";
import { kifaruGeometry as g, kifaruLayerNames, kifaruStages, type KifaruLayerName, type KifaruStage } from "./kifaru-system";

export type KifaruGraphicProps = {
  stage: KifaruStage;
  pose?: "hero" | "process" | "flat";
  className?: string;
};

const layers: Record<KifaruLayerName, ComponentType<{ prefix: string }>> = {
  sketch: SketchLayer,
  annotations: AnnotationLayer,
  wireframe: WireframeLayer,
  "high-fidelity": HighFidelityLayer,
  finished: FinishedLayer,
};

/** All layers stay mounted. Phase 2 selects stills; later phases can drive their opacity/pathLength. */
export function KifaruGraphic({ stage, pose = "process", className = "" }: KifaruGraphicProps) {
  const instance = useId();
  const prefix = `kifaru-${instance.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const state = kifaruStages[stage];
  const rotation = pose === "flat" ? 0 : pose === "hero" ? -4 : state.rotation;
  const style = { "--kifaru-rotation": `${rotation}deg` } as CSSProperties;

  return (
    <div className={`kifaru-scene ${className}`} data-kifaru-stage={stage} data-kifaru-pose={pose} style={style}>
      <svg className="kifaru-artwork" xmlns="http://www.w3.org/2000/svg" viewBox={g.viewBox} width="640" height="540" role="img" aria-labelledby={`${prefix}-title`} aria-describedby={`${prefix}-description`} focusable="false">
        <title id={`${prefix}-title`}>{`Kifaru: ${state.label.toLowerCase()}`}</title>
        <desc id={`${prefix}-description`}>{`${state.description} A fictional safari website with a headline, a journey enquiry button, a hero image and three destination cards.`}</desc>
        <defs>
          <clipPath id={`${prefix}-clip-hero`} clipPathUnits="userSpaceOnUse"><rect width={g.heroImage.width} height={g.heroImage.height} rx="2" /></clipPath>
          <clipPath id={`${prefix}-clip-card`} clipPathUnits="userSpaceOnUse"><rect width={g.cardImageWidth} height={g.cardImageHeight} rx="1" /></clipPath>
          <filter id={`${prefix}-shadow`} x="-20%" y="-20%" width="140%" height="150%" colorInterpolationFilters="sRGB"><feDropShadow dx="0" dy="13" stdDeviation="11" floodColor="var(--brand-navy)" floodOpacity="0.14" /></filter>
        </defs>
        <g id={`${prefix}-finished-elevation`} data-part="elevation" opacity={state.layers.finished} aria-hidden="true" pointerEvents="none">
          <rect {...g.browser} rx="5" fill="var(--brand-white)" filter={`url(#${prefix}-shadow)`} />
        </g>
        {kifaruLayerNames.map((name) => {
          const Layer = layers[name];
          return (
            <g key={name} id={`${prefix}-layer-${name}`} data-kifaru-layer={name} opacity={state.layers[name]} aria-hidden="true" pointerEvents="none">
              <Layer prefix={prefix} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
