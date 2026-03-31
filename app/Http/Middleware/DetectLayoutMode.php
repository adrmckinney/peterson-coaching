<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;

class DetectLayoutMode
{
    public const SCROLL = 'scroll';

    public const PAGES = 'pages';

    public const SESSION_KEY = 'site_layout';

    /**
     * Read ?layout= query param, persist to session, and share with all views.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->has('layout')) {
            $layout = $request->query('layout') === self::PAGES ? self::PAGES : self::SCROLL;
            $request->session()->put(self::SESSION_KEY, $layout);
        }

        $layoutMode = $request->session()->get(self::SESSION_KEY, self::SCROLL);

        View::share('layoutMode', $layoutMode);

        return $next($request);
    }
}
