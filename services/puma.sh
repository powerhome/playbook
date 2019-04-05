#!/bin/bash
set -e
cd /home/app/src/
exec /home/app/src/bin/rails server --binding 0.0.0.0
