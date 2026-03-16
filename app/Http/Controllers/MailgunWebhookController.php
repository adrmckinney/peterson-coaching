<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MailgunWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $timestamp = $request->input('signature.timestamp');
        $token = $request->input('signature.token');
        $signature = $request->input('signature.signature');

        $signingKey = config('services.mailgun.webhook_signing_key');

        $expectedSignature = hash_hmac(
            'sha256',
            $timestamp . $token,
            $signingKey
        );

        if (! hash_equals($expectedSignature, $signature)) {
            Log::warning('Invalid Mailgun webhook signature', $request->all());
            return response()->json(['message' => 'Invalid signature'], 403);
        }

        $event = $request->input('event-data.event');

        if ($event === 'failed') {
            $recipient = $request->input('event-data.recipient');
            $reason = $request->input('event-data.delivery-status.message');

            Log::error('Mailgun delivery failure', [
                'recipient' => $recipient,
                'reason' => $reason,
                'payload' => $request->all(),
            ]);
        }

        return response()->json(['status' => 'ok']);
    }
}
