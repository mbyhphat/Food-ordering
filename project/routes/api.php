<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Route::middleware(['auth:sanctum', 'check.role:1'])->group(function () {

// });

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/category', [CategoryController::class, 'index']);
Route::get('/food', [FoodController::class, 'index']);
// Cổng thanh toán VNPAY

Route::post('/vnpay_payment', [PaymentController::class, 'vnpay_payment']);
// Route xử lý callback từ VNPAY
Route::get('/vnpay-return', [App\Http\Controllers\PaymentController::class, 'vnpayReturn']);

Route::apiResource('users', UserController::class);
Route::apiResource('category', CategoryController::class);

// Route::middleware(['check.role:1'])->get('/test-role', function () {
//     return 'Middleware chạy rồi!';
// });
Route::post('/vnpay_payment', [PaymentController::class, 'vnpay_payment']);
// Cổng thanh toán VNPAY

