<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$permissions): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('message', Lang::get('permissions.middleware.permission.login_required'));
        }

        $user = Auth::user();

        // Admin rolüne sahip kullanıcılar tüm izinlere sahiptir
        if ($user->roles->contains('slug', 'admin')) {
            return $next($request);
        }

        if (empty($permissions)) {
            return $next($request);
        }

        // İzin kontrolü
        foreach ($permissions as $permission) {
            foreach ($user->roles as $role) {
                if ($role->permissions->contains('slug', $permission)) {
                    return $next($request);
                }
            }
        }

        abort(403, Lang::get('permissions.middleware.permission.unauthorized'));
    }
}
