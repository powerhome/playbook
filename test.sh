#!/bin/sh

set -e

bin/setup
bin/build
bin/doc
bin/test
