{{-- Standalone navigation bar for pages without the hero section --}}
<div class="bg-background">
    <div class="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <nav aria-label="Global" class="flex items-center justify-between">
            <a href="/" class="-m-1.5 p-1.5">
                <span class="sr-only">Peterson Coaching and Consulting</span>
                <x-nav.brand-icon class="h-16 sm:h-20" />
            </a>

            {{-- Desktop nav links --}}
            <div class="hidden lg:flex lg:gap-x-8">
                <x-nav.links />
            </div>

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
