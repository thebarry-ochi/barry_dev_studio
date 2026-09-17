# Phase 6 — Work covers Process

After Deliver reaches its complete resting pose, Work rises as an opaque white surface over the pinned Process section. One viewport of covering travel is added without changing the three-viewport, four-stage timeline. Scrolling back reveals Deliver and restores its controls.

Native sticky positioning and a negative margin provide the effect. The Process section is 500svh when enhanced; Work overlaps its final 100svh. Work begins at the viewport bottom exactly when Deliver completes, and reaches the top at sticky release. No extra animation library, overlay clone, scroll interception, shadow or scaling effect is added.

During covering travel, Process is inert so keyboard focus cannot enter covered controls. Reverse scrolling and all fallback modes clear inert. Work project dialogs remain in the native top layer.

## Files

- work-overlap.css: white Work surface, stacking order, extended pin range and desktop overlap.
- globals.css: style registration.
- process-timeline.ts: timeline distance calculation excluding overlap travel.
- use-process-scroll.ts: read actual overlap size during measurement and manage covered controls.
- tests/kifaru-system.test.mjs: verify Deliver completes before cover travel and stage timings stay unchanged.

No dependencies added. Desktop enhancement requires 1024×760 and no reduced-motion preference. Smaller/shorter screens, reduced motion and no JavaScript keep regular section flow.

## Checks

Lint, typecheck, seven geometry/asset/timeline tests and production webpack build pass. Desktop browser measurements confirm Work starts 900px below the viewport top at Deliver, and after 450px scrolling Work is at 450px while Process remains at 0. Reverse scroll restores Process controls. Work project preview opens and closes correctly. At 375×812, Work margin is zero, Process is static, their boundaries meet, inert is cleared, and there is no horizontal overflow. No console errors observed. Reduced-motion and no-JavaScript fallback are source-reviewed; media emulation is unavailable in this browser tool.

Phases 4–6 remain local and uncommitted. Next is Phase 7: replace the concept previews with real case studies and approved project material.

Preview: http://127.0.0.1:3106

## Process-over-hero correction

Process now also scrolls over the hero. The hero copy receives a bounded scroll translation behind Process's opaque grey surface; the transferring sketch remains above it until handoff. Covered hero controls become inert and are restored on reverse scrolling. Desktop checks at scroll positions 360px and 540px confirm the hero copy remains at 133.6px while the Process edge moves from 456px to 276px. Mobile clears the transform and inert state. Lint, typecheck, seven tests, production webpack build and browser console checks pass. Latest preview: http://127.0.0.1:3107
