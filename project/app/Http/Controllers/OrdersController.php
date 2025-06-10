<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrdersController extends Controller
{
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            // Create the order
            $order = Order::create([
                'user_id' => Auth::id(),
                'order_date' => now(),
                'delivery_address' => $request->delivery_address,
                'contact_phone' => $request->contact_phone,
                'total_money' => $request->total_money,
            ]);

            // Create order details
            foreach ($request->cart_items as $item) {
                OrderDetail::create([
                    'order_id' => $order->order_id,
                    'food_id' => $item['food_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ]);
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
}
