<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrdersController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\AnalyticsController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/category', [CategoryController::class, 'index']);
Route::get('/food', [FoodController::class, 'index']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth:sanctum', 'check.role:0'])->group(function () {
    Route::get('/cart', [CartController::class, 'getCart']);
    Route::post('/cart', [CartController::class, 'updateCart']);
    Route::delete('/cart', [CartController::class, 'clearCart']);
    Route::post('/orders', [OrdersController::class, 'store']);
    Route::post('/check-quantities', [OrdersController::class, 'checkQuantities']);
});

// Admin routes (role 1)
Route::middleware(['auth:sanctum', 'check.role:1'])->group(function () {
    Route::apiResource('users', UserController::class);
    // Admin category routes (except index which is public)
    Route::apiResource('category', CategoryController::class)->except(['index']);
    // Admin food routes (except index which is public)
    Route::apiResource('food', FoodController::class)->except(['index']);
});

// Cổng thanh toán VNPAY
Route::post('/vnpay_payment', [PaymentController::class, 'vnpay_payment']);
// Route xử lý callback từ VNPAY
Route::get('/vnpay_return', [PaymentController::class, 'vnpay_return']);

// API MÃ GIẢM GIÁ 
Route::apiResource('promotions', PromotionController::class);

//Plot biểu đồ 
Route::get('/analytics', [AnalyticsController::class, 'getAnalytics']);
