# 1. Dev

## Env files

Source the dev.sh file before starting

## Backing services

Backing services are started using docker

```
$ dcud (docker-compose up -d)
```

## API Server

API server are started using mix in elixir

```
$ ./dev-server.sh
```

## Frontend

- First time installation
  - Install Node 6.7.0
  - Install yarn
  - Run command

```
$ yarn install
```

- To start frontend server

```
$ yarn run dev
```

- To start webpack server

```
$ yarn run watch
```

- To start flow server

```
$ yarn run flow
```

## Default data

Default username/password: admin/admin
