<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\Video;
use Illuminate\Database\Seeder;

class PageContentSeeder extends Seeder
{
    /**
     * Seed the landing page content from fallback.json into the database.
     */
    public function run(): void
    {
        $content = json_decode(
            file_get_contents(resource_path('content/fallback.json')),
            true,
        );

        $page = Page::create([
            'slug' => 'landing',
            'title' => 'Landing',
            'is_published' => true,
        ]);

        $sortOrder = 0;

        // Hero / Intro
        $page->sections()->create([
            'type' => 'landing_hero',
            'settings' => [
                'paragraphs' => $content['landing_intro']['paragraphs'],
                'hero_image' => '/images/ingaOnSidewalk.jpg',
            ],
            'visible' => true,
            'sort_order' => $sortOrder++,
        ]);

        // Video section title
        $page->sections()->create([
            'type' => 'intro_video_section_title',
            'settings' => [
                'headline' => $content['intro_video_section_title']['headline'],
            ],
            'visible' => true,
            'sort_order' => $sortOrder++,
        ]);

        // Video gallery
        $videoGallery = $page->sections()->create([
            'type' => 'intro_video_gallery',
            'settings' => [
                'videos' => $content['intro_video_gallery']['videos'],
            ],
            'visible' => true,
            'sort_order' => $sortOrder++,
        ]);

        // Also create actual Video records linked to this section
        foreach ($content['intro_video_gallery']['videos'] as $videoData) {
            Video::create([
                'page_section_id' => $videoGallery->id,
                'title' => $videoData['title'],
                'description' => $videoData['description'] ?? null,
                'platform' => $videoData['platform'],
                'external_id' => $videoData['external_id'],
                'url' => $videoData['url'],
                'thumbnail_url' => $videoData['thumbnail_url'],
                'sort_order' => $videoData['sort_order'],
            ]);
        }

        // Testimonials
        $page->sections()->create([
            'type' => 'testimonials_section',
            'settings' => [
                'headline' => $content['testimonials_section']['headline'],
                'testimonials' => $content['testimonials_section']['testimonials'],
            ],
            'visible' => true,
            'sort_order' => $sortOrder++,
        ]);

        // Packages
        $page->sections()->create([
            'type' => 'packages_section',
            'settings' => [
                'headline' => $content['packages_section']['headline'],
                'tiers' => $content['packages_section']['tiers'],
            ],
            'visible' => true,
            'sort_order' => $sortOrder++,
        ]);

        // Contact
        $page->sections()->create([
            'type' => 'contact_section',
            'settings' => [
                'headline' => $content['contact_section']['headline'],
                'form' => $content['contact_section']['form'],
            ],
            'visible' => true,
            'sort_order' => $sortOrder++,
        ]);
    }
}
