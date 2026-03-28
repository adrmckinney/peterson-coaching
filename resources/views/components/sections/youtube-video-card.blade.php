@props(['video'])

<iframe
    id="ytplayer-{{ $video['id'] ?? '' }}"
    title="{{ $video['title'] }}"
    width="560"
    height="315"
    src="https://www.youtube.com/embed/{{ $video['external_id'] }}?autoplay=0&mute=0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share;"
    allowfullscreen
    class="shadow-2xl rounded-md object-cover object-left border-none w-full h-full"
></iframe>
