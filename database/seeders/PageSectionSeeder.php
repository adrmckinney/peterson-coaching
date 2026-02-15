<?php

namespace Database\Seeders;

use App\Enums\PageSlugs;
use App\Enums\SectionTypes;
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
        $landingPageId = $pages->firstWhere('slug', PageSlugs::LANDING->value)?->id;
        $introVideoPage = $pages->firstWhere('slug', PageSlugs::INTRO_VIDEOS->value)?->id;

        $landingSections = [
            [
                'page_id' => $landingPageId,
                'type' => SectionTypes::LANDING_BRAND_ICON->value,
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
                'page_id' => $landingPageId,
                'type' => SectionTypes::LANDING_INTRO->value,
                'visible' => true,
                'settings' => [
                    'layout' => $layout,

                    // 'headline' => $textBlock("Hi, I'm Inga."),

                    'paragraphs' => [
                        $textBlock(
                            "Graduation doesn’t just mark an ending. It dismantles the structure your life has been built around."
                        ),
                        $textBlock(
                            "For years, there’s been a clear framework for how life works — who to be, where to be, what comes next, how progress happens."
                        ),
                        $textBlock(
                            "Then that framework disappears."
                        ),
                        $textBlock(
                            "You’re suddenly making decisions, about work, money, where to live, and what matters, without a map and while pressure, comparison, and outside expectations drown out your own clarity."
                        ),
                        $textBlock(
                            "You’re expected to move forward anyway. To decide. To choose. To figure it out."
                        ),
                        $textBlock(
                            "All while your foundation is still shifting."
                        ),
                        $textBlock(
                            "I’m a post-grad transition coach with 25+ years of experience working with college seniors and recent grads."
                        ),
                        $textBlock(
                            "I help you stay connected to yourself in a threshold season where everything is changing so you can think clearly, choose deliberately, and move forward in a way that feels true to who you’re becoming."
                        ),
                    ],
                ],
            ],
        ];

        $videoSection = [
            [
                'page_id' => $introVideoPage,
                'type' => SectionTypes::INTRO_VIDEO_SECTION_TITLE->value,
                'visible' => true,
                'settings' => [
                    'layout' => $layout,
                    'headline' => $textBlock("About Me and My Work")
                ],
            ],
            [
                'page_id' => $introVideoPage,
                'type' => SectionTypes::INTRO_VIDEO_GALLERY->value,
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
