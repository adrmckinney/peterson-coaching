<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Video>
 */
class VideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->jobTitle(),
            'description' => $this->faker->paragraph(1),
            'platform' => 'tiktok',
            'external_id' => 1,
            'url' => $this->faker->url(),
            'embedded_id' => 'embedded_id',
            'thumbnail_url' => $this->faker->url(),
            'duration_seconds' => $this->faker->time('ss'),
            'is_published' => true,
            'published_at' => now(),
            'sort_order' => 0,
        ];
    }
}
