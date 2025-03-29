<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    /**
     * İzinleri listele
     */
    public function index()
    {
        // Tüm izinleri getir
        $permissions = Permission::all();

        // Ad ve açıklama otomatik olarak aksesörler aracılığıyla verilir
        // Görünüm için izinleri hazırla
        $permissionsForView = $permissions->map(function ($permission) {
            return [
                'id' => $permission->id,
                'slug' => $permission->slug,
                'name' => $permission->name, // Dil dosyasından geliyor
                'description' => $permission->description, // Dil dosyasından geliyor
            ];
        });

        // Tüm rolleri getir
        $roles = Role::with('permissions')->get();

        // Roller için çeviri desteği
        $rolesForView = $roles->map(function ($role) {
            return [
                'id' => $role->id,
                'slug' => $role->slug,
                'name' => $role->name,
                'localizedName' => $role->localizedName, // Dil dosyasından geliyor, eğer varsa
                'description' => $role->description,
                'isLocked' => $role->isLocked(),
                'permissions' => $role->permissions->pluck('slug'),
            ];
        });

        return Inertia::render('admin/roles/index', [
            'permissions' => $permissionsForView,
            'roles' => $rolesForView,
        ]);
    }
}
