# Refactor Plan: Blade-First with React Editing

## Goal

Convert the site from a full React/Inertia SPA to a **Blade-rendered, server-side site** for public visitors. React only activates when an admin enters edit mode. This gives us SEO-friendly, fast-loading pages by default and a rich editing experience when needed.

---

## Current State

- Single landing page (`/landing`) rendered entirely via React/Inertia
- Content hardcoded in `resources/content/fallback.json`
- Sections: Hero/Intro, Feature (videos), Testimonials, Packages, Contact Form
- Admin editing hooks exist (`usePageEditor`, `SectionProvider`) but have no UI
- Page/PageSection models exist in DB but controllers are empty
- Everything is a single scrollable page

---

## Architecture Decision: How to Avoid Duplicate Components

### Recommended Approach: Blade as Source of Truth + React "Islands"

Instead of maintaining both Blade components and React components for the same content, we use **Blade components as the single source of truth** for rendering. React only mounts as "islands" on top of existing Blade-rendered HTML when the admin clicks "Edit."

**How it works:**

1. **Public visitors** see pure Blade-rendered HTML (no React, no Inertia on public pages). All content from DB.
2. **Admin logs in** at `/admin` -> sees the exact same site, but with inline editing enabled
3. Admin **clicks directly on content** (a paragraph, headline, etc.) to edit it in place — no modals
4. A floating toolbar appears above the selected element for text styling (font size, color, etc.)
5. Admin clicks "Save" in a persistent toolbar to batch-persist all changes via API
6. Page reloads with updated Blade-rendered content from the DB

**Why this approach:**
- Zero duplication: Blade renders the content, React only handles the inline editing UI
- Public pages are pure HTML — fast, SEO-friendly, no JS framework needed
- React editor bundle is only loaded for authenticated admins (zero JS overhead for visitors)
- Admin sees exactly what visitors see — WYSIWYG editing on the real site
- Each editable element is independent (React islands), so editors are small and focused

### Alternative Considered: Shared JSON -> Both Blade & React Render

Have both Blade templates and React components consume the same data shape (from the DB). This was rejected because it means maintaining two rendering implementations for every section.

---

## Phase 1: Move Content to Blade (Public Site)

### 1.1 — Database-Backed Content (All Content Lives in DB)

The Page/PageSection models already exist. The `page_sections.settings` JSON column stores all content for each section. **Every piece of content** — intro paragraphs, testimonials, packages, contact form labels, video gallery, section headlines — lives in the DB as `page_sections` rows. `fallback.json` is only used as an emergency fallback if the DB is unreachable.

**Existing schema fits well:**
- `pages` — `id`, `slug`, `title`, `is_published`
- `page_sections` — `id`, `page_id`, `type`, `settings` (JSON), `visible`, `sort_order` (needs migration — column missing). For the migration, simply rollback, update the existing migration file, and then migrate again. Because the site is not live, there is no need to create a new migration file at this point.

**Section types and their `settings` JSON shape:**

| `type` | `settings` JSON |
|--------|----------------|
| `landing_hero` | `{ "paragraphs": [...], "hero_image": "path" }` |
| `intro_video_section_title` | `{ "headline": "..." }` |
| `intro_video_gallery` | `{ "videos": [{ id, title, platform, external_id, url, thumbnail_url, sort_order }] }` |
| `contact_section` | `{ "headline": "...", "form": { "fields": {...}, "submit_label": "..." } }` |
| `packages_section` | `{ "headline": "...", "tiers": [{ name, id, href, price, priceSubText, image, description, features, cta }] }` |
| `testimonials_section` | `{ "headline": "...", "testimonials": [{ id, body, author: { name, imageUrl } }] }` |

Steps:

- [ ] Add `sort_order` column to `page_sections` (migration — column exists in model fillable but not in migration)
- [ ] Create `PageContentSeeder` that inserts all `fallback.json` content into `pages` + `page_sections`
- [ ] Build out `PageController` to fetch page by slug, eager-load sections ordered by `sort_order`, and pass to Blade
- [ ] `fallback.json` remains in the repo as emergency fallback only (used if DB query fails, not as primary source)
- [ ] Create a helper/service (e.g., `PageContentService`) that tries DB first, falls back to JSON on failure

### 1.2 — Create Blade Layout & Components

Create a public layout and Blade components that mirror the current React sections:

- [ ] `resources/views/layouts/public.blade.php` — base layout (head, fonts, Tailwind, footer)
- [ ] `resources/views/components/sections/hero.blade.php` — intro text + hero image
- [ ] `resources/views/components/sections/features.blade.php` — video gallery
- [ ] `resources/views/components/sections/testimonials.blade.php` — testimonials grid
- [ ] `resources/views/components/sections/packages.blade.php` — pricing tiers
- [ ] `resources/views/components/sections/contact-form.blade.php` — contact form
- [ ] `resources/views/components/sections/section-headline.blade.php` — reusable heading

Each Blade component receives its data as props from the controller. The Tailwind classes from the current React components transfer directly.

### 1.3 — Create Blade Pages

- [ ] `resources/views/pages/landing.blade.php` — assembles sections in order (single-page scroll version)
- [ ] Update routes: `GET /landing` (or `GET /`) renders Blade view instead of Inertia

### 1.4 — Navigation & Header

- [ ] Create Blade header/nav component with mobile menu (Alpine.js for toggle — lightweight, no React needed)
- [ ] Install Alpine.js for small interactive bits (mobile menu, dropdowns)

### 1.5 — Theme Support

- [ ] Pass theme CSS variables from controller to Blade layout (same approach as current ThemeProvider but server-side)
- [ ] Dark mode toggle via Alpine.js + localStorage (same logic as current `app.blade.php` script)

### 1.6 — Contact Form

- [ ] Blade form submits via standard POST to `ContactController@store`
- [ ] Controller redirects back with flash message (no Inertia needed)
- [ ] Add CSRF token to form

### 1.7 — Cleanup

- [ ] Keep all React/Inertia code intact (needed for Phase 3 admin editing and for auth pages)
- [ ] Auth pages (login, register, etc.) stay as React/Inertia — they're admin-only anyway
- [ ] Remove Inertia rendering from public routes only

---

## Phase 2: Multi-Page vs. Single-Page (Client Choice)

> Moved before admin editing so the client can play with layouts before we invest in the editing UI.

### The Problem

Client may want individual pages (click-through) instead of a single scrollable page. This is a big UX shift.

### Recommended Solution: Support Both with a Config Toggle

Since we're building Blade components as independent sections, we can easily support both layouts:

**Option A — Single Scroll Page (current behavior)**
- One route (`/`) renders all sections stacked vertically
- Nav links are anchor links (`#testimonials`, `#packages`, etc.)

**Option B — Multi-Page**
- Each section gets its own route (`/`, `/about`, `/testimonials`, `/packages`, `/contact`)
- Nav links go to separate pages
- Each page uses the same Blade components, just one (or a few) per page

### Implementation

Layout mode is controlled via a **URL query parameter** — no admin page or login needed. The client visits `/?layout=pages` to see multi-page mode, or `/?layout=scroll` to see single-page mode. The choice is stored in the session so the client doesn't have to keep adding the param.

- [ ] Add middleware or controller logic that reads `?layout=` param and stores it in the session
- [ ] Default to `'scroll'` if no param or session value exists
- [ ] Routes register **both** single-page and multi-page routes; controller checks session to decide which view to render
- [ ] Multi-page routes: `/`, `/about`, `/testimonials`, `/packages`, `/contact` — each renders specific section(s)
- [ ] Single-page route: `/` renders all sections stacked vertically
- [ ] Nav component reads the current layout mode from session to generate correct links (anchor `#` links vs. route links)
- [ ] **Both modes use the exact same Blade section components** — no duplication

### How the Client Can Try Both

- [ ] Share two links with the client: `https://staging-url/?layout=scroll` and `https://staging-url/?layout=pages`
- [ ] Once clicked, the layout mode is sticky in the session — client navigates the site normally
- [ ] Switching is instant — just visit the other link to flip
- [ ] No admin page, no login required — will be moved to a proper admin settings page in Phase 3 when auth is built

---

## Phase 3: Admin Editing (Inline React Islands)

### 3.1 — Admin Access & Edit Mode

The admin experience:
1. Admin navigates to `/admin` — hits the login page (existing auth, restricted to admin users)
2. After login, admin is redirected to the public site but with **edit mode active**
3. The site looks exactly the same as the public version, but content is editable inline
4. A small floating admin toolbar shows "Editing" status, save/discard buttons, and logout

How edit mode is detected:
- [ ] Add `is_admin` column to `users` table (boolean, default false)
- [ ] Create `AdminMiddleware` that sets a session flag / shares `$isAdmin` with all views
- [ ] Route `GET /admin` -> login page (or redirect to site if already authenticated)
- [ ] After admin login, redirect to `/` with edit mode session active
- [ ] Blade layout conditionally loads the React editor bundle: `@if($isAdmin) @vite([...]) @endif`

### 3.2 — Inline Editing

The admin sees the real site. Editable elements become interactive when clicked. The editing happens directly on the content — **inline, not in modals** — with one exception: video management uses a modal (see below).

**How inline editing works:**

- Each Blade section wraps editable content in a `<div data-editable data-section-id="..." data-field="...">`
- When the editor JS loads (admin only), it attaches click handlers to `[data-editable]` elements
- Clicking a paragraph makes it `contenteditable` with a floating toolbar above it
- The floating toolbar (React component) provides: bold, italic, font size, text color, padding controls
- Changes are tracked in memory; the admin clicks "Save" in the floating admin toolbar to persist all changes

**Video section editing — modal exception:**

Videos can't be meaningfully edited inline (they're embeds, not text). Instead, the video section gets an "Edit Videos" button (admin only) that opens a **management modal**:

- [ ] Drag-to-reorder videos (or up/down arrows)
- [ ] Add new video (paste URL, select platform, set thumbnail)
- [ ] Remove a video (with confirmation)
- [ ] Toggle visibility (show/hide without deleting)
- [ ] Preview thumbnails in the list
- [ ] Save changes updates `page_sections.settings` for the video gallery + `videos` table

**Editing capabilities (progressive):**

| Phase | Capability |
|-------|-----------|
| 3.2a | Text editing — click a paragraph/heading, type to change it |
| 3.2b | Text styling — floating toolbar for font size, color, bold/italic |
| 3.2c | Spacing — padding/margin controls on sections |
| 3.2d | Rich content — reorder sections, add/remove testimonials/packages |
| 3.2e | Video management — modal for reorder, add, remove, show/hide videos |

### 3.3 — React Editor Components

Small, focused React islands that mount onto editable regions:

- [ ] `resources/js/Editors/InlineTextEditor.tsx` — contenteditable wrapper with save tracking
- [ ] `resources/js/Editors/TextStyleToolbar.tsx` — floating toolbar (font size, color, bold, italic)
- [ ] `resources/js/Editors/AdminToolbar.tsx` — fixed bottom bar (Save All, Discard, status indicator)
- [ ] `resources/js/Editors/SectionEditor.tsx` — section-level controls (reorder, visibility toggle)
- [ ] `resources/js/Editors/VideoManagerModal.tsx` — modal for video reorder, add, remove, show/hide
- [ ] `resources/js/Editors/editor-mount.ts` — entry point that finds `[data-editable]` elements and mounts editors

Each editor reads current content from the DOM (what Blade rendered). On save, it collects all changes and sends a single batch API request.

### 3.4 — API Endpoints for Editing

- [ ] `PATCH /api/sections/{section}` — update section settings JSON
- [ ] `PATCH /api/sections/batch` — update multiple sections at once (for "Save All")
- [ ] `POST /api/sections/{section}/videos` — manage videos
- [ ] `PATCH /api/sections/{section}/reorder` — change sort_order
- [ ] Protect all with `auth` + `admin` middleware

### 3.5 — Vite Entry Points

- [ ] Create `resources/js/editors.tsx` as a separate Vite entry point
- [ ] Only loaded for admins: `@if($isAdmin) @vite(['resources/js/editors.tsx']) @endif`
- [ ] Public visitors never download any editor JS — zero overhead

---

## Execution Order

```
Phase 1.1  DB content seeder + PageController
Phase 1.2  Blade section components (port Tailwind from React)
Phase 1.3  Blade landing page + route switch
Phase 1.4  Alpine.js for nav/mobile menu
Phase 1.5  Theme variables in Blade
Phase 1.6  Contact form (standard POST)
Phase 1.7  Cleanup public routes
---
Phase 2    Multi-page / single-page toggle (Blade-only, lets client choose layout)
---
Phase 3.1  Admin auth + edit mode overlay
Phase 3.2  Inline text editing + video management modal
Phase 3.3  React editor components
Phase 3.4  API endpoints
Phase 3.5  Vite editor bundle
```

> Phase 2 (layout toggle) comes before Phase 3 (admin editing) so the client can see and choose their preferred layout before we invest in the editing UI.

---

## Key Decisions to Make

1. **Alpine.js for interactivity?** — Recommended for mobile menu, dropdowns, theme toggle. Tiny footprint, no build step, pairs well with Blade.
2. **Keep Inertia for auth pages?** — Yes. Login/register/profile are admin-only and already work. No reason to rewrite.
3. **Content fallback strategy** — DB is the source of truth from day one (Phase 1). `fallback.json` is only used if the DB is unreachable (emergency fallback). Seeder populates the DB with current fallback.json content.
4. **Layout toggle timing** — Decided: Phase 2 (before admin editing) so client can compare layouts first.

---

## Files That Will Change

### New Files (Phase 1)
```
resources/views/layouts/public.blade.php
resources/views/pages/landing.blade.php
resources/views/components/sections/hero.blade.php
resources/views/components/sections/features.blade.php
resources/views/components/sections/testimonials.blade.php
resources/views/components/sections/packages.blade.php
resources/views/components/sections/contact-form.blade.php
resources/views/components/sections/section-headline.blade.php
resources/views/components/nav/header.blade.php
database/seeders/PageContentSeeder.php
database/migrations/xxxx_add_sort_order_to_page_sections_table.php
app/Services/PageContentService.php
```

### Modified Files (Phase 1)
```
routes/web.php
app/Http/Controllers/PageController.php
app/Http/Controllers/ContactController.php (add redirect-back for Blade)
```

### New/Modified Files (Phase 2 — Layout Toggle)
```
database/migrations/xxxx_create_site_settings_table.php
app/Models/SiteSetting.php
routes/web.php (conditional routing based on layout mode)
resources/views/components/nav/header.blade.php (dynamic anchor vs. route links)
```

### New Files (Phase 3 — Admin Editing)
```
resources/js/Editors/InlineTextEditor.tsx
resources/js/Editors/TextStyleToolbar.tsx
resources/js/Editors/AdminToolbar.tsx
resources/js/Editors/SectionEditor.tsx
resources/js/Editors/VideoManagerModal.tsx
resources/js/Editors/editor-mount.ts
resources/js/editors.tsx (Vite entry point)
database/migrations/xxxx_add_is_admin_to_users_table.php
app/Http/Middleware/AdminMiddleware.php
```

### Preserved (No Changes)
```
resources/js/Pages/Auth/*        (stay as Inertia)
resources/js/Pages/Profile/*     (stay as Inertia)
resources/js/Pages/Dashboard.tsx (stay as Inertia)
resources/views/app.blade.php    (still used by Inertia auth pages)
```

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Contact form loses Inertia's inline validation UX | Use standard POST + redirect with validation errors in session. Can enhance with Alpine.js for client-side validation later. |
| TikTok/YouTube embeds need JS | Blade renders static thumbnails; small vanilla JS (or Alpine) handles click-to-load iframe — same pattern as current React components. |
| Theme toggle needs JS | Alpine.js handles this trivially (< 10 lines). |
| Mobile menu needs JS | Alpine.js `x-show` / `x-transition` replaces HeadlessUI Dialog. |
