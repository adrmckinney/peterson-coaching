@props(['settings', 'showNav' => false])

@php
    $paragraphs = $settings['paragraphs'] ?? [];
    $heroImage = $settings['hero_image'] ?? '/images/ingaOnSidewalk.jpg';
@endphp

<div id="about" class="bg-background lg:min-h-screen">
    <header class="absolute inset-x-0 top-0 z-40">
        <div class="mx-auto max-w-7xl">
            <div class="px-6 pt-6 lg:pr-0 lg:pl-8">
                <nav aria-label="Global" class="flex items-start justify-between">
                    <a href="/" class="m-1.5 p-1.5 -ml-1.5 pl-0">
                        <span class="sr-only">Peterson Coaching and Consulting</span>
                        <x-nav.brand-icon class="h-20 sm:h-24 lg:h-48" />
                    </a>

                    @if($showNav)
                        {{-- Desktop nav links — dark text for light image background --}}
                        <div class="hidden lg:flex lg:gap-x-8 lg:items-center lg:pt-4 lg:pr-8">
                            <x-nav.links :dark="true" />
                        </div>
                    @endif

                    <button
                        type="button"
                        x-data
                        @click="$dispatch('toggle-mobile-menu')"
                        class="-m-2.5 rounded-md p-2.5 text-gray-700 lg:hidden dark:text-gray-200"
                    >
                        <span class="sr-only">Open main menu</span>
                        <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </nav>
            </div>
        </div>
    </header>

    <div class="relative flex flex-col-reverse lg:block lg:min-h-screen">
        <div class="mx-auto max-w-7xl lg:min-h-screen">
            <div class="relative z-10 pt-14 lg:w-full lg:max-w-2xl lg:min-h-screen">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"
                     class="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform lg:block fill-background">
                    <polygon points="0,0 90,0 50,100 0,100" />
                </svg>

                <div class="relative px-6 lg:px-8 lg:pr-0 py-32 sm:py-40 lg:py-56">
                    <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl z-20">
                        <div class="hidden sm:mb-10 sm:flex"></div>

                        @foreach($paragraphs as $text)
                            <p class="mt-8 text-lg font-medium text-pretty sm:text-xl/8" style="color: var(--color-onPrimary);">
                                {{ $text }}
                            </p>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-primary lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 mt-36 lg:mt-0">
            <img
                alt="Inga's Profile"
                src="{{ $heroImage }}"
                class="aspect-3/2 object-cover object-top lg:aspect-auto lg:size-full"
            />
        </div>
    </div>
</div>
