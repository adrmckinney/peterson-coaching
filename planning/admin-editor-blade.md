# Admin Editor (Blade) Plan

## Goal

Give the client (Inga) a simple authenticated admin section at `/admin` where she can:
- Add, remove, reorder, and edit her videos.
- Add, remove, reorder, and edit her packages (pricing tiers).

Pure Blade — no React, no inline editing, no JSON-blob wrangling. Standard `index / create / edit / update / destroy / reorder` Laravel CRUD per resource.

This supersedes `planning/refactor-for-blade.md`'s Phase 3 (React inline editing). That approach is no longer needed.

## Current State (verified)

- Public Blade site is already in place (`PageController` + `PageContentService` + `resources/views/components/sections/**`).
- `videos` table exists with the right columns: `id, page_section_id, title, description, platform, external_id, url, embedded_id, thumbnail_url, duration_seconds, is_published, published_at, sort_order, timestamps`.
- `Video` model is bare — needs `$fillable`, `sort_order` scope, and possibly relationships cleaned up.
- `VideoController` exists as an empty stub.
- No `Package` model, no `packages` table — packages currently live in `page_sections.settings` JSON (seeded from `fallback.json` by `php artisan content:sync`).
- `User` model has no `is_admin` column.
- `AdminController` exists but only handles theme updates.
- No admin middleware. No admin Blade views.
- Auth pages (login / register / forgot password) are still Inertia/React from Breeze — they work fine, leave them alone.

## Phase A — Auth & Admin Shell

- [ ] Migration: `add_is_admin_to_users_table` — `boolean is_admin default false`.
- [ ] Update `User` model: add `is_admin` to `$fillable`, cast to `boolean`.
- [ ] Seed Inga's user (or a dev user) with `is_admin = true` in `DatabaseSeeder` / `DevDatabaseSeeder`.
- [ ] Create `app/Http/Middleware/AdminMiddleware.php` — checks `auth()->check() && auth()->user()->is_admin`, else `abort(403)`.
- [ ] Register middleware alias `admin` in `bootstrap/app.php`.
- [ ] Create `resources/views/layouts/admin.blade.php` — minimal admin chrome (logout link, nav to Videos / Packages, flash message slot).
- [ ] Create `resources/views/admin/dashboard.blade.php` — simple landing with two cards: "Manage Videos" and "Manage Packages".
- [ ] Routes (in `routes/web.php`, grouped under `prefix('admin')->middleware(['auth', 'admin'])->name('admin.')`):
  - `GET /admin` → admin dashboard.

## Phase B — Videos CRUD

- [ ] Fill in `Video` model: `$fillable`, `casts` (`is_published` => boolean, `published_at` => datetime), `scopeOrdered()` (orderBy sort_order).
- [ ] `VideoFactory` + `VideoSeeder` (verify existing seeder still works after model changes).
- [ ] `app/Http/Requests/StoreVideoRequest.php` + `UpdateVideoRequest.php` — validate `title`, `platform` (in:tiktok,youtube), `url`, `external_id`, `thumbnail_url`, `is_published`, etc.
- [ ] Fill in `VideoController` with `index, create, store, edit, update, destroy, reorder` (or wire up a new `Admin/VideoController`).
- [ ] `reorder` endpoint: accept `[{id, sort_order}, …]`, batch update inside a transaction.
- [ ] Blade views:
  - `resources/views/admin/videos/index.blade.php` — table of videos, up/down arrows for reorder (no JS lib needed; submits to reorder route), edit/delete buttons.
  - `resources/views/admin/videos/create.blade.php` — form (title, platform select, url, thumbnail upload or URL, is_published checkbox).
  - `resources/views/admin/videos/edit.blade.php` — same form populated.
- [ ] Routes (under `admin.` group):
  - `Route::resource('videos', VideoController::class)`
  - `Route::post('videos/reorder', [VideoController::class, 'reorder'])->name('videos.reorder')`
- [ ] Public site reads from videos table via existing `PageContentService` — no public-side changes needed (already pulls ordered videos for the gallery section).

## Phase C — Packages Migration to Dedicated Table

- [ ] Migration: `create_packages_table` — `id, name, slug, price (string), price_sub_text, image, href, description, features (json), cta, sort_order, is_published, timestamps`.
- [ ] `Package` model: `$fillable`, `casts: ['features' => 'array', 'is_published' => 'boolean']`, `scopeOrdered()`, `scopePublished()`.
- [ ] `PackageFactory` + `PackageSeeder`.
- [ ] **One-time data migration**: write a `php artisan packages:migrate-from-json` console command (or one-shot seeder) that reads existing `page_sections.settings.tiers` (or `fallback.json` `packages_section.tiers`), inserts a row per tier into the new `packages` table. Run once, then delete the command.
- [ ] Update `PageContentService` to fetch `Package::ordered()->published()->get()` when assembling the packages section data instead of reading from `page_sections.settings`. Update `resources/views/components/sections/packages.blade.php` to read from a `$packages` prop instead of `$settings->tiers`.
- [ ] Update `resources/views/pages/packages.blade.php` accordingly.
- [ ] Remove the `packages_section` row from the seeder (still keep the section_headline row if used for "Packages" title — or fold the heading into the packages component).
- [ ] Update `fallback.json` — drop `packages_section.tiers` (or keep as emergency fallback if `Package::count() === 0`).

## Phase D — Packages CRUD (mirrors Phase B)

- [ ] `app/Http/Requests/StorePackageRequest.php` + `UpdatePackageRequest.php`.
- [ ] `app/Http/Controllers/Admin/PackageController.php` with full CRUD + `reorder`.
- [ ] Blade views: `admin/packages/index|create|edit.blade.php` — same pattern as videos.
- [ ] Routes: `Route::resource('packages', PackageController::class)` + reorder route, both under `admin.` group.

## Phase E — Polish

- [ ] Image uploads: decide between Laravel storage (local disk → `storage/app/public/`) with `php artisan storage:link`, or pasting an image URL. For Inga's workflow, upload is friendlier — add a single-file upload field with size/dimension validation.
- [ ] Flash messages on every action (success/error).
- [ ] Confirmation modal (Alpine.js — already loaded in public layout) on destroy.
- [ ] Mobile-friendly admin views (Tailwind responsive — Inga may admin from her phone).

## Files Changed (high level)

New:
```
app/Http/Middleware/AdminMiddleware.php
app/Http/Controllers/Admin/VideoController.php       (or fill the existing stub)
app/Http/Controllers/Admin/PackageController.php
app/Http/Requests/StoreVideoRequest.php
app/Http/Requests/UpdateVideoRequest.php
app/Http/Requests/StorePackageRequest.php
app/Http/Requests/UpdatePackageRequest.php
app/Models/Package.php
database/migrations/*_add_is_admin_to_users_table.php
database/migrations/*_create_packages_table.php
database/factories/PackageFactory.php
database/seeders/PackageSeeder.php
app/Console/Commands/MigratePackagesFromJson.php    (one-shot, deletable after run)
resources/views/layouts/admin.blade.php
resources/views/admin/dashboard.blade.php
resources/views/admin/videos/{index,create,edit}.blade.php
resources/views/admin/packages/{index,create,edit}.blade.php
```

Modified:
```
app/Models/User.php                                  (is_admin)
app/Models/Video.php                                 (fillable, casts, scopes)
app/Http/Controllers/VideoController.php             (CRUD impl — or move to Admin/)
app/Services/PageContentService.php                  (pull packages from new table)
resources/views/components/sections/packages.blade.php (read from $packages prop)
resources/views/pages/packages.blade.php
routes/web.php                                       (admin route group)
bootstrap/app.php                                    (admin middleware alias)
database/seeders/DatabaseSeeder.php                  (admin user + initial packages)
resources/content/fallback.json                      (drop packages_section.tiers, or keep as emergency fallback)
```

## Verification

- [ ] Log in as Inga, visit `/admin`, see dashboard.
- [ ] Add a new video → it appears on `/` and `/features`.
- [ ] Reorder videos → public order reflects change.
- [ ] Delete a video → gone from public.
- [ ] Edit a package → public `/packages` shows new copy.
- [ ] Log out, visit `/admin/videos` → 403.
- [ ] Visit `/admin/videos` while logged in as a non-admin user → 403.
- [ ] Full test suite green: `php artisan test --compact`.

## Open Questions (drill down later)

- Image upload destination — local disk + `storage:link`, or external (S3-compatible) bucket? Local works for Laravel Cloud as long as it's on the same persistent volume as the sqlite DB.
- Should `is_admin` be granular (e.g. `can_edit_videos`, `can_edit_packages`) or single boolean? Single boolean is enough for two admins; revisit if a third role appears.
- Do we want a soft-delete on videos/packages (recover from accidental deletes), or hard-delete with a confirm modal?
