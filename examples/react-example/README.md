# React Starter Example

When building a React application, Playbook Design System can be incorporated into the project using Playbook's npm package. The files in this folder represent an example of a React application that uses Playbook.

## Getting Started

Use ``` npx create-react-app my-app-name ``` to create a new React app, than run ```yarn install``` to create the yarn.lock file. 

To install Playbook, run 

```
yarn add playbook-ui
```

You now have Playbook installed in your application! Just a few more steps before you can get started:

1) Import fonts and CSS styles by importing the following files in your index.js or top level app component:

```
import 'playbook-ui/dist/fonts/fontawesome-min';
import 'playbook-ui/dist/fonts/regular-min';
import 'playbook-ui/dist/playbook.css';
```

2) To start using the Playbook React Components (known as 'kits'), import the ones you want into your file. For example, in the example app, we are importing kits into App.js like this:

```
import { Title, CircleIconButton } from 'playbook-ui';

```

3) Run ``` yarn start ``` to start yuor servers and you're ready to start building!