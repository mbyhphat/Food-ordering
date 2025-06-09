<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFoodRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|unique:food_items,name',
            'category_id' => 'required|exists:category,category_id',
            'image_url' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string|max:255',
            'quantity' => 'required|numeric|min:0', // Add this line
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Tên món ăn là bắt buộc',
            'name.unique' => 'Món ăn này đã tồn tại!',
            // 'category_id.required' => 'Danh mục là bắt buộc',
            // 'category_id.exists' => 'Danh mục không hợp lệ',
            'image_url.required' => 'Hình ảnh món ăn là bắt buộc',
            'image_url.image' => 'File phải là hình ảnh',
            'image_url.mimes' => 'Hình ảnh phải có định dạng: jpeg, png, jpg, gif',
            'image_url.max' => 'Kích thước hình ảnh không được vượt quá 2MB',
            'price.required' => 'Giá món ăn là bắt buộc',
            'price.numeric' => 'Giá phải là một số',
            'price.min' => 'Giá không được nhỏ hơn 0',
            'description.string' => 'Mô tả phải là một chuỗi ký tự',
            'description.max' => 'Mô tả không được vượt quá 255 ký tự',
        ];
    }
}
