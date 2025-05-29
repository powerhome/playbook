# syntax = docker/dockerfile:1.8.1
FROM phusion/passenger-customizable:1.0.19 AS base

RUN --mount=type=cache,id=playbook-apt-cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,id=playbook-apt-lib,target=/var/lib/apt,sharing=locked \
    apt-get update -y && \
    mv /etc/apt/sources.list.d /etc/apt/sources.list.d.bak && \
    apt update && apt install -y ca-certificates && \
    mv /etc/apt/sources.list.d.bak /etc/apt/sources.list.d

RUN bash -lc 'rvm remove all --force && rvm install ruby-3.3.0 && rvm --default use ruby-3.3.0 && gem install bundler -v 2.5.3'
RUN --mount=type=cache,id=playbook-apt-cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,id=playbook-apt-lib,target=/var/lib/apt,sharing=locked \
    /pd_build/ruby_support/install_ruby_utils.sh
RUN /pd_build/ruby_support/finalize.sh

ENV BUNDLE_TO /usr/local/rvm/gems
ENV NVM_VERSION v0.33.8
ENV NODE_VERSION v22.15.1
ENV NPM_VERSION 6.14.10
ENV YARN_VERSION 1.22.19
ENV NVM_DIR /home/app/.nvm
ENV PATH $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/$NVM_VERSION/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default \
    && npm install -g npm@$NPM_VERSION yarn@$YARN_VERSION

RUN --mount=type=cache,id=playbook-apt-cache,target=/var/cache/apt,sharing=locked \
    --mount=type=cache,id=playbook-apt-lib,target=/var/lib/apt,sharing=locked \apt-get update -y \
    && apt-get install -y shared-mime-info=1.15-1

RUN bundle config --global silence_root_warning 1

# Setup service
COPY --link playbook-website/services/puma.sh /home/app/src/playbook-website/services/puma.sh
RUN chmod +x /home/app/src/playbook-website/services/puma.sh
RUN mkdir /etc/service/puma && ln -s /home/app/src/playbook-website/services/puma.sh /etc/service/puma/run
WORKDIR /home/app/src

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
RUN --mount=id=playbook-yarncache,type=cache,target=/home/app/.cache/yarn,uid=9999,gid=9999,sharing=locked \
    cd playbook-website; node /home/app/src/playbook-website/scripts/react-docgen.mjs --all-kits

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
