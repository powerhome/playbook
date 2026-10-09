#!/bin/sh
set -e
cd "$(dirname "$0")"
bundle exec rspec
bundle exec ruby bin/smoke
