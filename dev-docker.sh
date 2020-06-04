#!/usr/bin/env bash

# npm command to run; 'flux' is the dev command, it's a legacy thing.
ACTION="${1:-flux}"

set -x
set -e

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

docker run --rm $PORTS $EXTRA_ARGS \
  --mount "type=volume,src=flux-site-vol-node,dst=/src/node_modules" \
  --mount "type=volume,src=flux-site-vol-bundle-gems,dst=/src/.bundle-gems" \
  --mount "type=volume,src=flux-site-vol-bundle,dst=/src/.bundle" \
  --mount "type=bind,src=$_PWD,dst=/src" \
  -w /src \
  --env NODE_ENV=$NODE_ENV \
  flux-website-docker-dev:latest bash -c "npm run --silent $ACTION || (npm ci && npm run $ACTION)"
  #flux-website-docker-dev:latest npm run --silent install-then -- ${ACTION:-flux}

exit 0



#_MNT="$_PWD:/target"
#echo "mounting: $_MNT"

# --network host \
# -v "$_MNT" -w /target \
# --net=host
