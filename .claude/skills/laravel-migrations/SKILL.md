---
name: laravel-migrations
description: Use when creating or editing database migrations in database/migrations/**. Triggers on "migration", "schema", "alter table", "add column", "drop column", "modify column", "foreign key", "index".
---

# Laravel Migrations (Laravel 12 + SQLite)

This project uses **SQLite** for dev. SQLite has quirks that bite migrations — see "SQLite gotchas" below.

## Create

```bash
php artisan make:migration create_foos_table --no-interaction
php artisan make:migration add_status_to_foos_table --no-interaction
php artisan make:migration alter_foos_change_email_nullable --no-interaction
```

Naming: `create_<table>_table`, `add_<col>_to_<table>_table`, `alter_<table>_<change>`.

## Template (anonymous class — Laravel 12 style)

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('page_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('page_id')->constrained()->cascadeOnDelete();
            $table->string('type');
            $table->json('settings');
            $table->boolean('visible')->default(true);
            $table->unsignedInteger('sort_order')->default(0);
            $table->datetimes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_sections');
    }
};
```

## Conventions

- `$table->id()` for primary key (bigint unsigned, auto-increment).
- `foreignId('foo_id')->constrained()->cascadeOnDelete()` over manual `foreign()->references()->on()`.
- `$table->datetimes()` (Laravel 12 shortcut) over `$table->timestamps()` when you want `datetime` not `timestamp` semantics.
- `json` column for structured settings, with model cast `'settings' => 'array'`.
- Always implement `down()` — usually `Schema::dropIfExists(...)` or inverse op.
- Constants/enums for `type`-like string columns belong in PHP enums (see `php` rules in CLAUDE.md).

## ⚠️ CRITICAL: modify-column gotcha

When using `$table->{type}('col')->change()`, you **must restate every attribute** the column originally had. Anything omitted is dropped.

```php
// WRONG — drops nullable, default, length
$table->string('email')->change();

// RIGHT — restate everything
$table->string('email', 191)->nullable()->default(null)->change();
```

## SQLite gotchas

- SQLite can't `dropColumn` multiple columns in one Blueprint call without doctrine/dbal — drop one at a time or use a fresh table copy.
- SQLite can't change column type for an existing column with constraints — usually need to recreate the table.
- Foreign key constraints require `PRAGMA foreign_keys = ON;` — Laravel handles it, but raw operations can bypass.
- `json` column on SQLite is stored as TEXT. Querying inside JSON works via `->` operator but is slower.

## Run

```bash
php artisan migrate                       # apply pending
php artisan migrate --pretend             # dry-run SQL
php artisan migrate:rollback              # roll back last batch
php artisan migrate:fresh --seed          # WIPES DB, re-runs all, seeds
php artisan migrate:status                # what's applied
```

`migrate:fresh` is destructive — confirm with user before running on anything other than local sqlite.

## Test impact

Migration changes need a test that exercises the new schema (column read/write, foreign key constraint, default value). Use `RefreshDatabase` — it re-applies all migrations per test class.

## Don't

- Don't edit a migration that's already been run in any non-local environment. Write a new one.
- Don't `dropColumn` without a `down()` that restores it.
- Don't add a non-nullable column to a populated table without a default OR a backfill step.
- Don't use `DB::statement('ALTER TABLE ...')` unless Blueprint genuinely can't do it.
