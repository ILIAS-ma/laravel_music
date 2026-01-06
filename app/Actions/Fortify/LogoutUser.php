<?php

namespace App\Actions\Fortify;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Fortify\Contracts\LogoutResponse as LogoutResponseContract;

class LogoutUser
{
    /**
     * Handle the logout request.
     */
    public function __invoke(Request $request): LogoutResponseContract
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return app(LogoutResponseContract::class);
    }
}






