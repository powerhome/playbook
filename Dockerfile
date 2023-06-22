# syntax = docker/dockerfile:1.5.2

FROM phusion/passenger-customizable:1.0.19 AS base

RUN mv /etc/apt/sources.list.d /etc/apt/sources.list.d.bak && \
    apt update && apt install -y ca-certificates && \
    mv /etc/apt/sources.list.d.bak /etc/apt/sources.list.d

RUN bash -lc 'rvm remove all --force && rvm install ruby-3.1.2 && rvm --default use ruby-3.1.2 && gem install bundler -v 2.2.31'
RUN /pd_build/ruby_support/install_ruby_utils.sh
RUN /pd_build/ruby_support/finalize.sh

ENV NODE_OPTIONS "--max_old_space_size=8192"
ENV NVM_VERSION v0.33.8
ENV NODE_VERSION v14.18.1
ENV NPM_VERSION 6.14.10
ENV YARN_VERSION 1.22.15
ENV NVM_DIR /home/app/.nvm
ENV PATH $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/$NVM_VERSION/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default \
    && npm install -g npm@$NPM_VERSION yarn@$YARN_VERSION

RUN apt-get update -y \
    && apt-get install -y shared-mime-info=1.15-1\
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /home/app/src

COPY --link --chown=9999:9999 playbook /home/app/src/playbook
COPY --link --chown=9999:9999 playbook-website /home/app/src/playbook-website
COPY --link playbook-website/package.json playbook-website/
COPY --link playbook/package.json playbook/
COPY --link package.json .rubocop.yml .eslintrc.json .yarnrc.yml yarn.lock .npmrc ./
COPY --link .yarn ./.yarn

FROM base AS build-library

USER app:app

# Build Library
RUN --mount=type=secret,id=yarnenv,required \
    --mount=id=yarncache,type=cache,target=/home/app/.cache/yarn,uid=9999,gid=9999,sharing=locked \
    env $(cat /run/secrets/yarnenv | xargs) yarn install
RUN curl https://github.com/sass/node-sass/releases/download/v4.13.0/linux-x64-64_binding.node -o node_modules/node-sass/vendor/linux-x64-64_binding.node

FROM build-library AS playbook-release
RUN --mount=type=secret,id=yarnenv,required cd playbook; env $(cat /run/secrets/yarnenv | xargs) yarn release

FROM base AS bundle-website
# Bundle website
RUN cd playbook-website && bundle install --frozen

FROM bundle-website AS playbook-website-release
RUN --mount=type=secret,id=yarnenv,required cd playbook-website; env $(cat /run/secrets/yarnenv | xargs) yarn release

FROM scratch AS prod
COPY --link --from=playbook-release /home/app/src/playbook /home/app/src/playbook
COPY --link --from=playbook-website-release /home/app/src/playbook-website /home/app/src/playbook-website

# Setup service
RUN chmod +x playbook-website/services/*.sh
RUN mkdir /etc/service/puma && ln -s /home/app/src/playbook-website/services/puma.sh /etc/service/puma/run
