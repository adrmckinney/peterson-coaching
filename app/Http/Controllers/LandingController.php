<?php

namespace App\Http\Controllers;

use App\Http\Requests\PatchLandingIntroRequest;
use App\Models\Page;
use App\Models\PageSection;
use Inertia\Inertia;

class LandingController extends Controller
{
    public function index()
    {
        $pages = Page::all();
        $sections = PageSection::with(['videos' => function ($q) {
            $q->orderBy('sort_order');
        }])->get();

        $sections = $sections->map(function ($section) {
            if ($section->type === 'video_section_gallery') {
                return [
                    ...$section->toArray(),
                    'settings' => [
                        'videos' => $section->videos->map(fn($v) => [
                            'id' => $v->id,
                            'title' => $v->title,
                            'description' => $v->description,
                            'platform' => $v->platform,
                            'url' => $v->url,
                            'sort_order' => $v->sort_order,
                        ]),
                    ],
                ];
            }

            return $section;
        });

        return Inertia::render('Landing', [
            'pages' => $pages,
            'sections' => $sections,
            'isEditable' => false,
        ]);
    }

    public function edit()
    {
        $pages = Page::all();
        $sections = PageSection::with(['videos' => function ($q) {
            $q->orderBy('sort_order');
        }])->get();

        $sections = $sections->map(function ($section) {
            if ($section->type === 'video_section_gallery') {
                return [
                    ...$section->toArray(),
                    'settings' => [
                        'videos' => $section->videos->map(fn($v) => [
                            'id' => $v->id,
                            'title' => $v->title,
                            'description' => $v->description,
                            'platform' => $v->platform,
                            'url' => $v->url,
                            'sort_order' => $v->sort_order,
                        ]),
                    ],
                ];
            }

            return $section;
        });

        return Inertia::render('Landing', [
            'pages' => $pages,
            'sections' => $sections,
            'isEditable' => true,
        ]);
    }

    public function patchSection(PatchLandingIntroRequest $request, Page $page, PageSection $section)
    {
        $section->settings = $request->validated();
        $section->save();

        return response()->json([
            'section' => $section->fresh(),
        ]);
    }
}
