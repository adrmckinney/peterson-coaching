<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\PageSection;
use App\Models\Video;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $videos = Video::all();
        $pages = Page::all();
        $sections = PageSection::all();

        return Inertia::render("Landing", [
            'pages' => $pages,
            'sections' => $sections,
            'videos' => $videos,
            'isEditable' => true,
        ]);
    }

    public function patchIntro(Request $request, Page $page, PageSection $section)
    {
        $validated = $request->validate([
            'headline' => ['sometimes', 'array'],
            'headline.id' => ['required:with_headline', 'string'],
            'headline.text' => ['required:with_headline', 'string'],
            'headline.layout' => ['required:with_headline', 'array'],
            'headline.layout.padding.top' => ['nullable', 'string'],
            'headline.layout.padding.left' => ['nullable', 'string'],
            'headline.layout.padding.right' => ['nullable', 'string'],
            'headline.layout.padding.bottom' => ['nullable', 'string'],
            'headline.layout.maxWidth' => ['nullable', 'string'],
            'headline.layout.alignment.vertical' => ['nullable', 'in:top,center,bottom'],
            'headline.layout.alignment.horizontal' => ['nullable', 'in:left,center,right'],

            'paragraphs' => ['sometimes', 'array'],
            'paragraphs.*.id' => ['required:with_headline', 'string'],
            'paragraphs.*.text' => ['required:with_headline', 'string'],
            'paragraphs.*.layout' => ['required:with_headline', 'array'],
            'paragraphs.*.layout.padding.top' => ['nullable', 'string'],
            'paragraphs.*.layout.padding.left' => ['nullable', 'string'],
            'paragraphs.*.layout.padding.right' => ['nullable', 'string'],
            'paragraphs.*.layout.padding.bottom' => ['nullable', 'string'],
            'paragraphs.*.layout.maxWidth' => ['nullable', 'string'],
            'paragraphs.*.layout.alignment.vertical' => ['nullable', 'in:top,center,bottom'],
            'paragraphs.*.layout.alignment.horizontal' => ['nullable', 'in:left,center,right'],

            'layout' => ['sometimes', 'array'],
            'layout.padding' => ['sometimes', 'array'], // Probably should be present with an empty array
            'layout.padding.top' => ['nullable', 'string'],
            'layout.padding.left' => ['nullable', 'string'],
            'layout.padding.right' => ['nullable', 'string'],
            'layout.padding.bottom' => ['nullable', 'string'],

            'layout.maxWidth' => ['nullable', 'string'],

            'layout.alignment' => ['sometimes', 'array'],
            'layout.alignment.vertical' => ['nullable', 'in:top,center,bottom'],
            'layout.alignment.horizontal' => ['nullable', 'in:left,center,right'],
        ]);

        // Settings is JSON so just replace the entire thing
        // I think those values left empty should be removed from the final before save.
        $section->update([
            'settings' => $validated
        ]);

        return response()->json([
            'section' => $section->fresh(),
        ]);
    }
}
