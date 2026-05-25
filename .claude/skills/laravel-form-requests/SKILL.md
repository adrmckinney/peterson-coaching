---
name: laravel-form-requests
description: Use when creating or editing Form Request validation classes in app/Http/Requests/**. Triggers on "validation", "validate", "FormRequest", "rules", "authorize", "messages", controller validation.
---

# Form Requests (project conventions)

This project validates via Form Request classes, not inline `$request->validate(...)` in controllers.

## Create

```bash
php artisan make:request StoreFooRequest --no-interaction
```

Naming: `Store<Foo>Request`, `Update<Foo>Request`, `Patch<Foo>Request`. Place in `app/Http/Requests/` (or `app/Http/Requests/<Subdir>/` mirroring controller namespace).

## Template (matches project)

```php
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Replace later with policies
        return true;
    }

    /**
     * @return array<string, array<int, string>>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:100'],
            'last_name'  => ['required', 'string', 'max:100'],
            'email'      => ['required', 'email', 'max:255'],
            'message'    => ['required', 'string', 'max:5000'],
            'website'    => ['nullable', 'string'], // honeypot
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'message.required' => 'Please enter a message.',
        ];
    }
}
```

## Rules format

**Array-based, not pipe-string.** Project convention is `['required', 'string', 'max:100']`, NOT `'required|string|max:100'`. Check sibling Form Request files before deviating.

## Reusable rule fragments

For complex nested validation (settings, layout configs), use protected helper methods that return rule arrays — see `app/Http/Requests/SectionRequest.php` for pattern:

```php
protected function layoutRules(string $prefix = 'layout'): array
{
    return [
        "{$prefix}" => ['sometimes', 'array'],
        "{$prefix}.padding.top" => ['nullable', 'string'],
        // ...
    ];
}

public function rules(): array
{
    return array_merge(
        ['type' => ['required', 'string']],
        $this->layoutRules(),
    );
}
```

## Use in controller

```php
public function store(StoreContactRequest $request): RedirectResponse
{
    $data = $request->validated();
    Contact::create($data);
    return redirect()->route('contact.index');
}
```

- `$request->validated()` returns only validated fields, not the raw input.
- `$request->safe()->only(['email'])` for partial pulls.

## Custom messages

Add `messages()` for user-facing strings. Add `attributes()` to rename field labels in error output (e.g. `'first_name' => 'First name'`).

## Authorization

- `authorize(): bool` — return `true` for public endpoints with a comment `// Replace later with policies` matching project convention.
- For protected endpoints, use policies: `return $this->user()->can('update', $this->route('foo'));`.

## Test impact

Every Form Request needs a test asserting validation errors:

```php
public function test_contact_form_validates_required_fields(): void
{
    $response = $this->post(route('contact.store'), []);
    $response->assertSessionHasErrors(['first_name', 'last_name', 'email', 'message']);
}
```

For JSON endpoints: `$response->assertStatus(422)->assertJsonValidationErrors([...])`.

## Don't

- Don't validate in the controller — push to Form Request.
- Don't use pipe-string rules in this project (`'required|email'`) — array form only.
- Don't put authorization in the controller when `authorize()` can handle it.
- Don't forget `nullable` on optional fields — `sometimes` and `nullable` are different.
