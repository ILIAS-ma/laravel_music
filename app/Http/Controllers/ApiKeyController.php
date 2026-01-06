<?php

namespace App\Http\Controllers;

use App\Models\ApiKey;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ApiKeyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $apiKeys = ApiKey::where('user_id', auth()->id())->get();

        return Inertia::render('ApiKeys/Index', [
            'apiKeys' => $apiKeys,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:255'],
        ]);

        $apiKey = ApiKey::create([
            'slug' => 'key-' . Str::uuid(),
            'user_id' => auth()->id(),
            'name' => $validated['name'],
            'key' => ApiKey::generateKey(),
        ]);

        return redirect()->route('api-keys.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ApiKey $apiKey)
    {
        // Ensure the API key belongs to the authenticated user
        if ($apiKey->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'name' => ['required', 'string', 'min:3', 'max:255'],
        ]);

        $apiKey->update($validated);

        return redirect()->route('api-keys.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ApiKey $apiKey)
    {
        // Ensure the API key belongs to the authenticated user
        if ($apiKey->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        $apiKey->delete();

        return redirect()->route('api-keys.index');
    }
}


