---
title: Ruby & React Setup
icon: object-intersect
description: The most flexibility with the fusion of RoR and React and the power of 100+ highly customizable View Components. Build design driven UI in Rails with View Components.
---

Integrate Playbook's design system seamlessly into your Rails and React app with the Playbook Ruby Gem and React components. Get started today with our easy-to-follow tutorial.

## Javascript Enabled Rails Kits
To use kits with interactivity, and our graphs you need to bring in the NPM package.

#### Add the Playbook NPM Package
```sh
yarn add "playbook-ui@stable"
```

This will allow you to choose what version you want.

```sh
yarn install
```

Now that you have the package installed you could import styles via JS

```jsx
@import "playbook-ui/dist/tokens/screen_sizes.scss";
```

#### Import all the Javascript Needed for Rails Kits

This will add all the javascript to use the popovers, & graphs for example.

```js
import 'playbook-ui/dist/playbook-rails.js';
```

#### Add Font Awesome

Playbook ships with font awesome but you’ll need to include it in your application

```
//= require regular-min.js
//= require fontawesome-min.js
```