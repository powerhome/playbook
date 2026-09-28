---
title: React Setup
icon: atom
description: React applications. Endlessly flexible presentational UI components with encapsulated styles and constraint based theme props.
---

#### Install Playbook UI

```sh
yarn add playbook-ui
```

#### Match React peer dependencies

Playbook requires React 17 peers. Install versions that satisfy:

```json
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-is": "^17.0.2"
```

#### Import CSS

Import styles in your app entrypoint or top-level component:

```js
import 'playbook-ui/dist/reset.css'
import 'playbook-ui/dist/playbook.css'
```

For icons, install and set up [Playbook Icons](/icons). See [Dependencies](/guides/getting_started/dependencies) for details.

```js
import '@powerhome/playbook-icons/css/pb-icons.css'
```

#### Import Playbook React components

```js
import { Avatar, Button } from 'playbook-ui'
```

Chart kits and Advanced Table use separate entrypoints so optional dependencies stay out of the main bundle. See [Dependencies](/guides/getting_started/dependencies).

#### CodeSandbox example

[React CodeSandbox starter](https://codesandbox.io/p/sandbox/boring-ganguly-tz4jvs)

### Dependencies

[More details about Playbook dependencies](/guides/getting_started/dependencies)
