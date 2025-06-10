<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartDetail extends Model
{
    public $timestamps = false;
    protected $table = 'carts_details';
    protected $primaryKey = ['cart_id', 'customer_id', 'food_id'];
    public $incrementing = false;
    protected $fillable = ['cart_id', 'customer_id', 'food_id', 'quantity'];

    public function cart()
    {
        return $this->belongsTo(Cart::class, 'cart_id', 'cart_id');
    }

    public function food()
    {
        return $this->belongsTo(Food::class, 'food_id', 'item_id');
    }
}
