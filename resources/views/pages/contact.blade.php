<x-layouts.public>
    <x-nav.topbar />

    @if(isset($sections['contact_section']))
        <x-sections.contact-form :settings="$sections['contact_section']['settings']" />
    @endif
</x-layouts.public>
