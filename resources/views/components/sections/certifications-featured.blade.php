@props([
    'primary' => [
        'issuer' => 'International Coaching Federation (ICF)',
        'title' => 'Certified Professional Coach',
        'abbreviation' => 'CPC',
    ],
    'additional' => [
        ['title' => 'PQ Coach™ Member | Mental Fitness Coach', 'issuer' => 'Positive Intelligence®'],
        ['title' => 'COR.E Dynamics® | Leadership Dynamics Specialist', 'issuer' => 'iPEC Coaching'],
        ['title' => 'COR.E Transition Dynamics® Specialist', 'issuer' => 'iPEC Coaching'],
        ['title' => 'Energy Leadership Index® Master Practitioner', 'issuer' => 'iPEC Coaching'],
    ],
])

<div id="certifications-featured" class="bg-background py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <x-sections.section-headline
            title="Certifications & Credentials"
            :subTitle="'A foundation of rigorous training from globally recognized coaching institutions.'"
        />

        {{-- Primary/Featured Credential --}}
        <div class="mx-auto mt-16 max-w-4xl">
            <div class="relative overflow-hidden rounded-3xl bg-surface p-8 sm:p-12 ring-1 ring-tertiary/30">
                <div class="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primaryAccent/20 blur-3xl"></div>
                <div class="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div class="flex-shrink-0 flex h-20 w-20 items-center justify-center rounded-2xl bg-primaryAccent text-onPrimaryAccent">
                        <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                        </svg>
                    </div>
                    <div class="flex-1">
                        <p class="text-sm font-semibold uppercase tracking-widest text-tertiary">Primary Credential</p>
                        <h3 class="mt-2 text-2xl sm:text-3xl font-semibold text-onPrimary">
                            {{ $primary['title'] }}
                            <span class="text-tertiary">({{ $primary['abbreviation'] }})</span>
                        </h3>
                        <p class="mt-2 text-base text-onPrimary/90">{{ $primary['issuer'] }}</p>
                    </div>
                </div>
            </div>
        </div>

        {{-- Additional Credentials Grid --}}
        <div class="mx-auto mt-12 max-w-5xl">
            <h3 class="text-center text-sm font-semibold uppercase tracking-widest text-tertiary">Additional Certifications</h3>
            <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                @foreach($additional as $cert)
                    <div class="flex items-start gap-4 rounded-2xl bg-surface/60 p-6 ring-1 ring-onSurface/10 hover:ring-tertiary/40 transition">
                        <div class="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-tertiary/10 text-tertiary">
                            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        </div>
                        <div class="flex-1">
                            <p class="text-base font-semibold text-onPrimary leading-snug">{{ $cert['title'] }}</p>
                            <p class="mt-1 text-sm text-onPrimary/85">{{ $cert['issuer'] }}</p>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
