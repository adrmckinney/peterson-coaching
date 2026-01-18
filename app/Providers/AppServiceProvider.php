<?php

namespace App\Providers;

use App\Models\ThemeSetting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('theme', function () {
            return Cache::rememberForever('theme_settings', function () {
                return ThemeSetting::pluck('value', 'key');
            });
        });

        Vite::prefetch(concurrency: 3);
    }
}
