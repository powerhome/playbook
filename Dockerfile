FROM phusion/passenger-customizable:0.9.27

RUN bash -lc 'rvm remove all --force && rvm install ruby-2.5.0 && rvm --default use ruby-2.5.0 && gem install bundler -v 1.16.1'
RUN /pd_build/ruby_support/install_ruby_utils.sh
RUN /pd_build/ruby_support/finalize.sh

ENV NVM_VERSION v0.33.8
ENV NODE_VERSION v8.9.4
ENV NPM_VERSION 5.4.2
ENV YARN_VERSION 1.13.0
ENV NVM_DIR /home/app/.nvm
ENV PATH $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/$NVM_VERSION/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default \
    && npm install -g npm@$NPM_VERSION yarn@$YARN_VERSION

WORKDIR /home/app/src

ADD lib/playbook/version.rb /home/app/src/lib/playbook/
ADD Gemfile* *.gemspec /home/app/src/
RUN bundle check || bundle install --frozen
RUN /bin/sh -c "rm -f /home/app/src/spec/dummy/tmp/pids/server.pid"

ADD package.json yarn.lock /home/app/src/
RUN yarn install --check-files

ADD --chown=app:app . /home/app/src
RUN mkdir /etc/service/puma && ln -s /home/app/src/services/puma.sh /etc/service/puma/run

RUN cd spec/dummy; RAILS_ENV=production SECRET_KEY_BASE=does_not_matter_here bin/rails assets:precompile
