docker build -f ./_docker-dev/Dockerfile -t flux-website-docker-dev:latest .

export NODE_ENV="development"
docker run -ti -p 9000:9000 --net=host -v "$PWD":/target --env NODE_ENV=$NODE_ENV flux-website-docker-dev
