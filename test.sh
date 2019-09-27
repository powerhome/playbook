#!/bin/sh
set -e

# there is no bin/build, bin/doc, nor bin/test

bin/setup
bin/build
bin/doc
bin/test
