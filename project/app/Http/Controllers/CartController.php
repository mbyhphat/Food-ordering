<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function getCart()
    {
        $cart = Cart::with('details.food')
            ->where('customer_id', Auth::id())
            ->first();

        if (!$cart) {
            return response()->json(['cart' => null]);
        }

        $formattedCart = [];
        foreach ($cart->details as $detail) {
            $formattedCart[$detail->food_id] = $detail->quantity;
        }

        return response()->json(['cart' => $formattedCart]);
    }
    public function updateCart(Request $request)
    {
        $cart = Cart::firstOrCreate(['customer_id' => Auth::id()]);
        $customerId = Auth::id();

        // Get the updated cart items from the request
        $cartItems = $request->input('cartItems', []);
        $totalMoney = $request->input('totalAmount', 0);

        // Delete existing cart details
        CartDetail::where('cart_id', $cart->cart_id)->delete();

        // Add new cart details
        foreach ($cartItems as $foodId => $quantity) {
            if ($quantity > 0) {
                CartDetail::create([
                    'cart_id' => $cart->cart_id,
                    'customer_id' => $customerId,
                    'food_id' => $foodId,
                    'quantity' => $quantity
                ]);
            }
        }

        // Update total money
        $cart->total_money = $totalMoney;
        $cart->save();

        return response()->json(['message' => 'Cart updated successfully']);
    }

    public function clearCart()
    {
        $cart = Cart::where('customer_id', Auth::id())->first();

        if ($cart) {
            CartDetail::where('cart_id', $cart->cart_id)->delete();
            $cart->delete();
        }

        return response()->json(['message' => 'Cart cleared successfully']);
    }
}
