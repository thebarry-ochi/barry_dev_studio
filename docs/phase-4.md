# Phase 4 — hero-to-Process transfer

Desktop visitors now see the hero sketch remain pinned in the right column while the Process section moves underneath. The artwork translates, scales and rotates from its hero slot to the exact Process slot. Scrolling backwards reverses the transfer. There is no extra scroll spacer, scroll interception or cloned SVG.

## Architecture

JourneyTransfer wraps the existing Hero and Process server children. It measures their untransformed layout anchors after resize/font loading, then updates transforms in one requestAnimationFrame per scroll frame. transferFrame is a pure, clamped geometry function with endpoint and pinning tests. Both original SVGs remain mounted; CSS swaps visibility at the matching destination. The shared scene geometry makes that handoff exact.

The transfer applies from 1024px viewport width and 650px height, only with no reduced-motion preference. Mobile, tablet, short windows, reduced motion, no JavaScript and browsers without ResizeObserver retain the ordinary layout. Resize and preference changes remove the enhancement. Observer/listener cleanup supports remounts. A fast scroll completes the hero entrance before carrying its sketch.

Process tabs remain manual in this phase. Selecting a non-sketch stage restores the ordinary layout immediately; selecting Discover restores the reversible sketch transfer. Automatic scroll-linked stage selection is Phase 5. Contact remains placeholder-only.

## Changed files

- src/components/site/journey/journey-transfer.tsx: lifecycle and progressive enhancement.
- src/components/site/journey/transfer-geometry.ts: position, scale and rotation math.
- src/styles/journey.css: stacking and endpoint visibility.
- src/app/page.tsx and globals.css: composition and style import.
- src/styles/home.css: corrected historical comment.
- tests/kifaru-system.test.mjs: anchor, clamping, reverse and tall-viewport tests.

No dependencies added. No commit or push performed for this phase.

## Verification

Lint, TypeScript, five graphics/transfer tests and the production webpack build pass. Browser review covers desktop forward and reverse transfer, coincident landing rectangles, keyboard Process tabs and a resize to mobile with both static graphics restored and no horizontal overflow. No browser errors observed. Reduced-motion and no-JavaScript fallbacks are source-reviewed; the available browser does not expose media emulation. Physical-device and cross-browser launch testing remain outstanding.

Preview: http://127.0.0.1:3104
Next: Phase 5, scroll-linked Process stages.
