#!/bin/sh
until pg_isready -h "$POSTGRES_HOST" -p 5432 -U "$POSTGRES_USER" > /dev/null 2>&1; do
  echo "Waiting for Postgres..."
  sleep 2
done
exec "$@"