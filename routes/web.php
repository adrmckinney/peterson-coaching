<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\MailgunWebhookController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PageController::class, 'landing'])->name('landing');

Route::middleware('inertia')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Route::get('/test-mail', function () {
//     return Mail::to('adrmckinney@gmail.com')->send(new TestMail());
// });

// Mailgun webhooks
Route::post('/mailgun/webhook', [MailgunWebhookController::class, 'handle']);

require __DIR__.'/auth.php';
