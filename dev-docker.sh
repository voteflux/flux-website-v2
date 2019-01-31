docker build -f ./_docker-dev/Dockerfile -t flux-website-docker-dev:latest .
docker run -ti -p 9000:9000 --net=host -v "$PWD":/target flux-website-docker-dev
