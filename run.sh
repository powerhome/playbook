#!/bin/bash

echo "Installing library dependencies..."
time (cd playbook; bundle; yarn)

echo "Installing Website dependencies..."
time (cd playbook-website; bundle; yarn)

echo "Generating AI metadata (kit schemas + global props schemas)..."
(cd playbook; yarn generate:all-ai-metadata)

echo "Generating global props values..."
(cd playbook-website; yarn generate:global-props-values)

echo "Generating playground configs..."
(cd playbook; yarn generate:playground-configs --overwrite)

echo "Done. Now starting the app.."
yarn start-dev
