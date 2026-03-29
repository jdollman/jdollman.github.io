# Learnings — Website Redesign (2026-03-29)

## Quarto project context overrides per-document settings

When rendering a `.qmd` file that lives inside a Quarto project (i.e., there's a `_quarto.yml` above it), the project-level settings are merged with the document's frontmatter. This means:

- Setting `theme: custom.scss` in a post's frontmatter does NOT fully override `theme: zephyr` from `_quarto.yml`. The project theme bleeds through (navbar, colors, layout).
- To test a theme in isolation, render the file **outside** the project directory (copy it and its data to `/tmp/` or similar).
- This was the root cause of the first failed render — the Zephyr navbar and purple banner appeared despite the custom theme.

## `_metadata.yml` in post directories applies to all posts

`posts_assorted/_metadata.yml` sets defaults for every post in that directory. The key setting that caused layout issues was `title-block-banner: true`, which:
- Creates a full-width banner header with "AUTHOR" / "PUBLISHED" labels
- Pushes `include-before-body` content below the banner (inside `<main>`, not before the header)
- Changes the grid layout in ways that interact with `margin-width`

Setting `title-block-banner: false` fixed the back-link placement and simplified the title display.

## Per-post CSS files override the theme

Four posts have their own `styles.css` that set `font-family: "IBM Plex Sans"` and custom link/heading colors. These load AFTER the theme SCSS, so they win on specificity. This is actually desirable — it means posts keep their original character while the theme handles the chrome (navbar, back-link, meta display).

## `include-before-body` placement depends on page structure

- Without title-block-banner: content appears at the start of `<main>`, before the title. Good.
- With title-block-banner: content appears inside `<main>` but AFTER the banner header. Bad — the back-link ends up below the title.

## Quarto's grid system is hard to override via CSS

Multiple attempts to widen/narrow the body column:

1. **YAML `grid: body-width: 800px`** — Widened the body but centered it, losing the left-aligned feel.
2. **SCSS `--bs-body-width` CSS variable** — Same centering problem.
3. **SCSS custom `grid-template-columns`** — Pushed everything to the far right, text overflowed off-screen.
4. **YAML `grid: margin-width: 350px` only** — Produced the desired narrow left-aligned layout, but only when rendering outside the project.

**Uncertainty**: Why does `margin-width: 350px` produce the left-aligned look outside the project but not inside it? Likely the project-level grid settings or Bootstrap defaults are interfering. Diffing the two rendered HTML files would clarify.

## `embed-resources: true` and browser caching

Posts with `embed-resources: true` bundle all CSS/JS inline. When iterating on styles, the browser aggressively caches these files. Always Cmd+Shift+R when checking changes. Several "nothing changed" moments were actually cache issues.

## Font size across hand-written vs Quarto pages

Hand-written HTML pages use the browser's default font size (~16px). Quarto pages use Bootstrap's base font size which is slightly larger. Setting `font-size: 0.85em` on the back-link made it tiny on hand-written pages but fine on Quarto pages. Fixed by using an absolute size (`14px`) for the Quarto theme and removing the size override on hand-written pages.

## The `docs/` output directory gets partially overwritten on render

`quarto render` regenerates `docs/` but only for files it knows about. Hand-written HTML files copied to `docs/` survive unless Quarto generates a file with the same name. The workflow is:
1. `quarto render` (regenerates post HTML)
2. Copy hand-written pages to `docs/` (overwrites any Quarto-generated index.html, etc.)

This is fragile — if you forget step 2, the site breaks. A better approach might be to have Quarto ignore `index.html` entirely or use a post-render script.
