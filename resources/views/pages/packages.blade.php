<x-layouts.public>
    <x-nav.topbar />

    @if(isset($sections['packages_section']))
        <x-sections.packages :settings="$sections['packages_section']['settings']" />
    @endif
</x-layouts.public>
