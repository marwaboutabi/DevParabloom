<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
  public function index(Request $request)
{
    $query = Product::with('category');

    if ($request->category) {
        $query->whereHas('category', function ($q) use ($request) {
            $q->where('slug', $request->category);
        });
    }

    if ($request->sub) {
        $query->where('sub_category', $request->sub);
    }

    $products = $query->get()->map(function ($p) {
    $p->in_stock = $p->stock > 0;
    return $p; 
});
    return response()->json(['success' => true, 'data' => $products])
        ->header('Cache-Control', 'no-cache, no-store, must-revalidate')
        ->header('Pragma', 'no-cache')
        ->header('Expires', '0');
}

    public function indexAdmin()
    {
        $products = Product::with('category')->get();
        return response()->json(['success' => true, 'data' => $products]);
    }

    public function show($id)
    {
        $product = Product::with('category')->findOrFail($id);
return response()->json(['success' => true, 'data' => $product]);     }

    public function store(Request $request)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'price'       => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'image_url'   => 'nullable|string',
            'promo_price' => 'nullable|numeric|min:0',
            'stock'       => 'integer|min:0',
        ]);

        // Générer le slug automatiquement
        $slug = \Illuminate\Support\Str::slug($request->name);

        $product = Product::create([
            'name'        => $request->name,
            'slug'        => $slug,
            'price'       => $request->price,
            'category_id' => $request->category_id,
            'description' => $request->description,
            'image_url'   => $request->image_url,
            'promo_price' => $request->promo_price,
            'stock'       => $request->stock ?? 10,
            'sub_category' => $request->sub_category,
        ]);

        return response()->json(['success' => true, 'data' => $product], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $product->update([
            'name'        => $request->name        ?? $product->name,
            'price'       => $request->price       ?? $product->price,
            'category_id' => $request->category_id ?? $product->category_id,
            'description' => $request->description ?? $product->description,
            'image_url'   => $request->image_url   ?? $product->image_url,
            'promo_price' => $request->promo_price  ?? $product->promo_price,
            'stock'       => $request->stock       ?? $product->stock,
            'sub_category' => $request->sub_category ?? $product->sub_category,
        ]);

        return response()->json(['success' => true, 'data' => $product]);
    }

    public function updateStock(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update(['stock' => max(0, (int)$request->stock)]);
        return response()->json(['success' => true, 'data' => $product]);
    }

    public function destroy($id)
    {
        Product::findOrFail($id)->delete();
        return response()->json(['success' => true, 'message' => 'Produit supprimé']);
    }
}