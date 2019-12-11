#!/bin/bash

set -euxo pipefail

docker build game_api -t orria16/hgop:dev
GIT_COMMIT=dev docker-compose up