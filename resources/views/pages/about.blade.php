<x-layouts.public>
    {{-- Mobile (< sm): hero (about content). --}}
    <div class="sm:hidden">
        @if(isset($sections['landing_hero']))
            <x-sections.hero :settings="$sections['landing_hero']['settings']" />
        @endif
    </div>

    {{-- Desktop (sm+): full scroll layout. --}}
    <div class="hidden sm:block">
        @include('partials.scroll-content')
    </div>
</x-layouts.public>
