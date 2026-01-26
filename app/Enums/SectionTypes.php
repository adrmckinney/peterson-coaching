<?php

namespace App\Enums;

enum SectionTypes: string
{
    case LANDING_BRAND_ICON = 'landing_icon';
    case LANDING_INTRO = 'landing_intro';
    case INTRO_VIDEO_SECTION_TITLE = 'intro_video_section_title';
    case INTRO_VIDEO_GALLERY = 'intro_video_gallery';
}
