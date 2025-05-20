<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;

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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        // Check if there are any related records before deleting
        
        // Delete the image file from storage if it exists
        if ($category->image_url) {
            $imagePath = public_path($category->image_url);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }
        
        // Delete the category
        $category->delete();
        
        return response()->json(['message' => 'Danh mục đã được xóa thành công'], 200);
    }
}
