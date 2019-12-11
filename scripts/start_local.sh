#!/bin/bash

set -euxo pipefail

docker build game_api -t orria16/hgop:dev
(cd game_client && npm run build)
docker build game_client -t orria16/game_client:dev

API_URL=localhost GIT_COMMIT=dev docker-compose up
