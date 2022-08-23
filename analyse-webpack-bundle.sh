# /bin/sh

(cd playbook; yarn -s run webpack --profile --json > stats.json)
(cd playbook; yarn run webpack-bundle-analyzer ./stats.json)
