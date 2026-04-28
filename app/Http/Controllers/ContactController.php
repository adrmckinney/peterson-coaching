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

    public function store(Request $request): RedirectResponse
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

        try {
            Mail::to($validated['email'])->send(new ContactMail($contact));

            return back()->with('success', 'Thanks for reaching out! I’ll be in touch soon.');
        } catch (\Throwable $e) {
            Log::error('Contact email failed', [
                'contact_id' => $contact->id ?? null,
                'email' => $validated['email'],
                'exception' => $e,
            ]);

            return back()->with('error', 'Something went wrong sending your message. Please try again.');
        }
    }
}
