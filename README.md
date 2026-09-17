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
