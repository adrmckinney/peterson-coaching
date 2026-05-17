<?php

return [

    'business' => [
        'name' => env('SEO_BUSINESS_NAME', 'Peterson Coaching & Consulting'),
        'legal_name' => env('SEO_BUSINESS_LEGAL_NAME', env('SEO_BUSINESS_NAME', 'Peterson Coaching & Consulting')),
        'description' => env('SEO_BUSINESS_DESCRIPTION', 'Personal and professional coaching with Inga Peterson. Empowering clients to achieve growth, clarity, and lasting change.'),
        'url' => env('APP_URL', 'https://peterson-coaching.com'),
        'logo' => env('SEO_BUSINESS_LOGO', '/images/brand-logo.jpeg'),
        'image' => '/images/ingaOnSidewalk.jpg',
        'contact_url' => env('SEO_BUSINESS_CONTACT_URL'),
        'service_type' => env('SEO_BUSINESS_SERVICE_TYPE', 'Online Coaching'),
        'area_served' => array_values(array_filter(array_map('trim', explode(',', (string) env('SEO_AREA_SERVED', 'Worldwide'))))),
        'social' => array_values(array_filter([
            env('SEO_SOCIAL_FACEBOOK'),
            env('SEO_SOCIAL_INSTAGRAM'),
            env('SEO_SOCIAL_LINKEDIN'),
            env('SEO_SOCIAL_TIKTOK'),
            env('SEO_SOCIAL_YOUTUBE'),
        ])),
    ],

    'founder' => [
        'name' => env('SEO_FOUNDER_NAME', 'Inga Peterson'),
        'job_title' => env('SEO_FOUNDER_JOB_TITLE', 'Coach & Consultant'),
        'image' => env('SEO_FOUNDER_IMAGE', '/images/ingaOnSidewalk.jpg'),
        'bio' => env('SEO_FOUNDER_BIO'),
    ],

    'defaults' => [
        'title_suffix' => ' | '.env('SEO_BUSINESS_NAME', 'Peterson Coaching & Consulting'),
        'image' => '/images/ingaOnSidewalk.jpg',
        'twitter_card' => 'summary_large_image',
    ],

    'pages' => [
        'landing' => [
            'title' => 'Personal & Professional Coaching with Inga Peterson',
            'description' => 'Work with Inga Peterson to unlock clarity, growth, and lasting change through personal and professional coaching.',
            'keywords' => 'life coaching, personal coaching, professional coaching, career coaching, Inga Peterson',
        ],
        'about' => [
            'title' => 'About Inga Peterson — Coach & Consultant',
            'description' => 'Meet Inga Peterson — a certified coach helping clients build clarity, confidence, and direction.',
            'keywords' => 'about Inga Peterson, certified coach, coaching consultant',
        ],
        'features' => [
            'title' => 'Coaching Services & Features',
            'description' => 'Discover the coaching services Peterson Coaching offers — tailored sessions for individuals and professionals.',
            'keywords' => 'coaching services, coaching features, personal development',
        ],
        'testimonials' => [
            'title' => 'Client Testimonials',
            'description' => 'Hear from clients about their coaching experience with Inga Peterson.',
            'keywords' => 'coaching testimonials, client reviews, success stories',
        ],
        'packages' => [
            'title' => 'Coaching Packages & Pricing',
            'description' => 'Choose from coaching packages designed to support your personal and professional goals.',
            'keywords' => 'coaching packages, coaching pricing, coaching plans',
        ],
        'contact' => [
            'title' => 'Contact Inga Peterson',
            'description' => 'Get in touch with Peterson Coaching & Consulting to start your coaching journey.',
            'keywords' => 'contact coach, book coaching session, schedule consultation',
        ],
    ],

];
