<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\PageSection;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;

class PageSectionSeeder extends Seeder
{
    public function run(): void
    {
        $padding = [
            'top' => '',
            'right' => '',
            'bottom' => '',
            'left' => '',
        ];

        $alignment = [
            'horizontal' => 'left',
            'vertical' => 'top',
        ];

        $textBlock = fn(string $text = '') => [
            'text' => $text,
            'padding' => $padding,
            'id' => Uuid::uuid4(),
        ];

        $layout = [
            'alignment' => $alignment,
            'padding' => $padding,
            'maxWidth' => '',
        ];

        $pages = Page::all();
        $landingId = $pages->firstWhere('slug', 'landing')?->id;
        $videoId = $pages->firstWhere('slug', 'videos')?->id;

        $landingSections = [
            [
                'page_id' => $landingId,
                'type' => 'landing_icon',
                'visible' => true,
                'settings' => [
                    'layout' => $layout,
                    'icon' => [
                        'pccColor' => '',
                        'scriptColor' => '',
                        'size' => '',
                    ],
                ],
            ],
            [
                'page_id' => $landingId,
                'type' => 'landing_intro',
                'visible' => true,
                'settings' => [
                    'layout' => $layout,

                    'headline' => $textBlock("Hi, I'm Inga."),

                    'paragraphs' => [
                        $textBlock(
                            "I’m a post-grad transition coach with 25+ years of experience working with college seniors and recent grads."
                        ),
                        $textBlock(
                            "I help you stay connected to yourself in a threshold season where everything is changing — so you can think clearly, choose deliberately, and move forward in a way that feels true to who you’re becoming."
                        ),
                    ],
                ],
            ],
        ];

        $videoSection = [
            [
                'page_id' => $videoId,
                'type' => 'video_section_title',
                'visible' => true,
                'settings' => [
                    'layout' => $layout,
                    'headline' => $textBlock("About Me and My Work")
                ],
            ],
            [
                'page_id' => $videoId,
                'type' => 'video_gallery',
                'visible' => true,
                'settings' => [
                    'layout' => $layout,
                ],
            ],
        ];
        $sections = [...$landingSections, ...$videoSection];
        foreach ($sections as $section) {
            PageSection::create($section);
        }
    }
}
