<x-layouts.public>
    <x-nav.topbar />

    @if(isset($sections['testimonials_section']))
        <x-sections.testimonials :settings="$sections['testimonials_section']['settings']" />
    @endif
</x-layouts.public>
