<?php

namespace Database\Seeders;

use App\Enums\Platform;
use App\Enums\SectionTypes;
use App\Models\PageSection;
use App\Models\Video;
use Illuminate\Database\Seeder;

class VideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $introVideoSection = PageSection::where('type', SectionTypes::INTRO_VIDEO_GALLERY->value)->first();
        $videos = [
            [
                'page_section_id' => $introVideoSection->id,
                'url' => 'https://www.tiktok.com/@inga.peterson/video/7592828341716012301',
                'published_at' => now(),
                'title' => 'About Me and My Work',
                'platform' => Platform::TIK_TOK->value,
                'external_id' => '7592828341716012301',
                'thumbnail_url' => '/images/about-me-static.png',
                'sort_order' => 1,
            ],
            [
                'page_section_id' => $introVideoSection->id,
                'url' => 'https://www.tiktok.com/@inga.peterson/video/7594494048778390839',
                'published_at' => now(),
                'title' => 'Navigating the Post-Grad Transition',
                'platform' => Platform::TIK_TOK->value,
                'external_id' => '7594494048778390839',
                'thumbnail_url' => '/images/three-things-static.png',
                'sort_order' => 1,
            ],
            [
                'page_section_id' => $introVideoSection->id,
                'url' => 'https://www.tiktok.com/@inga.peterson/video/7597633314241006861',
                'published_at' => now(),
                'title' => 'The Cycle of Change and the Post-Grad Transition',
                'platform' => Platform::TIK_TOK->value,
                'external_id' => '7597633314241006861',
                'thumbnail_url' => '/images/cycle-of-change-static.png',
                'sort_order' => 1,
            ],
        ];

        foreach ($videos as $video) {
            Video::create($video);
        }

        // Video::factory()->count(3)->create();
    }
}
