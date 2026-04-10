#!/bin/sh
echo "Installing dependencies \n"
asdf install
asdf plugin add ruby
asdf plugin add yarn
asdf plugin add nodejs
asdf plugin add python
asdf install

echo "Running yarn install \n"
yarn install

echo "Installing commit hooks \n"
yarn prepare

echo "Bundling source \n"
(cd playbook; bundle)

echo "Bundling website \n"
(cd playbook-website; bundle)

echo "Generating AI metadata (kit schemas) \n"
(cd playbook; yarn generate:all-ai-metadata)

echo "Compiling webpack bundle \n"
rm -rf playbook/dist
(cd playbook; yarn release)

echo "Generating playground configs for touched kits \n"
# Find kits with modified schema or override files
TOUCHED_KITS=$(git status --porcelain 2>/dev/null | grep -E 'pb_[^/]+/(kit\.schema\.json|docs/_playground\.overrides\.json)' | sed -E 's/.*pb_([^/]+).*/\1/' | sort -u)

if [ -n "$TOUCHED_KITS" ]; then
  echo "Found touched kits: $TOUCHED_KITS"
  for KIT in $TOUCHED_KITS; do
    echo "  Regenerating playground config for: $KIT"
    (cd playbook; yarn generate:playground-configs --kit="$KIT" --overwrite)
  done
else
  echo "No schema or override changes detected, skipping playground config generation"
fi

echo "\nSetup complete!"
