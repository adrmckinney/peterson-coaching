<?php

namespace App\Http\Requests;

class PatchLandingIntroRequest extends SectionRequest
{
    public function rules(): array
    {
        return array_merge(
            $this->textBlockRules('headline'),
            $this->textBlockCollectionRules('paragraphs'),
            $this->layoutRules('layout'),
        );
    }
}
