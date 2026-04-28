<x-layouts.public>
    {{-- Mobile (< sm): mobile header + features section. --}}
    <div class="sm:hidden">
        <x-nav.mobile-header />

        @if(isset($sections['intro_video_section_title']) && isset($sections['intro_video_gallery']))
            <x-sections.features
                :titleSettings="$sections['intro_video_section_title']['settings']"
                :gallerySettings="$sections['intro_video_gallery']['settings']"
            />
        @endif
    </div>

    {{-- Desktop (sm+): full scroll layout. --}}
    <div class="hidden sm:block">
        @include('partials.scroll-content')
    </div>
</x-layouts.public>
