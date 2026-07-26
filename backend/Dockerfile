# ============================================================
# Production Dockerfile for Laravel Backend (Render Deployment)
# ============================================================
FROM php:8.2-cli-alpine

# Install system dependencies & PHP extensions required by Laravel
RUN apk add --no-cache \
    bash \
    curl \
    git \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    zip \
    unzip \
    oniguruma-dev \
    icu-dev \
    mysql-client \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo pdo_mysql gd zip bcmath mbstring intl opcache

# Copy Composer binary from official image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory inside container
WORKDIR /var/www/html

# Copy composer configuration files first for Docker layer caching
COPY composer.json composer.lock ./

# Install production dependencies without dev tools
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Copy full application code
COPY . .

# Generate optimized autoloader
RUN composer dump-autoload --optimize --no-dev

# Initialize storage and cache directory structure with correct permissions
RUN mkdir -p storage/app/public \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache \
    && chmod -R 777 storage bootstrap/cache

# Expose container port (Render injects $PORT dynamically)
EXPOSE 10000

# Execute production startup script
CMD ["bash", "start.sh"]
