<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'email' => ['required', 'email'],
            'phone' => ['required', 'regex:/^(0|\+84)[0-9]{9}$/'],
            'address' => 'required',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols()
                    ->numbers()
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Bạn chưa nhập tên!',
            'email.required' => 'Bạn chưa nhập địa chỉ email!',
            'email.email' => 'Vui lòng nhập đúng định dạng địa chỉ email!',
            'phone.required' => 'Bạn chưa nhập số điện thoại!',
            'phone.regex' => 'Vui lòng nhập đúng số điện thoại!',
            'address.required' => 'Bạn chưa nhập địa chỉ!',
            'password.required' => 'Bạn chưa nhập mật khẩu!',
            'password.confirmed' => 'Mật khẩu xác thực không khớp với mật khẩu đăng ký!',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
            'password.numbers' => 'Mật khẩu phải chứa ít nhất một chữ số.',
            'password.symbols' => 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt.',
        ];
    }
}
