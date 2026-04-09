{{-- Full scroll layout: all sections stacked. Used by every public route on sm+. --}}
@if(isset($sections['landing_hero']))
    <x-sections.hero :settings="$sections['landing_hero']['settings']" />
@endif

@if(isset($sections['intro_video_section_title']) && isset($sections['intro_video_gallery']))
    <x-sections.features
        :titleSettings="$sections['intro_video_section_title']['settings']"
        :gallerySettings="$sections['intro_video_gallery']['settings']"
    />
@endif

@if(isset($sections['testimonials_section']))
    <x-sections.testimonials :settings="$sections['testimonials_section']['settings']" />
@endif

@if(isset($sections['packages_section']))
    <x-sections.packages :settings="$sections['packages_section']['settings']" />
@endif

@if(isset($sections['contact_section']))
    <x-sections.contact-form :settings="$sections['contact_section']['settings']" />
@endif
