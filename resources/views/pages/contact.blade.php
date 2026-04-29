<x-layouts.public>
    {{-- Mobile (< sm): mobile header + contact form. --}}
    <div class="sm:hidden">
        <x-nav.mobile-header />

        @if(isset($sections['contact_section']))
            <x-sections.contact-form :settings="$sections['contact_section']['settings']" />
        @endif
    </div>

    {{-- Desktop (sm+): full scroll layout. --}}
    <div class="hidden sm:block">
        @include('partials.scroll-content')
    </div>
</x-layouts.public>
