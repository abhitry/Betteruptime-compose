# UpGuard Kubernetes Deployment

This directory contains Helm charts and deployment scripts for running UpGuard on Kubernetes.

## Prerequisites

1. **Kubernetes Cluster**: A running Kubernetes cluster (local or cloud)
2. **Helm 3.x**: Package manager for Kubernetes
3. **kubectl**: Kubernetes command-line tool
4. **Docker**: For building container images

## Quick Start

### 1. Build Docker Images

First, build all the required Docker images:

```bash
chmod +x build-images.sh
./build-images.sh
```

### 2. Deploy to Kubernetes

Deploy the application using Helm:

```bash
chmod +x deploy.sh
./deploy.sh [namespace] [release-name]
```

Example:
```bash
./deploy.sh upguard my-upguard-app
```

### 3. Access the Application

After deployment, get the application URL:

```bash
helm status upguard -n upguard
```

## Architecture

The Helm chart deploys the following components:

- **PostgreSQL**: Database (using Bitnami chart)
- **Redis**: Message queue and caching (using Bitnami chart)
- **API**: Backend REST API service
- **Frontend**: Next.js web application
- **Pusher**: Service that queues monitoring jobs
- **Worker**: Service that performs website monitoring
- **Init Jobs**: Database and Redis initialization

## Configuration

### Values.yaml

The main configuration is in `helm/upguard/values.yaml`. Key sections:

```yaml
# Database configuration
postgresql:
  enabled: true
  auth:
    database: mydb
    username: postgres
    password: postgres

# Redis configuration
redis:
  enabled: true
  auth:
    enabled: false

# Application services
api:
  replicaCount: 1
  image:
    repository: upguard/api
    tag: latest

frontend:
  replicaCount: 1
  service:
    type: LoadBalancer

worker:
  replicaCount: 2  # Scale workers as needed
```

### Environment-Specific Values

Create environment-specific values files:

```bash
# Production values
helm upgrade --install upguard ./helm/upguard \
  --namespace production \
  --values ./helm/upguard/values-production.yaml
```

## Scaling

### Scale Workers

To handle more monitoring load, scale the worker deployment:

```bash
kubectl scale deployment upguard-worker --replicas=5 -n upguard
```

Or update the Helm values:

```yaml
worker:
  replicaCount: 5
```

### Scale API

For high availability:

```yaml
api:
  replicaCount: 3
```

## Monitoring and Observability

### Check Pod Status

```bash
kubectl get pods -n upguard -l app.kubernetes.io/instance=upguard
```

### View Logs

```bash
# API logs
kubectl logs -l app.kubernetes.io/component=api -n upguard -f

# Worker logs
kubectl logs -l app.kubernetes.io/component=worker -n upguard -f

# Pusher logs
kubectl logs -l app.kubernetes.io/component=pusher -n upguard -f
```

### Database Access

```bash
# Connect to PostgreSQL
kubectl exec -it upguard-postgresql-0 -n upguard -- psql -U postgres -d mydb

# Connect to Redis
kubectl exec -it upguard-redis-master-0 -n upguard -- redis-cli
```

## Ingress Configuration

The chart includes Ingress configuration for external access:

```yaml
ingress:
  enabled: true
  className: nginx
  hosts:
    - host: upguard.yourdomain.com
      paths:
        - path: /
          pathType: Prefix
          service: frontend
        - path: /api
          pathType: Prefix
          service: api
```

## Persistence

Both PostgreSQL and Redis are configured with persistent volumes:

```yaml
postgresql:
  primary:
    persistence:
      enabled: true
      size: 8Gi

redis:
  master:
    persistence:
      enabled: true
      size: 8Gi
```

## Security Considerations

1. **Secrets Management**: Use Kubernetes secrets for sensitive data
2. **Network Policies**: Implement network policies to restrict pod communication
3. **RBAC**: Configure proper role-based access control
4. **Image Security**: Scan images for vulnerabilities

### Using Secrets

Create a secret for database credentials:

```bash
kubectl create secret generic upguard-db-secret \
  --from-literal=username=postgres \
  --from-literal=password=your-secure-password \
  -n upguard
```

## Troubleshooting

### Common Issues

1. **Pods stuck in Pending**: Check resource requests and node capacity
2. **Init containers failing**: Check database/Redis connectivity
3. **Image pull errors**: Ensure images are built and accessible

### Debug Commands

```bash
# Describe pod for events
kubectl describe pod <pod-name> -n upguard

# Check resource usage
kubectl top pods -n upguard

# Check persistent volumes
kubectl get pv,pvc -n upguard
```

## Cleanup

To remove the deployment:

```bash
helm uninstall upguard -n upguard
kubectl delete namespace upguard
```

## Production Considerations

1. **Resource Limits**: Set appropriate CPU/memory limits
2. **Health Checks**: Configure liveness and readiness probes
3. **Backup Strategy**: Implement database backup procedures
4. **Monitoring**: Set up Prometheus/Grafana monitoring
5. **Logging**: Configure centralized logging (ELK stack)
6. **High Availability**: Deploy across multiple nodes/zones