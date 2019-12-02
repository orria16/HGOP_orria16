#!/bin/bash

GIT_COMMIT=$1

docker build -t orria16/hgop:$GIT_COMMIT item_repository/ || exit 1