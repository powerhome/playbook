# syntax = docker/dockerfile:1.8.1
FROM --platform=linux/amd64 ruby:3.3.11-bookworm@sha256:ce11b66eb29db7f53214d37e2f475e156f30631c34ee4d540802270f1fd97d33 AS base

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN rm -f /etc/apt/apt.conf.d/docker-clean; echo 'Binary::apt::APT::Keep-Downloaded-Packages "true";' > /etc/apt/apt.conf.d/keep-cache

ARG APP_PATH=/home/app/src
ARG APP_USER=app
ARG APP_GROUP=app
ARG APP_USER_UID=9999
ARG APP_GROUP_GID=9999

RUN addgroup --gid $APP_GROUP_GID $APP_GROUP && \
    adduser --uid $APP_USER_UID --ingroup $APP_GROUP --disabled-password $APP_USER && \
    mkdir -p $APP_PATH && \
    chown $APP_USER:$APP_GROUP $APP_PATH

ENV BUNDLER_VERSION=2.5.9
ENV BUNDLE_TO=/usr/local/bundle
ENV NVM_VERSION=v0.33.8
ENV NODE_VERSION=v22.15.1
ENV NPM_VERSION=8.19.3
ENV YARN_VERSION=1.22.19
ENV NVM_DIR=/home/app/.nvm
ENV PATH=$NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH

RUN gem install bundler -v $BUNDLER_VERSION

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/$NVM_VERSION/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default \
    && npm install -g npm@$NPM_VERSION yarn@$YARN_VERSION

RUN --mount=type=cache,id=playbook-apt-cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,id=playbook-apt-lib,target=/var/lib/apt,sharing=locked \
    apt-get update -y && apt-get install -y --no-install-recommends \
    build-essential \
    ca-certificates \
    default-libmysqlclient-dev \
    git \
    libpq-dev \
    libsqlite3-dev \
    libxml2-dev \
    libxslt1-dev \
    pkg-config \
    shared-mime-info \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

RUN bundle config --global silence_root_warning 1

WORKDIR $APP_PATH

FROM base as rubypackages
RUN --mount=type=bind,target=/tmp/src \
    cd /tmp/src/ && \
    find . -mindepth 0 -maxdepth 6 \( -name 'Gemfile' -o -name 'Gemfile.lock' -o -name '*.gemspec' \) -exec cp --parents "{}" /home/app/src \;

FROM base as jspackages

RUN --mount=type=bind,target=/tmp/src \
    cd /tmp/src/ && \
    find . -mindepth 0 -maxdepth 6 \( -name 'package.json' -o -name 'yarn.lock' -o -name '.npmrc' \) -exec cp --parents "{}" /home/app/src \;

FROM base as rubydeps

# Bundle website
COPY --link --chown=9999:9999 --from=rubypackages /home/app/src /home/app/src
COPY --link --chown=9999:9999 playbook/lib/playbook /home/app/src/playbook/lib/playbook
RUN --mount=type=cache,id=playbook-bundler-gem-cache,uid=9999,gid=9999,target=/home/app/.bundle/cache \
    cd playbook-website && bundle install

FROM base as jsdeps

COPY --link package.json .rubocop.yml .eslintrc.json .yarnrc.yml yarn.lock ./
COPY --link .yarn ./.yarn
COPY --link --chown=9999:9999 --from=jspackages /home/app/src /home/app/src
COPY --link --chown=9999:9999 playbook-website/scripts/generate-icon-list.mjs /home/app/src/playbook-website/scripts/generate-icon-list.mjs

# Build Library
RUN --mount=id=playbook-yarncache,type=cache,target=/home/app/.cache/yarn,uid=9999,gid=9999,sharing=locked \
    yarn install --frozen-lockfile

FROM jsdeps AS release
COPY --from=rubydeps --link $BUNDLE_TO $BUNDLE_TO
COPY --link --chown=9999:9999 playbook /home/app/src/playbook
COPY --link --chown=9999:9999 playbook-website /home/app/src/playbook-website
RUN --mount=id=playbook-yarncache,type=cache,target=/home/app/.cache/yarn,uid=9999,gid=9999,sharing=locked \
    cd playbook; NODE_ENV=production; yarn release
RUN --mount=id=playbook-yarncache,type=cache,target=/home/app/.cache/yarn,uid=9999,gid=9999,sharing=locked \
    cd playbook-website; NODE_ENV=production; yarn release

FROM base AS prod
COPY --from=rubydeps --link $BUNDLE_TO $BUNDLE_TO
COPY --link --chown=9999:9999 playbook /home/app/src/playbook
COPY --link --chown=9999:9999 playbook-website /home/app/src/playbook-website
COPY --link --from=release /home/app/src/playbook/dist /home/app/src/playbook/dist
COPY --link --from=release /home/app/src/playbook-website/public /home/app/src/playbook-website/public

COPY --link --from=release /home/app/src/node_modules/@powerhome/playbook-icons/icons /home/app/src/temp-icons
RUN cp -r /home/app/src/temp-icons/* /home/app/src/playbook-website/app/javascript/images/
RUN rm -rf /home/app/src/temp-icons

COPY --link --from=release /home/app/src/node_modules/@powerhome/playbook-icons/aliases.json /home/app/src/aliases.json
RUN cp /home/app/src/aliases.json /home/app/src/playbook-website/app/javascript/aliases.json
RUN rm /home/app/src/aliases.json

WORKDIR /home/app/src/playbook-website
CMD ["/home/app/src/playbook-website/bin/rails", "server", "-b", "0.0.0.0"]
