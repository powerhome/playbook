#!/bin/bash
# Pre-commit hook (Husky): keep docs metadata in sync with source.
#
# When relevant kit/global-prop/playground files are staged, regenerates kit
# schemas, global props schema/values, and playground configs in one pass,
# then fails if any generated files changed (so they can be staged).

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT_DIR"

# Only run when staged files can affect generated docs metadata.
STAGED_FILES="$(git diff --cached --name-only)"
if [ -z "$STAGED_FILES" ]; then
  exit 0
fi

if ! echo "$STAGED_FILES" | grep -Eq \
  'playbook/app/pb_kits/playbook/(pb_[^/]+/.+\.(tsx|ts|rb)|utilities/globalProps\.ts|types/[^/]+\.ts|tokens/_(spacing|screen_sizes)\.scss|pb_[^/]+/kit\.schema\.json|pb_[^/]+/docs/_playground\.overrides\.json)'; then
  exit 0
fi

checksum() {
  if command -v md5sum >/dev/null 2>&1; then
    md5sum | cut -d' ' -f1
  elif command -v md5 >/dev/null 2>&1; then
    md5
  else
    wc -c | tr -d ' '
  fi
}

# Collect generated metadata files in a stable order.
list_generated_files() {
  {
    find playbook/app/pb_kits/playbook -name 'kit.schema.json' 2>/dev/null
    find playbook/app/pb_kits/playbook -path '*/docs/_playground.json' 2>/dev/null
    echo 'playbook/app/pb_kits/playbook/utilities/global-props.schema.json'
    echo 'playbook-website/app/javascript/components/Website/src/components/AvailableProps/globalPropsValues.ts'
  } | sort -u
}

checksum_generated() {
  local files file
  files="$(list_generated_files)"
  if [ -z "$files" ]; then
    echo "empty"
    return
  fi

  while IFS= read -r file; do
    [ -f "$file" ] || continue
    cat "$file"
  done <<< "$files" | checksum
}

BEFORE="$(checksum_generated)"

echo "Verifying docs metadata (schemas, global props values, playgrounds)..."
if ! yarn generate:docs-metadata >/dev/null; then
  echo ""
  echo "❌ docs metadata generation failed!"
  echo ""
  echo "Fix the generator error above, then retry your commit."
  echo "You can also run: yarn generate:docs-metadata"
  echo ""
  exit 1
fi

AFTER="$(checksum_generated)"

if [ "$BEFORE" != "$AFTER" ]; then
  echo ""
  echo "❌ Docs metadata is out of sync with source files!"
  echo ""
  echo "Generated files were updated. Please stage them and commit again:"
  echo ""

  CHANGED="$(git status --short -- \
    'playbook/app/pb_kits/playbook/*/kit.schema.json' \
    'playbook/app/pb_kits/playbook/*/docs/_playground.json' \
    'playbook/app/pb_kits/playbook/utilities/global-props.schema.json' \
    'playbook-website/app/javascript/components/Website/src/components/AvailableProps/globalPropsValues.ts' \
    2>/dev/null || true)"

  if [ -n "$CHANGED" ]; then
    echo "$CHANGED"
    echo ""
  fi

  echo "  git add playbook/app/pb_kits/playbook/*/kit.schema.json"
  echo "  git add playbook/app/pb_kits/playbook/*/docs/_playground.json"
  echo "  git add playbook/app/pb_kits/playbook/utilities/global-props.schema.json"
  echo "  git add playbook-website/app/javascript/components/Website/src/components/AvailableProps/globalPropsValues.ts"
  echo ""
  echo "Or regenerate first with: yarn generate:docs-metadata"
  echo ""
  exit 1
fi

exit 0
