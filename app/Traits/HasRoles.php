<?php

namespace App\Traits;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

trait HasRoles
{
    /**
     * Kullanıcının sahip olduğu rolleri döndürür
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * Kullanıcıya belirtilen rolü ekler
     */
    public function assignRole($role): self
    {
        if (is_string($role)) {
            $role = Role::where('slug', $role)->firstOrFail();
        }
        $this->roles()->syncWithoutDetaching($role);
        return $this;
    }

    /**
     * Kullanıcıdan belirtilen rolü kaldırır
     */
    public function removeRole($role): self
    {
        if (is_string($role)) {
            $role = Role::where('slug', $role)->firstOrFail();
        }
        $this->roles()->detach($role);
        return $this;
    }

    /**
     * Kullanıcının belirtilen role sahip olup olmadığını kontrol eder
     */
    public function hasRole(string $role): bool
    {
        return $this->roles->contains('slug', $role);
    }

    /**
     * Kullanıcının belirtilen rollerden herhangi birine sahip olup olmadığını kontrol eder
     */
    public function hasAnyRole(array $roles): bool
    {
        foreach ($roles as $role) {
            if ($this->hasRole($role)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Kullanıcının belirtilen tüm rollere sahip olup olmadığını kontrol eder
     */
    public function hasAllRoles(array $roles): bool
    {
        foreach ($roles as $role) {
            if (!$this->hasRole($role)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Kullanıcının belirtilen izne sahip olup olmadığını kontrol eder
     * Bu kontrol rollerinden gelen izinlere bakarak yapılır
     */
    public function hasPermissionViaRoles(string $permission): bool
    {
        foreach ($this->roles as $role) {
            if ($role->hasPermissionTo($permission)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Kullanıcı bir izne sahip mi kontrol eder
     * Admin rolüne sahip kullanıcılar otomatik olarak tüm izinlere sahiptir
     */
    public function hasPermission(string $permission): bool
    {
        // Admin rolüne sahip kullanıcılar her zaman tüm izinlere sahiptir
        if ($this->hasRole('admin')) {
            return true;
        }

        return $this->hasPermissionViaRoles($permission);
    }
}
