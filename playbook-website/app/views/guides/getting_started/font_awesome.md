---
title: Font Awesome Setup
description: Playbook seamlessly integrates with Font Awesome, a leading icon library known for its extensive collection of high-quality, scalable icons. This integration not only enhances the visual appeal of websites and applications but also improves overall usability.
icon: font-awesome
---

Playbook seamlessly integrates with [Font Awesome](https://fontawesome.com/), a leading icon library known for its extensive collection of high-quality, scalable icons. This integration not only enhances the visual appeal of websites and applications but also improves overall usability. 

Some Font Awesome benefits:

**1. Wide Range of Icons:** Font Awesome offers a vast selection of icons to suit a variety of needs. You can easily find the perfect icon for your project through their [icon search](https://fontawesome.com/search).
**2. Ease of Use:** The icons are straightforward to implement. With just a few lines of code, you can quickly and easily add visual elements to your web projects. Note, a Pro subscription is required for access to a wider range of icons beyond the [Free set](https://fontawesome.com/search?o=r&m=free&s=regular).
**3. Visual Appeal:** Incorporating these icons can improve the aesthetic of your site or application, making it more attractive to users. With Playbook, you have the flexibility to customize color, size, and animations.
**4. User-Friendliness:** Icons can help users navigate and understand your website or application more efficiently, enhancing their overall experience. Font Awesome icons are web fonts compatible with most browsers and are optimized for performance and accessibility.

Integrating Font Awesome with Playbook ensures that you have access to these benefits, making your projects more polished and professional.

![Font Awesome Icons](https://cdn.hashnode.com/res/hashnode/image/upload/v1702882676689/8da380bd-d295-4d7f-8d29-7154ab845781.png)

## Ruby on Rails Setup (default with asset pipeline)

**Make sure you are on Rails 7 or higher.**

**1.** Follow the [Ruby on Rails Setup getting started page](/guides/getting_started/ruby_on_rails_setup) to setup Playbook with your Rails project.

**2.** Setup Pro or Free Font Awesome to use our Icon Component.

**Pro:**

```rb
# app/assets/stylesheets/application.scss
 @import "font-awesome-pro";
 @import "font-awesome-pro/solid";
 @import "font-awesome-pro/regular";
 @import "playbook";
```

```rb
# app/Gemfile
 source "https://token:TOKEN@dl.fontawesome.com/basic/fontawesome-pro/ruby/" do
   gem "font-awesome-pro-sass", "6.2.0"
 end
```

**Free:**

*Currently only [Free Regular](https://fontawesome.com/search?o=r&m=free&s=regular) icons are supported in our icon component structure.*

```rb
# app/assets/stylesheets/application.scss
 @import "font-awesome";
```

```rb
# app/Gemfile
 source "https://token:TOKEN@dl.fontawesome.com/basic/fontawesome-pro/ruby/" do
   gem "font-awesome-pro-sass", "6.2.0"
 end
```

**3.** Bundle all the things!

```sh
bundle install
```

**4.** **Go build awesome stuff!**

Refer to our [Icon kit](/kits/icon) to get started with Font Awesome icons in Playbook. 

```rb
<%= pb_rails("icon", props: { icon: "font-awesome", fixed_width: true }) %>
```