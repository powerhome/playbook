FROM ruby:2.5 as frontend
ENV APP_PATH /home/app
ENV NODE_VERSION v8.9.4
ENV NVM_DIR /home/.nvm
ENV PATH $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH
EXPOSE 3000
WORKDIR $APP_PATH
RUN apt-get update -qq && apt-get install -y postgresql-client
RUN gem update --system
RUN gem install bundler
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash \
  && . $NVM_DIR/nvm.sh \
  && nvm install $NODE_VERSION \
  && nvm alias default $NODE_VERSION \
  && nvm use default \
  && npm install -g yarn@1.13.0
COPY lib/playbook/version.rb $APP_PATH/lib/playbook/version.rb
COPY *.gemspec Gemfile* $APP_PATH/
COPY package.json yarn.lock $APP_PATH/
RUN bundle install
RUN yarn install
COPY . $APP_PATH
CMD ["rails", "server", "-b", "0.0.0.0"]

FROM nginx as nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
