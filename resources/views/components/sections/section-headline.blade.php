@props(['title', 'subTitle' => null])

@php
    $subTitleText = is_array($subTitle) ? ($subTitle['text'] ?? '') : $subTitle;
    $subTitleIsHtml = is_array($subTitle) && ($subTitle['isHtml'] ?? false);
@endphp

<div class="mx-auto max-w-2xl lg:text-center">
    <h2 class="mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl lg:text-balance text-tertiary">
        {{ $title }}
    </h2>
    @if($subTitleText)
        <p class="mt-6 text-lg/8 text-onPrimary">
            @if($subTitleIsHtml)
                {!! $subTitleText !!}
            @else
                {{ $subTitleText }}
            @endif
        </p>
    @endif
</div>
