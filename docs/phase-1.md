# Phase 1: static homepage

## Source of truth

The final PRD and four original wireframes were recovered from the referenced
Review Website Context conversation. The final PRD overrides earlier ideas.
Design read: premium editorial studio portfolio for SME decision-makers.
Design variance 6, motion intensity 1, visual density 3. Geist and the explicit
brand palette are retained. User-specified split sections, three work cards,
section labels and navy Contact/Footer take precedence over generic skill defaults.
The corner system uses 4px buttons/images, 3px fields, and 6px native dialogs.

## Implemented

- Header with working anchors and a mobile navigation disclosure.
- Hero with the approved headline, supporting copy and static Kifaru sketch.
- Process with four keyboard-accessible tabs, individual copy and a static design preview.
- Selected Work with three labelled concepts and accessible preview dialogs.
- Contact with visible labels, native field validation and an explicit unsent preview state.
- Footer with section navigation and back-to-top link.
- Shared responsive styles and the PRD's button hover colours, without timed transitions.
- Phosphor icons and three generated WebP concept images. See asset-provenance.md.
- More descriptive metadata; indexing remains disabled until launch.

The user requested placeholder contact details. Phone/email are therefore plain
text, WhatsApp is disabled, and the form has no delivery endpoint. The preview
button is deliberately not a native submit control, so it cannot submit the form
before hydration. With JavaScript enabled it checks native validity and explains
that nothing was sent. No real message is sent or stored.

## Deferred to the agreed phases

- Phase 2: four aligned Kifaru SVG layers and distinct safari photography.
  Current sketch/design previews are composition studies, not the final graphic system.
  The Process image stays fixed while tabs change; graphic state switching comes later.
- Phases 3-6: entrance, shared Hero/Process scene, scroll-driven process and Work overlap.
- Phase 7: full case studies and real screenshots/outcomes. The current cards are
  honestly labelled concepts, and View Project opens a preview, not a dead route.
- Phase 8: real contact details, WhatsApp and form delivery/spam protection.
- Phase 9: launch assets, analytics, SEO activation and full performance/cross-browser audit.

## Validation

- npm run lint, npm run typecheck, npm run build passed.
- In-app browser checks: no horizontal overflow at 320, 390, 768, 1024 and 1440px;
  no broken loaded images; black body text/navy headings; no captured console warnings/errors.
- Mobile menu opens and closes after navigation; Work anchor resolves.
- Process supports click selection, arrow navigation and End; selected panel updates.
- Project dialog opens, traps focus natively, and closes with Escape.
- Preview form confirms the message was not sent.
- Desktop and mobile visual review completed. Static styles introduce no automatic motion.
- Automated Chrome could not launch in the sandbox, so a Lighthouse score is not
  claimed. Performance and full Safari/Firefox coverage remain launch-phase work.

Changes are local and uncommitted for review; this phase does not push or deploy.
