#!/bin/bash

# Overcommit pre-commit hook: Verify tokens are in sync
#
# This runs only when SCSS token files are staged.
# It regenerates tokens and fails if colors.json needs updating.

cd playbook

# Store current colors.json content
BEFORE=$(cat lib/playbook/tokens/colors.json 2>/dev/null || echo "")

# Regenerate tokens
yarn generate:tokens --silent 2>/dev/null

# Compare
AFTER=$(cat lib/playbook/tokens/colors.json 2>/dev/null || echo "")

if [ "$BEFORE" != "$AFTER" ]; then
  echo ""
  echo "❌ tokens/colors.json is out of sync with SCSS!"
  echo ""
  echo "Token files were changed but colors.json wasn't regenerated."
  echo "The file has been updated for you. Please stage it:"
  echo ""
  echo "  git add playbook/lib/playbook/tokens/colors.json"
  echo ""
  exit 1
fi

exit 0

