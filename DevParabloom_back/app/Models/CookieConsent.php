<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CookieConsent extends Model
{
    protected $fillable = [
        'user_id',
        'ip_address',
        'essential',
        'functional',
        'analytics',
        'marketing',
        'consented_at',
    ];

    protected $casts = [
        'essential'    => 'boolean',
        'functional'   => 'boolean',
        'analytics'    => 'boolean',
        'marketing'    => 'boolean',
        'consented_at' => 'datetime',
    ];
}