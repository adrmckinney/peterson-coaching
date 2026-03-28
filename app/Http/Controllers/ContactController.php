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

        $contact = Contact::create([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'message' => $validated['message'],
        ]);

        try {
            Mail::to($validated['email'])->send(new ContactMail($contact));

            return back()->with('success', 'Thanks for reaching out! I’ll be in touch soon.');
        } catch (\Throwable $e) {
            Log::error('Contact email failed', [
                'contact_id' => $contact->id,
                'email' => $validated['email'],
                'exception' => $e,
            ]);

            return back()->with('error', 'Something went wrong sending your message. Please try again.');
        }
    }
}
