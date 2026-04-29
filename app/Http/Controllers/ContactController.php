<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function index(): JsonResponse
    {
        $contacts = Contact::all();

        return response()->json([
            'contacts' => $contacts,
        ]);
    }

    public function store(Request $request): RedirectResponse|JsonResponse
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email'],
            'message' => ['required', 'string'],
        ]);

        try {
            $contact = Contact::create($validated);
        } catch (\Throwable $e) {
            Log::warning('Contact persistence skipped; database unavailable', [
                'email' => $validated['email'],
                'exception' => $e->getMessage(),
            ]);

            $contact = new Contact($validated);
        }

        $recipients = config('contact.recipients');

        if (empty($recipients)) {
            Log::error('Contact form has no configured recipients; check CONTACT_RECIPIENTS env var.');

            $message = 'Something went wrong sending your message. Please try again.';

            if ($request->wantsJson()) {
                return response()->json(['status' => 'error', 'message' => $message], 500);
            }

            return back()->withFragment('contact')->with('error', $message);
        }

        try {
            Mail::to($recipients)->send(new ContactMail($contact));

            $message = 'Thanks for reaching out! I’ll be in touch soon.';

            if ($request->wantsJson()) {
                return response()->json(['status' => 'success', 'message' => $message]);
            }

            return back()->withFragment('contact')->with('success', $message);
        } catch (\Throwable $e) {
            Log::error('Contact email failed', [
                'contact_id' => $contact->id ?? null,
                'email' => $validated['email'],
                'exception' => $e,
            ]);

            $message = 'Something went wrong sending your message. Please try again.';

            if ($request->wantsJson()) {
                return response()->json(['status' => 'error', 'message' => $message], 500);
            }

            return back()->withFragment('contact')->with('error', $message);
        }
    }
}
