#!/bin/bash

# Docker Build and Management Script for Vivarily React Application
# Usage: ./docker-build.sh [command] [options]

set -e

# Configuration
IMAGE_NAME="vivarily-app"
CONTAINER_NAME="vivarily-container"
DEV_CONTAINER_NAME="vivarily-dev"
PROD_PORT=3000
DEV_PORT=3001

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Helper functions
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

print_step() {
    echo -e "${CYAN}→${NC} $1"
}

# Show help
show_help() {
    echo -e "${PURPLE}Vivarily Docker Management Script${NC}"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo -e "${YELLOW}Commands:${NC}"
    echo "  build-prod          Build production image"
    echo "  build-dev           Build development image"
    echo "  build-test          Build testing image"
    echo "  run-prod            Build and run production container"
    echo "  run-dev             Build and run development container"
    echo "  stop                Stop all containers"
    echo "  clean               Remove containers and images"
    echo "  logs                Show container logs"
    echo "  shell               Open shell in running container"
    echo "  health              Check container health"
    echo "  status              Show container status"
    echo "  restart             Restart containers"
    echo ""
    echo -e "${YELLOW}Docker Compose Commands:${NC}"
    echo "  compose-up          Start production with docker-compose"
    echo "  compose-dev         Start development with docker-compose"
    echo "  compose-test        Run tests with docker-compose"
    echo "  compose-down        Stop all docker-compose services"
    echo ""
    echo -e "${YELLOW}Options:${NC}"
    echo "  -h, --help          Show this help message"
    echo "  -v, --verbose       Verbose output"
    echo "  --no-cache          Build without cache"
    echo "  --pull              Pull latest base images"
    echo ""
    echo -e "${YELLOW}Examples:${NC}"
    echo "  $0 build-prod --no-cache    # Build production without cache"
    echo "  $0 run-dev                  # Run development container"
    echo "  $0 compose-up               # Start with docker-compose"
    echo "  $0 logs                     # View container logs"
}

# Parse options
VERBOSE=false
NO_CACHE=""
PULL=""

while [[ $# -gt 0 ]]; do
    case $1 in
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        --no-cache)
            NO_CACHE="--no-cache"
            shift
            ;;
        --pull)
            PULL="--pull"
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            COMMAND="$1"
            shift
            ;;
    esac
done

# Verbose logging
log_verbose() {
    if [ "$VERBOSE" = true ]; then
        echo -e "${CYAN}[VERBOSE]${NC} $1"
    fi
}

# Check if Docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Build production image
build_prod() {
    print_header "Building Production Image"
    check_docker
    
    print_step "Building ${IMAGE_NAME}:latest with target 'production'"
    log_verbose "Build command: docker build ${NO_CACHE} ${PULL} --target production -t ${IMAGE_NAME}:latest ."
    
    docker build ${NO_CACHE} ${PULL} --target production -t ${IMAGE_NAME}:latest .
    
    if [ $? -eq 0 ]; then
        print_success "Production image built successfully!"
        docker images ${IMAGE_NAME}:latest
    else
        print_error "Production build failed!"
        exit 1
    fi
}

# Build development image
build_dev() {
    print_header "Building Development Image"
    check_docker
    
    print_step "Building ${IMAGE_NAME}:dev with target 'development'"
    log_verbose "Build command: docker build ${NO_CACHE} ${PULL} --target development -t ${IMAGE_NAME}:dev ."
    
    docker build ${NO_CACHE} ${PULL} --target development -t ${IMAGE_NAME}:dev .
    
    if [ $? -eq 0 ]; then
        print_success "Development image built successfully!"
        docker images ${IMAGE_NAME}:dev
    else
        print_error "Development build failed!"
        exit 1
    fi
}

# Build testing image
build_test() {
    print_header "Building Testing Image"
    check_docker
    
    print_step "Building ${IMAGE_NAME}:test with target 'testing'"
    log_verbose "Build command: docker build ${NO_CACHE} ${PULL} --target testing -t ${IMAGE_NAME}:test ."
    
    docker build ${NO_CACHE} ${PULL} --target testing -t ${IMAGE_NAME}:test .
    
    if [ $? -eq 0 ]; then
        print_success "Testing image built successfully!"
        docker images ${IMAGE_NAME}:test
    else
        print_error "Testing build failed!"
        exit 1
    fi
}

# Run production container
run_prod() {
    print_header "Starting Production Container"
    
    # Build first
    build_prod
    
    # Stop existing container if running
    print_step "Stopping existing production container..."
    docker stop ${CONTAINER_NAME} 2>/dev/null || true
    docker rm ${CONTAINER_NAME} 2>/dev/null || true
    
    print_step "Starting new production container..."
    docker run -d \
        --name ${CONTAINER_NAME} \
        -p ${PROD_PORT}:80 \
        --restart unless-stopped \
        ${IMAGE_NAME}:latest
    
    if [ $? -eq 0 ]; then
        print_success "Production container started successfully!"
        print_info "🌐 Access your app at: http://localhost:${PROD_PORT}"
        print_info "📊 Health check: http://localhost:${PROD_PORT}/health"
        print_info "🐳 Container name: ${CONTAINER_NAME}"
        
        # Wait a moment and check health
        sleep 3
        check_health_silent
    else
        print_error "Failed to start production container!"
        exit 1
    fi
}

# Run development container
run_dev() {
    print_header "Starting Development Container"
    
    # Build first
    build_dev
    
    # Stop existing container if running
    print_step "Stopping existing development container..."
    docker stop ${DEV_CONTAINER_NAME} 2>/dev/null || true
    docker rm ${DEV_CONTAINER_NAME} 2>/dev/null || true
    
    print_step "Starting new development container with hot reload..."
    docker run -d \
        --name ${DEV_CONTAINER_NAME} \
        -p ${DEV_PORT}:3000 \
        -v "$(pwd)/src:/app:cached" \
        -v "/app/node_modules" \
        -e NODE_ENV=development \
        -e CHOKIDAR_USEPOLLING=true \
        ${IMAGE_NAME}:dev
    
    if [ $? -eq 0 ]; then
        print_success "Development container started successfully!"
        print_info "🌐 Access your app at: http://localhost:${DEV_PORT}"
        print_info "🔥 Hot reload enabled - edit files in ./src"
        print_info "🐳 Container name: ${DEV_CONTAINER_NAME}"
        
        # Show logs for a few seconds
        print_step "Showing initial logs..."
        sleep 2
        docker logs --tail 10 ${DEV_CONTAINER_NAME}
    else
        print_error "Failed to start development container!"
        exit 1
    fi
}

# Stop containers
stop_containers() {
    print_header "Stopping Containers"
    
    print_step "Stopping production container..."
    docker stop ${CONTAINER_NAME} 2>/dev/null && print_info "Production container stopped" || print_warning "Production container not running"
    
    print_step "Stopping development container..."
    docker stop ${DEV_CONTAINER_NAME} 2>/dev/null && print_info "Development container stopped" || print_warning "Development container not running"
    
    print_success "All containers stopped"
}

# Clean up containers and images
clean_up() {
    print_header "Cleaning Up"
    
    print_step "Stopping containers..."
    docker stop ${CONTAINER_NAME} ${DEV_CONTAINER_NAME} 2>/dev/null || true
    
    print_step "Removing containers..."
    docker rm ${CONTAINER_NAME} ${DEV_CONTAINER_NAME} 2>/dev/null || true
    
    print_step "Removing images..."
    docker rmi ${IMAGE_NAME}:latest ${IMAGE_NAME}:dev ${IMAGE_NAME}:test 2>/dev/null || true
    
    print_step "Cleaning up unused Docker resources..."
    docker system prune -f
    
    print_success "Cleanup completed"
}

# Show logs
show_logs() {
    print_header "Container Logs"
    
    if docker ps --format "table {{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
        print_info "📋 Production container logs (${CONTAINER_NAME}):"
        docker logs -f ${CONTAINER_NAME}
    elif docker ps --format "table {{.Names}}" | grep -q "^${DEV_CONTAINER_NAME}$"; then
        print_info "📋 Development container logs (${DEV_CONTAINER_NAME}):"
        docker logs -f ${DEV_CONTAINER_NAME}
    else
        print_warning "No running containers found"
        print_info "Available containers:"
        docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    fi
}

# Open shell in container
open_shell() {
    print_header "Opening Shell"
    
    if docker ps --format "table {{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
        print_info "🐚 Opening shell in production container..."
        docker exec -it ${CONTAINER_NAME} /bin/sh
    elif docker ps --format "table {{.Names}}" | grep -q "^${DEV_CONTAINER_NAME}$"; then
        print_info "🐚 Opening shell in development container..."
        docker exec -it ${DEV_CONTAINER_NAME} /bin/sh
    else
        print_error "No running containers found"
        exit 1
    fi
}

# Check health (silent version)
check_health_silent() {
    if docker ps --format "table {{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
        if curl -sf http://localhost:${PROD_PORT}/health >/dev/null 2>&1; then
            print_success "✅ Production container is healthy"
        else
            print_warning "⚠️  Production container health check failed"
        fi
    fi
}

# Check health
check_health() {
    print_header "Health Check"
    
    if docker ps --format "table {{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
        print_step "Checking production container health..."
        if curl -f http://localhost:${PROD_PORT}/health; then
            print_success "✅ Production container is healthy"
        else
            print_error "❌ Production container health check failed"
        fi
    elif docker ps --format "table {{.Names}}" | grep -q "^${DEV_CONTAINER_NAME}$"; then
        print_step "Checking development container..."
        if curl -f http://localhost:${DEV_PORT} >/dev/null 2>&1; then
            print_success "✅ Development container is responding"
        else
            print_error "❌ Development container is not responding"
        fi
    else
        print_warning "No running containers found"
    fi
}

# Show status
show_status() {
    print_header "Container Status"
    
    print_info "🐳 Docker containers:"
    docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}\t{{.Image}}" | grep -E "(NAMES|${IMAGE_NAME}|${CONTAINER_NAME}|${DEV_CONTAINER_NAME})" || print_warning "No Vivarily containers found"
    
    echo ""
    print_info "📦 Docker images:"
    docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedAt}}" | grep -E "(REPOSITORY|${IMAGE_NAME})" || print_warning "No Vivarily images found"
}

# Restart containers
restart_containers() {
    print_header "Restarting Containers"
    
    if docker ps --format "table {{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
        print_step "Restarting production container..."
        docker restart ${CONTAINER_NAME}
        print_success "Production container restarted"
    fi
    
    if docker ps --format "table {{.Names}}" | grep -q "^${DEV_CONTAINER_NAME}$"; then
        print_step "Restarting development container..."
        docker restart ${DEV_CONTAINER_NAME}
        print_success "Development container restarted"
    fi
}

# Docker Compose commands
compose_up() {
    print_header "Starting with Docker Compose"
    check_docker
    
    docker-compose up -d
    print_success "✅ Production services started with docker-compose"
    print_info "🌐 Access at: http://localhost:3000"
}

compose_dev() {
    print_header "Starting Development with Docker Compose"
    check_docker
    
    docker-compose --profile dev up -d
    print_success "✅ Development services started"
    print_info "🌐 Access at: http://localhost:3001"
}

compose_test() {
    print_header "Running Tests with Docker Compose"
    check_docker
    
    docker-compose --profile test up --abort-on-container-exit
    print_info "Tests completed"
}

compose_down() {
    print_header "Stopping Docker Compose Services"
    
    docker-compose down --remove-orphans
    print_success "✅ All services stopped"
}

# Main script logic
case "${COMMAND:-}" in
    build-prod)
        build_prod
        ;;
    build-dev)
        build_dev
        ;;
    build-test)
        build_test
        ;;
    run-prod)
        run_prod
        ;;
    run-dev)
        run_dev
        ;;
    stop)
        stop_containers
        ;;
    clean)
        clean_up
        ;;
    logs)
        show_logs
        ;;
    shell)
        open_shell
        ;;
    health)
        check_health
        ;;
    status)
        show_status
        ;;
    restart)
        restart_containers
        ;;
    compose-up)
        compose_up
        ;;
    compose-dev)
        compose_dev
        ;;
    compose-test)
        compose_test
        ;;
    compose-down)
        compose_down
        ;;
    "")
        print_error "No command specified"
        echo ""
        show_help
        exit 1
        ;;
    *)
        print_error "Unknown command: $COMMAND"
        echo ""
        show_help
        exit 1
        ;;
esac