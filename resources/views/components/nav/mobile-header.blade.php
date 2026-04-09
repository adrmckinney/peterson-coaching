{{-- Sticky mobile-only top bar with brand + hamburger trigger. --}}
<div class="sm:hidden bg-background border-b border-gray-900/10">
    <div class="px-6 py-4">
        <nav aria-label="Global" class="flex items-center justify-between">
            <a href="{{ route('landing') }}" class="-m-1.5 p-1.5">
                <span class="sr-only">Peterson Coaching and Consulting</span>
                <x-nav.brand-icon class="h-12" />
            </a>

            <button
                type="button"
                x-data
                @click="$dispatch('toggle-mobile-menu')"
                class="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
                <span class="sr-only">Open main menu</span>
                <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </nav>
    </div>
</div>
