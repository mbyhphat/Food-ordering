<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
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
            'name' => 'required|unique:category,name',
            'image_url' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'name.unique' => 'Danh mục này đã tồn tại!',
            'image_url.required' => 'Hình ảnh danh mục là bắt buộc',
            'image_url.image' => 'File phải là hình ảnh',
            'image_url.mimes' => 'Hình ảnh phải có định dạng: jpeg, png, jpg, gif',
            'image_url.max' => 'Kích thước hình ảnh không được vượt quá 2MB',
        ];
    }
}
