---
name: laravel-backend
description: Use for general backend Laravel work — controllers, routes, services, middleware, jobs, mail, config, validation flow. Triggers on app/Http/Controllers/**, routes/**, app/Mail/**, app/Jobs/**, app/Providers/**, bootstrap/app.php, config/**.
---

# Laravel Backend (project-wide conventions)

Laravel 12 streamlined structure. No `app/Http/Kernel.php`, no `app/Console/Kernel.php`.

## Where things live

| Concern | File |
|---|---|
| Middleware register | `bootstrap/app.php` → `withMiddleware()` |
| Exceptions | `bootstrap/app.php` → `withExceptions()` |
| Service providers | `bootstrap/providers.php` |
| Console commands | `app/Console/Commands/` (auto-registered) |
| Console schedule | `routes/console.php` |
| Web routes | `routes/web.php` |
| Auth routes | `routes/auth.php` |
| Config | `config/*.php` — never `env()` outside config files |

## Controllers

- Thin. Validation in Form Request, business logic in service/model.
- Use `make:controller` + `--resource` or `--invokable` as appropriate.
- Return `Inertia::render(...)`, `redirect()->route(...)`, `response()->json(...)`, or `view(...)` — match what surrounding controllers do.
- Inject Form Request: `public function store(StoreFooRequest $request)`.

```bash
php artisan make:controller FooController --resource --no-interaction
```

## Routes

- Named routes always: `Route::post('/contact', ...)->name('contact.store');`
- Reference via `route('contact.store')` — never hardcoded URLs in views, redirects, or tests.
- Group middleware: `Route::middleware(['auth'])->group(...)`

## Config & env

- `config('app.name')` — never `env('APP_NAME')` outside `config/*.php`.
- New config key? Add to a `config/foo.php` file with sane defaults from `env('FOO_KEY', 'default')`.

## Mail

- `php artisan make:mail FooMail --markdown=emails.foo` or `--view`.
- Recipients from config, never hardcoded: `config('contact.recipients')`.
- Test with `Mail::fake()` + `Mail::assertSent(FooMail::class, fn ($mail) => $mail->hasTo(...))`.

## Jobs / Queues

- Time-consuming work goes in a Job implementing `ShouldQueue`.

```bash
php artisan make:job ProcessFoo --no-interaction
```

## Auth

- Sanctum installed. Use Laravel gates/policies for authorization, not inline `if ($user->id === ...)` checks.
- `php artisan make:policy FooPolicy --model=Foo`.

## PHP rules (project-wide)

- PHP 8.4. Constructor property promotion only.
- Return types and parameter types on every method.
- Curly braces on every control structure, even single-line.
- PHPDoc over inline comments. Inline comments only when logic is genuinely complex.
- Array shape PHPDoc on array params/returns when useful.

## Before finalizing any backend change

1. Tests written/updated and passing.
2. `vendor/bin/pint --dirty --format agent` to format.
3. Never `vendor/bin/pint --test` — just run `pint` to fix.

## Don't

- No `env()` outside config files
- No `DB::` over Eloquent unless complex
- No middleware in `Kernel.php` (doesn't exist in Laravel 12)
- No new top-level folders without approval
- No dependency adds without approval
