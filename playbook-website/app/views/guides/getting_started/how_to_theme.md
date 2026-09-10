---
title: How to Theme
description: You can customize and theme Playbook components by setting your own variable values instead of using the default Sass values.
icon: wrench
---

For a full token reference, see [Tokens](/tokens). For using token exports in React or Rails without recompiling Sass, see [Using Tokens](/tokens/using_tokens). Source token files live in the [tokens directory](https://github.com/powerhome/playbook/tree/master/playbook/app/pb_kits/playbook/tokens).

#### Index

[Most apps: use tokens and Global Props](#Most-apps-use-tokens-and-Global-Props)
[Sass variable overrides](#Sass-variable-overrides)
‣ [The !default Flag](#The-default-Flag)
‣ [Order of Variable Assignment](#Order-of-Variable-Assignment)
[Example: Customizing z-index](#Example-Customizing-z-index)

## Most apps: use tokens and Global Props

Most applications load Playbook’s **prebuilt** `playbook.css`. In that setup, Sass `!default` overrides do **not** change kit styles — the CSS is already compiled.

Prefer:

- [Global Props](/global_props) for spacing, color, and layout on kits
- [Using Tokens](/tokens/using_tokens) for JS maps (`import { colors, spacing } from "playbook-ui"`) and Ruby color helpers (`Playbook::Tokens.colors`)
- Individual Sass token imports only when you need `$variables` in **your** custom SCSS:

```scss
@import "playbook-ui/dist/tokens/colors";
@import "playbook-ui/dist/tokens/spacing";

.my-panel {
  padding: $space_sm;
  color: $primary;
}
```

## Sass variable overrides

Use this section only if you compile Playbook kit Sass yourself (uncommon). Tokens ship with the `!default` flag so you can set values **before** those partials are imported.

### The !default Flag

For example, color tokens:

```scss
$royal:   #0056CF !default;
$purple:  #9E64E9 !default;
$teal:    #00C4D7 !default;
$default: #93a8b8 !default;
$primary: $royal !default;
```

`!default` assigns a value only if the variable is unset or `null`. If you already set `$primary`, the Playbook default is skipped:

```scss
// Your value
$primary: red;

// Playbook default is not applied
$primary: $royal !default;
```

See the [Sass documentation](https://sass-lang.com/documentation/variables/#default-values) for details.

### Order of Variable Assignment

Set custom variables **before** importing Playbook token or kit Sass. If you import first, defaults are already assigned and later assignments will not retheme compiled kit rules.

```scss
// Too late — defaults already applied when kits/tokens were imported
@import "playbook-ui/dist/tokens/colors";
$primary: red;
```

## Example: Customizing z-index

Assign the variable before importing positioning (or any kit Sass that uses it):

```scss
$z_10: 1000000;

@import "playbook-ui/dist/tokens/positioning";
```

This only affects styles you compile after the override. It does not rewrite the prebuilt `playbook.css` bundle.
