FROM quay.io/powerhome/passenger-customizable:0.9.35
ARG precompileassets

RUN bash -lc 'rvm remove all --force && rvm install ruby-2.6.6 && rvm --default use ruby-2.6.6 && gem install bundler -v 2.2.25'
RUN /pd_build/ruby_support/install_ruby_utils.sh
RUN /pd_build/ruby_support/finalize.sh

ENV NODE_OPTIONS "--max_old_space_size=8192"
ENV NVM_VERSION v0.33.8
ENV NODE_VERSION v12.20.1
ENV NPM_VERSION 6.11.3
ENV YARN_VERSION 1.22.0
ENV NVM_DIR /home/app/.nvm
ENV PATH $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/$NVM_VERSION/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default \
    && npm install -g npm@$NPM_VERSION yarn@$YARN_VERSION

RUN apt-get update -y \
    && apt-get install -y shared-mime-info=1.5-2ubuntu0.2\
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /home/app/src

# Build Library
COPY playbook-website/package.json playbook-website/
COPY playbook/package.json playbook/
COPY package.json .rubocop.yml .eslintrc.json .yarnrc.yml yarn.lock ./
COPY .yarn ./.yarn
RUN yarn install
RUN curl https://github.com/sass/node-sass/releases/download/v4.13.0/linux-x64-64_binding.node -o node_modules/node-sass/vendor/linux-x64-64_binding.node

COPY --chown=app:app playbook /home/app/src/playbook

# Bundle website
COPY --chown=app:app playbook-website /home/app/src/playbook-website
RUN cd playbook-website && bundle install --frozen

# Setup service
RUN chmod +x playbook-website/services/*.sh
RUN mkdir /etc/service/puma && ln -s /home/app/src/playbook-website/services/puma.sh /etc/service/puma/run

RUN if [ "${precompileassets}" = "disable" ]; then echo "Pre-compilation disabled"; else yarn release-all; fi
