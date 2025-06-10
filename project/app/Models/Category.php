<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'category';
    protected $primaryKey = 'category_id';
    protected $fillable = ['name', 'image_url'];
    public $timestamps = false;

    public function foods()
    {
        return $this->hasMany(Food::class, 'category_id', 'category_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($category) {
            // Delete all associated food items
            $category->foods()->delete();
        });
    }
}
