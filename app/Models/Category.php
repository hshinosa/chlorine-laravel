<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Category extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'is_publish',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_publish' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Scope untuk kategori yang dipublish
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_publish', true);
    }

    /**
     * Scope untuk pencarian
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string|null $search
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if ($search) {
            return $query->where('name', 'like', '%' . $search . '%');
        }
        
        return $query;
    }

    /**
     * Accessor untuk status publish
     *
     * @return string
     */
    public function getStatusAttribute(): string
    {
        return $this->is_publish ? 'Published' : 'Draft';
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName(): string
    {
        return 'id';
    }
}
