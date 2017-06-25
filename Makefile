.PHONY: frontend

# dev
dcud-dev:
	. ./dev.sh && docker-compose up -d

dcl-dev:
	. ./dev.sh && docker-compose logs -f

dck-dev:
	. ./dev.sh && docker-compose kill

dcr-dev:
	. ./dev.sh && docker-compose rm -f

# test
dcud-test:
	. ./test.sh && docker-compose up -d

dcl-test:
	. ./test.sh && docker-compose logs -f

dck-test:
	. ./test.sh && docker-compose kill

dcr-test:
	. ./test.sh && docker-compose rm -f

# prod
dcud-prod:
	bash -c ". ./prod.sh && docker-compose up -d"

dcl-prod:
	bash -c ". ./prod.sh && docker-compose logs -f"

dck-prod:
	bash -c ". ./prod.sh && docker-compose kill"

dcr-prod:
	bash -c ". ./prod.sh && docker-compose rm -f"

# prod build
# api server base
api-server-base:
	bash -c ". ./prod.sh && increase-tag-api-server-base && build-api-server-base && push-api-server-base"

# api server
api-server:
	bash -c ". ./prod.sh && increase-tag-api-server && build-api-server && push-api-server"

# frontend base
frontend-base:
	bash -c ". ./prod.sh && increase-tag-frontend-base && build-frontend-base && push-frontend-base"

# frontend
frontend:
	bash -c ". ./prod.sh && increase-tag-frontend && build-frontend && push-frontend"
