@props(['video'])

<div
    x-data="{ activated: false }"
    class="relative w-full max-w-sm mx-auto shadow-2xl rounded-md overflow-hidden"
>
    {{-- Static preview --}}
    <template x-if="!activated">
        <button
            type="button"
            @click="activated = true"
            class="relative w-full group"
        >
            <img
                src="{{ $video['thumbnail_url'] }}"
                alt="{{ $video['title'] }}"
                class="w-full object-cover"
            />
            <div class="absolute inset-0 flex items-start pt-2 justify-center bg-black/20 group-hover:bg-black/30 transition">
                <div class="rounded-full bg-white/20 px-4 py-2 text-sm font-medium shadow">
                    &#9654; Play
                </div>
            </div>
        </button>
    </template>

    {{-- TikTok embed --}}
    <template x-if="activated">
        <div class="relative w-full aspect-[9/16] bg-white" x-init="
            if (!document.getElementById('tiktok-embed-script-{{ $video['external_id'] }}')) {
                let s = document.createElement('script');
                s.src = 'https://www.tiktok.com/embed.js';
                s.async = true;
                s.id = 'tiktok-embed-script-{{ $video['external_id'] }}';
                document.body.appendChild(s);
            }
        ">
            <blockquote
                class="tiktok-embed"
                cite="{{ $video['url'] }}"
                data-video-id="{{ $video['external_id'] }}"
                style="position: absolute; inset: 0; max-width: 100%;"
            >
                <a href="{{ $video['url'] }}" style="border: none; display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
                    <x-sections.loading-circle />
                </a>
            </blockquote>
        </div>
    </template>
</div>
