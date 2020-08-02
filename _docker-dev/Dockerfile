FROM ubuntu:20.04

RUN apt-get update && apt-get install -y curl tree
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get update && apt-get install -y nodejs
RUN apt-get install -y gcc g++ make
RUN apt-get install -y ruby
RUN gem install bundler

RUN apt-get install -y ruby-dev

#RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
#    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
#    apt-get update && apt-get install -y yarn

RUN echo "tcp	6	TCP	# transmission control protocol" > /etc/protocols

RUN adduser --shell /bin/bash --home /home/user user
RUN mkdir -p /src && chown -R user:user /src
USER user

WORKDIR /src

# ~This doesn't work if we mount a dir over the top -- probably would get messy if we try too much down that path~
# Sorta seems to work atm...

# Do gem stuff first because those deps change less frequently.
COPY Gemfile .
COPY Gemfile.lock .
RUN bundle config set path './.bundle-gems'
RUN bundle install

COPY package.json .
COPY package-lock.json .
RUN npm ci

VOLUME /src/node_modules
VOLUME /src/.bundle
VOLUME /src/.bundle-gems

#WORKDIR /target
#VOLUME /target
EXPOSE 9000

#CMD bash -c 'echo current directory: && pwd && set -x && ls -alh && bundle install --path ./.bundle-gems && yarn install && yarn flux'
#ENTRYPOINT npm
