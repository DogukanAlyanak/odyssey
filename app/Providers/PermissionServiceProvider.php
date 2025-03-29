<?php

namespace App\Providers;

use App\Http\Middleware\CheckPermission;
use App\Http\Middleware\CheckRole;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class PermissionServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Blade direktifleri ekle

        // @role('admin')
        Blade::directive('role', function ($role) {
            return "<?php if(auth()->check() && auth()->user()->roles->contains('slug', {$role})): ?>";
        });

        // @endrole
        Blade::directive('endrole', function () {
            return "<?php endif; ?>";
        });

        // @permission('create_user')
        Blade::directive('permission', function ($permission) {
            return "<?php if(auth()->check() && (auth()->user()->roles->contains('slug', 'admin')
                || auth()->user()->roles->flatMap->permissions->contains('slug', {$permission}))): ?>";
        });

        // @endpermission
        Blade::directive('endpermission', function () {
            return "<?php endif; ?>";
        });
    }
}
