# Architecture & Refactor Context

This document provides context for future development conversations. It explains the current state of the codebase, what was retained from the original React/Inertia setup, and the phased refactor plan.

## Current State (Post Phase 1 + Phase 2)

The app was originally a React/Inertia SPA. It has been refactored so that **public pages are rendered with Blade templates**, while React/Inertia code is retained for future use.

### What's Live Now

- **Blade-rendered public site** at `/` with all content loaded from the database (fallback to `resources/content/fallback.json` if DB is unreachable)
- **Two layout modes** toggled via `?layout=scroll` or `?layout=pages`, stored in session via `DetectLayoutMode` middleware
- **Alpine.js** handles interactive bits: mobile menu toggle, TikTok video lazy-loading
- **Theme system** via CSS custom properties defined in `resources/css/theme.css`, consumed by Tailwind config

### Key Files — Blade (Active)

```
resources/views/
├── components/
│   ├── layouts/public.blade.php        — base HTML layout (fonts, Vite CSS, Alpine.js, dark mode)
│   ├── nav/
│   │   ├── header.blade.php            — mobile menu overlay (Alpine.js)
│   │   ├── topbar.blade.php            — standalone nav bar for pages without the hero
│   │   ├── links.blade.php             — shared nav links (generates anchors or routes based on layout mode)
│   │   └── brand-icon.blade.php        — SVG brand icon extracted from React component
│   └── sections/
│       ├── hero.blade.php              — hero with split layout (dark bg + text left, image right)
│       ├── features.blade.php          — video gallery section
│       ├── testimonials.blade.php      — testimonials grid
│       ├── packages.blade.php          — pricing tiers
│       ├── contact-form.blade.php      — contact form (standard POST)
│       ├── section-headline.blade.php  — reusable heading component
│       ├── tiktok-video-card.blade.php — lazy-load TikTok embeds via Alpine.js
│       ├── youtube-video-card.blade.php— YouTube iframe embed
│       └── loading-circle.blade.php    — SVG spinner
└── pages/
    ├── landing.blade.php               — scroll mode: all sections stacked (no nav links)
    ├── home.blade.php                  — pages mode: hero only with topbar
    ├── about.blade.php                 — pages mode: hero with nav links
    ├── features.blade.php              — pages mode: video gallery with topbar
    ├── testimonials.blade.php          — pages mode: testimonials with topbar
    ├── packages.blade.php              — pages mode: pricing with topbar
    └── contact.blade.php               — pages mode: contact form with topbar
```

### Key Files — Backend

```
app/
├── Http/
│   ├── Controllers/
│   │   ├── PageController.php          — serves Blade pages, checks layout mode for landing
│   │   └── ContactController.php       — handles contact form POST (works for both Blade and Inertia)
│   └── Middleware/
│       ├── DetectLayoutMode.php        — reads ?layout= param, stores in session, shares $layoutMode with views
│       └── HandleInertiaRequests.php   — Inertia middleware (only applied to auth/admin routes)
├── Services/
│   └── PageContentService.php          — fetches page content from DB, falls back to fallback.json
└── Models/
    ├── Page.php                        — has many PageSections
    ├── PageSection.php                 — type + settings JSON + sort_order + visible
    └── Video.php                       — belongs to PageSection
```

### Routing

```
# Public Blade routes (no Inertia middleware)
GET  /                  → PageController@landing (scroll or pages mode)
GET  /about             → PageController@about
GET  /features          → PageController@features
GET  /testimonials      → PageController@testimonials
GET  /packages          → PageController@packages
GET  /contact           → PageController@contact
POST /contact           → ContactController@store

# Inertia routes (wrapped in 'inertia' middleware group)
GET  /dashboard         → Inertia Dashboard
GET  /login             → Inertia Login
GET  /register          → Inertia Register
GET  /profile           → Inertia Profile
# ... other auth routes in routes/auth.php
```

The Inertia middleware (`HandleInertiaRequests`) is **not** in the global web middleware stack. It's in a custom `inertia` middleware group applied only to auth/admin routes. This prevents Inertia from interfering with Blade-rendered public pages.

### Database Schema

**pages** — `id`, `slug`, `title`, `is_published`

**page_sections** — `id`, `page_id`, `type`, `settings` (JSON), `visible`, `sort_order`

Section types and their `settings` shape:
- `landing_hero` — `{ paragraphs: [...], hero_image: "path" }`
- `intro_video_section_title` — `{ headline: "..." }`
- `intro_video_gallery` — `{ videos: [{ id, title, platform, external_id, url, thumbnail_url, sort_order }] }`
- `testimonials_section` — `{ headline: "...", testimonials: [{ id, body, author: { name, imageUrl } }] }`
- `packages_section` — `{ headline: "...", tiers: [{ name, id, href, price, priceSubText, image, description, features, cta }] }`
- `contact_section` — `{ headline: "...", form: { fields: {...}, submit_label: "..." } }`

**videos** — `id`, `page_section_id`, `title`, `description`, `platform`, `external_id`, `url`, `thumbnail_url`, `sort_order`, etc.

---

## Retained React/Inertia Code (Not Dead Code)

The following React/Inertia code was intentionally left in place. It is **not currently used by the public site** but is needed for Phase 3 (admin editing).

### Why It Was Retained

1. **Auth pages** (login, register, password reset, profile) — these are React/Inertia pages that work and don't need rewriting. They'll be used when admin access is added in Phase 3.
2. **React components** — the section components (`ContactSection.tsx`, `FeatureSection.tsx`, etc.) serve as reference implementations and may inform the React "editor islands" in Phase 3.
3. **Inertia infrastructure** (`app.tsx`, `HandleInertiaRequests.php`, `app.blade.php`) — still active for auth routes.
4. **Editor hooks** (`usePageEditor.tsx`, `SectionProvider.tsx`) — early scaffolding for the editing system.

### Retained File Locations

```
resources/js/
├── app.tsx                             — Inertia entry point (still used by auth pages)
├── Pages/
│   ├── Auth/                           — Login, Register, ForgotPassword, etc. (active)
│   ├── Profile/                        — Profile management (active)
│   ├── Dashboard.tsx                   — Dashboard (active)
│   ├── Landing.tsx                     — Original React landing page (reference only)
│   └── Welcome.tsx                     — Default Laravel welcome (unused)
├── Components/
│   ├── Sections/                       — React section components (reference for Phase 3)
│   ├── Videos/                         — TikTok/YouTube React cards (reference)
│   ├── Buttons/                        — Button components (reference)
│   └── ...                             — Form inputs, modal, dropdown, etc.
├── Layouts/                            — React layouts (active for auth pages)
├── Hooks/                              — useFallbackContent, usePageEditor, etc.
├── ContextProviders/                   — ThemeProvider, SectionProvider
└── types/                              — TypeScript type definitions

resources/views/
└── app.blade.php                       — Inertia root template (still used by auth routes)
```

### Vite Configuration

`vite.config.js` has two entry points:
- `resources/css/app.css` — used by Blade pages via `@vite(['resources/css/app.css'])`
- `resources/js/app.tsx` — used by Inertia pages via `app.blade.php`

---

## Phased Refactor Plan

Full plan is in `planning/refactor-for-blade.md`. Summary:

### Phase 1 (Complete)
Moved public pages from React/Inertia to Blade. All content stored in database with JSON fallback. Alpine.js for interactivity.

### Phase 2 (In Progress)

Phase 2 has two steps: (1) collapse the user-toggled layout into a responsive dual layout, and (2) remove all dark-mode code.

#### Step 1 — Responsive Dual Layout

The client has chosen a **responsive dual-layout** approach instead of a user-toggled mode. The layout is determined entirely by viewport width — there is no `?layout=` URL parameter and no session storage of layout preference.

**Mobile (`< sm`, i.e. < 640px):** Pages layout
- Each section lives at its own route (`/`, `/about`, `/features`, `/testimonials`, `/packages`, `/contact`).
- Navigation is via the hamburger menu overlay (`header.blade.php`), which opens a dialog listing the page links.
- No topbar visible — only the hamburger trigger.

**Desktop (`sm` and up, i.e. ≥ 640px):** Scroll layout
- Single page at `/` with all sections stacked vertically.
- No nav links (user scrolls to reach sections), matching the current scroll-mode behavior.
- Visiting `/about`, `/features`, etc. on desktop should redirect to `/` (or render the scroll layout) so deep links from a mobile-shared URL still work.

**Implementation notes for the refactor:**
1. **Remove `DetectLayoutMode` middleware** and its session storage. The `$layoutMode` view variable is no longer needed.
2. **Remove `?layout=` query parameter handling** from `PageController` and the middleware.
3. **Single rendering path per route:** Each Blade page should render *both* layouts in one document, using Tailwind responsive classes (`hidden sm:block` / `sm:hidden`) to show the right one. The pages-mode markup is hidden on `sm+`, the scroll-mode markup is hidden below `sm`.
   - Alternative: server-side detect via `User-Agent` — rejected because it breaks caching and is unreliable. Pure CSS responsive is the right call.
4. **Nav links component (`nav/links.blade.php`):** Simplify — always generate route URLs (`/about`, etc.) since anchor-style nav is no longer needed (scroll layout has no nav).
5. **Hamburger menu (`header.blade.php`):** Only visible below `sm`. Hidden on `sm+` via `sm:hidden`.
6. **Topbar (`topbar.blade.php`):** Likely no longer needed — the scroll layout has no nav, and the mobile layout uses the hamburger only. Verify and delete if unused.
7. **Page views:** Each `pages/*.blade.php` (about, features, testimonials, packages, contact) renders the corresponding section with the mobile pages-layout chrome (hamburger), wrapped in `sm:hidden`. On `sm+`, those routes should render the same scroll content as `/` so the page isn't blank.
   - Cleanest option: have `/about`, `/features`, etc. all return the same view that renders `landing.blade.php`'s scroll content on `sm+` and the requested individual section on `< sm`. Or redirect to `/` on `sm+` — but redirects can't be done from CSS, so this would require JS. Prefer the dual-render approach.
8. **`landing.blade.php`:** On `sm+`, renders the existing scroll layout (all sections stacked). On `< sm`, renders the hero only (acting as the mobile home page) with the hamburger header.

**Files expected to change:**
- `app/Http/Middleware/DetectLayoutMode.php` — delete
- `bootstrap/app.php` — remove middleware registration
- `app/Http/Controllers/PageController.php` — simplify, drop layout-mode branching
- `resources/views/components/nav/links.blade.php` — drop `$layoutMode` conditional
- `resources/views/components/nav/header.blade.php` — add `sm:hidden`
- `resources/views/components/nav/topbar.blade.php` — likely delete
- `resources/views/pages/*.blade.php` — restructure for responsive dual rendering
- `resources/views/components/sections/hero.blade.php` — drop `showNav` prop (no nav needed in either final layout)
- `README.md` — remove the "Layout Modes" section about `?layout=` toggling, replace with responsive description

#### Step 2 — Remove Dark Mode

Dark mode was inherited from the Tailwind UI components that were copy-pasted during the original build. The site is single-mode (light only) — there is no toggle, no user preference, and no design intent for a dark theme. All dark-mode artifacts should be removed.

**What to remove:**
1. **`dark:` Tailwind class variants** in every Blade view, component, and any remaining React component used by the public site (`resources/views/**/*.blade.php`).
2. **Dark mode initialization script** in `resources/views/components/layouts/public.blade.php` (the inline `<script>` that reads/sets `localStorage` and toggles the `dark` class on `<html>`).
3. **`darkMode` config** in `tailwind.config.js` (set to `false` or remove the key entirely so the `dark:` variant is disabled).
4. **Theme CSS** in `resources/css/theme.css` — drop any dark-mode custom-property overrides (e.g., `.dark { --background: ... }` blocks). Keep only the light values.
5. **Any `useTheme` / `ThemeProvider` references** still wired into Blade pages. The React `ThemeProvider` in `resources/js/ContextProviders/` can stay (Phase 3 admin may still use it), but it must not be loaded by the public Blade layout.

**Verification:** After the cleanup, `grep -r "dark:" resources/views` and `grep -r "dark:" resources/css` should return zero matches. A grep for `localStorage` in `public.blade.php` should also return nothing.

### Phase 3 (Not Started)
Admin editing with React "islands". Admin logs in at `/admin`, sees the real site with inline editing enabled. React editor components mount on `[data-editable]` elements. Video management uses a modal. Separate Vite entry point loaded only for admin users.

See `planning/refactor-for-blade.md` for full Phase 3 details including the video management modal, progressive editing capabilities, and API endpoints.
