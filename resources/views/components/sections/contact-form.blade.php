@props(['settings'])

@php
    $headline = $settings['headline'] ?? '';
    $formContent = $settings['form'] ?? [];
    $fields = $formContent['fields'] ?? [];
    $submitLabel = $formContent['submit_label'] ?? 'Contact';
@endphp

<div id="contact" class="bg-background py-24 sm:py-32 flex flex-col justify-center items-center w-full">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <x-sections.section-headline :title="$headline" />

        <form method="POST" action="{{ route('contact.store') }}" class="gap-y-6 md:gap-x-6 mt-16 grid grid-cols-1 md:grid-cols-2">
            @csrf

            <div>
                <label for="first_name" class="block text-sm font-medium text-onBackground">
                    {{ $fields['first_name']['label'] ?? 'First Name' }}
                </label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value="{{ old('first_name') }}"
                    required
                    autocomplete="given-name"
                    class="mt-1 block w-full rounded-md border-gray-300 bg-white/5 text-onPrimary shadow-sm focus:border-tertiary focus:ring-tertiary dark:border-gray-600"
                />
                @error('first_name')
                    <p class="mt-2 text-sm text-red-400">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label for="last_name" class="block text-sm font-medium text-onBackground">
                    {{ $fields['last_name']['label'] ?? 'Last Name' }}
                </label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value="{{ old('last_name') }}"
                    required
                    autocomplete="family-name"
                    class="mt-1 block w-full rounded-md border-gray-300 bg-white/5 text-onPrimary shadow-sm focus:border-tertiary focus:ring-tertiary dark:border-gray-600"
                />
                @error('last_name')
                    <p class="mt-2 text-sm text-red-400">{{ $message }}</p>
                @enderror
            </div>

            <div class="md:col-span-2">
                <label for="email" class="block text-sm font-medium text-onBackground">
                    {{ $fields['email']['label'] ?? 'Email' }}
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value="{{ old('email') }}"
                    required
                    autocomplete="email"
                    class="mt-1 block w-full rounded-md border-gray-300 bg-white/5 text-onPrimary shadow-sm focus:border-tertiary focus:ring-tertiary dark:border-gray-600"
                />
                @error('email')
                    <p class="mt-2 text-sm text-red-400">{{ $message }}</p>
                @enderror
            </div>

            <div class="md:col-span-2">
                <label for="message" class="block text-sm font-medium text-onBackground">
                    {{ $fields['message']['label'] ?? 'Message' }}
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    class="mt-1 block w-full rounded-md border-gray-300 bg-white/5 text-onPrimary shadow-sm focus:border-tertiary focus:ring-tertiary dark:border-gray-600"
                >{{ old('message') }}</textarea>
                @error('message')
                    <p class="mt-2 text-sm text-red-400">{{ $message }}</p>
                @enderror
            </div>

            @if(session('success') || session('error'))
                <div class="mb-0 flex items-center rounded-md px-4 py-3 md:col-span-2 {{ session('success') ? 'bg-green-600/20 border border-green-600 text-green-200' : 'bg-red-600/20 border border-red-600 text-red-200' }}">
                    {{ session('success') ?? session('error') }}
                </div>
            @endif

            <div class="mt-4 flex items-center justify-end w-full md:col-start-2">
                <button
                    type="submit"
                    class="rounded-md bg-tertiary px-3.5 py-2.5 text-sm font-semibold text-onTertiary shadow-sm hover:bg-tertiaryHover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
                >
                    {{ $submitLabel }}
                </button>
            </div>
        </form>
    </div>
</div>
