#!/usr/bin/env sh

export COMPOSE_PROJECT_NAME=tvgp_prod
export COMPOSE_FILE=docker-compose.prod.yml

export POSTGRES_SERVER=postgres
export POSTGRES_PORT=5432
export POSTGRES_DATABASE=tvgp
export POSTGRES_USER=tvgp
export POSTGRES_ENSURE_STORAGE=true

export NEO4J_SERVER=neo4j
export NEO4J_PORT=7474

export API_SERVER_SERVER=api_server
export API_SERVER_PORT=4000
export API_SERVER_CODE_RELOADER=false
export API_SERVER_STACKTRACE_DEPTH=10
export API_SERVER_SEED_DATA=true

export REDIS_SERVER=redis
export REDIS_PORT=6379

export DEFAULT_PERSON_PICTURE=/img/userbasic.jpg

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
# call "increase-tag api-server-base"
# tag will be increased to api-server-base-v0.0.2
function increase-tag {
    local latest_tag=`git describe --tags --match "$1-v*" --abbrev=0 HEAD`
    local version=`echo $latest_tag | egrep -o '[0-9.]+$'`
    local incremented_version=`increment-version $version`
    local tag="$1-v$incremented_version"
    git tag -a $tag -m "version $tag"
    echo $tag
}


####################
# api server base
# increase tag for api server base
function increase-tag-api-server-base {
    # increase tag
    increase-tag "api-server-base"

    # replace api server base tag in dockerfile
    local latest_tag=`git describe --tags --match "api-server-base-v*" --abbrev=0 HEAD`
    local version=`echo $latest_tag | egrep -o '[0-9.]+$'`
    (cd api_server &&
         sed "s/tvgp-api-server-base:[0-9.]*/tvgp-api-server-base:$version/g" < ./Dockerfile > ./Dockerfile_new &&
         mv ./Dockerfile_new ./Dockerfile
    )
}

# build api server base with latest tag
function build-api-server-base {
    local latest_tag=`git describe --tags --match "api-server-base-v*" --abbrev=0 HEAD`
    local version=`echo $latest_tag | egrep -o '[0-9.]+$'`
    echo "Build api-server-base:$version"
    (cd api_server && docker build -f Dockerfile.base -t tmtxt/tvgp-api-server-base:$version .)
}

# push api server base with latest tag
function push-api-server-base {
    local latest_tag=`git describe --tags --match "api-server-base-v*" --abbrev=0 HEAD`
    local version=`echo $latest_tag | egrep -o '[0-9.]+$'`
    echo "Push api-server-base:$version"
    docker push tmtxt/tvgp-api-server-base:$version
}

####################
# api server
function increase-tag-api-server {
    # increase tag
    increase-tag "api-server"

    # replace in docker compose file
    local latest_tag=`git describe --tags --match "api-server-v*" --abbrev=0 HEAD`
    local version=`echo $latest_tag | egrep -o '[0-9.]+$'`
    (sed "s/tvgp-api-server:[0-9.]*/tvgp-api-server:$version/g" < ./docker-compose.prod.yml > ./docker-compose.prod.yml_new &&
         mv ./docker-compose.prod.yml_new ./docker-compose.prod.yml
    )
}

# build api server with latest tag
function build-api-server {
    local latest_tag=`git describe --tags --match "api-server-v*" --abbrev=0 HEAD`
    local version=`echo $latest_tag | egrep -o '[0-9.]+$'`
    echo "Build api-server:$version"
    (cd api_server && docker build -t tmtxt/tvgp-api-server:$version .)
}

function push-api-server {
    local latest_tag=`git describe --tags --match "api-server-v*" --abbrev=0 HEAD`
    local version=`echo $latest_tag | egrep -o '[0-9.]+$'`
    echo "Push api-server:$version"
    docker push tmtxt/tvgp-api-server:$version
}

####################
# frontend base
# increase tag for frontend base
function increase-tag-frontend-base {
    # increase tag
    increase-tag "frontend-base"

    # replace api server base tag in dockerfile
    local latest_tag=`git describe --tags --match "frontend-base-v*" --abbrev=0 HEAD`
    local version=`echo $latest_tag | egrep -o '[0-9.]+$'`
    (cd frontend &&
         sed "s/tvgp-frontend-base:[0-9.]*/tvgp-frontend-base:$version/g" < ./Dockerfile > ./Dockerfile_new &&
         mv ./Dockerfile_new ./Dockerfile
    )
}

# build api server base with latest tag
function build-frontend-base {
    local latest_tag=`git describe --tags --match "frontend-base-v*" --abbrev=0 HEAD`
    local version=`echo $latest_tag | egrep -o '[0-9.]+$'`
    echo "Build frontend-base:$version"
    (cd frontend && docker build -f Dockerfile.base -t tmtxt/tvgp-frontend-base:$version .)
}

# push api server base with latest tag
function push-frontend-base {
    local latest_tag=`git describe --tags --match "frontend-base-v*" --abbrev=0 HEAD`
    local version=`echo $latest_tag | egrep -o '[0-9.]+$'`
    echo "Push frontend-base:$version"
    docker push tmtxt/tvgp-frontend-base:$version
}

####################
# frontend
function increase-tag-frontend {
    # increase tag
    increase-tag "frontend"

    # replace in docker compose file
    local latest_tag=`git describe --tags --match "frontend-v*" --abbrev=0 HEAD`
    local version=`echo $latest_tag | egrep -o '[0-9.]+$'`
    (sed "s/tvgp-frontend:[0-9.]*/tvgp-frontend:$version/g" < ./docker-compose.prod.yml > ./docker-compose.prod.yml_new &&
         mv ./docker-compose.prod.yml_new ./docker-compose.prod.yml
    )
}

# build frontend with latest tag
function build-frontend {
    local latest_tag=`git describe --tags --match "frontend-v*" --abbrev=0 HEAD`
    local version=`echo $latest_tag | egrep -o '[0-9.]+$'`
    echo "Build frontend:$version"
    (cd frontend && docker build -t tmtxt/tvgp-frontend:$version .)
}

function push-frontend {
    local latest_tag=`git describe --tags --match "frontend-v*" --abbrev=0 HEAD`
    local version=`echo $latest_tag | egrep -o '[0-9.]+$'`
    echo "Push frontend:$version"
    docker push tmtxt/tvgp-frontend:$version
}
