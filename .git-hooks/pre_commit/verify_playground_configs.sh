#!/bin/bash

# Overcommit pre-commit hook: verify playground configs are in sync.
#
# Runs when kit.schema.json or _playground.overrides.json files are staged.
# Regenerates affected playground configs and fails if any changed.

cd playbook || exit 1

# Cross-platform checksum function
checksum() {
  if command -v md5sum >/dev/null 2>&1; then
    md5sum | cut -d' ' -f1
  elif command -v md5 >/dev/null 2>&1; then
    md5
  else
    wc -c | tr -d ' '
  fi
}

# Get list of staged files from parent directory
STAGED_FILES=$(cd .. && git diff --cached --name-only)

# Find affected kits from staged schema or override files
AFFECTED_KITS=""
for file in $STAGED_FILES; do
  if [[ "$file" =~ playbook/app/pb_kits/playbook/(pb_[^/]+)/(kit\.schema\.json|docs/_playground\.overrides\.json) ]]; then
    KIT="${BASH_REMATCH[1]#pb_}"
    if [[ ! "$AFFECTED_KITS" =~ "$KIT" ]]; then
      AFFECTED_KITS="$AFFECTED_KITS $KIT"
    fi
  fi
done

# If no affected kits, exit successfully
if [ -z "$AFFECTED_KITS" ]; then
  exit 0
fi

echo "Checking playground configs for:$AFFECTED_KITS"

# Track if any configs changed
CHANGED_KITS=""

for KIT in $AFFECTED_KITS; do
  PLAYGROUND_FILE="app/pb_kits/playbook/pb_${KIT}/docs/_playground.json"
  
  # Capture before state
  BEFORE=""
  if [ -f "$PLAYGROUND_FILE" ]; then
    BEFORE=$(cat "$PLAYGROUND_FILE" | checksum)
  fi
  
  # Regenerate config for this kit
  yarn generate:playground-configs --kit="$KIT" --overwrite >/dev/null 2>&1
  
  # Capture after state
  AFTER=""
  if [ -f "$PLAYGROUND_FILE" ]; then
    AFTER=$(cat "$PLAYGROUND_FILE" | checksum)
  fi
  
  if [ "$BEFORE" != "$AFTER" ]; then
    CHANGED_KITS="$CHANGED_KITS $KIT"
  fi
done

if [ -n "$CHANGED_KITS" ]; then
  echo ""
  echo "❌ Playground configs are out of sync!"
  echo ""
  echo "Schema or override files changed but playground configs weren't regenerated."
  echo "The following configs have been updated:$CHANGED_KITS"
  echo ""
  echo "Please stage the updated playground configs:"
  echo ""
  for KIT in $CHANGED_KITS; do
    echo "  git add playbook/app/pb_kits/playbook/pb_${KIT}/docs/_playground.json"
  done
  echo ""
  exit 1
fi

exit 0
