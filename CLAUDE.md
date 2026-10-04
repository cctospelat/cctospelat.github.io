# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm dev          # Start local dev server at localhost:4321
pnpm build        # Build production site to ./dist/
pnpm preview      # Preview the production build locally
pnpm astro check  # Type-check .astro files
```

## Architecture

This is an **Astro 7** static site for the C.C. Tospelat running club, using **Tailwind CSS v4** (via `@tailwindcss/vite`) and TypeScript. Dependencies are managed with **pnpm** (see `packageManager` in `package.json`).

### Routing & i18n

- `src/pages/index.astro` (`es`, no prefix) and `src/pages/[lang]/index.astro` (`ca`, `en`, `fr`) both render `src/components/HomePage.astro`
- `src/i18n/ui.ts` holds `languages` (name + Intl locale), the `Lang` type and all UI strings; `es` is `defaultLang` and the fallback
- `src/i18n/utils.ts`: `getLangFromUrl`, `useTranslations`, `getHomeUrl`, `isLang` (collection filter by `<lang>/` id prefix) and `formatDate`
- `src/layouts/Layout.astro` has an inline script that redirects first visits to `/` to the browser language
- Shared constants (section anchors used by the navs, social links, join form URL) live in `src/data/site.ts`

### Content Collections

Defined in `src/content.config.ts`. Files live in `src/content/<lang>/<folder>/<slug>.md`; entry ids keep the `<lang>/` prefix (an `index.md` gets id `<lang>/<folder>`).

| Collection | Folder | Content |
|---|---|---|
| `club` | `1_club` | `sobre-nosotros` (also feeds the hero), `compromiso`, `nuestra-piel` |
| `colaboradores` | `2_colaboradores` | Sponsor list + thank-you text (`index.md`) |
| `entrenamiento` | `3_entrenamientos` | Intro text (currently not rendered) |
| `fichas` | `3_entrenamientos/fichas` | Exercise cards |
| `rutas` | `4_rutas` | Running routes |
| `noticias` | `5_noticias` | News posts (`title`, `date`, `summary`, `image?`) |
| `calendario` | `6_eventos` | Upcoming races (`title`, `date`, `location`, `distance`, `url?`) |

### Images

- Content photos live in `src/assets/fotos/content/...` and are referenced from frontmatter as `/fotos/content/...` (no `src/assets` prefix). `src/utils/images.ts#resolveImage` maps that path to the imported asset (build fails if missing); render them with `src/components/ui/ContentImage.astro` so Astro outputs optimized WebP with `srcset`.
- Fixed images (logos, kit photos) are imported directly and rendered with `astro:assets` `<Image>`.
- `public/` only holds files served verbatim at the root path: favicons and language flags (`/logos/flags/<lang>.svg`). The site is deployed to `https://cctospelat.github.io` with no base path.
- Fonts (Inter, Barlow Condensed) are self-hosted via Astro's Fonts API (`fonts` in `astro.config.mjs`, `<Font>` in the layout).

### Adding Content

Create the Markdown file in all four language directories (`es/`, `ca/`, `en/`, `fr/`) with the frontmatter required by the schema in `src/content.config.ts`. See README.md for author-facing instructions.
