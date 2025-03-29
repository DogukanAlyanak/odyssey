<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'locale',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'locale' => 'string',
    ];

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
    public function assignRole(Role $role): self
    {
        $this->roles()->syncWithoutDetaching($role);
        return $this;
    }

    /**
     * Kullanıcıdan belirtilen rolü kaldırır
     */
    public function removeRole(Role $role): self
    {
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
}
