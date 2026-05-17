<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;

class AdminController extends Controller
{
    public function dashboard()
    {
        return response()->json([
            'success' => true,
            'data' => [
                'total_sales'      => Order::sum('total_price') ?? 0,
                'total_orders'     => Order::count(),
                'unique_customers' => Order::distinct('user_id')->count(),
                'average_order'    => Order::avg('total_price') ?? 0,
                
                'total_customers'  => User::where('role', 'user')->count(),
                'low_stock'        => Product::where('stock', '>', 0)->where('stock', '<', 5)->count(),
                'out_of_stock'     => Product::where('stock', 0)->count(),
            ]
        ]);
    }
}