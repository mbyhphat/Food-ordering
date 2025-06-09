<?php

namespace App\Http\Controllers;

use App\Models\Food;
use App\Http\Requests\StoreFoodRequest;
use App\Http\Requests\UpdateFoodRequest;
use App\Http\Resources\FoodResource;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $foods = Food::with('category')->get();
        return FoodResource::collection($foods);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFoodRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image_url')) {
            $image = $request->file('image_url');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage'), $imageName);
            $data['image_url'] = $imageName;
        }

        $food = Food::create($data);
        return response(new FoodResource($food), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Food $food)
    {
        return new FoodResource($food);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFoodRequest $request, Food $food)
    {
        $data = $request->validated();

        if ($request->hasFile('image_url')) {
            // Delete old image if it exists
            if ($food->image_url) {
                $oldImagePath = public_path('storage/' . $food->image_url);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            $image = $request->file('image_url');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage'), $imageName);
            $data['image_url'] = $imageName;
        }

        $food->update($data);
        return response(new FoodResource($food), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Food $food)
    {
        // Delete image if it exists
        if ($food->image_url) {
            $imagePath = public_path('storage/' . $food->image_url);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        $food->delete();
        return response()->json(['message' => 'Food item deleted successfully'], 204);
    }
}
