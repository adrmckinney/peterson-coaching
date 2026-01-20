<?php

namespace Database\Seeders;

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
                'slug' => 'landing',
                'title' => 'Landing',
                'is_published' => true,
            ],
            [
                'slug' => 'videos',
                'title' => 'Videos',
                'is_published' => true,
            ],

        ];

        foreach ($pages as $page) {
            Page::create($page);
        }
    }
}
