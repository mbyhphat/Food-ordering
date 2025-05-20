<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    // public function handle(Request $request, Closure $next, $role)
    // {
    //     if (Auth::check() && Auth::user()->role == $role) {
    //         return $next($request);
    //     }

    //     return response()->json(['message' => 'Unauthorized.'], Response::HTTP_FORBIDDEN);
    // }
    public function handle(Request $request, Closure $next, $role)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'User not authenticated.'], Response::HTTP_UNAUTHORIZED);
        }

        if (Auth::user()->role != $role) {
            return response()->json(['message' => 'User does not have the required role.'], Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
