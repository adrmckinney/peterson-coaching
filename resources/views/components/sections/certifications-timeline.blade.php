@props([
    'certifications' => [
        [
            'title' => 'Certified Professional Coach (CPC)',
            'issuer' => 'International Coaching Federation (ICF)',
            'featured' => true,
        ],
        [
            'title' => 'PQ Coach™ Member | Mental Fitness Coach',
            'issuer' => 'Positive Intelligence®',
            'featured' => false,
        ],
        [
            'title' => 'COR.E Dynamics® | Leadership Dynamics Specialist',
            'issuer' => 'iPEC Coaching',
            'featured' => false,
        ],
        [
            'title' => 'COR.E Transition Dynamics® Specialist',
            'issuer' => 'iPEC Coaching',
            'featured' => false,
        ],
        [
            'title' => 'Energy Leadership Index® Master Practitioner',
            'issuer' => 'iPEC Coaching',
            'featured' => false,
        ],
    ],
])

<div id="certifications-timeline" class="bg-background py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <x-sections.section-headline
            title="Certifications & Credentials"
            :subTitle="'Professional training and accreditations that inform every coaching engagement.'"
        />

        <div class="mx-auto mt-16 max-w-3xl">
            <ol class="relative list-none border-l-2 border-tertiary/40 pl-12 space-y-10">
                @foreach($certifications as $cert)
                    <li class="relative">
                        <span @class([
                            'absolute top-1 -left-[3.5rem] flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-background',
                            'bg-tertiary' => $cert['featured'],
                            'bg-tertiary/30' => ! $cert['featured'],
                        ])>
                            @if($cert['featured'])
                                <svg class="h-4 w-4 text-onTertiary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" clip-rule="evenodd" />
                                </svg>
                            @else
                                <span class="h-2.5 w-2.5 rounded-full bg-tertiary"></span>
                            @endif
                        </span>

                        @if($cert['featured'])
                            <p class="text-xs font-semibold uppercase tracking-widest text-tertiary mb-1">Primary Credential</p>
                        @endif
                        <h3 @class([
                            'text-onPrimary',
                            'text-xl sm:text-2xl font-semibold' => $cert['featured'],
                            'text-lg font-medium' => ! $cert['featured'],
                        ])>
                            {{ $cert['title'] }}
                        </h3>
                        <p class="mt-1 text-sm sm:text-base text-onPrimary/85">{{ $cert['issuer'] }}</p>
                    </li>
                @endforeach
            </ol>
        </div>
    </div>
</div>
