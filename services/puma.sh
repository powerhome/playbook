#!/bin/bash
set -e
cd /home/app/
exec /home/app/bin/rails server --binding 0.0.0.0
