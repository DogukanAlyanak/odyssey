<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Business extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'company_id',
        'name',
        'slug',
        'email',
        'phone',
        'address',
        'website',
        'description',
        'is_active',
        'is_locked',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_locked' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($business) {
            if (empty($business->slug)) {
                $business->slug = Str::slug($business->name);
            }
        });

        static::updating(function ($business) {
            if ($business->isDirty('name') && empty($business->slug)) {
                $business->slug = Str::slug($business->name);
            }
        });
    }

    /**
     * İşletmenin bağlı olduğu şirket.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
