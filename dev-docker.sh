docker build -f ./_docker-dev/Dockerfile -t flux-website-docker-dev:latest .

export NODE_ENV="development"
_PWD=$(wslpath -w $PWD || echo $PWD)
echo "mounting: $_PWD"
docker run --network host -ti -p 9000:9000 -v "$_PWD":/target --env NODE_ENV=$NODE_ENV flux-website-docker-dev

# --net=host
