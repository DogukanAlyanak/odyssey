<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Lang;

class Permission extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'slug'
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'display_name',
    ];

    /**
     * Bu izne sahip olan rolleri döndürür
     */
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }

    /**
     * İzin adını dil dosyasından alır
     */
    public function getDisplayNameAttribute(): string
    {
        return Lang::has("permissions.permissions.{$this->slug}.name")
            ? Lang::get("permissions.permissions.{$this->slug}.name")
            : $this->slug;
    }
}

