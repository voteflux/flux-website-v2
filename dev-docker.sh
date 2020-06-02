#!/usr/bin/env bash

# npm command to run
ACTION="$1"

set -x

docker build -f ./_docker-dev/Dockerfile -t flux-website-docker-dev:latest .

EXTRA_ARGS=""
if [ -t 1 ]; then
  EXTRA_ARGS="-ti"
fi

PORTS=""
export NODE_ENV=""
case $ACTION in
  flux)
    export NODE_ENV="development"
    PORTS="-p 9000:9000"
    ;;
  build)
    export NODE_ENV="production"
    ;;
  *) ;;
esac

# don't need this with wsl2
#_PWD=$(wslpath -w $PWD 2>/dev/null || echo $PWD)

_PWD=$PWD
_MNT="$_PWD:/target"
echo "mounting: $_MNT"
docker run --rm $PORTS $EXTRA_ARGS \
  --mount "type=bind,src=$_PWD,dst=/src" \
  -w /src \
  --env NODE_ENV=$NODE_ENV \
  flux-website-docker-dev:latest npm run --silent docker-dev -- ${ACTION:-flux}

# --network host \
# -v "$_MNT" -w /target \
# --net=host
