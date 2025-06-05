<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class VerifyAccessByPortAndRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return $next($request);
        }

        $referer = $request->headers->get('referer');
        $user = Auth::user();
        
        // Admin (role = 1) trying to access from user port (3000)
        if ($user->role === 1 && $referer && strpos($referer, 'localhost:3000') !== false) {
            return response()->json([
                'status' => 'redirect',
                'message' => 'Admin should use admin portal',
                'redirect' => 'http://localhost:5173'
            ], Response::HTTP_FORBIDDEN);
        }
        
        // User (role = 0) trying to access from admin port (5173)
        if ($user->role === 0 && $referer && strpos($referer, 'localhost:5173') !== false) {
            return response()->json([
                'status' => 'redirect',
                'message' => 'Regular user should use user portal',
                'redirect' => 'http://localhost:3000'
            ], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
