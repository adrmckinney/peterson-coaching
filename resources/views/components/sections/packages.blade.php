@props(['settings'])

@php
    $headline = $settings['headline'] ?? '';
    $subTitle = $settings['subTitle'] ?? null;
    $tiers = $settings['tiers'] ?? [];
@endphp

<div id="packages" class="bg-background pt-10 sm:pt-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-4xl text-center">
            <x-sections.section-headline :title="$headline" :subTitle="$subTitle" />
        </div>

        <div class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            @foreach($tiers as $tier)
                <div class="rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10">
                    <div class="inline-block">
                        @if(!empty($tier['image']))
                            <img
                                src="{{ $tier['image'] }}"
                                class="rounded-lg opacity-70 block w-full h-auto object-cover"
                                alt="{{ $tier['name'] }}"
                            />
                        @endif
                        <h3
                            id="tier-{{ $tier['id'] }}"
                            class="text-2xl/8 font-semibold text-onPrimary mt-4"
                        >
                            {{ $tier['name'] }}
                        </h3>
                    </div>

                    <p class="mt-4 text-base/6 text-onPrimary">
                        {{ $tier['description'] }}
                    </p>

                    <p class="mt-6 flex items-baseline gap-x-1">
                        <span class="text-4xl font-semibold tracking-tight text-onPrimary">
                            {{ $tier['price'] }}
                        </span>
                        <span class="text-sm/6 font-semibold text-gray-600">
                            /{{ $tier['priceSubText'] }}
                        </span>
                    </p>

                    <a
                        href="{{ $tier['href'] }}"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-describedby="tier-{{ $tier['id'] }}"
                        class="mt-6 block w-full rounded-md bg-tertiary px-3.5 py-2.5 text-center text-sm font-semibold text-onTertiary shadow-sm hover:bg-tertiaryHover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
                    >
                        {{ $tier['cta'] }}
                    </a>

                    @if(!empty($tier['features']))
                        <ul role="list" class="mt-8 space-y-3 text-sm/6 xl:mt-10 text-onBackground">
                            @foreach($tier['features'] as $feature)
                                <li class="flex gap-x-3">
                                    <svg class="h-6 w-5 flex-none text-secondaryAccent" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                                    </svg>
                                    {{ $feature }}
                                </li>
                            @endforeach
                        </ul>
                    @endif
                </div>
            @endforeach
        </div>
    </div>
</div>
