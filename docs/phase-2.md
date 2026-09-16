# Phase 2 — Kifaru graphic system

The hero and Process share KifaruGraphic. Its stage prop accepts sketch, wireframe, high-fidelity or finished; pose accepts hero, process or flat. Discover → sketch, Define → wireframe, Develop → high-fidelity, Deliver → finished.

## Structure

kifaru-system.ts owns the 640 × 540 coordinate system, slots, image paths and state metadata. kifaru-layers.tsx owns five persistent SVG groups: sketch, annotations, wireframe, high-fidelity and finished. kifaru-graphic.tsx composes them, namespaces IDs per instance and selects opacity. Finished adds browser chrome and elevation above the existing high-fidelity page without moving its content.

Named data-kifaru-layer, data-part, data-card and data-draw hooks support later animation. Rotation is a CSS variable on the surrounding scene, independent of geometry. No animation or scroll choreography is added in Phase 2. Reduced-motion removes the static tilt.

## Accessibility and validation

Each SVG exposes one descriptive image; internal layers are hidden from assistive technology. SVG title and description use single text expressions to keep server and client output identical. Process tabs support arrows, Home and End, with a polite stage caption.

Geometry and asset tests check slot bounds, overlap, browser extension, destination separation, WebP signatures and byte budgets. Four local photographic assets total 131,158 bytes. No dependencies added. Node module type is explicit for the TypeScript geometry tests.

Browser checks cover all four stages at 375, 768 and 1440 pixels, no horizontal overflow, consistent scene dimensions, unique SVG IDs, persistent layers and reverse keyboard navigation. See asset-provenance.md for image prompts. Cross-browser launch auditing remains a later phase.

## Next

Phase 3 adds the hero line-drawing animation. Pinned transfer, scroll-linked Process transitions, Work overlap and live contact delivery remain later phases. Contact details remain placeholders by request.
