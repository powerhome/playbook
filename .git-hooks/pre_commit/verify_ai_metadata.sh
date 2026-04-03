#!/bin/bash

# Overcommit pre-commit hook: verify AI metadata is in sync with source.
#
# Runs when component files, globalProps, or menu.yml are staged.
# Regenerates AI metadata and fails if any schema files changed.

cd playbook || exit 1

# Capture before state (checksums of all schema files)
BEFORE=$(find app/pb_kits/playbook -name "kit.schema.json" -o -name "global-props.schema.json" 2>/dev/null | sort | xargs cat 2>/dev/null | md5)

# Regenerate metadata (suppress output)
yarn generate:all-ai-metadata >/dev/null 2>&1

# Capture after state
AFTER=$(find app/pb_kits/playbook -name "kit.schema.json" -o -name "global-props.schema.json" 2>/dev/null | sort | xargs cat 2>/dev/null | md5)

if [ "$BEFORE" != "$AFTER" ]; then
  echo ""
  echo "❌ AI metadata is out of sync with source files!"
  echo ""
  echo "Component or global prop files were changed but schemas weren't regenerated."
  echo "The schema files have been updated. Please stage them:"
  echo ""
  echo "  git add playbook/app/pb_kits/playbook/*/kit.schema.json"
  echo "  git add playbook/app/pb_kits/playbook/utilities/global-props.schema.json"
  echo ""
  exit 1
fi

exit 0
