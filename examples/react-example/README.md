# React Starter Example

When building a React application, Playbook Design System can be incorporated into the project using Playbook's npm package. The files in this folder represent an example of a React application that uses Playbook.

## Getting Started

Use ``` npx create-react-app my-app-name ``` to create a new React app, than run ```yarn install``` to create the yarn.lock file. 

To install Playbook, run 

```
yarn add playbook-ui
```

You now have Playbook installed in your application! Just a few more steps before you can get started:

## Import Fonts and CSS Styles

Import fonts and CSS styles by importing the following file in your index.js or top level app component:

```
import 'playbook-ui/dist/playbook.css';
```

Our Icon kits use fontawesome. To install fontawesome free, follow the instructions on the [fontawesome website](https://fontawesome.com/v6/docs/web/use-with/react/). Commands to run:

```
yarn add @fortawesome/fontawesome-svg-core
yarn add @fortawesome/free-regular-svg-icons
yarn add @fortawesome/react-fontawesome@latest

```

In addition to the above, add the fontawesome CDN to the ```<head>``` of your your index.html file to gain access to all free icons/styles:

```
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

```

Free Users: currently only Free Regular is supported in our icon component structure. To use the Pro version of fontawesome, follow the instructions [here](https://fontawesome.com/v6/docs/web/setup/packages#set-up-npm-token-for-a-specific-project).


## Start Using all Playbook Kits

To start using the Playbook Components (known as 'kits'), import the ones you want into your file. For example, in the example app, we are importing kits into App.js like this:

```
import { Title, CircleIconButton } from 'playbook-ui';

```

3) Run ``` yarn start ``` to start yuor servers and you're ready to start building!