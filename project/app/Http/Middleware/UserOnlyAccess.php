<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class UserOnlyAccess
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
            return response()->json([
                'status' => 'error',
                'message' => 'Authentication required',
                'redirect' => 'http://localhost:3000/login'
            ], Response::HTTP_UNAUTHORIZED);
        }

        if (Auth::user()->role !== 0) {
            return response()->json([
                'status' => 'error',
                'message' => 'User access only',
                'redirect' => 'http://localhost:5173'
            ], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
