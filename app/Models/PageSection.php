<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
