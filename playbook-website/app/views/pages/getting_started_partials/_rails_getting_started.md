# Rails Getting Started (with Webpacker)

#### Update your Gemfile
```sh
gem 'playbook_ui'
```

#### Bundle Install
```sh
bundle
```

#### Add the View Helper to Enable Rails Kits
```rb
# app/controllers/application_controller.rb
 helper Playbook::PbKitHelper
```

### Add the `sassc-rails` Gem Dependency if Using Asset Pipeline
```rb
gem "sassc-rails"
```

#### Import the Kit Styles (Asset Pipeline)
```scss
# app/assets/stylesheets/application.scss

 @import "playbook";
```

or be selective

```scss
# app/assets/stylesheets/application.scss

 @import "tokens/index";
 @import "pb_body/body";
```

From here all of our display kits should work for you nicely


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