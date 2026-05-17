<?php

namespace App\Http\Controllers;

use App\Models\CookieConsent;
use Illuminate\Http\Request;

class CookieConsentController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'essential'  => 'boolean',
            'functional' => 'boolean',
            'analytics'  => 'boolean',
            'marketing'  => 'boolean',
        ]);

        CookieConsent::updateOrCreate(
            [
                'user_id'    => auth()->id(),
                'ip_address' => $request->ip(),
            ],
            [
                ...$data,
                'consented_at' => now(),
            ]
        );

        return response()->json(['message' => 'Consentement enregistré']);
    }
}