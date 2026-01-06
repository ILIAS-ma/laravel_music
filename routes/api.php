<?php

use App\Http\Controllers\PlaylistController;
use App\Http\Middleware\CheckApiKey;
use Illuminate\Support\Facades\Route;

Route::middleware([CheckApiKey::class])->group(function () {
    Route::get('/playlists', [PlaylistController::class, 'apiIndex']);
});
