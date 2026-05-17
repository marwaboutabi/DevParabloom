<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\CookieConsentController;

Route::prefix('v1')->group(function () {

    // ==================== AUTH ====================
    Route::prefix('auth')->group(function () {

        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login',    [AuthController::class, 'login']);

        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/user', function (Request $request) {
                return response()->json(['success' => true, 'data' => $request->user()]);
            });
            Route::post('/logout', function (Request $request) {
                $request->user()->currentAccessToken()->delete();
                return response()->json(['success' => true, 'message' => 'Logged out']);
            });
        });
    });

    // ==================== PUBLIC ====================
    Route::get('/products',      [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::get('/categories',    [CategoryController::class, 'index']);
    Route::post('/cookie-consent', [CookieConsentController::class, 'store']); // ← ici

    // ==================== USER (protégé - connecté requis) ====================
    Route::middleware('auth:sanctum')->group(function () {
        
        // 🛒 Créer une commande (depuis le frontend utilisateur)
        Route::post('/orders', [OrderController::class, 'store']);
        
        // Voir ses propres commandes (optionnel, pour l'historique utilisateur)
        Route::get('/my-orders', [OrderController::class, 'myOrders']);
        
    });

    // ==================== ADMIN (protégé - admin requis) ====================
    Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
        Route::get('/dashboard',             [AdminController::class,  'dashboard']);
        Route::get('/products',              [ProductController::class, 'indexAdmin']);
        Route::post('/products',             [ProductController::class, 'store']);
        Route::put('/products/{id}',         [ProductController::class, 'update']);
        Route::delete('/products/{id}',      [ProductController::class, 'destroy']);
        Route::patch('/products/{id}/stock', [ProductController::class, 'updateStock']);
        Route::get('/orders',                [OrderController::class,   'index']);
        Route::get('/customers',             [OrderController::class,   'customers']);
    });

});