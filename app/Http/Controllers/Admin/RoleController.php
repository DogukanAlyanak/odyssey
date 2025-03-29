<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    /**
     * Rolleri listele
     */
    public function index(): Response
    {
        $roles = Role::query()
            ->select(['id', 'slug', 'name', 'description', 'is_locked', 'created_at', 'updated_at'])
            ->latest()
            ->paginate(10)
            ->withQueryString();

        // Frontend'e localizedName ile gönderiyoruz
        $roles->through(function ($role) {
            $role->display_name = $role->localizedName;
            return $role;
        });

        return Inertia::render('Admin/roles/Index', [
            'roles' => $roles,
        ]);
    }

    /**
     * Yeni rol oluşturma formunu göster
     */
    public function create(): Response
    {
        return Inertia::render('Admin/roles/Create');
    }

    /**
     * Yeni rol oluştur
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'description' => 'nullable|string|max:1000',
        ]);

        // Frontend'den display_name alıyoruz ama veritabanına kaydetmiyoruz
        // Slug'ı otomatik olarak isimden oluştur
        $validated['slug'] = Str::slug($validated['name']);

        Role::create($validated);

        return redirect()->route('admin.roles.index')
            ->with('success', 'Rol başarıyla oluşturuldu.');
    }

    /**
     * Rol detaylarını göster
     */
    public function show(Role $role): Response
    {
        $roleData = [
            'id' => $role->id,
            'name' => $role->name,
            'slug' => $role->slug,
            'display_name' => $role->localizedName, // Accessor ile çeviriden geliyor
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
    public function edit(Role $role): Response
    {
        $roleData = [
            'id' => $role->id,
            'name' => $role->name,
            'slug' => $role->slug,
            'display_name' => $role->localizedName, // Accessor ile çeviriden geliyor
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
    public function update(Request $request, Role $role): RedirectResponse
    {
        // Eğer rol kilitli ise güncelleme işlemini engelle
        if ($role->isLocked()) {
            return back()->withErrors(['error' => 'Bu rol sistem tarafından kilitlenmiş ve düzenlenemez.']);
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

        // Frontend'den display_name alıyoruz ama veritabanına kaydetmiyoruz
        // Slug'ı otomatik olarak isimden oluştur
        $validated['slug'] = Str::slug($validated['name']);

        $role->update($validated);

        return redirect()->route('admin.roles.index')
            ->with('success', 'Rol başarıyla güncellendi.');
    }

    /**
     * Rolü sil
     */
    public function destroy(Role $role): RedirectResponse
    {
        // Eğer rol kilitli ise silme işlemini engelle
        if ($role->isLocked()) {
            return back()->withErrors(['error' => 'Bu rol sistem tarafından kilitlenmiş ve silinemez.']);
        }

        // Rol ile kullanıcı ve izin ilişkilerini temizle
        $role->users()->detach();
        $role->permissions()->detach();

        $role->delete();

        return redirect()->route('admin.roles.index')
            ->with('success', 'Rol başarıyla silindi.');
    }
}
