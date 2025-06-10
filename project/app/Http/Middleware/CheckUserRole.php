<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Log;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        try {
            $user = $request->user();
            if (!$user || !in_array($user->role, $roles)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không có quyền truy cập.',
                ], 403);
            }
        } catch (\Exception $e) {
            Log::error('Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Đã có lỗi bất thường xảy ra',
            ], 401);
        }
        return $next($request);
    }
}
