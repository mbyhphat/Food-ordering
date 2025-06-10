<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use Illuminate\Support\Facades\Log;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return CategoryResource::collection(Category::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();

        // Handle file upload
        if ($request->hasFile('image_url')) {
            $image = $request->file('image_url');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage'), $imageName);
            $data['image_url'] = $imageName;
        }

        $category = Category::create($data);
        return response(new CategoryResource($category), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $data = $request->validated();

        // Handle file upload
        if ($request->hasFile('image_url')) {
            // Delete old image if it exists
            if ($category->image_url) {
                $oldImagePath = public_path('storage/' . $category->image_url);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            // Store new image
            $image = $request->file('image_url');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage'), $imageName);
            $data['image_url'] = $imageName;
        }

        $category->update($data);
        return new CategoryResource($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        try {
            // Delete all food images first
            foreach ($category->foods as $food) {
                if ($food->image_url) {
                    $foodImagePath = public_path('storage/' . $food->image_url);
                    if (file_exists($foodImagePath)) {
                        unlink($foodImagePath);
                    }
                }
            }

            // Delete category image
            if ($category->image_url) {
                $categoryImagePath = public_path('storage/' . $category->image_url);
                if (file_exists($categoryImagePath)) {
                    unlink($categoryImagePath);
                }
            }

            // The category deletion will cascade to foods due to the model relationship
            $category->delete();

            return response()->json([
                'message' => 'Danh mục và các món ăn liên quan đã được xóa thành công'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting category: ' . $e->getMessage());
            return response()->json([
                'message' => 'Không thể xóa danh mục. Vui lòng thử lại sau.'
            ], 500);
        }
    }
}
