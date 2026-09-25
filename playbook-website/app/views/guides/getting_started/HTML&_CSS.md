---
title: HTML & CSS Setup
description: Framework agnostic. Utility classes help you work within the constraints of a system instead of littering your stylesheets with arbitrary values.
icon: file-code
---

If you use another environment (for example PHP), you can still use Playbook via the published CSS and the **Copy HTML** control on Rails kit examples.

#### Install the npm package

```sh
yarn add playbook-ui
```

#### Import CSS

Import reset first, then Playbook styles:

```js
import 'playbook-ui/dist/reset.css'
import 'playbook-ui/dist/playbook.css'
```

Or link the files from `node_modules` in your HTML:

```html
<link rel="stylesheet" href="node_modules/playbook-ui/dist/reset.css" />
<link rel="stylesheet" href="node_modules/playbook-ui/dist/playbook.css" />
```

For icons, also install [Playbook Icons](/icons) and include its stylesheet:

```js
import '@powerhome/playbook-icons/css/pb-icons.css'
```

#### Optional JavaScript

Import kit JavaScript if you need interactivity (popovers, date picker, and similar):

```js
import 'playbook-ui/dist/playbook-rails.js'
```

See [Dependencies](/guides/getting_started/dependencies) for optional packages (maps, charts, rich text, and more).
