
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

#### Add Inline Rails JS to Your Layout (Needed for Rails Graphs)

```erb
<%%= yield :pb_js %>
```

#### Add Font Awesome

Playbook ships with font awesome but you’ll need to include it in your application

```js
//= require regular-min.js
//= require fontawesome-min.js
```
