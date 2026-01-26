<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PageSection extends Model
{
    /** @use HasFactory<\Database\Factories\PageSectionFactory> */
    use HasFactory;

    protected $fillable = [
        'settings',
        'visible',
        'sort_order',
        'page_id',
        'type',
    ];

    protected $casts = [
        'settings' => 'array'
    ];

    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }

    public function videos(): HasMany
    {
        return $this->hasMany(Video::class);
    }
}
