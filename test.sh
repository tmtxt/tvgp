#!/usr/bin/env sh

export COMPOSE_PROJECT_NAME=tvgp_test
export COMPOSE_FILE=docker-compose.test.yml

export POSTGRES_SERVER=localhost
export POSTGRES_PORT=40001
export POSTGRES_DATABASE=tvgp
export POSTGRES_USER=tvgp
export POSTGRES_ENSURE_STORAGE=true

export API_SERVER_PORT=40002
export API_SERVER_CODE_RELOADER=false
export API_SERVER_STACKTRACE_DEPTH=20
export API_SERVER_SEED_DATA=true

export REDIS_SERVER=localhost
export REDIS_PORT=40003
