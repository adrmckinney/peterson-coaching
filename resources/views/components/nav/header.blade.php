{{-- Mobile menu overlay - listens for toggle-mobile-menu event from hero nav button --}}
<div
    x-data="{ open: false }"
    x-on:toggle-mobile-menu.window="open = !open"
    class="lg:hidden"
>
    {{-- Backdrop --}}
    <div x-show="open" x-transition.opacity class="fixed inset-0 z-50" @click="open = false"></div>

    {{-- Panel --}}
    <div
        x-show="open"
        x-transition:enter="transition ease-out duration-200"
        x-transition:enter-start="translate-x-full"
        x-transition:enter-end="translate-x-0"
        x-transition:leave="transition ease-in duration-150"
        x-transition:leave-start="translate-x-0"
        x-transition:leave-end="translate-x-full"
        class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-gray-100/10 bg-secondary"
    >
        <div class="flex items-center justify-between">
            <a href="/" class="-m-1.5 p-1.5">
                <span class="sr-only">Peterson Coaching and Consulting</span>
                <x-nav.brand-icon class="h-20" />
            </a>
            <button
                type="button"
                @click="open = false"
                class="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            >
                <span class="sr-only">Close menu</span>
                <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
                <div class="space-y-2 py-6">
                    <a href="/" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5">
                        Home
                    </a>
                </div>
                <div class="py-6">
                    <a href="{{ route('login') }}" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5">
                        Log in
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
