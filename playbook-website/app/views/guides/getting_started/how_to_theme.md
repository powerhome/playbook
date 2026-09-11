---
title: How to Theme
description: You can customize and theme Playbook components by setting your own variable values instead of using the default Sass values.
icon: wrench
---

For a full token reference, see [Tokens](/tokens). Source files live in the [tokens directory](https://github.com/powerhome/playbook/tree/master/playbook/app/pb_kits/playbook/tokens).

Do you have design requirements that differ from Playbook's default settings? How you customize depends on how your app loads Playbook styles.

## Using the prebuilt CSS bundle

Most apps follow the setup guides and import the prebuilt stylesheet:

```js
import 'playbook-ui/dist/playbook.css'
```

That file is **already compiled**. Sass variables like `$primary` or `$z_10` cannot change it after the fact.

With the prebuilt bundle, customize like this instead:

- **[Global Props](/global_props)** — spacing, color, and layout on individual kits
- **[Using Tokens](/tokens/using_tokens)** — read token values in React (`import { colors, spacing } from "playbook-ui"`) or Ruby (`Playbook::Tokens.colors`) for your own styles
- **Your own CSS** — override kit classes where you need one-off exceptions

You can also import token partials for `$variables` in *your* custom SCSS (this does not retheme Playbook kits themselves):

```scss
@import "playbook-ui/dist/tokens/colors";
@import "playbook-ui/dist/tokens/spacing";

.my-panel {
  padding: $space_sm;
  color: $primary;
}
```

## Compiling Playbook Sass

To change Playbook’s default look across kits (true theming), compile Playbook’s Sass in your app instead of relying only on the prebuilt `playbook.css`.

Tokens use the `!default` flag, so values you set **before** importing Playbook Sass are kept when CSS is generated. Use that compiled output in place of the stock prebuilt bundle.

### Sass Variable Assignment

When you assign a new value to a Sass variable, the previous value is overwritten:

```scss
// Initial value
$primary: red;

// New value
$primary: blue;
```

### The !default Flag

Playbook tokens ship with `!default` so you can configure variables before CSS is generated.

For instance, some of our color tokens:

```scss
$royal:   #0056CF !default;
$purple:  #9E64E9 !default;
$teal:    #00C4D7 !default;
$default: #93a8b8 !default;
$primary: $royal !default;
```

`!default` assigns a value only if the variable is unset or `null`. If you already set `$primary`, the Playbook default is skipped:

```scss
// Custom value
$primary: red;

// Default value isn't assigned
$primary: $royal !default;
```

For more details, see the [Sass documentation](https://sass-lang.com/documentation/variables/#default-values).

### Order of Variable Assignment

Set your custom variables *before* importing Playbook Sass. If you import first, defaults are already applied and later assignments will not retheme kit rules.

For example, declaring `@import 'playbook.scss'` and *then* setting `$primary` leaves kits on the default color:

```scss
@import 'playbook.scss';

// _colors.scss
$primary: $royal !default;

// _reset.scss
// Link colors are still $royal
a {
  color: $primary;
}

// application.scss
// Only later uses of $primary are red
$primary: red;
```

### Example: Customizing z-index

Assign the variable before importing Playbook:

```scss
$z_10: 1000000;
@import 'playbook.scss';
```
