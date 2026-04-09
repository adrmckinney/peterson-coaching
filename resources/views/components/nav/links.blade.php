@props(['mobile' => false])

@php
    $navItems = [
        ['label' => 'About', 'route' => 'about'],
        ['label' => 'Videos', 'route' => 'features'],
        ['label' => 'Testimonials', 'route' => 'testimonials'],
        ['label' => 'Packages', 'route' => 'packages'],
        ['label' => 'Contact', 'route' => 'contact'],
    ];

    $baseClass = $mobile
        ? '-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
        : 'text-sm/6 font-semibold text-gray-900 hover:text-tertiary';
@endphp

@foreach($navItems as $item)
    <a href="{{ route($item['route']) }}" class="{{ $baseClass }}">
        {{ $item['label'] }}
    </a>
@endforeach
