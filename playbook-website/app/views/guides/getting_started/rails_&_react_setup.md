---
title: Ruby & React Setup
icon: object-intersect
description: The most flexibility with the fusion of RoR and React and the power of 100+ highly customizable View Components. Build design driven UI in Rails with View Components.
---

Use the Playbook Ruby gem for `pb_rails` kits and the `playbook-ui` npm package for styles, icons, and kit JavaScript.

## 1. Add the Ruby gem

```ruby
# Gemfile
gem "playbook_ui"
```

```sh
bundle install
```

Enable kit helpers (either approach works):

```ruby
# app/helpers/application_helper.rb
include Playbook::PbKitHelper
```

```ruby
# or in app/controllers/application_controller.rb
helper Playbook::PbKitHelper
```

## 2. Add the npm package

Interactive kits (popovers, date picker, typeahead, and more) need the JavaScript bundle from npm:

```sh
yarn add playbook-ui
```

Import styles and Rails kit JavaScript in your pack/entrypoint:

```js
import 'playbook-ui/dist/reset.css'
import 'playbook-ui/dist/playbook.css'
import 'playbook-ui/dist/playbook-rails.js'
```

### Chart kits (optional)

Chart kits need Highcharts and a separate bindings import **after** `playbook-rails.js`:

```sh
yarn add highcharts highcharts-react-official
```

```js
import 'playbook-ui/dist/playbook-rails.js'
import 'playbook-ui/dist/playbook-rails-charts-bindings.js'
```

See [Dependencies](/guides/getting_started/dependencies) for chart and Advanced Table details.

## 3. Add Playbook Icons

Icon kits use [Playbook Icons](/icons). Font Awesome is not required.

```sh
yarn add @powerhome/playbook-icons @powerhome/playbook-icons-react
```

```js
import '@powerhome/playbook-icons/css/pb-icons.css'
```

See [Dependencies](/guides/getting_started/dependencies) for React icon registration (`window.PB_ICONS`) and full setup.

## 4. Use kits in Rails views

```erb
<%= pb_rails("button", props: { text: "Hello" }) %>
```

### Optional: Sass token imports

If you write custom SCSS and need token `$variables`, import individual token partials (this does **not** replace `playbook.css`):

```scss
@import "playbook-ui/dist/tokens/colors";
@import "playbook-ui/dist/tokens/spacing";
```

For theming and token exports, see [How to Theme](/guides/getting_started/how_to_theme) and [Using Tokens](/tokens/using_tokens).
