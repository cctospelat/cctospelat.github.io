# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev       # Start local dev server at localhost:4321
npm run build     # Build production site to ./dist/
npm run preview   # Preview the production build locally
npx astro check   # Type-check .astro files
```

## Architecture

This is an **Astro 6** static site for the C.C. Tospelat running club, using **Tailwind CSS v4** (via `@tailwindcss/vite`) and TypeScript.

### Routing & i18n

- `src/pages/index.astro` — default Spanish (`es`) page (no URL prefix)
- `src/pages/[lang]/index.astro` — localized pages for `ca`, `en`, `fr`
- Language detection: `src/i18n/utils.ts` exports `getLangFromUrl` and `useTranslations`
- All UI strings live in `src/i18n/ui.ts`; `es` is `defaultLang` and acts as the fallback

### Content Collections

Defined in `src/content.config.ts`. All collections are loaded via `glob()` and follow the structure `src/content/<collection>/<lang>/<slug>.md`.

| Collection | Content |
|---|---|
| `presentation` | About, commitment, colors sections (`sobre-nosotros`, `compromiso`, `colores`) |
| `entrenamiento` | Training schedule/info |
| `news` | News posts (`title`, `date`, `summary`, `image?`) |
| `calendar` | Upcoming races (`title`, `date`, `location`, `distance`, `url?`) |
| `contact` | Contact info including social links |

Components filter collection entries by language using the `id` prefix (e.g., `entry.id.split('/')[0] === lang`).

### Static Assets

Public assets in `public/` are served at the root path (e.g., `/favicon.ico`, `/logos/logo1.svg`, `/fotos/content/...`). The site is deployed to `https://cctospelat.github.io` with no base path.

### Adding Content

To add a news post or calendar entry, create a Markdown file in all four language directories (`es/`, `ca/`, `en/`, `fr/`) with the required frontmatter fields matching the collection schema in `src/content.config.ts`.
