---
title: Ruby on Rails Setup
icon: gem
description: Pure rails and javascript agnostic setup. 100+ highly customizable ViewComponents. Build design driven UI in Rails with ViewComponents.
---

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

 @import "reset";
 @import "playbook";
```

or be selective

```scss
# app/assets/stylesheets/application.scss

 @import "tokens/index";
 @import "pb_body/body";
```

From here all of our display kits should work for you nicely
