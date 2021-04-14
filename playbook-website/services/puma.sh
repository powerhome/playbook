#!/bin/bash
set -e
cd /home/app/src/playbook-website
exec /home/app/src/playbook-website/bin/rails server --binding 0.0.0.0
