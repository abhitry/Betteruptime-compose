#!/bin/bash

HOST=${1:-redis}
PORT=${2:-6379}

echo "Waiting for Redis at $HOST:$PORT..."

while ! nc -z "$HOST" "$PORT"; do
  echo "Redis is unavailable - sleeping"
  sleep 1
done

echo "Redis is up!"