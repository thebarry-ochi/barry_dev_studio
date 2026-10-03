# Barry Dev Studio

Phase 6: Work overlaps the completed Process story, following the hero transfer and four scroll-linked Kifaru stages. built on the Phase 0 Next.js App Router,
strict TypeScript, Geist Sans, Tailwind CSS 4, and Motion foundation.

See `docs/phase-6.md`, `docs/phase-5.md`, `docs/phase-4.md`, `docs/phase-3.md`, `docs/phase-2.md` and `docs/phase-1.md` for implementation scope, checks, and intentionally deferred
features. Contact information remains placeholder content by request.

## Local development

Use Node 24 (the exact local version is recorded in `.nvmrc`) and npm.
From this repository:

```sh
nvm install
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. `nvm` must be installed and loaded in your shell;
otherwise install Node 24 directly. Node 18 is not supported.

```sh
npm run lint       # ESLint, zero warnings
npm run typecheck  # generate route types, then strict TypeScript
npm run build     # production build
npm run test:graphics # geometry and asset checks
npm run check     # lint, types, graphics tests, production build
npm start         # serve the completed production build
```

Dependencies are locked in `package-lock.json`; use `npm ci` for repeatable installs.
Geist is supplied by the `geist` package using Next.js local font handling, so
builds do not fetch fonts from Google. Fonts are served from the application.

## Structure

- `src/app`: root layout, composed homepage, 404, metadata, robots and sitemap.
- `src/styles/tokens.css`: brand primitives, semantic roles and layout tokens.
- `src/components/layout`: responsive Container and Section primitives.
- `src/components/site/{header,hero,process,work,contact,footer}`: homepage section components.
- `src/components/providers`: shared Motion configuration honoring reduced motion.
- `src/components/motion-primitives`: future selected copy-in components.
- `src/components/graphics/kifaru`: shared geometry and persistent sketch, annotation, wireframe, high-fidelity and finished layers.
- `src/lib`: site configuration and shared class-name utility.
- `public/assets/{kifaru,images,work}`: Kifaru and concept portfolio assets.

## Design foundation

Palette: navy `#14213D`, blue `#22577A`, amber `#FCA311`, gray `#E5E5E5`,
black `#000000`, and white `#FFFFFF` canvas. Use semantic tokens in components.
Amber takes dark foreground text; do not use amber for body text on white.
Global styles include fluid gutters/spacing/type, visible keyboard focus,
a skip link and reduced-motion support. Container caps content at 80rem;
Section controls responsive vertical spacing. No dark theme is added. The hero sketch has a one-time entrance with a reduced-motion still.

## Motion and Motion Primitives

Motion is installed and configured with `reducedMotion="user"`. Use `motion/react`
in client components for later interactive animation phases. Phase 3 uses CSS keyframes for its predetermined stroke sequence.
[Motion Primitives](https://github.com/ibelick/motion-primitives) provides copy-in
components. Tailwind, `clsx`, `tailwind-merge`, `cn()` and `components.json` are
prepared; no unused animated widgets are installed. See its directory README.

## SEO and deployment configuration

Set `SITE_URL` in `.env.local` or deployment environment to the real HTTP(S)
origin (no path/query). Canonical and Open Graph URLs use that origin; no domain
is invented. Phase 0 defaults to `noindex, nofollow`, robots disallow and an empty
sitemap. When the homepage is launch-ready, set `SITE_INDEXABLE=true` together
with `SITE_URL`, then rebuild. Metadata is evaluated at build time. Indexing
controls are not authentication. Add approved sharing images and icons in a later phase.

Phase 2 connects Discover, Define, Develop and Deliver to four Kifaru states.
Full case studies, contact delivery, and deployment remain
future work. Review changes before committing and pushing.

## Tooling compatibility

ESLint remains on 9.x because the React plugin bundled with the current Next.js
ESLint configuration fails under ESLint 10. npm marks ESLint 9 deprecated;
upgrade when that plugin supports ESLint 10. Application dependencies are current
at initialization; the lockfile records the tested versions.


## September 2026 redesign

The homepage follows the supplied black Hero → white Process/Portfolio/About → black Contact/Footer screens. Public UI colours are black, white and `#EB5E28`; portfolio concepts retain their photographic colours.

The Hero automatically holds its opening message for one second, then separates the headline and paragraph, draws grouped SVG strokes and introduces the CTAs over 2.2 seconds. The entrance runs once per mount; scrolling back does not rewind it. Fast scrolling beyond the Hero hold completes the drawing before its handoff; reduced motion shows the completed layout without an entrance. Across desktop, tablet and phone layouts, native scrolling carries one Kifaru illustration into Process while its pencil strokes transition from white to black. Four process stages share SVG geometry. Process pauses on Deliver before releasing into Portfolio. Portfolio flows into About. About pauses at its bottom for 45% of the viewport’s scroll distance, then Contact covers it and the header exits. Below 1200px the Process stages use two rows around a centered graphic, all within the pinned viewport. Compact landscape phones keep the stage descriptions accessible to screen readers while showing the four named stages. Reduced motion uses normal flow and keyboard-operable stage controls.

Rom Africa Safaris and CarLux Kenya use supplied homepage screenshots and link to their deployed Vercel sites. Screenshot thumbnails preserve the full 3418:1890 aspect ratio across breakpoints. Ridgeview retains its illustrative browser composition and concept preview.

### Configure links and contact delivery later

Copy `.env.example` to `.env.local`. Public links are optional HTTPS URLs and require a rebuild when changed. Rom Africa Safaris and CarLux Kenya have confirmed default project URLs, optionally overridden with `NEXT_PUBLIC_ROM_AFRICA_URL` and `NEXT_PUBLIC_CARLUX_URL`. Missing social links are omitted; projects without URLs open concept previews; WhatsApp remains disabled until configured. Displayed phone/email are labelled placeholders.

Contact sending stays disconnected until `CONTACT_DELIVERY_URL` and `CONTACT_DELIVERY_TOKEN` are configured. The route POSTs JSON to an operator-controlled HTTPS webhook with Bearer auth. Set the receiving email/provider at that service. It returns an explicit not-sent status when unconfigured.

Validation includes client/server checks, same-origin requests, a streaming 16KB limit, a honeypot, a timeout and bounded per-instance email throttle. Before launch, add a durable hosting-edge rate limiter (memory resets between serverless instances), configure real destinations/details and test delivery end to end.

Validation commands: `npm run lint`, `npm run typecheck`, `npm run test:graphics`, `npm run build -- --webpack`. They check source, geometry, asset budgets, timeline/handoff math and form validation; they do not certify Core Web Vitals or all browsers.

### Brand logo

`src/components/brand/barry-dev-studio-logo.tsx` recreates Option 8 as two clean vector paths and a live Geist wordmark. Use `variant="dark"` on black, `variant="light"` on white, or `variant="mark"` for the standalone orange symbol. The header keeps the same SVG mounted while its wordmark colour transitions; the mark remains `#EB5E28`. Pass `decorative` only when the containing link already provides an accessible name. `src/app/icon.svg` uses the same mark for the favicon, with no background or raster content. Keep its two paths in sync with the component if the approved geometry changes.

### About section

About follows Portfolio and uses the supplied editorial desktop/mobile layouts. Enterprise experience is explicitly attributed to work through IgniteTech. Its entrance uses short, once-only opacity/transform reveals; reduced motion and no JavaScript leave all content visible. The existing contact overlap now pins About, with normal flow for reduced motion.

The About portrait uses Barry’s supplied sketch at `public/assets/about/barry-sketch.png`, rendered through Next Image with descriptive alt text. Its orange accents are preserved. Desktop uses a portrait crop; mobile displays the full 3:2 composition. To change the image, update the `portrait` prop in `src/app/page.tsx`; focal points can be adjusted with `--portrait-position` and `--portrait-position-mobile`.
