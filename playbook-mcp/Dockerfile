# syntax = docker/dockerfile:1.8.1
# Build from monorepo root:
#   docker build -f playbook-mcp/Dockerfile -t playbook-mcp .
FROM --platform=linux/amd64 ruby:3.3.11-bookworm AS base

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

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
ENV RAILS_ENV=production
ENV RACK_ENV=production

RUN gem install bundler -v $BUNDLER_VERSION

RUN apt-get update -y && apt-get install -y --no-install-recommends \
    build-essential \
    ca-certificates \
    git \
    libyaml-dev \
    pkg-config \
    shared-mime-info \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR $APP_PATH

FROM base AS gems
COPY --chown=9999:9999 playbook/playbook_ui.gemspec playbook/playbook_ui.gemspec
COPY --chown=9999:9999 playbook/lib/playbook/version.rb playbook/lib/playbook/version.rb
COPY --chown=9999:9999 playbook-mcp/Gemfile playbook-mcp/Gemfile.lock* playbook-mcp/
RUN cd playbook-mcp && bundle config set --local without 'development test' && bundle install

FROM base AS prod
COPY --from=gems $BUNDLE_TO $BUNDLE_TO
COPY --chown=9999:9999 playbook /home/app/src/playbook
COPY --chown=9999:9999 playbook-mcp /home/app/src/playbook-mcp

WORKDIR /home/app/src/playbook-mcp
RUN apt-get update -y && apt-get install -y --no-install-recommends curl \
    && ./bin/vendor_chart_peers \
    && rm -rf /var/lib/apt/lists/* \
    && chown -R app:app /home/app/src/playbook-mcp/vendor

USER app
ENV PORT=3099
ENV RAILS_SERVE_STATIC_FILES=true
ENV RAILS_LOG_TO_STDOUT=true
ENV PLAYBOOK_MCP_DISABLE_HOST_CHECK=1
EXPOSE 3099
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb", "-b", "tcp://0.0.0.0:3099"]
