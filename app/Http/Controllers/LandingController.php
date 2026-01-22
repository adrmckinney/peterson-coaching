<?php

namespace App\Http\Controllers;

use App\Http\Requests\PatchLandingIntroRequest;
use App\Models\Page;
use App\Models\PageSection;
use App\Models\Video;
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
            'isEditable' => false,
        ]);
    }

    public function edit()
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

    public function patchSection(PatchLandingIntroRequest $request, Page $page, PageSection $section)
    {
        $section->settings = $request->validated();
        $section->save();

        return response()->json([
            'section' => $section->fresh(),
        ]);
    }
}
