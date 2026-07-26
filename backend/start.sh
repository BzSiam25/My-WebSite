#!/bin/bash
set -e

echo "Starting Render Production Deployment..."

# Ensure storage & cache directory structure exists with correct permissions
mkdir -p storage/app/public \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache
chmod -R 777 storage bootstrap/cache || true

# Run database migrations in production
echo "Running Database Migrations..."
php artisan migrate --force

# Create public storage symlink if missing
echo "Creating Storage Link..."
php artisan storage:link || true

# Clear and optimize application caches for production
echo "Optimizing Laravel Caches for Production..."
php artisan config:clear
php artisan route:clear
php artisan view:clear

php artisan config:cache
php artisan route:cache
php artisan view:cache

# Determine PORT (Render sets $PORT dynamically, default to 10000)
PORT="${PORT:-10000}"
echo "Server listening on 0.0.0.0:${PORT}..."

# Start Laravel application server on Render PORT
exec php artisan serve --host=0.0.0.0 --port="${PORT}"
