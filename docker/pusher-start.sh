#!/bin/bash
set -e

echo "Starting Pusher service..."

# Wait for Redis
echo "Waiting for Redis..."
/app/wait-for-redis.sh redis 6379

# Wait for API to be ready (it handles DB setup)
echo "Waiting for API to be ready..."
until curl -f http://api:3001/health 2>/dev/null || [ $? -eq 7 ]; do
  echo "API not ready - sleeping"
  sleep 5
done

echo "Starting Pusher..."
exec bun run index.ts