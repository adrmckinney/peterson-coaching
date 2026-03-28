<?php

namespace App\Services;

use App\Models\Page;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class PageContentService
{
    /**
     * Get all visible sections for a page by slug, ordered by sort_order.
     * Falls back to fallback.json if the DB is unreachable.
     *
     * @return array{page: Page|null, sections: Collection|array}
     */
    public function getPageContent(string $slug): array
    {
        try {
            $page = Page::where('slug', $slug)
                ->where('is_published', true)
                ->with(['sections' => function ($query) {
                    $query->where('visible', true)->orderBy('sort_order');
                }])
                ->first();

            if ($page) {
                return [
                    'page' => $page,
                    'sections' => $page->sections,
                ];
            }
        } catch (\Throwable $e) {
            Log::warning('Failed to load page from DB, using fallback', [
                'slug' => $slug,
                'exception' => $e->getMessage(),
            ]);
        }

        return $this->getFallbackContent();
    }

    /**
     * Get a keyed array of section settings from a sections collection.
     * Keyed by section type for easy access in Blade templates.
     *
     * @return array<string, array>
     */
    public function getSectionsByType(Collection $sections): array
    {
        $result = [];

        foreach ($sections as $section) {
            $result[$section->type] = [
                'id' => $section->id,
                'settings' => $section->settings,
                'visible' => $section->visible,
                'sort_order' => $section->sort_order,
            ];
        }

        return $result;
    }

    /**
     * Emergency fallback: read from fallback.json and return
     * a structure compatible with the DB-based flow.
     *
     * @return array{page: null, sections: array}
     */
    private function getFallbackContent(): array
    {
        $json = json_decode(
            file_get_contents(resource_path('content/fallback.json')),
            true,
        );

        return [
            'page' => null,
            'sections' => collect([
                $this->makeFallbackSection('landing_hero', [
                    'paragraphs' => $json['landing_intro']['paragraphs'],
                    'hero_image' => '/images/ingaOnSidewalk.jpg',
                ], 0),
                $this->makeFallbackSection('intro_video_section_title', [
                    'headline' => $json['intro_video_section_title']['headline'],
                ], 1),
                $this->makeFallbackSection('intro_video_gallery', [
                    'videos' => $json['intro_video_gallery']['videos'],
                ], 2),
                $this->makeFallbackSection('testimonials_section', [
                    'headline' => $json['testimonials_section']['headline'],
                    'testimonials' => $json['testimonials_section']['testimonials'],
                ], 3),
                $this->makeFallbackSection('packages_section', [
                    'headline' => $json['packages_section']['headline'],
                    'tiers' => $json['packages_section']['tiers'],
                ], 4),
                $this->makeFallbackSection('contact_section', [
                    'headline' => $json['contact_section']['headline'],
                    'form' => $json['contact_section']['form'],
                ], 5),
            ]),
        ];
    }

    /**
     * Create a stdClass that mimics a PageSection model for fallback use.
     */
    private function makeFallbackSection(string $type, array $settings, int $sortOrder): object
    {
        return (object) [
            'id' => null,
            'type' => $type,
            'settings' => $settings,
            'visible' => true,
            'sort_order' => $sortOrder,
        ];
    }
}
