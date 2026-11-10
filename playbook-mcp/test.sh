#!/bin/sh
set -e
cd "$(dirname "$0")"
# Prod sets BUNDLE_WITHOUT=development:test. This stage installed those gems.
unset BUNDLE_WITHOUT
bundle exec rspec
bundle exec ruby bin/smoke
