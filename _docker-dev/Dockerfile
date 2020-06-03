FROM ubuntu:16.04

RUN apt-get update && apt-get install -y curl tree
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y nodejs
RUN apt-get install -y gcc g++ make
RUN apt-get install -y ruby
RUN gem install bundler -v 1.16.1

RUN apt-get install -y ruby-dev

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

RUN echo "tcp	6	TCP	# transmission control protocol" > /etc/protocols

RUN useradd -ms /bin/bash newuser
# RUN mkdir /target && chown newuser /target
USER newuser

#WORKDIR /target
#VOLUME /target
EXPOSE 9000

COPY package.json .
COPY package-lock.json .

RUN npm ci

#CMD bash -c 'echo current directory: && pwd && set -x && ls -alh && bundle install --path ./.bundle-gems && yarn install && yarn flux'
#ENTRYPOINT npm
