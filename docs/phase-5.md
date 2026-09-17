# Phase 5 — scroll-linked Process stages

On desktop (at least 1024×760, with no reduced-motion preference), Process pins for three viewport heights of scrolling. The four resting poses are Discover/sketch, Define/wireframe, Develop/high-fidelity and Deliver/finished. Each adjacent pair blends over the middle 30% of its interval; the surrounding dwell makes each stage readable. Scrolling backward reverses the sequence.

Tabs remain directly selectable. A click or arrow/Home/End key instantly navigates to the corresponding resting scroll position, without smooth-scroll races. A visible Skip to work link bypasses the sequence. The active tab and text change only at a blend midpoint. SVG layers stay mounted, and opacity/rotation are updated directly per animation frame; React updates only on stage boundaries. The browser frame is additive to the high-fidelity layer. A progress line shows overall progress.

Mobile, tablets, short windows, reduced motion, no JavaScript and missing ResizeObserver retain the ordinary manual-tab section. Media changes remove all animation styles. Scroll-driven live announcements are disabled, while the static manual version retains its polite caption. No scroll input is prevented or intercepted.

## Implementation

- process-timeline.ts: pure stage/blend and tab-to-scroll mapping.
- use-process-scroll.ts: measurement, frame scheduling, media/resize/font/restoration handling and cleanup.
- process.tsx: sticky wrapper, guide, skip link and timeline integration.
- process-scroll.css: progressive sticky layout, scroll range and progress indicator.
- journey-transfer.tsx: compensate for sticky displacement when measuring the Phase 4 landing anchor.
- globals.css and kifaru.css: stylesheet registration and caption comment.
- tests/kifaru-system.test.mjs: timeline endpoints, clamping and intermediate blends.

No dependencies added. Phase 4 changes remain alongside Phase 5, uncommitted. Work overlap remains Phase 6; contact details stay placeholders.

## Verification

Lint, TypeScript, six geometry/asset/timeline tests and production webpack build pass. Browser checks: four resting poses and exact layer opacities; 50/50 intermediate blend; reverse scrolling; pinned top position; mouse and keyboard stage selection; skip link; desktop 1440×900 and minimum 1024×760 with content fitting; mobile 375×812 restoring static layout and clearing inline opacity overrides. No horizontal overflow or console errors observed. Reduced-motion/no-JavaScript behavior is source-reviewed; this browser tool has no media or script-disable emulation. Cross-browser/physical-device performance testing remains launch work.

Preview: http://127.0.0.1:3105
Next: Phase 6 — Work overlaps the Process section.
