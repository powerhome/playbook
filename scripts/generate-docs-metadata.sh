#!/bin/bash
# Regenerate kit schemas, global props schema/values, and playground configs.
# Keep setup.sh, run.sh, overcommit, and CI on this single entrypoint.
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "Generating kit schemas + global props schemas..."
(cd playbook && yarn generate:all-ai-metadata)

echo "Generating global props values..."
(cd playbook-website && yarn generate:global-props-values)

echo "Generating playground configs..."
(cd playbook && yarn generate:playground-configs --overwrite)

echo "Docs metadata generation complete."
