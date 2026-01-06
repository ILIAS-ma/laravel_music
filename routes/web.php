<?php

use App\Http\Controllers\ApiKeyController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\TrackController;
use App\Http\Middleware\Admin;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Route publique - Page d'accueil (redirige vers login ou dashboard si connecté)
Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return redirect('/login');
})->name('home');

// Route de test (peut être supprimée en production)
Route::get('test', [HomeController::class, 'test'])->name('test');

// Routes d'authentification gérées par Fortify
// - GET/POST /login
// - GET/POST /register
// - POST /logout (redirige vers /login)
// - GET /email/verify
// - GET/POST /forgot-password
// - GET/POST /reset-password

// Routes protégées - Dashboard (redirige vers tracks)
Route::get('dashboard', function () {
    return redirect()->route('tracks.index');
})->middleware(['auth', 'verified'])->name('dashboard');

// Routes Settings (auth requis)
require __DIR__.'/settings.php';

// Routes Tracks (Musiques)
Route::prefix('tracks')->name('tracks.')->group(function () {
    // Route publique - Liste des musiques
    Route::get('/', [TrackController::class, 'index'])->name('index');
    
    // Routes Admin uniquement - CRUD des musiques
    Route::middleware([Admin::class])->group(function () {
        Route::get('create', [TrackController::class, 'create'])->name('create');
        Route::post('/', [TrackController::class, 'store'])->name('store');
        Route::get('{track}/edit', [TrackController::class, 'edit'])->name('edit');
        Route::put('{track}', [TrackController::class, 'update'])->name('update');
        Route::delete('{track}', [TrackController::class, 'destroy'])->name('destroy');
    });
});

// Routes Playlists (auth + verified requis)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('playlists', PlaylistController::class)->except('show');
    
    // Routes API Keys (auth + verified requis)
    Route::resource('api-keys', ApiKeyController::class)->except(['show', 'create', 'edit']);
});
