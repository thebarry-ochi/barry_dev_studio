# Phase 3 — hero drawing entrance

The hero sketch draws once when at least 20% of its container enters the viewport. Outline begins immediately, navigation at 180ms, copy at 320ms, illustration at 480ms, CTA at 640ms, cards at 780–940ms and annotations at 1100ms. Strokes take 700ms and labels fade over 250ms; total duration is 1.8 seconds. Scrolling away and back does not replay it. A new page load can replay it.

## Files and decisions

- hero-drawing.tsx: a small client wrapper with a one-shot IntersectionObserver, preference listener and cleanup. SVG content remains server-rendered children.
- hero.tsx: wraps the existing graphic in that entrance controller.
- kifaru-layers.tsx: normalizes drawable paths with pathLength=1.
- kifaru.css: scoped stroke and opacity keyframes. Process layers are unaffected.

No dependencies were added. CSS drives the predetermined sequence; Motion stays available for the later interactive scroll work. SVG strokes necessarily repaint, but there are no layout animations, frame-by-frame React updates, loops or geometry measurements.

Reduced-motion uses the complete still through the CSS media query and observer bypass. Enabling it during playback completes the sketch permanently for that mount. No JavaScript uses a noscript style fallback, and browsers without IntersectionObserver also receive the complete sketch. Headline and CTAs remain immediately available throughout.

## Validation

Lint, typecheck and all three graphics tests passed. Production build passed with `npm run build -- --webpack`. Default Turbopack was blocked by the local sandbox when binding its internal compiler port, even with network permission; no application compilation failure occurred with webpack. The normal build script is unchanged.

Browser verified at desktop 1440×900 and mobile 375×600: pending offscreen state, intermediate stroke offset, final zero stroke offset, one iteration, no replay on re-entry, no horizontal overflow and no console errors. Process paths have no animation. Reduced-motion and no-JavaScript fallbacks were checked in source; this browser tool does not provide media/JavaScript emulation. No physical-device performance benchmark was run.

## Resume tomorrow

Phase 4 is the pinned hero-to-Process transfer. Keep the shared coordinate system and persistent layers. Phase 5 handles scroll-linked Process stages, then Work overlap. Contact details remain placeholders. Phases 1–3 remain local and uncommitted; no push was requested for this phase.

Preview: http://127.0.0.1:3100
