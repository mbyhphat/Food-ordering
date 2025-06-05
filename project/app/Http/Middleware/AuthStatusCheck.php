<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthStatusCheck
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
        // Add user auth info to all responses
        $response = $next($request);
        
        // For API responses
        if ($response->headers->get('Content-Type') === 'application/json') {
            $content = json_decode($response->getContent(), true) ?: [];
            
            $content['auth'] = [
                'isAuthenticated' => Auth::check(),
                'userRole' => Auth::check() ? Auth::user()->role : null,
                'shouldUseAdminPortal' => Auth::check() && Auth::user()->role === 1,
            ];
            
            $response->setContent(json_encode($content));
        }
        
        return $response;
    }
}
