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

![fontawesome](https://github.com/user-attachments/assets/638b63ad-56d3-4819-8e05-fcbb175bedc7)

### Ruby on Rails Setup

<details class="mt_sm">
  <summary class="mb_sm"><strong>Default with an Asset Pipeline</strong></summary>
  <strong>Make sure you are on Rails 7 or higher.</strong>
  <p>
    <strong>1.</strong> Follow the <a href="/guides/getting_started/ruby_on_rails_setup">Ruby on Rails Setup getting started page</a> to setup Playbook with your Rails project.
  </p>
  <p>
    <strong>2.</strong> Setup Pro or Free Font Awesome to use our Icon Component.
  </p>
  <p><strong>Pro:</strong></p>
  <pre><code class="rb"># app/assets/stylesheets/application.scss
 @import "font-awesome-pro";
 @import "font-awesome-pro/solid";
 @import "font-awesome-pro/regular";
 @import "playbook";</code></pre>
  <pre><code class="rb"># app/Gemfile
 source "https://token:TOKEN@dl.fontawesome.com/basic/fontawesome-pro/ruby/" do
   gem "font-awesome-pro-sass", "6.2.0"
 end</code></pre>
 <strong>Free:</strong>
  <p><em>Currently only <a href="https://fontawesome.com/search?o=r&m=free&s=regular">Free Regular</a> icons are supported in our icon component structure.</em></p>

  <pre><code class="rb"># app/assets/stylesheets/application.scss
 @import "font-awesome";</code></pre>

  <pre><code class="rb"># app/Gemfile
 source "https://token:TOKEN@dl.fontawesome.com/basic/fontawesome-pro/ruby/" do
   gem "font-awesome-pro-sass", "6.2.0"
 end</code></pre>

  <strong>3.</strong> Bundle all the things!

  <pre><code class="sh">bundle install</code></pre>

  <strong>4.</strong> <strong>Go build awesome stuff!</strong>

  <p>Refer to our <a href="/kits/icon">Icon kit</a> to get started with Font Awesome icons in Playbook.</p>

  <pre><code class="rb">&lt;%= pb_rails("icon", props: { icon: "font-awesome", fixed_width: true }) %&gt;</code></pre>
</details>
