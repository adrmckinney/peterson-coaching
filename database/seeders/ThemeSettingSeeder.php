<?php

namespace Database\Seeders;

use App\Models\ThemeSetting;
use Illuminate\Database\Seeder;

class ThemeSettingSeeder extends Seeder
{
    public function run(): void
    {
        $themes = [
            // ─────────────────────────
            // Core brand colors
            // ─────────────────────────
            [
                'key' => 'background',
                'value' => '#000d16',
                'type' => 'color',
            ],
            [
                'key' => 'onBackground',
                'value' => 'oklch(96.7% 0.003 264.542)',
                'type' => 'color',
            ],
            [
                'key' => 'surface',
                'value' => '#0a1a24',
                'type' => 'color',
            ],
            [
                'key' => 'onSurface',
                'value' => '#f6f7ec',
                'type' => 'color',
            ],
            [
                'key' => 'primary',
                'value' => '#000d16', // black
                'type' => 'color',
            ],
            [
                'key' => 'onPrimary',
                'value' => 'oklch(96.7% 0.003 264.542)', // light text
                'type' => 'color',
            ],
            [
                'key' => 'primaryHover',
                'value' => '#0a1a24',
                'type' => 'color',
            ],

            [
                'key' => 'secondary',
                'value' => 'oklch(70.4% 0.04 256.788)', // slate-400
                'type' => 'color',
            ],
            [
                'key' => 'onSecondary',
                'value' => '#000d16', // dark text on light bg
                'type' => 'color',
            ],
            [
                'key' => 'secondaryHover',
                'value' => 'oklch(75.5% 0.04 256.788)',
                'type' => 'color',
            ],

            // ─────────────────────────
            // Accent colors
            // ─────────────────────────
            [
                'key' => 'primaryAccent',
                'value' => '#014421', // green
                'type' => 'color',
            ],
            [
                'key' => 'onPrimaryAccent',
                'value' => '#ffffff',
                'type' => 'color',
            ],
            [
                'key' => 'primaryAccentHover',
                'value' => '#026b34',
                'type' => 'color',
            ],

            [
                'key' => 'secondaryAccent',
                'value' => '#f6f7ec', // light gray
                'type' => 'color',
            ],
            [
                'key' => 'onSecondaryAccent',
                'value' => '#000d16',
                'type' => 'color',
            ],

            // ─────────────────────────
            // Brand / component-specific
            // ─────────────────────────
            [
                'key' => 'brandBannerBg',
                'value' => '#000d16',
                'type' => 'color',
            ],
            [
                'key' => 'brandBannerPCC',
                'value' => '#014421',
                'type' => 'color',
            ],
            [
                'key' => 'brandBannerName',
                'value' => '#f6f7ec',
                'type' => 'color',
            ],

            [
                'key' => 'buttonPrimary',
                'value' => '#014421',
                'type' => 'color',
            ],
        ];

        foreach ($themes as $theme) {
            ThemeSetting::updateOrCreate(
                ['key' => $theme['key']],
                $theme
            );
        }
    }
}
