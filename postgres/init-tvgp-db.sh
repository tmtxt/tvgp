#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    CREATE USER tvgp;
    CREATE DATABASE tvgp WITH OWNER = tvgp;
EOSQL
