#!/bin/bash
#
GIT_COMMIT=$1
docker build -t orria16/hgop:$GIT_COMMIT . || exit 1