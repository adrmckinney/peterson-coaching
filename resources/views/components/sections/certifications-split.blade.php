@props([
    'primary' => [
        'title' => 'Certified Professional Coach',
        'abbreviation' => 'CPC',
        'issuer' => 'International Coaching Federation (ICF)',
        'description' => 'The ICF is the gold standard in professional coaching, setting globally recognized competencies and ethics.',
    ],
    'additional' => [
        ['title' => 'PQ Coach™ Member | Mental Fitness Coach', 'issuer' => 'Positive Intelligence®'],
        ['title' => 'COR.E Dynamics® | Leadership Dynamics Specialist', 'issuer' => 'iPEC Coaching'],
        ['title' => 'COR.E Transition Dynamics® Specialist', 'issuer' => 'iPEC Coaching'],
        ['title' => 'Energy Leadership Index® Master Practitioner', 'issuer' => 'iPEC Coaching'],
    ],
])

<div id="certifications-split" class="bg-background py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {{-- Left: Primary Credential Feature --}}
            <div class="lg:col-span-5 lg:sticky lg:top-24">
                <p class="text-sm font-semibold uppercase tracking-widest text-tertiary">Primary Credential</p>
                <h2 class="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-tertiary">
                    {{ $primary['title'] }}
                </h2>
                <p class="mt-3 text-2xl font-medium text-onPrimary">({{ $primary['abbreviation'] }})</p>

                <div class="mt-6 inline-flex items-center gap-3 rounded-full bg-primaryAccent px-4 py-2">
                    <svg class="h-5 w-5 text-onPrimaryAccent" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span class="text-sm font-medium text-onPrimaryAccent">{{ $primary['issuer'] }}</span>
                </div>

                <p class="mt-6 text-lg leading-8 text-onPrimary/90">
                    {{ $primary['description'] }}
                </p>
            </div>

            {{-- Right: Additional Credentials Stack --}}
            <div class="lg:col-span-7">
                <div class="flex items-center gap-4 mb-8">
                    <div class="h-px flex-1 bg-onPrimary/30"></div>
                    <p class="text-sm font-semibold uppercase tracking-widest text-tertiary">Additional Certifications</p>
                    <div class="h-px flex-1 bg-onPrimary/30"></div>
                </div>

                <ul class="divide-y divide-onPrimary/10">
                    @foreach($additional as $cert)
                        <li class="flex items-start gap-5 py-6 group">
                            <div class="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-xl bg-tertiary/10 text-tertiary group-hover:bg-tertiary group-hover:text-onTertiary transition">
                                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                </svg>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-base sm:text-lg font-semibold text-onPrimary leading-snug">{{ $cert['title'] }}</p>
                                <p class="mt-1 text-sm text-onPrimary/85">{{ $cert['issuer'] }}</p>
                            </div>
                        </li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
</div>
