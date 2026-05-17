<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    // Les colonnes exactes de ta table 'orders'
    protected $fillable = [
        'user_id', 
        'total_price',      // Change 'total' en 'total_price'
        'status', 
        'client_info',      // Remplace address/phone par client_info
        'stripe_payment_intent_id'
    ];

    // Si client_info contient du JSON (adresse, téléphone), on le cast en tableau
    protected $casts = [
        'client_info' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}