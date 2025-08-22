#!/bin/bash
set -e

echo "Starting API entrypoint script..."

# Wait for Postgres
echo "Waiting for Postgres..."
until pg_isready -h postgres -p 5432 -U postgres -d mydb; do
  echo "Postgres is unavailable - sleeping"
  sleep 2
done
echo "Postgres is up!"

# Wait for Redis
echo "Waiting for Redis..."
until nc -z redis 6379; do
  echo "Redis is unavailable - sleeping"
  sleep 2
done
echo "Redis is up!"

# Run Prisma migrations
echo "Running Prisma migrations..."
cd /app/packages/store
bun run migrate:deploy

# Seed the database
echo "Seeding database..."
bun run seed

# Create Redis consumer groups
echo "Setting up Redis consumer groups..."
bun run -e "
import { createClient } from 'redis';
const client = createClient({ url: 'redis://redis:6379' });
await client.connect();
try {
  await client.xGroupCreate('betteruptime:website', 'f5a13f6c-8e91-42b8-9c0e-07b4567a98e0', '\$', { MKSTREAM: true });
  console.log('Created consumer group f5a13f6c-8e91-42b8-9c0e-07b4567a98e0');
} catch (e) {
  console.log('Consumer group f5a13f6c-8e91-42b8-9c0e-07b4567a98e0 already exists or error:', e.message);
}
try {
  await client.xGroupCreate('betteruptime:website', '32c9087b-7c53-4d84-8b63-32517cbd17c3', '\$', { MKSTREAM: true });
  console.log('Created consumer group 32c9087b-7c53-4d84-8b63-32517cbd17c3');
} catch (e) {
  console.log('Consumer group 32c9087b-7c53-4d84-8b63-32517cbd17c3 already exists or error:', e.message);
}
await client.quit();
"

# Start the API server
echo "Starting API server..."
cd /app/apps/api
exec bun run index.ts