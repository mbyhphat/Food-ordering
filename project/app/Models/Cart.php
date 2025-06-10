<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    public $timestamps = false;
    protected $table = 'carts';
    protected $primaryKey = 'cart_id';
    protected $fillable = ['customer_id', 'total_money'];

    public function details()
    {
        return $this->hasMany(CartDetail::class, 'cart_id', 'cart_id');
    }

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }
}
