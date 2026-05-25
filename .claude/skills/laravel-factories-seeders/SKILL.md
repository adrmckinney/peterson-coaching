---
name: laravel-factories-seeders
description: Use when creating or editing model factories (database/factories/**) or seeders (database/seeders/**). Triggers on "factory", "seeder", "fake data", "test data", "factory state", "DatabaseSeeder".
---

# Factories & Seeders

## Factories

### Create

```bash
php artisan make:factory FooFactory --model=Foo --no-interaction
```

### Template (project convention)

```php
<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Foo>
 */
class FooFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'  => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
        ];
    }

    public function admin(): static
    {
        return $this->state(['role' => 'admin']);
    }
}
```

### Conventions

- `fake()` helper, not `$this->faker`. Match project convention (check sibling factories — UserFactory etc.).
- Always include the `@extends` PHPDoc — required for IDE/static analysis to resolve the generic.
- `@return array<string, mixed>` on `definition()`.
- Add **states** for common variants: `admin()`, `published()`, `unverified()`. Return `static`.
- Use `fake()->unique()` for fields with unique constraints.
- Reference real-looking fake data (`fake()->safeEmail()`, `fake()->company()`) not lorem-only strings.

### Usage in tests/seeders

```php
User::factory()->create();                            // single
User::factory()->count(10)->create();                 // many
User::factory()->admin()->create();                   // with state
User::factory()->for($page)->create();                // belongs-to relation
User::factory()->has(Post::factory()->count(3))->create();  // has-many
```

Prefer factory states over passing attribute arrays. Override only when the test needs a specific value:

```php
User::factory()->admin()->create(['email' => 'admin@test.com']);
```

## Seeders

### Create

```bash
php artisan make:seeder PageSeeder --no-interaction
```

### Template

```php
<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        Page::factory()->count(5)->create();
    }
}
```

### Register

In `database/seeders/DatabaseSeeder.php`:

```php
public function run(): void
{
    $this->call([
        PageSeeder::class,
        PageSectionSeeder::class,
    ]);
}
```

Order matters when seeders depend on each other (parent before child).

### Run

```bash
php artisan db:seed                          # runs DatabaseSeeder
php artisan db:seed --class=PageSeeder       # specific
php artisan migrate:fresh --seed             # wipe + migrate + seed
```

## When to use which

- **Factory**: every model that's referenced in tests or seeders. No exception.
- **Seeder**: for dev fixtures or first-run data (theme settings, default pages). Not for test data — tests use factories directly.

## Don't

- Don't put real data, secrets, or production-shaped values in factories — use `fake()`.
- Don't manually set IDs in factories — let auto-increment work.
- Don't seed test databases from `DatabaseSeeder` — `RefreshDatabase` re-runs migrations only.
- Don't forget the `@extends` PHPDoc on factory classes.
