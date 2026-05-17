<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user', 'items.product'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id'           => $order->id,
                    'date'         => $order->created_at->format('d/m/Y H:i'),
                    'clientEmail'  => $order->user ? $order->user->email : 'Anonyme',
                    'clientName'   => $order->user ? $order->user->name : 'Anonyme',
                    'total'        => $order->total_price,
                    'status'       => $order->status ? $order->status : 'en_attente',
                    'items'        => $order->items->map(function($item) {
                        return [
                            'name'     => $item->product ? $item->product->name : 'Produit inconnu',
                            'quantity' => $item->quantity,
                            'price'    => $item->price,
                        ];
                    })
                ];
            });

        return response()->json(['success' => true, 'data' => $orders]);
    }

    public function customers()
    {
        $customers = User::where('role', 'user')
            ->withCount('orders')
            ->withSum('orders', 'total_price')
            ->get()
            ->map(function ($user) {
                return [
                    'email'        => $user->email,
                    'name'         => $user->name,
                    'ordersCount'  => $user->orders_count,
                    'totalSpent'   => $user->orders_sum_total_price ? $user->orders_sum_total_price : 0,
                    'orders'       => $user->orders()
                        ->with('items.product')
                        ->orderBy('created_at', 'desc')
                        ->get()
                        ->map(function($order) {
                            return [
                                'id'    => $order->id,
                                'date'  => $order->created_at->format('d/m/Y H:i'),
                                'total' => $order->total_price,
                                'items' => $order->items->map(function($item) {
                                    return [
                                        'name'     => $item->product ? $item->product->name : 'Produit inconnu',
                                        'quantity' => $item->quantity,
                                    ];
                                })
                            ];
                        })
                ];
            });

        return response()->json(['success' => true, 'data' => $customers]);
    }

    public function store(Request $request)
{
    $user = $request->user();

    $validated = $request->validate([
        'items'            => 'required|array|min:1',
        'items.*.id'       => 'required|exists:products,id',
        'items.*.quantity' => 'required|integer|min:1',
        'total_price'      => 'required|numeric|min:0',
        'client_info'      => 'required|string|max:1000',
    ]);

    foreach ($validated['items'] as $item) {
        $product = Product::find($item['id']);
        if ($product && $product->stock < $item['quantity']) {
            return response()->json([
                'success' => false,
                'message' => "Stock insuffisant pour \"{$product->name}\" (stock disponible : {$product->stock})"
            ], 422);
        }
    }

    return DB::transaction(function () use ($user, $validated) {
        $order = Order::create([
            'user_id'     => $user->id,
            'total_price' => $validated['total_price'],
            'status'      => 'pending',
            'client_info' => $validated['client_info'],
        ]);

        foreach ($validated['items'] as $item) {
            $product = Product::find($item['id']);
            if ($product) {
                OrderItem::create([
                    'order_id'   => $order->id,
                    'product_id' => $product->id,
                    'quantity'   => $item['quantity'],
                    'price'      => $product->price,
                ]);

                $product->decrement('stock', $item['quantity']);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Commande créée avec succès',
            'data'    => $order->load('items.product')
        ], 201);
    });
}

    // 🆕 VOIR SES PROPRES COMMANDES (optionnel, pour l'historique utilisateur)
    public function myOrders(Request $request)
    {
        $orders = $request->user()->orders()
            ->with('items.product')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                return [
                    'id'      => $order->id,
                    'date'    => $order->created_at->format('d/m/Y H:i'),
                    'total'   => $order->total_price,
                    'status'  => $order->status,
                    'items'   => $order->items->map(function($item) {
                        return [
                            'name'     => $item->product ? $item->product->name : 'Produit inconnu',
                            'quantity' => $item->quantity,
                            'price'    => $item->price,
                        ];
                    })
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $orders
        ]);
    }
}