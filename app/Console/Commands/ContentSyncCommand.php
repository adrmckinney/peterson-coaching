<?php

namespace App\Console\Commands;

use App\Models\Page;
use App\Models\PageSection;
use Illuminate\Console\Command;

class ContentSyncCommand extends Command
{
    protected $signature = 'content:sync';

    protected $description = 'Sync page sections from resources/content/fallback.json into the database';

    /**
     * Maps section types to their JSON source key and any extra static settings.
     * Fields from the JSON source are passed through as-is.
     *
     * @var array<string, array{key: string, extra?: array<string, mixed>}>
     */
    private array $sectionMap = [
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

    public function handle(): int
    {
        $path = resource_path('content/fallback.json');

        if (! file_exists($path)) {
            $this->error('Fallback JSON not found at: ' . $path);

            return self::FAILURE;
        }

        $json = json_decode(file_get_contents($path), true);

        $page = Page::firstOrCreate(
            ['slug' => 'landing'],
            ['title' => 'Landing', 'is_published' => true],
        );

        $sortOrder = 0;

        foreach ($this->sectionMap as $type => $config) {
            $jsonSection = $json[$config['key']] ?? null;

            if (! $jsonSection) {
                $this->warn("Skipping {$type}: key '{$config['key']}' not found in fallback.json");

                continue;
            }

            $settings = $jsonSection;

            if (isset($config['extra'])) {
                $settings = array_merge($settings, $config['extra']);
            }

            PageSection::updateOrCreate(
                ['page_id' => $page->id, 'type' => $type],
                [
                    'settings' => $settings,
                    'visible' => true,
                    'sort_order' => $sortOrder,
                ],
            );

            $this->info("Synced: {$type} (sort_order: {$sortOrder})");
            $sortOrder++;
        }

        $this->info('Content sync complete.');

        return self::SUCCESS;
    }
}
