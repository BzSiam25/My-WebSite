<?php

$allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
];

if (env('FRONTEND_URL')) {
    $allowedOrigins[] = rtrim(env('FRONTEND_URL'), '/');
}

if (env('ALLOWED_ORIGINS')) {
    $extra = array_filter(array_map(fn($o) => rtrim(trim($o), '/'), explode(',', env('ALLOWED_ORIGINS'))));
    $allowedOrigins = array_merge($allowedOrigins, $extra);
}

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Configured to allow both local development (localhost:5173) and live
    | production domains (Netlify / custom domains via environment variables).
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'storage/*'],

    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    'allowed_origins' => array_values(array_unique($allowedOrigins)),

    'allowed_origins_patterns' => ['*.netlify.app'],

    'allowed_headers' => [
        'Content-Type',
        'X-Requested-With',
        'Authorization',
        'Accept',
        'Origin',
        'X-CSRF-TOKEN',
    ],

    'exposed_headers' => ['Content-Disposition'],

    'max_age' => 86400,

    'supports_credentials' => true,

];
