<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Playlist;
use Illuminate\Http\Request;

class PlaylistApiController extends Controller
{
    /**
     * Display a listing of the playlists for the authenticated user.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $playlists = auth()->user()
            ->playlists()
            ->with('tracks')
            ->latest()
            ->get();

        return response()->json([
            'data' => $playlists,
        ]);
    }
}

