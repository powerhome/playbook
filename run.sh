#!/bin/bash

echo "Installing library dependencies..."
time (cd playbook; bundle; yarn)

echo "Installing Website dependencies..."
time (cd playbook-website; bundle; yarn)

echo "Generating docs metadata (schemas, global props values, playgrounds)..."
yarn generate:docs-metadata

echo "Done. Now starting the app.."
yarn start-dev
