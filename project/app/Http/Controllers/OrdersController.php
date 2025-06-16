<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrdersController extends Controller
{
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            // Check if all items have sufficient quantity
            foreach ($request->cart_items as $item) {
                $food = Food::find($item['food_id']);
                if (!$food || $food->quantity < $item['quantity']) {
                    throw new \Exception('Insufficient quantity for food item: ' . ($food ? $food->name : 'Unknown'));
                }
            }

            // Create the order
            $order = Order::create([
                'user_id' => Auth::id(),
                'order_date' => now(),
                'delivery_address' => $request->delivery_address,
                'contact_phone' => $request->contact_phone,
                'total_money' => $request->total_money,
            ]);

            // Create order details and update food quantities
            foreach ($request->cart_items as $item) {
                OrderDetail::create([
                    'order_id' => $order->order_id,
                    'food_id' => $item['food_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ]);

                // Update food quantity
                $food = Food::find($item['food_id']);
                $food->quantity -= $item['quantity'];
                $food->save();
            }

            DB::commit();

            return response()->json([
                'message' => 'Order created successfully',
                'order_id' => $order->order_id
            ], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'message' => 'Failed to create order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function checkQuantities(Request $request)
    {
        try {
            foreach ($request->cart_items as $item) {
                $food = Food::find($item['food_id']);
                if (!$food) {
                    return response()->json([
                        'message' => 'Món ăn không tồn tại'
                    ], 404);
                }
                if ($food->quantity < $item['quantity']) {
                    return response()->json([
                        'message' => "Món '{$food->name}' chỉ còn {$food->quantity} phần"
                    ], 400);
                }
            }

            return response()->json([
                'message' => 'Số lượng hợp lệ'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Lỗi kiểm tra số lượng',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
