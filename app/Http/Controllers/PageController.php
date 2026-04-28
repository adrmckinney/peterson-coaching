<?php

namespace App\Http\Controllers;

use App\Services\PageContentService;
use Illuminate\View\View;

class PageController extends Controller
{
    public function __construct(private PageContentService $contentService) {}

    public function landing(): View
    {
        return $this->renderPage('landing');
    }

    public function about(): View
    {
        return $this->renderPage('about');
    }

    public function features(): View
    {
        return $this->renderPage('features');
    }

    public function testimonials(): View
    {
        return $this->renderPage('testimonials');
    }

    public function packages(): View
    {
        return $this->renderPage('packages');
    }

    public function contact(): View
    {
        return $this->renderPage('contact');
    }

    private function renderPage(string $view): View
    {
        return view("pages.{$view}", [
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
