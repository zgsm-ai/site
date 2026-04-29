# CLAUDE.md

This file provides guidance to CoStrict when working with code in this repository.

## Project Overview

This is the CoStrict marketing website — a Vue 3 + TypeScript static site built with Vite. It is a single-page application with route-based page code splitting.

## Development Commands

- `pnpm dev` — Start dev server on port 9002
- `pnpm build` — Type-check and build for production
- `pnpm build-only` — Build without type-checking
- `pnpm preview` — Preview production build
- `pnpm type-check` — Run `vue-tsc --build`
- `pnpm lint` — Run ESLint with auto-fix
- `pnpm format` — Run Prettier on `src/`
- `pnpm test` / `pnpm test:unit` — Currently unconfigured (placeholder echo)

## Tech Stack

- **Framework:** Vue 3 (Composition API, `<script setup lang="ts">`)
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS v4 (`@import 'tailwindcss'`), Less for scoped component styles
- **UI Library:** naive-ui (message provider, components)
- **Router:** vue-router with custom prefetching (see Architecture)
- **I18n:** vue-i18n (Composition API mode, legacy: false)
- **SEO:** @unhead/vue for `<head>` management
- **Testing:** Vitest + happy-dom configured, but no tests exist yet

## Project Structure

```
src/
  views/           # Page-level components (home, download, pricing, operation, blog, resourceCalculator)
  components/      # Shared components (NavBar, PageTitle, StructuredData, FeatureSection)
  router/          # Route config + custom prefetch utilities
  hooks/           # Vue composables (useRouterPrefetch, useLocalizedResources, useResponsive, etc.)
  locales/         # i18n messages (zh.json, en.json) + i18n setup
  utils/           # Utilities (language.ts for localStorage language preference)
  styles/          # Global CSS tokens (tokens.css)
  assets/          # Static assets organized by page
```

## Architecture

### Route-Based Code Splitting

All routes use dynamic imports with a custom `createPrefetchableRoute` wrapper (`src/router/prefetch.ts`). The Vite build config (`vite.config.ts`) manually splits chunks by:
- Vue core / vue-router / vue-i18n
- naive-ui
- Per-page chunks (`page-home`, `page-download`, `page-pricing`, `page-operation`)
- Vendor catch-all

### Router Prefetching

Two-level prefetching is implemented:
1. **Hover prefetch:** `useRouterPrefetch` attaches global mouseover listeners. When hovering a local link for >50ms, the route component is dynamically imported.
2. **Idle prefetch:** After router is ready, critical routes (download, operation, pricing/blog in zh only) are prefetched via `requestIdleCallback` with staggered delays.

### Locale-Gated Routes

Some routes (`/blog`, `/pricing`, `/blog/:id`) have `meta.localeVisible: ['zh']`. A global `beforeEach` guard redirects non-zh users to home when attempting to access these routes.

### Multi-Language Resources

For image assets that differ by locale, use the `useLocalizedResources` composable:

```ts
const images = useLocalizedResources({
  zh: { hero: ZhHeroImg },
  en: { hero: EnHeroImg },
})
```

This returns a computed ref that switches based on the current i18n locale.

### Design Tokens

Global CSS custom properties are defined in `src/styles/tokens.css` (colors, spacing, breakpoints, z-index, transitions). Tailwind CSS v4 is imported in `src/index.css`. The site uses a dark theme (black background, white text).

### SEO

Each view uses `useHead` from @unhead/vue to set page-specific title, meta, and OpenGraph tags. `StructuredData` component injects JSON-LD schema.

### Scroll Animations

The `.scroll-animation-wrapper` class in `src/index.css` provides a fade-up reveal animation. Elements start with `transform: translateY(50px); opacity: 0;` and gain `.is-visible` to trigger the transition.

## Important Conventions

- **Path alias:** `@/` maps to `src/`
- **Language support:** Only `zh` and `en` are supported. Language preference is stored in `localStorage` under key `costrict_language`.
- **Styling:** Prefer Tailwind utility classes for layout; use scoped `<style lang="less">` for component-specific custom styles (background images, responsive overrides).
- **No test files exist yet:** The `tests/` directory does not exist. Vitest is configured to look for `tests/**/*.{test,spec}.{js,ts}`.
