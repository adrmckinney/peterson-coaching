<?php

namespace Database\Seeders;

use App\Enums\PageSlugs;
use App\Enums\Platform;
use App\Models\Page;
use App\Models\Video;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            [
                'slug' => PageSlugs::LANDING->value,
                'title' => 'Landing',
                'is_published' => true,
            ],
            [
                'slug' => PageSlugs::INTRO_VIDEOS->value,
                'title' => 'Intro Videos',
                'is_published' => true,
            ],

        ];

        foreach ($pages as $page) {
            Page::create($page);
        }
    }
}
