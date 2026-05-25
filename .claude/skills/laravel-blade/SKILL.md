---
name: laravel-blade
description: Use when editing Blade templates in resources/views/**. Triggers on *.blade.php files, "blade", "component", "x-component", "@props", "@include", layout, partial, slot.
---

# Laravel Blade (project conventions)

This project uses Blade for the public site (resources/views/pages/) and Inertia/React for the admin/app. Blade work covers: pages, components, layouts, partials, emails.

## Directory structure

```
resources/views/
├── components/
│   ├── layouts/        # x-layouts.public etc.
│   ├── nav/            # @include('components.nav.header')
│   └── sections/       # x-sections.hero etc.
├── emails/
├── pages/              # about, contact, features, landing, packages, testimonials
├── partials/           # @include('partials.scroll-content')
├── app.blade.php
└── sitemap.blade.php
```

## Page template

```blade
<x-layouts.public page="landing">
    <div class="sm:hidden">
        @if(isset($sections['landing_hero']))
            <x-sections.hero :settings="$sections['landing_hero']['settings']" />
        @endif
    </div>

    <div class="hidden sm:block">
        @include('partials.scroll-content')
    </div>
</x-layouts.public>
```

## Component (x-component syntax preferred)

```blade
@props(['settings' => []])

<section {{ $attributes->merge(['class' => 'py-8']) }}>
    {{ $slot }}
</section>
```

Create components with:

```bash
php artisan make:component Sections/Hero --view --no-interaction
```

## Conventions

- **Always use `<x-...>` for reusable UI**, not `@component`/`@include` except for non-parameterized partials.
- **`@props([...])`** at top of every component, listing every prop with default.
- **Pass props with `:`** when dynamic: `:settings="$sections['hero']['settings']"`.
- **Slot for content**, `@props` for config.
- **Mobile-first responsive**: base classes for mobile, `sm:` / `md:` / `lg:` for larger.
- **Alpine.js for interactivity** (already loaded via CDN in layout). Use `x-data`, `x-show`, `@click`, etc.
- **Vite for CSS/JS**: `@vite(['resources/css/app.css'])`.
- **Routes via name**: `{{ route('contact.store') }}`, never hardcoded paths.

## Forms

- CSRF: `@csrf` immediately after `<form>` tag.
- Method spoofing: `@method('PUT')` / `@method('DELETE')`.
- Error display: `@error('field') <p class="text-red-600">{{ $message }}</p> @enderror`.
- Old input: `value="{{ old('field') }}"`.
- Honeypot pattern in use — see `tests/Feature/ContactControllerTest.php` for `website` field.

## Layout pattern

The single layout is `<x-layouts.public page="...">`. It owns:
- Doctype + `<head>` + favicons + fonts + `@vite` + Alpine CDN
- Nav header (`@include('components.nav.header')`)
- `<main>` with sr-only `<h1>` + `{{ $slot }}`
- SEO via `<x-seo :page="$page" />` — config-driven from `config/seo.php`

Don't duplicate this. Add new pages by wrapping content in `<x-layouts.public page="...">`.

## Don't

- No inline `<style>` — Tailwind only, see `tailwind-v3` skill
- No raw HTML where an x-component exists (check `components/sections/` first)
- No `{!! $foo !!}` unless the value is sanitized — XSS risk
- No PHP heavy logic in templates — push to controller/view composer
- No new layout files without approval — the one layout is intentional
