<?php

namespace App\Http\Controllers;

use App\Http\Middleware\DetectLayoutMode;
use App\Services\PageContentService;
use Illuminate\Http\Request;
use Illuminate\View\View;

class PageController extends Controller
{
    public function __construct(private PageContentService $contentService) {}

    /**
     * Display the landing/home page.
     * In scroll mode: renders all sections.
     * In pages mode: renders only the hero section.
     */
    public function landing(Request $request): View
    {
        $sections = $this->getAllSections();
        $layoutMode = $request->session()->get(DetectLayoutMode::SESSION_KEY, DetectLayoutMode::SCROLL);

        if ($layoutMode === DetectLayoutMode::PAGES) {
            return view('pages.home', [
                'sections' => $sections,
            ]);
        }

        return view('pages.landing', [
            'sections' => $sections,
        ]);
    }

    /**
     * About page — hero intro paragraphs (pages mode only).
     */
    public function about(): View
    {
        return view('pages.about', [
            'sections' => $this->getAllSections(),
        ]);
    }

    /**
     * Features/videos page (pages mode only).
     */
    public function features(): View
    {
        return view('pages.features', [
            'sections' => $this->getAllSections(),
        ]);
    }

    /**
     * Testimonials page (pages mode only).
     */
    public function testimonials(): View
    {
        return view('pages.testimonials', [
            'sections' => $this->getAllSections(),
        ]);
    }

    /**
     * Packages page (pages mode only).
     */
    public function packages(): View
    {
        return view('pages.packages', [
            'sections' => $this->getAllSections(),
        ]);
    }

    /**
     * Contact page (pages mode only).
     */
    public function contact(): View
    {
        return view('pages.contact', [
            'sections' => $this->getAllSections(),
        ]);
    }

    /**
     * @return array<string, array>
     */
    private function getAllSections(): array
    {
        $data = $this->contentService->getPageContent('landing');

        return $this->contentService->getSectionsByType($data['sections']);
    }
}
