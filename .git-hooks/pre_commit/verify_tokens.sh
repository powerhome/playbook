#!/bin/bash

# Overcommit pre-commit hook: verify generated token JSON files are in sync.
#
# Runs when playbook token SCSS or types (e.g. colors.ts) are staged. Regenerates
# token JSONs via yarn generate:tokens and fails if any generated file changed.
#
# Currently: only colors.json. When adding typography, spacing, etc., extend this
# to compare each generated file (e.g. typography.json) and list all that need
# staging in the failure message.

cd playbook || exit 1

BEFORE=$(cat lib/playbook/tokens/colors.json 2>/dev/null || echo "")

yarn generate:tokens --silent 2>/dev/null

AFTER=$(cat lib/playbook/tokens/colors.json 2>/dev/null || echo "")

if [ "$BEFORE" != "$AFTER" ]; then
  echo ""
  echo "❌ lib/playbook/tokens/colors.json is out of sync with token sources!"
  echo ""
  echo "Token files were changed but the generated JSON wasn't regenerated."
  echo "The file has been updated. Please stage it:"
  echo ""
  echo "  git add playbook/lib/playbook/tokens/colors.json"
  echo ""
  exit 1
fi

exit 0
