<x-layouts.public>
    {{-- Mobile (< sm): mobile header + packages section. --}}
    <div class="sm:hidden">
        <x-nav.mobile-header />

        @if(isset($sections['packages_section']))
            <x-sections.packages :settings="$sections['packages_section']['settings']" />
        @endif
    </div>

    {{-- Desktop (sm+): full scroll layout. --}}
    <div class="hidden sm:block">
        @include('partials.scroll-content')
    </div>
</x-layouts.public>
