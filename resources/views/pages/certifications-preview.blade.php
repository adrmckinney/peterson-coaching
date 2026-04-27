{{-- Temporary preview page for comparing certification section designs. Delete once a variant is chosen. --}}
<x-layouts.public>
    @php
        $variants = [
            ['id' => 'variant-1', 'label' => 'Variant 1 — Featured + Grid', 'component' => 'certifications-featured'],
            ['id' => 'variant-2', 'label' => 'Variant 2 — Vertical Timeline', 'component' => 'certifications-timeline'],
            ['id' => 'variant-3', 'label' => 'Variant 3 — Badge Wall', 'component' => 'certifications-badges'],
            ['id' => 'variant-4', 'label' => 'Variant 4 — Split Layout', 'component' => 'certifications-split'],
        ];
    @endphp

    {{-- Sticky variant nav --}}
    <div class="sticky top-0 z-30 bg-surface/95 backdrop-blur border-b border-onSurface/10">
        <div class="mx-auto max-w-7xl px-6 lg:px-8 py-3 flex flex-wrap items-center gap-2">
            <span class="text-xs font-semibold uppercase tracking-widest text-tertiary mr-2">Jump to:</span>
            @foreach($variants as $v)
                <a href="#{{ $v['id'] }}"
                   class="text-xs sm:text-sm font-medium text-onSurface/80 hover:text-tertiary px-3 py-1.5 rounded-full ring-1 ring-onSurface/15 hover:ring-tertiary transition">
                    {{ $v['label'] }}
                </a>
            @endforeach
        </div>
    </div>

    @foreach($variants as $v)
        <section id="{{ $v['id'] }}" class="border-t border-onPrimary/10 first:border-t-0">
            <div class="mx-auto max-w-7xl px-6 lg:px-8 pt-10">
                <div class="inline-flex items-center gap-3 rounded-full bg-tertiary/10 ring-1 ring-tertiary/30 px-4 py-1.5">
                    <span class="h-2 w-2 rounded-full bg-tertiary"></span>
                    <span class="text-sm font-semibold text-tertiary tracking-wide">{{ $v['label'] }}</span>
                </div>
            </div>
            <x-dynamic-component :component="'sections.' . $v['component']" />
        </section>
    @endforeach
</x-layouts.public>
