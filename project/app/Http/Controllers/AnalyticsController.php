<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    public function getAnalytics(Request $request)
    {
        $month = $request->query('month');
        $year = $request->query('year');

        // Tổng đơn hàng
        $totalOrders = DB::table('orders')
            ->whereMonth('order_date', $month)
            ->whereYear('order_date', $year)
            ->count();

        // Tổng doanh thu
        $totalRevenue = DB::table('orders')
            ->whereMonth('order_date', $month)
            ->whereYear('order_date', $year)
            ->sum('total_money');

        // Tổng món ăn
        $totalFoodItems = DB::table('food_items')->count();

        // Doanh thu theo tháng trong năm
        $monthlyRevenue = [];
        for ($m = 1; $m <= 12; $m++) {
            $monthlyRevenue[] = [
                'month' => "T$m",
                'revenue' => DB::table('orders')
                    ->whereMonth('order_date', $m)
                    ->whereYear('order_date', $year)
                    ->sum('total_money'),
                'isSelected' => $m == $month
            ];
        }

        // Top món ăn
        $topFoodItems = DB::table('orders_details as od')
            ->join('food_items as fi', 'od.food_id', '=', 'fi.item_id')
            ->join('orders as o', 'od.order_id', '=', 'o.order_id')
            ->whereMonth('o.order_date', $month)
            ->whereYear('o.order_date', $year)
            ->select('fi.name', DB::raw('SUM(od.quantity) as sold'), DB::raw('SUM(od.price * od.quantity) as revenue'))
            ->groupBy('fi.name')
            ->orderByDesc('sold')
            ->limit(5)
            ->get();

        // Top danh mục
        $topCategories = DB::table('orders_details as od')
            ->join('food_items as fi', 'od.food_id', '=', 'fi.item_id')
            ->join('category as c', 'fi.category_id', '=', 'c.category_id')
            ->join('orders as o', 'od.order_id', '=', 'o.order_id')
            ->whereMonth('o.order_date', $month)
            ->whereYear('o.order_date', $year)
            ->select('c.name', DB::raw('COUNT(*) as orders'))
            ->groupBy('c.name')
            ->orderByDesc('orders')
            ->limit(4)
            ->get();

        // Tính tổng đơn để lấy phần trăm
        $totalCatOrders = $topCategories->sum('orders');
        foreach ($topCategories as $cat) {
            $cat->percentage = round(($cat->orders / max($totalCatOrders, 1)) * 100);
        }

        return response()->json([
            'totalOrders' => $totalOrders,
            'totalRevenue' => $totalRevenue,
            'totalFoodItems' => $totalFoodItems,
            'revenueByMonth' => $monthlyRevenue,
            'topFoodItems' => $topFoodItems,
            'topCategories' => $topCategories
        ]);
    }
}
