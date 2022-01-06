 # /bin/sh
echo "Installing dependencies \n"
asdf install
asdf plugin add ruby
asdf plugin add yarn
asdf plugin add nodejs

echo "Running yarn install \n"
yarn install

echo "Installing commit hooks \n"
yarn prepare

echo "Bundling source \n"
cd playbook && bundle

echo "Bundling website \n"
cd ../playbook-website && bundle

cd ../
