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

# increase the input version
# 0.0.2 -> 0.0.3
function increment-version() {
    local v=$1
    if [ -z $2 ]; then
        local rgx='^((?:[0-9]+\.)*)([0-9]+)($)'
    else
        local rgx='^((?:[0-9]+\.){'$(($2-1))'})([0-9]+)(\.|$)'
        for (( p=`grep -o "\."<<<".$v"|wc -l`; p<$2; p++)); do
            v+=.0; done; fi
    val=`echo -e "$v" | perl -pe 's/^.*'$rgx'.*$/$2/'`
    echo "$v" | perl -pe s/$rgx.*$'/${1}'`printf %0${#val}s $(($val+1))`/
}

# increase the tag version
# api-server-base-0.0.2 -> api-server-base-0.0.3
function increase-tag {
    local latest_tag=`git describe --tags --match "$project_tag*" --abbrev=0 HEAD`
    local version=`echo $latest_tag | egrep -o '[0-9.]+$'`
    local incremented_version=`increment-version $version`
    local tag="$1-$incremented_version"
    git tag -a $tag -m "version $tag"
    echo $tag
}

function increase-tag-api-server-base {
    increase-tag "api-server-base"
}

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
