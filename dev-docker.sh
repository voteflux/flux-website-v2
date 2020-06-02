#!/usr/bin/env bash

# npm command to run
ACTION="$1"

set -x

docker build -f ./_docker-dev/Dockerfile -t flux-website-docker-dev:latest .

export NODE_ENV="development"
# don't need this with wsl2
#_PWD=$(wslpath -w $PWD 2>/dev/null || echo $PWD)
_PWD=$PWD
_MNT="$_PWD:/target"
echo "mounting: $_MNT"
docker run -ti -p 9000:9000 --rm \
  --mount "type=bind,src=$_PWD,dst=/src" \
  -w /src \
  --env NODE_ENV=$NODE_ENV \
  flux-website-docker-dev:latest npm run docker-dev -- ${ACTION:-flux}

# --network host \
# -v "$_MNT" -w /target \
# --net=host
