<?php

namespace App\Http\Controllers;

use App\Events\PlaylistCreated;
use App\Http\Requests\PlaylistRequest;
use App\Models\Playlist;
use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class PlaylistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $playlists = Playlist::where('user_id', auth()->id())
            ->withCount('tracks')
            ->get();

        return Inertia::render('Playlists/Index', [
            'playlists' => $playlists,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tracks = Track::where('is_visible', true)->get();

        return Inertia::render('Playlists/Create', [
            'tracks' => $tracks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PlaylistRequest $request)
    {
        $tracks = Track::whereIn('slug', $request->tracks)->where('is_visible', true)->get();

        if (count($request->tracks) !== $tracks->count()) {
            throw ValidationException::withMessages(['tracks' => 'Tracks not found']);
        }

        $playlist = Playlist::create([
            'slug' => 'ply-' . Str::uuid(),
            'user_id' => $request->user()->id,
            'title' => $request->title,
        ]);

        $playlist->tracks()->attach($tracks->pluck('id'));

        PlaylistCreated::dispatch($playlist);

        return redirect()->route('playlists.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Playlist $playlist)
    {
        // Ensure the playlist belongs to the authenticated user
        if ($playlist->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $playlist->load('tracks');
        $tracks = Track::where('is_visible', true)->get();

        return Inertia::render('Playlists/Edit', [
            'playlist' => $playlist,
            'tracks' => $tracks,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PlaylistRequest $request, Playlist $playlist)
    {
        // Ensure the playlist belongs to the authenticated user
        if ($playlist->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $tracks = Track::whereIn('slug', $request->tracks)->where('is_visible', true)->get();

        if (count($request->tracks) !== $tracks->count()) {
            throw ValidationException::withMessages(['tracks' => 'Tracks not found']);
        }

        // $playlist->update($request->validated());

        $playlist->title = $request->title;
        $playlist->save();

        $playlist->tracks()->sync($tracks->pluck('id'));

        return redirect()->route('playlists.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Playlist $playlist)
    {
        // Ensure the playlist belongs to the authenticated user
        if ($playlist->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $playlist->delete();

        return redirect()->back();
    }

    /**
     * API endpoint to get user's playlists with tracks
     */
    public function apiIndex()
    {
        $playlists = Playlist::where('user_id', auth()->id())
            ->with(['tracks'])
            ->get();

        return response()->json($playlists);
    }
}
