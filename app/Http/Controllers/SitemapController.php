<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * @var array<int, array{name: string, priority: string, changefreq: string}>
     */
    private const ROUTES = [
        ['name' => 'landing', 'priority' => '1.0', 'changefreq' => 'weekly'],
        ['name' => 'about', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ['name' => 'features', 'priority' => '0.8', 'changefreq' => 'monthly'],
        ['name' => 'testimonials', 'priority' => '0.7', 'changefreq' => 'monthly'],
        ['name' => 'packages', 'priority' => '0.9', 'changefreq' => 'monthly'],
        ['name' => 'contact', 'priority' => '0.6', 'changefreq' => 'yearly'],
    ];

    public function __invoke(): Response
    {
        $lastmod = now()->toAtomString();

        $urls = collect(self::ROUTES)->map(fn (array $r): array => [
            'loc' => route($r['name']),
            'lastmod' => $lastmod,
            'changefreq' => $r['changefreq'],
            'priority' => $r['priority'],
        ])->all();

        $xml = view('sitemap', ['urls' => $urls])->render();

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
