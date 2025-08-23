#!/bin/bash
set -e

POSTGRES_HOST=${1:-postgres}
POSTGRES_PORT=${2:-5432}
POSTGRES_USER=${3:-postgres}

echo "Waiting for Postgres at $POSTGRES_HOST:$POSTGRES_PORT..."

until pg_isready -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" > /dev/null 2>&1; do
  echo "Postgres is unavailable - sleeping"
  sleep 2
done

echo "Postgres is up!"