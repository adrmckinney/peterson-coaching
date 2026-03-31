<x-layouts.public>
    <x-nav.topbar />

    @if(isset($sections['landing_hero']))
        <x-sections.hero :settings="$sections['landing_hero']['settings']" />
    @endif
</x-layouts.public>
