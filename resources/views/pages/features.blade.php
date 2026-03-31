<x-layouts.public>
    <x-nav.topbar />

    @if(isset($sections['intro_video_section_title']) && isset($sections['intro_video_gallery']))
        <x-sections.features
            :titleSettings="$sections['intro_video_section_title']['settings']"
            :gallerySettings="$sections['intro_video_gallery']['settings']"
        />
    @endif
</x-layouts.public>
