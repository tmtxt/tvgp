# docker-compose up -d
dcud-dev:
	. ./dev.sh && docker-compose up -d

dcl-dev:
	. ./dev.sh && docker-compose logs -f

dck-dev:
	. ./dev.sh && docker-compose kill

dcr-dev:
	. ./dev.sh && docker-compose rm -f
