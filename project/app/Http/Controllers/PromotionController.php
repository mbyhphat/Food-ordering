<?php

namespace App\Http\Controllers;

use App\Models\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    public function index()
    {
        return Promotion::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'code' => 'required|unique:promotions,code',
            'description' => 'required|string',
            'discount_percentage' => 'required|numeric|min:0|max:100',
            'min_order_value' => 'required|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        return Promotion::create($data);
    }

    public function update(Request $request, $id)
    {
        $promotion = Promotion::findOrFail($id);

        $data = $request->validate([
            'code' => 'required|unique:promotions,code,' . $promotion->id,
            'description' => 'required|string',
            'discount_percentage' => 'required|numeric|min:0|max:100',
            'min_order_value' => 'required|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $promotion->update($data);
        return $promotion;
    }

    public function destroy($id)
    {
        $promotion = Promotion::findOrFail($id);
        $promotion->delete();

        return response()->json(['message' => 'Đã xóa mã khuyến mãi thành công']);
    }
}
