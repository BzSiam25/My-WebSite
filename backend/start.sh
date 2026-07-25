#!/bin/bash
set -e

echo "Starting Railway Production Deployment Setup..."

# Run database migrations in production
php artisan migrate --force

# Optimize Laravel application caches
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Start Laravel application server
php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
