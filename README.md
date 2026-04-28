# Peterson Coaching & Consulting

A coaching website for Inga Peterson, built with Laravel 12, Blade templates, Tailwind CSS 3, and Alpine.js. The site uses a responsive dual layout: a scroll layout on `sm`+ viewports and a hamburger-driven multi-page layout on mobile.

## Tech Stack

- **Backend**: Laravel 12, PHP 8.4
- **Frontend (public pages)**: Blade templates, Tailwind CSS 3, Alpine.js (CDN)
- **Frontend (admin/auth pages)**: React 18, Inertia.js v2, TypeScript (retained for Phase 3)
- **Database**: SQLite (local), MySQL optional for production
- **Build tools**: Vite 7, Yarn

## Local Development Setup

### Prerequisites

- PHP 8.4+
- Composer
- Node.js + Yarn
- SQLite (default) or MySQL

### First-time Setup

```bash
composer install
yarn install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
yarn run build
```

### Running the App

You need **two terminals**:

```bash
# Terminal 1 — Laravel dev server
php artisan serve

# Terminal 2 — Vite dev server (hot reload for Blade + CSS changes)
yarn run dev
```

Visit `http://127.0.0.1:8000`

> **Note**: `composer run dev` (the old Inertia/React command) is no longer the primary way to run the app. The public site is Blade-rendered, so `php artisan serve` + `yarn run dev` is the correct workflow.

### Building for Production

```bash
yarn run build
```

This compiles CSS and JS into `public/build/`. The Blade pages reference these built assets via `@vite(['resources/css/app.css'])`.

## Layout

The layout is fully responsive — there is no user-facing toggle.

- **Mobile (`< sm`, < 640px)**: Pages layout. Each section lives at its own route (`/`, `/about`, `/features`, `/testimonials`, `/packages`, `/contact`). Navigation is via a hamburger menu overlay.
- **Desktop (`sm` and up)**: Scroll layout. All sections stack vertically on a single page. Visiting any of the pages-mode routes (`/about`, `/features`, etc.) on desktop renders the same scroll layout, so links shared from mobile still work.

Both layouts are rendered server-side from the same Blade views using Tailwind responsive classes (`sm:hidden` / `hidden sm:block`).

## Content Management

All page content is stored in the `page_sections` database table, seeded from `resources/content/fallback.json`. The `PageContentService` fetches content from the database and falls back to the JSON file if the database is unreachable.

### Seeding Content

```bash
php artisan migrate:fresh --seed
```

This creates the `pages` and `page_sections` tables and populates them with content from `fallback.json`.

## Deployment (Laravel Cloud)

The app is deployed on Laravel Cloud using SQLite (no managed database needed).

**Environment variables for Laravel Cloud:**

```
DB_CONNECTION=sqlite
DB_DATABASE=/tmp/database.sqlite
SESSION_DRIVER=cookie
CACHE_STORE=file
QUEUE_CONNECTION=sync
```

**Deploy command:**

```
touch /tmp/database.sqlite && php artisan migrate --force && php artisan db:seed --force
```

## Running Tests

```bash
php artisan test
```

## Project Structure

See `docs/architecture.md` for detailed information about the app architecture, retained React code, and the phased refactor plan.
