<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProfileController;
use App\Mail\TestMail;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/landing', [LandingController::class, 'index'])->name('landing');

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/admin/landing', [LandingController::class, 'edit'])
    // ->middleware(['auth', 'can:edit-pages'])
    ->name('admin.landing.edit');

Route::patch('admin/pages/{page}/sections/{section}', [LandingController::class, 'patchSection'])
    // ->middleware(['auth', 'can:edit-pages'])
    ->name('admin.landing.patch.section');

// Route::get('/test-mail', function () {
//     return Mail::to('adrmckinney@gmail.com')->send(new TestMail());
// });

require __DIR__ . '/auth.php';
