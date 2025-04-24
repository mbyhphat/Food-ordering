<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    protected $table = 'food_items';
    protected $primaryKey = 'item_id';
    protected $fillable = ['category_id', 'name', 'description', 'price', 'image_url', 'quantity'];
    public $timestamps = false;

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
