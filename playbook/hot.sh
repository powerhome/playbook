echo "Creating Local Release"
yarn release
rm dist/playbook-rails.css && mv dist/playbook-react.css dist/playbook.css

echo "Copying local release to Nitro"
cp -R dist/* $1/node_modules/playbook-ui/dist/
