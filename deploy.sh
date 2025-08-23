#!/bin/bash

# Deploy UpGuard application to Kubernetes using Helm
set -e

NAMESPACE=${1:-upguard}
RELEASE_NAME=${2:-upguard}

echo "Deploying UpGuard to Kubernetes..."
echo "Namespace: $NAMESPACE"
echo "Release Name: $RELEASE_NAME"

# Create namespace if it doesn't exist
kubectl create namespace $NAMESPACE --dry-run=client -o yaml | kubectl apply -f -

# Add Bitnami repository for PostgreSQL and Redis
echo "Adding Bitnami Helm repository..."
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update

# Install or upgrade the Helm chart
echo "Installing/upgrading Helm chart..."
helm upgrade --install $RELEASE_NAME ./helm/upguard \
  --namespace $NAMESPACE \
  --wait \
  --timeout 10m

echo "Deployment completed!"

# Show deployment status
echo "Checking deployment status..."
kubectl get pods -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME

# Show services
echo "Services:"
kubectl get svc -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME

# Show ingress if enabled
echo "Ingress:"
kubectl get ingress -n $NAMESPACE -l app.kubernetes.io/instance=$RELEASE_NAME

echo ""
echo "To get the application URL, run:"
echo "helm status $RELEASE_NAME -n $NAMESPACE"