## Commands

```bash
npm run dev         # dev server (localhost:3000)
npm run build       # production build
npx tsc --noEmit    # type-check (no test suite)
```

## Architecture

Next.js 15 App Router, Tailwind CSS v4, TypeScript. No backend — fully static.

```
app/                      # pages only; thin data-fetching wrappers
  page.tsx                # home (HomeHero + ProjectsSection + SkillsSection)
  about/page.tsx
  projects/[slug]/        # case study pages — static at build time
  not-found.tsx           # custom 404
  sitemap.ts / robots.ts
components/
  sections/               # home + about page sections
  CopyEmailButton.tsx     # "use client" copy-to-clipboard
  project-visuals.tsx     # SVG architecture diagrams for case study overviews
lib/
  projects-data.ts        # PROJECTS[] + SKILLS[] — home page grid content
  case-studies.ts         # CASE_STUDIES{} + CASE_STUDY_ORDER[] — case study content
  about-data.ts           # EXPERIENCE[], EDUCATION[], CHANNELS[]
public/projects/          # project screenshot images (referenced via project.image)
```

## Key Patterns

All content lives in `lib/` — never hardcode text in components.

Design tokens (colors, fonts) are in `app/globals.css` under `@theme {}`.
There is no `tailwind.config.js` — Tailwind v4 reads `@theme` directly.

SVG elements in `project-visuals.tsx` use `style={{ fill: 'var(--color-X)' }}`
rather than Tailwind classes — SVG fill/stroke don't accept Tailwind utilities.

## Adding a Project

Touch all four of these or the case study 404s:

1. `lib/projects-data.ts` — add entry to `PROJECTS[]`
2. `lib/case-studies.ts` — add entry to `CASE_STUDIES{}`
3. `lib/case-studies.ts` — add slug to `CASE_STUDY_ORDER[]`
4. `components/project-visuals.tsx` — add entry to `CASE_STUDY_DIAGRAMS{}`

Project card image: set `image: "/projects/<slug>.png"` on the project entry and
drop the file in `public/projects/`. The card silently hides the image slot if
the file is missing — no crash.

## Environment

```
NEXT_PUBLIC_SITE_URL   production domain for sitemap.xml / robots.txt
                       (defaults to https://yahiahammad.dev if unset)
```
