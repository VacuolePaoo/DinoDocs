# Fumadocs

This site is built with [Fumadocs](https://fumadocs.dev) on Next.js. The APIs and conventions of Fumadocs may differ from your training data, so check its docs for the task at hand:

- Writing pages: https://fumadocs.dev/docs/next/markdown.md
- Organizing pages and folders: https://fumadocs.dev/docs/next/page-conventions.md
- Customizing the UI: https://fumadocs.dev/docs/next/guides/customize-ui.md
- Changing the theme and colors: https://fumadocs.dev/docs/ui/theme.md
- Upgrading Fumadocs: https://fumadocs.dev/docs/next/upgrade.md
- Other tasks: https://fumadocs.dev/llms.txt lists every docs page.

## Commands

This repository uses pnpm (`pnpm-lock.yaml`):

- `pnpm dev` — start the Next.js development server.
- `pnpm build` — create a production build.
- `pnpm types:check` — generate Next.js route types, then run TypeScript without emitting files.
- `pnpm lint` — run ESLint; append file or directory paths for a focused check.

No test script is currently configured.

## Structure

- `content/notes/` — independent MDX notes collections; `content/docs/<product>/` — independent product documentation collections.
- `src/lib/source.ts` — defines the independent MDX collections, loaders, search sources, and scoped LLMS helpers.
- `src/app/notes/` — Notebook layout with navbar tabs; `src/app/docs/` — product selector and independent product layouts.
- `src/layouts/spacious/` — complete Base UI Spacious layout installed with `npx @fumadocs/cli@latest add layouts/spacious`; customize these local sources instead of reimplementing its sidebar styles. `cli.json` stores the component aliases.
- `src/app/(home)/` — landing page and its layout.
- `src/lib/layout.shared.tsx` and `src/lib/shared.ts` — shared navigation, site, GitHub, and Open Graph configuration.
- `src/components/mdx.tsx` — shared MDX component overrides.
- `src/app/notes/[collection]/llms*` and `src/app/docs/[product]/llms*` — collection-scoped LLMS endpoints; root-level aggregate LLMS URLs intentionally return 404.
- `src/lib/og.tsx` — next/og covers for notes and products with the official Next.js example styling; `src/lib/og-fonts.ts` fetches Noto Sans SC TTFs from Google Fonts at build time and caches them under `node_modules/.cache/og-fonts/` (satori only supports ttf/otf/woff, fonts are never committed, and the build environment must reach `fonts.googleapis.com`/`fonts.gstatic.com`). OG routes are fully static (`dynamicParams = false`) and serve `image.png`.
- `src/app/global.css` — Tailwind CSS 4 and Fumadocs theme imports.

## Conventions

- Use the `@/*` import alias for modules under `src/`; TypeScript runs in strict mode.
- Keep Next.js route typing intact (`PageProps`, `LayoutProps`, and `RouteContext`) and await dynamic route `params`.
- Preserve Fumadocs source, layout, and Markdown/LLMS integration when adding or restructuring documentation.
- Do not edit generated `.next/`, `.source/`, or `next-env.d.ts` files.
- Check the installed Fumadocs and Next.js APIs before upgrading or replacing framework integrations; `fumadocs-ui` is currently aliased to `@fumadocs/base-ui`.
