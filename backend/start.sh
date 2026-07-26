#!/bin/bash
set -e

echo "Starting Render Production Deployment Setup..."

# Ensure storage & cache directory structure exists with correct permissions
mkdir -p storage/app/public storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache
chmod -R 775 storage bootstrap/cache || true

# Run database migrations in production
php artisan migrate --force

# Create public storage symlink if missing
php artisan storage:link || true

# Clear application caches
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Start Laravel application server on Render PORT
php artisan serve --host=0.0.0.0 --port=${PORT:-10000}
