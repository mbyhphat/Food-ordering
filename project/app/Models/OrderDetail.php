<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    protected $table = 'Orders_Details';
    protected $primaryKey = ['food_id', 'order_id'];
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'food_id',
        'order_id',
        'quantity',
        'price'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'order_id');
    }

    public function food()
    {
        return $this->belongsTo(Food::class, 'food_id', 'item_id');
    }
}
