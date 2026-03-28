@props(['settings'])

@php
    $headline = $settings['headline'] ?? '';
    $testimonials = $settings['testimonials'] ?? [];
@endphp

<div class="bg-background py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
            <x-sections.section-headline :title="$headline" />
        </div>
        <div class="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div class="-mt-8 sm:-mx-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                @foreach($testimonials as $testimonial)
                    <div class="pt-8 sm:inline-block sm:w-full sm:px-4">
                        <figure class="rounded-2xl bg-secondary p-8 text-sm/6">
                            <blockquote class="text-onSecondary">
                                <p>"{{ $testimonial['body'] }}"</p>
                            </blockquote>
                            <figcaption class="mt-6 flex items-center gap-x-4">
                                @if(!empty($testimonial['author']['imageUrl']))
                                    <img
                                        alt=""
                                        src="{{ $testimonial['author']['imageUrl'] }}"
                                        class="size-10 rounded-full bg-gray-50 dark:bg-gray-800"
                                    />
                                @endif
                                <div>
                                    <div class="font-semibold text-onSecondary">
                                        {{ $testimonial['author']['name'] }}
                                    </div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
