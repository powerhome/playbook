 # /bin/sh
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

echo "Compiling webpack bundle"
rm -rf playbook/dist
(cd playbook; yarn release)
