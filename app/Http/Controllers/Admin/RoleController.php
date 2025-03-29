<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class RoleController extends Controller
{
    /**
     * Rolleri listele
     */
    public function index(): InertiaResponse
    {
        $roles = Role::query()
            ->select(['id', 'slug', 'name', 'description', 'is_locked', 'created_at', 'updated_at'])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/roles/Index', [
            'roles' => $roles,
        ]);
    }

    /**
     * Yeni rol oluşturma formunu göster
     */
    public function create(): InertiaResponse
    {
        return Inertia::render('Admin/roles/Create');
    }

    /**
     * Yeni rol oluştur
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'description' => 'nullable|string|max:1000',
        ]);

        // Slug'ı otomatik olarak isimden oluştur
        $validated['slug'] = Str::slug($validated['name']);

        $role = Role::create($validated);

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
        $roleData = [
            'id' => $role->id,
            'name' => $role->name,
            'slug' => $role->slug,
            'description' => $role->description,
            'is_locked' => $role->is_locked,
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
        $roleData = [
            'id' => $role->id,
            'name' => $role->name,
            'slug' => $role->slug,
            'description' => $role->description,
            'is_locked' => $role->is_locked,
        ];

        return Inertia::render('Admin/roles/Edit', [
            'role' => $roleData
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

        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('roles', 'name')->ignore($role->id),
            ],
            'description' => 'nullable|string|max:1000',
        ]);

        // Slug'ı otomatik olarak isimden oluştur
        $validated['slug'] = Str::slug($validated['name']);

        $role->update($validated);

        if ($request->wantsJson()) {
            return response()->json([
                'message' => trans('admin.roles.messages.updated'),
                'role' => $role
            ]);
        }

        return redirect()->back()->withInput()
            ->with('success', trans('admin.roles.messages.updated'));
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
