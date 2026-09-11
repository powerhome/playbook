---
title: Ruby on Rails Setup
icon: gem
description: Pure rails and javascript agnostic setup. 100+ highly customizable ViewComponents. Build design driven UI in Rails with ViewComponents.
---

Use the `playbook_ui` gem for ViewComponents (`pb_rails`). Display kits work with CSS alone; interactive kits also need the npm JavaScript bundle.

## 1. Add the gem

```ruby
# Gemfile
gem "playbook_ui"
```

```sh
bundle install
```

The gem depends on `view_component` (pinned by Playbook). You do not need to mount a Playbook engine route — kits are available through helpers.

## 2. Enable kit helpers

```ruby
# app/helpers/application_helper.rb
include Playbook::PbKitHelper
```

```ruby
# or in app/controllers/application_controller.rb
helper Playbook::PbKitHelper
```

## 3. Add styles

Prefer the prebuilt CSS shipped in the gem and npm package.

### With a JS bundler (recommended)

```sh
yarn add playbook-ui @powerhome/playbook-icons
```

```js
import 'playbook-ui/dist/reset.css'
import 'playbook-ui/dist/playbook.css'
import '@powerhome/playbook-icons/css/pb-icons.css'
```

### With the asset pipeline

The gem adds its `dist` directory to the asset load path. You can require the compiled stylesheets from there (for example via Sprockets), or serve `playbook.css` / `reset.css` from your bundler as shown above.

If you compile SCSS yourself and only need individual kits or tokens, the gem also exposes kit and token Sass under its Sass load paths:

```scss
@import "tokens/colors";
@import "pb_body/body";
```

Recompiling full Playbook Sass from source is uncommon — most apps use the bundled CSS. See [How to Theme](/guides/getting_started/how_to_theme) if you need Sass variable overrides.

## 4. Add JavaScript for interactive kits (optional)

Popovers, date pickers, typeahead, and similar kits need:

```sh
yarn add playbook-ui
```

```js
import 'playbook-ui/dist/playbook-rails.js'
```

Chart kits need Highcharts plus `playbook-rails-charts-bindings.js`. See [Ruby & React Setup](/guides/getting_started/rails_&_react_setup) and [Dependencies](/guides/getting_started/dependencies).

## 5. Use kits

```erb
<%= pb_rails("body", props: { text: "Hello from Playbook" }) %>
```

For icons, see [Playbook Icons](/icons) and [Dependencies](/guides/getting_started/dependencies).
