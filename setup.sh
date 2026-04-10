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

echo "Generating global props values \n"
(cd playbook-website; yarn generate:global-props-values)

echo "Compiling webpack bundle \n"
rm -rf playbook/dist
(cd playbook; yarn release)

echo "Generating playground configs \n"
(cd playbook; yarn generate:playground-configs --overwrite)

echo "\nSetup complete!"
