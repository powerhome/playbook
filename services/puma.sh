#!/bin/bash
set -e
cd /home/app/src/spec/dummy
exec /home/app/src/spec/dummy/bin/rails server --binding 0.0.0.0
