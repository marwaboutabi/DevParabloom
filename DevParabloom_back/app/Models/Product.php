<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'slug', 'price', 'promo_price',
        'description', 'image_url', 'category_id','sub_category', 'stock'
    ];

    protected $appends = ['in_stock'];

    public function getInStockAttribute(): bool
    {
        return ($this->stock ?? 0) > 0;
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}