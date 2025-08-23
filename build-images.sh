#!/bin/bash

# Build all Docker images for Kubernetes deployment
set -e

echo "Building Docker images for Kubernetes deployment..."

# Build API image
echo "Building API image..."
docker build -f docker/Dockerfile.backend -t upguard/api:latest .

# Build Frontend image
echo "Building Frontend image..."
docker build -f docker/Dockerfile.frontend -t upguard/frontend:latest .

# Build Pusher image
echo "Building Pusher image..."
docker build -f docker/Dockerfile.pusher -t upguard/pusher:latest .

# Build Worker image
echo "Building Worker image..."
docker build -f docker/Dockerfile.worker -t upguard/worker:latest .

# Build Init image
echo "Building Init image..."
docker build -f docker/Dockerfile.init -t upguard/init:latest .

echo "All images built successfully!"

# Optional: Tag images for a registry
# Uncomment and modify these lines if you want to push to a registry
# docker tag upguard/api:latest your-registry.com/upguard/api:latest
# docker tag upguard/frontend:latest your-registry.com/upguard/frontend:latest
# docker tag upguard/pusher:latest your-registry.com/upguard/pusher:latest
# docker tag upguard/worker:latest your-registry.com/upguard/worker:latest
# docker tag upguard/init:latest your-registry.com/upguard/init:latest

echo "To push to a registry, uncomment and modify the registry URLs in this script"