<?php

namespace App\Models;

use App\Enums\BooleanStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'is_locked',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_locked' => 'integer',
    ];

    /**
     * Role'ün sahip olduğu izinleri döndürür
     */
    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class);
    }

    /**
     * Bu role sahip kullanıcıları döndürür
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Role belirtilen izni ekler
     */
    public function givePermissionTo(Permission $permission): self
    {
        $this->permissions()->syncWithoutDetaching($permission);
        return $this;
    }

    /**
     * Role belirtilen izni kaldırır
     */
    public function revokePermissionTo(Permission $permission): self
    {
        $this->permissions()->detach($permission);
        return $this;
    }

    /**
     * Role'ün belirtilen izne sahip olup olmadığını kontrol eder
     */
    public function hasPermissionTo(string $permission): bool
    {
        return $this->permissions->contains('slug', $permission);
    }

    /**
     * Rolün kilitli olup olmadığını kontrol eder
     */
    public function isLocked(): bool
    {
        return $this->is_locked === BooleanStatus::TRUE->value;
    }

    /**
     * Rolü kilitler
     */
    public function lock(): self
    {
        $this->is_locked = BooleanStatus::TRUE->value;
        $this->save();
        return $this;
    }

    /**
     * Rolün kilidini açar
     */
    public function unlock(): self
    {
        $this->is_locked = BooleanStatus::FALSE->value;
        $this->save();
        return $this;
    }

    /**
     * Is_locked alanını BooleanStatus enum'una dönüştürür
     */
    public function getIsLockedAttribute($value): BooleanStatus
    {
        return BooleanStatus::from($value);
    }
}
