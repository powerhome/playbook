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

WORKDIR /home/app

ADD lib/playbook/version.rb /home/app/lib/playbook/
ADD Gemfile* *.gemspec /home/app/
RUN bundle install --frozen

ADD . /home/app
RUN chown -R app:app /home/app
RUN mkdir /etc/service/puma && ln -s /home/app/services/puma.sh /etc/service/puma/run

RUN RAILS_ENV=production SECRET_KEY_BASE=does_not_matter_here bin/webpack
