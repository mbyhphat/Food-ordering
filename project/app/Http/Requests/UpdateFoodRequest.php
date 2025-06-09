<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFoodRequest extends FormRequest
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
            'name' => [
                'sometimes',
                'required',
                'string',
                'max:255',
                Rule::unique('food_items', 'name')->ignore($this->route('food')),
            ],
            'category_id' => 'sometimes|required|exists:category,category_id',
            'image_url' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            'price' => 'sometimes|required|numeric|min:0',
            'description' => 'sometimes|nullable|string|max:255',
            'quantity' => 'sometimes|required|numeric|min:0',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Tên món ăn là bắt buộc',
            'name.string' => 'Tên món ăn phải là chuỗi ký tự',
            'name.max' => 'Tên món ăn không được vượt quá 255 ký tự',
            'name.unique' => 'Món ăn này đã tồn tại',
            'category_id.required' => 'Danh mục là bắt buộc',
            'category_id.exists' => 'Danh mục không hợp lệ',
            'image_url.image' => 'File phải là hình ảnh',
            'image_url.mimes' => 'Hình ảnh phải có định dạng: jpeg, png, jpg, gif',
            'image_url.max' => 'Kích thước hình ảnh không được vượt quá 2MB',
            'price.required' => 'Giá món ăn là bắt buộc',
            'price.numeric' => 'Giá phải là một số',
            'price.min' => 'Giá không được nhỏ hơn 0',
            'description.string' => 'Mô tả phải là một chuỗi ký tự',
            'description.max' => 'Mô tả không được vượt quá 255 ký tự',
            'quantity.required' => 'Số lượng là bắt buộc',
            'quantity.numeric' => 'Số lượng phải là một số',
            'quantity.min' => 'Số lượng không được nhỏ hơn 0',
        ];
    }
}
