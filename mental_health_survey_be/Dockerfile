# Dockerfile
FROM ruby:3.4.1

ENV RAILS_VERSION="8.0.1"

WORKDIR /app

# Install SQLite
RUN apt-get update -qq && \
    apt-get install -y sqlite3 && \
    rm -rf /var/lib/apt/lists/*

RUN gem install rails -v $RAILS_VERSION

# Copy Gemfile and install dependencies
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy the rest of the application
COPY . .

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]