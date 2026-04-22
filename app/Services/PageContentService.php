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
     * Maps section types to their JSON source key and any extra static settings.
     * Fields from the JSON source are passed through as-is.
     *
     * @var array<string, array{key: string, extra?: array<string, mixed>}>
     */
    private array $fallbackSectionMap = [
        'landing_hero' => [
            'key' => 'landing_intro',
            'extra' => ['hero_image' => '/images/ingaOnSidewalk.jpg'],
        ],
        'intro_video_section_title' => ['key' => 'intro_video_section_title'],
        'intro_video_gallery' => ['key' => 'intro_video_gallery'],
        'testimonials_section' => ['key' => 'testimonials_section'],
        'packages_section' => ['key' => 'packages_section'],
        'contact_section' => ['key' => 'contact_section'],
    ];

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

        $sections = [];
        $sortOrder = 0;

        foreach ($this->fallbackSectionMap as $type => $config) {
            $settings = $json[$config['key']] ?? [];

            if (isset($config['extra'])) {
                $settings = array_merge($settings, $config['extra']);
            }

            $sections[] = $this->makeFallbackSection($type, $settings, $sortOrder);
            $sortOrder++;
        }

        return [
            'page' => null,
            'sections' => collect($sections),
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
