<?php

namespace App\Http\Controllers;

use App\Services\PageContentService;
use Illuminate\View\View;

class PageController extends Controller
{
    public function __construct(private PageContentService $contentService) {}

    /**
     * Display the landing page using Blade.
     */
    public function landing(): View
    {
        $data = $this->contentService->getPageContent('landing');
        $sections = $this->contentService->getSectionsByType($data['sections']);

        return view('pages.landing', [
            'sections' => $sections,
        ]);
    }
}
