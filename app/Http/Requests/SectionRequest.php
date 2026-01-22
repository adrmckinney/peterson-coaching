<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Replace later with policies
        return true;
    }

    /**
     * Common reusable validation bags
     */
    protected function layoutRules(string $prefix = 'layout'): array
    {
        return [
            "{$prefix}" => ['sometimes', 'array'],

            "{$prefix}.padding" => ['sometimes', 'array'],
            "{$prefix}.padding.top" => ['nullable', 'string'],
            "{$prefix}.padding.left" => ['nullable', 'string'],
            "{$prefix}.padding.right" => ['nullable', 'string'],
            "{$prefix}.padding.bottom" => ['nullable', 'string'],

            "{$prefix}.maxWidth" => ['nullable', 'string'],

            "{$prefix}.alignment" => ['sometimes', 'array'],
            "{$prefix}.alignment.vertical" => ['nullable', 'in:top,center,bottom'],
            "{$prefix}.alignment.horizontal" => ['nullable', 'in:left,center,right'],
        ];
    }

    protected function textBlockRules(string $prefix): array
    {
        return array_merge([
            "{$prefix}" => ['sometimes', 'array'],
            "{$prefix}.id" => ['required_with:' . $prefix, 'string'],
            "{$prefix}.text" => ['required_with:' . $prefix, 'string'],
        ], $this->layoutRules("{$prefix}.layout"));
    }

    protected function textBlockCollectionRules(string $prefix): array
    {
        return array_merge([
            "{$prefix}" => ['sometimes', 'array'],
            "{$prefix}.*.id" => ['required_with:' . $prefix, 'string'],
            "{$prefix}.*.text" => ['required_with:' . $prefix, 'string'],
        ], $this->layoutRules("{$prefix}.*.layout"));
    }
}
