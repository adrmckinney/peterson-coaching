<x-layouts.public>
    {{-- Mobile (< sm): mobile header + testimonials section. --}}
    <div class="sm:hidden">
        <x-nav.mobile-header />

        @if(isset($sections['testimonials_section']))
            <x-sections.testimonials :settings="$sections['testimonials_section']['settings']" />
        @endif
    </div>

    {{-- Desktop (sm+): full scroll layout. --}}
    <div class="hidden sm:block">
        @include('partials.scroll-content')
    </div>
</x-layouts.public>
