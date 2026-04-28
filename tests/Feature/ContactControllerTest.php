<?php

namespace Tests\Feature;

use App\Mail\ContactMail;
use App\Models\Contact;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_form_persists_and_sends_email(): void
    {
        Mail::fake();

        $payload = [
            'first_name' => 'Ada',
            'last_name' => 'Lovelace',
            'email' => 'ada@example.com',
            'message' => 'Hello there.',
        ];

        $response = $this->post(route('contact.store'), $payload);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('contacts', [
            'email' => 'ada@example.com',
            'first_name' => 'Ada',
        ]);

        Mail::assertSent(ContactMail::class, fn ($mail) => $mail->hasTo('ada@example.com'));
    }

    public function test_contact_form_still_sends_email_when_database_unavailable(): void
    {
        Mail::fake();

        Contact::creating(function () {
            throw new \RuntimeException('Simulated database unavailable');
        });

        $payload = [
            'first_name' => 'Ada',
            'last_name' => 'Lovelace',
            'email' => 'ada@example.com',
            'message' => 'Hello there.',
        ];

        $response = $this->post(route('contact.store'), $payload);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseMissing('contacts', ['email' => 'ada@example.com']);

        Mail::assertSent(ContactMail::class, fn ($mail) => $mail->hasTo('ada@example.com'));
    }

    public function test_contact_form_validates_required_fields(): void
    {
        $response = $this->post(route('contact.store'), []);

        $response->assertSessionHasErrors(['first_name', 'last_name', 'email', 'message']);
    }
}
