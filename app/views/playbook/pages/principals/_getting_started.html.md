### Getting Started
---

#### Commands to get you started.

To spin up the app run:

`make start`


#### Yarn Problems

If you get an error simular to this:


> ERROR in .scss
  Module build failed
  ModuleBuildError: Module build failed sass-loader
  Node Sass could not find a binding for your current environment: Linux 64-bit with Node.js 8.x
  Found bindings for the following environments:
  OS X 64-bit with Node.js 8.x
  This usually happens because your environment has changed since running npm install.
  Run npm rebuild node-sass to download the binding for your current environment.


First try:

`make shell && npm rebuild node-sass`

If that still doesn't work try to delete the node-sass folder and `yarn install`
