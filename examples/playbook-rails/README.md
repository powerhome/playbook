<img src="https://avatars.githubusercontent.com/u/4223?s=200&v=4" height="90" width="90" />

Playbook's Ruby Gem makes it easy to use playbook with your favorite rails app.
Here's a few routes you can take to get you started:

### Rails New (default w/ asset pipeline)

##### Make sure you have rails 7 or higher. This example used 7.0.3

1) Create your new app
```
rails new CoolNewApp
```

2) Add the sassc-rails gem [as outlined by Rails docs](https://guides.rubyonrails.org/asset_pipeline.html#what-is-the-asset-pipeline-questionmark) & add our playbook_ui ruby gem inside your Gemfile.
```
# app/Gemfile
gem "sassc-rails"
gem "playbook_ui", "~> 11.4.0"
```

3) Add the View Helper to Enable Rails Kits
```
# app/controllers/application_controller.rb
 helper Playbook::PbKitHelper
```

4) Import the Kit Styles
```
# app/assets/stylesheets/application.scss

 @import "playbook";
```
or be selective:
```
# app/assets/stylesheets/application.scss

 @import "tokens/index";
 @import "pb_body/body";
```

5) Setup Pro or Free Fontawesome to use our Icon Component  
(Free Users: currently only Free Regular is supported in our icon component structure)

Pro:

```
# app/assets/stylesheets/application.scss
 @import "font-awesome-pro";
 @import "font-awesome-pro/solid";
 @import "font-awesome-pro/regular";
 @import "playbook";
```

```
# app/Gemfile
source "https://token:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX@dl.fontawesome.com/basic/fontawesome-pro/ruby/" do
  gem "font-awesome-pro-sass", "6.2.0"
end
```

Free:

```
# app/assets/stylesheets/application.scss
@import "font-awesome";
```

```
# app/Gemfile
gem "font-awesome-sass", "~> 6.2.0"
```


6) Bundle all the things!
```
bundle install
```


7) Go build awesome stuff!