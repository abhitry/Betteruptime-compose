#!/bin/bash
set -e

echo "Starting API entrypoint script..."

# Wait for Postgres to be ready
/app/docker/wait-for-postgres.sh postgres 5432

# Wait for Redis to be ready
/app/docker/wait-for-redis.sh redis 6379

# At this point, migrations + seeds are already done by init containers
echo "Dependencies ready. Starting API server..."

cd /app/apps/api
exec bun run index.ts