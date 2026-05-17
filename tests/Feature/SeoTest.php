<?php

namespace Tests\Feature;

use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class SeoTest extends TestCase
{
    /**
     * @return array<string, array{0: string, 1: string}>
     */
    public static function pages(): array
    {
        return [
            'landing' => ['landing', '/'],
            'about' => ['about', '/about'],
            'features' => ['features', '/features'],
            'testimonials' => ['testimonials', '/testimonials'],
            'packages' => ['packages', '/packages'],
            'contact' => ['contact', '/contact'],
        ];
    }

    #[DataProvider('pages')]
    public function test_page_renders_seo_meta_tags(string $pageKey, string $path): void
    {
        $response = $this->get($path);

        $response->assertOk();

        $pageMeta = config("seo.pages.{$pageKey}");
        $expectedTitle = $pageMeta['title'].config('seo.defaults.title_suffix');

        $response->assertSee('<title>'.e($expectedTitle).'</title>', false);
        $response->assertSee('name="description" content="'.e($pageMeta['description']).'"', false);
        $response->assertSee('rel="canonical"', false);
        $response->assertSee('property="og:title"', false);
        $response->assertSee('property="og:description"', false);
        $response->assertSee('property="og:image"', false);
        $response->assertSee('name="twitter:card"', false);
        $response->assertSee('application/ld+json', false);
    }

    #[DataProvider('pages')]
    public function test_page_includes_h1(string $pageKey, string $path): void
    {
        $response = $this->get($path);

        $response->assertOk();
        $response->assertSee('<h1', false);
        $response->assertSee(e(config("seo.pages.{$pageKey}.title")), false);
    }

    public function test_sitemap_returns_xml_with_all_routes(): void
    {
        $response = $this->get('/sitemap.xml');

        $response->assertOk();
        $this->assertStringStartsWith('application/xml', $response->headers->get('Content-Type'));

        $response->assertSee('<?xml version="1.0" encoding="UTF-8"?>', false);
        $response->assertSee('<urlset', false);

        foreach (['landing', 'about', 'features', 'testimonials', 'packages', 'contact'] as $name) {
            $response->assertSee(route($name), false);
        }
    }

    public function test_robots_txt_references_sitemap(): void
    {
        $contents = file_get_contents(public_path('robots.txt'));

        $this->assertNotFalse($contents);
        $this->assertStringContainsString('Sitemap:', $contents);
        $this->assertStringContainsString('sitemap.xml', $contents);
    }

    public function test_landing_json_ld_includes_business_data(): void
    {
        $response = $this->get('/');

        $response->assertOk();
        $response->assertSee('"@type": "ProfessionalService"', false);
        $response->assertSee(e(config('seo.business.name')), false);
    }

    public function test_json_ld_includes_area_served_and_service_type(): void
    {
        config()->set('seo.business.service_type', 'Online Coaching');
        config()->set('seo.business.area_served', ['Worldwide']);

        $response = $this->get('/');

        $response->assertOk();
        $response->assertSee('"serviceType": "Online Coaching"', false);
        $response->assertSee('"areaServed"', false);
        $response->assertSee('"Worldwide"', false);
    }

    public function test_json_ld_does_not_expose_address_fields(): void
    {
        $response = $this->get('/');

        $response->assertOk();
        $response->assertDontSee('PostalAddress', false);
        $response->assertDontSee('streetAddress', false);
        $response->assertDontSee('postalCode', false);
    }

    public function test_json_ld_does_not_expose_email(): void
    {
        $response = $this->get('/');

        $response->assertOk();

        $business = $this->extractGraphNode($response->getContent(), 'ProfessionalService');

        $this->assertNotNull($business);
        $this->assertArrayNotHasKey('email', $business);
        $this->assertStringNotContainsString('@peterson-coaching.com', json_encode($business));
    }

    public function test_json_ld_does_not_expose_telephone(): void
    {
        $response = $this->get('/');

        $response->assertOk();

        $business = $this->extractGraphNode($response->getContent(), 'ProfessionalService');

        $this->assertNotNull($business);
        $this->assertArrayNotHasKey('telephone', $business);
    }

    public function test_json_ld_includes_person_schema_for_founder(): void
    {
        $response = $this->get('/');

        $response->assertOk();

        $person = $this->extractGraphNode($response->getContent(), 'Person');

        $this->assertNotNull($person);
        $this->assertSame(config('seo.founder.name'), $person['name']);
        $this->assertSame(config('seo.founder.job_title'), $person['jobTitle']);
        $this->assertArrayHasKey('worksFor', $person);
    }

    public function test_json_ld_links_business_founder_to_person(): void
    {
        $response = $this->get('/');

        $response->assertOk();

        $business = $this->extractGraphNode($response->getContent(), 'ProfessionalService');
        $person = $this->extractGraphNode($response->getContent(), 'Person');

        $this->assertNotNull($business);
        $this->assertNotNull($person);
        $this->assertSame($person['@id'], $business['founder']['@id']);
        $this->assertSame($business['@id'], $person['worksFor']['@id']);
    }

    private function extractJsonLd(string $html): array
    {
        preg_match('/<script type="application\/ld\+json">(.*?)<\/script>/s', $html, $matches);

        return json_decode($matches[1] ?? '{}', true) ?? [];
    }

    private function extractGraphNode(string $html, string $type): ?array
    {
        $jsonLd = $this->extractJsonLd($html);

        foreach ($jsonLd['@graph'] ?? [] as $node) {
            if (($node['@type'] ?? null) === $type) {
                return $node;
            }
        }

        return null;
    }

    public function test_json_ld_uses_contact_point_url_instead_of_email(): void
    {
        $response = $this->get('/');

        $response->assertOk();
        $response->assertSee('"@type": "ContactPoint"', false);
        $response->assertSee('"contactType": "customer support"', false);
        $response->assertSee(route('contact'), false);
    }

    public function test_json_ld_maps_specific_cities_as_place_type(): void
    {
        config()->set('seo.business.area_served', ['Portland', 'Seattle']);

        $response = $this->get('/');

        $response->assertOk();
        $response->assertSee('"@type": "Place"', false);
        $response->assertSee('"name": "Portland"', false);
        $response->assertSee('"name": "Seattle"', false);
    }
}
