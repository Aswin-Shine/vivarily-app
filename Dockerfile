# Multi-stage Dockerfile for Vivarily React Application
# Optimized for production with security and performance best practices

# ================================
# Stage 1: Dependencies & Build
# ================================
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install system dependencies for better build performance
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    && rm -rf /var/cache/apk/*

# Copy package.json first for better Docker layer caching
COPY src/package.json ./package.json

# Copy the lock file required by npm ci
COPY src/package-lock.json ./package-lock.json

# Install dependencies with clean install for reproducible builds
RUN npm ci  && npm cache clean --force

# Copy all source files
COPY src/ ./

# Build the application
RUN npm run build

# Verify build output exists
RUN ls -la dist/ && echo "Build completed successfully"

# ================================
# Stage 2: Production Runtime
# ================================
FROM nginx:1.25-alpine AS production

# Install security updates and essential utilities
RUN apk update && \
    apk add --no-cache \
    dumb-init \
    curl \
    ca-certificates \
    && rm -rf /var/cache/apk/*

# Create optimized nginx configuration for React SPA
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
# Vivarily React App Nginx Configuration
server {
listen 80;
server_name _;
root /usr/share/nginx/html;
index index.html;

# Security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;

# Content Security Policy for React app with external resources
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://esm.sh; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://esm.sh; img-src 'self' data: https:; object-src 'none'; base-uri 'self';" always;

# Gzip compression configuration
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_comp_level 6;
gzip_types
text/plain
text/css
text/xml
text/javascript
application/javascript
application/xml+rss
application/json
application/ld+json
image/svg+xml
text/x-component;


# Handle React Router (client-side routing)
location / {
try_files $uri $uri/ /index.html;

# Cache control for HTML files (no cache)
location ~* \.html$ {
expires -1;
add_header Cache-Control "no-cache, no-store, must-revalidate";
add_header Pragma "no-cache";
}
}

# Aggressive caching for static assets
location ~* \.(js|css|tsx|ts|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|webp|avif)$ {
expires 1y;
add_header Cache-Control "public, immutable";
access_log off;

# Enable CORS for fonts and assets
add_header Access-Control-Allow-Origin "*";
}

# Handle service worker with no cache
location ~* \.(sw\.js|workbox-.*\.js)$ {
expires -1;
add_header Cache-Control "no-cache, no-store, must-revalidate";
}

# API proxy (if needed for development)
location /api/ {
# Uncomment and configure if you have an API backend
# proxy_pass http://backend:8000/;
# proxy_set_header Host $host;
# proxy_set_header X-Real-IP $remote_addr;
return 404;
}

# Health check endpoint
location /health {
access_log off;
return 200 "healthy\n";
add_header Content-Type text/plain;
}

# Security: deny access to sensitive files
location ~ /\.(env|git|htaccess|htpasswd) {
deny all;
access_log off;
log_not_found off;
}

location ~ \.(json|md|txt)$ {
location ~ /(package|composer|bower)\.json$ {
deny all;
}
location ~ /README\.md$ {
deny all;
}
}

# Prevent access to source maps in production
location ~ \.map$ {
deny all;
access_log off;
log_not_found off;
}
}
EOF

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Set proper file permissions
RUN find /usr/share/nginx/html -type f -exec chmod 644 {} \; && \
    find /usr/share/nginx/html -type d -exec chmod 755 {} \;

# Create non-root user for security
RUN addgroup -g 1001 -S appgroup && \
    adduser -S appuser -u 1001 -G appgroup

# Change ownership of nginx directories to non-root user
RUN chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    chown -R appuser:appgroup /etc/nginx/conf.d && \
    chown -R appuser:appgroup /usr/share/nginx/html && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid

# Switch to non-root user
USER appuser

# Expose port 80
EXPOSE 80

# Health check with proper timeout and retries
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start nginx in foreground mode
CMD ["nginx", "-g", "daemon off;"]

# ================================
# Stage 3: Development (Optional)
# ================================
FROM node:18-alpine AS development

# Set working directory
WORKDIR /app

# Install development dependencies
RUN apk add --no-cache \
    git \
    python3 \
    make \
    g++

# Copy package.json
COPY src/package.json ./package.json

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy source code
COPY src/ ./

# Expose development port
EXPOSE 3000

# Set environment variables for development
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true

# Start development server with hot reload
CMD ["npm", "run", "dev"]

# ================================
# Stage 4: Testing (Optional)
# ================================
FROM builder AS testing

# Install testing dependencies
RUN npm install --save-dev \
    @testing-library/react \
    @testing-library/jest-dom \
    vitest \
    jsdom

# Copy test files (if they exist)
COPY src/test* ./
COPY src/**/*.test.* ./

# Run tests
RUN npm run test 2>/dev/null || echo "No tests configured"

# This stage can be used for CI/CD pipelines