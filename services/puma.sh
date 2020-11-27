#!/bin/bash
set -e
cd /home/app/src/playbook-docs
exec /home/app/src/playbook-docs/bin/rails server --binding 0.0.0.0
