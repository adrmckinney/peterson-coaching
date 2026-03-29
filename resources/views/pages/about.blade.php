<x-layouts.public>
    @if(isset($sections['landing_hero']))
        <x-sections.hero :settings="$sections['landing_hero']['settings']" :showNav="true" />
    @endif
</x-layouts.public>
