@props(['settings'])

@php
    $headline = $settings['headline'] ?? '';
    $formContent = $settings['form'] ?? [];
    $fields = $formContent['fields'] ?? [];
    $submitLabel = $formContent['submit_label'] ?? 'Contact';
@endphp

<div id="contact" class="bg-background py-10 sm:py-32 flex flex-col justify-center items-center w-full">
    <div class="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <x-sections.section-headline :title="$headline" />

        <form
            method="POST"
            action="{{ route('contact.store') }}"
            class="gap-y-6 md:gap-x-6 mt-16 grid grid-cols-1 md:grid-cols-2"
            x-data="{
                submitting: false,
                status: @js(session('success') ? 'success' : (session('error') ? 'error' : null)),
                message: @js(session('success') ?? session('error') ?? ''),
                async submit() {
                    if (this.submitting) return;
                    this.submitting = true;
                    this.status = null;
                    this.message = '';

                    const form = this.$el;
                    const formData = new FormData(form);

                    try {
                        const res = await fetch(form.action, {
                            method: 'POST',
                            body: formData,
                            headers: { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
                        });
                        const data = await res.json().catch(() => ({}));

                        if (res.ok) {
                            this.status = 'success';
                            this.message = data.message || 'Thanks for reaching out!';
                            form.reset();
                        } else {
                            this.status = 'error';
                            this.message = data.message || 'Something went wrong. Please try again.';
                        }
                    } catch (e) {
                        this.status = 'error';
                        this.message = 'Something went wrong. Please try again.';
                    } finally {
                        this.submitting = false;
                    }
                },
            }"
            x-init="
                const strip = (el) => el.removeAttribute('data-com-onepassword-filled');
                const obs = new MutationObserver((muts) => muts.forEach((m) => {
                    if (m.attributeName === 'data-com-onepassword-filled') strip(m.target);
                }));
                $el.querySelectorAll('input, textarea').forEach((el) => {
                    strip(el);
                    obs.observe(el, { attributes: true, attributeFilter: ['data-com-onepassword-filled'] });
                });
            "
            @submit.prevent="submit()"
        >
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
                    class="mt-1 block w-full rounded-md border-gray-300 bg-white/5 text-onPrimary shadow-sm focus:border-tertiary focus:ring-tertiary"
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
                    class="mt-1 block w-full rounded-md border-gray-300 bg-white/5 text-onPrimary shadow-sm focus:border-tertiary focus:ring-tertiary"
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
                    class="mt-1 block w-full rounded-md border-gray-300 bg-white/5 text-onPrimary shadow-sm focus:border-tertiary focus:ring-tertiary"
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
                    class="mt-1 block w-full rounded-md border-gray-300 bg-white/5 text-onPrimary shadow-sm focus:border-tertiary focus:ring-tertiary"
                >{{ old('message') }}</textarea>
                @error('message')
                    <p class="mt-2 text-sm text-red-400">{{ $message }}</p>
                @enderror
            </div>

            <div
                x-show="status"
                x-transition
                class="mb-0 flex items-center rounded-md px-4 py-3 md:col-span-2"
                :class="status === 'success' ? 'bg-green-600/20 border border-green-600 text-green-200' : 'bg-red-600/20 border border-red-600 text-red-200'"
                x-text="message"
            ></div>

            <div class="mt-4 flex items-center justify-end w-full md:col-start-2">
                <button
                    type="submit"
                    :disabled="submitting"
                    class="rounded-md bg-tertiary px-3.5 py-2.5 text-base sm:text-lg font-semibold text-onTertiary shadow-sm hover:bg-tertiaryHover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    <span x-show="!submitting">{{ $submitLabel }}</span>
                    <span x-show="submitting" x-cloak>Sending…</span>
                </button>
            </div>
        </form>
    </div>
</div>
