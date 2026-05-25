---
name: laravel-eloquent
description: Use when defining or modifying Eloquent models, relationships, queries, or scopes in app/Models/**. Triggers on "model", "relationship", "query", "scope", "N+1", "eager load", "factory", or any change inside app/Models/.
---

# Laravel Eloquent

## Model file template (match project convention)

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PageSection extends Model
{
    /** @use HasFactory<\Database\Factories\PageSectionFactory> */
    use HasFactory;

    protected $fillable = ['settings', 'visible', 'sort_order', 'page_id', 'type'];

    protected $casts = [
        'settings' => 'array',
    ];

    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }

    public function videos(): HasMany
    {
        return $this->hasMany(Video::class);
    }
}
```

Rules:
- Always type-hint relationship return: `BelongsTo`, `HasMany`, `BelongsToMany`, `MorphTo`, etc.
- `HasFactory` requires PHPDoc `@use` line referencing factory class
- `$fillable` always set — no `$guarded = []`
- `$casts` as **property** (not `casts()` method) to match existing project convention
- Casts: `array`, `boolean`, `datetime`, `decimal:2`, `enum:App\Enums\Status`

## Query guidelines

- Never `DB::table()` — always `Model::query()` or relationship methods
- Eager load to kill N+1: `Page::with('sections.videos')->get()`
- Use Laravel 12 native limit on eager load: `$query->latest()->limit(10)`
- Use scopes for reusable query fragments: `public function scopeVisible(Builder $q): Builder`
- Use `firstOrFail` / `findOrFail` over `first()` + null check when caller expects a model

## Create models

```bash
php artisan make:model Foo -mfsc --no-interaction
# -m migration, -f factory, -s seeder, -c controller
```

Ask which extras (factory, seeder, migration, controller, policy, resource) before generating.

## Don't

- No raw `DB::` — Eloquent only unless query is genuinely too complex
- No `$model->save()` after `->update()` — `update()` already saves
- No `pluck()->toArray()` when you can `pluck()->all()`
- No fetching whole rows when you need IDs — use `->pluck('id')`
- No casts in both property AND `casts()` method — pick one (this project uses property)
