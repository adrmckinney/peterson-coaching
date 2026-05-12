@props([
    'page' => 'landing',
])

@php
    $business = config('seo.business');
    $defaults = config('seo.defaults');
    $pageMeta = config("seo.pages.{$page}", []);

    $title = ($pageMeta['title'] ?? $business['name']).$defaults['title_suffix'];
    $description = $pageMeta['description'] ?? $business['description'];
    $keywords = $pageMeta['keywords'] ?? null;
    $canonical = url()->current();
    $image = $business['url'].($pageMeta['image'] ?? $defaults['image']);

    $areaServed = collect($business['area_served'] ?? [])
        ->map(fn (string $area): array|string => strcasecmp($area, 'Worldwide') === 0
            ? 'Worldwide'
            : ['@type' => 'Place', 'name' => $area])
        ->all();

    $contactUrl = $business['contact_url'] ?: route('contact');

    $localBusinessSchema = array_filter([
        '@context' => 'https://schema.org',
        '@type' => 'ProfessionalService',
        'name' => $business['name'],
        'description' => $business['description'],
        'url' => $business['url'],
        'logo' => $business['url'].$business['logo'],
        'image' => $business['url'].$business['image'],
        'serviceType' => $business['service_type'] ?? null,
        'areaServed' => ! empty($areaServed) ? $areaServed : null,
        'contactPoint' => [
            '@type' => 'ContactPoint',
            'contactType' => 'customer support',
            'url' => $contactUrl,
        ],
        'sameAs' => ! empty($business['social']) ? $business['social'] : null,
    ]);
@endphp

<title>{{ $title }}</title>
<meta name="description" content="{{ $description }}">
@if($keywords)
    <meta name="keywords" content="{{ $keywords }}">
@endif
<link rel="canonical" href="{{ $canonical }}">

<meta property="og:type" content="website">
<meta property="og:site_name" content="{{ $business['name'] }}">
<meta property="og:title" content="{{ $title }}">
<meta property="og:description" content="{{ $description }}">
<meta property="og:url" content="{{ $canonical }}">
<meta property="og:image" content="{{ $image }}">

<meta name="twitter:card" content="{{ $defaults['twitter_card'] }}">
<meta name="twitter:title" content="{{ $title }}">
<meta name="twitter:description" content="{{ $description }}">
<meta name="twitter:image" content="{{ $image }}">

<script type="application/ld+json">
{!! json_encode($localBusinessSchema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) !!}
</script>
