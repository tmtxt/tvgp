#!/usr/bin/env sh

export COMPOSE_PROJECT_NAME=tvgp_prod
export COMPOSE_FILE=docker-compose.prod.yml

export POSTGRES_SERVER=postgres
export POSTGRES_PORT=5432
export POSTGRES_DATABASE=tvgp
export POSTGRES_USER=tvgp
export POSTGRES_ENSURE_STORAGE=true

export NEO4J_SERVER=neo4j
export NEO4J_PORT=7687

export API_SERVER_SERVER=api_server
export API_SERVER_PORT=4000
export API_SERVER_CODE_RELOADER=false
export API_SERVER_STACKTRACE_DEPTH=10
export API_SERVER_SEED_DATA=true

export REDIS_SERVER=redis
export REDIS_PORT=6379

function build_api_server_base {
    if [ $# -eq 0 ]
    then
        echo "You need to specify a tag"
        return 1
    fi

    (cd api_server && docker build -f Dockerfile.base -t tmtxt/tvgp-api-server-base:$1 .)
}

function push_api_server_base {
    if [ $# -eq 0 ]
    then
        echo "You need to specify a tag"
        return 1
    fi
    docker push tmtxt/tvgp-api-server-base:$1
}
