<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FoodResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'item_id' => $this->item_id,
            'category_id' => $this->category_id,
            'category_name' => optional($this->category)->name,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'image_url' => asset("storage/{$this->image_url}"),
            'quantity' => $this->quantity,
        ];
    }
}
