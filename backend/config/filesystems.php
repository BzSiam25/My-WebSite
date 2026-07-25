<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Defaults to 'public' for local development, or automatically switches
    | to 'r2' (Cloudflare R2) in production when FILESYSTEM_DISK=r2.
    |
    */

    'default' => env('FILESYSTEM_DISK', 'public'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app/private'),
            'serve' => true,
            'throw' => false,
            'report' => false,
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => rtrim(env('APP_URL', 'http://localhost:8000'), '/').'/storage',
            'visibility' => 'public',
            'throw' => false,
            'report' => false,
        ],

        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => env('AWS_USE_PATH_STYLE_ENDPOINT', false),
            'throw' => false,
            'report' => false,
        ],

        /*
        |--------------------------------------------------------------------------
        | Cloudflare R2 Storage (S3-compatible API)
        |--------------------------------------------------------------------------
        */
        'r2' => [
            'driver' => 's3',
            'key' => env('CLOUDFLARE_R2_KEY', env('CLOUDFLARE_R2_ACCESS_KEY_ID', '')),
            'secret' => env('CLOUDFLARE_R2_SECRET', env('CLOUDFLARE_R2_SECRET_ACCESS_KEY', '')),
            'region' => 'auto',
            'bucket' => env('CLOUDFLARE_R2_BUCKET', ''),
            'endpoint' => env('CLOUDFLARE_R2_ENDPOINT', ''),
            'url' => env('CLOUDFLARE_R2_PUBLIC_URL', env('CLOUDFLARE_R2_URL', '')),
            'use_path_style_endpoint' => true,
            'visibility' => 'public',
            'throw' => false,
            'report' => false,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Symbolic Links
    |--------------------------------------------------------------------------
    */

    'links' => [
        public_path('storage') => storage_path('app/public'),
    ],

];
