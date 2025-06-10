<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    protected $fillable = [
        'code',
        'description',
        'discount_percentage',
        'min_order_value',
        'start_date',
        'end_date'
    ];
}
