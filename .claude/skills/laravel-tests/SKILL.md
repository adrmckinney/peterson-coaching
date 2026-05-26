---
name: laravel-tests
description: Use when writing or modifying PHPUnit tests in this Laravel 12 project. Triggers on tests/Feature/**, tests/Unit/**, `php artisan test`, "write a test", "add coverage", or any request that touches test files.
---

# Laravel Tests (PHPUnit)

PHPUnit only. No Pest. If you see Pest syntax, convert to PHPUnit.

## Create test files

```bash
php artisan make:test ContactControllerTest          # Feature (default)
php artisan make:test --unit ContactValidatorTest    # Unit
```

Most tests should be Feature tests.

## Conventions (match existing project)

- Namespace: `Tests\Feature` or `Tests\Unit`
- Extends `Tests\TestCase`
- Method names: snake_case prefixed `test_` — `test_contact_form_validates_required_fields`
- Return type `: void` on test methods
- `use RefreshDatabase` for any DB-touching test
- Always use `route('name', ...)` over hardcoded paths
- `Mail::fake()` / `Notification::fake()` / `Queue::fake()` before triggering
- Assert with `assertDatabaseHas` / `assertDatabaseMissing` / `assertSessionHasErrors` / `assertRedirect` / `assertSessionHas`
- `postJson` for AJAX-shaped requests, `post` for form
- Use factories, never `Model::create()` for setup data: `User::factory()->create()`
- Use factory states before manual attribute setting

## Test all three paths

Happy + failure + weird (honeypot, rate limit, missing config, DB unavailable). Reference `tests/Feature/ContactControllerTest.php` for the pattern.

## Running tests

Minimum first, full suite only when asked.

```bash
php artisan test --compact tests/Feature/ContactControllerTest.php   # single file
php artisan test --compact --filter=test_contact_form_validates_required_fields
php artisan test --compact                                            # full
```

Run a single test immediately after editing it. Ask before running the full suite.

## Test enforcement rule

Every code change needs a test (new or updated) that passes before finalizing. No exceptions.

## Don't

- Don't `DB::table(...)` in assertions — use `assertDatabaseHas`
- Don't delete or rename existing tests without explicit approval
- Don't use Tinker or one-off scripts to "verify" — write the test instead
- Don't mock the DB; use `RefreshDatabase` + sqlite
