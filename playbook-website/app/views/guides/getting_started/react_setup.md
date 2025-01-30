---
title: React Setup
icon: atom
description: React applications. Endlessly flexible presentational UI components with encapsulated styles and constraint based theme props.
---

#### Bundle Install
```sh
yarn add playbook-ui
```
#### Match your project's versions of React, ReactDOM, react-is and React Trix with Playbook's versions

```json
"react": "17.0.2",
"react-dom": "17.0.2",
"react-is": "^17.0.2",
"react-trix": "0.10.1",
```
#### Import fonts and CSS styles
Can be imported in your Index.js file or top level app Component

```js
import 'playbook-ui/dist/fonts/fontawesome-min';
import 'playbook-ui/dist/fonts/regular-min';
import 'playbook-ui/dist/playbook.css';
```
#### Import Playbook React components

```js
import { Avatar, Button } from 'playbook-ui';
```
#### CodeSandbox React Setup Example
[Link to CodeSandbox Example](https://codesandbox.io/s/playbook-empty-6ixcw)

### Dependencies
[More details about Playbook dependencies](/guides/getting_started/dependencies)
