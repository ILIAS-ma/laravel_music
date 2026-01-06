<?php

namespace App\Http\Middleware;

use App\Models\ApiKey;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckApiKey
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $apiKey = $request->header('x-api-key');

        if (! $apiKey) {
            return response()->json(['error' => 'API key is required'], 401);
        }

        $key = ApiKey::where('key', $apiKey)->first();

        if (! $key) {
            return response()->json(['error' => 'Invalid API key'], 401);
        }

        // Authenticate the user associated with the API key
        Auth::loginUsingId($key->user_id);

        return $next($request);
    }
}







