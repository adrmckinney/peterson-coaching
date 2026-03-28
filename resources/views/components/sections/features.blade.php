@props(['titleSettings', 'gallerySettings'])

@php
    $headline = $titleSettings['headline'] ?? '';
    $videos = $gallerySettings['videos'] ?? [];
@endphp

<div class="bg-background py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <x-sections.section-headline :title="$headline" />

        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                @foreach($videos as $video)
                    <div class="flex flex-col">
                        <dt class="flex items-center gap-x-3 text-base/7 font-semibold text-gray-900 dark:text-white">
                            {{ $video['title'] }}
                        </dt>
                        <dd class="mt-4 flex flex-auto flex-col">
                            @if(($video['platform'] ?? '') === 'tiktok')
                                <x-sections.tiktok-video-card :video="$video" />
                            @else
                                <x-sections.youtube-video-card :video="$video" />
                            @endif
                        </dd>
                    </div>
                @endforeach
            </dl>
        </div>
    </div>
</div>
