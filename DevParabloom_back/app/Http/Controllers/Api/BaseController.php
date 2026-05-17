<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class BaseController extends Controller
{
    protected function sendResponse($data, $message = 'Success', $code = 200): JsonResponse
    {
        return response()->json(['success' => true, 'data' => $data, 'message' => $message], $code);
    }

    protected function sendError($error, $code = 400, $errors = []): JsonResponse
    {
        return response()->json(['success' => false, 'error' => $error, 'errors' => $errors], $code);
    }
}