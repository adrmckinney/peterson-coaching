@props(['mobile' => false, 'dark' => false])

@php
    $isPages = ($layoutMode ?? 'scroll') === 'pages';

    $navItems = [
        ['label' => 'About', 'scroll' => '/#about', 'route' => 'about'],
        ['label' => 'Videos', 'scroll' => '/#features', 'route' => 'features'],
        ['label' => 'Testimonials', 'scroll' => '/#testimonials', 'route' => 'testimonials'],
        ['label' => 'Packages', 'scroll' => '/#packages', 'route' => 'packages'],
        ['label' => 'Contact', 'scroll' => '/#contact', 'route' => 'contact'],
    ];

    if ($mobile) {
        $baseClass = '-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5';
    } elseif ($dark) {
        $baseClass = 'text-sm/6 font-semibold text-gray-900 hover:text-gray-600';
    } else {
        $baseClass = 'text-sm/6 font-semibold text-gray-900 dark:text-white hover:text-tertiary';
    }
@endphp

@foreach($navItems as $item)
    <a
        href="{{ $isPages ? route($item['route']) : $item['scroll'] }}"
        class="{{ $baseClass }}"
    >
        {{ $item['label'] }}
    </a>
@endforeach
