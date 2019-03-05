FROM phusion/passenger-customizable:0.9.27

RUN bash -lc 'rvm remove all --force && rvm install ruby-2.5.0 && rvm --default use ruby-2.5.0 && gem install bundler -v 1.16.1'
RUN /pd_build/ruby_support/install_ruby_utils.sh
RUN /pd_build/ruby_support/finalize.sh

WORKDIR /home/app

ADD lib/playbook/version.rb /home/app/lib/playbook/
ADD Gemfile* *.gemspec /home/app/
RUN bundle install --frozen

ADD . /home/app
RUN chown -R app:app /home/app
RUN mkdir /etc/service/puma && ln -s /home/app/services/puma.sh /etc/service/puma/run

RUN RAILS_ENV=production SECRET_KEY_BASE=does_not_matter_here bin/rails
