FROM ruby:2.3.1

RUN apt-get -y update && apt-get -y upgrade

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
ENV APP_HOME /app

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

RUN echo "gem: --no-rdoc --no-ri" >> ~/.gemrc
RUN gem install bundler

RUN apt-get -y install vim

ADD Gemfile Gemfile.lock $APP_HOME/
RUN bundle install

ADD . $APP_HOME/

EXPOSE 3000

CMD /bin/bash -c "rackup -p 3000 -o 0.0.0.0"