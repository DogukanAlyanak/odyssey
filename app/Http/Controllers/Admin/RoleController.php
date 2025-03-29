<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class RoleController extends Controller
{
    /**
     * Rolleri listele
     */
    public function index(Request $request): InertiaResponse
    {
        $query = Role::query()
            ->select(['id', 'slug', 'name', 'description', 'is_locked', 'created_at', 'updated_at']);

        // Arama parametresi varsa filtreleme yapılır
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%")
                  ->orWhere('slug', 'like', "%{$searchTerm}%");
            });
        }

        $roles = $query->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/roles/Index', [
            'roles' => $roles,
            'filters' => [
                'search' => $request->search ?? '',
            ],
        ]);
    }

    /**
     * Yeni rol oluşturma formunu göster
     */
    public function create(): InertiaResponse
    {
        $permissions = \App\Models\Permission::all(['id', 'slug']);

        // Permissions display_name ekleyerek dönüştürelim
        $permissions = $permissions->map(function ($permission) {
            return [
                'id' => $permission->id,
                'name' => $permission->slug,
                'display_name' => $permission->display_name,
                'description' => trans("permissions.permissions.{$permission->slug}.description", ['default' => ''])
            ];
        });

        return Inertia::render('Admin/roles/Create', [
            'permissions' => $permissions
        ]);
    }

    /**
     * Yeni rol oluştur
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'description' => 'nullable|string|max:1000',
            'permissions' => 'nullable|array',
            'permissions.*' => 'integer|exists:permissions,id',
        ]);

        // Permissions verisini form verilerinden ayır
        $permissions = $validated['permissions'] ?? [];
        unset($validated['permissions']);

        // Slug'ı otomatik olarak isimden oluştur
        $validated['slug'] = Str::slug($validated['name']);

        $role = Role::create($validated);

        // Seçilen izinleri role ekle
        if (!empty($permissions)) {
            $role->permissions()->sync($permissions);
        }

        if ($request->wantsJson()) {
            return response()->json([
                'message' => trans('admin.roles.messages.saved'),
                'role' => $role
            ]);
        }

        return redirect()->route('admin.roles.edit', $role->id)
            ->with('success', trans('admin.roles.messages.saved'));
    }

    /**
     * Rol detaylarını göster
     */
    public function show(Role $role): InertiaResponse
    {
        // Rol izinlerini uygun formatta hazırla
        $permissions = $role->permissions->map(function ($permission) {
            return [
                'id' => $permission->id,
                'name' => $permission->slug,
                'display_name' => $permission->display_name,
                'description' => trans("permissions.permissions.{$permission->slug}.description", ['default' => ''])
            ];
        });

        $roleData = [
            'id' => $role->id,
            'name' => $role->name,
            'slug' => $role->slug,
            'description' => $role->description,
            'is_locked' => $role->is_locked->toBoolean(),
            'permissions' => $permissions,
            'users' => $role->users,
            'created_at' => $role->created_at,
            'updated_at' => $role->updated_at,
        ];

        return Inertia::render('Admin/roles/Show', [
            'role' => $roleData
        ]);
    }

    /**
     * Rol düzenleme formunu göster
     */
    public function edit(Role $role): InertiaResponse
    {
        $permissions = \App\Models\Permission::all(['id', 'slug']);

        $role_ids = $role->permissions()->pluck('permissions.id')->toArray();

        // Permissions display_name ekleyerek dönüştürelim
        $permissions = $permissions->map(function ($permission) use ($role_ids) {
            return [
                'id' => $permission->id,
                'name' => $permission->slug,
                'display_name' => $permission->display_name,
                'description' => trans("permissions.permissions.{$permission->slug}.description", ['default' => '']),
                'checked' => in_array($permission->id, $role_ids)  // Add checked status for each permission
            ];
        });

        $roleData = [
            'id' => $role->id,
            'name' => $role->name,
            'slug' => $role->slug,
            'description' => $role->description,
            'is_locked' => $role->is_locked->toBoolean(),
            'permissions' => $role_ids
        ];

        return Inertia::render('Admin/roles/Edit', [
            'role' => $roleData,
            'permissions' => $permissions
        ]);
    }

    /**
     * Rolü güncelle
     */
    public function update(Request $request, Role $role): JsonResponse|RedirectResponse
    {
        // Eğer rol kilitli ise güncelleme işlemini engelle
        if ($role->isLocked()) {
            if ($request->wantsJson()) {
                return response()->json([
                    'error' => trans('admin.roles.locked_role_description')
                ], 403);
            }

            return back()->withErrors(['error' => trans('admin.roles.locked_role_description')]);
        }

        try {
            $validated = $request->validate([
                'name' => [
                    'required',
                    'string',
                    'max:255',
                    Rule::unique('roles', 'name')->ignore($role->id),
                ],
                'description' => 'nullable|string|max:1000',
                'permissions' => 'nullable|array',
                'permissions.*' => 'nullable|integer|exists:permissions,id',
            ]);

            // Permissions verisini form verilerinden ayır ve null değerleri temizle
            $permissions = [];
            if (isset($validated['permissions']) && is_array($validated['permissions'])) {
                $permissions = array_filter($validated['permissions'], function($value) {
                    return $value !== null;
                });
            }
            unset($validated['permissions']);

            // Slug'ı otomatik olarak isimden oluştur
            $validated['slug'] = Str::slug($validated['name']);

            $role->update($validated);

            // İzinleri güncelle (boş array olsa bile sync çalışacak)
            $role->permissions()->sync($permissions);

            if ($request->wantsJson()) {
                return response()->json([
                    'message' => trans('admin.roles.messages.updated'),
                    'role' => $role->fresh(['permissions'])
                ], 200);
            }

            return back()->with('success', trans('admin.roles.messages.updated'));
        } catch (\Exception $e) {
            Log::error('Error updating role:', [
                'role_id' => $role->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            if ($request->wantsJson()) {
                return response()->json([
                    'error' => trans('admin.roles.messages.update_error')
                ], 500);
            }

            return back()->withErrors(['error' => trans('admin.roles.messages.update_error')]);
        }
    }

    /**
     * Rolü sil
     */
    public function destroy(Request $request, Role $role): JsonResponse|RedirectResponse
    {
        // Eğer rol kilitli ise silme işlemini engelle
        if ($role->isLocked()) {
            if ($request->wantsJson()) {
                return response()->json([
                    'error' => trans('admin.roles.locked_role_description')
                ], 403);
            }

            return back()->withErrors(['error' => trans('admin.roles.locked_role_description')]);
        }

        // Rol ile kullanıcı ve izin ilişkilerini temizle
        $role->users()->detach();
        $role->permissions()->detach();

        $role->delete();

        if ($request->wantsJson()) {
            return response()->json([
                'message' => trans('admin.roles.messages.deleted')
            ]);
        }

        return redirect()->route('admin.roles.index')
            ->with('success', trans('admin.roles.messages.deleted'));
    }
}
