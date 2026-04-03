#!/bin/bash

# Overcommit pre-commit hook: verify AI metadata is in sync with source.
#
# Runs when component files or globalProps are staged.
# Regenerates AI metadata and fails if any schema files changed.

cd playbook || exit 1

# Cross-platform checksum function (macOS uses md5, Linux uses md5sum)
checksum() {
  if command -v md5sum >/dev/null 2>&1; then
    md5sum | cut -d' ' -f1
  elif command -v md5 >/dev/null 2>&1; then
    md5
  else
    # Fallback: use cat output length as crude check
    wc -c | tr -d ' '
  fi
}

# Capture before state (checksums of all schema files)
BEFORE=$(find app/pb_kits/playbook -name "kit.schema.json" -o -name "global-props.schema.json" 2>/dev/null | sort | xargs cat 2>/dev/null | checksum)

# Regenerate metadata (suppress output)
yarn generate:all-ai-metadata >/dev/null 2>&1

# Capture after state
AFTER=$(find app/pb_kits/playbook -name "kit.schema.json" -o -name "global-props.schema.json" 2>/dev/null | sort | xargs cat 2>/dev/null | checksum)

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
