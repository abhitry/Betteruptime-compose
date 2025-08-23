#!/bin/bash
set -e

echo "Starting Postgres initialization..."

# Wait for Postgres
/app/wait-for-postgres.sh postgres 5432
echo "Postgres is up!"

cd /app/packages/store

# Ensure node_modules exists
bun install

# Generate Prisma client
bun run generate

# Run migrations
bun run migrate:deploy

# Run seed
echo "Running database seed..."
#bun run seed
#bunx prisma db seed
#bun run prisma/seed.ts
npm run seed

echo "Postgres initialization completed successfully!"