#!/bin/bash

# Overcommit pre-commit hook: Verify tokens are in sync
#
# POC#3: Watches tokens/colors.yml (YAML source of truth)
# Regenerates both SCSS and JSON if YAML changed but outputs weren't updated.

cd playbook

# Store current file contents
JSON_BEFORE=$(cat lib/playbook/tokens/colors.json 2>/dev/null || echo "")
SCSS_BEFORE=$(cat app/pb_kits/playbook/tokens/_colors.generated.scss 2>/dev/null || echo "")

# Regenerate from YAML source
yarn generate:from-tokens --silent 2>/dev/null

# Compare
JSON_AFTER=$(cat lib/playbook/tokens/colors.json 2>/dev/null || echo "")
SCSS_AFTER=$(cat app/pb_kits/playbook/tokens/_colors.generated.scss 2>/dev/null || echo "")

NEEDS_UPDATE=""

if [ "$JSON_BEFORE" != "$JSON_AFTER" ]; then
  NEEDS_UPDATE="$NEEDS_UPDATE lib/playbook/tokens/colors.json"
fi

if [ "$SCSS_BEFORE" != "$SCSS_AFTER" ]; then
  NEEDS_UPDATE="$NEEDS_UPDATE app/pb_kits/playbook/tokens/_colors.generated.scss"
fi

if [ -n "$NEEDS_UPDATE" ]; then
  echo ""
  echo "❌ Generated token files are out of sync with colors.yml!"
  echo ""
  echo "The YAML was changed but generated files weren't updated."
  echo "They have been regenerated for you. Please stage them:"
  echo ""
  for file in $NEEDS_UPDATE; do
    echo "  git add playbook/$file"
  done
  echo ""
  exit 1
fi

exit 0

