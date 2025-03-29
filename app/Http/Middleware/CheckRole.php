<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Lang;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('message', Lang::get('permissions.middleware.role.login_required'));
        }

        $user = Auth::user();

        if (empty($roles)) {
            return $next($request);
        }

        // User sınıfındaki hasRole metodunu doğrudan kullanmak yerine model ilişkisinden kontrol et
        foreach ($roles as $role) {
            if ($user->roles->contains('slug', $role)) {
                return $next($request);
            }
        }

        abort(403, Lang::get('permissions.middleware.role.unauthorized'));
    }
}
