docker build -f ./_docker-dev/Dockerfile -t flux-website-docker-dev:latest .

export NODE_ENV="development"
_PWD=$(wslpath -w $PWD 2>/dev/null || echo $PWD)
_MNT="$_PWD:/target"
echo "mounting: $_MNT"
docker run -ti -p 9000:9000 \
  --mount "type=bind,src=$_PWD,dst=/src" \
  -w /src \
  --env NODE_ENV=$NODE_ENV flux-website-docker-dev

# --network host \
# -v "$_MNT" -w /target \
# --net=host
