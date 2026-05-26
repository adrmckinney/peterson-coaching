---
name: tailwind-v3
description: Use when writing Tailwind CSS classes in Blade templates, React/TSX files, or any view file. Triggers on "tailwind", "class=", "className=", styling, layout, spacing, color, responsive design, dark mode.
---

# Tailwind CSS v3 (project pinned)

This project uses **Tailwind v3**, NOT v4. v4 introduces breaking changes (new config format, container query syntax, native CSS layers). Avoid v4-only classes and APIs.

## v3-safe rules

- ✅ Classes work as in v3 docs: spacing, color, flex, grid, typography, breakpoints (`sm md lg xl 2xl`).
- ✅ Use `tailwind.config.js` (CommonJS) — NOT `@tailwindcss/postcss` v4 config or `@config` directive.
- ✅ Custom colors / fonts / spacing live in `tailwind.config.js` → `theme.extend`.
- ❌ No `@theme` directive (v4-only).
- ❌ No `bg-primary/50` opacity-on-arbitrary-token until verified in the project's config.
- ❌ No `text-balance` / `text-pretty` — these are v3.4+ utilities, confirm Tailwind version in `package.json` first.

## Conventions (project-observed)

- **Mobile-first**: base classes target mobile, `sm:` and above stack for larger.
  ```html
  <div class="sm:hidden">mobile-only hero</div>
  <div class="hidden sm:block">desktop layout</div>
  ```
- **Background tokens**: project uses `bg-background` — check `tailwind.config.js` `theme.extend.colors` for available semantic tokens before inventing color names.
- **Theme color**: `#014421` (deep green) is the brand color, set as `<meta name="theme-color">`.
- **Font**: `font-sans` resolves to Figtree (loaded via fonts.bunny.net CDN in layout).
- **Antialiasing**: `antialiased` on `<body>`.
- **Layout primitives in use**: `flex gap-*`, `grid`, `min-h-screen`, `max-w-*`, `mx-auto`.

## Spacing rule (CLAUDE.md)

Use `gap-*` utilities on flex/grid parents for spacing between children. Don't use margins between sibling items.

```html
<!-- YES -->
<div class="flex gap-8">
    <div>Superior</div>
    <div>Michigan</div>
    <div>Erie</div>
</div>

<!-- NO -->
<div class="flex">
    <div class="mr-8">Superior</div>
    <div class="mr-8">Michigan</div>
    <div>Erie</div>
</div>
```

## Dark mode

If pages and components in this project support dark mode, new code must too using `dark:` prefix. Quick check: grep `dark:` in `resources/views/` and `resources/js/` — if zero hits, dark mode is not active and you can skip.

## Class ordering

Prettier + `prettier-plugin-tailwindcss` (verify in `package.json`) auto-orders classes. Don't fight it — write what feels natural, let the formatter fix order.

Manual order convention when no plugin:
1. Layout: `flex grid block hidden`
2. Positioning: `relative absolute top-* left-*`
3. Box: `w-* h-* p-* m-*`
4. Typography: `text-* font-*`
5. Background/border: `bg-* border-*`
6. State: `hover:* focus:*`
7. Responsive: `sm:* md:* lg:*`

## Reuse over duplication

Repeated patterns of 5+ classes → extract to a Blade component (`<x-button>`) or React component. Don't `@apply` in CSS files unless extracting a true atomic primitive — `@apply` hides intent.

## Build

- Dev: `yarn run dev` (Vite watch + HMR)
- Prod: `yarn run build`
- If UI changes don't reflect: run the build, then ask user to hard-refresh.

## Don't

- No v4 classes/syntax (`@theme`, `@variant` directives, `@layer` overuse).
- No inline `<style>` blocks.
- No arbitrary values when a config token exists: prefer `text-primary` over `text-[#014421]`.
- No `!important` (`!font-bold`) unless overriding third-party styles. Investigate cascade instead.
- No margins on siblings — use `gap`.
